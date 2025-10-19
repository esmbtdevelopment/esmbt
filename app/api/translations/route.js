import { NextResponse } from 'next/server';
import {
    getAllTranslations,
    getTranslationsByLocale,
    saveTranslation,
    deleteTranslation,
    setNestedValue,
    flattenObject,
    unflattenObject,
    getCategoryFromKey
} from '@/lib/translations/firestore';
import { revalidateTag, unstable_cache } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, Timestamp, writeBatch } from 'firebase/firestore';

// Cached function for getting all translations
const getCachedAllTranslations = unstable_cache(
    async (includeUnpublished) => {
        console.log('[API Cache] Fetching all translations from Firestore...');
        return await getAllTranslations(includeUnpublished);
    },
    ['translations-api', 'all'],
    {
        revalidate: 300, // Cache for 5 minutes
        tags: ['translations']
    }
);

// Cached function for getting translations by locale
const getCachedTranslationsByLocale = unstable_cache(
    async (locale) => {
        console.log(`[API Cache] Fetching ${locale} translations from Firestore...`);
        return await getTranslationsByLocale(locale);
    },
    ['translations-api', 'locale'],
    {
        revalidate: 300, // Cache for 5 minutes
        tags: ['translations']
    }
);

// GET - Read translations from Firestore with caching
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'all';
        const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

        if (locale === 'all') {
            // Get all translations from Firestore (cached)
            const result = await getCachedAllTranslations(includeUnpublished);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Convert flat list to nested structure by locale
            const en = {};
            const tr = {};

            result.translations.forEach(item => {
                setNestedValue(en, item.key, item.en);
                setNestedValue(tr, item.key, item.tr);
            });

            return NextResponse.json({
                success: true,
                translations: { en, tr },
                totalKeys: result.translations.length
            });
        } else {
            // Get translations for specific locale (cached)
            const result = await getCachedTranslationsByLocale(locale);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                translations: {
                    [locale]: result.translations
                }
            });
        }
    } catch (error) {
        console.error('[API] Error reading translations:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to read translations' },
            { status: 500 }
        );
    }
}

// POST - Save translation to Firestore
export async function POST(request) {
    try {
        const { key, en, tr, category, subcategory, status, locale, translations } = await request.json();

        // Handle bulk save (compatibility with existing admin panel)
        if (locale && translations) {
            return await handleBulkSave(locale, translations);
        }

        // Handle single translation save
        if (!key) {
            return NextResponse.json(
                { success: false, error: 'Translation key is required' },
                { status: 400 }
            );
        }

        // Get user ID (you can implement proper auth later)
        const userId = 'admin'; // TODO: Get from auth session

        // Save to Firestore
        const result = await saveTranslation(key, {
            en: en || '',
            tr: tr || '',
            category,
            subcategory,
            status: status || 'published'
        }, userId);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('translations');

        console.log(`[API] Successfully saved translation: ${key}`);

        return NextResponse.json({
            success: true,
            message: 'Translation saved successfully',
            key: result.key
        });
    } catch (error) {
        console.error('[API] Error saving translation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save translation' },
            { status: 500 }
        );
    }
}

// Handle bulk save for compatibility - OPTIMIZED with batch writes
async function handleBulkSave(locale, translations) {
    try {
        const flatTranslations = flattenObject(translations);
        const userId = 'admin'; // TODO: Get from auth session

        console.log(`[API] Starting bulk save for ${locale}: ${Object.keys(flatTranslations).length} keys`);

        // Get all existing translations first to preserve other locale values (use cached version)
        const existingResult = await getCachedAllTranslations(false);
        const existingMap = new Map();

        if (existingResult.success) {
            existingResult.translations.forEach(item => {
                existingMap.set(item.key, {
                    en: item.en,
                    tr: item.tr,
                    category: item.category,
                    version: item.version
                });
            });
        }

        // Firestore batch write (max 500 operations per batch)
        const BATCH_SIZE = 500;
        let batch = writeBatch(db);
        let operationCount = 0;
        let savedCount = 0;
        const errors = [];

        const entries = Object.entries(flatTranslations);

        for (const [key, value] of entries) {
            if (typeof value === 'string') {
                try {
                    const docRef = doc(db, 'translations', key);
                    const existing = existingMap.get(key) || { en: '', tr: '', category: null, version: 0 };
                    const otherLocale = locale === 'en' ? 'tr' : 'en';

                    // Only update the specific locale being saved
                    const updateData = {
                        key,
                        [locale]: value, // Update only this locale
                        [otherLocale]: existing[otherLocale] || '', // Preserve other locale
                        category: existing.category || getCategoryFromKey(key),
                        status: 'published',
                        lastModified: Timestamp.now(),
                        modifiedBy: userId
                    };

                    // If document doesn't exist, add creation fields
                    if (!existingMap.has(key)) {
                        updateData.version = 1;
                        updateData.createdAt = Timestamp.now();
                        updateData.createdBy = userId;
                    } else {
                        updateData.version = (existing.version || 0) + 1;
                    }

                    batch.set(docRef, updateData, { merge: true });
                    operationCount++;
                    savedCount++;

                    // Commit batch when reaching limit
                    if (operationCount >= BATCH_SIZE) {
                        await batch.commit();
                        console.log(`[API] Committed batch of ${operationCount} operations`);
                        batch = writeBatch(db);
                        operationCount = 0;
                    }
                } catch (error) {
                    errors.push({ key, error: error.message });
                }
            }
        }

        // Commit remaining operations
        if (operationCount > 0) {
            await batch.commit();
            console.log(`[API] Committed final batch of ${operationCount} operations`);
        }

        // Invalidate cache
        revalidateTag('translations');

        console.log(`[API] Bulk save completed: ${savedCount} translations saved`);

        return NextResponse.json({
            success: true,
            message: `${locale.toUpperCase()} translations saved successfully`,
            savedCount,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        console.error('[API] Error in bulk save:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save translations' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a translation (soft delete)
export async function DELETE(request) {
    try {
        const { key } = await request.json();

        if (!key) {
            return NextResponse.json(
                { success: false, error: 'Translation key is required' },
                { status: 400 }
            );
        }

        const userId = 'admin'; // TODO: Get from auth session

        const result = await deleteTranslation(key, userId);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate cache
        revalidateTag('translations');

        console.log(`[API] Successfully deleted translation: ${key}`);

        return NextResponse.json({
            success: true,
            message: 'Translation deleted successfully'
        });
    } catch (error) {
        console.error('[API] Error deleting translation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete translation' },
            { status: 500 }
        );
    }
}


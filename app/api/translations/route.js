import { NextResponse } from 'next/server';
import {
    getAllTranslations,
    getTranslationsByLocale,
    saveTranslation,
    deleteTranslation,
    setNestedValue,
    unflattenObject
} from '@/lib/translations/firestore';
import { revalidateTag } from 'next/cache';

// GET - Read translations from Firestore
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'all';
        const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

        if (locale === 'all') {
            // Get all translations from Firestore
            const result = await getAllTranslations(includeUnpublished);

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
            // Get translations for specific locale
            const result = await getTranslationsByLocale(locale);

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

// Handle bulk save for compatibility
async function handleBulkSave(locale, translations) {
    try {
        const flatTranslations = unflattenObject(translations);
        const userId = 'admin'; // TODO: Get from auth session

        let savedCount = 0;
        const errors = [];

        // Process each translation
        for (const [key, value] of Object.entries(flatTranslations)) {
            if (typeof value === 'string') {
                const data = locale === 'en'
                    ? { en: value, tr: '' }
                    : { en: '', tr: value };

                const result = await saveTranslation(key, data, userId);

                if (result.success) {
                    savedCount++;
                } else {
                    errors.push({ key, error: result.error });
                }
            }
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


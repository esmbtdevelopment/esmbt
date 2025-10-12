import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    addDoc,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Flatten a nested object into dot notation keys
 * Example: { user: { name: "John" } } => { "user.name": "John" }
 */
export function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], fullKey));
        } else {
            acc[fullKey] = obj[key];
        }

        return acc;
    }, {});
}

/**
 * Convert flat dot notation object to nested object
 * Example: { "user.name": "John" } => { user: { name: "John" } }
 */
export function unflattenObject(obj) {
    const result = {};

    for (const key in obj) {
        const keys = key.split('.');
        let current = result;

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (i === keys.length - 1) {
                current[k] = obj[key];
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        }
    }

    return result;
}

/**
 * Set a nested value in an object using dot notation
 */
export function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => {
        if (!acc[key]) acc[key] = {};
        return acc[key];
    }, obj);
    target[lastKey] = value;
}

/**
 * Get a nested value from an object using dot notation
 */
export function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

/**
 * Get the category from a translation key
 * Example: "navigation.home" => "navigation"
 */
export function getCategoryFromKey(key) {
    return key.split('.')[0];
}

/**
 * Fetch all translations from Firestore
 */
export async function getAllTranslations(includeUnpublished = false) {
    try {
        let q = collection(db, 'translations');

        if (!includeUnpublished) {
            q = query(q, where('status', '==', 'published'));
        }

        const snapshot = await getDocs(q);
        const translations = [];

        snapshot.forEach(doc => {
            translations.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return { success: true, translations };
    } catch (error) {
        console.error('Error fetching translations:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch translations for a specific locale
 */
export async function getTranslationsByLocale(locale) {
    try {
        const result = await getAllTranslations();

        if (!result.success) {
            return result;
        }

        const translations = {};
        result.translations.forEach(item => {
            if (item[locale]) {
                setNestedValue(translations, item.key, item[locale]);
            }
        });

        return { success: true, translations };
    } catch (error) {
        console.error('Error fetching translations by locale:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get a single translation by key
 */
export async function getTranslation(key) {
    try {
        const docRef = doc(db, 'translations', key);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                success: true,
                translation: { id: docSnap.id, ...docSnap.data() }
            };
        } else {
            return { success: false, error: 'Translation not found' };
        }
    } catch (error) {
        console.error('Error fetching translation:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Create or update a translation
 */
export async function saveTranslation(key, data, userId = 'system') {
    try {
        const docRef = doc(db, 'translations', key);
        const docSnap = await getDoc(docRef);

        const translationData = {
            key,
            en: data.en || '',
            tr: data.tr || '',
            category: data.category || getCategoryFromKey(key),
            subcategory: data.subcategory || null,
            status: data.status || 'published',
            lastModified: Timestamp.now(),
            modifiedBy: userId,
            metadata: data.metadata || {}
        };

        if (docSnap.exists()) {
            // Update existing - save history first
            const oldData = docSnap.data();

            // Save to history subcollection
            await addDoc(collection(db, `translations/${key}/history`), {
                ...oldData,
                modifiedAt: Timestamp.now(),
                changeType: 'update'
            });

            // Update version
            translationData.version = (oldData.version || 0) + 1;

            await updateDoc(docRef, translationData);
        } else {
            // Create new
            translationData.version = 1;
            translationData.createdAt = Timestamp.now();
            translationData.createdBy = userId;

            await setDoc(docRef, translationData);
        }

        return { success: true, key };
    } catch (error) {
        console.error('Error saving translation:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete a translation (soft delete)
 */
export async function deleteTranslation(key, userId = 'system') {
    try {
        const docRef = doc(db, 'translations', key);

        await updateDoc(docRef, {
            status: 'deleted',
            deletedAt: Timestamp.now(),
            deletedBy: userId
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting translation:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get translation history for a key
 */
export async function getTranslationHistory(key) {
    try {
        const historyRef = collection(db, `translations/${key}/history`);
        const q = query(historyRef, orderBy('modifiedAt', 'desc'));
        const snapshot = await getDocs(q);

        const history = [];
        snapshot.forEach(doc => {
            history.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return { success: true, history };
    } catch (error) {
        console.error('Error fetching translation history:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Batch save multiple translations
 */
export async function batchSaveTranslations(translations, userId = 'system') {
    try {
        const results = [];

        for (const [key, data] of Object.entries(translations)) {
            const result = await saveTranslation(key, data, userId);
            results.push({ key, ...result });
        }

        const allSuccess = results.every(r => r.success);

        return {
            success: allSuccess,
            results,
            total: results.length,
            successful: results.filter(r => r.success).length
        };
    } catch (error) {
        console.error('Error in batch save:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Export translations to nested object format (for JSON files)
 */
export async function exportTranslationsToObject() {
    try {
        const result = await getAllTranslations();

        if (!result.success) {
            return result;
        }

        const en = {};
        const tr = {};

        result.translations.forEach(item => {
            setNestedValue(en, item.key, item.en);
            setNestedValue(tr, item.key, item.tr);
        });

        return {
            success: true,
            translations: { en, tr },
            totalKeys: result.translations.length
        };
    } catch (error) {
        console.error('Error exporting translations:', error);
        return { success: false, error: error.message };
    }
}


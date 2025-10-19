import { unstable_cache } from 'next/cache';
import { getTranslationsByLocale } from './firestore';

/**
 * Get translations for a specific locale with caching
 * This is used by Server Components for runtime translation loading
 */
export const getTranslations = unstable_cache(
    async (locale) => {
        try {
            console.log(`[Translations] Fetching ${locale} translations from Firestore...`);

            // Fetch from Firestore
            const result = await getTranslationsByLocale(locale);

            if (result.success) {
                console.log(`[Translations] Successfully loaded ${locale} translations`);
                return result.translations;
            }

            // If Firestore fails, try to fall back to JSON files
            console.warn(`[Translations] Firestore fetch failed for ${locale}, falling back to JSON`);
            try {
                const json = await import(`@/messages/${locale}.json`);
                return json.default;
            } catch (jsonError) {
                console.error(`[Translations] JSON fallback also failed for ${locale}:`, jsonError);
                return {};
            }
        } catch (error) {
            console.error(`[Translations] Error loading ${locale} translations:`, error);

            // Last resort: try JSON files
            try {
                const json = await import(`@/messages/${locale}.json`);
                return json.default;
            } catch (jsonError) {
                console.error(`[Translations] All loading methods failed for ${locale}`);
                return {};
            }
        }
    },
    ['translations', 'locale'], // Cache key with locale parameter
    {
        revalidate: 300, // Cache for 5 minutes (300 seconds)
        tags: ['translations'], // Tag for manual invalidation
    }
);

/**
 * Get a specific translation value by key and locale
 */
export async function getTranslationValue(locale, key) {
    const translations = await getTranslations(locale);
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
}

/**
 * Preload translations for faster access
 * Can be used in layouts or at app startup
 */
export async function preloadTranslations(locales = ['en', 'tr']) {
    const promises = locales.map(locale => getTranslations(locale));
    await Promise.all(promises);
    console.log('[Translations] Preloaded translations for:', locales.join(', '));
}


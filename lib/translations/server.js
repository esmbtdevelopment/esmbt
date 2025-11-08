import { unstable_cache } from 'next/cache';

/**
 * Load translations from local JSON files (file-based mode)
 */
export const getTranslations = unstable_cache(
    async (locale) => {
        const json = await import(`@/messages/${locale}.json`);
        return json.default;
    },
    ['translations'],
    {
        revalidate: 1800, // 30 minutes
        tags: ['translations'],
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
 */
export async function preloadTranslations(locales = ['en', 'tr']) {
    const promises = locales.map(locale => getTranslations(locale));
    await Promise.all(promises);
    console.log('[Translations] Preloaded translations for:', locales.join(', '));
}


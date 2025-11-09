'use client';

import { useLocale } from 'next-intl';
import { useTranslationDebug } from '@/lib/contexts/TranslationDebugContext';

/**
 * Custom hook for loading modular, page-specific translations
 * Automatically loads translations from a local translations folder
 * 
 * @param {Object} translations - Object with locale keys (en, tr) containing translation objects
 * @param {string} namespace - Optional namespace prefix for debug mode
 * @returns {Function} Translation function similar to next-intl's t()
 * 
 * @example
 * // In your page component:
 * import enTranslations from './translations/en.json';
 * import trTranslations from './translations/tr.json';
 * 
 * const translations = { en: enTranslations, tr: trTranslations };
 * const t = useLocalTranslations(translations);
 * 
 * // Use it like normal:
 * <h1>{t('hero.title')}</h1>
 */
export function useLocalTranslations(translations, namespace = '') {
    const locale = useLocale();
    const { showKeys } = useTranslationDebug();

    // Get translations for current locale
    const messages = translations[locale] || translations['en'] || {};

    // Create translation function
    const t = (key, values = {}) => {
        // If debug mode is enabled, return the key
        if (showKeys) {
            const fullKey = namespace ? `${namespace}.${key}` : key;
            return `[${fullKey}]`;
        }

        // Navigate through the nested object using the key path
        const keys = key.split('.');
        let value = messages;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Return key if translation not found
                console.warn(`Translation key not found: ${key} in locale: ${locale}`);
                return key;
            }
        }

        // Handle string interpolation
        if (typeof value === 'string' && values && Object.keys(values).length > 0) {
            return value.replace(/\{(\w+)\}/g, (match, key) => {
                return values[key] !== undefined ? values[key] : match;
            });
        }

        // Return the value or key if not found
        return value !== undefined ? value : key;
    };

    // Add support for accessing nested objects directly
    t.raw = (key) => {
        const keys = key.split('.');
        let value = messages;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return undefined;
            }
        }

        return value;
    };

    return t;
}


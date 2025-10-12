'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslations as useNextIntlTranslations } from 'next-intl';

const TranslationDebugContext = createContext({});

export function TranslationDebugProvider({ children }) {
    const [showKeys, setShowKeys] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load the saved preference from localStorage
        const savedPreference = localStorage.getItem('translationDebugMode');
        if (savedPreference === 'true') {
            setShowKeys(true);
        }
        setIsLoaded(true);
    }, []);

    const toggleDebugMode = () => {
        setShowKeys((prev) => {
            const newValue = !prev;
            localStorage.setItem('translationDebugMode', newValue.toString());
            return newValue;
        });
    };

    const value = {
        showKeys,
        toggleDebugMode,
        isLoaded,
    };

    return (
        <TranslationDebugContext.Provider value={value}>
            {children}
        </TranslationDebugContext.Provider>
    );
}

export function useTranslationDebug() {
    const context = useContext(TranslationDebugContext);
    if (!context) {
        throw new Error('useTranslationDebug must be used within TranslationDebugProvider');
    }
    return context;
}

/**
 * Custom hook that wraps next-intl's useTranslations
 * When debug mode is enabled, it returns the translation keys instead of values
 * 
 * Usage: Replace `useTranslations` with `useDebugTranslations`
 * Example: const t = useDebugTranslations('navigation');
 */
export function useDebugTranslations(namespace) {
    const { showKeys } = useTranslationDebug();
    const t = useNextIntlTranslations(namespace);

    if (!showKeys) {
        return t;
    }

    // Return a proxy that intercepts translation calls and returns keys
    return new Proxy(t, {
        apply(target, thisArg, argumentsList) {
            const key = argumentsList[0];
            const fullKey = namespace ? `${namespace}.${key}` : key;
            return `[${fullKey}]`;
        },
        get(target, prop) {
            // Handle method calls like t.rich()
            if (typeof target[prop] === 'function') {
                return function (...args) {
                    const key = args[0];
                    const fullKey = namespace ? `${namespace}.${key}` : key;
                    return `[${fullKey}]`;
                };
            }

            // Handle direct property access
            if (typeof prop === 'string') {
                const fullKey = namespace ? `${namespace}.${prop}` : prop;
                return `[${fullKey}]`;
            }

            return target[prop];
        }
    });
}


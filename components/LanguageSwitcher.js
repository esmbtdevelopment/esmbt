'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    // Fallback locale detection from pathname if useLocale fails
    const detectedLocale = locale || (pathname.startsWith('/tr') ? 'tr' : 'en');

    const handleLanguageChange = (newLocale) => {
        if (newLocale === detectedLocale) return;

        startTransition(() => {
            // Get the current path without the locale prefix
            // Handle case where pathname might be /tr or /en or /tr/something
            let pathWithoutLocale = pathname;

            // Remove the current locale from the beginning of the path
            if (pathname.startsWith(`/${detectedLocale}`)) {
                pathWithoutLocale = pathname.substring(`/${detectedLocale}`.length);
            }

            // Ensure path starts with / if it's not empty
            if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
                pathWithoutLocale = '/' + pathWithoutLocale;
            }

            // If path is empty, default to root
            if (!pathWithoutLocale) {
                pathWithoutLocale = '/';
            }

            // Create new path with the new locale
            const newPath = `/${newLocale}${pathWithoutLocale}`;

            // Use window.location for more reliable navigation
            window.location.href = newPath;
            setIsOpen(false);
        });
    };

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ];

    const currentLanguage = languages.find(lang => lang.code === detectedLocale);

    return (
        <div className="relative">
            {/* Desktop Version */}
            <div className="hidden md:flex items-center space-x-2">
                <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${detectedLocale === 'en'
                        ? 'bg-sky-600 text-white'
                        : 'text-gray-600 hover:text-sky-600 hover:bg-gray-100'
                        }`}
                    disabled={isPending}
                >
                    EN
                </button>
                <span className="text-gray-300">|</span>
                <button
                    onClick={() => handleLanguageChange('tr')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${detectedLocale === 'tr'
                        ? 'bg-sky-600 text-white'
                        : 'text-gray-600 hover:text-sky-600 hover:bg-gray-100'
                        }`}
                    disabled={isPending}
                >
                    TR
                </button>
            </div>

            {/* Mobile Version - Dropdown */}
            <div className="md:hidden relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-sky-600 transition-colors"
                    disabled={isPending}
                >
                    <FaGlobe className="text-sm" />
                    <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${detectedLocale === language.code ? 'bg-sky-50 text-sky-600 font-medium' : 'text-gray-700'
                                    }`}
                                disabled={isPending}
                            >
                                <span>{language.flag}</span>
                                <span>{language.name}</span>
                                {detectedLocale === language.code && (
                                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Loading indicator */}
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Click outside handler for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

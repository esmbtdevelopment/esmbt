'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useTranslationDebug } from '@/lib/contexts/TranslationDebugContext';
import { FaKey, FaLanguage, FaSpinner } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function TranslationDebugToggle() {
    const { user, loading: authLoading } = useAuth();
    const { showKeys, toggleDebugMode, isLoaded } = useTranslationDebug();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if user is authenticated and contexts are loaded
        setIsVisible(!authLoading && !!user && isLoaded);
    }, [authLoading, user, isLoaded]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={toggleDebugMode}
                className={`
                    group relative flex items-center gap-3 px-4 py-3 rounded-full shadow-lg
                    transition-all duration-300 hover:scale-105 hover:shadow-xl
                    ${showKeys
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    }
                `}
                title={showKeys ? 'Show Translations' : 'Show Translation Keys'}
            >
                <div className="flex items-center gap-2">
                    {showKeys ? (
                        <>
                            <FaKey className="text-lg" />
                            <span className="hidden sm:inline font-medium">Keys Mode</span>
                        </>
                    ) : (
                        <>
                            <FaLanguage className="text-lg" />
                            <span className="hidden sm:inline font-medium">Translation Mode</span>
                        </>
                    )}
                </div>

                {/* Tooltip for mobile */}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none sm:hidden">
                    {showKeys ? 'Show Translations' : 'Show Keys'}
                    <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
            </button>

            {/* Info tooltip */}
            <div className="absolute bottom-full right-0 mb-16 w-64 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:block">
                <p className="font-semibold mb-1">Translation Debug Mode</p>
                <p className="text-gray-300">
                    {showKeys
                        ? 'Currently showing translation keys. Click to show actual translations.'
                        : 'Currently showing translations. Click to show translation keys for debugging.'
                    }
                </p>
                <div className="absolute top-full right-4 -mt-1 border-8 border-transparent border-t-gray-900"></div>
            </div>
        </div>
    );
}


'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAuth } from '@/lib/contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function TranslationsPage() {
    return (
        <ProtectedRoute>
            <TranslationsContent />
        </ProtectedRoute>
    );
}

function TranslationsContent() {
    const [translations, setTranslations] = useState({ en: {}, tr: {} });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKey, setSelectedKey] = useState(null);
    const [editedTranslations, setEditedTranslations] = useState({ en: {}, tr: {} });
    const [hasChanges, setHasChanges] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    // Load translations on mount
    useEffect(() => {
        loadTranslations();
    }, []);

    const loadTranslations = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/translations?locale=all');
            const data = await response.json();

            if (data.success) {
                setTranslations(data.translations);
                setEditedTranslations(data.translations);
            } else {
                toast.error('Failed to load translations');
            }
        } catch (error) {
            console.error('Error loading translations:', error);
            toast.error('Failed to load translations');
        } finally {
            setLoading(false);
        }
    };

    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(acc, flattenObject(obj[key], fullKey));
            } else {
                acc[fullKey] = obj[key];
            }

            return acc;
        }, {});
    };

    const setNestedValue = (obj, path, value) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((acc, key) => {
            if (!acc[key]) acc[key] = {};
            return acc[key];
        }, obj);
        target[lastKey] = value;
    };

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
    };

    const flatEn = flattenObject(translations.en);
    const flatTr = flattenObject(translations.tr);

    const allKeys = Array.from(new Set([...Object.keys(flatEn), ...Object.keys(flatTr)]));

    const filteredKeys = searchTerm
        ? allKeys.filter(key =>
            key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(flatEn[key] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(flatTr[key] || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        : allKeys;

    const handleEdit = (key, locale, value) => {
        const newTranslations = JSON.parse(JSON.stringify(editedTranslations));
        setNestedValue(newTranslations[locale], key, value);
        setEditedTranslations(newTranslations);
        setHasChanges(true);
    };

    const handleSave = async (locale) => {
        try {
            setSaving(true);
            const response = await fetch('/api/translations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    locale,
                    translations: editedTranslations[locale]
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`${locale.toUpperCase()} translations saved successfully!`);
                setTranslations(editedTranslations);
                setHasChanges(false);
            } else {
                toast.error(data.error || 'Failed to save translations');
            }
        } catch (error) {
            console.error('Error saving translations:', error);
            toast.error('Failed to save translations');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveAll = async () => {
        try {
            setSaving(true);

            const enResponse = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locale: 'en', translations: editedTranslations.en }),
            });

            const trResponse = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locale: 'tr', translations: editedTranslations.tr }),
            });

            const enData = await enResponse.json();
            const trData = await trResponse.json();

            if (enData.success && trData.success) {
                toast.success('All translations saved successfully!');
                setTranslations(editedTranslations);
                setHasChanges(false);
            } else {
                toast.error('Some translations failed to save');
            }
        } catch (error) {
            console.error('Error saving translations:', error);
            toast.error('Failed to save translations');
        } finally {
            setSaving(false);
        }
    };

    const handleDiscard = () => {
        setEditedTranslations(translations);
        setHasChanges(false);
        toast.success('Changes discarded');
    };

    const handleExport = async () => {
        try {
            setExporting(true);
            toast.loading('Exporting translations to JSON files...');

            const response = await fetch('/api/translations/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (data.success) {
                setExportStatus({
                    success: true,
                    totalKeys: data.totalKeys,
                    timestamp: data.timestamp
                });
                toast.dismiss();
                toast.success(`Successfully exported ${data.totalKeys} translations!`);
            } else {
                toast.dismiss();
                toast.error(data.error || 'Failed to export translations');
            }
        } catch (error) {
            console.error('Error exporting translations:', error);
            toast.dismiss();
            toast.error('Failed to export translations');
        } finally {
            setExporting(false);
        }
    };

    const handleSignOut = async () => {
        const result = await signOut();
        if (result.success) {
            router.push('/admin/login');
        }
    };

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/admin',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            )
        },
        {
            title: 'Translations',
            path: '/admin/translations',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
            ),
            badge: 'Active'
        },
        {
            title: 'Services',
            path: '/admin/services',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            ),
            disabled: true
        },
        {
            title: 'Products',
            path: '/admin/products',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            ),
            disabled: true
        },
        {
            title: 'Media Library',
            path: '/admin/media',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            ),
            disabled: true
        },
        {
            title: 'Users',
            path: '/admin/users',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            ),
            disabled: true,
            adminOnly: true
        },
        {
            title: 'Settings',
            path: '/admin/settings',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            disabled: true,
            adminOnly: true
        }
    ];

    const filteredMenuItems = menuItems.filter(item => !item.adminOnly || user?.role === 'admin');

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar (same as dashboard) */}
                <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
                    <div className="p-6 border-b border-gray-800">
                        <div className="flex items-center justify-between">
                            {isSidebarOpen ? (
                                <div className="flex items-center space-x-3">
                                    <div className="relative w-10 h-10">
                                        <Image src="/images/logo.webp" alt="ESM Logo" fill className="object-contain" priority />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold">ESM Admin</h1>
                                        <p className="text-xs text-gray-400">CMS Panel</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-8 h-8 mx-auto">
                                    <Image src="/images/logo.webp" alt="ESM Logo" fill className="object-contain" priority />
                                </div>
                            )}
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {filteredMenuItems.map((item, index) => (
                            <div key={index} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${pathname === item.path ? 'bg-sky-600' : 'bg-gray-800'}`}>
                                {item.icon}
                                {isSidebarOpen && <span className="flex-1 text-left text-sm font-medium">{item.title}</span>}
                            </div>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading translations...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Toaster position="top-right" />

            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        {isSidebarOpen ? (
                            <div className="flex items-center space-x-3">
                                <div className="relative w-10 h-10">
                                    <Image src="/images/logo.webp" alt="ESM Logo" fill className="object-contain" priority />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold">ESM Admin</h1>
                                    <p className="text-xs text-gray-400">CMS Panel</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-8 h-8 mx-auto">
                                <Image src="/images/logo.webp" alt="ESM Logo" fill className="object-contain" priority />
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {filteredMenuItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => !item.disabled && router.push(item.path)}
                                disabled={item.disabled}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                                    : item.disabled
                                        ? 'text-gray-500 cursor-not-allowed opacity-50'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                title={!isSidebarOpen ? item.title : ''}
                            >
                                <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                                {isSidebarOpen && (
                                    <>
                                        <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
                                        {item.badge && (
                                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.disabled && (
                                            <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                                                Soon
                                            </span>
                                        )}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* User Profile & Sign Out */}
                <div className="border-t border-gray-800 p-4">
                    {isSidebarOpen ? (
                        <>
                            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-800 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center text-white font-semibold">
                                    {user?.email?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                                    <p className="text-xs text-gray-400 capitalize">{user?.role || 'User'}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                            title="Sign Out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Toggle Sidebar Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 bg-gray-900 border-2 border-gray-700 text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Translation Management</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage translations for English and Turkish</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* Export to JSON Button */}
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                disabled={exporting || saving}
                                title="Export translations to JSON files for version control"
                            >
                                {exporting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Exporting...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                        <span>Export to JSON</span>
                                    </>
                                )}
                            </button>

                            {hasChanges && (
                                <>
                                    <button
                                        onClick={handleDiscard}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        disabled={saving}
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        onClick={handleSaveAll}
                                        className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Save All Changes</span>
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Translations Content */}
                <div className="p-8">
                    {/* Info Banner */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 p-2 bg-blue-500 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    💡 How Translation Updates Work
                                </h3>
                                <div className="text-sm text-gray-700 space-y-2">
                                    <p>
                                        <strong>Daily editing:</strong> Edit translations below and click "Save All Changes".
                                        Changes are stored in Firestore and <strong>reflect on your website in ~5 seconds</strong> (no deployment needed).
                                    </p>
                                    <p>
                                        <strong>Backup & Version Control:</strong> Click "Export to JSON" to save translations
                                        to JSON files in your project. This creates a backup and allows you to commit changes to Git.
                                        <em>Export periodically or before major updates.</em>
                                    </p>
                                    {exportStatus && (
                                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-green-800 font-medium">
                                                ✅ Last export: {new Date(exportStatus.timestamp).toLocaleString()}
                                                ({exportStatus.totalKeys} keys)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex-1 w-full relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search translations by key or value..."
                                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-sky-50 rounded-lg px-6 py-3 border border-sky-100">
                                    <div className="text-xs font-medium text-sky-600 mb-1">Total Keys</div>
                                    <div className="text-2xl font-bold text-gray-900">{allKeys.length}</div>
                                </div>
                                {searchTerm && (
                                    <div className="bg-purple-50 rounded-lg px-6 py-3 border border-purple-100">
                                        <div className="text-xs font-medium text-purple-600 mb-1">Filtered</div>
                                        <div className="text-2xl font-bold text-gray-900">{filteredKeys.length}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Translations Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="w-1/4 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Translation Key
                                        </th>
                                        <th className="w-3/8 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            English
                                        </th>
                                        <th className="w-3/8 px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Turkish
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredKeys.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-12 text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                </svg>
                                                <p className="font-medium">
                                                    {searchTerm ? 'No translations found matching your search.' : 'No translations available.'}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredKeys.slice(0, 100).map((key, index) => {
                                            const enValue = getNestedValue(editedTranslations.en, key);
                                            const trValue = getNestedValue(editedTranslations.tr, key);
                                            const isString = typeof enValue === 'string' && typeof trValue === 'string';

                                            return (
                                                <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4">
                                                        <div className="font-mono text-sm text-gray-700 group relative">
                                                            <span className="truncate block max-w-xs" title={key}>
                                                                {key}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {isString ? (
                                                            <textarea
                                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                                                value={enValue || ''}
                                                                onChange={(e) => handleEdit(key, 'en', e.target.value)}
                                                                rows={Math.min(3, Math.max(1, Math.ceil((enValue || '').length / 50)))}
                                                            />
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                Object/Array
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {isString ? (
                                                            <textarea
                                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                                                value={trValue || ''}
                                                                onChange={(e) => handleEdit(key, 'tr', e.target.value)}
                                                                rows={Math.min(3, Math.max(1, Math.ceil((trValue || '').length / 50)))}
                                                            />
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                Object/Array
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>

                            {filteredKeys.length > 100 && (
                                <div className="bg-blue-50 border-t border-blue-100 px-6 py-4">
                                    <div className="flex items-center space-x-3 text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            Showing first 100 of {filteredKeys.length} translations. Use search to find specific keys.
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => handleSave('en')}
                                className="flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={saving || !hasChanges}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                <span>Save English Only</span>
                            </button>
                            <button
                                onClick={() => handleSave('tr')}
                                className="flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={saving || !hasChanges}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                <span>Save Turkish Only</span>
                            </button>
                            <button
                                onClick={loadTranslations}
                                className="flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <span>Reload Translations</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@/components/admin/Modal';

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
    const [editedTranslations, setEditedTranslations] = useState({ en: {}, tr: {} });
    const [hasChanges, setHasChanges] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, key: null });

    // Load translations on mount
    useEffect(() => {
        loadTranslations();
    }, []);

    const loadTranslations = async (forceRefresh = false) => {
        try {
            setLoading(true);

            // Check session storage first (unless force refresh)
            const cacheKey = 'translations:all';
            if (!forceRefresh) {
                try {
                    const cached = sessionStorage.getItem(cacheKey);
                    if (cached) {
                        const { data: cachedData, timestamp } = JSON.parse(cached);
                        const age = Date.now() - timestamp;

                        // Use cache if less than 5 minutes old
                        if (age < 5 * 60 * 1000) {
                            console.log('[Cached] Translations loaded from session storage');
                            setTranslations(cachedData);
                            setEditedTranslations(cachedData);
                            setLoading(false);
                            return;
                        }
                    }
                } catch (cacheError) {
                    console.warn('Cache read error:', cacheError);
                    sessionStorage.removeItem(cacheKey);
                }
            }

            // Fetch from API
            console.log('[API] Fetching fresh translations');
            const response = await fetch('/api/translations?locale=all');
            const data = await response.json();

            if (data.success) {
                setTranslations(data.translations);
                setEditedTranslations(data.translations);

                // Cache the results
                try {
                    sessionStorage.setItem(cacheKey, JSON.stringify({
                        data: data.translations,
                        timestamp: Date.now()
                    }));
                    console.log('[Cached] Translations saved to session storage');
                } catch (cacheError) {
                    console.warn('Cache write error:', cacheError);
                }
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

                // Clear cache after saving
                sessionStorage.removeItem('translations:all');
                console.log('[Cache] Cleared translations cache after save');
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

                // Clear cache after saving
                sessionStorage.removeItem('translations:all');
                console.log('[Cache] Cleared translations cache after save');
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

    const deleteNestedKey = (obj, path) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((acc, key) => acc?.[key], obj);
        if (target && lastKey in target) {
            delete target[lastKey];
            return true;
        }
        return false;
    };

    const handleDeleteClick = (key) => {
        setDeleteModal({ isOpen: true, key });
    };

    const handleDeleteConfirm = async () => {
        const key = deleteModal.key;

        try {
            setSaving(true);

            // Create new translation objects without the deleted key
            const newEnTranslations = JSON.parse(JSON.stringify(editedTranslations.en));
            const newTrTranslations = JSON.parse(JSON.stringify(editedTranslations.tr));

            deleteNestedKey(newEnTranslations, key);
            deleteNestedKey(newTrTranslations, key);

            // Save both locales
            const enResponse = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locale: 'en', translations: newEnTranslations }),
            });

            const trResponse = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locale: 'tr', translations: newTrTranslations }),
            });

            const enData = await enResponse.json();
            const trData = await trResponse.json();

            if (enData.success && trData.success) {
                toast.success(`Translation key "${key}" deleted successfully!`);
                setEditedTranslations({ en: newEnTranslations, tr: newTrTranslations });
                setTranslations({ en: newEnTranslations, tr: newTrTranslations });
                setHasChanges(false);

                // Clear cache after deletion
                sessionStorage.removeItem('translations:all');
                console.log('[Cache] Cleared translations cache after delete');
            } else {
                toast.error('Failed to delete translation key');
            }
        } catch (error) {
            console.error('Error deleting translation:', error);
            toast.error('Failed to delete translation key');
        } finally {
            setSaving(false);
        }
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

    return (
        <div className="flex h-screen bg-gray-50">
            <Toaster position="top-right" />

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, key: null })}
                onConfirm={handleDeleteConfirm}
                type="danger"
                title="Delete Translation Key"
                message={`Are you sure you want to delete the translation key "${deleteModal.key}"?\n\nThis will permanently remove it from both English and Turkish translations in Firestore.`}
                confirmText="Delete"
                cancelText="Cancel"
            />

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
                    {loading && (
                        <div className="space-y-6">
                            {/* Stats Cards Skeleton */}
                            <div className="w-full">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="skeleton h-4 w-24 mb-2"></div>
                                    <div className="skeleton h-8 w-full"></div>
                                </div>
                            </div>

                            {/* Table Skeleton */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {/* Table Header */}
                                <div className="bg-gray-50 border-b border-gray-200 p-4">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-4 skeleton h-4"></div>
                                        <div className="col-span-3 skeleton h-4"></div>
                                        <div className="col-span-3 skeleton h-4"></div>
                                        <div className="col-span-2 skeleton h-4"></div>
                                    </div>
                                </div>
                                {/* Table Rows */}
                                <div className="divide-y divide-gray-200">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className="p-4">
                                            <div className="grid grid-cols-12 gap-4 items-center">
                                                <div className="col-span-4 skeleton h-5 w-full"></div>
                                                <div className="col-span-3 skeleton h-5 w-full"></div>
                                                <div className="col-span-3 skeleton h-5 w-full"></div>
                                                <div className="skeleton h-8 w-8 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && (
                        <>
                            {/* Search and Stats */}
                            < div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
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
                                                    <td colSpan="4" className="text-center py-12 text-gray-500">
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
                                        onClick={() => loadTranslations(true)}
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
                        </>
                    )}
                </div>
            </main >
        </div >
    );
}


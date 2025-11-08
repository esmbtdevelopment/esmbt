'use client';

import ProtectedRoute from '@/components/admin/ProtectedRoute';

export default function TranslationsPage() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-yellow-900 mb-2">Translations are now file-based</h2>
                    <p className="text-sm text-yellow-800">
                        Editing via the admin panel is temporarily disabled. Please update translations directly in
                        <span className="font-mono px-1">messages/en.json</span> and
                        <span className="font-mono px-1">messages/tr.json</span>. The API endpoints are disabled until Firestore is re-enabled.
                    </p>
                    <p className="text-xs text-yellow-700 mt-3">
                        To revert to Firestore in the future, re-enable the translations API and server loader.
                    </p>
                </div>
            </div>
        </ProtectedRoute>
    );
}


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Not authenticated, redirect to login
                router.push('/admin/login');
            }
        }
    }, [user, loading, router]);

    // Show skeleton while checking authentication
    if (loading) {
        return (
            <div className="flex h-screen bg-black">
                {/* Sidebar Skeleton */}
                <aside className="w-64 bg-gray-900 text-white flex flex-col">
                    {/* Logo Skeleton */}
                    <div className="p-6 border-b border-gray-800">
                        <div className="flex items-center space-x-3">
                            <div className="skeleton w-10 h-10 rounded-full bg-gray-800"></div>
                            <div className="flex-1">
                                <div className="skeleton h-5 w-24 mb-2 bg-gray-800"></div>
                                <div className="skeleton h-3 w-16 bg-gray-800"></div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Skeleton */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="skeleton h-12 w-full rounded-lg bg-gray-800"></div>
                        ))}
                    </nav>

                    {/* User Section Skeleton */}
                    <div className="border-t border-gray-800 p-4 space-y-3">
                        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-800">
                            <div className="skeleton w-10 h-10 rounded-full bg-gray-700"></div>
                            <div className="flex-1">
                                <div className="skeleton h-4 w-32 mb-2 bg-gray-700"></div>
                                <div className="skeleton h-3 w-20 bg-gray-700"></div>
                            </div>
                        </div>
                        <div className="skeleton h-10 w-full rounded-lg bg-gray-800"></div>
                    </div>
                </aside>

                {/* Main Content Skeleton */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header Skeleton */}
                        <div className="skeleton h-10 w-64 bg-white"></div>

                        {/* Cards Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="skeleton h-4 w-24 mb-3 bg-gray-200"></div>
                                    <div className="skeleton h-8 w-20 bg-gray-200"></div>
                                </div>
                            ))}
                        </div>

                        {/* Content Skeleton */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                            <div className="skeleton h-6 w-48 bg-gray-200"></div>
                            <div className="skeleton h-4 w-full bg-gray-200"></div>
                            <div className="skeleton h-4 w-5/6 bg-gray-200"></div>
                            <div className="skeleton h-4 w-4/6 bg-gray-200"></div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Don't render anything if not authenticated
    if (!user) {
        return null;
    }

    return <>{children}</>;
}


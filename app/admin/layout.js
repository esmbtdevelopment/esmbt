'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAuth } from '@/lib/contexts/AuthContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // Don't wrap login page with ProtectedRoute
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <ProtectedRoute>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </ProtectedRoute>
    );
}

function AdminLayoutContent({ children }) {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
            )
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
            title: 'Navigation',
            path: '/admin/navigation',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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

    return (
        <div className="flex h-screen bg-black">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} relative bg-gray-900 text-white flex flex-col transition-all duration-300`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    {isSidebarOpen ? (
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10">
                                <Image src="/images/logo.webp" alt="ESM" fill className="object-contain" priority />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">ESM Admin</h1>
                                <p className="text-xs text-gray-400">CMS Panel</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-8 h-8 mx-auto">
                            <Image src="/images/logo.webp" alt="ESM" fill className="object-contain" priority />
                        </div>
                    )}
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {filteredMenuItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => !item.disabled && router.push(item.path)}
                                disabled={item.disabled}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-sky-600 text-white shadow-lg' :
                                    item.disabled ? 'text-gray-500 opacity-50 cursor-not-allowed' :
                                        'text-gray-300 hover:bg-gray-800'
                                    }`}
                                title={!isSidebarOpen ? item.title : ''}
                            >
                                {item.icon}
                                {isSidebarOpen && (
                                    <>
                                        <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
                                        {item.disabled && (
                                            <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
                                        )}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* User & Toggle */}
                <div className="border-t border-gray-800 p-4">
                    {isSidebarOpen ? (
                        <>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="w-full flex items-center space-x-2 mb-3 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <FaChevronLeft className="text-xs" />
                                <span className="text-sm">Minimize</span>
                            </button>
                            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-800 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center text-white font-semibold">
                                    {user?.email?.[0]?.toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{user?.email}</p>
                                    <p className="text-xs text-gray-400">{user?.role || 'User'}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="w-full flex items-center justify-center mb-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                            >
                                <FaChevronRight className="text-sm" />
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-red-500/10 hover:text-red-400"
                                title="Sign Out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}


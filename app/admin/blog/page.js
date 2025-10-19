"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from '@/components/admin/Modal';

export default function BlogManagement() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locale, setLocale] = useState('en');
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState({ isOpen: false, type: 'confirm', title: '', message: '', onConfirm: null });
    const router = useRouter();

    // Fetch posts with caching
    const fetchPosts = async (forceRefresh = false) => {
        try {
            setLoading(true);

            // Build cache key
            const cacheKey = `blog-posts:${locale}:${statusFilter}:${categoryFilter}`;

            // Check if we should use cache
            if (!forceRefresh) {
                const cachedData = sessionStorage.getItem(cacheKey);
                if (cachedData) {
                    try {
                        const { data, timestamp } = JSON.parse(cachedData);
                        const age = Date.now() - timestamp;

                        // Use cache if less than 2 minutes old
                        if (age < 2 * 60 * 1000) {
                            console.log('[Cache] Using cached blog posts data');
                            setPosts(data);
                            setLoading(false);
                            return;
                        }
                    } catch (e) {
                        // Clear invalid cache
                        sessionStorage.removeItem(cacheKey);
                    }
                }
            }

            const params = new URLSearchParams({
                locale,
                status: statusFilter,
            });
            if (categoryFilter) {
                params.append('category', categoryFilter);
            }

            const response = await fetch(`/api/blog?${params}`);
            const result = await response.json();

            if (result.success) {
                setPosts(result.posts || []);

                // Cache the result
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    data: result.posts || [],
                    timestamp: Date.now()
                }));
            } else {
                console.error('[Admin Blog] Error loading posts:', result.error, result.details);
                setPosts([]);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch(`/api/blog?locale=${locale}&action=categories`);
            const result = await response.json();
            if (result.success) {
                setCategories(result.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        // Clear cache on mount to ensure fresh data
        sessionStorage.clear();
        fetchPosts(true);
        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch when filters change
        fetchPosts(true);
    }, [locale, statusFilter, categoryFilter]);

    // Filter posts by search term
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Toggle status
    const handleToggleStatus = async (postId, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';

        try {
            const response = await fetch(`/api/blog/${postId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle-status', status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                // Update local state instead of refetching
                setPosts(prev => prev.map(post =>
                    post.id === postId ? { ...post, status: newStatus } : post
                ));
                console.log('[Optimized] Status toggled, using local state');
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    // Delete post
    const handleDelete = (postId, postTitle) => {
        setModal({
            isOpen: true,
            type: 'danger',
            title: 'Delete Blog Post',
            message: `Are you sure you want to delete "${postTitle}"?\n\nThis action cannot be undone.`,
            confirmText: 'Delete',
            onConfirm: async () => {
                try {
                    const response = await fetch(`/api/blog/${postId}`, {
                        method: 'DELETE'
                    });

                    const data = await response.json();
                    if (data.success) {
                        // Update local state instead of refetching
                        setPosts(prev => prev.filter(post => post.id !== postId));
                        console.log('[Optimized] Blog post deleted, using local state');

                        // Show success message
                        setModal({
                            isOpen: true,
                            type: 'alert',
                            title: 'Success',
                            message: 'Blog post deleted successfully!',
                            confirmText: 'OK',
                            showCancel: false,
                            onConfirm: () => { }
                        });
                    } else {
                        setModal({
                            isOpen: true,
                            type: 'warning',
                            title: 'Error',
                            message: `Failed to delete blog post: ${data.error}`,
                            confirmText: 'OK',
                            showCancel: false,
                            onConfirm: () => { }
                        });
                    }
                } catch (error) {
                    console.error('Error deleting blog post:', error);
                    setModal({
                        isOpen: true,
                        type: 'warning',
                        title: 'Error',
                        message: 'Failed to delete blog post. Please try again.',
                        confirmText: 'OK',
                        showCancel: false,
                        onConfirm: () => { }
                    });
                }
            }
        });
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return 'Not published';
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Render individual post card
    const renderPostCard = (post) => {
        return (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                    {/* Featured Image */}
                    {post.featuredImage && (
                        <div className="flex-shrink-0">
                            <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    /{post.slug}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {post.status}
                            </span>
                        </div>

                        {post.excerpt && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                            <span>📅 {formatDate(post.publishedAt)}</span>
                            {post.category && <span>📂 {post.category}</span>}
                            {post.readingTime && <span>⏱️ {post.readingTime} min read</span>}
                            {post.author && <span>✍️ {post.author}</span>}
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                                {post.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                                {post.tags.length > 3 && (
                                    <span className="px-2 py-1 text-gray-400 text-xs">
                                        +{post.tags.length - 3} more
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-4">
                            <button
                                onClick={() => router.push(`/admin/blog/edit/${post.id}`)}
                                className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleToggleStatus(post.id, post.status)}
                                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                {post.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                                onClick={() => handleDelete(post.id, post.title)}
                                className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                            <p className="text-gray-600 mt-1">Manage your blog posts</p>
                        </div>
                        <Link href="/admin/blog/edit/new">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 cursor-pointer">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Post
                            </button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="en">English</option>
                            <option value="tr">Turkish</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm ? 'Try adjusting your search' : 'Get started by creating a new blog post'}
                        </p>
                        {!searchTerm && (
                            <div className="mt-6">
                                <Link href="/admin/blog/edit/new">
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                                        New Post
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
                        </div>

                        <div className="space-y-4">
                            {filteredPosts.map(renderPostCard)}
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                onConfirm={modal.onConfirm || (() => { })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                confirmText={modal.confirmText}
                cancelText={modal.cancelText}
                showCancel={modal.showCancel !== false}
            />
        </div>
    );
}


"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import Link from "next/link";
import { useLocalTranslations } from "@/lib/hooks/useLocalTranslations";

import enTranslations from './translations/en.json';
import trTranslations from './translations/tr.json';

const translations = { en: enTranslations, tr: trTranslations };

export default function BlogListingPage() {
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();
    const t = useLocalTranslations(translations);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchBlogData();
    }, [locale, selectedCategory]);

    const fetchBlogData = async () => {
        try {
            setLoading(true);

            // Fetch posts
            const params = new URLSearchParams({
                locale,
                status: 'published',
            });
            if (selectedCategory) {
                params.append('category', selectedCategory);
            }

            const [postsRes, categoriesRes, tagsRes] = await Promise.all([
                fetch(`/api/blog?${params}`),
                fetch(`/api/blog?locale=${locale}&action=categories`),
                fetch(`/api/blog?locale=${locale}&action=tags`)
            ]);

            const postsData = await postsRes.json();
            const categoriesData = await categoriesRes.json();
            const tagsData = await tagsRes.json();

            if (postsData.success) {
                setPosts(postsData.posts);
            }
            if (categoriesData.success) {
                setCategories(categoriesData.categories);
            }
            if (tagsData.success) {
                setTags(tagsData.tags);
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter by tag
    const filteredPosts = selectedTag
        ? posts.filter(post => post.tags && post.tags.includes(selectedTag))
        : posts;

    // Format date
    const formatDate = (date) => {
        if (!date) return '';
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Get fallback image based on category or random
    const getFallbackImage = (post) => {
        const fallbackImages = [
            '/images/hero-esm.webp',
            '/images/hero-sap.webp',
            '/images/hero-financial.webp',
            '/images/teamwork.jpg',
            '/images/services/sap-consulting.jpg',
            '/images/products/sap-erp.jpg',
            '/images/products/sap-analytics.jpg',
        ];

        // Use a consistent fallback based on post id to avoid random changes
        const index = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackImages.length;
        return fallbackImages[index];
    };

    // Render blog post card
    const renderPostCard = (post) => {
        const displayImage = post.featuredImage || getFallbackImage(post);

        return (
            <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                    {/* Featured Image */}
                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={displayImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        {post.category && (
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-sky-600 text-white rounded-full text-xs font-medium">
                                    {post.category}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span>📅 {formatDate(post.publishedAt)}</span>
                            {post.readingTime && (
                                <span>⏱️ {post.readingTime} {t('minRead')}</span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-sky-600 transition-colors">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            {/* Author */}
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {post.author.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm text-gray-700">{post.author}</span>
                                </div>
                            )}

                            {/* Read More */}
                            <span className="text-sky-600 font-medium text-sm flex items-center gap-1 group">
                                {t('readMore')}
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {post.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedTag(tag);
                                        }}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-sky-100 hover:text-sky-700 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-40 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-sora">
                            {t('title')}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 font-montserrat">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 py-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${selectedCategory === ''
                                    ? 'bg-sky-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {t('allCategories')}
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${selectedCategory === category
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Post Count */}
                        <div className="text-sm text-gray-600">
                            {filteredPosts.length} {filteredPosts.length !== 1 ? t('posts') : t('post')}
                        </div>
                    </div>

                    {/* Active Tag Filter */}
                    {selectedTag && (
                        <div className="mt-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-lg">
                                <span className="text-sm">{t('filteredByTag')}: <strong>#{selectedTag}</strong></span>
                                <button
                                    onClick={() => setSelectedTag('')}
                                    className="hover:text-sky-600 cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noPostsFound')}</h3>
                            <p className="text-gray-600">
                                {selectedCategory || selectedTag
                                    ? t('tryDifferentFilter')
                                    : t('checkBackSoon')}
                            </p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(renderPostCard)}
                        </div>
                    )}
                </div>
            </section>

            {/* Tags Cloud */}
            {tags.length > 0 && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('popularTags')}</h2>
                        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                                    className={`px-4 py-2 rounded-full text-sm transition-colors cursor-pointer ${selectedTag === tag
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}


"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";
import * as FaIcons from "react-icons/fa";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('blog');
    const slug = params.slug;

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // Get fallback image based on category or random
    const getFallbackImage = (postData) => {
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
        const index = postData.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackImages.length;
        return fallbackImages[index];
    };

    useEffect(() => {
        fetchPost();
    }, [slug, locale]);

    const fetchPost = async () => {
        try {
            // Fetch all posts and find the one with matching slug
            const response = await fetch(`/api/blog?locale=${locale}&status=published`);
            const data = await response.json();

            if (data.success) {
                const foundPost = data.posts.find(p => p.slug === slug);
                if (foundPost) {
                    setPost(foundPost);

                    // Get related posts (same category, exclude current)
                    const related = data.posts
                        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
                        .slice(0, 3);
                    setRelatedPosts(related);
                } else {
                    setNotFound(true);
                }
            } else {
                setNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching blog post:', error);
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return '';
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('postNotFound')}</h1>
                    <p className="text-gray-600 mb-8">{t('postNotFoundDesc')}</p>
                    <Link href={`/${locale}/blog`}>
                        <button className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors cursor-pointer">
                            {t('viewAllPosts')}
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const displayImage = post.featuredImage || getFallbackImage(post);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Featured Image */}
            <section className="relative h-96 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={displayImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>


                <div className="relative h-full container mx-auto px-4 sm:px-6 md:px-12 flex items-end pb-12">
                    <div className="max-w-4xl">
                        <Link href={`/${locale}/blog`}>
                            <button className="inline-flex items-center space-x-2 text-gray-200 hover:text-white transition-colors mb-6 group cursor-pointer">
                                <FaIcons.FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span>{t('backToBlog')}</span>
                            </button>
                        </Link>

                        {post.category && (
                            <span className="inline-block px-3 py-1 bg-sky-600 text-white rounded-full text-sm font-medium mb-4 ml-3">
                                {post.category}
                            </span>
                        )}

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-sora">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto">

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-gray-200">
                            {post.author && (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {post.author.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{post.author}</p>
                                        <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
                                    </div>
                                </div>
                            )}

                            {post.readingTime && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaIcons.FaClock className="w-4 h-4" />
                                    <span>{post.readingTime} {t('minRead')}</span>
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <div className="mb-8">
                                <p className="text-xl text-gray-700 leading-relaxed font-medium italic border-l-4 border-sky-600 pl-6">
                                    {post.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Main Content */}
                        <div
                            className="blog-post-content prose prose-lg max-w-none
                                prose-headings:font-sora prose-headings:font-bold
                                prose-h1:text-4xl prose-h1:mb-6
                                prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12
                                prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 prose-strong:font-semibold
                                prose-ul:my-6 prose-ol:my-6
                                prose-li:text-gray-700 prose-li:mb-2
                                prose-img:rounded-lg prose-img:shadow-lg
                                prose-blockquote:border-l-4 prose-blockquote:border-sky-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                                prose-code:text-sky-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-gray-900 prose-pre:text-gray-100"
                            style={{ direction: 'ltr', textAlign: 'left' }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('tags')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, idx) => (
                                        <Link key={idx} href={`/${locale}/blog?tag=${tag}`}>
                                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-sky-100 hover:text-sky-700 transition-colors cursor-pointer">
                                                #{tag}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Buttons */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sharePost')}</h3>
                            <div className="flex gap-3">
                                <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                                    <FaIcons.FaFacebook className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors cursor-pointer">
                                    <FaIcons.FaTwitter className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer">
                                    <FaIcons.FaLinkedin className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                    <FaIcons.FaEnvelope className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-12 sm:py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                                {t('relatedPosts')}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => {
                                    const relatedDisplayImage = relatedPost.featuredImage || getFallbackImage(relatedPost);
                                    return (
                                        <Link key={relatedPost.id} href={`/${locale}/blog/${relatedPost.slug}`}>
                                            <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                                                <div className="h-48 overflow-hidden">
                                                    <img
                                                        src={relatedDisplayImage}
                                                        alt={relatedPost.title}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-sky-600 transition-colors">
                                                        {relatedPost.title}
                                                    </h3>
                                                    {relatedPost.excerpt && (
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {relatedPost.excerpt}
                                                        </p>
                                                    )}
                                                    <div className="mt-4 text-xs text-gray-500">
                                                        {formatDate(relatedPost.publishedAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-sora">
                            {t('wantReadMore')}
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 font-montserrat">
                            {t('exploreMore')}
                        </p>
                        <Link href={`/${locale}/blog`}>
                            <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                {t('viewAllPosts')}
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}


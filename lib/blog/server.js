import { unstable_cache } from 'next/cache';
import {
    getAllBlogPosts,
    getBlogPostBySlug,
    getBlogCategories,
    getBlogTags,
    getBlogPostsByTag
} from './firestore';

/**
 * Get all blog posts with server-side caching
 * @param {string} locale - The locale
 * @param {string} status - Filter by status (default: 'published')
 * @param {number} limitCount - Number of posts to fetch
 * @param {string} category - Filter by category (optional)
 * @returns {Promise<Array>} - Array of blog posts
 */
export const getBlogPosts = unstable_cache(
    async (locale, status = 'published', limitCount = 100, category = null) => {
        try {
            const posts = await getAllBlogPosts(locale, status, limitCount, category);
            return posts;
        } catch (error) {
            console.error('[Server] Error fetching blog posts:', error);
            return [];
        }
    },
    ['blog-posts'],
    {
        tags: ['blog'],
        revalidate: 3600, // Revalidate every 1 hour
    }
);

/**
 * Get a single blog post by slug with server-side caching
 * @param {string} slug - The post slug
 * @param {string} locale - The locale
 * @returns {Promise<Object|null>} - Blog post object or null
 */
export const getBlogPost = unstable_cache(
    async (slug, locale) => {
        try {
            const post = await getBlogPostBySlug(slug, locale);
            return post;
        } catch (error) {
            console.error('[Server] Error fetching blog post:', error);
            return null;
        }
    },
    ['blog-post'],
    {
        tags: ['blog'],
        revalidate: 3600,
    }
);

/**
 * Get blog categories with caching
 * @param {string} locale - The locale
 * @returns {Promise<Array>} - Array of categories
 */
export const getCachedBlogCategories = unstable_cache(
    async (locale) => {
        try {
            return await getBlogCategories(locale);
        } catch (error) {
            console.error('[Server] Error fetching blog categories:', error);
            return [];
        }
    },
    ['blog-categories'],
    {
        tags: ['blog'],
        revalidate: 3600,
    }
);

/**
 * Get blog tags with caching
 * @param {string} locale - The locale
 * @returns {Promise<Array>} - Array of tags
 */
export const getCachedBlogTags = unstable_cache(
    async (locale) => {
        try {
            return await getBlogTags(locale);
        } catch (error) {
            console.error('[Server] Error fetching blog tags:', error);
            return [];
        }
    },
    ['blog-tags'],
    {
        tags: ['blog'],
        revalidate: 3600,
    }
);

/**
 * Get blog posts by tag with caching
 * @param {string} tag - The tag
 * @param {string} locale - The locale
 * @param {number} limitCount - Number of posts to fetch
 * @returns {Promise<Array>} - Array of blog posts
 */
export const getCachedBlogPostsByTag = unstable_cache(
    async (tag, locale, limitCount = 20) => {
        try {
            return await getBlogPostsByTag(tag, locale, limitCount);
        } catch (error) {
            console.error('[Server] Error fetching blog posts by tag:', error);
            return [];
        }
    },
    ['blog-posts-by-tag'],
    {
        tags: ['blog'],
        revalidate: 3600,
    }
);


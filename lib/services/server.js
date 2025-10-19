import { unstable_cache } from 'next/cache';
import { getAllServices, getServiceBySlug } from './firestore';

/**
 * Get all services with server-side caching
 * @param {string} locale - The locale
 * @param {string} status - Filter by status (default: 'published')
 * @returns {Promise<Array>} - Array of services
 */
export const getServices = unstable_cache(
    async (locale, status = 'published') => {
        try {
            const services = await getAllServices(locale, status);
            return services;
        } catch (error) {
            console.error('[Server] Error fetching services:', error);
            return [];
        }
    },
    ['services'], // Cache key
    {
        tags: ['services'], // Cache tag for invalidation
        revalidate: 3600, // Revalidate every 1 hour
    }
);

/**
 * Get a single service by slug with server-side caching
 * @param {string} slug - The service slug
 * @param {string} locale - The locale
 * @returns {Promise<Object|null>} - Service object or null
 */
export const getService = unstable_cache(
    async (slug, locale) => {
        try {
            const service = await getServiceBySlug(slug, locale);
            return service;
        } catch (error) {
            console.error('[Server] Error fetching service:', error);
            return null;
        }
    },
    ['service'], // Cache key
    {
        tags: ['services'], // Same tag as services list for invalidation
        revalidate: 3600, // Revalidate every 1 hour
    }
);


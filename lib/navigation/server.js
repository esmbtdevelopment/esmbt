import { unstable_cache } from 'next/cache';
import { getNavigationStructure } from './firestore';

/**
 * Get navigation structure with server-side caching
 * @param {string} locale - The locale
 * @param {string} section - The section (default: 'main')
 * @returns {Promise<Array>} - Array of navigation items
 */
export const getNavigation = unstable_cache(
    async (locale, section = 'main') => {
        try {
            const navigation = await getNavigationStructure(locale, section);
            // Filter to only published items
            return navigation.filter(item => item.status === 'published');
        } catch (error) {
            console.error('[Server] Error fetching navigation:', error);
            return [];
        }
    },
    ['navigation'], // Cache key
    {
        tags: ['navigation'], // Cache tag for invalidation
        revalidate: 3600, // Revalidate every 1 hour
    }
);


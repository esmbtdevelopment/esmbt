/**
 * Client-side caching utility to reduce API calls
 * This helps reduce Firebase reads by caching data in memory
 */

class ClientCache {
    constructor() {
        this.cache = new Map();
        this.timestamps = new Map();
        this.defaultTTL = 5 * 60 * 1000; // 5 minutes default
    }

    /**
     * Get item from cache
     * @param {string} key - Cache key
     * @returns {any|null} - Cached value or null
     */
    get(key) {
        const timestamp = this.timestamps.get(key);
        const now = Date.now();

        // Check if cache is still valid
        if (timestamp && (now - timestamp) < this.defaultTTL) {
            return this.cache.get(key);
        }

        // Cache expired, remove it
        this.cache.delete(key);
        this.timestamps.delete(key);
        return null;
    }

    /**
     * Set item in cache
     * @param {string} key - Cache key
     * @param {any} value - Value to cache
     * @param {number} ttl - Time to live in milliseconds (optional)
     */
    set(key, value, ttl = this.defaultTTL) {
        this.cache.set(key, value);
        this.timestamps.set(key, Date.now());

        // Auto-cleanup after TTL
        setTimeout(() => {
            this.cache.delete(key);
            this.timestamps.delete(key);
        }, ttl);
    }

    /**
     * Check if key exists and is valid
     * @param {string} key - Cache key
     * @returns {boolean}
     */
    has(key) {
        return this.get(key) !== null;
    }

    /**
     * Clear cache for a specific key or all cache
     * @param {string} key - Cache key (optional)
     */
    clear(key = null) {
        if (key) {
            this.cache.delete(key);
            this.timestamps.delete(key);
        } else {
            this.cache.clear();
            this.timestamps.clear();
        }
    }

    /**
     * Invalidate all caches with a specific prefix
     * @param {string} prefix - Cache key prefix
     */
    invalidatePrefix(prefix) {
        const keysToDelete = [];

        for (const key of this.cache.keys()) {
            if (key.startsWith(prefix)) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => {
            this.cache.delete(key);
            this.timestamps.delete(key);
        });
    }
}

// Export singleton instance
export const clientCache = new ClientCache();

/**
 * Cached fetch wrapper
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @param {number} cacheTTL - Cache time in milliseconds
 * @returns {Promise<any>}
 */
export async function cachedFetch(url, options = {}, cacheTTL = 5 * 60 * 1000) {
    const cacheKey = `fetch:${url}:${JSON.stringify(options)}`;

    // Check cache first
    const cached = clientCache.get(cacheKey);
    if (cached) {
        console.log(`[Cache] Hit: ${url}`);
        return cached;
    }

    console.log(`[Cache] Miss: ${url}`);

    // Fetch and cache
    const response = await fetch(url, options);
    const data = await response.json();

    clientCache.set(cacheKey, data, cacheTTL);

    return data;
}


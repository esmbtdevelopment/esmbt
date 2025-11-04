/**
 * Cache Monitoring Utility
 * Tracks cache hits/misses and performance metrics
 */

class CacheMonitor {
    constructor() {
        this.metrics = {
            hits: 0,
            misses: 0,
            firestoreReads: 0,
            apiCalls: 0,
            lastReset: Date.now()
        };
    }

    /**
     * Record a cache hit
     * @param {string} key - Cache key
     */
    recordHit(key) {
        this.metrics.hits++;
        console.log(`[Cache Monitor] HIT: ${key} (Total: ${this.metrics.hits})`);
    }

    /**
     * Record a cache miss
     * @param {string} key - Cache key
     */
    recordMiss(key) {
        this.metrics.misses++;
        console.log(`[Cache Monitor] MISS: ${key} (Total: ${this.metrics.misses})`);
    }

    /**
     * Record a Firestore read operation
     * @param {string} collection - Collection name
     * @param {number} count - Number of documents read
     */
    recordFirestoreRead(collection, count = 1) {
        this.metrics.firestoreReads += count;
        console.log(`[Cache Monitor] Firestore READ: ${collection} (${count} docs) (Total reads: ${this.metrics.firestoreReads})`);
    }

    /**
     * Record an API call
     * @param {string} endpoint - API endpoint
     */
    recordAPICall(endpoint) {
        this.metrics.apiCalls++;
        console.log(`[Cache Monitor] API CALL: ${endpoint} (Total: ${this.metrics.apiCalls})`);
    }

    /**
     * Get current metrics
     * @returns {Object} - Current metrics
     */
    getMetrics() {
        const totalRequests = this.metrics.hits + this.metrics.misses;
        const hitRate = totalRequests > 0 ? (this.metrics.hits / totalRequests * 100).toFixed(2) : 0;
        const missRate = totalRequests > 0 ? (this.metrics.misses / totalRequests * 100).toFixed(2) : 0;
        const uptime = Date.now() - this.metrics.lastReset;

        return {
            ...this.metrics,
            totalRequests,
            hitRate: `${hitRate}%`,
            missRate: `${missRate}%`,
            uptime,
            uptimeFormatted: this.formatUptime(uptime)
        };
    }

    /**
     * Format uptime in human-readable format
     * @param {number} ms - Milliseconds
     * @returns {string} - Formatted uptime
     */
    formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }

    /**
     * Reset metrics
     */
    reset() {
        this.metrics = {
            hits: 0,
            misses: 0,
            firestoreReads: 0,
            apiCalls: 0,
            lastReset: Date.now()
        };
        console.log('[Cache Monitor] Metrics reset');
    }

    /**
     * Print summary report
     */
    printReport() {
        const metrics = this.getMetrics();
        console.log('\n=== Cache Performance Report ===');
        console.log(`Total Requests: ${metrics.totalRequests}`);
        console.log(`Cache Hits: ${metrics.hits} (${metrics.hitRate})`);
        console.log(`Cache Misses: ${metrics.misses} (${metrics.missRate})`);
        console.log(`Firestore Reads: ${metrics.firestoreReads}`);
        console.log(`API Calls: ${metrics.apiCalls}`);
        console.log(`Uptime: ${metrics.uptimeFormatted}`);
        console.log('===============================\n');
    }
}

// Export singleton instance
export const cacheMonitor = new CacheMonitor();

/**
 * Middleware to wrap fetch calls and track cache performance
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<Response>}
 */
export async function monitoredFetch(url, options = {}) {
    cacheMonitor.recordAPICall(url);
    return fetch(url, options);
}

/**
 * Get cache statistics
 * @returns {Object} - Cache statistics
 */
export function getCacheStats() {
    return cacheMonitor.getMetrics();
}

/**
 * Reset cache statistics
 */
export function resetCacheStats() {
    cacheMonitor.reset();
}


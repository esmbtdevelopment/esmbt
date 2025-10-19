"use client";
import React, { useState, useEffect } from 'react';
import { FaSync, FaTrash, FaInfoCircle } from 'react-icons/fa';

/**
 * Cache Status Component
 * Displays cache information and provides cache management controls
 */
export default function CacheStatus() {
    const [cacheStats, setCacheStats] = useState({
        itemCount: 0,
        totalSize: 0,
        items: []
    });
    const [isExpanded, setIsExpanded] = useState(false);

    // Calculate cache stats
    const calculateCacheStats = () => {
        const items = [];
        let totalSize = 0;

        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);

            // Only count cache items (those with our naming pattern)
            if (key.startsWith('nav:') || key.startsWith('services:') || key.startsWith('fetch:')) {
                try {
                    const data = JSON.parse(value);
                    const size = new Blob([value]).size;
                    totalSize += size;

                    let age = 0;
                    let isExpired = false;

                    if (data.timestamp) {
                        age = Date.now() - data.timestamp;
                        isExpired = age > (2 * 60 * 1000); // 2 minutes
                    }

                    items.push({
                        key,
                        size,
                        age,
                        isExpired,
                        type: key.split(':')[0]
                    });
                } catch (e) {
                    // Not JSON, skip
                }
            }
        }

        setCacheStats({
            itemCount: items.length,
            totalSize,
            items
        });
    };

    useEffect(() => {
        calculateCacheStats();
        const interval = setInterval(calculateCacheStats, 5000); // Update every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Clear all cache
    const handleClearAll = () => {
        if (confirm('Clear all cached data? You will need to reload the page.')) {
            sessionStorage.clear();
            calculateCacheStats();
            window.location.reload();
        }
    };

    // Clear expired cache
    const handleClearExpired = () => {
        cacheStats.items
            .filter(item => item.isExpired)
            .forEach(item => sessionStorage.removeItem(item.key));

        calculateCacheStats();
        alert('Expired cache cleared!');
    };

    // Format bytes
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    // Format time
    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FaInfoCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Cache Status</h3>
                        <p className="text-xs text-gray-500">
                            {cacheStats.itemCount} items • {formatBytes(cacheStats.totalSize)} •
                            {' '}{cacheStats.items.filter(i => i.isExpired).length} expired
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleClearExpired}
                        className="px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors flex items-center gap-1"
                        title="Clear expired cache"
                    >
                        <FaSync className="w-3 h-3" />
                        Clear Expired
                    </button>
                    <button
                        onClick={handleClearAll}
                        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors flex items-center gap-1"
                        title="Clear all cache"
                    >
                        <FaTrash className="w-3 h-3" />
                        Clear All
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        {isExpanded ? 'Hide' : 'Show'} Details
                    </button>
                </div>
            </div>

            {/* Expanded view */}
            {isExpanded && cacheStats.items.length > 0 && (
                <div className="mt-4 space-y-2">
                    <div className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                        Cached Items
                    </div>
                    {cacheStats.items.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded border ${item.isExpired ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.type === 'nav' ? 'bg-blue-100 text-blue-800' :
                                            item.type === 'services' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {item.type}
                                    </span>
                                    <span className="text-xs text-gray-600">{item.key}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{formatBytes(item.size)}</span>
                                <span>Age: {formatTime(item.age)}</span>
                                {item.isExpired && (
                                    <span className="text-orange-600 font-medium">Expired</span>
                                )}
                                <button
                                    onClick={() => {
                                        sessionStorage.removeItem(item.key);
                                        calculateCacheStats();
                                    }}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                    title="Remove this item"
                                >
                                    <FaTrash className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No cache message */}
            {isExpanded && cacheStats.items.length === 0 && (
                <div className="mt-4 text-center py-4 text-sm text-gray-500">
                    No cached data. Navigate to other admin pages to see cached items.
                </div>
            )}

            {/* Info banner */}
            <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-start gap-2">
                    <FaInfoCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-800">
                        <strong>Cache reduces Firebase reads by ~70%.</strong> Items expire after 2 minutes.
                        Clear cache if you see outdated data.
                    </div>
                </div>
            </div>
        </div>
    );
}


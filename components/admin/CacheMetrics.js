"use client";
import React, { useState, useEffect } from 'react';
import { FaChartLine, FaDatabase, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * Cache Metrics Component
 * Displays real-time cache performance metrics
 */
export default function CacheMetrics() {
    const [metrics, setMetrics] = useState({
        sessionStorageItems: 0,
        sessionStorageSize: 0,
        cacheAge: {},
        recommendations: []
    });

    // Calculate metrics from sessionStorage
    const calculateMetrics = () => {
        const items = {};
        let totalSize = 0;
        const cacheAge = {};
        const recommendations = [];

        // Scan sessionStorage for cache items
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);

            if (key.startsWith('nav:') || key.startsWith('services:') || key.startsWith('blog:') || key.startsWith('translations:')) {
                try {
                    const data = JSON.parse(value);
                    const size = new Blob([value]).size;
                    totalSize += size;

                    const type = key.split(':')[0];
                    if (!items[type]) items[type] = 0;
                    items[type]++;

                    // Calculate age
                    if (data.timestamp) {
                        const age = Date.now() - data.timestamp;
                        const ageMinutes = Math.floor(age / 60000);
                        cacheAge[key] = ageMinutes;

                        // Check if expired (> 2 minutes)
                        if (ageMinutes > 2) {
                            recommendations.push(`Clear expired cache for: ${key}`);
                        }
                    }
                } catch (e) {
                    // Skip invalid JSON
                }
            }
        }

        // Generate recommendations
        if (totalSize > 500000) {  // > 500KB
            recommendations.push('Cache size is large (> 500KB). Consider clearing old data.');
        }
        if (Object.keys(items).length === 0) {
            recommendations.push('No cached data found. Navigate pages to build cache.');
        }

        setMetrics({
            sessionStorageItems: Object.values(items).reduce((a, b) => a + b, 0),
            sessionStorageSize: totalSize,
            itemsByType: items,
            cacheAge,
            recommendations
        });
    };

    useEffect(() => {
        calculateMetrics();
        const interval = setInterval(calculateMetrics, 5000); // Update every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getCacheEfficiency = () => {
        if (metrics.sessionStorageItems === 0) return 0;
        // Simple heuristic: more items with reasonable size = better efficiency
        const sizeScore = Math.min(metrics.sessionStorageSize / 100000, 1) * 50; // Max 50 points for size
        const itemScore = Math.min(metrics.sessionStorageItems / 10, 1) * 50; // Max 50 points for items
        return Math.round(sizeScore + itemScore);
    };

    const efficiency = getCacheEfficiency();

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <FaChartLine className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Cache Performance</h3>
                        <p className="text-sm text-gray-500">Real-time caching metrics</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        sessionStorage.clear();
                        calculateMetrics();
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                    <FaSync className="w-4 h-4" />
                    Clear All Cache
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaDatabase className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Cached Items</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{metrics.sessionStorageItems}</p>
                    <p className="text-xs text-blue-700 mt-1">{formatBytes(metrics.sessionStorageSize)}</p>
                </div>

                <div className={`rounded-lg p-4 ${efficiency >= 50 ? 'bg-green-50' : 'bg-yellow-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {efficiency >= 50 ? (
                            <FaCheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                            <FaTimesCircle className="w-5 h-5 text-yellow-600" />
                        )}
                        <span className={`text-sm font-medium ${efficiency >= 50 ? 'text-green-900' : 'text-yellow-900'}`}>
                            Efficiency
                        </span>
                    </div>
                    <p className={`text-3xl font-bold ${efficiency >= 50 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {efficiency}%
                    </p>
                    <p className={`text-xs mt-1 ${efficiency >= 50 ? 'text-green-700' : 'text-yellow-700'}`}>
                        {efficiency >= 70 ? 'Excellent' : efficiency >= 50 ? 'Good' : 'Needs improvement'}
                    </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FaChartLine className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Cache Types</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">
                        {metrics.itemsByType ? Object.keys(metrics.itemsByType).length : 0}
                    </p>
                    <p className="text-xs text-purple-700 mt-1">
                        {metrics.itemsByType ? Object.keys(metrics.itemsByType).join(', ') : 'None'}
                    </p>
                </div>
            </div>

            {/* Recommendations */}
            {metrics.recommendations && metrics.recommendations.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-amber-900 mb-2">💡 Recommendations</h4>
                    <ul className="space-y-1">
                        {metrics.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-amber-800">• {rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Info */}
            <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-600">
                    <strong>Caching Strategy:</strong> Client-side (sessionStorage 2min TTL) + Server-side (React cache + unstable_cache 1hr) + Firebase local cache (persistent)
                </p>
            </div>
        </div>
    );
}


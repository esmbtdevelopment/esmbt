"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DragDropList from '@/components/admin/DragDropList';
import * as FaIcons from 'react-icons/fa';

export default function ServicesManagement() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [locale, setLocale] = useState('en');
    const [reordering, setReordering] = useState(false);
    const router = useRouter();

    // Fetch services with caching
    const fetchServices = async (forceRefresh = false) => {
        try {
            setLoading(true);

            // Build cache key
            const cacheKey = `services:${locale}:${statusFilter}`;

            // Check if we should use cache
            if (!forceRefresh) {
                const cachedData = sessionStorage.getItem(cacheKey);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    const age = Date.now() - timestamp;

                    // Use cache if less than 2 minutes old
                    if (age < 2 * 60 * 1000) {
                        console.log('[Cache] Using cached services data');
                        setServices(data);
                        setLoading(false);
                        return;
                    }
                }
            }

            console.log('[API] Fetching services from server');
            const response = await fetch(`/api/services?locale=${locale}&status=${statusFilter}`);
            const result = await response.json();

            if (result.success) {
                setServices(result.services);

                // Cache the result
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    data: result.services,
                    timestamp: Date.now()
                }));
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [locale, statusFilter]);

    // Filter services by search term
    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle reorder
    const handleReorder = async (newServices) => {
        setServices(newServices);
        setReordering(true);

        try {
            const serviceIds = newServices.map(s => s.id);
            const response = await fetch('/api/services', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reorder', serviceIds })
            });

            const data = await response.json();
            if (!data.success) {
                console.error('Failed to reorder services');
                fetchServices(true); // Force refresh on error
            } else {
                // Update local state only, no refetch needed
                console.log('[Optimized] Order saved, using local state');
            }
        } catch (error) {
            console.error('Error reordering services:', error);
            fetchServices(true);
        } finally {
            setReordering(false);
        }
    };

    // Toggle status
    const handleToggleStatus = async (serviceId, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';

        try {
            const response = await fetch('/api/services', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle-status', serviceId, status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                // Update local state instead of refetching
                setServices(prev => prev.map(service =>
                    service.id === serviceId ? { ...service, status: newStatus } : service
                ));
                console.log('[Optimized] Status toggled, using local state');
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    // Delete service
    const handleDelete = async (serviceId, serviceName) => {
        if (!confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/services/${serviceId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
                // Update local state instead of refetching
                setServices(prev => prev.filter(service => service.id !== serviceId));
                console.log('[Optimized] Service deleted, using local state');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    // Render individual service card
    const renderServiceCard = (service) => {
        const IconComponent = service.iconName && FaIcons[service.iconName] ? FaIcons[service.iconName] : FaIcons.FaCogs;

        return (
            <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                    {/* Icon/Image */}
                    <div className="flex-shrink-0">
                        {service.iconType === 'image' && service.imageUrl ? (
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-8 h-8 text-indigo-600" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    /{service.slug}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {service.status}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {service.description}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-4">
                            <button
                                onClick={() => router.push(`/admin/services/edit/${service.id}`)}
                                className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleToggleStatus(service.id, service.status)}
                                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                {service.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                                onClick={() => handleDelete(service.id, service.title)}
                                className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
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
                            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
                            <p className="text-gray-600 mt-1">Manage your service offerings</p>
                        </div>
                        <Link href="/admin/services/edit/new">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Service
                            </button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search services..."
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
                ) : filteredServices.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm ? 'Try adjusting your search' : 'Get started by creating a new service'}
                        </p>
                        {!searchTerm && (
                            <div className="mt-6">
                                <Link href="/admin/services/edit/new">
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                        Add Service
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                            {reordering && <span className="ml-2 text-indigo-600">(Saving order...)</span>}
                        </div>

                        <DragDropList
                            items={filteredServices}
                            onReorder={handleReorder}
                            renderItem={renderServiceCard}
                            idKey="id"
                        />
                    </>
                )}
            </div>
        </div>
    );
}


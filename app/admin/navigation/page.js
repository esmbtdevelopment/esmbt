"use client";
import React, { useState, useEffect } from 'react';
import DragDropList from '@/components/admin/DragDropList';
import IconPicker from '@/components/admin/IconPicker';
import * as FaIcons from 'react-icons/fa';

export default function NavigationManagement() {
    const [navigation, setNavigation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locale, setLocale] = useState('en');
    const [section, setSection] = useState('main');
    const [reordering, setReordering] = useState(false);

    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showChildModal, setShowChildModal] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editingParent, setEditingParent] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        label: '',
        labelKey: '',
        href: '',
        type: 'link',
        icon: 'FaHome',
        status: 'published',
        section: 'main',
        locale: 'en',
        order: 999,
    });

    // Fetch navigation with caching
    const fetchNavigation = async (forceRefresh = false) => {
        try {
            setLoading(true);

            // Build cache key
            const cacheKey = `nav:${locale}:${section}`;

            // Check if we should use cache
            if (!forceRefresh) {
                const cachedData = sessionStorage.getItem(cacheKey);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    const age = Date.now() - timestamp;

                    // Use cache if less than 2 minutes old
                    if (age < 2 * 60 * 1000) {
                        console.log('[Cache] Using cached navigation data');
                        setNavigation(data);
                        setLoading(false);
                        return;
                    }
                }
            }

            console.log('[API] Fetching navigation from server');
            const response = await fetch(`/api/navigation?locale=${locale}&section=${section}&admin=true`);
            const result = await response.json();

            if (result.success) {
                setNavigation(result.navigation);

                // Cache the result
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    data: result.navigation,
                    timestamp: Date.now()
                }));
            }
        } catch (error) {
            console.error('Error fetching navigation:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNavigation();
    }, [locale, section]);

    // Handle reorder top-level items
    const handleReorder = async (newNavigation) => {
        setNavigation(newNavigation);
        setReordering(true);

        try {
            const navIds = newNavigation.map(n => n.id);
            const response = await fetch('/api/navigation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reorder', navIds })
            });

            const data = await response.json();
            if (!data.success) {
                console.error('Failed to reorder navigation');
                fetchNavigation(true); // Force refresh on error
            } else {
                // Update local state only, no refetch needed
                console.log('[Optimized] Order saved, using local state');
            }
        } catch (error) {
            console.error('Error reordering navigation:', error);
            fetchNavigation(true); // Force refresh on error
        } finally {
            setReordering(false);
        }
    };

    // Handle reorder children
    const handleReorderChildren = async (parentId, newChildren) => {
        try {
            const childIds = newChildren.map(c => c.id);
            const response = await fetch('/api/navigation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'reorder', navIds: childIds, parentId })
            });

            const data = await response.json();
            if (data.success) {
                // Update local state instead of refetching
                setNavigation(prev => prev.map(item =>
                    item.id === parentId ? { ...item, children: newChildren } : item
                ));
                console.log('[Optimized] Children order saved, using local state');
            }
        } catch (error) {
            console.error('Error reordering children:', error);
        }
    };

    // Toggle status
    const handleToggleStatus = async (navId, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'hidden' : 'published';

        try {
            const response = await fetch('/api/navigation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle-status', navId, status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                // Update local state instead of refetching
                setNavigation(prev => prev.map(item =>
                    item.id === navId ? { ...item, status: newStatus } : item
                ));
                console.log('[Optimized] Status toggled, using local state');
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    // Delete navigation item
    const handleDelete = async (navId, navLabel) => {
        if (!confirm(`Are you sure you want to delete "${navLabel}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/navigation/${navId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
                // Update local state instead of refetching
                setNavigation(prev => prev.filter(item => item.id !== navId));
                console.log('[Optimized] Item deleted, using local state');
            }
        } catch (error) {
            console.error('Error deleting navigation item:', error);
        }
    };

    // Open edit modal
    const openEditModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                ...item,
                children: undefined // Don't include children in form
            });
        } else {
            setEditingItem(null);
            setFormData({
                label: '',
                labelKey: '',
                href: '',
                type: 'link',
                icon: 'FaHome',
                status: 'published',
                section,
                locale,
                order: 999,
            });
        }
        setShowEditModal(true);
    };

    // Open child modal
    const openChildModal = (parent) => {
        setEditingParent(parent);
        setFormData({
            label: '',
            labelKey: '',
            description: '',
            descriptionKey: '',
            href: '',
            icon: 'FaHome',
            order: (parent.children?.length || 0) + 1,
        });
        setShowChildModal(true);
    };

    // Save navigation item
    const handleSave = async () => {
        try {
            const url = editingItem ? `/api/navigation/${editingItem.id}` : '/api/navigation';
            const method = editingItem ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                alert(editingItem ? 'Navigation item updated!' : 'Navigation item created!');
                setShowEditModal(false);
                // Force refresh after create/update to get latest data
                fetchNavigation(true);
            } else {
                alert('Failed to save: ' + data.error);
            }
        } catch (error) {
            console.error('Error saving navigation item:', error);
            alert('Failed to save navigation item');
        }
    };

    // Save child
    const handleSaveChild = async () => {
        try {
            const response = await fetch('/api/navigation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'add-child',
                    parentId: editingParent.id,
                    childData: formData
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Child item added!');
                setShowChildModal(false);
                // Force refresh after adding child to get complete data
                fetchNavigation(true);
            } else {
                alert('Failed to add child: ' + data.error);
            }
        } catch (error) {
            console.error('Error adding child:', error);
            alert('Failed to add child');
        }
    };

    // Render navigation item
    const renderNavItem = (item) => {
        const IconComponent = item.icon && FaIcons[item.icon] ? FaIcons[item.icon] : FaIcons.FaCircle;

        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Main item */}
                <div className="p-4">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {item.label}
                                        </h3>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.type === 'dropdown'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {item.type}
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    {item.labelKey && (
                                        <p className="text-xs text-gray-500 mt-1">Key: {item.labelKey}</p>
                                    )}
                                    {item.href && (
                                        <p className="text-xs text-gray-500 mt-1">Link: {item.href}</p>
                                    )}
                                    {item.children && item.children.length > 0 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.children.length} dropdown item{item.children.length !== 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    onClick={() => openEditModal(item)}
                                    className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
                                >
                                    Edit
                                </button>
                                {item.type === 'dropdown' && (
                                    <button
                                        onClick={() => openChildModal(item)}
                                        className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors"
                                    >
                                        Add Child
                                    </button>
                                )}
                                <button
                                    onClick={() => handleToggleStatus(item.id, item.status)}
                                    className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                                >
                                    {item.status === 'published' ? 'Hide' : 'Publish'}
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id, item.label)}
                                    className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Children */}
                {item.children && item.children.length > 0 && (
                    <div className="bg-gray-50 border-t border-gray-200 p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Dropdown Items:</h4>
                        <div className="space-y-2">
                            {item.children.map((child) => {
                                const ChildIcon = child.icon && FaIcons[child.icon] ? FaIcons[child.icon] : FaIcons.FaCircle;
                                return (
                                    <div key={child.id} className="bg-white rounded border border-gray-200 p-3 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                            <ChildIcon className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{child.label}</p>
                                            {child.description && (
                                                <p className="text-xs text-gray-500 mt-0.5">{child.description}</p>
                                            )}
                                            {child.href && (
                                                <p className="text-xs text-gray-400 mt-0.5">{child.href}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
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
                            <h1 className="text-3xl font-bold text-gray-900">Navigation Management</h1>
                            <p className="text-gray-600 mt-1">Manage menu structure and links</p>
                        </div>
                        <button
                            onClick={() => openEditModal()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Navigation Item
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4">
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="en">English</option>
                            <option value="tr">Turkish</option>
                        </select>
                        <select
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="main">Main Menu</option>
                            <option value="footer">Footer Menu</option>
                            <option value="mobile">Mobile Menu</option>
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
                ) : navigation.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No navigation items</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new navigation item</p>
                        <div className="mt-6">
                            <button
                                onClick={() => openEditModal()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Add Navigation Item
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            {navigation.length} navigation item{navigation.length !== 1 ? 's' : ''}
                            {reordering && <span className="ml-2 text-indigo-600">(Saving order...)</span>}
                        </div>

                        <DragDropList
                            items={navigation}
                            onReorder={handleReorder}
                            renderItem={renderNavItem}
                            idKey="id"
                        />
                    </>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Label <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        placeholder="Corporate"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Translation Key (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.labelKey || ''}
                                        onChange={(e) => setFormData({ ...formData, labelKey: e.target.value })}
                                        placeholder="navigation.corporate"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="link">Link</option>
                                        <option value="dropdown">Dropdown</option>
                                    </select>
                                </div>

                                {formData.type === 'link' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Link URL
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.href || ''}
                                            onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                                            placeholder="/about"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Icon
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                                            {formData.icon && FaIcons[formData.icon] &&
                                                React.createElement(FaIcons[formData.icon], { className: 'w-6 h-6 text-indigo-600' })
                                            }
                                        </div>
                                        <button
                                            onClick={() => setShowIconPicker(true)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Choose Icon
                                        </button>
                                        <span className="text-sm text-gray-600">{formData.icon}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="published">Published</option>
                                        <option value="hidden">Hidden</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Child Modal */}
            {showChildModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Add Dropdown Item to "{editingParent?.label}"
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Label <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        placeholder="About Us"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Translation Key (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.labelKey || ''}
                                        onChange={(e) => setFormData({ ...formData, labelKey: e.target.value })}
                                        placeholder="navigation.about"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Learn about our company"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description Key (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.descriptionKey || ''}
                                        onChange={(e) => setFormData({ ...formData, descriptionKey: e.target.value })}
                                        placeholder="navigation.dropdown.corporate.aboutDescription"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Link URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.href || ''}
                                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                                        placeholder="/corporate/about-us"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Icon
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                                            {formData.icon && FaIcons[formData.icon] &&
                                                React.createElement(FaIcons[formData.icon], { className: 'w-6 h-6 text-indigo-600' })
                                            }
                                        </div>
                                        <button
                                            onClick={() => setShowIconPicker(true)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Choose Icon
                                        </button>
                                        <span className="text-sm text-gray-600">{formData.icon}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setShowChildModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveChild}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Add Child
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Icon Picker */}
            {showIconPicker && (
                <IconPicker
                    selectedIcon={formData.icon}
                    onSelect={(icon) => setFormData({ ...formData, icon })}
                    onClose={() => setShowIconPicker(false)}
                />
            )}
        </div>
    );
}


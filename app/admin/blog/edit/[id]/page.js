"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';
import Modal from '@/components/admin/Modal';

export default function BlogPostEditor() {
    const router = useRouter();
    const params = useParams();
    const isNew = params.id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [availableTags, setAvailableTags] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [modal, setModal] = useState({ isOpen: false, type: 'confirm', title: '', message: '', onConfirm: null });

    // Form state
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        author: '',
        category: '',
        tags: [],
        status: 'draft',
        locale: 'en',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });

    // Load post data if editing
    useEffect(() => {
        if (!isNew) {
            fetchPost();
        }
        fetchMetadata();
    }, [params.id]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${params.id}`);
            const data = await response.json();

            if (data.success) {
                setFormData({
                    ...data.post,
                    tags: data.post.tags || [],
                });
            }
        } catch (error) {
            console.error('Error fetching blog post:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMetadata = async () => {
        try {
            const [tagsRes, categoriesRes] = await Promise.all([
                fetch(`/api/blog?locale=${formData.locale}&action=tags`),
                fetch(`/api/blog?locale=${formData.locale}&action=categories`)
            ]);

            const tagsData = await tagsRes.json();
            const categoriesData = await categoriesRes.json();

            if (tagsData.success) setAvailableTags(tagsData.tags);
            if (categoriesData.success) setAvailableCategories(categoriesData.categories);
        } catch (error) {
            console.error('Error fetching metadata:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTag = (tag) => {
        const trimmedTag = tag.trim().toLowerCase();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, trimmedTag]
            }));
        }
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (value) => {
        handleInputChange('title', value);
        if (isNew && !formData.slug) {
            handleInputChange('slug', generateSlug(value));
        }
    };

    const handleSave = async (publishStatus = null) => {
        setSaving(true);

        try {
            // Basic validation
            if (!formData.title.trim()) {
                alert('Title is required');
                setSaving(false);
                return;
            }

            if (!formData.slug.trim()) {
                alert('Slug is required');
                setSaving(false);
                return;
            }

            const dataToSave = {
                ...formData,
                status: publishStatus || formData.status,
                // Auto-generate SEO fields if empty
                seoTitle: formData.seoTitle || formData.title,
                seoDescription: formData.seoDescription || formData.excerpt,
            };

            const url = isNew ? '/api/blog' : `/api/blog/${params.id}`;
            const method = 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            });

            const data = await response.json();

            if (data.success) {
                setModal({
                    isOpen: true,
                    type: 'alert',
                    title: 'Success',
                    message: isNew ? 'Blog post created successfully!' : 'Blog post updated successfully!',
                    confirmText: 'OK',
                    showCancel: false,
                    onConfirm: () => {
                        router.push('/admin/blog');
                    }
                });
            } else {
                setModal({
                    isOpen: true,
                    type: 'warning',
                    title: 'Error',
                    message: `Failed to save blog post: ${data.error}`,
                    confirmText: 'OK',
                    showCancel: false,
                    onConfirm: () => { }
                });
            }
        } catch (error) {
            console.error('Error saving blog post:', error);
            setModal({
                isOpen: true,
                type: 'warning',
                title: 'Error',
                message: 'An error occurred while saving the blog post. Please try again.',
                confirmText: 'OK',
                showCancel: false,
                onConfirm: () => { }
            });
        } finally {
            setSaving(false);
        }
    };

    const steps = [
        { number: 1, title: 'Basic Info' },
        { number: 2, title: 'Content' },
        { number: 3, title: 'SEO & Meta' },
        { number: 4, title: 'Review' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {isNew ? 'Create Blog Post' : 'Edit Blog Post'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {isNew ? 'Write a new blog post' : 'Update blog post information'}
                            </p>
                        </div>
                        <button
                            onClick={() => router.push('/admin/blog')}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <button
                                        onClick={() => setCurrentStep(step.number)}
                                        className={`flex flex-col items-center cursor-pointer ${currentStep === step.number
                                            ? 'text-indigo-600'
                                            : currentStep > step.number
                                                ? 'text-green-600'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep === step.number
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : currentStep > step.number
                                                ? 'border-green-600 bg-green-50'
                                                : 'border-gray-300'
                                            }`}>
                                            {currentStep > step.number ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <span className="font-semibold">{step.number}</span>
                                            )}
                                        </div>
                                        <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 ${currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                                            }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Locale
                                    </label>
                                    <select
                                        value={formData.locale}
                                        onChange={(e) => handleInputChange('locale', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="en">English</option>
                                        <option value="tr">Turkish</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => handleInputChange('author', e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Your Amazing Blog Post Title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    placeholder="your-amazing-blog-post"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (lowercase, hyphens only)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                    rows={3}
                                    placeholder="Brief summary of your blog post (recommended: 150-160 characters)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.excerpt.length} characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="">Select or type new category</option>
                                        {availableCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        placeholder="Or type new"
                                        className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddTag(tagInput);
                                            }
                                        }}
                                        placeholder="Type tag and press Enter"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleAddTag(tagInput)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Current Tags */}
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                            >
                                                #{tag}
                                                <button
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="hover:text-indigo-600 cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Suggested Tags */}
                                {availableTags.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {availableTags
                                                .filter(tag => !formData.tags.includes(tag))
                                                .slice(0, 10)
                                                .map((tag, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleAddTag(tag)}
                                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        #{tag}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Content */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Content</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Post Content
                                </label>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(value) => handleInputChange('content', value)}
                                    placeholder="Write your blog post content here..."
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Word count: {formData.content.split(/\s+/).filter(w => w).length} words
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: SEO & Meta */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">SEO & Metadata</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SEO Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.seoTitle}
                                    onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                                    placeholder={formData.title || "Leave empty to use post title"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.seoTitle.length} / 60 characters (optimal)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SEO Description
                                </label>
                                <textarea
                                    value={formData.seoDescription}
                                    onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                                    rows={3}
                                    placeholder={formData.excerpt || "Leave empty to use excerpt"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.seoDescription.length} / 160 characters (optimal)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SEO Keywords (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.seoKeywords}
                                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                                    placeholder="sap, consulting, erp, business"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Review & Publish</h2>

                            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Title</p>
                                    <p className="font-medium">{formData.title || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Slug</p>
                                    <p className="font-medium">/{formData.slug || 'not-set'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Author</p>
                                    <p className="font-medium">{formData.author || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Category</p>
                                    <p className="font-medium">{formData.category || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Tags</p>
                                    <p className="font-medium">{formData.tags.length > 0 ? formData.tags.join(', ') : 'No tags'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Content Length</p>
                                    <p className="font-medium">
                                        {formData.content.split(/\s+/).filter(w => w).length} words
                                        {' '}({Math.ceil(formData.content.split(/\s+/).filter(w => w).length / 200)} min read)
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Featured Image</p>
                                    <p className="font-medium">{formData.featuredImage ? 'Uploaded' : 'Not uploaded'}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                            disabled={currentStep === 1}
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {currentStep === 4 ? (
                                <>
                                    <button
                                        onClick={() => handleSave('draft')}
                                        disabled={saving}
                                        className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        {saving ? 'Saving...' : 'Save as Draft'}
                                    </button>
                                    <button
                                        onClick={() => handleSave('published')}
                                        disabled={saving}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        {saving ? 'Publishing...' : 'Publish'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                onConfirm={modal.onConfirm || (() => { })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                confirmText={modal.confirmText}
                cancelText={modal.cancelText}
                showCancel={modal.showCancel !== false}
            />
        </div>
    );
}


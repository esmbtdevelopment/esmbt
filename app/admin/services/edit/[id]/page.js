"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import IconPicker from '@/components/admin/IconPicker';
import * as FaIcons from 'react-icons/fa';

export default function ServiceEditor() {
    const router = useRouter();
    const params = useParams();
    const isNew = params.id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [pickingIconFor, setPickingIconFor] = useState(null); // 'main' or feature index

    // Form state
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        subtitle: '',
        description: '',
        heroDescription: '',
        fullDescription: '',
        iconType: 'icon', // 'icon' or 'image'
        iconName: 'FaCogs',
        imageUrl: '',
        benefits: [''],
        features: [{ title: '', description: '', icon: 'FaCheck' }],
        implementation: [''],
        industries: [''],
        roi: '',
        status: 'draft',
        locale: 'en',
        category: 'sap-services',
    });

    // Load service data if editing
    useEffect(() => {
        if (!isNew) {
            fetchService();
        }
    }, [params.id]);

    const fetchService = async () => {
        try {
            const response = await fetch(`/api/services/${params.id}`);
            const data = await response.json();

            if (data.success) {
                setFormData({
                    ...data.service,
                    benefits: data.service.benefits || [''],
                    features: data.service.features || [{ title: '', description: '', icon: 'FaCheck' }],
                    implementation: data.service.implementation || [''],
                    industries: data.service.industries || [''],
                });
            }
        } catch (error) {
            console.error('Error fetching service:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayAdd = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const handleArrayRemove = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const handleFeatureChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((feature, i) =>
                i === index ? { ...feature, [field]: value } : feature
            )
        }));
    };

    const handleFeatureAdd = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, { title: '', description: '', icon: 'FaCheck' }]
        }));
    };

    const handleFeatureRemove = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleIconSelect = (iconName) => {
        if (pickingIconFor === 'main') {
            setFormData(prev => ({ ...prev, iconName }));
        } else if (typeof pickingIconFor === 'number') {
            handleFeatureChange(pickingIconFor, 'icon', iconName);
        }
    };

    const handleSave = async (publishStatus = null) => {
        setSaving(true);

        try {
            const dataToSave = {
                ...formData,
                status: publishStatus || formData.status,
                // Filter out empty strings from arrays
                benefits: formData.benefits.filter(b => b.trim()),
                implementation: formData.implementation.filter(i => i.trim()),
                industries: formData.industries.filter(i => i.trim()),
            };

            const url = isNew ? '/api/services' : `/api/services/${params.id}`;
            const method = 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            });

            const data = await response.json();

            if (data.success) {
                alert('Service saved successfully!');
                router.push('/admin/services');
            } else {
                alert('Failed to save service: ' + data.error);
            }
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service');
        } finally {
            setSaving(false);
        }
    };

    const steps = [
        { number: 1, title: 'Basic Info' },
        { number: 2, title: 'Icon/Image' },
        { number: 3, title: 'Features' },
        { number: 4, title: 'Details' },
        { number: 5, title: 'Review' },
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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {isNew ? 'Create Service' : 'Edit Service'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {isNew ? 'Add a new service to your offerings' : 'Update service information'}
                            </p>
                        </div>
                        <button
                            onClick={() => router.push('/admin/services')}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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
                                        className={`flex flex-col items-center ${currentStep === step.number
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    placeholder="strategic-sap-consulting"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (lowercase, hyphens only)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Strategic SAP Consulting"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                    placeholder="Expert SAP Transformation Guidance"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Short Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={3}
                                    placeholder="Brief description for cards and listings"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hero Description
                                </label>
                                <textarea
                                    value={formData.heroDescription}
                                    onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                                    rows={2}
                                    placeholder="Description for hero section"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Description
                                </label>
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                    rows={4}
                                    placeholder="Detailed description for service page"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

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
                            </div>
                        </div>
                    )}

                    {/* Step 2: Icon/Image */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Icon or Image</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Choose Type
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleInputChange('iconType', 'icon')}
                                        className={`flex-1 p-4 border-2 rounded-lg transition-all ${formData.iconType === 'icon'
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                            </svg>
                                            <p className="font-medium">Icon</p>
                                            <p className="text-sm text-gray-500">Choose from icon library</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleInputChange('iconType', 'image')}
                                        className={`flex-1 p-4 border-2 rounded-lg transition-all ${formData.iconType === 'image'
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="font-medium">Image</p>
                                            <p className="text-sm text-gray-500">Upload custom image</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {formData.iconType === 'icon' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selected Icon
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-indigo-50 rounded-lg flex items-center justify-center">
                                            {formData.iconName && FaIcons[formData.iconName] &&
                                                React.createElement(FaIcons[formData.iconName], { className: 'w-10 h-10 text-indigo-600' })
                                            }
                                        </div>
                                        <button
                                            onClick={() => {
                                                setPickingIconFor('main');
                                                setShowIconPicker(true);
                                            }}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Choose Icon
                                        </button>
                                        <span className="text-sm text-gray-600">{formData.iconName}</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Enter the full URL of the image</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Features */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Features</h2>
                                <button
                                    onClick={handleFeatureAdd}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                >
                                    Add Feature
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.features.map((feature, index) => {
                                    const FeatureIcon = FaIcons[feature.icon] || FaIcons.FaCheck;
                                    return (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer"
                                                        onClick={() => {
                                                            setPickingIconFor(index);
                                                            setShowIconPicker(true);
                                                        }}
                                                    >
                                                        <FeatureIcon className="w-6 h-6 text-indigo-600" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <input
                                                        type="text"
                                                        value={feature.title}
                                                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                                        placeholder="Feature title"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    />
                                                    <textarea
                                                        value={feature.description}
                                                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                                        placeholder="Feature description"
                                                        rows={2}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleFeatureRemove(index)}
                                                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Details */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Additional Details</h2>

                            {/* Benefits */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Benefits
                                    </label>
                                    <button
                                        onClick={() => handleArrayAdd('benefits')}
                                        className="text-sm text-indigo-600 hover:text-indigo-700"
                                    >
                                        + Add
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.benefits.map((benefit, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={benefit}
                                                onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                                                placeholder="Enter benefit"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                            {formData.benefits.length > 1 && (
                                                <button
                                                    onClick={() => handleArrayRemove('benefits', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Implementation Steps */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Implementation Steps
                                    </label>
                                    <button
                                        onClick={() => handleArrayAdd('implementation')}
                                        className="text-sm text-indigo-600 hover:text-indigo-700"
                                    >
                                        + Add
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.implementation.map((step, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={step}
                                                onChange={(e) => handleArrayChange('implementation', index, e.target.value)}
                                                placeholder="Enter implementation step"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                            {formData.implementation.length > 1 && (
                                                <button
                                                    onClick={() => handleArrayRemove('implementation', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Industries */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Industries
                                    </label>
                                    <button
                                        onClick={() => handleArrayAdd('industries')}
                                        className="text-sm text-indigo-600 hover:text-indigo-700"
                                    >
                                        + Add
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.industries.map((industry, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={industry}
                                                onChange={(e) => handleArrayChange('industries', index, e.target.value)}
                                                placeholder="Enter industry"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                            {formData.industries.length > 1 && (
                                                <button
                                                    onClick={() => handleArrayRemove('industries', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ROI */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ROI Statement
                                </label>
                                <input
                                    type="text"
                                    value={formData.roi}
                                    onChange={(e) => handleInputChange('roi', e.target.value)}
                                    placeholder="Achieve 30% faster SAP implementation with strategic planning"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 5: Review */}
                    {currentStep === 5 && (
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
                                    <p className="text-sm text-gray-600">Features</p>
                                    <p className="font-medium">{formData.features.filter(f => f.title).length} features</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Benefits</p>
                                    <p className="font-medium">{formData.benefits.filter(b => b).length} benefits</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Industries</p>
                                    <p className="font-medium">{formData.industries.filter(i => i).length} industries</p>
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
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {currentStep === 5 ? (
                                <>
                                    <button
                                        onClick={() => handleSave('draft')}
                                        disabled={saving}
                                        className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save as Draft'}
                                    </button>
                                    <button
                                        onClick={() => handleSave('published')}
                                        disabled={saving}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                    >
                                        {saving ? 'Publishing...' : 'Publish'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Icon Picker Modal */}
            {showIconPicker && (
                <IconPicker
                    selectedIcon={
                        pickingIconFor === 'main'
                            ? formData.iconName
                            : formData.features[pickingIconFor]?.icon
                    }
                    onSelect={handleIconSelect}
                    onClose={() => setShowIconPicker(false)}
                />
            )}
        </div>
    );
}


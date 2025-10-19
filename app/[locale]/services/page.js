"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from 'next-intl';
import { FaChevronRight } from "react-icons/fa";
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';
import * as FaIcons from 'react-icons/fa';

function ServicesPage() {
    const t = useDebugTranslations('services');
    const tCommon = useDebugTranslations('common');
    const locale = useLocale();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch services from Firestore
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`/api/services?locale=${locale}&status=published`);
                const data = await response.json();

                if (data.success) {
                    setServices(data.services);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [locale]);

    // Render icon from icon name or image URL
    const renderIcon = (service) => {
        if (service.iconType === 'image' && service.imageUrl) {
            return (
                <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-8 h-8 object-contain"
                />
            );
        } else if (service.iconName && FaIcons[service.iconName]) {
            const IconComponent = FaIcons[service.iconName];
            return <IconComponent className="w-8 h-8 text-sky-600" />;
        } else {
            // Default fallback icon
            return <FaIcons.FaCogs className="w-8 h-8 text-sky-600" />;
        }
    };

    // Extract feature titles from features array
    const getFeaturesList = (service) => {
        if (!service.features || !Array.isArray(service.features)) return [];

        // If features are objects with title property
        if (service.features.length > 0 && typeof service.features[0] === 'object') {
            return service.features.map(f => f.title || f.description || '').filter(Boolean);
        }

        // If features are simple strings
        return service.features.filter(Boolean);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 sm:py-32 lg:py-40 pt-24 sm:pt-32 lg:pt-40">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-sora leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-montserrat leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 sm:py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                            <span className="relative inline-block text-sky-600">
                                {t('hero.sectionTitle')}
                                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto px-4">
                            Comprehensive digital transformation solutions tailored for your business needs.
                            From compliance to commerce, we&apos;ve got you covered.
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : services.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No services available at the moment.</p>
                        </div>
                    ) : (
                        <>
                            {/* Services Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                                {services.map((service) => {
                                    const featuresList = getFeaturesList(service);

                                    return (
                                        <div
                                            key={service.id}
                                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-sky-200"
                                        >
                                            {/* Top Accent Line */}
                                            <div className="h-1 bg-gradient-to-r from-sky-500 to-sky-600"></div>

                                            {/* Card Content */}
                                            <div className="p-6 sm:p-8">
                                                {/* Icon Container */}
                                                <div className="relative mb-6">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl flex items-center justify-center group-hover:from-sky-100 group-hover:to-sky-200 transition-colors duration-300">
                                                        <div className="text-sky-600 text-2xl">
                                                            {renderIcon(service)}
                                                        </div>
                                                    </div>
                                                    {/* Subtle background decoration */}
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-sky-100 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                                                </div>

                                                {/* Service Title */}
                                                <h3 className="text-xl sm:text-2xl font-bold font-sora text-gray-900 mb-3 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                                                    {service.title}
                                                </h3>

                                                {/* Service Description */}
                                                <p className="text-gray-600 font-montserrat text-sm sm:text-base leading-relaxed mb-6">
                                                    {service.description}
                                                </p>

                                                {/* Key Features */}
                                                {featuresList.length > 0 && (
                                                    <div className="mb-8">
                                                        <h4 className="text-sm font-semibold text-gray-800 font-sora mb-3 uppercase tracking-wide">
                                                            Key Features
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {featuresList.slice(0, 3).map((feature, featureIndex) => (
                                                                <div key={featureIndex} className="flex items-start space-x-3">
                                                                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-sky-600 rounded-full mt-2"></div>
                                                                    <span className="text-gray-700 font-montserrat text-sm leading-relaxed">
                                                                        {feature}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                            {featuresList.length > 3 && (
                                                                <div className="flex items-center space-x-3 mt-2">
                                                                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                                                                    <span className="text-gray-500 font-montserrat text-sm italic">
                                                                        +{featuresList.length - 3} more capabilities
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* CTA Button */}
                                                <Link href={`/${locale}/services/${service.slug}`}>
                                                    <button className="w-full cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn shadow-sm hover:shadow-md">
                                                        <span className="text-sm sm:text-base font-montserrat">{tCommon('learnMore')}</span>
                                                        <FaChevronRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* Hover Effect Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Bottom CTA Section */}
                            <div className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
                                <div className="max-w-3xl mx-auto">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-sora mb-4">
                                        {tCommon('readyToWorkWithUs')}
                                    </h3>
                                    <p className="text-gray-300 font-montserrat text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
                                        {t('additionalServices.description')}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link href={`/${locale}/contact`}>
                                            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 w-full sm:w-auto">
                                                <span className="text-sm sm:text-base">{tCommon('getFreeConsultation')}</span>
                                                <FaChevronRight className="text-sm" />
                                            </button>
                                        </Link>
                                        {services.length > 0 && (
                                            <Link href={`/${locale}/services/${services[0].slug}`}>
                                                <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                                                    <span className="text-sm sm:text-base">View First Service</span>
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ServicesPage;

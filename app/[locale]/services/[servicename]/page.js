"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import { isOnLandingPage, scrollToSection } from "@/utils/navigation";
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();
    const serviceName = params.servicename;

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const tCommon = useDebugTranslations('common');

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services?locale=${locale}&status=published`);
                const data = await response.json();

                if (data.success) {
                    const foundService = data.services.find(s => s.slug === serviceName);
                    if (foundService) {
                        setService(foundService);
                    } else {
                        setNotFound(true);
                    }
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Error fetching service:', error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceName, locale]);

    const handleContactClick = () => {
        const onLandingPage = isOnLandingPage();
        scrollToSection('contact', onLandingPage);
    };

    // Render icon
    const renderIcon = (iconName, className = "w-8 h-8") => {
        if (iconName && FaIcons[iconName]) {
            const IconComponent = FaIcons[iconName];
            return <IconComponent className={className} />;
        }
        return <FaIcons.FaCheck className={className} />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (notFound || !service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href={`/${locale}/services`}>
                        <button className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                            View All Services
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 sm:py-32 lg:py-40 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    {/* Back Button */}
                    <Link href={`/${locale}/services`}>
                        <button className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8 group">
                            <FaIcons.FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Services</span>
                        </button>
                    </Link>

                    <div className="max-w-4xl">
                        {/* Service Icon/Image */}
                        {service.iconType === 'image' && service.imageUrl ? (
                            <div className="mb-8">
                                <img
                                    src={service.imageUrl}
                                    alt={service.title}
                                    className="w-24 h-24 rounded-2xl object-cover shadow-2xl"
                                />
                            </div>
                        ) : (
                            <div className="mb-8">
                                <div className="w-24 h-24 bg-sky-600 bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    {renderIcon(service.iconName, "w-12 h-12 text-sky-400")}
                                </div>
                            </div>
                        )}

                        {/* Title and Subtitle */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-sora leading-tight">
                            {service.title}
                        </h1>
                        {service.subtitle && (
                            <p className="text-xl sm:text-2xl text-sky-400 font-semibold mb-6">
                                {service.subtitle}
                            </p>
                        )}
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 font-montserrat leading-relaxed max-w-3xl">
                            {service.heroDescription || service.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <button
                                onClick={handleContactClick}
                                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <span>{tCommon('getFreeConsultation')}</span>
                                <FaIcons.FaChevronRight className="w-4 h-4" />
                            </button>
                            <Link href={`/${locale}/services`}>
                                <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                                    View All Services
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            {service.fullDescription && (
                <section className="py-12 sm:py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                Overview
                            </h2>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-montserrat">
                                {service.fullDescription}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Key Features */}
            {service.features && service.features.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sora">
                                    Key Features
                                </h2>
                                <p className="text-gray-600 font-montserrat">
                                    Comprehensive capabilities tailored to your needs
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                {service.features.map((feature, index) => {
                                    const isObject = typeof feature === 'object';
                                    const title = isObject ? feature.title : feature;
                                    const description = isObject ? feature.description : '';
                                    const icon = isObject ? feature.icon : 'FaCheck';

                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center">
                                                        {renderIcon(icon, "w-6 h-6 text-sky-600")}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sora">
                                                        {title}
                                                    </h3>
                                                    {description && (
                                                        <p className="text-gray-600 text-sm font-montserrat leading-relaxed">
                                                            {description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-sora">
                                Benefits
                            </h2>
                            <div className="space-y-4">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <FaIcons.FaCheck className="w-3 h-3 text-green-600" />
                                            </div>
                                        </div>
                                        <p className="text-gray-700 font-montserrat text-base sm:text-lg">
                                            {benefit}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Implementation Process */}
            {service.implementation && service.implementation.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-sora">
                                Implementation Process
                            </h2>
                            <div className="space-y-6">
                                {service.implementation.map((step, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <p className="text-gray-700 font-montserrat text-base sm:text-lg">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Industries */}
            {service.industries && service.industries.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-sora">
                                Industries We Serve
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {service.industries.map((industry, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        {industry}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ROI Statement */}
            {service.roi && (
                <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-sky-600 to-sky-700 text-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <FaIcons.FaRocket className="w-12 h-12 mx-auto mb-6" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-sora">
                                Expected Results
                            </h2>
                            <p className="text-xl sm:text-2xl font-montserrat leading-relaxed">
                                {service.roi}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-sora">
                            Ready to Get Started?
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 font-montserrat">
                            Contact us today to discuss how we can help transform your business
                        </p>
                        <button
                            onClick={handleContactClick}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                        >
                            <span>{tCommon('getFreeConsultation')}</span>
                            <FaIcons.FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

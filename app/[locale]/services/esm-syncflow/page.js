"use client";
import React from "react";
import Link from "next/link";
import { useLocale } from 'next-intl';
import { useLocalTranslations } from "@/lib/hooks/useLocalTranslations";
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';
import { isOnLandingPage, scrollToSection } from "@/utils/navigation";
import { HeroImage } from '../components/HeroImage';
import {
    FaCogs,
    FaShieldAlt,
    FaChartLine,
    FaCloud,
    FaCheck,
    FaChevronRight,
    FaArrowLeft
} from "react-icons/fa";

import enTranslations from './translations/en.json';
import trTranslations from './translations/tr.json';
import sharedEnTranslations from '../translations/en.json';
import sharedTrTranslations from '../translations/tr.json';

const translations = {
    en: { ...sharedEnTranslations, ...enTranslations },
    tr: { ...sharedTrTranslations, ...trTranslations }
};

export default function ESMSyncFlowPage() {
    const locale = useLocale();
    const t = useLocalTranslations(translations);
    const tUI = useDebugTranslations('productDetails.ui');
    const tNav = useDebugTranslations('navigation');

    const featureIcons = [
        <FaCogs key="icon-1" />,
        <FaShieldAlt key="icon-2" />,
        <FaChartLine key="icon-3" />,
        <FaCloud key="icon-4" />
    ];

    const goToContact = () => {
        scrollToSection('contact', isOnLandingPage());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 text-white py-16 sm:py-20 pt-24 sm:pt-32 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <Link
                            href={`/${locale}/services`}
                            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6 sm:mb-8 transition-colors duration-300"
                        >
                            <FaArrowLeft className="mr-2 text-sm" />
                            <span className="text-sm sm:text-base">{tNav('backToServices')}</span>
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sora mb-2 leading-tight">
                                    {t('hero.title')}
                                </h1>
                                <p className="text-lg sm:text-xl text-sky-300 font-montserrat mb-4 sm:mb-6">
                                    {t('hero.subtitle')}
                                </p>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-montserrat leading-relaxed mb-6 sm:mb-8">
                                    {t('hero.description')}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={goToContact}
                                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 w-full sm:w-auto"
                                    >
                                        <span className="text-sm sm:text-base">{t('cta.primaryButton')}</span>
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </div>
                            </div>
                            <div className="drop-shadow-2xl">
                                <HeroImage
                                    src={t('hero.image')}
                                    alt={t('hero.imageAlt')}
                                    width={1000}
                                    height={1000}
                                    className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                    {tUI('whyChoose')} {t('hero.title')}?
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed mb-6 sm:mb-8">
                                    {t('overview.description')}
                                </p>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {t.raw('benefits').map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <FaCheck className="text-sky-500 mt-1 mr-3 flex-shrink-0 text-sm" />
                                        <span className="text-gray-700 font-montserrat text-sm sm:text-base">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                <span className="relative inline-block text-sky-600">
                                    {t('navigation.keyFeatures')}
                                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                                </span>
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {t.raw('features').map((feature, index) => (
                                <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl text-sky-500 mb-3 sm:mb-4">
                                        {featureIcons[index % featureIcons.length]}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-sora">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Implementation Process */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                {t('implementation.title')}
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 font-montserrat">
                                {t('implementation.description')}
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {t.raw('implementation.steps').map((step, index) => (
                                <div key={index} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-sky-50 transition-colors duration-300">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0 text-sm">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 font-montserrat font-medium text-sm sm:text-base">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries */}
            <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora">
                            {t('industries.title')}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {t.raw('industries.list').map((industry, index) => (
                                <span
                                    key={index}
                                    className="bg-white px-6 py-3 rounded-full border-2 border-sky-200 text-gray-700 font-montserrat font-medium hover:border-sky-400 hover:bg-sky-50 transition-all duration-300"
                                >
                                    {industry}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-sky-900 via-blue-900 to-gray-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-sora">
                                {t('roi.title')}
                            </h2>
                            <p className="text-base sm:text-lg text-gray-300 font-montserrat">
                                {t('roi.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                            {t('cta.title')}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed mb-8">
                            {t('cta.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 w-full sm:w-auto"
                                onClick={goToContact}
                            >
                                <span className="text-sm sm:text-base">{t('cta.primaryButton')}</span>
                                <FaChevronRight className="text-sm" />
                            </button>
                            <Link href={`/${locale}/services`}>
                                <button className="border-2 border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                                    <span className="text-sm sm:text-base">{t('cta.secondaryButton')}</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

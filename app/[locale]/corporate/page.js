"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';
import {
    FaBuilding,
    FaUsers,
    FaHandshake,
    FaHistory,
    FaBriefcase,
    FaArrowRight,
    FaChevronRight,
} from "react-icons/fa";
import {
    RiTeamLine,
    RiLightbulbLine,
    RiRocketLine,
    RiShieldCheckLine,
    RiGlobalLine,
    RiAwardLine,
} from "react-icons/ri";
import { goToContact } from "@/utils/navigation";

export default function CorporatePage() {
    const t = useDebugTranslations('corporate');
    const tCommon = useDebugTranslations('common');

    const corporatePages = [
        {
            title: t('aboutUs.title'),
            description: t('aboutUs.description'),
            icon: <FaBuilding className="text-3xl" />,
            link: "/corporate/about-us",
            gradient: "from-blue-500 to-sky-500",
            features: [t('aboutUs.features.overview'), t('aboutUs.features.values'), t('aboutUs.features.principles')]
        },
        {
            title: t('team.title'),
            description: t('team.description'),
            icon: <FaUsers className="text-3xl" />,
            link: "/corporate/our-team",
            gradient: "from-purple-500 to-indigo-500",
            features: [t('team.features.leadership'), t('team.features.specialists'), t('team.features.experts')]
        },
        {
            title: t('vision.title'),
            description: t('vision.description'),
            icon: <FaHandshake className="text-3xl" />,
            link: "/corporate/vision-and-mission",
            gradient: "from-green-500 to-emerald-500",
            features: [t('vision.features.mission'), t('vision.features.future'), t('vision.features.goals')]
        },
    ];

    const stats = [
        { number: "15+", label: t('stats.yearsOfExcellence'), icon: <RiAwardLine /> },
        { number: "500+", label: t('stats.successfulProjects'), icon: <RiRocketLine /> },
        { number: "200+", label: t('stats.enterpriseClients'), icon: <FaHandshake /> },
        { number: "50+", label: t('stats.expertTeamMembers'), icon: <FaUsers /> },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 relative py-16 sm:py-20 lg:py-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-12 -right-12 sm:-top-24 sm:-right-24 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-12 -left-12 sm:-bottom-24 sm:-left-24 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
                            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                            <span className="text-sky-700 font-semibold font-montserrat text-xs sm:text-sm">{t('badge')}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-sora leading-tight px-2">
                            {t('hero.title')}
                            <span className="block text-sky-400">{t('hero.companyName')}</span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-8 sm:mb-12 font-montserrat leading-relaxed max-w-3xl mx-auto px-4">
                            {t('hero.description')}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16 px-2">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
                                >
                                    <div className="text-sky-600 text-lg sm:text-2xl mb-2 sm:mb-3 flex justify-center">
                                        {stat.icon}
                                    </div>
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 font-sora">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 font-montserrat leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Pages Grid */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora px-2">
                            {t('explore.title')}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat max-w-2xl mx-auto px-4">
                            {t('explore.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                        {corporatePages.map((page, index) => (
                            <Link
                                key={index}
                                href={page.link}
                                className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                {/* Content */}
                                <div className="relative p-6 sm:p-8 lg:p-10">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${page.gradient} text-white rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-xl sm:text-2xl lg:text-3xl">
                                            {page.icon}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-sora group-hover:text-sky-600 transition-colors">
                                        {page.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 font-montserrat leading-relaxed">
                                        {page.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6 sm:mb-8">
                                        {page.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                                                <FaChevronRight className="text-sky-500 text-xs flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center space-x-2 text-sky-600 font-semibold group-hover:text-sky-700 transition-colors text-sm sm:text-base">
                                        <span>{tCommon('learnMore')}</span>
                                        <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-200 rounded-2xl sm:rounded-3xl transition-all duration-300"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="relative max-w-4xl mx-auto">
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-700 to-sky-800 rounded-2xl sm:rounded-3xl opacity-90"></div>

                        {/* Decorative elements - hidden on mobile */}
                        <div className="hidden sm:block absolute top-6 right-6 w-24 h-24 lg:w-32 lg:h-32 border-2 border-white/20 rounded-full animate-pulse"></div>
                        <div className="hidden sm:block absolute bottom-6 left-6 w-16 h-16 lg:w-24 lg:h-24 bg-white/10 rounded-2xl transform rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>

                        {/* Content */}
                        <div className="relative p-8 sm:p-12 lg:p-16 text-white text-center">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 font-sora">
                                {tCommon('readyToWorkWithUs')}
                            </h3>

                            <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 opacity-90 font-montserrat max-w-2xl mx-auto leading-relaxed">
                                {t('description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                                <button
                                    onClick={goToContact}
                                    className="group relative bg-white text-sky-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 font-montserrat shadow-2xl hover:scale-105 text-sm sm:text-base"
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>{tCommon('contactUsToday')}</span>
                                        <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <Link
                                    href="/services"
                                    className="group relative border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-300 font-montserrat hover:scale-105 text-sm sm:text-base"
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>{t('viewOurServices')}</span>
                                        <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

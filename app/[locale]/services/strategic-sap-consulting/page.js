"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from 'next-intl';
import { useLocalTranslations } from "@/lib/hooks/useLocalTranslations";
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';
import { isOnLandingPage, scrollToSection } from "@/utils/navigation";
import {
    FaChartLine,
    FaRocket,
    FaUsers,
    FaShieldAlt,
    FaCheck,
    FaChevronRight,
    FaArrowLeft,
    FaDatabase,
    FaChartArea,
    FaHandshake,
    FaCogs
} from "react-icons/fa";

import enTranslations from './translations/en.json';
import trTranslations from './translations/tr.json';
import sharedEnTranslations from '../translations/en.json';
import sharedTrTranslations from '../translations/tr.json';

const translations = {
    en: { ...sharedEnTranslations, ...enTranslations },
    tr: { ...sharedTrTranslations, ...trTranslations }
};

// Reusable Components
const StepItem = ({ number, title, description }) => (
    <div className="flex items-start">
        <div className="bg-yellow-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0 mr-4 sm:mr-6">
            {number}
        </div>
        <div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-sora">{title}</h4>
            <p className="text-gray-600 font-montserrat leading-relaxed">{description}</p>
        </div>
    </div>
);

const BenefitCard = ({ icon: Icon, title, description }) => (
    <div className="flex items-start">
        <div className="bg-sky-500 p-2 rounded-lg mr-4 flex-shrink-0">
            <FaCheck className="text-white text-xl" />
        </div>
        <div>
            <h4 className="text-lg font-bold text-white mb-2 font-sora">{title}</h4>
            <p className="text-gray-300 font-montserrat">{description}</p>
        </div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description, borderColor = "border-sky-500" }) => (
    <div className={`bg-gradient-to-br from-gray-50 to-sky-50 rounded-xl p-6 sm:p-8 border-l-4 ${borderColor} hover:shadow-xl transition-all duration-300`}>
        <div className="flex items-start mb-4">
            <div className="bg-sky-500 text-white p-3 rounded-lg mr-4">
                {Icon && <Icon className="text-2xl" />}
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-sora mt-2">{title}</h4>
        </div>
        <p className="text-gray-700 font-montserrat leading-relaxed">{description}</p>
    </div>
);

const FocusAreaCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="text-sky-500 text-3xl sm:text-4xl mb-4">
            {Icon && <Icon />}
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-sora">{title}</h4>
        <p className="text-gray-600 font-montserrat leading-relaxed">{description}</p>
    </div>
);

const MigrationPathCard = ({ icon: Icon, title, description, bestFor }) => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 sm:p-8 border-2 border-gray-200 hover:border-sky-500 hover:shadow-xl transition-all duration-300">
        <div className="text-sky-500 text-3xl sm:text-4xl mb-4">
            {Icon && <Icon />}
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-sora">{title}</h4>
        <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4">{description}</p>
        <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 font-sora">{bestFor.label}</p>
            <p className="text-sm text-gray-600 font-montserrat">{bestFor.text}</p>
        </div>
    </div>
);

const SectionHeader = ({ title, description, className = "" }) => (
    <div className={`text-center mb-12 sm:mb-16 ${className}`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
            {title}
        </h2>
        {description && (
            <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed max-w-4xl mx-auto px-4">
                {description}
            </p>
        )}
    </div>
);

export default function StrategicSAPConsultingPage() {
    const locale = useLocale();
    const t = useLocalTranslations(translations);
    const tProduct = useDebugTranslations('productDetails.products.strategic-sap-consulting');
    const tUI = useDebugTranslations('productDetails.ui');
    const tNav = useDebugTranslations('navigation');

    const featureIcons = [FaChartLine, FaRocket, FaUsers, FaShieldAlt];
    const sectionScrollMap = ['digital-transformation', 'landscape-assessment', 's4hana-readiness', 'license-optimization'];

    const smoothScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const goToContact = () => {
        scrollToSection('contact', isOnLandingPage());
    };

    // Data structures for rendering
    const digitalTransformationApproach = [
        { icon: FaChartLine, key: 'currentState' },
        { icon: FaUsers, key: 'futureVision' },
        { icon: FaCogs, key: 'techBlueprint' },
        { icon: FaRocket, key: 'roadmap' }
    ];

    const landscapeMethodologySteps = [1, 2, 3, 4, 5].map(num => ({ number: num, key: `step${num}` }));
    const s4hanaMigrationSteps = [1, 2, 3, 4, 5, 6].map(num => ({ number: num, key: `step${num}` }));

    const landscapeFocusAreas = [
        { icon: FaDatabase, key: 'systemArchitecture' },
        { icon: FaChartArea, key: 'performance' },
        { icon: FaShieldAlt, key: 'security' },
        { icon: FaChartLine, key: 'costOptimization' }
    ];

    const migrationPaths = [
        { icon: FaRocket, key: 'greenfield' },
        { icon: FaCogs, key: 'brownfield' },
        { icon: FaHandshake, key: 'hybrid' }
    ];

    const licenseOptimizationSteps = [1, 2, 3, 4].map(num => ({ number: num, key: `step${num}` }));

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
                            </div>
                            <div className="drop-shadow-4xl p-4 w-full h-full">
                                <Image
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
            <section className="py-12 sm:py-16 md:py-24 bg-gray-50" id="key-features">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeader
                            title={
                                <span className="relative inline-block text-sky-600">
                                    {tUI('keyFeatures')}
                                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                                </span>
                            }
                            description={tUI('comprehensiveFeatures')}
                        />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {t.raw('features').map((feature, index) => {
                                const Icon = featureIcons[index];
                                return (
                                    <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                                        <div className="text-2xl sm:text-3xl text-sky-500 mb-3 sm:mb-4">
                                            {Icon && <Icon />}
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-sora">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4 flex-grow">
                                            {feature.description}
                                        </p>
                                        <button
                                            onClick={() => smoothScrollToSection(sectionScrollMap[index])}
                                            className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors duration-300 group mt-auto"
                                        >
                                            {tProduct('learnMore')}
                                            <FaChevronRight className="ml-1 text-xs group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* SAP Digital Transformation Strategy */}
            <section className="py-12 sm:py-16 md:py-24 bg-white" id="digital-transformation">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeader
                            title={tProduct('digitalTransformation.title')}
                            description={tProduct('digitalTransformation.description')}
                        />

                        <div className="mb-16">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('digitalTransformation.ourApproach.title')}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed mb-8 sm:mb-12 text-center max-w-4xl mx-auto">
                                {tProduct('digitalTransformation.ourApproach.description')}
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                {digitalTransformationApproach.map(({ icon: Icon, key }) => (
                                    <FeatureCard
                                        key={key}
                                        icon={Icon}
                                        title={tProduct(`digitalTransformation.ourApproach.${key}.title`)}
                                        description={tProduct(`digitalTransformation.ourApproach.${key}.description`)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('digitalTransformation.keyBenefits.title')}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                {['strategicAlignment', 'innovationAdoption', 'processOptimization', 'riskMitigation'].map((key) => (
                                    <BenefitCard
                                        key={key}
                                        title={tProduct(`digitalTransformation.keyBenefits.${key}.title`)}
                                        description={tProduct(`digitalTransformation.keyBenefits.${key}.description`)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAP Landscape Assessment & Optimization */}
            <section className="py-12 sm:py-16 md:py-24 bg-gray-50" id="landscape-assessment">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeader
                            title={tProduct('landscapeAssessment.title')}
                            description={tProduct('landscapeAssessment.description')}
                        />

                        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 border border-sky-100">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                {tProduct('landscapeAssessment.didYouKnow.title')}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-700 font-montserrat mb-6 sm:mb-8">
                                {tProduct('landscapeAssessment.didYouKnow.description')}
                            </p>
                            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                                {[
                                    { icon: FaChartLine, key: 'licenseOptimization' },
                                    { icon: FaCogs, key: 'infrastructureConsolidation' },
                                    { icon: FaRocket, key: 'processEfficiency' }
                                ].map(({ icon: Icon, key }) => (
                                    <div key={key} className="bg-white rounded-xl p-4 sm:p-6 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="text-yellow-500 text-2xl sm:text-3xl flex-shrink-0">
                                            <Icon />
                                        </div>
                                        <span className="text-gray-800 font-montserrat text-sm sm:text-base font-medium">
                                            {tProduct(`landscapeAssessment.didYouKnow.${key}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('landscapeAssessment.methodology.title')}
                            </h3>
                            <div className="space-y-6">
                                {landscapeMethodologySteps.map(({ number, key }) => (
                                    <StepItem
                                        key={key}
                                        number={number}
                                        title={tProduct(`landscapeAssessment.methodology.${key}.title`)}
                                        description={tProduct(`landscapeAssessment.methodology.${key}.description`)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('landscapeAssessment.focusAreas.title')}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                {landscapeFocusAreas.map(({ icon: Icon, key }) => (
                                    <FocusAreaCard
                                        key={key}
                                        icon={Icon}
                                        title={tProduct(`landscapeAssessment.focusAreas.${key}.title`)}
                                        description={tProduct(`landscapeAssessment.focusAreas.${key}.description`)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAP S/4HANA Readiness & Migration Planning */}
            <section className="py-12 sm:py-16 md:py-24 bg-white" id="s4hana-readiness">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeader
                            title={tProduct('s4hanaReadiness.title')}
                            description={tProduct('s4hanaReadiness.description')}
                        />

                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 border border-blue-100">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                {tProduct('s4hanaReadiness.whyMigrate.title')}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-700 font-montserrat mb-6 sm:mb-8">
                                {tProduct('s4hanaReadiness.whyMigrate.description')}
                            </p>
                            <div className="space-y-3 sm:space-y-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="flex items-start">
                                        <div className="text-blue-500 mt-1 mr-3 flex-shrink-0">
                                            <FaCheck className="text-lg" />
                                        </div>
                                        <span className="text-gray-800 font-montserrat text-sm sm:text-base">
                                            {tProduct(`s4hanaReadiness.whyMigrate.benefit${num}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('s4hanaReadiness.migrationApproach.title')}
                            </h3>
                            <div className="space-y-6">
                                {s4hanaMigrationSteps.map(({ number, key }) => (
                                    <StepItem
                                        key={key}
                                        number={number}
                                        title={tProduct(`s4hanaReadiness.migrationApproach.${key}.title`)}
                                        description={tProduct(`s4hanaReadiness.migrationApproach.${key}.description`)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('s4hanaReadiness.migrationPaths.title')}
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                                {migrationPaths.map(({ icon: Icon, key }) => (
                                    <MigrationPathCard
                                        key={key}
                                        icon={Icon}
                                        title={tProduct(`s4hanaReadiness.migrationPaths.${key}.title`)}
                                        description={tProduct(`s4hanaReadiness.migrationPaths.${key}.description`)}
                                        bestFor={{
                                            label: tProduct('s4hanaReadiness.migrationPaths.bestFor'),
                                            text: tProduct(`s4hanaReadiness.migrationPaths.${key}.bestFor`)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAP License Optimization & Compliance */}
            <section className="py-12 sm:py-16 md:py-24 bg-gray-50" id="license-optimization">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeader
                            title={tProduct('licenseOptimization.title')}
                            description={tProduct('licenseOptimization.description')}
                        />

                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 border-l-4 border-red-500">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                {tProduct('licenseOptimization.costOfNonCompliance.title')}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-700 font-montserrat mb-6 sm:mb-8">
                                {tProduct('licenseOptimization.costOfNonCompliance.description')}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                {[1, 2].map((num) => (
                                    <div key={num} className="bg-white rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center mb-3">
                                            <div className="text-orange-500 text-2xl mr-3">
                                                {num === 1 ? '⚠️' : '💰'}
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 font-sora">
                                                {tProduct(`licenseOptimization.costOfNonCompliance.stat${num}.title`)}
                                            </h4>
                                        </div>
                                        <p className="text-gray-600 font-montserrat text-sm">
                                            {tProduct(`licenseOptimization.costOfNonCompliance.stat${num}.description`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('licenseOptimization.optimizationProcess.title')}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                {licenseOptimizationSteps.map(({ number, key }) => (
                                    <div key={key} className="bg-white rounded-xl p-6 sm:p-8 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
                                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-sora">
                                            {tProduct(`licenseOptimization.optimizationProcess.${key}.title`)}
                                        </h4>
                                        <p className="text-gray-600 font-montserrat leading-relaxed">
                                            {tProduct(`licenseOptimization.optimizationProcess.${key}.description`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 font-sora text-center">
                                {tProduct('licenseOptimization.savingsOpportunities.title')}
                            </h3>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-900 text-white">
                                            <tr>
                                                {['area', 'savings', 'action'].map((key) => (
                                                    <th key={key} className="px-6 py-4 text-left text-sm font-bold font-sora">
                                                        {tProduct(`licenseOptimization.savingsOpportunities.table.${key}`)}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {[1, 2, 3, 4].map((num) => (
                                                <tr key={num} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-montserrat text-gray-900">
                                                        {tProduct(`licenseOptimization.savingsOpportunities.table.row${num}.area`)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                                                            {tProduct(`licenseOptimization.savingsOpportunities.table.row${num}.savings`)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-montserrat text-gray-600">
                                                        {tProduct(`licenseOptimization.savingsOpportunities.table.row${num}.action`)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 font-sora text-center">
                                {tProduct('licenseOptimization.complianceAssurance.title')}
                            </h3>
                            <p className="text-gray-300 font-montserrat text-center mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
                                {tProduct('licenseOptimization.complianceAssurance.description')}
                            </p>
                            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                                {[1, 2, 3].map((num) => (
                                    <BenefitCard
                                        key={num}
                                        title={tProduct(`licenseOptimization.complianceAssurance.item${num}.title`)}
                                        description={tProduct(`licenseOptimization.complianceAssurance.item${num}.description`)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries & CTA */}
            <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto text-center text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-sora">
                            {tUI('perfectForYourIndustry')}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 font-montserrat px-4">
                            {tUI('trustedByBusinesses')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
                            {t.raw('industries.list').map((industry, index) => (
                                <span key={index} className="bg-white/10 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-montserrat">
                                    {industry}
                                </span>
                            ))}
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 font-sora">
                                {tUI('readyToGetStarted')}
                            </h3>
                            <p className="text-gray-300 font-montserrat text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
                                {tUI('joinThousands')} {t('hero.title')}. {tUI('getFreeConsultation')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    onClick={goToContact}
                                >
                                    <span className="text-sm sm:text-base">{tUI('contactSales')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

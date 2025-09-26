"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import {
    FaHandshake,
    FaRocket,
    FaEye,
    FaBullseye,
    FaLightbulb,
    FaShieldAlt,
    FaGlobe,
    FaUsers,
    FaChartLine,
    FaCogs,
    FaLeaf,
    FaHeart,
    FaStar,
    FaArrowRight,
} from "react-icons/fa";
import {
    RiLightbulbLine,
    RiShieldCheckLine,
    RiTeamLine,
    RiGlobalLine,
    RiRocketLine,
    RiAwardLine,
} from "react-icons/ri";
import { goToContact, goToReferences } from "@/utils/navigation";

export default function VisionMissionPage() {
    const t = useTranslations('corporate.vision');

    const missionPoints = [
        {
            icon: <FaCogs className="text-xl" />,
            title: t('mission.points.sapExcellence.title'),
            description: t('mission.points.sapExcellence.description')
        },
        {
            icon: <FaShieldAlt className="text-xl" />,
            title: t('mission.points.regulatoryCompliance.title'),
            description: t('mission.points.regulatoryCompliance.description')
        },
        {
            icon: <FaUsers className="text-xl" />,
            title: t('mission.points.clientPartnership.title'),
            description: t('mission.points.clientPartnership.description')
        },
        {
            icon: <FaChartLine className="text-xl" />,
            title: t('mission.points.businessGrowth.title'),
            description: t('mission.points.businessGrowth.description')
        }
    ];

    const visionElements = [
        {
            icon: <FaGlobe className="text-xl" />,
            title: t('vision.goals.innovation.title'),
            description: t('vision.goals.innovation.description')
        },
        {
            icon: <FaRocket className="text-xl" />,
            title: t('vision.goals.excellence.title'),
            description: t('vision.goals.excellence.description')
        },
        {
            icon: <FaLightbulb className="text-xl" />,
            title: t('vision.goals.growth.title'),
            description: t('vision.goals.growth.description')
        },
        {
            icon: <FaHeart className="text-xl" />,
            title: t('vision.goals.partnership.title'),
            description: t('vision.goals.partnership.description')
        }
    ];

    const coreValues = [
        {
            icon: <RiLightbulbLine className="text-2xl" />,
            title: t('coreValues.values.innovation.title'),
            description: t('coreValues.values.innovation.description'),
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <RiShieldCheckLine className="text-2xl" />,
            title: t('coreValues.values.excellence.title'),
            description: t('coreValues.values.excellence.description'),
            color: "from-blue-500 to-sky-500"
        },
        {
            icon: <RiTeamLine className="text-2xl" />,
            title: t('coreValues.values.collaboration.title'),
            description: t('coreValues.values.collaboration.description'),
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <RiGlobalLine className="text-2xl" />,
            title: t('coreValues.values.integrity.title'),
            description: t('coreValues.values.integrity.description'),
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <RiRocketLine className="text-2xl" />,
            title: t('coreValues.values.agility.title'),
            description: t('coreValues.values.agility.description'),
            color: "from-red-500 to-pink-500"
        },
        {
            icon: <RiAwardLine className="text-2xl" />,
            title: t('coreValues.values.quality.title'),
            description: t('coreValues.values.quality.description'),
            color: "from-indigo-500 to-purple-500"
        }
    ];

    const strategicGoals = [
        {
            title: t('strategicGoals.goals.marketExpansion.title'),
            description: t('strategicGoals.goals.marketExpansion.description'),
            target: t('strategicGoals.goals.marketExpansion.target'),
            icon: <FaGlobe className="text-xl" />
        },
        {
            title: t('strategicGoals.goals.innovationLeadership.title'),
            description: t('strategicGoals.goals.innovationLeadership.description'),
            target: t('strategicGoals.goals.innovationLeadership.target'),
            icon: <FaLightbulb className="text-xl" />
        },
        {
            title: t('strategicGoals.goals.teamGrowth.title'),
            description: t('strategicGoals.goals.teamGrowth.description'),
            target: t('strategicGoals.goals.teamGrowth.target'),
            icon: <FaUsers className="text-xl" />
        },
        {
            title: t('strategicGoals.goals.sustainabilityFocus.title'),
            description: t('strategicGoals.goals.sustainabilityFocus.description'),
            target: t('strategicGoals.goals.sustainabilityFocus.target'),
            icon: <FaLeaf className="text-xl" />
        }
    ];

    const principles = [
        t('guidingPrinciples.principles.0'),
        t('guidingPrinciples.principles.1'),
        t('guidingPrinciples.principles.2'),
        t('guidingPrinciples.principles.3'),
        t('guidingPrinciples.principles.4'),
        t('guidingPrinciples.principles.5')
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="hidden md:inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 rounded-full px-6 py-2 mb-8">
                            <FaHandshake className="text-sky-600" />
                            <span className="text-sky-700 font-semibold font-montserrat text-sm">{t('hero.badge')}</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-sora leading-tight">
                            {t('hero.title')}
                            <span className="block text-sky-600">{t('hero.titleHighlight')}</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-400 mb-12 font-montserrat leading-relaxed">
                            {t('hero.description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                                <FaBullseye className="text-sm sm:text-base" />
                                <span className="font-semibold font-montserrat text-xs sm:text-sm">{t('mission.badge')}</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                {t('mission.sectionTitle')}
                            </h2>

                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 font-montserrat leading-relaxed">
                                {t('mission.description')}
                            </p>

                            <div className="space-y-4 sm:space-y-6">
                                {missionPoints.map((point, index) => (
                                    <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            <div className="text-sm sm:text-xl">
                                                {point.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 font-sora">
                                                {point.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 font-montserrat leading-relaxed">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative order-1 lg:order-2">
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/teamwork.jpg"
                                    alt={t('mission.imageAlt')}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {/* Floating Elements - hidden on mobile */}
                            <div className="hidden sm:flex absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 rounded-xl sm:rounded-2xl items-center justify-center text-white shadow-xl animate-bounce">
                                <FaBullseye className="text-lg sm:text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Visual */}
                        <div className="hidden md:relative order-2 lg:order-1">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <div className="h-96 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <FaEye className="text-6xl mb-6 mx-auto opacity-80" />
                                        <h3 className="text-2xl font-bold font-sora">{t('vision.visionYear')}</h3>
                                        <p className="font-montserrat opacity-90">{t('vision.visionSubtitle')}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl animate-pulse">
                                <FaRocket className="text-2xl" />
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-700 rounded-full px-4 py-2 mb-6">
                                <FaEye />
                                <span className="font-semibold font-montserrat text-sm">{t('vision.badge')}</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                {t('vision.sectionTitle')}
                            </h2>

                            <p className="text-lg text-gray-600 mb-8 font-montserrat leading-relaxed">
                                {t('vision.description')}
                            </p>

                            <div className="space-y-6">
                                {visionElements.map((element, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                            {element.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sora">
                                                {element.title}
                                            </h3>
                                            <p className="text-gray-600 font-montserrat">
                                                {element.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                            {t('coreValues.title')}
                        </h2>
                        <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
                            {t('coreValues.description')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} text-white rounded-2xl mb-6`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 font-sora">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 font-montserrat leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Goals */}
            <section className="py-16 lg:py-20 bg-gray-50 hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                            {t('strategicGoals.title')}
                        </h2>
                        <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
                            {t('strategicGoals.description')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {strategicGoals.map((goal, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    {goal.icon}
                                </div>
                                <div className="text-sky-600 font-bold text-sm mb-2 font-montserrat">
                                    {t('strategicGoals.targetLabel')} {goal.target}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 font-sora">
                                    {goal.title}
                                </h3>
                                <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                                    {goal.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guiding Principles */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                {t('guidingPrinciples.title')}
                            </h2>
                            <p className="text-lg text-gray-600 font-montserrat">
                                {t('guidingPrinciples.description')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {principles.map((principle, index) => (
                                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white">
                                        <FaStar className="text-sm" />
                                    </div>
                                    <p className="text-gray-700 font-montserrat leading-relaxed">
                                        {principle}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-20 bg-gradient-to-br from-sky-600 via-blue-700 to-sky-800">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-sora">
                        {t('cta.title')}
                    </h2>
                    <p className="text-lg lg:text-xl mb-10 opacity-90 font-montserrat max-w-2xl mx-auto">
                        {t('cta.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={goToContact}
                            className="group bg-white text-sky-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 font-montserrat shadow-2xl hover:scale-105"
                        >
                            <span className="flex items-center space-x-2">
                                <span>{t('cta.partnerButton')}</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button
                            onClick={goToReferences}
                            className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-300 font-montserrat hover:scale-105"
                        >
                            <span className="flex items-center space-x-2">
                                <span>{t('cta.referencesButton')}</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

"use client";
import React from "react";
import Link from "next/link";
import {
    FaArchive,
    FaGlobe,
    FaShoppingCart,
    FaTruck,
    FaBook,
    FaReceipt,
    FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from 'next-intl';

function ServicesPage() {
    const t = useTranslations('services');
    const tCommon = useTranslations('common');

    const services = [
        {
            id: 1,
            slug: "e-invoice",
            icon: <Image src="/images/services/invoice.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-10 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: t('landing.einvoice.title'),
            description: t('landing.einvoice.description'),
            features: [
                t('landing.einvoice.features.legalCompliance'),
                t('landing.einvoice.features.costReduction'),
                t('landing.einvoice.features.automatedProcessing'),
                t('landing.einvoice.features.realTimeTracking')
            ]
        },
        {
            id: 2,
            slug: "e-ledger",
            icon: <Image src="/images/services/ledger.webp" alt="E-Invoice" className='size-28 md:size-36 -rotate-10 translate-y-10 md:translate-y-14 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: t('landing.eledger.title'),
            description: t('landing.eledger.description'),
            features: [
                t('landing.eledger.features.financialReporting'),
                t('landing.eledger.features.complianceManagement'),
                t('landing.eledger.features.automatedEntries'),
                t('landing.eledger.features.auditTrails')
            ]
        },
        {
            id: 3,
            slug: "e-export",
            icon: <Image src="/images/services/export.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: t('landing.eexport.title'),
            description: t('landing.eexport.description'),
            features: [
                t('landing.eexport.features.exportDocumentation'),
                t('landing.eexport.features.complianceManagement'),
                t('landing.eexport.features.internationalStandards'),
                t('landing.eexport.features.processAutomation')
            ]
        },
        {
            id: 4,
            slug: "digigarson-pos",
            icon: <Image src="/images/services/digi-garson.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: t('landing.restaurant.title'),
            description: t('landing.restaurant.description'),
            features: [
                t('landing.restaurant.features.posSystem'),
                t('landing.restaurant.features.inventoryTracking'),
                t('landing.restaurant.features.kitchenManagement'),
                t('landing.restaurant.features.customerService')
            ]
        },
        {
            id: 5,
            slug: "e-commerce",
            icon: <Image src="/images/services/e-commerce.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: t('landing.ecommerce.title'),
            description: t('landing.ecommerce.description'),
            features: [
                t('landing.ecommerce.features.storeManagement'),
                t('landing.ecommerce.features.paymentIntegration'),
                t('landing.ecommerce.features.inventoryControl'),
                t('landing.ecommerce.features.customerAnalytics')
            ]
        },
        {
            id: 6,
            slug: "e-delivery-note",
            icon: <Image src="/images/services/delivery note.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: t('landing.edelivery.title'),
            description: t('landing.edelivery.description'),
            features: [
                t('landing.edelivery.features.digitalTracking'),
                t('landing.edelivery.features.logisticsOptimization'),
                t('landing.edelivery.features.paperlessProcess'),
                t('landing.edelivery.features.realTimeUpdates')
            ]
        },
        {
            id: 7,
            slug: "e-archive-invoice",
            icon: <Image src="/images/services/archive.webp" alt="E-Archive Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 translate-x-8' width={500} height={500} />,
            title: t('landing.earchive.title'),
            description: t('landing.earchive.description'),
            features: [
                t('landing.earchive.features.secureStorage'),
                t('landing.earchive.features.legalCompliance'),
                t('landing.earchive.features.easyRetrieval'),
                t('landing.earchive.features.auditReady')
            ]
        },
        {
            id: 8,
            slug: "e-adisyon",
            icon: <Image src="/images/services/adisyon.webp" alt="E-Invoice" className='size-32 -rotate-15 translate-y-9 translate-x-7' width={500} height={500} />,
            title: t('landing.eadisyon.title'),
            description: t('landing.eadisyon.description'),
            features: [
                t('landing.eadisyon.features.digitalReceipts'),
                t('landing.eadisyon.features.orderManagement'),
                t('landing.eadisyon.features.customerExperience'),
                t('landing.eadisyon.features.costEfficiency')
            ]
        },
    ];

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

                    {/* Services Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105 flex flex-col h-full overflow-visible"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 text-white rounded-t-xl relative">
                                    <div className="absolute bottom-6 sm:bottom-10 right-10 sm:right-5 drop-shadow-2xl">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold font-sora mb-2 max-w-32">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Card Content */}
                                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                                    <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4 sm:mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-4 sm:mb-6 flex-grow">
                                        {service.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full mr-3 flex-shrink-0"></div>
                                                <span className="text-gray-700 font-montserrat">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <div className="mt-auto">
                                        <Link href={`/services/${service.slug}`}>
                                            <button className="w-full cursor-pointer bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                                                <span className="text-sm">{tCommon('learnMore')}</span>
                                                <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                <Link href="/contact">
                                    <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 w-full sm:w-auto">
                                        <span className="text-sm sm:text-base">{tCommon('getFreeConsultation')}</span>
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </Link>
                                <Link href="/services/e-invoice">
                                    <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                                        <span className="text-sm sm:text-base">{tCommon('startWithEInvoice')}</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServicesPage;

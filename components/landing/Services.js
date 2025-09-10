"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import {
  FaChartLine,
  FaUniversity,
  FaCogs,
  FaRobot,
  FaFileInvoiceDollar,
  FaArchive,
  FaShieldAlt,
  FaBalanceScale,
  FaChartArea,
  FaCreditCard,
  FaCoins,
  FaChevronRight
} from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import Image from "next/image";

function Services() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const services = [
    {
      id: 1,
      slug: "e-commerce",
      icon: <Image src="/images/services/landing/e-commerce.jpg" className="rounded-tr-3xl rounded-bl-3xl object-cover drop-shadow-2xl" alt={t('landing.ecommerce.title')} width={500} height={500} />,
      title: t('landing.ecommerce.title'),
      description: t('landing.ecommerce.description'),
      features: [
        { name: t('landing.ecommerce.features.storeManagement'), icon: <FaCogs /> },
        { name: t('landing.ecommerce.features.paymentIntegration'), icon: <FaCreditCard /> },
        { name: t('landing.ecommerce.features.inventoryControl'), icon: <FaArchive /> },
        { name: t('landing.ecommerce.features.customerAnalytics'), icon: <FaChartLine /> }
      ],
    },

    {
      id: 2,
      slug: "e-archive-invoice",
      icon: <Image src="/images/services/landing/archive.jpg" className="rounded-tr-3xl rounded-bl-3xl object-cover drop-shadow-2xl" alt={t('landing.earchive.title')} width={500} height={500} />,
      title: t('landing.earchive.title'),
      description: t('landing.earchive.description'),
      features: [
        { name: t('landing.earchive.features.secureStorage'), icon: <FaShieldAlt /> },
        { name: t('landing.earchive.features.legalCompliance'), icon: <FaBalanceScale /> },
        { name: t('landing.earchive.features.easyRetrieval'), icon: <FaChartArea /> },
        { name: t('landing.earchive.features.auditReady'), icon: <FaCogs /> }
      ],
    },
    {
      id: 3,
      slug: "e-invoice",
      icon: <Image src="/images/services/landing/invoice.jpg" className="rounded-tr-3xl rounded-bl-3xl object-cover drop-shadow-2xl" alt={t('landing.einvoice.title')} width={500} height={500} />,
      title: t('landing.einvoice.title'),
      description: t('landing.einvoice.description'),
      features: [
        { name: t('landing.einvoice.features.legalCompliance'), icon: <FaShieldAlt /> },
        { name: t('landing.einvoice.features.costReduction'), icon: <FaCoins /> },
        { name: t('landing.einvoice.features.automatedProcessing'), icon: <FaRobot /> },
        { name: t('landing.einvoice.features.realTimeTracking'), icon: <FaChartLine /> }
      ],
    },
    {
      id: 4,
      slug: "e-export",
      icon: <Image src="/images/services/landing/truck.jpg" className="rounded-tr-3xl rounded-bl-3xl object-cover drop-shadow-2xl" alt={t('landing.eexport.title')} width={500} height={500} />,
      title: t('landing.eexport.title'),
      description: t('landing.eexport.description'),
      features: [
        { name: t('landing.eexport.features.exportDocumentation'), icon: <FaFileInvoiceDollar /> },
        { name: t('landing.eexport.features.complianceManagement'), icon: <FaShieldAlt /> },
        { name: t('landing.eexport.features.internationalStandards'), icon: <FaUniversity /> },
        { name: t('landing.eexport.features.processAutomation'), icon: <FaRobot /> }
      ],
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="services">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
            <span className="relative inline-block text-sky-600">
              {tCommon('expertiseWeBring')}
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
            </span>
          </h2>

          <p className="text-base text-gray-600 font-montserrat leading-relaxed max-w-2xl">
            {t('description')}
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-8 md:gap-16 lg:gap-24">
          {services.map((service) => (
            <article
              key={service.id}
              className={`flex flex-col gap-4 items-center bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg relative`}
            >
              <div className="flex flex-col lg:flex-row w-full justify-between gap-6 lg:gap-16 items-center p-4 sm:p-6 lg:p-8">
                {/* Service Content */}
                <div className={`space-y-4 lg:space-y-6 max-w-5xl w-full lg:w-1/2`}>
                  {/* Service Header */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-sora leading-tight">
                    {service.title}
                  </h3>
                  <div className="w-10 h-1 bg-sky-600 mt-1"></div>

                  {/* Service Description */}
                  <p className="text-gray-600 font-montserrat text-sm sm:text-base lg:text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <Link href={`/${locale}/services/${service.slug}`}>
                    <button className="btn btn-outline btn-info font-montserrat font-semibold text-sm sm:text-base w-full sm:w-auto">
                      {tCommon('learnMore')} <FaChevronRight />
                    </button>
                  </Link>
                </div>

                {/* Service Visual */}
                <div className={`flex items-center justify-center lg:items-end lg:justify-end rounded-lg w-full lg:w-1/2 max-w-md lg:max-w-none`}>
                  {service.icon}
                </div>
              </div>
              {/* What You Get List */}
              <div className="w-full bg-gradient-to-r from-sky-100 to-blue-100 rounded-b-lg p-3 sm:p-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {service.features.map((feature, featIndex) => (
                    <li
                      key={featIndex}
                      className="flex items-center gap-2 sm:gap-3 hover:cursor-pointer text-white rounded-lg p-3 sm:p-4 bg-white hover:bg-sky-50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-sky-100 rounded-lg text-sky-600 text-xs sm:text-sm flex-shrink-0">
                        {feature.icon}
                      </div>
                      <span className="text-gray-600 font-montserrat font-semibold text-xs sm:text-sm lg:text-base">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))
          }
        </div >

        {/* Additional Services Section */}
        < div className="hidden mt-24" >
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <div className="text-xs font-bold text-yellow-400 font-montserrat mb-2">{tCommon('bonusExpertise')}</div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sora">
                    {tCommon('evenMoreWaysWeCanHelp')}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-200">{t(`additionalServices.item${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RiTeamLine className="text-4xl text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 font-sora">{tCommon('sapNative')}</h4>
                <p className="text-gray-300 font-montserrat">
                  {tCommon('everythingWeBuild')}
                </p>
              </div>
            </div>
          </div>
        </div >
      </div >
    </section >
  );
}

export default Services;
"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { RiHandHeartLine, RiGlobalLine } from "react-icons/ri";
import Slider from "../Slider";

const Partners = () => {
  const t = useTranslations('partners');

  const partners = [
    {
      name: "Turkcell",
      logo: "/partners/Turkcell.png",
      description: t('partnersList.turkcell'),
    },
    {
      name: "Sovos Digital Planet",
      logo: "/partners/Sovos Digital Planet.png",
      description: t('partnersList.sovos'),
    },
    {
      name: "Uyumsoft",
      logo: "/partners/Uyumsoft.png",
      description: t('partnersList.uyumsoft'),
    },
    {
      name: "Payflex",
      logo: "/partners/Payflex.png",
      description: t('partnersList.payflex'),
    },
    {
      name: "Nes Bilgi",
      logo: "/partners/Nes Bilgi.png",
      description: t('partnersList.nesBilgi'),
    },
    {
      name: "Idea Teknoloji",
      logo: "/partners/Idea Teknoloji.png",
      description: t('partnersList.ideaTeknoloji'),
    },
    {
      name: "ePlatform",
      logo: "/partners/eplatform.png",
      description: t('partnersList.eplatform'),
    },
    {
      name: "Edoksis",
      logo: "/partners/Edoksis.png",
      description: t('partnersList.edoksis'),
    },
  ];

  // Render function for individual partner items
  const renderPartner = (partner, index) => (
    <div className="group bg-gray-50 rounded-xl p-8 hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-24 h-16 mb-4 flex items-center justify-center">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sora">
          {partner.name}
        </h3>
        <p className="text-sm text-gray-600 font-montserrat">
          {partner.description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="relative py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="flex flex-col mb-8 lg:mb-12 w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-sora px-4">
              {t('subtitle')}
              <span className="text-blue-600 block">{t('title')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-montserrat px-4">
              {t('description')}
            </p>
          </div>

          {/* Partners Slider */}
          <div className="w-full lg:w-1/2">
            <Slider
              items={partners}
              renderItem={renderPartner}
              itemsPerSlide={{
                mobile: 1,
                tablet: 1,
                desktop: 1,
                large: 1
              }}
              autoSlideInterval={4000}
              showNavigation={false}
              showIndicators={true}
            />
          </div>
        </div>

        {/* Partnership Stats */}
        <div className="hidden mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <RiHandHeartLine />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              8+
            </div>
            <div className="text-gray-600 font-montserrat">
              {t('stats.strategicPartners')}
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <RiGlobalLine />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              15+
            </div>
            <div className="text-gray-600 font-montserrat">
              {t('stats.yearsCollaboration')}
            </div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              100%
            </div>
            <div className="text-gray-600 font-montserrat">
              {t('stats.certifiedSolutions')}
            </div>
          </div>
        </div>


        {/* Partnership Benefits */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                  {t('benefits.title')}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 font-sora">
                        {t('benefits.enhancedCapabilities.title')}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 font-montserrat">
                        {t('benefits.enhancedCapabilities.description')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 font-sora">
                        {t('benefits.comprehensiveSolutions.title')}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 font-montserrat">
                        {t('benefits.comprehensiveSolutions.description')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 font-sora">
                        {t('benefits.globalReach.title')}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 font-montserrat">
                        {t('benefits.globalReach.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8 lg:mt-0">
                <div className="inline-block p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">
                    <RiHandHeartLine />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-sora">
                    {t('benefits.excellence.title')}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 font-montserrat">
                    {t('benefits.excellence.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

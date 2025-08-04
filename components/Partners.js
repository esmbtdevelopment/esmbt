"use client";
import React from "react";
import Image from "next/image";
import { RiHandHeartLine, RiGlobalLine } from "react-icons/ri";

const Partners = () => {
  const partners = [
    {
      name: "Turkcell",
      logo: "/partners/Turkcell.png",
      description: "Leading telecommunications partner",
    },
    {
      name: "Sovos Digital Planet",
      logo: "/partners/Sovos Digital Planet.png",
      description: "Global tax compliance solutions",
    },
    {
      name: "Uyumsoft",
      logo: "/partners/Uyumsoft.png",
      description: "Enterprise software solutions",
    },
    {
      name: "Payflex",
      logo: "/partners/Payflex.png",
      description: "Payment and financial technology",
    },
    {
      name: "Nes Bilgi",
      logo: "/partners/Nes Bilgi.png",
      description: "Information technology services",
    },
    {
      name: "Idea Teknoloji",
      logo: "/partners/Idea Teknoloji.png",
      description: "Technology innovation partner",
    },
    {
      name: "ePlatform",
      logo: "/partners/eplatform.png",
      description: "Digital platform solutions",
    },
    {
      name: "Edoksis",
      logo: "/partners/Edoksis.png",
      description: "Document management systems",
    },
  ];

  return (
    <section className="relative py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-sora px-4">
            Strategic Technology
            <span className="text-blue-600 block">Partnerships</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-montserrat px-4">
            We collaborate with industry-leading technology partners to deliver
            comprehensive SAP and digital transformation solutions.
          </p>
        </div>

        {/* Partnership Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <RiHandHeartLine />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              8+
            </div>
            <div className="text-gray-600 font-montserrat">
              Strategic Partners
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
              Years Collaboration
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
              Certified Solutions
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
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
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 font-sora">
                  Why We Partner
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 font-sora">
                        Enhanced Capabilities
                      </h4>
                      <p className="text-gray-600 font-montserrat">
                        Access to cutting-edge technologies and specialized
                        expertise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 font-sora">
                        Comprehensive Solutions
                      </h4>
                      <p className="text-gray-600 font-montserrat">
                        End-to-end solutions through strategic collaborations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 font-sora">
                        Global Reach
                      </h4>
                      <p className="text-gray-600 font-montserrat">
                        International standards and best practices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    <RiHandHeartLine />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 font-sora">
                    Partnership Excellence
                  </h4>
                  <p className="text-gray-600 font-montserrat">
                    Building success through collaboration
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

"use client";
import Image from "next/image";
import React, { useState } from "react";
import Tabs from "./Tabs";
import { FaChartLine, FaUniversity } from "react-icons/fa";
import { RiGlobalLine, RiTeamLine } from "react-icons/ri";
import { AiOutlineCloudServer } from "react-icons/ai";
import { RxChevronRight } from "react-icons/rx";
function Services() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 1,
      icon: <RiTeamLine />,
      title: "SAP Consulting & Implementation",
      description:
        "Transform your business operations with our comprehensive SAP consulting and implementation services. Our certified experts provide end-to-end SAP integration, system optimization, and strategic consulting to maximize your investment. We specialize in SAP S/4HANA migration, module customization, workflow automation, and change management. From initial assessment and planning to go-live support and post-implementation optimization, we ensure seamless digital transformation that drives operational efficiency, reduces costs, and accelerates business growth.",
      angle: 0,
    },
    {
      id: 2,
      icon: <AiOutlineCloudServer />,
      title: "E-Transformation Solutions",
      description:
        "Navigate the digital compliance landscape with our cutting-edge e-transformation solutions. We deliver fully integrated SAP-native electronic documentation systems including e-Invoice, e-Archive, e-Ledger, and e-Declaration modules that ensure complete regulatory compliance. Our solutions automate document processing, provide real-time reporting, and integrate seamlessly with existing SAP environments. With advanced security features, audit trails, and automated compliance monitoring, we help businesses reduce manual processes, eliminate compliance risks, and achieve faster processing times while meeting all local and international regulatory requirements.",
      angle: 90,
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: "Financial Management Tools",
      description:
        "Elevate your financial operations with our sophisticated management tools designed for modern businesses. Our comprehensive suite includes advanced VAT processing systems, IFRS 16 lease accounting compliance, intelligent loan tracking mechanisms, and automated inflation accounting solutions. These integrated tools provide real-time financial visibility, automated reporting, risk assessment capabilities, and strategic financial planning support. With built-in analytics, forecasting models, and regulatory compliance features, our solutions help CFOs make data-driven decisions, reduce financial risks, and optimize cash flow management while ensuring full compliance with accounting standards.",
      angle: 180,
    },
    {
      id: 4,
      icon: <FaUniversity />,
      title: "Banking & Treasury Operations",
      description:
        "Streamline your banking and treasury operations with our advanced financial technology solutions. Our platform encompasses bulk payment processing, automated e-Account statement management, secure virtual POS systems, and comprehensive stock financing tools. We provide end-to-end cash management, liquidity optimization, payment automation, and treasury risk management capabilities. With real-time transaction monitoring, multi-bank connectivity, fraud detection systems, and regulatory reporting features, our solutions enhance operational efficiency, reduce processing costs, improve cash visibility, and ensure secure financial transactions across all banking relationships.",
      angle: 270,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center font-sora">
          Our Core <span className="text-sky-600">Services</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[800px]">
          {/* Left Side - Circular Services */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              {/* Central Circle with Image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/logo with shadow.webp"
                    width={300}
                    height={300}
                    alt="ESM Information Technologies"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Service Icons arranged in circle - with rotation animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animation-spin-slow">
                {services.map((service, index) => {
                  const radius = 280; // Distance from center (2x bigger)
                  const angleInRadians = (service.angle * Math.PI) / 180;
                  const x = Math.cos(angleInRadians) * radius;
                  const y = Math.sin(angleInRadians) * radius;

                  return (
                    <div
                      key={service.id}
                      className="absolute group cursor-pointer"
                      style={{
                        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      }}
                      onClick={() => setActiveTab(index)}
                    >
                      {/* Service Icon Container with counter-rotation */}
                      <div className="animation-spin-reverse">
                        <div
                          className={`size-20 text-sky-500 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-xl relative ${
                            activeTab === index &&
                            "bg-gradient-to-r from-sky-700 via-sky-500 to-sky-300 text-white shadow-blue-500/50 scale-110"
                          }`}
                        >
                          {/* Service Icon */}
                          <div className="text-4xl">{service.icon}</div>

                          {/* Pulse effect for active tab */}
                          {activeTab === index && (
                            <div className="absolute inset-0 bg-sky-400 rounded-full opacity-20 animate-ping"></div>
                          )}
                        </div>

                        {/* Service Label - appears on hover */}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                            {service.title}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Decorative outer circles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-dashed border-gray-300 rounded-full opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-dashed border-gray-200 rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Right Side - Tab View */}
          <div className="flex flex-col gap-10 justify-start items-start h-full w-full">
            <div className="font-sora">
              <p className="text-lg text-gray-500 font-montserrat leading-relaxed">
                We offer comprehensive SAP solutions designed for financial
                transformation and regulatory compliance.
              </p>
            </div>
            <Tabs
              tabs={services.map((service, index) => ({
                id: service.id,
                icon: service.icon,
                label: service.title,
                content: service.description,
              }))}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div className="divider"></div>
            <button className="font-montserrat self-end flex items-center gap-2 cursor-pointer hover:text-sky-600 transition-colors">
              View All Services <RxChevronRight />
            </button>
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 font-sora">
                  Advanced Financial Solutions
                </h3>
                <div className="space-y-4 text-gray-200 font-montserrat">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <span>IFRS 16 Compliance & Adaptation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <span>Collateral Management Systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <span>SAP Data Masking & Protection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <span>Inflation Accounting Solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <span>Loan & Collection Tracking</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <RiGlobalLine className="text-6xl text-sky-400 mb-4 mx-auto" />
                  <h4 className="text-2xl font-bold mb-2 font-sora">
                    SAP-Native
                  </h4>
                  <p className="text-gray-300 font-montserrat">
                    All solutions embedded within SAP environments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

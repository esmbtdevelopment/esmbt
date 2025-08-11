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
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50/20 to-sky-50/30 overflow-hidden" id="services">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Animated background grid */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-10">
            <defs>
              <pattern id="serviceGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#0284c7"/>
                <circle cx="0" cy="0" r="1" fill="#0ea5e9"/>
                <circle cx="60" cy="60" r="1" fill="#0284c7"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#serviceGrid)"/>
          </svg>
        </div>
        
        {/* Floating tech elements */}
        <div className="absolute top-20 right-20 w-40 h-40 border border-sky-200/50 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-100/30 to-sky-100/30 rounded-2xl transform rotate-45 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Data connection lines */}
        <div className="absolute top-1/4 left-1/4">
          <svg width="200" height="200" className="animate-pulse opacity-20">
            <path d="M0,100 Q100,0 200,100" stroke="#0284c7" strokeWidth="2" fill="none" strokeDasharray="10,5">
              <animate attributeName="stroke-dashoffset" values="0;-15" dur="3s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-20 relative">
          {/* Floating badge */}
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-white to-sky-50 border border-sky-200 rounded-full px-6 py-3 mb-8 shadow-lg backdrop-blur-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sky-700 font-bold font-montserrat">SAP-Native Solutions</span>
            <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 text-center font-sora leading-tight">
            Our Core <span className="relative inline-block text-sky-600">
              Services
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 rounded-full animate-pulse"></div>
            </span>
          </h2>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-20 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
        </div>
        <div className="block lg:hidden font-sora mb-8">
          <p className="text-lg text-gray-500 font-montserrat leading-relaxed">
            We offer comprehensive SAP solutions designed for financial
            transformation and regulatory compliance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[800px]">
          {/* Left Side - Circular Services (Hidden on mobile, replaced by simple grid) */}
          <div className="hidden lg:flex justify-center items-center">
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
          <div className="flex flex-col gap-6 lg:gap-10 justify-start items-start h-full w-full max-w-full overflow-hidden">
            <div className="hidden lg:block font-sora">
              <p className="text-lg text-gray-500 font-montserrat leading-relaxed">
                We offer comprehensive SAP solutions designed for financial
                transformation and regulatory compliance.
              </p>
            </div>
            <Tabs
              className="w-full min-w-0"
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

        {/* Enhanced Additional Services Section */}
        <div className="mt-24">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            {/* Creative layered background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 via-blue-900/30 to-sky-900/20"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-8 right-8 w-32 h-32 border-2 border-sky-400/20 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-sky-400/10 rounded-2xl rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-400/60 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            
            {/* Tech grid overlay */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="techGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M0,25 L50,25 M25,0 L25,50" stroke="#0ea5e9" strokeWidth="1"/>
                    <circle cx="25" cy="25" r="2" fill="#0284c7"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#techGrid)"/>
              </svg>
            </div>
            
            <div className="relative p-12 md:p-16 text-white">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  {/* Header with accent */}
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-1 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-bold text-yellow-400 font-montserrat mb-2">PREMIUM SOLUTIONS</div>
                      <h3 className="text-3xl md:text-4xl font-bold font-sora">
                        Advanced Financial Solutions
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-gray-200 font-montserrat">
                    {[
                      "IFRS 16 Compliance & Adaptation",
                      "Collateral Management Systems", 
                      "SAP Data Masking & Protection",
                      "Inflation Accounting Solutions",
                      "Loan & Collection Tracking"
                    ].map((item, index) => (
                      <div key={index} className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                        <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                        <span className="text-lg group-hover:text-white transition-colors">{item}</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sky-400">→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative inline-block">
                    {/* Glowing backdrop */}
                    <div className="absolute inset-0 bg-sky-500/20 rounded-3xl blur-2xl scale-110"></div>
                    
                    <div className="relative p-12 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
                      {/* Animated icon */}
                      <div className="relative mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
                          <RiGlobalLine className="text-4xl text-white" />
                        </div>
                        {/* Orbiting elements */}
                        <div className="absolute inset-0 animate-spin-slow">
                          <div className="absolute -top-2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full transform -translate-x-1/2"></div>
                          <div className="absolute top-1/2 -right-2 w-2 h-2 bg-green-400 rounded-full transform -translate-y-1/2"></div>
                          <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-orange-400 rounded-full transform -translate-x-1/2"></div>
                          <div className="absolute top-1/2 -left-2 w-3 h-3 bg-purple-400 rounded-full transform -translate-y-1/2"></div>
                        </div>
                      </div>
                      
                      <h4 className="text-2xl md:text-3xl font-bold mb-4 font-sora text-white">
                        100% SAP-Native
                      </h4>
                      <p className="text-gray-300 font-montserrat text-lg leading-relaxed">
                        All solutions seamlessly embedded within SAP environments for maximum compatibility and performance
                      </p>
                      
                      {/* Trust badges */}
                      <div className="flex justify-center space-x-4 mt-8">
                        <div className="px-4 py-2 bg-green-400/20 rounded-full text-green-400 text-sm font-bold">
                          Certified
                        </div>
                        <div className="px-4 py-2 bg-blue-400/20 rounded-full text-blue-400 text-sm font-bold">
                          Secure
                        </div>
                        <div className="px-4 py-2 bg-yellow-400/20 rounded-full text-yellow-400 text-sm font-bold">
                          Proven
                        </div>
                      </div>
                    </div>
                  </div>
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

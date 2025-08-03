"use client";
import Image from "next/image";
import React, { useState } from "react";
import Tabs from "./Tabs";
import {
  FaChartLine,
  FaCogs,
  FaFileInvoiceDollar,
  FaUniversity,
} from "react-icons/fa";

function Services() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 1,
      icon: <FaCogs />,
      title: "SAP Consulting & Implementation",
      description:
        "End-to-end SAP integration, optimization, and expert consulting services",
      angle: 0,
    },
    {
      id: 2,
      icon: <FaFileInvoiceDollar />,
      title: "E-Transformation Solutions",
      description:
        "SAP-native e-Invoice, e-Archive, e-Ledger, and e-Declaration compliance",
      angle: 90,
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: "Financial Management Tools",
      description:
        "VAT processing, IFRS 16, loan tracking, and inflation accounting solutions",
      angle: 180,
    },
    {
      id: 4,
      icon: <FaUniversity />,
      title: "Banking & Treasury Operations",
      description:
        "Bulk payments, e-Account statements, virtual POS, and stock financing",
      angle: 270,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center font-sora">
          Our Services
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[800px]">
          {/* Left Side - Circular Services */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              {/* Central Circle with Image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/logo.webp"
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
                          className={`size-20 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-xl relative ${
                            activeTab === index &&
                            "bg-sky-500 text-white shadow-blue-500/50 scale-110"
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
          <div className="lg:pl-8">
            <Tabs
              tabs={services.map((service, index) => ({
                id: service.id,
                icon: service.icon,
                label: service.title,
                content: (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl text-blue-600">
                            {service.icon}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 font-sora mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-6">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              }))}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

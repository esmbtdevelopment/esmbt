"use client";
import React from "react";
import Image from "next/image";
import { RiStarLine, RiTrophyLine, RiShieldCheckLine } from "react-icons/ri";
import ModernFeedbacks from "./ModernFeedbacks";

const Customers = () => {
  const customers = [
    {
      name: "Turkcell",
      logo: "/customers/turkcell.png",
      industry: "Telecommunications",
    },
    {
      name: "Vodafone",
      logo: "/customers/vodafone.png",
      industry: "Telecommunications",
    },
    {
      name: "Getir",
      logo: "/customers/getir.png",
      industry: "E-commerce & Delivery",
    },
    {
      name: "Hakmar",
      logo: "/customers/Hakmar.png",
      industry: "Retail",
    },
    {
      name: "İstaç",
      logo: "/customers/İstaç.png",
      industry: "Municipal Services",
    },
    {
      name: "Innova",
      logo: "/customers/innova.png",
      industry: "Technology",
    },
    {
      name: "İDO",
      logo: "/customers/ido.png",
      industry: "Transportation",
    },
    {
      name: "Natura",
      logo: "/customers/natura.png",
      industry: "Cosmetics",
    },
    {
      name: "Bizerba",
      logo: "/customers/Bizerba.png",
      industry: "Industrial Technology",
    },
    {
      name: "Varian",
      logo: "/customers/varian.png",
      industry: "Medical Technology",
    },
    {
      name: "Wahl",
      logo: "/customers/Wahl.jpg",
      industry: "Consumer Products",
    },
    {
      name: "Frimpeks",
      logo: "/customers/Frimpeks.png",
      industry: "Textiles",
    },
  ];

  const testimonials = [
    {
      quote:
        "ESM's SAP expertise transformed our financial processes, ensuring 100% compliance with digital tax regulations.",
      author: "Financial Director",
      company: "Leading Telecommunications Company",
    },
    {
      quote:
        "The e-transformation solutions provided by ESM streamlined our operations and reduced processing time by 60%.",
      author: "IT Manager",
      company: "Major Retail Chain",
    },
    {
      quote:
        "Outstanding support and deep SAP knowledge. ESM delivered beyond our expectations.",
      author: "CFO",
      company: "International Manufacturing Company",
    },
  ];

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed font-montserrat">
            From telecommunications giants to innovative startups, enterprises
            across industries trust ESM for their SAP and digital transformation
            needs.
          </p>
        </div>

        {/* Customer Stats */}
        <div className="hidden mb-16">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 mb-1 font-sora">200+</div>
            <div className="text-sm text-gray-600 font-montserrat">Enterprise Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1 font-sora">15+</div>
            <div className="text-sm text-gray-600 font-montserrat">Industries Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1 font-sora">99%</div>
            <div className="text-sm text-gray-600 font-montserrat">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1 font-sora">500+</div>
            <div className="text-sm text-gray-600 font-montserrat">Projects Delivered</div>
          </div>
        </div>

        {/* Customer Logos Grid */}
        <div className="mb-12 sm:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-12 h-8 sm:w-16 sm:h-10 mb-2 flex items-center justify-center">
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-xs text-gray-500 text-center font-montserrat font-bold">
                  {customer.industry}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Feedbacks Section */}
        <ModernFeedbacks />


      </div>
    </section>
  );
};

export default Customers;

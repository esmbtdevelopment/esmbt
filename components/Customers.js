"use client";
import React from "react";
import Image from "next/image";
import { RiStarLine, RiTrophyLine, RiShieldCheckLine } from "react-icons/ri";

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
    <section className="relative py-10 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Trusted by Industry
            <span className="text-sky-600 block">Leaders</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-montserrat">
            From telecommunications giants to innovative startups, enterprises
            across industries trust ESM for their SAP and digital transformation
            needs.
          </p>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <RiTrophyLine />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              200+
            </div>
            <div className="text-gray-600 font-montserrat">
              Enterprise Clients
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <RiStarLine />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              15+
            </div>
            <div className="text-gray-600 font-montserrat">
              Industries Served
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <RiShieldCheckLine />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              99%
            </div>
            <div className="text-gray-600 font-montserrat">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
              500+
            </div>
            <div className="text-gray-600 font-montserrat">
              Projects Delivered
            </div>
          </div>
        </div>

        {/* Customer Logos Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12 font-sora">
            Companies That Trust ESM
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center"
              >
                <div className="relative w-20 h-12 mb-3 flex items-center justify-center">
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-xs text-gray-500 text-center font-montserrat">
                  {customer.industry}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-sora">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <RiStarLine
                      key={i}
                      className="text-yellow-400 text-xl fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 font-montserrat italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900 font-sora">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 font-montserrat">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4 font-sora">
              Join Our Success Stories
            </h3>
            <p className="text-xl mb-8 opacity-90 font-montserrat">
              Become the next enterprise to transform your financial operations
              with ESM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors font-montserrat">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-sky-600 transition-colors font-montserrat">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;

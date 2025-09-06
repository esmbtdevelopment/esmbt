"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ModernFeedbacks = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "ESM's SAP expertise transformed our financial processes completely. The e-Invoice and e-Archive solutions integrated seamlessly with our existing systems, ensuring 100% compliance with digital tax regulations. Their team's deep understanding of SAP environments made the implementation smooth and efficient.",
      author: "Sarah Johnson",
      position: "Financial Director",
      company: "Turkcell",
      industry: "Telecommunications",
      logo: "/customers/turkcell.png",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=1f2937&color=fff&size=150&bold=true",
      rating: 5
    },
    {
      quote: "The e-transformation solutions provided by ESM revolutionized our operations. We reduced manual processing time by 60% and achieved complete regulatory compliance. Their SAP-native approach meant zero disruption to our existing workflows while gaining powerful new capabilities.",
      author: "Michael Chen",
      position: "IT Manager",
      company: "Hakmar",
      industry: "Retail",
      logo: "/customers/Hakmar.png",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=374151&color=fff&size=150&bold=true",
      rating: 5
    },
    {
      quote: "Outstanding support and deep SAP knowledge distinguish ESM from other consultants. Their IFRS 16 compliance solution and financial management tools have streamlined our accounting processes and provided real-time insights that drive our strategic decisions.",
      author: "Elena Rodriguez",
      position: "CFO",
      company: "Vodafone",
      industry: "Telecommunications",
      logo: "/customers/vodafone.png",
      avatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=4b5563&color=fff&size=150&bold=true",
      rating: 5
    },
    {
      quote: "ESM delivered a comprehensive banking solution that transformed our treasury operations. The bulk payment processing and virtual POS systems enhanced our operational efficiency while maintaining the highest security standards. Truly impressive work.",
      author: "David Kim",
      position: "Treasury Director",
      company: "Getir",
      industry: "E-commerce & Delivery",
      logo: "/customers/getir.png",
      avatar: "https://ui-avatars.com/api/?name=David+Kim&background=6b7280&color=fff&size=150&bold=true",
      rating: 5
    }
  ];



  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <div className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        {/* Subtle grid pattern - hidden on mobile */}
        <div className="hidden sm:block absolute inset-0">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="professionalGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#374151" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#professionalGrid)" />
          </svg>
        </div>

        {/* Minimal geometric accents - hidden on mobile */}
        <div className="hidden lg:block absolute top-20 right-20 w-40 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="hidden lg:block absolute bottom-20 left-20 w-1 h-40 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">

          <div className="lg:col-span-2 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Header and Controls */}
            <div className="relative">
              {/* Professional badge */}
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200 shadow-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
                <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                <span className="text-sky-700 font-semibold font-montserrat text-xs tracking-wide uppercase">Client Testimonials</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 font-sora leading-tight">
                Enterprise Leaders <br className="hidden sm:block" />
                <span className="text-sky-600">Trust Our Expertise</span>
              </h2>

              {/* Professional Navigation Controls */}
              <div className="flex items-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
                <button
                  onClick={prevTestimonial}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-sky-200 shadow-sm flex items-center justify-center hover:shadow-md hover:bg-sky-50 hover:border-sky-300 transition-all duration-200"
                >
                  <FaChevronLeft className="text-sky-600 text-sm" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-sky-200 shadow-sm flex items-center justify-center hover:shadow-md hover:bg-sky-50 hover:border-sky-300 transition-all duration-200"
                >
                  <FaChevronRight className="text-sky-600 text-sm" />
                </button>

                {/* Professional indicators */}
                <div className="flex space-x-2 sm:space-x-3 ml-4 sm:ml-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${index === activeTestimonial
                        ? 'bg-sky-600 w-6 sm:w-8'
                        : 'bg-gray-300 w-3 sm:w-4 hover:bg-sky-400'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Professional CTA Button */}
              <button className="group inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-200 font-montserrat shadow-md hover:shadow-lg w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-sm sm:text-base">View All Case Studies</span>
                <RiArrowRightLine className="text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Right Column - Professional Testimonial Card */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative">
                {/* Subtle shadow effect */}
                <div className="absolute -inset-1 bg-gray-100 opacity-50 blur-sm"></div>

                {/* Main testimonial card */}
                <div className="relative bg-white shadow-xl p-6 sm:p-8 lg:p-10 xl:p-12 border border-sky-100">
                  {/* Professional corner accent */}
                  <div className="absolute top-0 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-sky-600 to-blue-600"></div>

                  {/* Company verification badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-2 text-xs text-sky-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-montserrat font-semibold">Verified Client</span>
                  </div>

                  {/* Professional rating */}
                  <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-sky-600 rounded-full"></div>
                    ))}
                    <span className="ml-3 text-xs text-sky-600 font-montserrat font-semibold">Excellent</span>
                  </div>

                  {/* Professional testimonial text */}
                  <blockquote className="text-gray-800 text-sm sm:text-base leading-relaxed mb-6 sm:mb-10 font-montserrat italic border-l-4 border-sky-200 pl-4 sm:pl-6">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </blockquote>

                  {/* Professional author info */}
                  <div className="border-t border-sky-100 pt-6 sm:pt-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-sky-50 border border-sky-100 flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 font-sora text-sm mb-1">
                            {currentTestimonial.author}
                          </div>
                          <div className="text-sky-600 font-montserrat font-semibold mb-1 text-xs">
                            {currentTestimonial.position}
                          </div>
                          <div className="text-xs text-gray-600 font-montserrat font-bold">
                            {currentTestimonial.company}
                          </div>
                        </div>
                      </div>

                      {/* Company logo and info */}
                      <div className="text-right flex flex-col items-end">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 mb-2">
                          <Image
                            src={currentTestimonial.logo}
                            alt={currentTestimonial.company}
                            fill
                            className="object-contain opacity-80"
                          />
                        </div>
                        <div className="text-xs text-sky-600 font-montserrat font-bold">
                          {currentTestimonial.industry}
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


    </div>
  );
};

export default ModernFeedbacks;

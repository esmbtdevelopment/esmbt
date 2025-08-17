"use client";
import React from "react";
import Image from "next/image";
import {
  RiTeamLine,
  RiLightbulbLine,
  RiRocketLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiAwardLine,
} from "react-icons/ri";
import {
  FaChartLine,
  FaCogs,
  FaHandshake,
  FaUsers,
  FaFileInvoiceDollar,
  FaUniversity,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience", icon: <RiAwardLine /> },
    { number: "500+", label: "SAP Implementations", icon: <RiRocketLine /> },
    { number: "200+", label: "Enterprise Clients", icon: <FaHandshake /> },
    { number: "50+", label: "SAP Specialists", icon: <FaUsers /> },
  ];

  const services = [
    {
      icon: <FaCogs className="text-3xl" />,
      title: "SAP Consulting & Implementation",
      description:
        "End-to-end SAP integration, optimization, and expert consulting services",
    },
    {
      icon: <FaFileInvoiceDollar className="text-3xl" />,
      title: "E-Transformation Solutions",
      description:
        "SAP-native e-Invoice, e-Archive, e-Ledger, and e-Declaration compliance",
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Financial Management Tools",
      description:
        "VAT processing, IFRS 16, loan tracking, and inflation accounting solutions",
    },
    {
      icon: <FaUniversity className="text-3xl" />,
      title: "Banking & Treasury Operations",
      description:
        "Bulk payments, e-Account statements, virtual POS, and stock financing",
    },
  ];

  const values = [
    {
      icon: <RiLightbulbLine className="text-2xl" />,
      title: "SAP-Native Design",
      description:
        "All solutions built specifically for SAP environments with seamless integration",
    },
    {
      icon: <RiShieldCheckLine className="text-2xl" />,
      title: "Regulatory Compliance",
      description:
        "Expert guidance on digital tax requirements and evolving regulatory demands",
    },
    {
      icon: <RiTeamLine className="text-2xl" />,
      title: "Financial Transformation",
      description:
        "Specialized focus on streamlining financial operations and process automation",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 overflow-hidden" id="about">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Large decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Geometric patterns */}
        <div className="absolute top-1/4 left-10">
          <svg width="120" height="120" className="animate-spin-slow opacity-30">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            <polygon points="60,10 110,50 110,110 60,150 10,110 10,50"
              fill="none" stroke="url(#grad1)" strokeWidth="2" />
            <circle cx="60" cy="80" r="15" fill="none" stroke="url(#grad1)" strokeWidth="1" />
          </svg>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-1/3 right-16 w-24 h-24 border-4 border-sky-300/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-200/60 to-sky-200/60 rounded-2xl transform rotate-45 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 relative">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 font-sora leading-tight">
            Specialized SAP Consulting for <br />
            <span className="relative inline-block">
              <span className="text-sky-600 block">Financial Transformation</span>
            </span>
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-montserrat px-4">
              ESM Information Technologies is a specialized SAP consulting and
              technology firm focused on driving financial transformation and
              digital compliance for enterprises.
            </p>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-4 border-t-4 border-sky-400 opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-4 border-b-4 border-blue-400 opacity-30"></div>
          </div>
        </div>


        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left Content */}
          <div className="px-4 lg:px-0">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 font-sora">
              Empowering Enterprises Through SAP Excellence
            </h3>
            <div className="space-y-4 md:space-y-6 text-gray-600 font-montserrat">
              <p className="text-sm md:text-base leading-relaxed">
                We deliver end-to-end SAP integration and optimization services,
                empowering organizations to streamline financial operations,
                enhance regulatory compliance, and digitize core processes with
                confidence.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Our expertise spans expert SAP consulting, implementation, and
                support tailored to financial transformation, IFRS adaptation,
                and process automation. We provide comprehensive SAP-native
                solutions that simplify complex financial tasks and reduce
                operational costs.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                With a deep focus on automation, compliance, and SAP-native
                design, we enable enterprises to meet evolving digital and
                regulatory demands while maintaining the highest standards of
                data security and operational efficiency.
              </p>
            </div>

            {/* Values */}
            <div className="mt-8 md:mt-10 space-y-4 md:space-y-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 md:space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2 font-sora">
                      {value.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 font-montserrat">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-8 lg:mt-0 px-4 lg:px-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/teamwork.jpg"
                alt="ESM SAP Consulting Team"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-3 -left-2 md:-bottom-6 md:-left-6 bg-white rounded-box rounded-tr-xl shadow-xl p-3 md:p-4 border border-gray-100">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <RiRocketLine className="text-sky-600 text-sm md:text-xl" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-bold text-gray-900 font-sora">
                    100%
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-montserrat">
                    SAP Compliance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="hidden relative mt-20">
          {/* Creative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-[3rem] transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-700 to-sky-800 rounded-[3rem] opacity-90"></div>

          {/* Decorative elements */}
          <div className="absolute top-6 right-6 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-24 h-24 bg-white/10 rounded-2xl transform rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>

          <div className="relative p-12 md:p-16 text-white text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-semibold font-montserrat text-sm">Ready to Transform?</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-sora leading-tight">
              Transform Your Financial
              <span className="block text-yellow-400">Operations Today</span>
            </h3>

            <p className="text-xl md:text-2xl mb-10 opacity-90 font-montserrat max-w-2xl mx-auto leading-relaxed">
              Discover how our SAP expertise can streamline your compliance and
              automation needs with cutting-edge solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative bg-white text-sky-600 px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 font-montserrat text-lg shadow-2xl hover:shadow-white/10 hover:scale-105 overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Schedule SAP Consultation</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>

              <button className="group relative border-2 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-500 font-montserrat text-lg hover:scale-105 overflow-hidden">
                {/* Background slide effect */}
                <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
                <span className="relative flex items-center space-x-2">
                  <span>View Our Solutions</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>

            {/* Trust indicators at bottom */}
            <div className="flex items-center justify-center space-x-8 mt-10 pt-8 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-white/80 font-montserrat text-sm">500+ Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <span className="text-white/80 font-montserrat text-sm">24h Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">★</span>
                </div>
                <span className="text-white/80 font-montserrat text-sm">SAP Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

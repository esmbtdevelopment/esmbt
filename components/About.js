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
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sora">
            Specialized SAP Consulting for
            <span className="text-sky-600 block">Financial Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-montserrat">
            ESM Information Technologies is a specialized SAP consulting and
            technology firm focused on driving financial transformation and
            digital compliance for enterprises.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:shadow-lg transition-shadow">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-sora">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium font-montserrat">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 font-sora">
              Empowering Enterprises Through SAP Excellence
            </h3>
            <div className="space-y-6 text-gray-600 font-montserrat">
              <p className="text-lg leading-relaxed">
                We deliver end-to-end SAP integration and optimization services,
                empowering organizations to streamline financial operations,
                enhance regulatory compliance, and digitize core processes with
                confidence.
              </p>
              <p className="text-lg leading-relaxed">
                Our expertise spans expert SAP consulting, implementation, and
                support tailored to financial transformation, IFRS adaptation,
                and process automation. We provide comprehensive SAP-native
                solutions that simplify complex financial tasks and reduce
                operational costs.
              </p>
              <p className="text-lg leading-relaxed">
                With a deep focus on automation, compliance, and SAP-native
                design, we enable enterprises to meet evolving digital and
                regulatory demands while maintaining the highest standards of
                data security and operational efficiency.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 font-sora">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/teamwork.jpg"
                alt="ESM SAP Consulting Team"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <RiRocketLine className="text-green-600 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 font-sora">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 font-montserrat">
                    SAP Compliance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4 font-sora">
              Transform Your Financial Operations
            </h3>
            <p className="text-xl mb-8 opacity-90 font-montserrat">
              Discover how our SAP expertise can streamline your compliance and
              automation needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors font-montserrat">
                Schedule SAP Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-sky-600 transition-colors font-montserrat">
                View Our Solutions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

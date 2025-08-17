"use client";
import React from "react";
import { FaChartLine, FaUniversity } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { RxChevronRight } from "react-icons/rx";
import { AiOutlineCloudServer } from "react-icons/ai";
function Services() {
  const services = [
    {
      id: 1,
      icon: <RiTeamLine />,
      title: "SAP Consulting & Implementation",
      description:
        "Ready to make SAP actually work for your team? We've been there - we know how complex SAP implementations can get. That's why we focus on making the process smooth and the results immediate.",
      features: ["S/4HANA Migration", "Module Customization", "Workflow Automation", "Change Management"],
    },
    {
      id: 2,
      icon: <AiOutlineCloudServer />,
      title: "E-Transformation Solutions",
      description:
        "Compliance headaches keeping you up at night? We get it. Digital transformation shouldn't feel like rocket science. Our e-transformation solutions turn those stacks of paperwork into streamlined digital processes.",
      features: ["e-Invoice Systems", "e-Archive Solutions", "e-Ledger Integration", "Compliance Monitoring"],
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: "Financial Management Tools",
      description:
        "Financial reporting eating up your entire month-end? Let's change that. Our financial management tools are designed by people who've actually worked in finance departments - we know what really matters.",
      features: ["VAT Processing", "IFRS 16 Compliance", "Loan Tracking", "Inflation Accounting"],
    },
    {
      id: 4,
      icon: <FaUniversity />,
      title: "Banking & Treasury Operations",
      description:
        "Managing cash flow across multiple banks feeling like a juggling act? We've built solutions that bring all your banking operations into one clear view.",
      features: ["Bulk Payment Processing", "Virtual POS Systems", "Cash Management", "Treasury Risk Management"],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="services">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
            <span className="relative inline-block text-sky-600">
              Expertise
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
            </span>
            &nbsp; We Bring To The Table
          </h2>

          <p className="text-base text-gray-600 font-montserrat leading-relaxed max-w-2xl">
            We've spent years mastering SAP solutions that actually work for your business.
            Here's what we bring to every partnership - practical expertise that transforms how you handle finances and compliance.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {services.map((service, index) => (
            <article
              key={service.id}
              className={`flex flex-col gap-8 items-center`}
            >
              <div className="flex flex-row w-full justify-between gap-8 md:gap-16 items-center">
                {/* Service Content */}
                <div className={`space-y-6 max-w-5xl w-2/3`}>
                  {/* Service Header */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-sora leading-tight">
                    {service.title}
                  </h3>
                  <div className="w-16 h-1 bg-sky-600 mt-2"></div>

                  {/* Service Description */}
                  <p className="text-gray-600 font-montserrat text-base md:text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Visual */}
                <div className={`flex items-center justify-center w-1/3`}>
                  <div className="relative">
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full flex items-center justify-center relative">
                      {/* Abstract background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%" viewBox="0 0 200 200">
                          <defs>
                            <pattern id={`pattern-${service.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-sky-400" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#pattern-${service.id})`} />
                        </svg>
                      </div>
                      {/* Center Icon */}
                      <div className="relative z-10 text-5xl md:text-6xl text-sky-600">
                        {service.icon}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-sky-200 rounded-full opacity-60"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-200 rounded-full opacity-40"></div>
                  </div>
                </div>


              </div>
              {/* What You Get List */}
              <div className="w-full bg-gradient-to-r from-sky-100 to-blue-100 rounded-b-lg p-4">
                <ul className="flex flex-row justify-between">
                  {service.features.map((feature, featIndex) => (
                    <li
                      key={featIndex}
                      className="flex items-center gap-3 text-white rounded-lg p-4"
                    >
                      <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 animate-pulse transition-all duration-1000"></div>
                      <span className="text-gray-600 font-montserrat font-semibold text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))
          }
        </div >

        {/* Additional Services Section */}
        < div className="hidden mt-24" >
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <div className="text-xs font-bold text-yellow-400 font-montserrat mb-2">BONUS EXPERTISE</div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sora">
                    Even More Ways We Can Help
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    "IFRS 16 Compliance & Adaptation",
                    "Collateral Management Systems",
                    "SAP Data Masking & Protection",
                    "Inflation Accounting Solutions",
                    "Loan & Collection Tracking"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RiTeamLine className="text-4xl text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 font-sora">100% SAP-Native</h4>
                <p className="text-gray-300 font-montserrat">
                  Everything we build works natively with SAP - no awkward integrations needed
                </p>
              </div>
            </div>
          </div>
        </div >
      </div >
    </section >
  );
}

export default Services;
"use client";
import React from "react";
import Link from "next/link";
import {
  FaChartLine,
  FaUniversity,
  FaExchangeAlt,
  FaCogs,
  FaRobot,
  FaProjectDiagram,
  FaFileInvoiceDollar,
  FaArchive,
  FaBook,
  FaShieldAlt,
  FaCalculator,
  FaBalanceScale,
  FaChartArea,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaCoins,
  FaUserShield,
  FaChevronRight
} from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineCloudServer } from "react-icons/ai";
import { SlGraph } from "react-icons/sl";
function Services() {
  const services = [
    {
      id: 1,
      slug: "e-invoice",
      icon: <FaFileInvoiceDollar />,
      title: "E-Invoice",
      description:
        "E-Invoice is not just a digital transformation tool, but also an investment in the future of your business. It ensures seamless compliance while saving time and costs. Transform your invoicing process with secure, automated digital solutions that streamline operations and enhance business efficiency.",
      features: [
        { name: "Legal Compliance", icon: <FaShieldAlt /> },
        { name: "Cost Reduction", icon: <FaCoins /> },
        { name: "Automated Processing", icon: <FaRobot /> },
        { name: "Real-time Tracking", icon: <FaChartLine /> }
      ],
    },
    {
      id: 2,
      slug: "e-archive-invoice",
      icon: <FaArchive />,
      title: "E-Archive Invoice",
      description:
        "E-Archive Invoice provides secure, long-term storage solutions for your digital invoices with full legal compliance. Never worry about document retention again - our robust archiving system ensures your invoices are safely stored, easily accessible, and always audit-ready.",
      features: [
        { name: "Secure Storage", icon: <FaShieldAlt /> },
        { name: "Legal Compliance", icon: <FaBalanceScale /> },
        { name: "Easy Retrieval", icon: <FaChartArea /> },
        { name: "Audit Ready", icon: <FaCogs /> }
      ],
    },
    {
      id: 3,
      slug: "e-export",
      icon: <FaUniversity />,
      title: "E-Export",
      description:
        "E-Export simplifies international trade with digital export documentation and compliance solutions. Expand your global reach with confidence, knowing that all export procedures are digitally managed, compliant, and efficient for seamless international business operations.",
      features: [
        { name: "Export Documentation", icon: <FaFileInvoiceDollar /> },
        { name: "Compliance Management", icon: <FaShieldAlt /> },
        { name: "International Standards", icon: <FaUniversity /> },
        { name: "Process Automation", icon: <FaRobot /> }
      ],
    },
    {
      id: 4,
      slug: "e-commerce",
      icon: <RiTeamLine />,
      title: "E-Commerce",
      description:
        "E-Commerce solutions that power your online business growth with integrated digital sales platforms. From inventory management to customer experience, our comprehensive e-commerce tools help you build, manage, and scale your online presence effectively.",
      features: [
        { name: "Online Store Management", icon: <FaCogs /> },
        { name: "Payment Integration", icon: <FaCreditCard /> },
        { name: "Inventory Control", icon: <FaArchive /> },
        { name: "Customer Analytics", icon: <FaChartLine /> }
      ],
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
            We&apos;ve spent years mastering SAP solutions that actually work for your business.
            Here&apos;s what we bring to every partnership - practical expertise that transforms how you handle finances and compliance.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {services.map((service) => (
            <article
              key={service.id}
              className={`flex flex-col gap-4 items-center bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg`}
            >
              <div className="flex flex-row w-full justify-between gap-8 md:gap-16 items-center p-8">
                {/* Service Content */}
                <div className={`space-y-6 max-w-5xl w-1/2`}>
                  {/* Service Header */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 font-sora leading-tight">
                    {service.title}
                  </h3>
                  <div className="w-10 h-1 bg-sky-600 mt-1"></div>

                  {/* Service Description */}
                  <p className="text-gray-600 font-montserrat text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <button className="btn btn-outline btn-info font-montserrat font-semibold text-sm md:text-base">Learn More <FaChevronRight /></button>
                  </Link>
                </div>

                {/* Service Visual */}
                <div className={`flex items-center justify-center w-1/2`}>
                  <div className="relative z-10 text-5xl md:text-6xl text-sky-600">
                    {service.icon}
                  </div>
                </div>
              </div>
              {/* What You Get List */}
              <div className="w-full bg-gradient-to-r from-sky-100 to-blue-100   rounded-b-lg p-4">
                <ul className="flex flex-row justify-between">
                  {service.features.map((feature, featIndex) => (
                    <li
                      key={featIndex}
                      className="flex items-center gap-3 hover:cursor-pointer text-white rounded-lg p-4 bg-white hover:bg-sky-50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-lg text-sky-600 text-sm">
                        {feature.icon}
                      </div>
                      <span className="text-gray-600 font-montserrat font-semibold text-sm md:text-base">{feature.name}</span>
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
"use client";
import React from "react";
import Link from "next/link";
import {
    FaFileInvoiceDollar,
    FaArchive,
    FaGlobe,
    FaShoppingCart,
    FaTruck,
    FaBook,
    FaReceipt,
    FaCash,
    FaChevronRight,
    FaShieldAlt,
    FaCloud,
    FaChartLine
} from "react-icons/fa";

function ServicesPage() {
    const services = [
        {
            id: 1,
            slug: "e-invoice",
            icon: <FaFileInvoiceDollar />,
            title: "E-Invoice",
            description: "E-Invoice is not just a digital transformation tool, but also an investment in the future of your business. It ensures seamless compliance while saving time and costs. Transform your invoicing process with secure, automated digital solutions that streamline operations and enhance business efficiency.",
            features: ["Legal Compliance", "Cost Reduction", "Automated Processing", "Real-time Tracking"]
        },
        {
            id: 2,
            slug: "e-archive-invoice",
            icon: <FaArchive />,
            title: "E-Archive Invoice",
            description: "E-Archive Invoice provides secure, long-term storage solutions for your digital invoices with full legal compliance. Never worry about document retention again - our robust archiving system ensures your invoices are safely stored, easily accessible, and always audit-ready.",
            features: ["Secure Storage", "Legal Compliance", "Easy Retrieval", "Audit Ready"]
        },
        {
            id: 3,
            slug: "e-export",
            icon: <FaGlobe />,
            title: "E-Export",
            description: "E-Export simplifies international trade with digital export documentation and compliance solutions. Expand your global reach with confidence, knowing that all export procedures are digitally managed, compliant, and efficient for seamless international business operations.",
            features: ["Export Documentation", "Compliance Management", "International Standards", "Process Automation"]
        },
        {
            id: 4,
            slug: "e-commerce",
            icon: <FaShoppingCart />,
            title: "E-Commerce",
            description: "E-Commerce solutions that power your online business growth with integrated digital sales platforms. From inventory management to customer experience, our comprehensive e-commerce tools help you build, manage, and scale your online presence effectively.",
            features: ["Online Store Management", "Payment Integration", "Inventory Control", "Customer Analytics"]
        },
        {
            id: 5,
            slug: "e-delivery-note",
            icon: <FaTruck />,
            title: "E-Delivery Note",
            description: "E-Delivery Note digitizes your delivery documentation process, ensuring accurate tracking and legal compliance. Eliminate paper-based delivery notes and embrace digital efficiency with real-time delivery confirmation and automated record-keeping.",
            features: ["Digital Documentation", "Real-time Tracking", "Delivery Confirmation", "Legal Compliance"]
        },
        {
            id: 6,
            slug: "e-ledger",
            icon: <FaBook />,
            title: "E-Ledger",
            description: "E-Ledger transforms your financial record-keeping with digital ledger solutions that ensure legal compliance and financial transparency. Maintain accurate, auditable financial records with automated bookkeeping that meets all regulatory requirements.",
            features: ["Digital Bookkeeping", "Regulatory Compliance", "Automated Reports", "Audit Trail"]
        },
        {
            id: 7,
            slug: "e-adisyon",
            icon: <FaReceipt />,
            title: "E-Adisyon (E-Order Receipt)",
            description: "E-Adisyon revolutionizes restaurant order management with digital receipt solutions. Streamline your food service operations with electronic order receipts that improve efficiency, reduce waste, and provide better customer service experience.",
            features: ["Digital Receipts", "Order Management", "Customer Experience", "Cost Efficiency"]
        },
        {
            id: 8,
            slug: "digigarson-pos",
            icon: <FaReceipt />,
            title: "DigiGarson Cafe&Restaurant POS Software",
            description: "DigiGarson provides comprehensive POS and management solutions specifically designed for food & beverage businesses. From order taking to inventory management, our integrated platform helps restaurants operate more efficiently and profitably.",
            features: ["POS System", "Inventory Management", "Staff Management", "Sales Analytics"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sora">
                            Digital Business
                            <span className="block text-sky-400">Solutions</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-montserrat leading-relaxed">
                            Transform your business with our comprehensive suite of digital solutions designed for modern enterprises
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
                            <span className="relative inline-block text-sky-600">
                                Our Services
                                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto">
                            Comprehensive digital transformation solutions tailored for your business needs.
                            From compliance to commerce, we've got you covered.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105 flex flex-col h-full"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white">
                                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4 text-2xl">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold font-sora mb-2">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6 flex-grow">
                                        {service.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                                                <span className="text-gray-700 font-montserrat">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <div className="mt-auto">
                                        <Link href={`/services/${service.slug}`}>
                                            <button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                                                <span>Learn More</span>
                                                <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold font-sora mb-4">
                                Ready to Transform Your Business?
                            </h3>
                            <p className="text-gray-300 font-montserrat text-lg mb-8 leading-relaxed">
                                Our expert team is ready to help you implement the right digital solutions for your business needs.
                                Get started with a free consultation today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <span>Get Free Consultation</span>
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </Link>
                                <Link href="/services/e-invoice">
                                    <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                                        Start with E-Invoice
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServicesPage;

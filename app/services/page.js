"use client";
import React from "react";
import Link from "next/link";
import {
    FaArchive,
    FaGlobe,
    FaShoppingCart,
    FaTruck,
    FaBook,
    FaReceipt,
    FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";

function ServicesPage() {
    const services = [
        {
            id: 1,
            slug: "e-invoice",
            icon: <Image src="/images/services/invoice.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-10 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: "E-Invoice",
            description: "E-Invoice is not just a digital transformation tool, but also an investment in the future of your business. It ensures seamless compliance while saving time and costs. Transform your invoicing process with secure, automated digital solutions that streamline operations and enhance business efficiency.",
            features: ["Legal Compliance", "Cost Reduction", "Automated Processing", "Real-time Tracking"]
        },
        {
            id: 2,
            slug: "e-ledger",
            icon: <Image src="/images/services/ledger.webp" alt="E-Invoice" className='size-28 md:size-36 -rotate-10 translate-y-10 md:translate-y-14 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: "E-Ledger",
            description: "E-Ledger transforms your financial record-keeping with digital ledger solutions that ensure legal compliance and financial transparency. Maintain accurate, auditable financial records with automated bookkeeping that meets all regulatory requirements.",
            features: ["Digital Bookkeeping", "Regulatory Compliance", "Automated Reports", "Audit Trail"]
        },
        {
            id: 3,
            slug: "e-export",
            icon: <Image src="/images/services/export.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: "E-Export",
            description: "E-Export simplifies international trade with digital export documentation and compliance solutions. Expand your global reach with confidence, knowing that all export procedures are digitally managed, compliant, and efficient for seamless international business operations.",
            features: ["Export Documentation", "Compliance Management", "International Standards", "Process Automation"]
        },
        {
            id: 4,
            slug: "digigarson-pos",
            icon: <Image src="/images/services/digi-garson.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: "DigiGarson",
            description: "DigiGarson provides comprehensive POS and management solutions specifically designed for food & beverage businesses. From order taking to inventory management, our integrated platform helps restaurants operate more efficiently and profitably.",
            features: ["POS System", "Inventory Management", "Staff Management", "Sales Analytics"]
        },
        {
            id: 5,
            slug: "e-commerce",
            icon: <Image src="/images/services/e-commerce.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: "E-Commerce",
            description: "E-Commerce solutions that power your online business growth with integrated digital sales platforms. From inventory management to customer experience, our comprehensive e-commerce tools help you build, manage, and scale your online presence effectively.",
            features: ["Online Store Management", "Payment Integration", "Inventory Control", "Customer Analytics"]
        },
        {
            id: 6,
            slug: "e-delivery-note",
            icon: <Image src="/images/services/delivery note.webp" alt="E-Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 md:translate-y-10 translate-x-10 md:translate-x-5' width={500} height={500} />,
            title: "E-Delivery Note",
            description: "E-Delivery Note digitizes your delivery documentation process, ensuring accurate tracking and legal compliance. Eliminate paper-based delivery notes and embrace digital efficiency with real-time delivery confirmation and automated record-keeping.",
            features: ["Digital Documentation", "Real-time Tracking", "Delivery Confirmation", "Legal Compliance"]
        },
        {
            id: 7,
            slug: "e-archive-invoice",
            icon: <Image src="/images/services/archive.webp" alt="E-Archive Invoice" className='size-28 md:size-32 -rotate-15 translate-y-8 translate-x-8' width={500} height={500} />,
            title: "E-Archive Invoice",
            description: "E-Archive Invoice provides secure, long-term storage solutions for your digital invoices with full legal compliance. Never worry about document retention again - our robust archiving system ensures your invoices are safely stored, easily accessible, and always audit-ready.",
            features: ["Secure Storage", "Legal Compliance", "Easy Retrieval", "Audit Ready"]
        },
        {
            id: 8,
            slug: "e-adisyon",
            icon: <Image src="/images/services/adisyon.webp" alt="E-Invoice" className='size-32 -rotate-15 translate-y-9 translate-x-7' width={500} height={500} />,
            title: "E-Order Receipt",
            description: "E-Adisyon revolutionizes restaurant order management with digital receipt solutions. Streamline your food service operations with electronic order receipts that improve efficiency, reduce waste, and provide better customer service experience.",
            features: ["Digital Receipts", "Order Management", "Customer Experience", "Cost Efficiency"]
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 sm:py-32 lg:py-40 pt-24 sm:pt-32 lg:pt-40">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-sora leading-tight">
                            Digital Business
                            <span className="block text-sky-400">Solutions</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-montserrat leading-relaxed">
                            Transform your business with our comprehensive suite of digital solutions designed for modern enterprises
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 sm:py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                            <span className="relative inline-block text-sky-600">
                                Our Services
                                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto px-4">
                            Comprehensive digital transformation solutions tailored for your business needs.
                            From compliance to commerce, we've got you covered.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105 flex flex-col h-full overflow-visible"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 text-white rounded-t-xl relative">
                                    <div className="absolute bottom-6 sm:bottom-10 right-10 sm:right-5 drop-shadow-2xl">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold font-sora mb-2 max-w-32">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Card Content */}
                                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                                    <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4 sm:mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-4 sm:mb-6 flex-grow">
                                        {service.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full mr-3 flex-shrink-0"></div>
                                                <span className="text-gray-700 font-montserrat">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <div className="mt-auto">
                                        <Link href={`/services/${service.slug}`}>
                                            <button className="w-full cursor-pointer bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                                                <span className="text-sm">Learn More</span>
                                                <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-sora mb-4">
                                Ready to Transform Your Business?
                            </h3>
                            <p className="text-gray-300 font-montserrat text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
                                Our expert team is ready to help you implement the right digital solutions for your business needs.
                                Get started with a free consultation today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 w-full sm:w-auto">
                                        <span className="text-sm sm:text-base">Get Free Consultation</span>
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </Link>
                                <Link href="/services/e-invoice">
                                    <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                                        <span className="text-sm sm:text-base">Start with E-Invoice</span>
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

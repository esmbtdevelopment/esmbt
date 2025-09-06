"use client";
import React from "react";
import { notFound } from "next/navigation";
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
    FaChartLine,
    FaCheck,
    FaClock,
    FaUsers,
    FaCogs,
    FaLightbulb,
    FaArrowLeft,
    FaStar
} from "react-icons/fa";
import Link from "next/link";

// Detailed service data
const serviceData = {
    "e-invoice": {
        id: "e-invoice",
        title: "E-Invoice",
        subtitle: "Digital Invoice Solutions",
        icon: <FaFileInvoiceDollar />,
        heroDescription: "Transform your invoicing process with secure, automated digital solutions that ensure compliance while reducing costs and improving efficiency.",
        fullDescription: "E-Invoice is not just a digital transformation tool, but also an investment in the future of your business. Our comprehensive e-invoicing solution ensures seamless compliance with local and international regulations while dramatically reducing processing time and operational costs. Built with enterprise-grade security and scalability in mind.",
        benefits: [
            "Reduce invoice processing time by up to 80%",
            "Ensure 100% legal compliance with tax regulations",
            "Lower operational costs through automation",
            "Real-time invoice tracking and status updates",
            "Seamless integration with existing ERP systems",
            "Enhanced security with digital signatures"
        ],
        features: [
            {
                title: "Automated Processing",
                description: "Intelligent automation handles invoice generation, validation, and submission without manual intervention.",
                icon: <FaCogs />
            },
            {
                title: "Legal Compliance",
                description: "Built-in compliance checks ensure all invoices meet local tax authority requirements and regulations.",
                icon: <FaShieldAlt />
            },
            {
                title: "Real-time Tracking",
                description: "Monitor invoice status in real-time with detailed tracking and delivery confirmations.",
                icon: <FaChartLine />
            },
            {
                title: "Cloud-Based Platform",
                description: "Secure cloud infrastructure ensures 99.9% uptime and seamless scalability as your business grows.",
                icon: <FaCloud />
            }
        ],
        implementation: [
            "Initial consultation and requirement analysis",
            "System integration planning and setup",
            "Data migration and testing phase",
            "Staff training and knowledge transfer",
            "Go-live support and monitoring",
            "Ongoing maintenance and updates"
        ],
        industries: ["Manufacturing", "Retail", "Healthcare", "Finance", "Logistics", "Technology"],
        roi: "Average ROI of 300% within first year of implementation"
    },
    "e-archive-invoice": {
        id: "e-archive-invoice",
        title: "E-Archive Invoice",
        subtitle: "Secure Invoice Storage Solutions",
        icon: <FaArchive />,
        heroDescription: "Secure, long-term storage solutions for your digital invoices with full legal compliance and easy retrieval capabilities.",
        fullDescription: "E-Archive Invoice provides a comprehensive digital archiving solution that ensures your invoices are securely stored, legally compliant, and always accessible. Our robust archiving system eliminates the need for physical document storage while maintaining full audit trails and regulatory compliance.",
        benefits: [
            "Secure long-term document storage",
            "Full legal compliance with retention requirements",
            "Instant document retrieval and search",
            "Automated backup and disaster recovery",
            "Reduced physical storage costs",
            "Complete audit trail maintenance"
        ],
        features: [
            {
                title: "Secure Storage",
                description: "Enterprise-grade encryption ensures your archived invoices remain secure and protected from unauthorized access.",
                icon: <FaShieldAlt />
            },
            {
                title: "Easy Retrieval",
                description: "Advanced search capabilities allow instant retrieval of any archived invoice using multiple search criteria.",
                icon: <FaChartLine />
            },
            {
                title: "Legal Compliance",
                description: "Automated compliance management ensures all archived documents meet legal retention requirements.",
                icon: <FaCheck />
            },
            {
                title: "Audit Ready",
                description: "Complete audit trails and tamper-proof storage make your archive always ready for regulatory inspections.",
                icon: <FaCogs />
            }
        ],
        implementation: [
            "Archive requirement assessment",
            "Data migration planning and execution",
            "Security configuration and testing",
            "User access control setup",
            "System integration and testing",
            "Ongoing monitoring and maintenance"
        ],
        industries: ["All Industries", "Government", "Healthcare", "Finance", "Legal Services", "Manufacturing"],
        roi: "Reduce document storage costs by up to 70%"
    },
    "e-export": {
        id: "e-export",
        title: "E-Export",
        subtitle: "Digital Export Solutions",
        icon: <FaGlobe />,
        heroDescription: "Simplify international trade with comprehensive digital export documentation and compliance management solutions.",
        fullDescription: "E-Export streamlines your international trade operations with digital export documentation, automated compliance checks, and seamless integration with customs authorities. Expand your global reach with confidence, knowing all export procedures are digitally managed and compliant.",
        benefits: [
            "Streamlined export documentation process",
            "Automated compliance with international regulations",
            "Faster customs clearance and processing",
            "Reduced export-related errors and delays",
            "Real-time shipment tracking and updates",
            "Integration with global trade platforms"
        ],
        features: [
            {
                title: "Export Documentation",
                description: "Automated generation of all required export documents including certificates, permits, and declarations.",
                icon: <FaFileInvoiceDollar />
            },
            {
                title: "Compliance Management",
                description: "Built-in compliance checks ensure all exports meet destination country requirements and regulations.",
                icon: <FaShieldAlt />
            },
            {
                title: "International Standards",
                description: "Full compliance with international trade standards and customs requirements across multiple jurisdictions.",
                icon: <FaGlobe />
            },
            {
                title: "Process Automation",
                description: "End-to-end automation reduces manual work and eliminates common export processing errors.",
                icon: <FaCogs />
            }
        ],
        implementation: [
            "Export process analysis and mapping",
            "System configuration for target markets",
            "Integration with customs platforms",
            "Document template customization",
            "Staff training on export procedures",
            "Go-live support and optimization"
        ],
        industries: ["Manufacturing", "Agriculture", "Technology", "Automotive", "Textiles", "Chemicals"],
        roi: "Reduce export processing time by up to 60%"
    },
    "e-commerce": {
        id: "e-commerce",
        title: "E-Commerce",
        subtitle: "Online Commerce Platform",
        icon: <FaShoppingCart />,
        heroDescription: "Comprehensive e-commerce solutions that power your online business growth with integrated digital sales platforms.",
        fullDescription: "Our E-Commerce platform provides everything you need to build, manage, and scale your online business. From inventory management to customer experience optimization, our comprehensive tools help you succeed in the digital marketplace with professional-grade features and seamless integrations.",
        benefits: [
            "Complete online store management",
            "Integrated payment processing",
            "Advanced inventory control",
            "Customer analytics and insights",
            "Mobile-responsive design",
            "SEO optimization tools"
        ],
        features: [
            {
                title: "Store Management",
                description: "Comprehensive tools for managing products, orders, customers, and content from a single dashboard.",
                icon: <FaCogs />
            },
            {
                title: "Payment Integration",
                description: "Secure payment processing with support for multiple payment methods and currencies.",
                icon: <FaShieldAlt />
            },
            {
                title: "Inventory Control",
                description: "Real-time inventory tracking with automated reorder points and supplier management.",
                icon: <FaChartLine />
            },
            {
                title: "Customer Analytics",
                description: "Detailed customer behavior analytics to optimize sales and improve customer experience.",
                icon: <FaUsers />
            }
        ],
        implementation: [
            "Business requirement analysis",
            "Platform setup and customization",
            "Payment gateway integration",
            "Product catalog migration",
            "Design and UX optimization",
            "Launch and ongoing support"
        ],
        industries: ["Retail", "Fashion", "Electronics", "Home & Garden", "Sports", "Beauty"],
        roi: "Increase online sales by up to 250%"
    },
    "e-delivery-note": {
        id: "e-delivery-note",
        title: "E-Delivery Note",
        subtitle: "Digital Delivery Documentation",
        icon: <FaTruck />,
        heroDescription: "Digitize your delivery documentation process with real-time tracking and automated record-keeping for legal compliance.",
        fullDescription: "E-Delivery Note eliminates paper-based delivery documentation and embraces digital efficiency. Our solution provides real-time delivery confirmation, automated record-keeping, and ensures legal compliance while reducing administrative overhead and improving delivery accuracy.",
        benefits: [
            "Eliminate paper-based delivery notes",
            "Real-time delivery confirmation",
            "Automated record-keeping",
            "Legal compliance assurance",
            "Reduced administrative costs",
            "Improved delivery accuracy"
        ],
        features: [
            {
                title: "Digital Documentation",
                description: "Complete digitization of delivery notes with electronic signatures and timestamp verification.",
                icon: <FaFileInvoiceDollar />
            },
            {
                title: "Real-time Tracking",
                description: "Live tracking of deliveries with GPS integration and status updates throughout the delivery process.",
                icon: <FaChartLine />
            },
            {
                title: "Delivery Confirmation",
                description: "Digital proof of delivery with recipient signatures and photo confirmation capabilities.",
                icon: <FaCheck />
            },
            {
                title: "Legal Compliance",
                description: "Ensures all delivery documentation meets legal requirements with tamper-proof digital records.",
                icon: <FaShieldAlt />
            }
        ],
        implementation: [
            "Delivery process assessment",
            "Mobile app deployment",
            "Driver training and onboarding",
            "System integration testing",
            "Go-live support and monitoring",
            "Performance optimization"
        ],
        industries: ["Logistics", "Retail", "Manufacturing", "Food & Beverage", "Pharmaceuticals", "E-commerce"],
        roi: "Reduce delivery documentation costs by 85%"
    },
    "e-ledger": {
        id: "e-ledger",
        title: "E-Ledger",
        subtitle: "Digital Financial Ledger",
        icon: <FaBook />,
        heroDescription: "Transform financial record-keeping with digital ledger solutions ensuring legal compliance and financial transparency.",
        fullDescription: "E-Ledger provides a comprehensive digital bookkeeping solution that maintains accurate, auditable financial records with automated processes. Our system ensures regulatory compliance while providing real-time financial insights and reducing the complexity of financial management.",
        benefits: [
            "Automated digital bookkeeping",
            "Full regulatory compliance",
            "Real-time financial reporting",
            "Complete audit trail",
            "Reduced accounting errors",
            "Integration with accounting systems"
        ],
        features: [
            {
                title: "Digital Bookkeeping",
                description: "Automated transaction recording with intelligent categorization and reconciliation capabilities.",
                icon: <FaCogs />
            },
            {
                title: "Regulatory Compliance",
                description: "Built-in compliance features ensure all records meet local and international accounting standards.",
                icon: <FaShieldAlt />
            },
            {
                title: "Automated Reports",
                description: "Generate comprehensive financial reports automatically with customizable templates and scheduling.",
                icon: <FaChartLine />
            },
            {
                title: "Audit Trail",
                description: "Complete audit trail with timestamp verification and user activity tracking for transparency.",
                icon: <FaCheck />
            }
        ],
        implementation: [
            "Financial process analysis",
            "Chart of accounts setup",
            "Data migration and validation",
            "User training and certification",
            "System integration testing",
            "Ongoing support and updates"
        ],
        industries: ["All Industries", "Accounting Firms", "SMEs", "Non-profits", "Government", "Healthcare"],
        roi: "Reduce accounting processing time by 75%"
    },
    "e-adisyon": {
        id: "e-adisyon",
        title: "E-Adisyon (E-Order Receipt)",
        subtitle: "Digital Restaurant Receipts",
        icon: <FaReceipt />,
        heroDescription: "Revolutionize restaurant operations with digital order receipt solutions that improve efficiency and customer experience.",
        fullDescription: "E-Adisyon transforms restaurant order management with electronic receipt solutions. Streamline your food service operations, reduce waste, improve customer service, and ensure compliance with digital receipt systems designed specifically for the hospitality industry.",
        benefits: [
            "Digital order receipt management",
            "Improved customer experience",
            "Reduced paper waste and costs",
            "Enhanced order accuracy",
            "Real-time order tracking",
            "Integration with POS systems"
        ],
        features: [
            {
                title: "Digital Receipts",
                description: "Electronic receipt generation with customizable templates and automatic delivery to customers.",
                icon: <FaReceipt />
            },
            {
                title: "Order Management",
                description: "Comprehensive order tracking from placement to completion with real-time status updates.",
                icon: <FaCogs />
            },
            {
                title: "Customer Experience",
                description: "Enhanced customer experience with digital receipts, loyalty integration, and feedback collection.",
                icon: <FaUsers />
            },
            {
                title: "Cost Efficiency",
                description: "Significant cost savings through reduced paper usage and streamlined receipt processing.",
                icon: <FaChartLine />
            }
        ],
        implementation: [
            "Restaurant operation assessment",
            "POS system integration",
            "Staff training and setup",
            "Customer communication setup",
            "Testing and optimization",
            "Ongoing support and updates"
        ],
        industries: ["Restaurants", "Cafes", "Fast Food", "Catering", "Food Trucks", "Hotels"],
        roi: "Reduce receipt processing costs by 90%"
    },
    "digigarson-pos": {
        id: "digigarson-pos",
        title: "DigiGarson Cafe&Restaurant POS Software",
        subtitle: "Complete Restaurant Management",
        icon: <FaCash />,
        heroDescription: "Comprehensive POS and management solutions specifically designed for food & beverage businesses.",
        fullDescription: "DigiGarson provides an all-in-one restaurant management platform that combines point-of-sale functionality with comprehensive business management tools. From order taking to inventory management, our integrated platform helps restaurants operate more efficiently and profitably.",
        benefits: [
            "Complete POS functionality",
            "Integrated inventory management",
            "Staff scheduling and management",
            "Detailed sales analytics",
            "Customer relationship management",
            "Multi-location support"
        ],
        features: [
            {
                title: "POS System",
                description: "Full-featured point-of-sale system with order management, payment processing, and receipt generation.",
                icon: <FaCash />
            },
            {
                title: "Inventory Management",
                description: "Real-time inventory tracking with automated reorder alerts and supplier management integration.",
                icon: <FaBook />
            },
            {
                title: "Staff Management",
                description: "Employee scheduling, time tracking, and performance management tools for optimal staff utilization.",
                icon: <FaUsers />
            },
            {
                title: "Sales Analytics",
                description: "Comprehensive reporting and analytics to track performance, identify trends, and optimize operations.",
                icon: <FaChartLine />
            }
        ],
        implementation: [
            "Restaurant needs assessment",
            "Hardware setup and configuration",
            "Menu and pricing configuration",
            "Staff training and certification",
            "Integration testing and optimization",
            "Ongoing support and maintenance"
        ],
        industries: ["Restaurants", "Cafes", "Bars", "Hotels", "Catering", "Food Courts"],
        roi: "Improve operational efficiency by 40%"
    }
};

export default function ServiceDetailPage({ params }) {
    const { servicename } = params;
    const service = serviceData[servicename];

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 text-white py-20 pt-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href="/services"
                            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-8 transition-colors duration-300"
                        >
                            <FaArrowLeft className="mr-2" />
                            <span>Back to Services</span>
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="text-4xl text-sky-400 mr-4">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold font-sora mb-2">
                                            {service.title}
                                        </h1>
                                        <p className="text-xl text-sky-300 font-montserrat">
                                            {service.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xl text-gray-300 font-montserrat leading-relaxed mb-8">
                                    {service.heroDescription}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <span>Get Started</span>
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                    <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                                        Request Demo
                                    </button>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className="text-center lg:text-right">
                                <div className="inline-block p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
                                    <div className="text-8xl text-sky-400 mb-4">
                                        {service.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-2">
                                        {service.roi}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Overview */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                    Why Choose {service.title}?
                                </h2>
                                <p className="text-lg text-gray-600 font-montserrat leading-relaxed mb-8">
                                    {service.fullDescription}
                                </p>
                            </div>
                            <div className="space-y-4">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <FaCheck className="text-sky-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 font-montserrat">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                <span className="relative inline-block text-sky-600">
                                    Key Features
                                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto">
                                Comprehensive features designed to transform your business operations and drive growth.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {service.features.map((feature, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-3xl text-sky-500 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-sora">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Implementation Process */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                Implementation Process
                            </h2>
                            <p className="text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto">
                                Our proven implementation methodology ensures smooth deployment and maximum ROI.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.implementation.map((step, index) => (
                                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-sky-50 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 font-montserrat font-medium">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries & CTA */}
            <section className="py-16 md:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sora">
                            Perfect for Your Industry
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 font-montserrat">
                            Trusted by businesses across multiple industries
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {service.industries.map((industry, index) => (
                                <span key={index} className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-montserrat">
                                    {industry}
                                </span>
                            ))}
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-sora">
                                Ready to Get Started?
                            </h3>
                            <p className="text-gray-300 font-montserrat text-lg mb-8 leading-relaxed">
                                Join thousands of businesses that have transformed their operations with {service.title}.
                                Get started with a free consultation today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                    <span>Start Free Trial</span>
                                    <FaChevronRight className="text-sm" />
                                </button>
                                <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

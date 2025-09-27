"use client";
import React, { use } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from 'next-intl';
import {
    FaChartLine,
    FaDatabase,
    FaCogs,
    FaCloud,
    FaChartArea,
    FaShieldAlt,
    FaLifeRing,
    FaArrowLeft,
    FaCheck,
    FaUsers,
    FaClock,
    FaRocket,
    FaHandshake,
    FaChevronRight
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { isOnLandingPage, scrollToSection } from "@/utils/navigation";

// Detailed product data
const productData = {
    "strategic-sap-consulting": {
        id: "strategic-sap-consulting",
        title: "Strategic SAP Consulting",
        subtitle: "Expert SAP Transformation Guidance",
        icon: <Image src="/images/products/sap-consulting.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="Strategic SAP Consulting" width={1000} height={1000} />,
        heroDescription: "Expert guidance for your SAP transformation journey with strategic planning and business process optimization.",
        fullDescription: "Our Strategic SAP Consulting services provide comprehensive roadmap development, business process analysis, and change management support to ensure successful SAP implementations. We combine industry best practices with your unique business requirements to deliver transformational results.",
        benefits: [
            "Reduced implementation costs by 30%",
            "Improved business process efficiency",
            "Strategic roadmap for digital transformation",
            "Risk mitigation and compliance assurance"
        ],
        features: [
            {
                title: "Business Process Analysis",
                description: "Comprehensive analysis of your current business processes to identify optimization opportunities",
                icon: <FaChartLine />
            },
            {
                title: "Strategic Roadmap Development",
                description: "Create a detailed implementation roadmap aligned with your business objectives",
                icon: <FaRocket />
            },
            {
                title: "Change Management",
                description: "Guide your organization through digital transformation with proven methodologies",
                icon: <FaUsers />
            },
            {
                title: "Risk Assessment",
                description: "Identify and mitigate potential risks before they impact your project",
                icon: <FaShieldAlt />
            }
        ],
        implementation: [
            "Initial business assessment and requirement gathering",
            "Current state analysis and gap identification",
            "Future state design and roadmap creation",
            "Implementation planning and resource allocation",
            "Change management strategy development",
            "Go-live support and post-implementation review"
        ],
        industries: ["Manufacturing", "Retail", "Healthcare", "Financial Services", "Automotive", "Energy"],
        roi: "Achieve 30% faster SAP implementation with strategic planning"
    },
    "sap-erp-implementation": {
        id: "sap-erp-implementation",
        title: "SAP ERP Implementation & Enhancement",
        subtitle: "Complete ERP Implementation Services",
        icon: <Image src="/images/products/sap-erp.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="SAP ERP Implementation" width={1000} height={1000} />,
        heroDescription: "Complete SAP ERP implementation and enhancement services tailored to your business needs.",
        fullDescription: "Our SAP ERP Implementation services cover end-to-end deployment of SAP systems, including all major modules like FI/CO, MM, SD, PP, and HCM. We ensure seamless integration, data migration, and user adoption for successful ERP transformation.",
        benefits: [
            "Streamlined business processes across all departments",
            "Real-time visibility into business operations",
            "Improved data accuracy and reporting capabilities",
            "Enhanced operational efficiency and cost reduction"
        ],
        features: [
            {
                title: "Full System Implementation",
                description: "End-to-end SAP ERP implementation tailored to your business needs",
                icon: <FaDatabase />
            },
            {
                title: "Data Integration",
                description: "Seamless integration of existing data sources and systems",
                icon: <FaCogs />
            },
            {
                title: "Process Optimization",
                description: "Optimize business processes for maximum efficiency and productivity",
                icon: <FaChartLine />
            },
            {
                title: "User Training",
                description: "Comprehensive training programs to ensure successful user adoption",
                icon: <FaUsers />
            }
        ],
        implementation: [
            "Business requirement analysis and system design",
            "Module configuration and customization",
            "Data migration and system integration",
            "User acceptance testing and training",
            "Go-live support and hypercare",
            "Post-implementation optimization and support"
        ],
        industries: ["Manufacturing", "Retail & Distribution", "Oil & Gas", "Pharmaceuticals", "Consumer Goods", "Utilities"],
        roi: "Reduce operational costs by 25% through integrated ERP processes"
    },
    "sap-technical-services": {
        id: "sap-technical-services",
        title: "SAP Technical Services",
        subtitle: "Professional Technical Support",
        icon: <Image src="/images/products/sap-technical-services.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="SAP Technical Services" width={1000} height={1000} />,
        heroDescription: "Professional technical services to keep your SAP systems running at peak performance.",
        fullDescription: "Our SAP Technical Services encompass ABAP development, Basis administration, system integration, and modern UI development. We ensure your SAP landscape operates efficiently with optimal performance and security.",
        benefits: [
            "Maximized system performance and reliability",
            "Reduced downtime and technical issues",
            "Enhanced security and compliance",
            "Optimized infrastructure costs and resource utilization"
        ],
        features: [
            {
                title: "System Maintenance",
                description: "Regular maintenance and updates to keep your SAP system running smoothly",
                icon: <FaCogs />
            },
            {
                title: "Performance Optimization",
                description: "Continuous monitoring and optimization of system performance",
                icon: <FaChartLine />
            },
            {
                title: "Technical Support",
                description: "Expert technical support for all your SAP-related issues",
                icon: <FaLifeRing />
            },
            {
                title: "System Upgrades",
                description: "Planned system upgrades and enhancement implementations",
                icon: <FaRocket />
            }
        ],
        implementation: [
            "Technical requirement analysis and architecture design",
            "Development environment setup and configuration",
            "Custom development and system enhancement",
            "Integration testing and quality assurance",
            "Deployment and production support",
            "Ongoing maintenance and performance optimization"
        ],
        industries: ["All Industries", "Technology", "Financial Services", "Manufacturing", "Healthcare", "Government"],
        roi: "Improve system performance by 40% with optimized technical infrastructure"
    },
    "sap-cloud-solutions": {
        id: "sap-cloud-solutions",
        title: "SAP Cloud Solutions",
        subtitle: "Scalable Cloud Services",
        icon: <Image src="/images/products/sap-cloud.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="SAP Cloud Solutions" width={1000} height={1000} />,
        heroDescription: "Scalable cloud solutions that provide flexibility, security, and cost-effectiveness for your business.",
        fullDescription: "Our SAP Cloud Solutions include S/4HANA Cloud, SuccessFactors, Ariba, and Concur implementations. We help you leverage the power of cloud computing for enhanced scalability, reduced infrastructure costs, and improved business agility.",
        benefits: [
            "Reduced infrastructure costs and maintenance overhead",
            "Enhanced scalability and business agility",
            "Improved security and compliance capabilities",
            "Faster time-to-market with cloud-native solutions"
        ],
        features: [
            {
                title: "Cloud Migration",
                description: "Seamless migration of your SAP systems to the cloud",
                icon: <FaCloud />
            },
            {
                title: "Hybrid Solutions",
                description: "Flexible hybrid cloud solutions that meet your specific needs",
                icon: <FaCogs />
            },
            {
                title: "Security Management",
                description: "Advanced security measures to protect your cloud-based systems",
                icon: <FaShieldAlt />
            },
            {
                title: "Cloud Optimization",
                description: "Continuous optimization of cloud resources for cost efficiency",
                icon: <FaChartLine />
            }
        ],
        implementation: [
            "Cloud readiness assessment and migration planning",
            "Cloud architecture design and security configuration",
            "Data migration and system integration",
            "User training and change management",
            "Go-live support and optimization",
            "Ongoing cloud management and support"
        ],
        industries: ["Technology", "Financial Services", "Healthcare", "Retail", "Manufacturing", "Professional Services"],
        roi: "Achieve 50% reduction in IT infrastructure costs with cloud migration"
    },
    "sap-analytics-intelligence": {
        id: "sap-analytics-intelligence",
        title: "SAP Analytics & Intelligence",
        subtitle: "Advanced Data Analytics Solutions",
        icon: <Image src="/images/products/sap-analytics.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="SAP Analytics & Intelligence" width={1000} height={1000} />,
        heroDescription: "Transform your data into actionable insights with advanced analytics and business intelligence solutions.",
        fullDescription: "Our SAP Analytics & Intelligence services include BusinessObjects, SAC, BW/4HANA, and HANA database optimization. We help you unlock the power of your data for better decision-making and business performance.",
        benefits: [
            "Data-driven decision making across the organization",
            "Real-time insights and predictive analytics capabilities",
            "Improved operational efficiency through advanced reporting",
            "Enhanced business performance with intelligent data analysis"
        ],
        features: [
            {
                title: "Business Intelligence",
                description: "Comprehensive BI solutions for data-driven decision making",
                icon: <FaChartArea />
            },
            {
                title: "Data Visualization",
                description: "Interactive dashboards and reports for better data understanding",
                icon: <FaChartLine />
            },
            {
                title: "Predictive Analytics",
                description: "Advanced analytics to predict trends and business outcomes",
                icon: <FaRocket />
            },
            {
                title: "Real-time Reporting",
                description: "Live reporting capabilities for immediate business insights",
                icon: <FaClock />
            }
        ],
        implementation: [
            "Data landscape assessment and analytics strategy",
            "Data architecture design and modeling",
            "Analytics platform deployment and configuration",
            "Dashboard and report development",
            "User training and adoption support",
            "Performance optimization and ongoing support"
        ],
        industries: ["Financial Services", "Retail & Consumer Goods", "Manufacturing", "Healthcare", "Telecommunications", "Government"],
        roi: "Accelerate decision-making by 60% with real-time analytics and intelligence"
    },
    "sap-security-compliance": {
        id: "sap-security-compliance",
        title: "SAP Security & Compliance",
        subtitle: "Comprehensive Security Solutions",
        icon: <Image src="/images/products/sap-security.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="SAP Security & Compliance" width={1000} height={1000} />,
        heroDescription: "Comprehensive security and compliance solutions to protect your SAP environment and ensure regulatory adherence.",
        fullDescription: "Our SAP Security & Compliance services include GRC implementation, security assessments, identity management, and audit support. We help you maintain the highest security standards while ensuring regulatory compliance.",
        benefits: [
            "Enhanced security posture and risk mitigation",
            "Regulatory compliance and audit readiness",
            "Streamlined access management and governance",
            "Reduced security vulnerabilities and threats"
        ],
        features: [
            {
                title: "Access Management",
                description: "Comprehensive user access management and role-based security",
                icon: <FaShieldAlt />
            },
            {
                title: "Compliance Auditing",
                description: "Regular compliance audits to ensure regulatory adherence",
                icon: <FaCheck />
            },
            {
                title: "Risk Assessment",
                description: "Continuous risk assessment and mitigation strategies",
                icon: <FaChartLine />
            },
            {
                title: "Security Policies",
                description: "Development and implementation of comprehensive security policies",
                icon: <FaCogs />
            }
        ],
        implementation: [
            "Security assessment and compliance gap analysis",
            "Risk framework design and implementation",
            "Security controls deployment and configuration",
            "Identity management system integration",
            "Compliance monitoring setup and testing",
            "Ongoing security management and support"
        ],
        industries: ["Financial Services", "Healthcare", "Government", "Manufacturing", "Energy & Utilities", "Pharmaceuticals"],
        roi: "Reduce security risks by 70% with comprehensive compliance framework"
    },
    "ongoing-support-maintenance": {
        id: "ongoing-support-maintenance",
        title: "Ongoing Support & Maintenance",
        subtitle: "Continuous Support Services",
        icon: <Image src="/images/products/sap-support.jpg" className="rounded-tr-3xl rounded-bl-3xl w-full h-full object-cover" alt="Ongoing Support & Maintenance" width={1000} height={1000} />,
        heroDescription: "Continuous support and maintenance services to ensure optimal performance of your SAP systems.",
        fullDescription: "Our Ongoing Support & Maintenance services include 24/7 AMS, system upgrades, performance optimization, and training programs. We ensure your SAP systems operate at peak performance with minimal downtime.",
        benefits: [
            "Maximized system uptime and availability",
            "Proactive issue prevention and resolution",
            "Continuous performance optimization",
            "Enhanced user productivity and satisfaction"
        ],
        features: [
            {
                title: "Help Desk Support",
                description: "Round-the-clock support for all your SAP-related issues",
                icon: <FaLifeRing />
            },
            {
                title: "Preventive Maintenance",
                description: "Regular maintenance to prevent issues before they occur",
                icon: <FaCogs />
            },
            {
                title: "System Monitoring",
                description: "Continuous monitoring of system performance and health",
                icon: <FaChartLine />
            },
            {
                title: "Continuous Improvement",
                description: "Ongoing optimization and enhancement of your SAP systems",
                icon: <FaRocket />
            }
        ],
        implementation: [
            "Current state assessment and service level definition",
            "Support framework setup and team transition",
            "Monitoring tools deployment and configuration",
            "Service delivery processes establishment",
            "Knowledge transfer and training programs",
            "Continuous improvement and optimization"
        ],
        industries: ["All Industries", "Manufacturing", "Financial Services", "Retail", "Healthcare", "Technology"],
        roi: "Achieve 99.9% system uptime with proactive support and maintenance"
    }
};

export default function ProductDetailPage({ params }) {
    const { locale, servicename } = use(params);
    const t = useTranslations('productDetails.products');
    const tUI = useTranslations('productDetails.ui');
    const tNav = useTranslations('navigation');

    const goToContact = () => {
        const onLandingPage = isOnLandingPage();
        scrollToSection('contact', onLandingPage);
    };

    // Get product data with translations
    const getProductData = (productName) => {
        const baseProduct = productData[productName];
        if (!baseProduct) return null;

        // Check if translations exist for this product
        try {
            // Handle arrays by accessing individual elements
            const benefits = [];
            const features = [];
            const implementation = [];
            const industries = [];

            // Get benefits array
            try {
                for (let i = 0; i < baseProduct.benefits.length; i++) {
                    benefits.push(t(`${productName}.benefits.${i}`));
                }
            } catch (e) {
                benefits.push(...baseProduct.benefits);
            }

            // Get features array
            try {
                for (let i = 0; i < baseProduct.features.length; i++) {
                    features.push({
                        title: t(`${productName}.features.${i}.title`),
                        description: t(`${productName}.features.${i}.description`),
                        icon: baseProduct.features[i].icon
                    });
                }
            } catch (e) {
                features.push(...baseProduct.features);
            }

            // Get implementation array
            try {
                for (let i = 0; i < baseProduct.implementation.length; i++) {
                    implementation.push(t(`${productName}.implementation.${i}`));
                }
            } catch (e) {
                implementation.push(...baseProduct.implementation);
            }

            // Get industries array
            try {
                for (let i = 0; i < baseProduct.industries.length; i++) {
                    industries.push(t(`${productName}.industries.${i}`));
                }
            } catch (e) {
                industries.push(...baseProduct.industries);
            }

            const translatedProduct = {
                ...baseProduct,
                title: t(`${productName}.title`),
                subtitle: t(`${productName}.subtitle`),
                heroDescription: t(`${productName}.heroDescription`),
                fullDescription: t(`${productName}.fullDescription`),
                benefits: benefits,
                features: features,
                implementation: implementation,
                industries: industries,
                roi: t(`${productName}.roi`)
            };
            return translatedProduct;
        } catch (error) {
            // Fallback to base product data if translations are missing
            console.warn(`Translations missing for product: ${productName}, falling back to base data`);
            return baseProduct;
        }
    };

    const product = getProductData(servicename);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 text-white py-16 sm:py-20 pt-24 sm:pt-32 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* Back Button */}
                        <Link
                            href={`/${locale}/services`}
                            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-6 sm:mb-8 transition-colors duration-300"
                        >
                            <FaArrowLeft className="mr-2 text-sm" />
                            <span className="text-sm sm:text-base">{tNav('backToServices')}</span>
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-4 sm:mb-6">
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sora mb-2 leading-tight">
                                            {product.title}
                                        </h1>
                                        <p className="text-lg sm:text-xl text-sky-300 font-montserrat">
                                            {product.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-montserrat leading-relaxed mb-6 sm:mb-8">
                                    {product.heroDescription}
                                </p>
                                <div className="flex-col sm:flex-row gap-4 hidden">
                                    <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <span className="text-sm sm:text-base">{tUI('getStarted')}</span>
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                    <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                                        <span className="text-sm sm:text-base">{tUI('requestDemo')}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className="drop-shadow-4xl p-4 w-full h-full">
                                {product.icon}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </section>

            {/* Product Overview */}
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                    {tUI('whyChoose')} {product.title}?
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed mb-6 sm:mb-8">
                                    {product.fullDescription}
                                </p>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {product.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <FaCheck className="text-sky-500 mt-1 mr-3 flex-shrink-0 text-sm" />
                                        <span className="text-gray-700 font-montserrat text-sm sm:text-base">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                <span className="relative inline-block text-sky-600">
                                    {tUI('keyFeatures')}
                                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-600"></div>
                                </span>
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto px-4">
                                {tUI('comprehensiveFeatures')}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {product.features.map((feature, index) => (
                                <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-2xl sm:text-3xl text-sky-500 mb-3 sm:mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-sora">
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
            <section className="py-12 sm:py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                {tUI('implementationProcess')}
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto px-4">
                                {tUI('provenMethodology')}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {product.implementation.map((step, index) => (
                                <div key={index} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-sky-50 transition-colors duration-300">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0 text-sm">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 font-montserrat font-medium text-sm sm:text-base">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries & CTA */}
            <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="max-w-6xl mx-auto text-center text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-sora">
                            {tUI('perfectForYourIndustry')}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 font-montserrat px-4">
                            {tUI('trustedByBusinesses')}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
                            {product.industries.map((industry, index) => (
                                <span key={index} className="bg-white/10 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-montserrat">
                                    {industry}
                                </span>
                            ))}
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 font-sora">
                                {tUI('readyToGetStarted')}
                            </h3>
                            <p className="text-gray-300 font-montserrat text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
                                {tUI('joinThousands')} {product.title}. {tUI('getFreeConsultation')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105" onClick={() => goToContact()}>
                                    <span className="text-sm sm:text-base">{tUI('contactSales')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

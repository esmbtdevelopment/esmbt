"use client";
import React from "react";
import Image from "next/image";
import {
    FaBuilding,
    FaHandshake,
    FaChartLine,
    FaUsers,
    FaAward,
    FaGlobe,
    FaRocket,
    FaShieldAlt,
    FaCogs,
    FaLightbulb,
} from "react-icons/fa";
import {
    RiTeamLine,
    RiLightbulbLine,
    RiRocketLine,
    RiShieldCheckLine,
    RiGlobalLine,
    RiAwardLine,
} from "react-icons/ri";

export default function AboutUsPage() {
    const values = [
        {
            icon: <RiLightbulbLine className="text-2xl" />,
            title: "Innovation",
            description: "We continuously innovate to deliver cutting-edge SAP solutions that drive business transformation and competitive advantage."
        },
        {
            icon: <RiShieldCheckLine className="text-2xl" />,
            title: "Excellence",
            description: "Our commitment to excellence ensures every project meets the highest standards of quality, reliability, and performance."
        },
        {
            icon: <RiTeamLine className="text-2xl" />,
            title: "Partnership",
            description: "We build lasting partnerships with our clients, working collaboratively to achieve their business objectives and long-term success."
        },
        {
            icon: <RiGlobalLine className="text-2xl" />,
            title: "Integrity",
            description: "We operate with complete transparency and integrity, building trust through honest communication and ethical business practices."
        }
    ];

    const achievements = [
        {
            icon: <FaAward className="text-2xl" />,
            title: "SAP Certified Partner",
            description: "Official SAP partner status with certified consultants and proven track record"
        },
        {
            icon: <FaUsers className="text-2xl" />,
            title: "500+ Successful Implementations",
            description: "Over 500 successful SAP implementations across various industries"
        },
        {
            icon: <FaGlobe className="text-2xl" />,
            title: "International Presence",
            description: "Serving clients globally with localized expertise and support"
        },
        {
            icon: <FaChartLine className="text-2xl" />,
            title: "15+ Years Experience",
            description: "Decade and a half of expertise in SAP consulting and digital transformation"
        }
    ];

    const services = [
        {
            icon: <FaCogs className="text-xl" />,
            title: "SAP Consulting & Implementation",
            description: "Comprehensive SAP solutions from planning to deployment and optimization"
        },
        {
            icon: <FaShieldAlt className="text-xl" />,
            title: "Digital Compliance Solutions",
            description: "E-Invoice, E-Archive, E-Ledger, and regulatory compliance automation"
        },
        {
            icon: <FaChartLine className="text-xl" />,
            title: "Financial Management",
            description: "Advanced financial tools including VAT processing and IFRS solutions"
        },
        {
            icon: <FaLightbulb className="text-xl" />,
            title: "Digital Transformation",
            description: "Complete business digitalization and process automation services"
        }
    ];

    const timeline = [
        {
            year: "2008",
            title: "Company Founded",
            description: "ESM Information Technologies established with a vision to transform businesses through technology"
        },
        {
            year: "2012",
            title: "SAP Partnership",
            description: "Became an official SAP partner, expanding our capabilities in enterprise solutions"
        },
        {
            year: "2016",
            title: "Digital Compliance Leader",
            description: "Pioneered e-transformation solutions in Turkey, becoming a market leader"
        },
        {
            year: "2020",
            title: "International Expansion",
            description: "Extended services globally, serving clients across multiple countries"
        },
        {
            year: "2024",
            title: "Innovation Hub",
            description: "Established as a leading innovation hub for SAP-native digital solutions"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 relative py-28 lg:py-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="hidden md:inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 rounded-full px-6 py-2 mb-8">
                                <FaBuilding className="text-sky-600" />
                                <span className="text-sky-700 font-semibold font-montserrat text-sm">About ESM</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-sora leading-tight">
                                Transforming Businesses Through
                                <span className="block text-sky-600">SAP Excellence</span>
                            </h1>

                            <p className="text-lg text-gray-400 mb-8 font-montserrat leading-relaxed">
                                For over 15 years, ESM Information Technologies has been at the forefront of SAP consulting
                                and digital transformation, helping enterprises streamline operations, ensure compliance,
                                and achieve sustainable growth through innovative technology solutions.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                                        <FaAward className="text-sky-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white font-sora">500+</div>
                                        <div className="text-sm text-gray-400 font-montserrat">Projects Delivered</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <FaUsers className="text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white font-sora">200+</div>
                                        <div className="text-sm text-gray-400 font-montserrat">Enterprise Clients</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/teamwork.jpg"
                                    alt="ESM Team"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-3 -left-0 md:-bottom-6 md:-left-6 hover:scale-105 transition-all duration-300">
                                <Image
                                    src="/images/badges/sap-partner.png"
                                    alt="SAP Partner"
                                    className="w-16 md:w-28 h-auto"
                                    width={120}
                                    height={120}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora px-2">
                            Who We Are
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat leading-relaxed px-2">
                            ESM Information Technologies is a specialized SAP consulting and technology firm dedicated to
                            driving financial transformation and digital compliance for enterprises worldwide. We combine
                            deep SAP expertise with innovative thinking to deliver solutions that transform how businesses operate.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                Our Expertise
                            </h3>
                            <div className="space-y-4 sm:space-y-6">
                                {services.map((service, index) => (
                                    <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                            {service.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 font-sora">
                                                {service.title}
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-600 font-montserrat leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                Our Achievements
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                        <div className="text-sky-600 mb-2 sm:mb-3 text-lg sm:text-xl">
                                            {achievement.icon}
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 font-sora text-sm sm:text-base">
                                            {achievement.title}
                                        </h4>
                                        <p className="text-gray-600 text-xs sm:text-sm font-montserrat leading-relaxed">
                                            {achievement.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora px-2">
                            Our Core Values
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat max-w-2xl mx-auto px-4 leading-relaxed">
                            These fundamental principles guide everything we do and shape our commitment to excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-4 sm:mb-6">
                                    <div className="text-lg sm:text-2xl">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 font-sora">
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 font-montserrat leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora px-2">
                            Our Journey
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat max-w-2xl mx-auto px-4 leading-relaxed">
                            From our founding to becoming a leading SAP consulting firm, explore the key milestones that shaped our company
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-3 sm:left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-sky-200"></div>

                            {timeline.map((item, index) => (
                                <div key={index} className={`relative flex items-center mb-8 sm:mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-3 sm:left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-sky-600 rounded-full border-2 sm:border-4 border-white shadow-lg z-10"></div>

                                    {/* Content */}
                                    <div className={`ml-8 sm:ml-12 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 xl:pr-12' : 'lg:pl-8 xl:pl-12'}`}>
                                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                                            <div className="text-sky-600 font-bold text-lg sm:text-xl lg:text-2xl mb-2 font-sora">
                                                {item.year}
                                            </div>
                                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-sora">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 font-montserrat leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-20 bg-gradient-to-br from-sky-600 via-blue-700 to-sky-800">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-sora">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-lg lg:text-xl mb-10 opacity-90 font-montserrat max-w-2xl mx-auto">
                        Join hundreds of enterprises that have chosen ESM Information Technologies for their SAP transformation journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-white text-sky-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 font-montserrat shadow-2xl hover:scale-105">
                            Contact Our Team
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-300 font-montserrat hover:scale-105">
                            View Our Services
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

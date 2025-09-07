"use client";
import React from "react";
import Image from "next/image";
import {
    FaHandshake,
    FaRocket,
    FaEye,
    FaBullseye,
    FaLightbulb,
    FaShieldAlt,
    FaGlobe,
    FaUsers,
    FaChartLine,
    FaCogs,
    FaLeaf,
    FaHeart,
    FaStar,
    FaArrowRight,
} from "react-icons/fa";
import {
    RiLightbulbLine,
    RiShieldCheckLine,
    RiTeamLine,
    RiGlobalLine,
    RiRocketLine,
    RiAwardLine,
} from "react-icons/ri";

export default function VisionMissionPage() {
    const missionPoints = [
        {
            icon: <FaCogs className="text-xl" />,
            title: "SAP Excellence",
            description: "Deliver world-class SAP consulting and implementation services that transform business operations"
        },
        {
            icon: <FaShieldAlt className="text-xl" />,
            title: "Regulatory Compliance",
            description: "Ensure our clients meet all digital compliance requirements through innovative e-transformation solutions"
        },
        {
            icon: <FaUsers className="text-xl" />,
            title: "Client Partnership",
            description: "Build lasting partnerships by understanding unique business needs and delivering tailored solutions"
        },
        {
            icon: <FaChartLine className="text-xl" />,
            title: "Business Growth",
            description: "Enable sustainable business growth through digital transformation and process optimization"
        }
    ];

    const visionElements = [
        {
            icon: <FaGlobe className="text-xl" />,
            title: "Global Leadership",
            description: "To be the leading SAP consulting firm recognized worldwide for innovation and excellence"
        },
        {
            icon: <FaRocket className="text-xl" />,
            title: "Technology Pioneer",
            description: "Pioneer cutting-edge SAP-native solutions that set industry standards"
        },
        {
            icon: <FaLightbulb className="text-xl" />,
            title: "Innovation Hub",
            description: "Create an ecosystem where innovation thrives and transforms business landscapes"
        },
        {
            icon: <FaHeart className="text-xl" />,
            title: "Trusted Partner",
            description: "Be the most trusted partner for enterprises embarking on digital transformation journeys"
        }
    ];

    const coreValues = [
        {
            icon: <RiLightbulbLine className="text-2xl" />,
            title: "Innovation",
            description: "We continuously push boundaries to create innovative solutions that solve complex business challenges",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <RiShieldCheckLine className="text-2xl" />,
            title: "Excellence",
            description: "We maintain the highest standards in everything we do, from code quality to client service",
            color: "from-blue-500 to-sky-500"
        },
        {
            icon: <RiTeamLine className="text-2xl" />,
            title: "Collaboration",
            description: "We believe in the power of teamwork and build strong partnerships with our clients and colleagues",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <RiGlobalLine className="text-2xl" />,
            title: "Integrity",
            description: "We operate with complete transparency and honesty in all our business relationships",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <RiRocketLine className="text-2xl" />,
            title: "Agility",
            description: "We adapt quickly to changing market demands and embrace new technologies and methodologies",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: <RiAwardLine className="text-2xl" />,
            title: "Quality",
            description: "We are committed to delivering superior quality solutions that exceed client expectations",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    const strategicGoals = [
        {
            title: "Market Expansion",
            description: "Expand our global presence and establish ESM as a leading SAP partner in key international markets",
            target: "2025",
            icon: <FaGlobe className="text-xl" />
        },
        {
            title: "Innovation Leadership",
            description: "Lead the industry in developing next-generation SAP-native solutions for digital transformation",
            target: "2024",
            icon: <FaLightbulb className="text-xl" />
        },
        {
            title: "Team Growth",
            description: "Build a world-class team of 100+ certified SAP specialists and technology experts",
            target: "2026",
            icon: <FaUsers className="text-xl" />
        },
        {
            title: "Sustainability Focus",
            description: "Integrate sustainability practices into all our solutions and business operations",
            target: "2024",
            icon: <FaLeaf className="text-xl" />
        }
    ];

    const principles = [
        "Client success is our primary measure of success",
        "Continuous learning and improvement drive our growth",
        "Innovation should solve real business problems",
        "Quality and reliability are non-negotiable",
        "Transparency builds trust and lasting relationships",
        "Sustainable practices benefit everyone"
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-sky-900 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-200/40 to-sky-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="hidden md:inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 rounded-full px-6 py-2 mb-8">
                            <FaHandshake className="text-sky-600" />
                            <span className="text-sky-700 font-semibold font-montserrat text-sm">Vision & Mission</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-sora leading-tight">
                            Our Vision, Mission &
                            <span className="block text-sky-600">Core Values</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-400 mb-12 font-montserrat leading-relaxed">
                            Discover the fundamental principles, ambitious goals, and unwavering values that guide
                            ESM Information Technologies toward excellence and innovation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                                <FaBullseye className="text-sm sm:text-base" />
                                <span className="font-semibold font-montserrat text-xs sm:text-sm">Our Mission</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                Transforming Businesses Through SAP Excellence
                            </h2>

                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 font-montserrat leading-relaxed">
                                Our mission is to empower enterprises with world-class SAP solutions and digital transformation
                                services that drive operational excellence, ensure regulatory compliance, and unlock sustainable growth.
                            </p>

                            <div className="space-y-4 sm:space-y-6">
                                {missionPoints.map((point, index) => (
                                    <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            <div className="text-sm sm:text-xl">
                                                {point.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 font-sora">
                                                {point.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 font-montserrat leading-relaxed">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative order-1 lg:order-2">
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/teamwork.jpg"
                                    alt="ESM Mission"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {/* Floating Elements - hidden on mobile */}
                            <div className="hidden sm:block absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xl animate-bounce">
                                <FaBullseye className="text-lg sm:text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Visual */}
                        <div className="hidden md:relative order-2 lg:order-1">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <div className="h-96 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <FaEye className="text-6xl mb-6 mx-auto opacity-80" />
                                        <h3 className="text-2xl font-bold font-sora">Vision 2030</h3>
                                        <p className="font-montserrat opacity-90">Leading the Future</p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl animate-pulse">
                                <FaRocket className="text-2xl" />
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-700 rounded-full px-4 py-2 mb-6">
                                <FaEye />
                                <span className="font-semibold font-montserrat text-sm">Our Vision</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                Leading the Digital Transformation Era
                            </h2>

                            <p className="text-lg text-gray-600 mb-8 font-montserrat leading-relaxed">
                                We envision a future where ESM Information Technologies is recognized globally as the premier
                                SAP consulting partner, setting industry standards for innovation, quality, and client success.
                            </p>

                            <div className="space-y-6">
                                {visionElements.map((element, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                            {element.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sora">
                                                {element.title}
                                            </h3>
                                            <p className="text-gray-600 font-montserrat">
                                                {element.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
                            These fundamental values shape our culture, guide our decisions, and define who we are as a company
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} text-white rounded-2xl mb-6`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 font-sora">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 font-montserrat leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Goals */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                            Strategic Goals
                        </h2>
                        <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
                            Our ambitious roadmap for growth, innovation, and market leadership in the coming years
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {strategicGoals.map((goal, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    {goal.icon}
                                </div>
                                <div className="text-sky-600 font-bold text-sm mb-2 font-montserrat">
                                    Target: {goal.target}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 font-sora">
                                    {goal.title}
                                </h3>
                                <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                                    {goal.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guiding Principles */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                                Our Guiding Principles
                            </h2>
                            <p className="text-lg text-gray-600 font-montserrat">
                                The fundamental beliefs that guide our everyday actions and long-term strategy
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {principles.map((principle, index) => (
                                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white">
                                        <FaStar className="text-sm" />
                                    </div>
                                    <p className="text-gray-700 font-montserrat leading-relaxed">
                                        {principle}
                                    </p>
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
                        Share Our Vision
                    </h2>
                    <p className="text-lg lg:text-xl mb-10 opacity-90 font-montserrat max-w-2xl mx-auto">
                        Join us on our mission to transform businesses and lead the digital transformation era.
                        Let&apos;s build the future together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="group bg-white text-sky-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 font-montserrat shadow-2xl hover:scale-105">
                            <span className="flex items-center space-x-2">
                                <span>Partner With Us</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-300 font-montserrat hover:scale-105">
                            <span className="flex items-center space-x-2">
                                <span>Join Our Team</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

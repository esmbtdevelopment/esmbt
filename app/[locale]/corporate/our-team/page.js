"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import {
    FaUsers,
    FaLinkedinIn,
    FaEnvelope,
    FaPhone,
    FaAward,
    FaCertificate,
    FaGraduationCap,
    FaCode,
    FaChartLine,
    FaCogs,
    FaShieldAlt,
    FaGlobe,
} from "react-icons/fa";
import { goToContact, goToReferences } from "@/utils/navigation";

export default function OurTeamPage() {
    const t = useTranslations('corporate.team');

    const leadership = [
        {
            name: t('leadership.ceo.name'),
            position: t('leadership.ceo.position'),
            image: "/images/team/ceo.jpg", // Placeholder - you can add actual images
            bio: t('leadership.ceo.bio'),
            expertise: t('leadership.ceo.expertise'),
            education: t('leadership.ceo.education'),
            certifications: t('leadership.ceo.certifications'),
            linkedin: "#",
            email: "mehmet.ozkan@esmbt.com"
        },
        {
            name: t('leadership.cto.name'),
            position: t('leadership.cto.position'),
            image: "/images/team/cto.jpg",
            bio: t('leadership.cto.bio'),
            expertise: t('leadership.cto.expertise'),
            education: t('leadership.cto.education'),
            certifications: t('leadership.cto.certifications'),
            linkedin: "#",
            email: "ayse.demir@esmbt.com"
        },
        {
            name: t('leadership.cfo.name'),
            position: t('leadership.cfo.position'),
            image: "/images/team/cfo.jpg",
            bio: t('leadership.cfo.bio'),
            expertise: t('leadership.cfo.expertise'),
            education: t('leadership.cfo.education'),
            certifications: t('leadership.cfo.certifications'),
            linkedin: "#",
            email: "ahmet.yilmaz@esmbt.com"
        }
    ];

    const departments = [
        {
            name: "SAP Consulting",
            description: "Our SAP experts deliver end-to-end consulting services",
            icon: <FaCogs className="text-2xl" />,
            teamSize: "15+",
            specialties: ["SAP Implementation", "System Optimization", "Process Design"],
            color: "from-blue-500 to-sky-500"
        },
        {
            name: "Development Team",
            description: "Skilled developers creating custom SAP solutions",
            icon: <FaCode className="text-2xl" />,
            teamSize: "12+",
            specialties: ["Custom Development", "Integration", "API Development"],
            color: "from-purple-500 to-indigo-500"
        },
        {
            name: "Financial Solutions",
            description: "Specialists in financial compliance and transformation",
            icon: <FaChartLine className="text-2xl" />,
            teamSize: "10+",
            specialties: ["E-Transformation", "Compliance", "Financial Reporting"],
            color: "from-green-500 to-emerald-500"
        },
        {
            name: "Support & Training",
            description: "Dedicated team for ongoing support and user training",
            icon: <FaGraduationCap className="text-2xl" />,
            teamSize: "8+",
            specialties: ["User Training", "Technical Support", "Documentation"],
            color: "from-orange-500 to-red-500"
        }
    ];

    const stats = [
        {
            number: "50+",
            label: "Team Members",
            icon: <FaUsers className="text-2xl" />
        },
        {
            number: "25+",
            label: "SAP Certified Experts",
            icon: <FaCertificate className="text-2xl" />
        },
        {
            number: "15+",
            label: "Years Average Experience",
            icon: <FaAward className="text-2xl" />
        },
        {
            number: "10+",
            label: "Languages Spoken",
            icon: <FaGlobe className="text-2xl" />
        }
    ];

    const values = [
        {
            title: "Continuous Learning",
            description: "We invest in our team's growth through ongoing training and certification programs",
            icon: <FaGraduationCap className="text-xl" />
        },
        {
            title: "Collaborative Culture",
            description: "We foster an environment where teamwork and knowledge sharing drive innovation",
            icon: <FaUsers className="text-xl" />
        },
        {
            title: "Excellence Focus",
            description: "We maintain the highest standards in everything we do, from code quality to client service",
            icon: <FaAward className="text-xl" />
        },
        {
            title: "Innovation Mindset",
            description: "We encourage creative thinking and embrace new technologies to solve complex challenges",
            icon: <FaCode className="text-xl" />
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
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="hidden md:inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 rounded-full px-6 py-2 mb-8">
                            <FaUsers className="text-sky-600" />
                            <span className="text-sky-700 font-semibold font-montserrat text-sm">Our Team</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-sora leading-tight">
                            Meet the Experts Behind
                            <span className="block text-sky-600">Our Success</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-400 mb-12 font-montserrat leading-relaxed">
                            Our diverse team of SAP specialists, developers, and consultants brings together decades
                            of experience to deliver exceptional results for our clients.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
                                >
                                    <div className="text-sky-600 mb-3 flex justify-center">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2 font-sora">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-600 font-montserrat">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora px-2">
                            Leadership Team
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat max-w-2xl mx-auto px-4 leading-relaxed">
                            Meet the visionary leaders who guide ESM Information Technologies toward excellence and innovation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                        {leadership.map((leader, index) => (
                            <div key={index} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100">
                                {/* Profile Image */}
                                <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-sky-400 to-blue-500">
                                    {/* Placeholder for actual image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center">
                                            <FaUsers className="text-white text-2xl sm:text-3xl lg:text-4xl" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 font-sora">
                                        {leader.name}
                                    </h3>
                                    <p className="text-sky-600 font-semibold mb-3 sm:mb-4 font-montserrat text-sm sm:text-base">
                                        {leader.position}
                                    </p>
                                    <p className="text-gray-600 mb-4 sm:mb-6 font-montserrat leading-relaxed text-sm sm:text-base">
                                        {leader.bio}
                                    </p>

                                    {/* Expertise */}
                                    <div className="mb-4 sm:mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 font-sora text-sm">Expertise</h4>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {leader.expertise.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="px-2 sm:px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs sm:text-sm font-montserrat"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education & Certifications */}
                                    <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1 font-sora text-xs sm:text-sm">Education</h4>
                                            <p className="text-gray-600 text-xs sm:text-sm font-montserrat leading-relaxed">{leader.education}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1 font-sora text-xs sm:text-sm">Certifications</h4>
                                            <p className="text-gray-600 text-xs sm:text-sm font-montserrat leading-relaxed">{leader.certifications.join(", ")}</p>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4 border-t border-gray-100">
                                        <a
                                            href={`mailto:${leader.email}`}
                                            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-sky-100 text-gray-600 hover:text-sky-600 rounded-full transition-colors"
                                        >
                                            <FaEnvelope className="text-xs sm:text-sm" />
                                        </a>
                                        <a
                                            href={leader.linkedin}
                                            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition-colors"
                                        >
                                            <FaLinkedinIn className="text-xs sm:text-sm" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Departments */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora px-2">
                            Our Departments
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-montserrat max-w-2xl mx-auto px-4 leading-relaxed">
                            Specialized teams working together to deliver comprehensive SAP solutions and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {departments.map((dept, index) => (
                            <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${dept.color} text-white rounded-xl sm:rounded-2xl mb-4 sm:mb-6`}>
                                    <div className="text-lg sm:text-2xl">
                                        {dept.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-sora">
                                    {dept.name}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-montserrat leading-relaxed">
                                    {dept.description}
                                </p>

                                {/* Team Size */}
                                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                                    <FaUsers className="text-sky-600 text-sm sm:text-base" />
                                    <span className="font-semibold text-gray-900 font-sora text-sm sm:text-base">{dept.teamSize}</span>
                                    <span className="text-gray-600 font-montserrat text-sm sm:text-base">specialists</span>
                                </div>

                                {/* Specialties */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2 font-sora text-xs sm:text-sm">Specialties</h4>
                                    <div className="space-y-1">
                                        {dept.specialties.map((specialty, specialtyIndex) => (
                                            <div key={specialtyIndex} className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-600 text-xs sm:text-sm font-montserrat leading-relaxed">{specialty}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Values */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sora">
                            Our Team Values
                        </h2>
                        <p className="text-lg text-gray-600 font-montserrat max-w-2xl mx-auto">
                            The principles that guide our team culture and drive our commitment to excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-6">
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

            {/* Join Our Team CTA */}
            <section className="py-16 lg:py-20 bg-gradient-to-br from-sky-600 via-blue-700 to-sky-800">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-sora">
                        Join Our Growing Team
                    </h2>
                    <p className="text-lg lg:text-xl mb-10 opacity-90 font-montserrat max-w-2xl mx-auto">
                        Are you passionate about SAP and digital transformation? We&apos;re always looking for talented
                        individuals to join our team of experts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={goToContact}
                            className="bg-white text-sky-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 font-montserrat shadow-2xl hover:scale-105"
                        >
                            Contact Us
                        </button>
                        <button
                            onClick={goToReferences}
                            className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-sky-600 transition-all duration-300 font-montserrat hover:scale-105"
                        >
                            View Our References
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

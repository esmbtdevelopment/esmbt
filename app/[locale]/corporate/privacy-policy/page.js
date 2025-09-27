"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import {
    FaShieldAlt,
    FaUserShield,
    FaLock,
    FaEye,
} from "react-icons/fa";

export default function PrivacyPolicy() {
    const t = useTranslations('corporate.privacyPolicy');

    const privacyContent = [
        {
            id: 1,
            title: "Who we are & scope",
            content: (
                <div className="space-y-4">
                    <div className="text-gray-700 font-montserrat space-y-2">
                        <p className="font-semibold text-lg">Controller: ESM Information Technologies</p>
                        <p>Address: 300 Spectrum Center Drive, Suite 400, Irvine, CA 92618, USA</p>
                        <p>Website: www.esmbt.com</p>
                        <p>Contact: info@esmbt.com | +1 949 740 79 79</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        This Policy covers personal information we process about visitors, customers, and prospective customers who interact with our Website and Services.
                    </p>
                </div>
            )
        },
        {
            id: 2,
            title: "Information we collect",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We collect information in three main ways: (A) directly from you, (B) automatically, and (C) from third parties.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 font-sora">A. Information you provide</h4>
                            <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-1">
                                <li>Contact details (e.g., name, email, phone, company, job title, address)</li>
                                <li>Account credentials (if we offer account creation or portal access)</li>
                                <li>Communications (messages, support requests, survey responses)</li>
                                <li>Order/transaction details (if applicable to your use of the Services)</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 font-sora">B. Information collected automatically</h4>
                            <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-1">
                                <li>Usage data (pages viewed, referring pages/links, time and date of visits, session logs)</li>
                                <li>Device and technical data (IP address, browser type/version, operating system, device identifiers)</li>
                                <li>Mobile data (device model, OS, app/browser type) when accessing via mobile</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed font-montserrat mt-2">
                                We use cookies, pixels, tags, and similar technologies to collect some of this information. See Cookies & Tracking below.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 font-sora">C. Information from third parties</h4>
                            <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-1">
                                <li>Social logins (if enabled): Google, Facebook, Instagram, X (Twitter), LinkedIn. If you sign in or link an account, we may receive your name, email, profile information, and contact list per that service's settings.</li>
                                <li>Service providers/partners (e.g., analytics, hosting, CRM) who help us operate and improve the Services.</li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We do not knowingly collect sensitive personal information (e.g., precise geolocation, government IDs, health data) via the Website.
                    </p>
                </div>
            )
        },
        {
            id: 3,
            title: "How we use personal information",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We use personal information to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-2">
                        <li>Provide and operate the Services, including account administration and customer support</li>
                        <li>Communicate with you about features, updates, security alerts, and administrative messages</li>
                        <li>Fulfill contracts and transactions</li>
                        <li>Personalize and improve the Services (including troubleshooting, analytics, testing, and research)</li>
                        <li>Send marketing communications about our offerings (you may opt out at any time)</li>
                        <li>Protect, investigate, and deter against fraudulent, unauthorized, or illegal activity</li>
                        <li>Comply with legal obligations and enforce our terms</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>Legal bases (EEA/UK/Switzerland visitors):</strong> consent, contract performance, legitimate interests (e.g., product improvement, security), legal obligations, or vital/public interests where applicable.
                    </p>
                </div>
            )
        },
        {
            id: 4,
            title: "When we disclose information",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We disclose personal information to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-2">
                        <li>Service providers (hosting, analytics, email, CRM, security, payment, customer support) under contracts requiring appropriate safeguards</li>
                        <li>Affiliates (entities under common ownership/control) for purposes consistent with this Policy</li>
                        <li>Business transfers (merger, acquisition, financing, or sale of assets)</li>
                        <li>Legal/Compliance (to comply with law, lawful requests, protect rights, safety, or prevent fraud)</li>
                        <li>With your direction or consent (e.g., social login linking, testimonials)</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We do not sell personal information and do not "share" it for cross-context behavioral advertising as defined by the California Consumer Privacy Act (as amended by CPRA). If this changes, we will update this Policy and provide a "Do Not Sell or Share My Personal Information" link.
                    </p>
                </div>
            )
        },
        {
            id: 5,
            title: "Cookies & tracking",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We use first-party and third-party cookies and similar technologies to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-2">
                        <li>Enable core site functionality (authentication, security)</li>
                        <li>Remember preferences (e.g., language)</li>
                        <li>Measure and improve performance and usage</li>
                        <li>Support limited, non-profiling analytics</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        You can control cookies via your browser settings. If you disable cookies, some features may not function. For email, we may use pixels to understand open rates and improve content.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>Do Not Track:</strong> Your browser may send "DNT" signals. Because there is no industry standard, we currently do not respond to DNT.
                    </p>
                </div>
            )
        },
        {
            id: 6,
            title: "Your choices & rights",
            content: (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 font-sora">Marketing preferences</h4>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            You can opt out of marketing emails at any time by using the unsubscribe link in the email or contacting us. We may still send non-marketing messages (e.g., transactional or service notices).
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2 font-sora">Access, correction, deletion, and other rights</h4>
                        <p className="text-gray-700 leading-relaxed font-montserrat mb-2">
                            Depending on your location, you may have rights to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-1">
                            <li>Access and obtain a copy of your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your information</li>
                            <li>Port information to another service</li>
                            <li>Object to or restrict certain processing</li>
                            <li>Withdraw consent where processing is based on consent</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed font-montserrat mt-2">
                            To exercise rights, contact info@esmbt.com or use our Contact page. We may need to verify your identity to process requests. Authorized agents may submit requests as permitted by law (we may require proof of authorization and identity verification).
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            We will not discriminate against you for exercising your rights.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 7,
            title: "California Privacy Notice (CPRA)",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        This section applies to California residents.
                    </p>
                    <div className="space-y-3">
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Categories collected (past 12 months):</strong> identifiers (e.g., name, email, IP), commercial info (if you transact with us), internet/activity data (usage, device, logs), and inferences limited to improving the Services.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Sources:</strong> you, your devices, service providers/partners, and (if used) social login providers.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Business/commercial purposes:</strong> as listed in How we use personal information.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Disclosures:</strong> to service providers, affiliates, professional advisors, and as legally required (see When we disclose information).
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Sale/Share:</strong> We do not sell and do not share personal information for cross-context behavioral advertising.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Sensitive personal information:</strong> We do not use or disclose SPI for purposes requiring a "limit use" link.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Retention:</strong> See Data retention below.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            <strong>Rights:</strong> know/access, correct, delete, portability, and to appeal denied requests. Submit requests via info@esmbt.com or our Contact page. We will verify and respond per CPRA timelines.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-montserrat">
                            We do not knowingly sell or share personal information of consumers under 16.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 8,
            title: "Data retention",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We retain personal information only as long as necessary for the purposes described in this Policy, including:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-2">
                        <li>The time needed to provide the Services and maintain business records</li>
                        <li>The period required by law, regulation, litigation holds, audits, or law enforcement requests</li>
                        <li>The duration necessary to resolve disputes and enforce agreements</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        When retention is no longer required, we delete or de-identify information in accordance with our policies.
                    </p>
                </div>
            )
        },
        {
            id: 9,
            title: "Security",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    We implement administrative, technical, and physical safeguards designed to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                </p>
            )
        },
        {
            id: 10,
            title: "Children's privacy",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    The Services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, contact us and we will delete it.
                </p>
            )
        },
        {
            id: 11,
            title: "International users & data transfers",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    If you access the Services from outside the United States, your information may be processed in the U.S. and other jurisdictions with different data-protection laws. We implement appropriate safeguards (e.g., contractual clauses) where required by law.
                </p>
            )
        },
        {
            id: 12,
            title: "Third-party sites and services",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    Our Services may link to third-party websites or services. We are not responsible for their content or privacy practices. Review their privacy policies before providing information.
                </p>
            )
        },
        {
            id: 13,
            title: "Changes to this Policy",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    We may update this Policy from time to time. We will post the updated version with a new "Last updated" date and, where required, notify you by email or prominent notice before changes take effect. Please review this Policy periodically.
                </p>
            )
        },
        {
            id: 14,
            title: "Contact us",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        If you have questions or requests regarding this Privacy Policy or our privacy practices, contact us at:
                    </p>
                    <div className="text-gray-700 font-montserrat space-y-2">
                        <p>Email: info@esmbt.com</p>
                        <p>Web: https://www.esmbt.com/en#contact</p>
                        <p>Phone: +1 949 740 79 79</p>
                        <p>Mail: ESM Information Technologies, 300 Spectrum Center Drive, Suite 400, Irvine, CA 92618, USA</p>
                    </div>
                </div>
            )
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
                    <div className="flex text-center justify-center items-center" >
                        {/* Left Content */}
                        <div>
                            <div className="hidden md:inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 rounded-full px-6 py-2 mb-8">
                                <FaUserShield className="text-sky-600" />
                                <span className="text-sky-700 font-semibold font-montserrat text-sm">{t('hero.badge')}</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-sora leading-tight">
                                {t('hero.title')}
                                <span className="block text-sky-600">{t('hero.titleHighlight')}</span>
                            </h1>

                            <p className="text-lg text-gray-400 mb-8 font-montserrat leading-relaxed">
                                {t('hero.description')}
                            </p>

                            <div className="bg-sky-100/10 border border-sky-200/20 rounded-xl p-4 mb-8">
                                <p className="text-sky-200 font-montserrat text-sm">
                                    {t('hero.effectiveDate')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Introduction */}
                        <div className="mb-12">
                            <p className="text-gray-700 leading-relaxed font-montserrat text-lg mb-6">
                                This Privacy Policy explains how ESM Information Technologies ("ESM," "we," "us," or "our") collects, uses, discloses, and safeguards personal information when you use our website at www.esmbt.com (the "Website") and any related content, features, or services we provide (collectively, the "Services"). It also describes your privacy rights and choices.
                            </p>
                            <p className="text-gray-700 leading-relaxed font-montserrat text-lg">
                                By using the Services, you acknowledge this Privacy Policy. If you do not agree, please discontinue use.
                            </p>
                        </div>

                        {/* Privacy Sections */}
                        <div className="space-y-8">
                            {privacyContent.map((section, index) => (
                                <div key={section.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow`}>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                        {section.id}) {section.title}
                                    </h2>
                                    {section.content}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

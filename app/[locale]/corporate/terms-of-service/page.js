"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import {
    FaShieldAlt,
    FaGavel,
    FaFileContract,
    FaUserShield,
} from "react-icons/fa";

export default function TermsOfService() {
    const t = useTranslations('corporate.termsOfService');

    const termsContent = [
        {
            id: 1,
            title: "Who We Are & How to Contact Us",
            content: (
                <div className="text-gray-700 font-montserrat space-y-2">
                    <p className="font-semibold text-lg">ESM Information Technologies</p>
                    <p>300 Spectrum Center Drive, Suite 400, Irvine, CA 92618, USA</p>
                    <p>Email: info@esmbt.com • Phone: +1 949 740 79 79</p>
                </div>
            )
        },
        {
            id: 2,
            title: "Scope; Other Agreements",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    These Terms apply to your use of the Site and any customer or partner portals we link to or provide access to through the Site (each, a &quot;Portal&quot;). If you purchase professional services, software, subscriptions, or support from us, those engagements may be governed by a separate Master Services Agreement (MSA), Statement of Work (SOW), order form, or license terms. If there is a conflict between these Terms and a signed MSA/SOW or specific license terms, the signed document controls.
                </p>
            )
        },
        {
            id: 3,
            title: "Eligibility",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Site. If you use the Site on behalf of a company or other entity, you represent that you are authorized to accept these Terms on its behalf.
                </p>
            )
        },
        {
            id: 4,
            title: "Acceptable Use",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        You agree not to, and not to allow others to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-2">
                        <li>Violate any applicable law, regulation, or third-party right;</li>
                        <li>Upload or transmit malware, malicious code, or spam;</li>
                        <li>Attempt to gain unauthorized access to the Site, a Portal, our systems, or other users&apos; accounts;</li>
                        <li>Copy, modify, reverse engineer, or create derivative works of the Site except as permitted by law;</li>
                        <li>Interfere with or disrupt the Site&apos;s operation or the servers or networks used to make the Site available;</li>
                        <li>Use the Site to collect or process personal data beyond the scope disclosed in our Privacy Policy.</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        We may suspend or terminate access for violations of these Terms or suspected fraud, abuse, or security risk.
                    </p>
                </div>
            )
        },
        {
            id: 5,
            title: "Accounts & Portals",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        Certain features (e.g., a customer Portal) may require an account. You are responsible for:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-2">
                        <li>Providing accurate registration information and keeping it up to date;</li>
                        <li>Maintaining the confidentiality of your credentials;</li>
                        <li>All activities that occur under your account.</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        Notify us promptly of any unauthorized access or security incident.
                    </p>
                </div>
            )
        },
        {
            id: 6,
            title: "Your Content & Feedback",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        If you submit information through forms, uploads, or a Portal (collectively, &quot;Your Content&quot;), you represent and warrant that you have all rights necessary to do so, and that Your Content is accurate and lawful. You grant ESM a non-exclusive, worldwide, royalty-free license to use, reproduce, display, and process Your Content solely to provide and improve the Services, fulfill your requests, and as otherwise permitted by our Privacy Policy.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        If you provide feedback, suggestions, or ideas (&quot;Feedback&quot;), we may use it without restriction or compensation.
                    </p>
                </div>
            )
        },
        {
            id: 7,
            title: "Third-Party Services; reCAPTCHA",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        The Site may reference or link to third-party websites, tools, or services (including Google reCAPTCHA used to protect forms from abuse). Your use of those services is governed by their own terms and privacy policies. We are not responsible for third-party services and provide them &quot;as is.&quot;
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>reCAPTCHA.</strong> Use of reCAPTCHA is subject to Google&apos;s Terms of Service and Privacy Policy; it evaluates certain device and usage data solely for security and fraud-prevention.
                    </p>
                </div>
            )
        },
        {
            id: 8,
            title: "Privacy",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    Your use of the Site is subject to our Privacy Policy, which describes how we collect, use, and share information. By using the Site, you consent to our data practices as described there.
                </p>
            )
        },
        {
            id: 9,
            title: "Intellectual Property",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        The Site, including its design, text, graphics, logos, and other content, is owned by ESM or its licensors and is protected by intellectual-property laws. Except for rights expressly granted to you in these Terms, we reserve all rights, title, and interest in and to the Site and Services.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        You may not use our trademarks, trade dress, or logos without our prior written permission.
                    </p>
                </div>
            )
        },
        {
            id: 10,
            title: "Disclaimers",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>Informational Content.</strong> Content on the Site (including blog posts, whitepapers, brochures, and case studies) is for general informational purposes only and does not constitute professional advice or a binding offer. You should not rely on such content without obtaining appropriate professional guidance and entering into a formal agreement where applicable.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>&quot;AS IS.&quot;</strong> THE SITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE FULLEST EXTENT PERMITTED BY LAW, ESM AND ITS SUPPLIERS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
                    </p>
                </div>
            )
        },
        {
            id: 11,
            title: "Limitation of Liability",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        TO THE FULLEST EXTENT PERMITTED BY LAW, ESM AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR USE OF (OR INABILITY TO USE) THE SITE OR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        IN NO EVENT WILL ESM&apos;S TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE SITE OR THESE TERMS EXCEED THE GREATER OF (A) AMOUNTS YOU PAID US (IF ANY) FOR ACCESSING THE SPECIFIC FEATURE GIVING RISE TO THE CLAIM DURING THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY; OR (B) USD $100.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        Some jurisdictions do not allow certain limitations; in such cases, the above limits apply to the maximum extent permitted by law.
                    </p>
                </div>
            )
        },
        {
            id: 12,
            title: "Indemnification",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    You agree to defend, indemnify, and hold harmless ESM and its affiliates, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) Your Content; (b) your use of the Site or Services; (c) your violation of these Terms; or (d) your violation of any law or third-party right.
                </p>
            )
        },
        {
            id: 13,
            title: "Changes to the Site or Terms",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    We may modify or discontinue any part of the Site or Services at any time. We may update these Terms from time to time. The Effective Date above indicates when they were last revised. Material changes will be posted on the Site or communicated by other reasonable means. Your continued use after changes become effective constitutes acceptance of the revised Terms.
                </p>
            )
        },
        {
            id: 14,
            title: "Suspension & Termination",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    We may suspend or terminate your access to the Site or any Portal at any time, with or without notice, if we believe you have violated these Terms or pose a risk to the Site, us, or other users. Upon termination, Sections intended to survive (including 6–12, 15–18) will continue in effect.
                </p>
            )
        },
        {
            id: 15,
            title: "Export Controls & Sanctions",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    You must comply with all applicable export control and economic sanctions laws and may not use the Site in or for the benefit of any country or person embargoed or restricted under U.S. law.
                </p>
            )
        },
        {
            id: 16,
            title: "Government Users",
            content: (
                <p className="text-gray-700 leading-relaxed font-montserrat">
                    If accessed by or on behalf of the U.S. Government, the Site is provided as &quot;Commercial Computer Software&quot; and &quot;Commercial Computer Software Documentation,&quot; with only those rights as set forth in these Terms. Use, duplication, or disclosure by the Government is subject to restrictions set forth in FAR 12.212 and DFARS 227.7202.
                </p>
            )
        },
        {
            id: 17,
            title: "Governing Law; Dispute Resolution",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        These Terms are governed by the laws of the State of California, without regard to its conflicts-of-laws principles, and the federal laws of the United States.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>Informal Resolution.</strong> Before filing a claim, you agree to try to resolve the dispute informally by contacting us at info@esmbt.com. We&apos;ll try to resolve the dispute within 30 days.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        <strong>Arbitration & Class-Action Waiver (Business Users).</strong> Except for claims seeking injunctive relief or relating to intellectual property, any dispute between you (acting in a business capacity) and ESM arising from or relating to these Terms or the Site will be resolved by binding arbitration administered by JAMS under its Streamlined Arbitration Rules in Orange County, California, in English, before a single arbitrator. You waive any right to participate in a class action or class-wide arbitration. If you are a consumer with non-business use and mandatory local law prohibits arbitration/class-action waiver, this paragraph does not apply to you, and disputes will be resolved in the state and federal courts located in Orange County, California, and you consent to their jurisdiction.
                    </p>
                </div>
            )
        },
        {
            id: 18,
            title: "Miscellaneous",
            content: (
                <ul className="list-disc pl-6 text-gray-700 font-montserrat space-y-3">
                    <li><strong>Entire Agreement.</strong> These Terms and any referenced policies (e.g., Privacy Policy) constitute the entire agreement between you and ESM regarding the Site.</li>
                    <li><strong>Severability.</strong> If any provision is found unenforceable, the remaining provisions will remain in full force.</li>
                    <li><strong>No Waiver.</strong> Our failure to enforce a provision is not a waiver of our right to do so later.</li>
                    <li><strong>Assignment.</strong> You may not assign these Terms without our prior written consent. We may assign them in connection with a merger, acquisition, or sale of assets.</li>
                    <li><strong>Force Majeure.</strong> We are not liable for delays or failures due to events beyond our reasonable control (e.g., acts of God, labor disputes, internet failures, governmental actions).</li>
                </ul>
            )
        },
        {
            id: 19,
            title: "Contact",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed font-montserrat">
                        Questions about these Terms?
                    </p>
                    <div className="text-gray-700 font-montserrat space-y-2">
                        <p className="font-semibold text-lg">ESM Information Technologies</p>
                        <p>300 Spectrum Center Drive, Suite 400, Irvine, CA 92618, USA</p>
                        <p>info@esmbt.com • +1 949 740 79 79</p>
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
                                <FaShieldAlt className="text-sky-600" />
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
                                These Terms of Service (&quot;Terms&quot;) govern your access to and use of esmbt.com (the &quot;Site&quot;) and any related content, portals, or services we make available through the Site (collectively, the &quot;Services&quot;). The Site is operated by ESM Information Technologies (&quot;ESM,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                            </p>
                            <p className="text-gray-700 leading-relaxed font-montserrat text-lg">
                                By accessing or using the Site or Services, you agree to these Terms and our Privacy Policy. If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms. If you do not agree, do not use the Site or Services.
                            </p>
                        </div>

                        {/* Terms Sections */}
                        <div className="space-y-8">
                            {termsContent.map((section, index) => (
                                <div key={section.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow`}>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-sora">
                                        {section.id}. {section.title}
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
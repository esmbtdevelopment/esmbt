"use client";
import React from "react";
import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMediumM,
  FaArrowRight,
} from "react-icons/fa";
import { RiSpaceShipFill } from "react-icons/ri";
import { scrollToSection, isOnLandingPage } from "@/utils/navigation";
import { useLocale } from 'next-intl';
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';
import Link from 'next/link';

const Footer = () => {
  const t = useDebugTranslations('footer');
  const locale = useLocale();

  const handleSectionNavigation = (sectionId) => {
    const onLandingPage = isOnLandingPage();
    scrollToSection(sectionId, onLandingPage);
  };

  const quickLinks = [
    { name: t('quickLinks.aboutUs'), href: `/${locale}/corporate/about-us` },
    { name: t('quickLinks.services'), href: `/${locale}/services` },
    { name: t('quickLinks.partners'), sectionId: "partners" },
    { name: t('quickLinks.customers'), sectionId: "customers" },
    { name: t('quickLinks.contact'), sectionId: "contact" },
  ];

  const services = [
    { name: t('services.sapConsulting'), href: `/${locale}/services/strategic-sap-consulting` },
    { name: "SAP ERP Implementation", href: `/${locale}/services/sap-erp-implementation` },
    { name: "SAP Technical Services", href: `/${locale}/services/sap-technical-services` },
    { name: "SAP Cloud Solutions", href: `/${locale}/services/sap-cloud-solutions` },
    { name: "SAP Analytics", href: `/${locale}/services/sap-analytics-intelligence` },
  ];

  const solutions = [
    { name: t('solutions.eInvoice'), href: `/${locale}/products/e-invoice` },
    { name: t('solutions.eArchive'), href: `/${locale}/products/e-archive-invoice` },
    { name: t('solutions.eLedger'), href: `/${locale}/products/e-ledger` },
    { name: "E-Export", href: `/${locale}/products/e-export` },
    { name: "E-Commerce", href: `/${locale}/products/e-commerce` },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Section with Logo and Social Media */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center mb-12 lg:mb-16 border-b border-gray-700 pb-8 lg:pb-12">
          {/* Left side - Description */}
          <div className="max-w-md text-center lg:text-left order-2 lg:order-1 space-y-4">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-montserrat">
              {t('companyDescription')}
            </p>
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <Image
              src="/images/outlined-logo.webp"
              alt={t('logoAlt')}
              width={100}
              height={100}
              className="md:w-[125px] md:h-[125px]"
            />
          </div>

          {/* Right side - Contact Info */}
          <div className="flex justify-center lg:justify-end order-3">
            <div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col md:flex-row text-center md:text-left gap-2 md:gap-0 items-center justify-center lg:justify-start space-x-3 text-gray-300">
                  <FaMapMarkerAlt className="text-sky-400 flex-shrink-0" />
                  <span className="font-montserrat text-sm md:text-base">
                    {t('contact.address')}
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                  <FaPhone className="text-sky-400 flex-shrink-0" />
                  <span className="font-montserrat text-sm md:text-base">
                    {t('contact.phone')}
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                  <FaEnvelope className="text-sky-400 flex-shrink-0" />
                  <span className="font-montserrat text-sm md:text-base">
                    {t('contact.email')}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300 mt-4 md:mt-6">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300"
                >
                  <FaTwitter className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300"
                >
                  <FaInstagram className="text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300"
                >
                  <FaMediumM className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          {/* About Us / Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-sora">
              {t('quickLinks.title')}
            </h3>
            <ul className="space-y-2 md:space-y-3 flex flex-col items-center justify-center md:justify-start md:items-start">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.sectionId ? (
                    <button
                      onClick={() => handleSectionNavigation(link.sectionId)}
                      className="text-sm md:text-base text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center justify-center md:justify-start group font-montserrat"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm md:text-base text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center justify-center md:justify-start group font-montserrat"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links / Solutions */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-sora">
              {t('solutions.title')}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {solutions.map((solution, index) => (
                <li key={index}>
                  <Link
                    href={solution.href}
                    className="text-sm md:text-base text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center justify-center md:justify-start group font-montserrat"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-sora">
              {t('services.title')}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm md:text-base text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center justify-center md:justify-start group font-montserrat"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="text-gray-400 text-xs md:text-sm mb-4 md:mb-0 font-montserrat flex items-center gap-2">
              <Image src="/images/badges/sap-partner.png" alt="SAP Partner" width={50} height={50} className="grayscale hover:grayscale-0 transition-all duration-300" />
              {t('copyright')}
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs md:text-sm">
              <a
                href={`/${locale}/corporate/privacy-policy`}
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300 font-montserrat"
              >
                {t('privacyPolicy')}
              </a>
              <Link
                href={`/${locale}/corporate/terms-of-service`}
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300 font-montserrat"
              >
                {t('termsOfService')}
              </Link>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300 font-montserrat"
              >
                {t('cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

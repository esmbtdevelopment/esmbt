"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMediumM,
  FaChevronDown,
  FaTimes,
  FaBuilding,
  FaUsers,
  FaHandshake,
  FaCogs,
  FaCloud,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { goToContact, goToReferences } from "@/utils/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const handleMouseEnter = (dropdown) => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = (dropdownToClose) => {
    // Add a delay before closing to allow users to move to dropdown content
    dropdownTimeoutRef.current = setTimeout(() => {
      // Only close if this specific dropdown is still active
      setActiveDropdown(current => current === dropdownToClose ? null : current);
    }, 150); // 150ms delay gives users time to navigate
  };

  const toggleMobileDropdown = (dropdown) => {
    setMobileActiveDropdown(mobileActiveDropdown === dropdown ? null : dropdown);
  };

  // Handle scroll for sticky navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setMobileActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dropdownContent = {
    corporate: [
      { title: t('about'), description: t('dropdown.corporate.aboutDescription'), icon: FaBuilding, link: `/${locale}/corporate/about-us` },
      { title: t('team'), description: t('dropdown.corporate.teamDescription'), icon: FaUsers, link: `/${locale}/corporate/our-team` },
      { title: t('vision'), description: t('dropdown.corporate.visionDescription'), icon: FaHandshake, link: `/${locale}/corporate/vision-and-mission` },
    ],
    services: [
      { title: t('strategicConsulting'), description: t('dropdown.services.strategicConsultingDescription'), icon: FaChartLine, link: `/${locale}/services/strategic-sap-consulting` },
      { title: t('erpImplementation'), description: t('dropdown.services.erpImplementationDescription'), icon: FaCogs, link: `/${locale}/services/sap-erp-implementation` },
      { title: t('cloudSolutions'), description: t('dropdown.services.cloudSolutionsDescription'), icon: FaCloud, link: `/${locale}/services/sap-cloud-solutions` },
      { title: t('viewAllServices'), description: t('dropdown.services.viewAllDescription'), icon: FaChartLine, link: `/${locale}/services`, highlight: true },
    ],
    products: [
      { title: t('eInvoiceSolutions'), description: t('dropdown.products.eInvoiceDescription'), icon: FaChartLine, link: `/${locale}/products/e-invoice` },
      { title: t('eCommercePlatform'), description: t('dropdown.products.eCommerceDescription'), icon: FaCogs, link: `/${locale}/products/e-commerce` },
      { title: t('digitalTransformation'), description: t('dropdown.products.digitalTransformationDescription'), icon: FaShieldAlt, link: `/${locale}/products` },
      { title: t('viewAllProducts'), description: t('dropdown.products.viewAllDescription'), icon: FaChartLine, link: `/${locale}/products`, highlight: true },
    ],
  };

  return (
    <nav ref={navRef} className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
      {/* Main Navigation */}
      <div className={`transition-all duration-300 py-2.5 ${isScrolled ? 'border-b border-gray-700/50' : 'bg-transparent border-b border-white/10'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 hover:cursor-pointer" onClick={() => router.push(`/${locale}`)}>
              <Image
                src="/images/logo.webp"
                alt="ESMBT"
                width={80}
                height={80}
              />
              <Image
                src="/images/logo-text.webp"
                alt="ESMBT"
                width={80}
                height={80}
              />
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8 relative">
              {/* Corporate Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('corporate')}
                onMouseLeave={() => handleMouseLeave('corporate')}
              >
                <button className="relative flex items-center space-x-1 text-white hover:cursor-pointer transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm">
                  <span className="uppercase tracking-widest text-xs md:text-sm">{t('corporate')}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${activeDropdown === 'corporate' ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>

                {/* Corporate Dropdown Menu */}
                {activeDropdown === 'corporate' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                    onMouseEnter={() => handleMouseEnter('corporate')}
                    onMouseLeave={() => handleMouseLeave('corporate')}
                  >
                    {dropdownContent.corporate.map((item, index) => (
                      <a
                        key={index}
                        href={item.link || "#"}
                        className="flex items-center p-4 hover:bg-sky-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <item.icon className="text-sky-600 text-lg mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={() => handleMouseLeave('products')}
              >
                <button className="relative flex items-center space-x-1 text-white hover:cursor-pointer transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm">
                  <span className="uppercase tracking-widest text-xs md:text-sm">{t('products')}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>

                {/* Products Dropdown Menu */}
                {activeDropdown === 'products' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                    onMouseEnter={() => handleMouseEnter('products')}
                    onMouseLeave={() => handleMouseLeave('products')}
                  >
                    {dropdownContent.products.map((item, index) => (
                      <a
                        key={index}
                        href={item.link || "#"}
                        className="flex items-center p-4 hover:bg-sky-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <item.icon className="text-sky-600 text-lg mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={() => handleMouseLeave('services')}
              >
                <button className="relative flex items-center space-x-1 text-white hover:cursor-pointer transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm">
                  <span className="uppercase tracking-widest text-xs md:text-sm">{t('services')}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>

                {/* Services Dropdown Menu */}
                {activeDropdown === 'services' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={() => handleMouseLeave('services')}
                  >
                    {dropdownContent.services.map((item, index) => (
                      <a
                        key={index}
                        href={item.link || "#"}
                        className={`flex items-center p-4 hover:bg-sky-50 transition-colors border-b border-gray-100 last:border-b-0 ${item.highlight ? 'bg-sky-50 border-sky-200' : ''
                          }`}
                      >
                        <item.icon className={`text-lg mr-3 ${item.highlight ? 'text-sky-700' : 'text-sky-600'}`} />
                        <div>
                          <h3 className={`font-semibold ${item.highlight ? 'text-sky-800' : 'text-gray-800'}`}>{item.title}</h3>
                          <p className={`text-sm ${item.highlight ? 'text-sky-600' : 'text-gray-600'}`}>{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={goToReferences}
                className="text-white hover:cursor-pointer uppercase tracking-widest transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm text-xs md:text-sm"
              >
                {t('references')}
              </button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Modern Contact Button with Darker Gradient */}
              <button
                onClick={goToContact}
                className="relative px-4 py-2 text-xs md:text-sm bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 uppercase tracking-widest font-semibold border border-slate-600"
              >
                <span className="relative z-10 text-xs">{t('contact')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
              </button>

              {/* Cloud Portal Button */}
              <a
                href="https://portal.taxten.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 text-xs md:text-sm bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 uppercase tracking-widest font-semibold border border-slate-600"
              >
                <span className="relative z-10 text-xs">{t('cloudPortal')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {/* Mobile Corporate Dropdown */}
              <div className="border-b border-gray-700 pb-4">
                <button
                  onClick={() => toggleMobileDropdown('corporate')}
                  className="flex items-center justify-between w-full text-white font-semibold py-2"
                >
                  <span>{t('corporate')}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${mobileActiveDropdown === 'corporate' ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>
                {mobileActiveDropdown === 'corporate' && (
                  <div className="mt-3 space-y-2 pl-4">
                    {dropdownContent.corporate.map((item, index) => (
                      <a
                        key={index}
                        href={item.link || "#"}
                        className="flex items-center p-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <item.icon className="text-sky-400 text-sm mr-3" />
                        <div>
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-400">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Products Dropdown */}
              <div className="border-b border-gray-700 pb-4">
                <button
                  onClick={() => toggleMobileDropdown('products')}
                  className="flex items-center justify-between w-full text-white font-semibold py-2"
                >
                  <span>{t('products')}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${mobileActiveDropdown === 'products' ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>
                {mobileActiveDropdown === 'products' && (
                  <div className="mt-3 space-y-2 pl-4">
                    {dropdownContent.products.map((item, index) => (
                      <a
                        key={index}
                        href={item.link || "#"}
                        className="flex items-center p-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <item.icon className="text-sky-400 text-sm mr-3" />
                        <div>
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-400">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services Dropdown */}
              <div className="border-b border-gray-700 pb-4">
                <button
                  onClick={() => toggleMobileDropdown('services')}
                  className="flex items-center justify-between w-full text-white font-semibold py-2"
                >
                  <span>{t('services')}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${mobileActiveDropdown === 'services' ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>
                {mobileActiveDropdown === 'services' && (
                  <div className="mt-3 space-y-2 pl-4">
                    {dropdownContent.services.map((item, index) => (
                      <a
                        key={index}
                        href={item.link || "#"}
                        className={`flex items-center p-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors ${item.highlight ? 'bg-gray-800/30 border border-sky-600/30' : ''
                          }`}
                      >
                        <item.icon className={`text-sm mr-3 ${item.highlight ? 'text-sky-300' : 'text-sky-400'}`} />
                        <div>
                          <h4 className={`font-medium text-sm ${item.highlight ? 'text-white' : ''}`}>{item.title}</h4>
                          <p className={`text-xs ${item.highlight ? 'text-sky-200' : 'text-gray-400'}`}>{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  goToReferences();
                }}
                className="text-white py-3 transition-colors text-left w-full"
              >
                {t('references')}
              </button>

              {/* Mobile Contact Button with Darker Gradient */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  goToContact();
                }}
                className="relative mt-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white rounded-full text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide border border-slate-600"
              >
                <span className="relative z-10">{t('contact')}</span>
              </button>

              {/* Mobile Cloud Portal Button with Same Styling */}
              <a
                href="https://portal.taxten.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white rounded-full text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 uppercase tracking-wide border border-slate-600"
              >
                <span className="relative z-10">{t('cloudPortal')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
              </a>

              {/* Mobile Language Switcher */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                <LanguageSwitcher />
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex flex-col space-y-3 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-xs text-sky-400" />
                    <span>{tCommon('contact.phone')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-xs text-sky-400" />
                    <span>{tCommon('contact.email')}</span>
                  </div>
                </div>

                {/* Mobile Social Media */}
                <div className="flex items-center space-x-3 mt-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                  >
                    <FaTwitter className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                  >
                    <FaInstagram className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                  >
                    <FaLinkedinIn className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                  >
                    <FaMediumM className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

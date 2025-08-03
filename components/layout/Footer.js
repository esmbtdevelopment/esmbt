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

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Partners", href: "#partners" },
    { name: "Customers", href: "#customers" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "SAP Consulting", href: "#sap-consulting" },
    { name: "E-Transformation", href: "#e-transformation" },
    { name: "Financial Management", href: "#financial-management" },
    { name: "Banking Solutions", href: "#banking-solutions" },
    { name: "Digital Compliance", href: "#compliance" },
  ];

  const solutions = [
    { name: "e-Invoice", href: "#e-invoice" },
    { name: "e-Archive", href: "#e-archive" },
    { name: "e-Ledger", href: "#e-ledger" },
    { name: "IFRS 16", href: "#ifrs-16" },
    { name: "VAT Processing", href: "#vat-processing" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Section with Logo and Social Media */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16 border-b border-gray-700 pb-12">
          {/* Left side - Description */}
          <div className="max-w-md text-center lg:text-left">
            <p className="text-gray-300 leading-relaxed font-montserrat">
              Specialized SAP consulting and technology firm focused on driving
              financial transformation and digital compliance for enterprises.
            </p>
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center items-center">
            <Image
              src="/images/outlined-logo.webp"
              alt="ESM Information Technologies"
              width={125}
              height={125}
            />
          </div>

          {/* Right side - Contact Info */}
          <div className="flex justify-center lg:justify-end">
            <div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaMapMarkerAlt className="text-sky-400 flex-shrink-0" />
                  <span className="font-montserrat">United States</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaPhone className="text-sky-400 flex-shrink-0" />
                  <span className="font-montserrat">+1 202 555 0100</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FaEnvelope className="text-sky-400 flex-shrink-0" />
                  <span className="font-montserrat">info@esmbt.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 mt-6">
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
        <div className="flex flex-col items-center justify-between md:flex-row gap-12">
          {/* About Us / Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-sora">About Us</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group font-montserrat"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links / Solutions */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-sora">Links</h3>
            <ul className="space-y-3">
              {solutions.map((solution, index) => (
                <li key={index}>
                  <a
                    href={solution.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group font-montserrat"
                  >
                    {solution.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-sora">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group font-montserrat"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 font-montserrat">
              © 2024 ESM Information Technologies. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300 font-montserrat"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300 font-montserrat"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300 font-montserrat"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

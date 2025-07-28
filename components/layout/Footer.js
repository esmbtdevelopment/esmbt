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
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/images/outlined-logo.webp"
                alt="ESM Information Technologies"
                width={75}
                height={75}
              />
              <span className="text-2xl font-extrabold tracking-widest font-sora">
                ESMBT
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed font-montserrat">
              Specialized SAP consulting and technology firm focused on driving
              financial transformation and digital compliance for enterprises.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-sky-400 flex-shrink-0" />
                <span className="font-montserrat">+1 202 555 0100</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-sky-400 flex-shrink-0" />
                <span className="font-montserrat">info@esmbt.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-sky-400 flex-shrink-0 mt-1" />
                <span className="font-montserrat">United States</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4 mt-6">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-sora">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group font-montserrat"
                  >
                    <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-sora">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group font-montserrat"
                  >
                    <RiSpaceShipFill className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-sora">Solutions</h3>
            <ul className="space-y-3 mb-8">
              {solutions.map((solution, index) => (
                <li key={index}>
                  <a
                    href={solution.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group font-montserrat"
                  >
                    <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {solution.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold mb-3 font-sora">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm mb-4 font-montserrat">
                Get the latest SAP insights and industry updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 font-montserrat"
                />
                <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-r-md transition-colors duration-300">
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Partners Strip */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-8 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 text-gray-300">
                <RiSpaceShipFill className="text-2xl text-sky-400" />
                <span className="font-semibold font-montserrat">
                  SAP Certified Partner
                </span>
              </div>
              <div className="text-gray-400 text-sm font-montserrat">
                ISO 27001 Certified
              </div>
              <div className="text-gray-400 text-sm font-montserrat">
                GDPR Compliant
              </div>
            </div>
            <div className="text-gray-400 text-sm font-montserrat">
              Serving enterprises since 2009
            </div>
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

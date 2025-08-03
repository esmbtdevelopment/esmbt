import Image from "next/image";
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMediumM,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full absolute top-0 left-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-sky-800/30 py-2.5 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Contact Information */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-xs" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-xs" />
              <span>info@esmbt.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xs" />
              <span>United States</span>
            </div>
          </div>

          {/* Social Media & Language */}
          <div className="flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:text-sky-200 transition-colors">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="hover:text-sky-200 transition-colors">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="hover:text-sky-200 transition-colors">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="hover:text-sky-200 transition-colors">
                <FaLinkedinIn className="text-sm" />
              </a>
              <a href="#" className="hover:text-sky-200 transition-colors">
                <FaMediumM className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-transparent border-b border-white/10 py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo.webp"
                alt="ESMBT"
                width={75}
                height={75}
              />
              <span className="text-2xl from-sky-400 to-sky-600 bg-clip-text text-transparent bg-gradient-to-r font-extrabold tracking-widest">
                ESM
              </span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group hover:cursor-pointer">
                <button className="flex items-center space-x-1 text-white">
                  <span>Corporate</span>
                  <FaChevronDown className="text-xs" />
                </button>
              </div>

              <div className="relative group hover:cursor-pointer">
                <button className="flex items-center space-x-1 text-white">
                  <span>Products</span>
                  <FaChevronDown className="text-xs" />
                </button>
              </div>

              <div className="relative group ">
                <button className="hover:cursor-pointer flex items-center space-x-1 text-white">
                  <span>Services</span>
                  <FaChevronDown className="text-xs" />
                </button>
              </div>

              <a href="#" className="text-white hover:cursor-pointer">
                References
              </a>

              <a href="#" className="text-white hover:cursor-pointer">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white focus:outline-none">
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

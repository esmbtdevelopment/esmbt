"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaBuilding,
  FaPaperPlane,
  FaCheckCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import {
  RiCustomerService2Line,
  RiGlobalLine,
  RiSecurePaymentLine,
} from "react-icons/ri";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
      setSelectedFiles([]);
      
      // Reset file input
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: "Our Location",
      value: "United States",
      description: "Nationwide SAP consulting services",
    },
    {
      icon: <FaPhone />,
      label: "Phone Number",
      value: "+1 202 555 0100",
      description: "Available Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <FaEnvelope />,
      label: "Email Address",
      value: "info@esmbt.com",
      description: "We respond within 24 hours",
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Expert will reach out",
      description: "An expert will reach out to you to discuss your specific needs and requirements.",
    },
    {
      number: "2",
      title: "Sign NDA",
      description: "We'll sign an NDA to ensure any sensitive information is kept secure and confidential.",
    },
    {
      number: "3",
      title: "Customized proposal",
      description: "We'll work with you to prepare a customized proposal based on the project's scope, timeline, and budget.",
    },
  ];

  const stats = [
    { number: "20+", label: "years of expertise" },
    { number: "950+", label: "projects" },
    { number: "500+", label: "professionals" },
  ];

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-white via-sky-50/10 to-blue-50/20 overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-sky-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg rotate-45 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border-2 border-blue-200 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-100 to-sky-100 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* SAP-inspired hexagonal pattern */}
        <div className="absolute top-1/4 left-1/4 opacity-20">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#0284c7" strokeWidth="1"/>
            <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke="#0ea5e9" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-20">
          <svg width="80" height="80" viewBox="0 0 100 100" className="animate-spin-reverse">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#0284c7" strokeWidth="1"/>
          </svg>
        </div>
        
        {/* Diagonal stripe pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M-5,5 l10,-10 M0,40 l40,-40 M35,45 l10,-10" stroke="#0284c7" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-sora">
            Let's Transform Your
            <span className="text-sky-600 block">Business Together</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-montserrat px-4">
            Ready to modernize your SAP operations? Our experts are here to guide
            you through every step of your digital transformation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Column - Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              {/* Creative border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 backdrop-blur-sm">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-sky-500 rounded-tl-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-blue-500 rounded-br-3xl opacity-20"></div>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <FaPaperPlane className="text-white text-2xl" />
                    </div>

                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-sora mb-1">
                      Request a
                      <span className="text-slate-700 block">Consultation</span>
                    </h3>
                    <p className="text-gray-600 font-montserrat">
                      Connect with our SAP specialists for enterprise solutions
                    </p>
                  </div>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat">
                      Company
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project requirements, SAP modules involved, timeline, and any specific challenges you're facing..."
                    rows="5"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 resize-none font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* File Upload */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-sky-400 transition-colors">
                    <FaCloudUploadAlt className="text-2xl text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-sky-600 hover:text-sky-700 font-medium font-montserrat"
                    >
                      Click to upload files or drag and drop
                    </label>
                    <p className="text-xs text-gray-500 mt-1 font-montserrat">
                      Up to 5 attachments (JPG, PDF, DOC, DOCX — max size 30 MB)
                    </p>
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 font-montserrat"
                        >
                          📎 {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 font-montserrat">
                  <p>
                    By clicking Confirm, you confirm that you have read and
                    understood the{" "}
                    <a href="#privacy" className="text-sky-600 hover:text-sky-700">
                      Privacy Policy
                    </a>
                    . This site is protected by reCAPTCHA, the{" "}
                    <a href="#privacy" className="text-sky-600 hover:text-sky-700">
                      Google Privacy Policy
                    </a>
                    , and the{" "}
                    <a href="#terms" className="text-sky-600 hover:text-sky-700">
                      Terms of Service
                    </a>{" "}
                    applied.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white font-bold py-5 px-8 rounded-2xl hover:from-sky-700 hover:via-blue-700 hover:to-sky-800 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 font-montserrat transform hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
                >
                  {/* Animated background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                  
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Sending your message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-lg">Send Message</span>
                    </>
                  )}
                </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info & Process */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Contact Information */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-3 h-12 bg-gradient-to-b from-sky-500 to-blue-600 rounded-full"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-sora">
                    Get in Touch
                  </h3>
                </div>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-sky-50/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                          {info.icon}
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 font-montserrat mb-1 text-lg">
                          {info.label}
                        </h4>
                        <p className="text-sky-600 font-bold font-montserrat text-lg mb-1">
                          {info.value}
                        </p>
                        <p className="text-sm text-gray-600 font-montserrat">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-20 h-20 border border-sky-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border border-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="relative p-8 text-white">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl md:text-3xl font-bold font-sora">
                    What Happens Next?
                  </h3>
                </div>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {step.number}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-2 font-montserrat text-lg group-hover:text-sky-300 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-gray-300 font-montserrat group-hover:text-gray-200 transition-colors">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-gray-600">
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className="text-2xl md:text-3xl font-bold text-white font-sora mb-1 group-hover:text-yellow-400 transition-colors">
                          {stat.number}
                        </div>
                        <div className="text-xs text-gray-300 font-montserrat group-hover:text-white transition-colors">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

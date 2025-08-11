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
    { number: "1,800+", label: "professionals" },
  ];

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-sky-50/30 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/30 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/20 rounded-full translate-y-36 -translate-x-36 blur-3xl"></div>

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
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FaPaperPlane className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-sora">
                    Send us a message
                  </h3>
                  <p className="text-gray-600 font-montserrat text-sm">
                    Fill out the form and we'll get back to you shortly
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors font-montserrat"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors font-montserrat"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors font-montserrat"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors font-montserrat"
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
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none font-montserrat"
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
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-montserrat"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Contact Info & Process */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 font-sora">
                Get in Touch
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 font-montserrat">
                        {info.label}
                      </h4>
                      <p className="text-gray-700 font-medium font-montserrat">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-500 font-montserrat">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-6 font-sora">
                What Happens Next?
              </h3>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1 font-montserrat">
                        {step.title}
                      </h4>
                      <p className="text-gray-300 text-sm font-montserrat">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white font-sora">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-300 font-montserrat">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                <RiSecurePaymentLine className="text-2xl text-sky-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700 font-montserrat">
                  Secure & Confidential
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                <RiCustomerService2Line className="text-2xl text-sky-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700 font-montserrat">
                  24h Response
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                <RiGlobalLine className="text-2xl text-sky-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700 font-montserrat">
                  SAP Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
    FaPhone,
    FaEnvelope,
    FaUser,
    FaBuilding,
    FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
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

    return (
        <div className="bg-white rounded-tl-[76px] rounded-box shadow-lg p-10 border border-gray-200">
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 font-sora mb-2">
                    Request a Consultation
                </h3>
                <p className="text-gray-600 font-montserrat text-sm">
                    Connect with our SAP specialists for enterprise solutions
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
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
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 font-montserrat text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
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
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 font-montserrat text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
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
                            className="w-full pl-12 pr-4 py-3 border-2 text-sm border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
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
                            className="w-full pl-12 pr-4 py-4 border-2 text-sm border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                        Project Details
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project requirements, SAP modules involved, timeline, and any specific challenges you're facing..."
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 resize-none font-montserrat text-sm"
                    />
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 font-montserrat">
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
                    className="w-full bg-sky-600 text-white font-medium hover:cursor-pointer py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-montserrat"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <FaPaperPlane className="text-sm" />
                            <span>Send Message</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;

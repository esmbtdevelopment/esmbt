"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";
import {
    FaPhone,
    FaEnvelope,
    FaUser,
    FaBuilding,
    FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
    const t = useTranslations('contact.form');
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
            toast.error(t('errorRequiredFields'));
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error(t('errorInvalidEmail'));
            setIsSubmitting(false);
            return;
        }

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Message sent successfully! We&apos;ll get back to you soon.");

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
        <div className="bg-white/95 backdrop-blur-sm rounded-tl-[76px] rounded-box shadow-lg p-8 lg:p-10 border border-gray-200">
            <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sora mb-2">
                    {t('title')}
                </h3>
                <p className="text-gray-600 font-montserrat text-xs sm:text-sm">
                    {t('description')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                            Full Name *
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={t('fields.name.placeholder')}
                                className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 font-montserrat text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                            Company
                        </label>
                        <div className="relative">
                            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder={t('fields.company.placeholder')}
                                className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 font-montserrat text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                        Email Address *
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@company.com"
                            className="w-full pl-10 sm:pl-12 pr-4 py-3 border-2 text-sm border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                        {t('fields.phone.label')}
                    </label>
                    <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t('fields.phone.placeholder')}
                            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 text-sm border-gray-200 rounded-xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 transition-all duration-300 font-montserrat hover:border-sky-300 bg-white/50 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                        {t('fields.message.label')}
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('fields.message.placeholder')}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 resize-none font-montserrat text-sm"
                    />
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 font-montserrat">
                    <p>
                        {t('privacyNotice')}
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
                            <span>{t('submitting')}</span>
                        </>
                    ) : (
                        <>
                            <FaPaperPlane className="text-sm" />
                            <span>{t('submit')}</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;

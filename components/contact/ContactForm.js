"use client";
import React, { useState } from "react";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";
import emailjs from '@emailjs/browser';
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
    const [errors, setErrors] = useState({});

    // Phone number formatting function
    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters except +
        const phoneNumber = value.replace(/[^\d+]/g, '');

        // If it starts with +, keep it, otherwise format as US number
        if (phoneNumber.startsWith('+')) {
            return phoneNumber;
        }

        // Format US phone number
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = t('errorRequiredFields');
        } else if (formData.name.trim().length < 2) {
            newErrors.name = t('errorNameTooShort');
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = t('errorRequiredFields');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = t('errorInvalidEmail');
            }
        }

        // Phone validation (if provided)
        if (formData.phone.trim()) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(formData.phone.trim())) {
                newErrors.phone = t('errorInvalidPhone');
            }
        }

        // Message validation (optional but if provided should be meaningful)
        if (formData.message.trim() && formData.message.trim().length < 10) {
            newErrors.message = t('errorMessageTooShort');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Phone number validation and formatting
        if (name === 'phone') {
            const phoneRegex = /^[\d\s\-\(\)\+]*$/;
            if (!phoneRegex.test(value)) {
                return; // Don't update state if invalid characters are entered
            }
            // Format the phone number
            processedValue = formatPhoneNumber(value);
        }

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        setFormData((prev) => ({
            ...prev,
            [name]: processedValue,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form
        if (!validateForm()) {
            setIsSubmitting(false);
            toast.error('Please fix the errors in the form');
            return;
        }

        // Send email using EmailJS
        try {
            // EmailJS configuration - you'll need to replace these with your actual values
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

            // Prepare template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                company: formData.company || 'Not specified',
                phone: formData.phone || 'Not provided',
                message: formData.message || 'No message provided',
                to_email: 'info@esmbt.com', // Your company email
            };

            // Send email
            const result = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            if (result.status === 200) {
                toast.success("Message sent successfully! We'll get back to you soon.");
            } else {
                throw new Error('Failed to send email');
            }

            // Reset form
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                message: "",
            });
            setSelectedFiles([]);
            setErrors({});

            // Reset file input
            const fileInput = document.getElementById("file-upload");
            if (fileInput) fileInput.value = "";

        } catch (error) {
            console.error('Email sending failed:', error);

            // Check if EmailJS is properly configured
            if (error.message?.includes('your_service_id') ||
                error.message?.includes('your_template_id') ||
                error.message?.includes('your_public_key')) {
                toast.error("Email service not configured yet. Please contact us directly at info@esmbt.com");
            } else {
                toast.error("Failed to send message. Please try again or contact us directly at info@esmbt.com");
            }
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
                            {t('fields.name.label')}
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={t('fields.name.placeholder')}
                                className={`w-full pl-10 sm:pl-12 pr-4 py-3 border rounded-lg focus:outline-none font-montserrat text-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'}`}
                                required
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.name}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                            {t('fields.company.label')}
                        </label>
                        <div className="relative">
                            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder={t('fields.company.placeholder')}
                                className={`w-full pl-10 sm:pl-12 pr-4 py-3 border rounded-lg focus:outline-none font-montserrat text-sm ${errors.company ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'}`}
                            />
                        </div>
                        {errors.company && (
                            <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.company}</p>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 font-montserrat">
                        {t('fields.email.label')}
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t('fields.email.placeholder')}
                            className={`w-full pl-10 sm:pl-12 pr-4 py-3 border-2 text-sm rounded-xl focus:ring-4 transition-all duration-300 font-montserrat bg-white/50 backdrop-blur-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200 hover:border-red-400' : 'border-gray-200 focus:ring-sky-200 focus:border-sky-500 hover:border-sky-300'}`}
                            required
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.email}</p>
                    )}
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
                            className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 text-sm rounded-xl focus:ring-4 transition-all duration-300 font-montserrat bg-white/50 backdrop-blur-sm ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200 hover:border-red-400' : 'border-gray-200 focus:ring-sky-200 focus:border-sky-500 hover:border-sky-300'}`}
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.phone}</p>
                    )}
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none resize-none font-montserrat text-sm ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'}`}
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.message}</p>
                    )}
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

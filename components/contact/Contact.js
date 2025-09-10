"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from 'next-intl';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ContactForm from "./ContactForm";

const Contact = () => {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: t('info.location.label'),
      value: t('info.location.value'),
      description: t('info.location.description'),
    },
    {
      icon: <FaPhone />,
      label: t('info.phone.label'),
      value: t('info.phone.value'),
      description: t('info.phone.description'),
    },
    {
      icon: <FaEnvelope />,
      label: t('info.email.label'),
      value: t('info.email.value'),
      description: t('info.email.description'),
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: t('process.steps.step1.title'),
      description: t('process.steps.step1.description'),
    },
    {
      number: "2",
      title: t('process.steps.step2.title'),
      description: t('process.steps.step2.description'),
    },
    {
      number: "3",
      title: t('process.steps.step3.title'),
      description: t('process.steps.step3.description'),
    },
  ];

  const stats = [
    { number: "20+", label: tCommon('yearsOfExpertise') },
    { number: "950+", label: tCommon('projects') },
    { number: "500+", label: tCommon('professionals') },
  ];

  return (
    <section id="contact" className="relative pt-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-900/95 via-gray-950 to-gray-900">
      <div className="relative z-10 flex flex-col">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24 lg:mb-36 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-sora leading-tight">
            {t('subtitle')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-montserrat">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center lg:justify-end gap-6 lg:gap-8 pb-6 sm:pb-10 px-4 lg:pr-10 relative">
          {/* Background Image */}
          <div className="w-full absolute bottom-full md:bottom-0 left-0 -z-10 opacity-80 lg:opacity-100">
            <Image
              src="/images/contact.jpg"
              alt="Contact"
              width={1100}
              height={1100}
            />
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-xl lg:max-w-2xl">
            <ContactForm />
          </div>

          {/* Contact Info & Process */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-md backdrop-blur-3xl shadow-lg">
            {/* Contact Information */}
            <div className="bg-gray-50/95 backdrop-blur-sm rounded-tr-none md:rounded-tr-[76px] rounded-br-[76px] md:rounded-br-none p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sora mb-4 sm:mb-6">
                {t('title')}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center text-sky-600 flex-shrink-0 border border-gray-200">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 font-montserrat mb-1 text-xs sm:text-sm">
                        {info.label}
                      </h4>
                      <p className="text-sky-600 font-medium font-montserrat mb-1 text-xs sm:text-sm">
                        {info.value}
                      </p>
                      <p className="text-xs text-gray-600 font-montserrat">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-gray-900/95 backdrop-blur-sm rounded-br-[76px] p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white font-sora mb-4 sm:mb-6">
                {t('process.title')}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-sky-600 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 text-white">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1 font-montserrat text-xs sm:text-sm">
                        {step.title}
                      </h4>
                      <p className="text-gray-300 font-montserrat text-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="hidden mt-6 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-base font-bold text-white font-sora mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-300 font-montserrat font-bold">
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
    </section>
  );
};

export default Contact;

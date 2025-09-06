"use client";
import Image from "next/image";
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ContactForm from "./ContactForm";

const Contact = () => {

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
    <section id="contact" className="relative pt-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-900/95 via-gray-950 to-gray-900">
      <div className="relative z-10 flex flex-col">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24 lg:mb-36 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-sora leading-tight">
            Let&apos;s Transform Your Business Together
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-montserrat">
            Ready to modernize your SAP operations? Our experts are here to guide
            you through every step of your digital transformation journey.
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
            <div className="bg-gray-50/95 backdrop-blur-sm rounded-tr-[76px] p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-sora mb-4 sm:mb-6">
                Get in Touch
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
                What Happens Next?
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

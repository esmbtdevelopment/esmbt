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
    <section id="contact" className="relative pt-20 bg-gradient-to-b from-gray-900/95  via-gray-950 to-gray-900">
      <div className="relative z-10 flex flex-col ">
        {/* Section Header */}
        <div className="text-center mb-36">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sora">
            Let's Transform Your Business Together
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-montserrat">
            Ready to modernize your SAP operations? Our experts are here to guide
            you through every step of your digital transformation journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-end gap-8 pb-10 pr-10">
          {/* Left Column - Contact Form */}
          <div className="w-full absolute bottom-0 -z-10">
            <Image src="/images/contact.jpg" alt="Contact" width={1300} height={1300} className="" />
          </div>
          <div className="max-w-xl">
            <ContactForm />
          </div>
          {/* Right Column - Contact Info & Process */}
          <div className="flex flex-col gap-8 w-full max-w-md backdrop-blur-3xl shadow-lg">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-tr-[76px] p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 font-sora mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sky-600 flex-shrink-0 border border-gray-200">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 font-montserrat mb-1">
                        {info.label}
                      </h4>
                      <p className="text-sky-600 font-medium font-montserrat mb-1">
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

            {/* Process Steps */}
            <div className="bg-gray-900 rounded-br-[76px] p-6">
              <h3 className="text-xl font-bold text-white font-sora mb-6">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 text-white">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1 font-montserrat">
                        {step.title}
                      </h4>
                      <p className="text-gray-300 font-montserrat text-sm">
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
                      <div className="text-lg font-bold text-white font-sora mb-1">
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

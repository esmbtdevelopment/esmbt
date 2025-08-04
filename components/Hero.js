"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { RiTeamLine } from "react-icons/ri";
import { CiMobile2 } from "react-icons/ci";
import { GrUserWorker } from "react-icons/gr";
import { SiThunderbird } from "react-icons/si";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      title: "ESMBT Products",
      tabTitle: "ESMBT Products",
      icon: <SiThunderbird />,
    },
    {
      title: "SAP Solutions",
      tabTitle: "SAP Solutions",
      icon: <RiTeamLine className="text-2xl" />,
    },
    {
      title: "Mobile Solutions",
      tabTitle: "Mobile Solutions",
      icon: <CiMobile2 />,
    },
    {
      title: "Corporate Solutions",
      tabTitle: "Corporate Solutions",
      icon: <GrUserWorker />,
    },
  ];

  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="relative w-full h-screen font-manrope">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        modules={[Autoplay]}
        className="w-full h-screen"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative flex items-center justify-center"
          >
            <div className="bg-black/40 absolute w-full h-full z-10"></div>
            <Image
              src={"/images/teamwork.jpg"}
              width={1920}
              height={1080}
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              alt="teamwork"
            />
            <div className="z-20 relative text-white flex flex-col items-center justify-center h-full gap-4 md:gap-6 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center">
                {slide.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md">
                <button className="bg-transparent border border-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-white hover:text-black transition-colors text-base sm:text-lg w-full sm:w-auto">
                  Content
                </button>
                <button className="bg-transparent border border-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-white hover:text-black transition-colors text-base sm:text-lg w-full sm:w-auto">
                  Contact
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Tabs */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 bg-transparent border border-white/10 rounded-lg z-30 w-full max-w-xs sm:max-w-2xl md:max-w-4xl mx-4 font-montserrat">
        <div className="grid grid-cols-2 md:flex">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 py-3 md:py-6 px-2 md:px-4 text-white transition-colors bg-gradient-to-tr from-gray-100/30 ${
                activeIndex === index
                  ? "from-sky-100/30 to-sky-300/70"
                  : "to-transparent"
              } ${
                index === 0 &&
                "rounded-tl-lg md:rounded-l-lg md:rounded-tr-none"
              } ${index === 1 && "rounded-tr-lg md:rounded-tr-none"} ${
                index === 2 && "rounded-bl-lg md:rounded-bl-none"
              } ${
                index === slides.length - 1 && "rounded-br-lg md:rounded-r-lg"
              }`}
            >
              <span className="text-lg md:text-2xl">{slide.icon}</span>
              <span className="font-medium text-xs md:text-base text-center">
                {slide.tabTitle}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

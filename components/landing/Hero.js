"use client";
import React, { useRef, useState } from "react";
import { useDebugTranslations } from '@/lib/contexts/TranslationDebugContext';
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
import { PiChatTeardropTextThin } from "react-icons/pi";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const t = useDebugTranslations('hero');
  const tCommon = useDebugTranslations('common');

  const slides = [
    {
      title: t('slides.products.title'),
      tabTitle: t('slides.products.tabTitle'),
      description: t('slides.products.description'),
      icon: <SiThunderbird />,
      image: "/images/hero-sap.webp",
    },
    {
      title: t('slides.sap.title'),
      tabTitle: t('slides.sap.tabTitle'),
      description: t('slides.sap.description'),
      icon: <RiTeamLine className="text-2xl" />,
      image: "/images/hero-esm.webp",
    },
    {
      title: t('slides.mobile.title'),
      tabTitle: t('slides.mobile.tabTitle'),
      description: t('slides.mobile.description'),
      icon: <CiMobile2 />,
      image: "/images/hero-mobile.webp",
    },
    {
      title: t('slides.corporate.title'),
      tabTitle: t('slides.corporate.tabTitle'),
      description: t('slides.corporate.description'),
      icon: <GrUserWorker />,
      image: "/images/hero-financial.webp",
    },
  ];

  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 1200, true); // 1200ms smooth transition
    }
  };

  return (
    <div className="relative w-full min-h-screen font-manrope">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        speed={1200}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={false}
        navigation={false}
        modules={[Autoplay]}
        className="w-full min-h-screen"
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
            <div className="bg-black/20 absolute w-full h-full z-10"></div>
            <Image
              src={slide.image}
              width={1920}
              height={1080}
              className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-transform duration-[8000ms] ease-out ${activeIndex === index
                ? 'scale-110'
                : 'scale-100'
                }`}
              alt="teamwork"
            />
            <div
              className={`z-20 relative text-white flex flex-col items-start ml-0 md:ml-52 justify-center min-h-screen gap-4 md:gap-6 px-4 md:px-8 transition-all duration-1000 ${activeIndex === index
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
                }`}
              style={{
                transitionDelay: activeIndex === index ? '300ms' : '0ms',
              }}
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-1000 font-bold font-sora tracking-wide leading-tight ${activeIndex === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                  }`}
                style={{
                  transitionDelay: activeIndex === index ? '500ms' : '0ms',
                }}
              >
                {slide.title}
              </h1>
              <p className="max-w-2xl font-manrope font-light text-gray-100/90 text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-relaxed">
                {slide.description}
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md transition-all duration-1000 ${activeIndex === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: activeIndex === index ? '700ms' : '0ms',
                }}
              >
                <button className="btn btn-ghost btn-outline hover:bg-white btn-md rounded-lg font-light text-base sm:text-lg tracking-wider transition-all duration-300 hover:text-black w-full sm:w-auto flex items-center justify-center gap-2">
                  {tCommon('hearFromUs')}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Tabs */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl z-30 w-[95%] max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto font-montserrat shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:flex relative">
          {/* Active tab indicator */}
          <div
            className={`absolute bg-gradient-to-r from-sky-400/40 to-blue-600/40 backdrop-blur-sm rounded-lg transition-all duration-700 ease-out ${
              // Responsive positioning
              activeIndex === 0 ? 'top-0 left-0 w-1/2 h-1/2 sm:w-1/4 sm:h-full md:inset-y-0 md:left-0 md:w-1/4 md:h-full' :
                activeIndex === 1 ? 'top-0 left-1/2 w-1/2 h-1/2 sm:left-1/4 sm:w-1/4 sm:h-full md:inset-y-0 md:left-1/4 md:w-1/4 md:h-full' :
                  activeIndex === 2 ? 'bottom-0 left-0 w-1/2 h-1/2 sm:top-0 sm:left-2/4 sm:w-1/4 sm:h-full md:inset-y-0 md:left-2/4 md:w-1/4 md:h-full' :
                    'bottom-0 left-1/2 w-1/2 h-1/2 sm:top-0 sm:left-3/4 sm:w-1/4 sm:h-full md:inset-y-0 md:left-3/4 md:w-1/4 md:h-full'
              }`}
          />

          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`relative flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4 text-white transition-all duration-500 hover:scale-105 hover:brightness-110 ${
                // Responsive rounded corners
                index === 0 && "rounded-tl-xl sm:rounded-tl-xl md:rounded-l-xl md:rounded-tr-none md:rounded-bl-none"
                } ${index === 1 && "rounded-tr-xl sm:rounded-tr-none md:rounded-tr-none md:rounded-tl-none"} ${index === 2 && "rounded-bl-xl sm:rounded-bl-none md:rounded-bl-none md:rounded-tl-none"
                } ${index === slides.length - 1 && "rounded-br-xl sm:rounded-tr-xl md:rounded-r-xl md:rounded-bl-none md:rounded-tr-none"
                }`}
            >
              <span
                className={`text-base sm:text-lg md:text-2xl transition-all duration-500 ${activeIndex === index
                  ? 'scale-110 text-white drop-shadow-lg'
                  : 'scale-100 text-white/70'
                  }`}
              >
                {slide.icon}
              </span>
              <span
                className={`font-medium text-xs sm:text-sm md:text-base text-center transition-all duration-500 leading-tight ${activeIndex === index
                  ? 'text-white font-semibold drop-shadow-md'
                  : 'text-white/70'
                  }`}
              >
                {slide.tabTitle}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

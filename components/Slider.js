"use client";
import React, { useState, useEffect } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

const Slider = ({
  items = [],
  renderItem,
  itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4
  },
  autoSlideInterval = 4000,
  showNavigation = true,
  showIndicators = true,
  className = "",
  containerClassName = "",
  navigationClassName = "",
  indicatorClassName = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(itemsPerSlide.large);

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setCurrentItemsPerSlide(itemsPerSlide.large);
      } else if (window.innerWidth >= 768) {
        setCurrentItemsPerSlide(itemsPerSlide.desktop);
      } else if (window.innerWidth >= 640) {
        setCurrentItemsPerSlide(itemsPerSlide.tablet);
      } else {
        setCurrentItemsPerSlide(itemsPerSlide.mobile);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, [itemsPerSlide]);

  const totalSlides = Math.ceil(items.length / currentItemsPerSlide);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlideInterval <= 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [totalSlides, autoSlideInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  if (!items.length) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Buttons */}
      {showNavigation && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 ${navigationClassName}`}
          >
            <RiArrowLeftLine className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 ${navigationClassName}`}
          >
            <RiArrowRightLine className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slider Container */}
      <div className={`overflow-hidden ${showNavigation ? 'mx-8' : ''} ${containerClassName}`}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
            width: `${totalSlides * 100}%`
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex">
              {items
                .slice(slideIndex * currentItemsPerSlide, (slideIndex + 1) * currentItemsPerSlide)
                .map((item, index) => (
                  <div
                    key={slideIndex * currentItemsPerSlide + index}
                    className="flex-1 mx-2"
                  >
                    {renderItem(item, slideIndex * currentItemsPerSlide + index)}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${slideIndex === currentSlide
                ? 'bg-blue-600 scale-110'
                : 'bg-gray-300 hover:bg-gray-400'
                } ${indicatorClassName}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;

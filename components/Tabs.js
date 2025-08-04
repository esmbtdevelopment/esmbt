import React, { useState, useRef, useEffect, useCallback } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  autoSwitchInterval = 5000, // 5 seconds between auto switches
  userInactivityDelay = 60000, // 60 seconds of inactivity before resuming auto switch
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  const autoSwitchTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  // Check for overflow and update arrow visibility
  const checkOverflow = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  // Handle scroll left
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Handle scroll right
  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Auto-switching logic
  const startAutoSwitch = useCallback(() => {
    if (autoSwitchTimerRef.current) {
      clearInterval(autoSwitchTimerRef.current);
    }

    autoSwitchTimerRef.current = setInterval(() => {
      if (tabs.length > 1) {
        const nextTab = (activeTab + 1) % tabs.length;
        onTabChange(nextTab);
      }
    }, autoSwitchInterval);
  }, [activeTab, tabs.length, onTabChange, autoSwitchInterval]);

  const stopAutoSwitch = useCallback(() => {
    if (autoSwitchTimerRef.current) {
      clearInterval(autoSwitchTimerRef.current);
      autoSwitchTimerRef.current = null;
    }
  }, []);

  const handleUserInteraction = (tabIndex) => {
    // Stop auto switching
    setIsAutoSwitching(false);
    stopAutoSwitch();

    // Clear any existing inactivity timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Change to the selected tab
    onTabChange(tabIndex);

    // Start inactivity timer to resume auto switching
    inactivityTimerRef.current = setTimeout(() => {
      setIsAutoSwitching(true);
    }, userInactivityDelay);
  };

  const clearAllTimers = useCallback(() => {
    stopAutoSwitch();
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, [stopAutoSwitch]);

  // Scroll to active tab if it's not in view
  const scrollToActiveTab = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const activeButton = container.children[activeTab];
    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    // Check if button is fully visible
    const isFullyVisible =
      buttonRect.left >= containerRect.left &&
      buttonRect.right <= containerRect.right;

    if (!isFullyVisible) {
      // Calculate scroll position to center the active tab
      const containerCenter = containerRect.width / 2;
      const buttonCenter = buttonRect.width / 2;
      const buttonOffsetLeft = activeButton.offsetLeft;

      const scrollPosition = buttonOffsetLeft - containerCenter + buttonCenter;

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // Check overflow on mount and when tabs change
  useEffect(() => {
    checkOverflow();
    // Initial scroll to active tab on mount or tabs change
    scrollToActiveTab();

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkOverflow);
      const resizeObserver = new ResizeObserver(checkOverflow);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkOverflow);
        resizeObserver.disconnect();
      };
    }
  }, [tabs, scrollToActiveTab]);

  // Auto-switching lifecycle
  useEffect(() => {
    if (isAutoSwitching && tabs.length > 1) {
      startAutoSwitch();
    } else {
      stopAutoSwitch();
    }

    return () => {
      stopAutoSwitch();
    };
  }, [
    isAutoSwitching,
    activeTab,
    tabs.length,
    autoSwitchInterval,
    onTabChange,
    startAutoSwitch,
    stopAutoSwitch,
  ]);

  // Scroll to active tab when it changes
  useEffect(() => {
    // Small delay to ensure DOM is updated after tab change
    const timeoutId = setTimeout(() => {
      scrollToActiveTab();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [activeTab, scrollToActiveTab]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return (
    <div className={`w-full  ${className}`}>
      {/* Tab Headers */}
      <div className="relative">
        {/* Auto-switch indicator */}
        {isAutoSwitching && tabs.length > 1 && (
          <div className="absolute -top-6 right-0 flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Auto-switching</span>
          </div>
        )}

        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => {
              scrollLeft();
              // Pause auto-switching when user uses navigation arrows
              if (isAutoSwitching) {
                setIsAutoSwitching(false);
                stopAutoSwitch();
                if (inactivityTimerRef.current) {
                  clearTimeout(inactivityTimerRef.current);
                }
                inactivityTimerRef.current = setTimeout(() => {
                  setIsAutoSwitching(true);
                }, userInactivityDelay);
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <RxChevronLeft />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => {
              scrollRight();
              // Pause auto-switching when user uses navigation arrows
              if (isAutoSwitching) {
                setIsAutoSwitching(false);
                stopAutoSwitch();
                if (inactivityTimerRef.current) {
                  clearTimeout(inactivityTimerRef.current);
                }
                inactivityTimerRef.current = setTimeout(() => {
                  setIsAutoSwitching(true);
                }, userInactivityDelay);
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <RxChevronRight />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex w-full border-b border-gray-200 mb-4 md:mb-6 gap-2 md:gap-4 overflow-x-auto py-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id || index}
              onClick={() => handleUserInteraction(index)}
              className={`btn border-2 transition-all duration-300  flex-col  hover:text-white h-fit py-3 md:py-5 px-2 md:px-4 flex-shrink-0 min-w-0  ${
                activeTab === index
                  ? "border-sky-500 bg-sky-50 text-sky-600"
                  : "border-gray-200 bg-white text-gray-600 hover:border-sky-200"
              }`}
            >
              <span className="text-xl md:text-3xl mb-1 md:mr-2">
                {tab.icon}
              </span>
              <span className="text-xs md:text-md font-medium text-center leading-tight">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="size-full max-h-80 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-8 lg:p-12">
        {tabs[activeTab] && (
          <div
            key={activeTab}
            className="animate-fade-in font-montserrat tracking-wide text-sm md:text-base"
          >
            {tabs[activeTab].content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;

import React, { useState } from "react";

const Tabs = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scroll gap-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.id || index}
            onClick={() => onTabChange(index)}
            className={`btn btn-primary btn-outline border-none hover:text-white ${
              activeTab === index
                ? "text-sky-600 border-sky-600"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs[activeTab] && (
          <div className="animate-fade-in">{tabs[activeTab].content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;

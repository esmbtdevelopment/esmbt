"use client";
import React from "react";

const FloatingShapes = ({ variant = "default" }) => {
  const variants = {
    default: (
      <>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-sky-200/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-sky-100/60 to-blue-100/60 rounded-lg rotate-45 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border-2 border-blue-200/50 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-100/50 to-sky-100/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* SAP-inspired hexagonal pattern */}
        <div className="absolute top-1/4 left-1/4 opacity-20">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#0284c7" strokeWidth="1"/>
            <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke="#0ea5e9" strokeWidth="1"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-20">
          <svg width="80" height="80" viewBox="0 0 100 100" className="animate-spin-reverse">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#0284c7" strokeWidth="1"/>
          </svg>
        </div>
      </>
    ),

    circuit: (
      <>
        {/* Circuit board inspired patterns */}
        <div className="absolute top-16 left-16 opacity-10">
          <svg width="200" height="200" className="animate-pulse">
            <defs>
              <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,20 L40,20 M20,0 L20,40" stroke="#0284c7" strokeWidth="1" fill="none"/>
                <circle cx="20" cy="20" r="3" fill="#0ea5e9"/>
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#circuit)"/>
          </svg>
        </div>
        
        {/* Data flow lines */}
        <div className="absolute top-1/3 right-20 opacity-20">
          <svg width="150" height="100" className="animate-pulse" style={{animationDelay: '1s'}}>
            <path d="M0,50 Q75,0 150,50" stroke="#0284c7" strokeWidth="2" fill="none" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite"/>
            </path>
            <path d="M0,30 Q75,80 150,30" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Tech nodes */}
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-4 border-sky-300/30 rounded-full animate-ping" style={{animationDelay: '2s'}}>
          <div className="absolute inset-2 bg-sky-400/20 rounded-full"></div>
        </div>
      </>
    ),

    organic: (
      <>
        {/* Organic blob shapes */}
        <div className="absolute top-20 left-20 opacity-30">
          <svg width="120" height="120" className="animate-pulse">
            <path d="M60,20 C80,10 90,30 85,50 C90,70 70,90 50,80 C30,90 10,70 15,50 C10,30 30,10 50,20 Z" 
                  fill="url(#organicGrad1)" className="animate-pulse"/>
            <defs>
              <radialGradient id="organicGrad1" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1"/>
              </radialGradient>
            </defs>
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-20 opacity-20" style={{animationDelay: '1.5s'}}>
          <svg width="100" height="100" className="animate-bounce">
            <path d="M50,10 C70,5 85,20 80,40 C85,60 65,80 45,75 C25,80 5,60 10,40 C5,20 25,5 45,10 Z" 
                  fill="url(#organicGrad2)"/>
            <defs>
              <radialGradient id="organicGrad2" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1"/>
              </radialGradient>
            </defs>
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-sky-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-sky-300/50 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      </>
    ),

    minimal: (
      <>
        {/* Simple geometric elements */}
        <div className="absolute top-24 right-24 w-1 h-24 bg-gradient-to-b from-sky-400/30 to-transparent"></div>
        <div className="absolute bottom-24 left-24 w-24 h-1 bg-gradient-to-r from-blue-400/30 to-transparent"></div>
        
        {/* Dot pattern */}
        <div className="absolute top-1/3 left-1/2 grid grid-cols-3 gap-2 opacity-20">
          {Array.from({length: 9}).map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" 
              style={{animationDelay: `${i * 0.2}s`}}
            />
          ))}
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-sky-400/40"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-blue-400/40"></div>
      </>
    )
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {variants[variant] || variants.default}
    </div>
  );
};

export default FloatingShapes;

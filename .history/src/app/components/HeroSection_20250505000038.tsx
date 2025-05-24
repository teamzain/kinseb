"use client"

import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Check on window resize
    window.addEventListener('resize', checkMobile);
    
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);
  
  // Video source based on device type
  const videoSource = isMobile ? "/mobile-video.mp4" : "/video.mp4";
  
  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-black">
      {/* Background Video - taller than container for overlap effect */}
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-[100vh] object-cover opacity-60 z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Content wrapper - pushed further left on large screens */}
        <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="lg:max-w-2xl">
              {/* Animated entry for each text element */}
              <p 
                className={`text-cyan-400 font-medium mb-3 tracking-wider text-sm md:text-base uppercase transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '200ms' }}
              >
                Your Web Development Provider
              </p>
              
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                Building <span className="text-cyan-400">Websites</span> That<br className="hidden md:block" /> 
                Drive Growth
              </h1>
              
              <p 
                className={`text-gray-200 max-w-xl mb-8 text-base md:text-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                From startups to enterprises, we build responsive, SEO-optimized websites.
                Let your brand stand out with designs tailored for results.
              </p>
              
              <div 
                className={`flex flex-wrap gap-4 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <button className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-medium rounded-md hover:bg-cyan-400 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50">
                  See Our Work
                </button>
                <button className="px-6 py-3 bg-cyan-400 text-black font-medium rounded-md hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50">
                  Request A Quote
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom text with fade-in animation */}
        <div 
          className={`absolute bottom-8 left-0 w-full text-center text-white text-sm transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-80' : 'translate-y-5 opacity-0'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <p className="hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="hidden md:inline-block h-px w-8 bg-cyan-400/70"></span>
            Built With Industry-Leading Technologies
            <span className="hidden md:inline-block h-px w-8 bg-cyan-400/70"></span>
          </p>
        </div>
      </div>
      
      {/* Mobile-specific decorative elements */}
      {isMobile && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-tl-full"></div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
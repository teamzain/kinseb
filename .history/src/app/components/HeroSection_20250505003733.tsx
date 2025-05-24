"use client"

import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
  
  // Handle video loaded event
  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };
  
  // Video source based on device type
  const desktopVideo = "/public/video.mp4";
  const mobileVideo = "/videos/mobile-video.mp4";
  
  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      {/* Background Video */}
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoaded}
      >
        {/* Use different video source based on screen size */}
        <source src={isMobile ? mobileVideo : desktopVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-[1]"></div>
      
      {/* Bottom left corner gradient */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-cyan-500/30 to-transparent z-[2]"></div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Text alignment changes based on screen size */}
          <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0 md:ml-4 lg:ml-12">
            {/* Your Web Development Provider text */}
            <p 
              className={`text-cyan-400 font-medium mb-4 tracking-wider text-sm md:text-base uppercase transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Your Web Development Provider
            </p>
            
            {/* Main Heading - Fixed to appear on single lines */}
            <div 
              className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Building <span className="text-cyan-400">Websites</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2 mb-6">
                That Drive Growth
              </h1>
            </div>
            
            {/* Description text */}
            <p 
              className={`text-gray-200 max-w-xl mx-auto md:mx-0 mb-8 text-base md:text-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              From startups to enterprises, we build responsive, SEO-optimized 
              websites. Let your brand stand out with designs tailored for results.
            </p>
            
            {/* Buttons */}
            <div 
              className={`flex flex-wrap gap-4 justify-center md:justify-start transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <button className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-medium rounded hover:bg-cyan-400 hover:text-black transition-all duration-300">
                See Our Work
              </button>
              <button className="px-6 py-3 bg-cyan-400 text-black font-medium rounded hover:bg-cyan-500 transition-all duration-300">
                Request A Quote
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom text with decorative lines */}
        <div 
          className={`absolute bottom-8 left-0 w-full text-center text-white text-sm transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="hidden sm:block h-px w-12 bg-cyan-400/60"></span>
            <p>Built With Industry-Leading Technologies</p>
            <span className="hidden sm:block h-px w-12 bg-cyan-400/60"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
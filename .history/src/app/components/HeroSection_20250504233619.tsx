"use client"

import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Set a fallback timer in case video takes too long to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // If the video is already in browser cache, it might load immediately
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
      setIsLoading(false);
      clearTimeout(timer);
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Placeholder for immediate display while video loads */}
      <div className={`absolute inset-0 bg-black z-10 transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
      
      {/* Loading Overlay */}
      <div className={`absolute inset-0 bg-black z-20 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Background Video */}
      <video 
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-60' : 'opacity-0'}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoaded}
        onCanPlayThrough={handleVideoLoaded}
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-cyan-400 font-medium mb-2 tracking-wide">Your Web Development Provider</p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Building <span className="text-cyan-400">Websites</span> That<br /> 
            Drive Growth
          </h1>
          
          <p className="text-gray-200 max-w-xl mb-8 text-lg">
            From startups to enterprises, we build responsive, SEO-optimized websites.
            Let your brand stand out with designs tailored for results.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-medium rounded-md hover:bg-cyan-400 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50">
              See Our Work
            </button>
            <button className="px-6 py-3 bg-cyan-400 text-black font-medium rounded-md hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50">
              Request A Quote
            </button>
          </div>
          
          <div className="absolute bottom-8 text-center w-full left-0 text-white text-sm">
            <p className="opacity-80 hover:opacity-100 transition-opacity">Built With Industry-Leading Technologies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
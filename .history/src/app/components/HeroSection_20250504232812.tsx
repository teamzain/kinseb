'use client';
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Add preload effect to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Loading Overlay */}
      <div className={`absolute inset-0 bg-black z-20 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Background Video */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoading(false)}
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-cyan-400 font-medium mb-2">Your Web Development Provider</p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Building <span className="text-cyan-400">Websites</span> That<br /> 
            Drive Growth
          </h1>
          
          <p className="text-gray-200 max-w-xl mb-8">
            From startups to enterprises, we build responsive, SEO-optimized websites.
            Let your brand stand out with designs tailored for results.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:bg-opacity-10 transition-all">
              See Our Work
            </button>
            <button className="px-6 py-3 bg-cyan-400 text-black rounded hover:bg-cyan-500 transition-all">
              Request A Quote
            </button>
          </div>
          
          <div className="absolute bottom-8 text-center w-full left-0 text-white text-sm">
            <p>Built With Industry-Leading Technologies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white text-xl md:text-2xl font-bold flex items-center">
            <span className="text-cyan-400">Web</span>Dev
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-white hover:text-cyan-400 transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-white hover:text-cyan-400 transition-colors">
              Portfolio
            </Link>
            <Link href="/about" className="text-white hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-500 transition-all">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-black/95 transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-64 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link href="/" className="text-white hover:text-cyan-400 transition-colors py-2">
            Home
          </Link>
          <Link href="/services" className="text-white hover:text-cyan-400 transition-colors py-2">
            Services
          </Link>
          <Link href="/portfolio" className="text-white hover:text-cyan-400 transition-colors py-2">
            Portfolio
          </Link>
          <Link href="/about" className="text-white hover:text-cyan-400 transition-colors py-2">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-cyan-400 transition-colors py-2">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

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
    <>
      <Navbar />
      <div className="relative w-full h-[80vh] overflow-hidden bg-black pt-16">
        {/* Background Video */}
        <video 
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-1"></div>
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-2xl ml-0 md:ml-4 lg:ml-12">
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
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  Building <span className="text-cyan-400">Websites</span>
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2 mb-6">
                  That Drive Growth
                </h1>
              </div>
              
              {/* Description text */}
              <p 
                className={`text-gray-200 max-w-xl mb-8 text-base md:text-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                From startups to enterprises, we build responsive, SEO-optimized 
                websites. Let your brand stand out with designs tailored for results.
              </p>
              
              {/* Buttons */}
              <div 
                className={`flex flex-wrap gap-4 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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
    </>
  );
};

export default HeroSection;
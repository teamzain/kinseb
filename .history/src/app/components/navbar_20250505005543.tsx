'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by only rendering client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (!mounted) return;
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, mounted]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // Don't render until client-side to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // Navigation links
  const navigationLinks = [
    { href: "/", label: "Home", id: "home" },
    { href: "/about", label: "About", id: "about" },
    { href: "/services", label: "Services", id: "services" },
    { href: "/portfolio", label: "Portfolio", id: "portfolio" },
    { href: "/contact", label: "Contact", id: "contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#091135] z-50" role="navigation" aria-label="Main Navigation">
      <div className="flex justify-between items-center py-4 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Logo - Pushed more to left */}
        <div className="z-10 -ml-6 md:-ml-16 lg:-ml-20">
          <Link href="/" aria-label="Homepage">
            <Image 
              src="/images/logo.png" 
              alt="Company Logo" 
              width={160} 
              height={80} 
              priority
              className="w-[120px] md:w-[160px] lg:w-[190px] h-auto object-contain"
            />
          </Link>
        </div>
        
        {/* Button Container - Pushed more to right */}
        <div className="flex items-center mr-0 md:mr-1">
          {/* Quote Button - Hidden on mobile */}
          <Link 
            href="/quote" 
            className="hidden md:block bg-[#0D98BA] text-white py-2 px-4 md:px-6 rounded-md text-sm md:text-base font-semibold shadow-md mr-4 hover:bg-[#0B8DAD] transition-colors duration-300"
            aria-label="Request A Quote"
          >
            Request A Quote
          </Link>
          
          {/* Hamburger Button */}
          <div 
            className="bg-[#1A1A1A] w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center cursor-pointer z-9"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
              }
            }}
          >
            <div className="relative w-5 md:w-6 h-4 md:h-5">
              {/* Top line */}
              <span 
                className={`absolute block w-full h-0.5 bg-[#809B0D] rounded-sm transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'top-1/2 -mt-px rotate-45' : 'top-0'
                }`}
              ></span>
              
              {/* Middle line */}
              <span 
                className={`absolute top-1/2 -mt-px block w-3/4 md:w-4/5 h-0.5 bg-[#809B0D] rounded-sm ml-auto transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'
                }`}
              ></span>
              
              {/* Bottom line */}
              <span 
                className={`absolute block w-full h-0.5 bg-[#809B0D] rounded-sm transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'top-1/2 -mt-px -rotate-45' : 'bottom-0'
                }`}
              ></span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu - Optimized */}
      <div 
        className={`fixed top-0 right-0 w-[280px] md:w-[320px] h-screen bg-[#091135] pt-20 px-8 shadow-lg transform transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="h-full flex flex-col">
          <ul className="mb-10">
            {navigationLinks.map((link) => (
              <li className="my-4" key={link.id}>
                <Link 
                  href={link.href} 
                  className={`text-lg font-medium transition-colors duration-300 ${
                    activeLink === link.id ? 'text-[#809B0D] font-semibold' : 'text-white hover:text-[#809B0D]'
                  }`}
                  onClick={() => handleLinkClick(link.id)}
                  aria-current={activeLink === link.id ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <Link 
              href="/quote" 
              className="block w-full bg-[#0D98BA] text-white py-3 px-6 text-center rounded-lg font-semibold shadow-md hover:bg-[#0B8DAD] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)} 
              aria-label="Request A Quote"
            >
              Request A Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Optimized Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#091135]/90 z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
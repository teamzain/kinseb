'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import "../globals.css";
// Define interface for navigation links
interface NavigationLink {
  href: string;
  label: string;
  id: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by only rendering client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  // Type the link parameter
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // Don't render until client-side to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // Navigation links for SEO and DRY code
  const navigationLinks: NavigationLink[] = [
    { href: "/", label: "Home", id: "home" },
    { href: "/about", label: "About", id: "about" },
    { href: "/services", label: "Services", id: "services" },
    { href: "/portfolio", label: "Portfolio", id: "portfolio" },
    { href: "/contact", label: "Contact", id: "contact" }
  ];

  return (
    <>
      <Head>
        {/* Preconnect to font domain for improved performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical fonts */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap" />
      </Head>

      {/* Global styles - adding Barlow font family */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          overflow-x: hidden;
          font-family: 'Barlow', sans-serif;
        }
      `}</style>

      <nav className="fixed top-0 left-0 w-full z-[1000] bg-[#091135]" role="navigation" aria-label="Main Navigation">
        <div className="flex justify-between items-center px-7 py-5 max-w-[1400px] mx-auto md:px-8 lg:px-11">
          {/* Logo container */}
          <div className="flex items-center z-[1001] -ml-[70px] md:-ml-[40px] sm:-ml-[10px] xs:-ml-[5px]">
            <Link href="/" aria-label="Homepage" className="transition-transform duration-300 hover:translate-y-[-2px]">
              <Image 
                src="/images/logo.png" 
                alt="Company Logo" 
                width={190} 
                height={188} 
                priority
                className="w-[190px] h-auto object-contain lg:w-[190px] md:w-[160px] sm:w-[140px]"
              />
            </Link>
          </div>
          
          {/* Button container */}
          <div className="flex items-center ml-auto -mr-[70px] md:-mr-[40px] sm:-mr-[15px] xs:-mr-[10px]">
            {/* Request A Quote button - hidden on mobile */}
            <Link 
              href="/quote" 
              className="bg-[#0D98BA] text-white px-6 py-3 rounded-md font-semibold text-[0.95rem] transition-all duration-300 hover:bg-[#0B8DAD] hover:translate-y-[-2px] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0D98BA] focus:ring-opacity-50 whitespace-nowrap tracking-[0.3px] mr-5 md:px-5 md:py-[0.65rem] md:text-[0.9rem] sm:hidden"
              aria-label="Request A Quote"
            >
              Request A Quote
            </Link>
            
            {/* Hamburger button */}
            <div 
              className="bg-[#1A1A1A] rounded-md w-12 h-12 flex items-center justify-center cursor-pointer z-[1001] overflow-hidden relative transition-all duration-300 hover:bg-[#222222] hover:translate-y-[-2px] hover:shadow-md ml-auto mr-[10px] sm:mr-[5px] sm:w-[42px] sm:h-[42px]"
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
              <div className="relative w-6 h-[18px] flex flex-col justify-between">
                <span className={`block w-6 h-[2px] bg-[#809B0D] rounded-sm transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${isMenuOpen ? 'translate-y-[8px] rotate-45' : ''}`}></span>
                <span className={`block w-4 h-[2px] bg-[#809B0D] rounded-sm ml-auto transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${isMenuOpen ? 'opacity-0 translate-x-5 w-6' : 'hover:w-5'}`}></span>
                <span className={`block w-6 h-[2px] bg-[#809B0D] rounded-sm transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${isMenuOpen ? 'translate-y-[-8px] -rotate-45' : ''}`}></span>
              </div>
              
              {/* Radial gradient overlay on hover */}
              <div className="absolute inset-0 bg-radial-gradient from-[rgba(128,155,13,0.2)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Side Menu with Enhanced Animation */}
        <div 
          className={`fixed top-0 right-0 w-[320px] h-screen bg-gradient-to-br from-[#091135] to-[#0E1C4A] z-[1000] shadow-[-5px_0_25px_rgba(0,0,0,0.3)] overflow-y-auto pt-24 px-10 pb-10 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'translate-x-[-320px]' : 'translate-x-0 right-[-320px]'} sm:w-[280px] sm:${isMenuOpen ? 'translate-x-[-280px]' : 'translate-x-0 right-[-280px]'}`}
          aria-hidden={!isMenuOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Green line on the right side */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#809B0D] to-transparent opacity-40"></div>
          
          <div className="flex flex-col h-full">
            <ul className="list-none p-0 mb-10">
              {navigationLinks.map((link, index) => (
                <li 
                  className={`my-5 opacity-0 translate-x-[30px] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isMenuOpen ? 'opacity-100 translate-x-0' : ''}`} 
                  style={{ transitionDelay: isMenuOpen ? `${0.1 + index * 0.07}s` : '0s' }}
                  key={link.id}
                >
                  <Link 
                    href={link.href} 
                    className={`text-white no-underline text-[1.2rem] font-medium transition-all duration-300 flex items-center py-[0.6rem] tracking-[0.5px] relative hover:text-[#809B0D] hover:translate-x-[5px] ${activeLink === link.id ? 'text-[#809B0D] font-semibold' : ''}`}
                    onClick={() => handleLinkClick(link.id)}
                    aria-current={activeLink === link.id ? 'page' : undefined}
                  >
                    {/* Green dot indicator */}
                    <span className={`absolute left-[-18px] w-[6px] h-[6px] rounded-full bg-[#809B0D] opacity-0 scale-0 transition-all duration-300 ${(activeLink === link.id || false) ? 'opacity-100 scale-100' : ''} ${false ? 'opacity-100 scale-100' : ''}`}></span>
                    
                    {/* Link text */}
                    {link.label}
                    
                    {/* Underline animation */}
                    <span className={`absolute w-0 h-[2px] bg-[#809B0D] bottom-0 left-0 transition-[width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${(activeLink === link.id || false) ? 'w-[40px]' : ''} ${false ? 'w-[40px]' : ''}`}></span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Hidden CTA button in mobile menu */}
            <div className="hidden opacity-0 translate-y-[20px] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-[0.45s] text-center mt-6">
              <Link 
                href="/quote" 
                className="hidden !mr-0 !py-[0.85rem] !px-8 !w-full !text-center !font-semibold !tracking-[0.5px] !rounded-lg !relative !overflow-hidden !z-[1] !shadow-[0_6px_15px_rgba(13,152,186,0.25)]"
                onClick={() => setIsMenuOpen(false)} 
                aria-label="Request A Quote"
              >
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent transition-all duration-500 z-[-1]"></span>
                Request A Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-gradient-to-r from-[rgba(9,17,53,0.95)] to-[rgba(9,17,53,0.85)] z-[999] backdrop-blur-[5px] transition-opacity duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      </nav>
    </>
  );
};

export default Navbar;
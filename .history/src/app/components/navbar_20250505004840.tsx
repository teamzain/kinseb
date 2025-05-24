'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // Don't render until client-side to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // Navigation links for SEO and DRY code
  const navigationLinks = [
    { href: "/", label: "Home", id: "home" },
    { href: "/about", label: "About", id: "about" },
    { href: "/services", label: "Services", id: "services" },
    { href: "/portfolio", label: "Portfolio", id: "portfolio" },
    { href: "/contact", label: "Contact", id: "contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#091135] z-50" role="navigation" aria-label="Main Navigation">
      <div className="flex justify-between items-center py-5 px-7 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="z-10 -ml-8 md:-ml-12">
          <Link href="/" aria-label="Homepage">
            <Image 
              src="/images/logo.png" 
              alt="Company Logo" 
              width={190} 
              height={188} 
              priority
              className="w-[140px] md:w-[160px] lg:w-[190px] h-auto object-contain"
            />
          </Link>
        </div>
        
        {/* Button Container */}
        <div className="flex items-center">
          {/* Quote Button */}
          <Link 
            href="/quote" 
            className="bg-[#0D98BA] text-white py-3 px-4 md:px-6 rounded-md text-sm md:text-base font-semibold shadow-md mr-4 hover:bg-[#0B8DAD] transition-colors duration-300"
            aria-label="Request A Quote"
          >
            Request A Quote
          </Link>
          
          {/* Hamburger Button */}
          <div 
            className="bg-[#1A1A1A] w-12 h-12 rounded-md flex items-center justify-center cursor-pointer z-10"
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
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span className={`block w-6 h-0.5 bg-[#809B0D] rounded-sm absolute top-0 transform transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45' : ''}`}></span>
              <span className={`block w-4 h-0.5 bg-[#809B0D] rounded-sm ml-auto absolute top-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-3' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#809B0D] rounded-sm absolute bottom-0 transform transition-all duration-300 ${isMenuOpen ? 'bottom-2 -rotate-45' : ''}`}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div 
        className={`fixed top-0 right-0 w-[280px] md:w-[320px] h-screen bg-gradient-to-br from-[#091135] to-[#0E1C4A] pt-24 px-10 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="h-full flex flex-col">
          <ul className="mb-10">
            {navigationLinks.map((link) => (
              <li className="my-5" key={link.id}>
                <Link 
                  href={link.href} 
                  className={`text-xl font-medium transition-colors duration-300 ${activeLink === link.id ? 'text-[#809B0D] font-semibold' : 'text-white hover:text-[#809B0D]'}`}
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
              className="block w-full bg-[#0D98BA] text-white py-3 px-8 text-center rounded-lg font-semibold shadow-md hover:bg-[#0B8DAD] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)} 
              aria-label="Request A Quote"
            >
              Request A Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-[#091135]/90 backdrop-blur-sm transition-opacity duration-300 z-30 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>
    </nav>
  );
};

export default Navbar;
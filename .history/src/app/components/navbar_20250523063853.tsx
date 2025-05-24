'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

// Define an interface for navigation links
interface NavigationLink {
  href: string;
  label: string;
  id: string;
  icon?: string;
  hasDropdown?: boolean;
  dropdownItems?: {href: string, label: string}[];
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // State for the new services slider that appears within the sidebar
  const [isServiceSliderOpen, setIsServiceSliderOpen] = useState(false);
  // State for active service tab
  const [activeServiceTab, setActiveServiceTab] = useState('web');

  // Fix hydration issues by only rendering client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close service slider when menu closes
    if (!isMenuOpen) {
      setIsServiceSliderOpen(false);
    }
  };

  const toggleDropdown = (id: string) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  // Change this function
  const toggleServiceSlider = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsServiceSliderOpen(!isServiceSliderOpen);
  };

  // Function to close the service slider
  const closeServiceSlider = () => {
    setIsServiceSliderOpen(false);
  };

  // Function to change the active service tab
  const changeServiceTab = (tab: string) => {
    setActiveServiceTab(tab);
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

  // Fix TypeScript error by specifying the parameter type
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setIsServiceSliderOpen(false);
  };

  // Add class to body when menu is open to control z-index
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  // Add class to body when service slider is open
  useEffect(() => {
    if (isServiceSliderOpen) {
      document.body.classList.add('service-slider-open');
    } else {
      document.body.classList.remove('service-slider-open');
    }
  }, [isServiceSliderOpen]);

  // Reset dropdown when menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setOpenDropdown(null);
      setIsServiceSliderOpen(false);
    }
  }, [isMenuOpen]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isServiceSliderOpen) {
          setIsServiceSliderOpen(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen || isServiceSliderOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, isServiceSliderOpen]);

  // Don't render until client-side to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // Navigation links for SEO and DRY code
  const navigationLinks: NavigationLink[] = [
    { href: "/", label: "Home", id: "home", icon: "/images/home.svg" },
    { 
      href: "/services", 
      label: "Services", 
      id: "services", 
      icon: "/images/service.svg",
      hasDropdown: true,
      dropdownItems: [
        { href: "/services/ecommerce", label: "Ecommerce" },
        { href: "/services/shopify", label: "Shopify" },
        { href: "/services/wordpress", label: "WordPress" },
        { href: "/services/custom-website", label: "Custom Website" },
        { href: "/services/seo", label: "SEO" },
        { href: "/services/redesigns", label: "Redesigns" }
      ]
    },
    { href: "/portfolio", label: "Portfolio", id: "portfolio", icon: "/images/portfolio.svg" },
    { href: "/about", label: "About", id: "about", icon: "/images/about.svg" },
    { href: "/contact", label: "Contact", id: "contact", icon: "/images/contact.svg" }
  ];

  // Social media links
  const socialLinks = [
    { href: "https://twitter.com", icon: "/images/twitter.svg", label: "Twitter" },
    { href: "https://facebook.com", icon: "/images/facebook.svg", label: "Facebook" },
    { href: "https://instagram.com", icon: "/images/insta.svg", label: "Instagram" },
    { href: "https://linkedin.com", icon: "/images/linkedin.svg", label: "LinkedIn" }
  ];

  return (
    <>
      <Head>
        {/* SEO Optimization: Improve font loading and performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          as="style" 
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap" 
        />
        
        {/* SEO: Add canonical link to prevent duplicate content */}
        <link rel="canonical" href="https://www.yourwebsite.com" />
        
        {/* SEO: Add meta description */}
        <meta 
          name="description" 
          content="Kinseb Web Development offers professional web design, e-commerce solutions, and digital services to help your business grow online." 
        />
        
        {/* SEO: Add keywords */}
        <meta 
          name="keywords" 
          content="web development, e-commerce, Shopify, WordPress, custom websites, SEO, web design" 
        />
        
        {/* Open Graph meta tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kinseb Web Development" />
        <meta 
          property="og:description" 
          content="Professional web development and digital services to elevate your online presence." 
        />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta property="og:image" content="https://www.yourwebsite.com/og-image.jpg" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kinseb Web Development" />
        <meta 
          name="twitter:description" 
          content="Professional web development and digital services to elevate your online presence." 
        />
        <meta name="twitter:image" content="https://www.yourwebsite.com/twitter-image.jpg" />
        
        {/* Schema.org structured data for improved SEO */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kinseb Web Development",
          "url": "https://www.yourwebsite.com",
          "description": "Professional web development and digital services",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.yourwebsite.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
        </script>

        {/* Stylesheet for fonts */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap" 
        />
      </Head>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          overflow-x: hidden;
          font-family: 'Barlow', sans-serif;
        }

        /* ========== NAVBAR STYLES ========== */
        .navbar {
          background-color: #091135;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 2.8rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo-container {
          display: flex;
          align-items: center;
          z-index: 1001;
          margin-left: -70px;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .logo-container img {
          transition: transform 0.3s ease;
          width: 190px !important;
          height: auto !important;
          object-fit: contain;
        }

        .logo-container:hover img {
          transform: translateY(-2px);
        }

        .button-container {
          display: flex;
          align-items: center;
          margin-right: -70px;
          margin-left: auto;
        }

        /* Quote Button */
        .quote-button {
          background-color: #0D98BA;
          color: white;
          padding: 0.75rem 1.5rem;
          font-family: 'Barlow', sans-serif;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          white-space: nowrap;
          box-shadow: 0 4px 6px rgba(13, 152, 186, 0.2);
          letter-spacing: 0.3px;
          margin-right: 20px;
        }

        .quote-button:hover {
          background-color: #0B8DAD;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(13, 152, 186, 0.3);
        }

        /* ========== HAMBURGER STYLES ========== */
        .hamburger {
          width: 24px;
          height: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          background-color: #809B0D;
          border-radius: 1px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-line:nth-child(2) {
          width: 16px;
          margin-left: auto;
          transition: all 0.3s ease;
        }

        .hamburger-container {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 990;
          margin-left: auto;
          margin-right: 10px;
          background-color: #1A1A1A;
          border-radius: 6px;
          width: 48px;
          height: 48px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .hamburger-container:hover {
          background-color: #222222;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .hamburger-container:hover .hamburger-line:nth-child(2) {
          width: 20px;
        }

        .hamburger-container:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(128, 155, 13, 0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hamburger-container:hover:after {
          opacity: 1;
        }

        /* Hamburger to X animation */
        .hamburger.active .hamburger-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
          width: 24px;
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
          width: 24px;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
          width: 24px;
        }

        /* ========== MENU SIDEBAR STYLES ========== */
        .menu-side {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background-color: #050922;
          z-index: 1000;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          padding: 2.5rem 2.5rem 2.5rem;
        }

        .menu-side.open {
          transform: translateX(-400px);
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          width: 100%;
        }

        .menu-logo {
          display: flex;
          align-items: center;
        }

        .menu-close {
          width: 36px !important;
          height: 36px !important;
          border-radius: 50% !important;
          background-color: #091135 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          margin: 0 !important;
          position: relative !important;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
          cursor: pointer !important;
          transition: transform 0.3s ease !important;
          border: none;
        }

        .menu-close svg {
          width: 18px !important;
          height: 18px !important;
          display: block !important;
          margin: 0 auto !important;
          position: static !important;
          top: auto !important;
          left: auto !important;
        }

        .menu-close:hover {
          transform: rotate(90deg);
          background-color: #0d1540;
        }

        .menu-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .menu-links {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }

        .menu-item {
          margin: 0.5rem 0;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .menu-side.open .menu-item {
          opacity: 1;
          transform: translateX(0);
        }

        .menu-side.open .menu-item:nth-child(1) { transition-delay: 0.1s; }
        .menu-side.open .menu-item:nth-child(2) { transition-delay: 0.17s; }
        .menu-side.open .menu-item:nth-child(3) { transition-delay: 0.24s; }
        .menu-side.open .menu-item:nth-child(4) { transition-delay: 0.31s; }
        .menu-side.open .menu-item:nth-child(5) { transition-delay: 0.38s; }

        .menu-link {
          color: white;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          padding: 0.6rem 0;
          letter-spacing: 0.5px;
          position: relative;
          font-family: 'Barlow', sans-serif;
        }

        .menu-link-icon {
          margin-right: 1rem;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          transition: all 0.3s ease;
        }

        .menu-link:hover {
          color: #00BCD4;
          transform: translateX(5px);
        }

        .menu-link:hover .menu-link-icon {
          opacity: 1;
        }

        .menu-link.active {
          color: #00BCD4;
        }

        .menu-link.active .menu-link-icon {
          opacity: 1;
        }

        .menu-link:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background-color: rgba(0, 188, 212, 0.5);
          transition: width 0.3s ease;
        }

        .menu-link:hover:before {
          width: 30px;
        }

        .menu-link.active:before {
          width: 30px;
          background-color: #00BCD4;
        }

        /* Menu link with dropdown (Services) */
        .menu-link-with-dropdown {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          color: white;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.6rem 0;
          letter-spacing: 0.5px;
          position: relative;
          font-family: 'Barlow', sans-serif;
        }
        
        .menu-link-with-dropdown .menu-link-text {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: white;
          text-decoration: none;
        }
        
        .menu-link-text:hover {
          color: #00BCD4;
          transform: translateX(5px);
        }

        .menu-link-with-dropdown:hover {
          color: #00BCD4;
        }
        
        .menu-link-with-dropdown.active .menu-link-text {
          color: #00BCD4;
        }

        /* Plus icon for Services */
        .plus-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          position: relative;
          cursor: pointer;
          margin-left: auto;
          transition: transform 0.3s ease;
          background-color: rgba(13, 152, 186, 0.1);
          border-radius: 50%;
        }

        .plus-icon:before,
        .plus-icon:after {
          content: '';
          position: absolute;
          background-color: #00BCD4;
          transition: all 0.3s ease;
        }

        .plus-icon:before {
          width: 12px;
          height: 2px;
          top: 11px;
          left: 6px;
        }

        .plus-icon:after {
          width: 2px;
          height: 12px;
          top: 6px;
          left: 11px;
        }

        .plus-icon.open:before {
          transform: rotate(180deg);
        }

        .plus-icon.open:after {
          transform: rotate(90deg);
        }

        .plus-icon:hover {
          background-color: rgba(13, 152, 186, 0.2);
          transform: scale(1.1);
        }

        .menu-divider {
          height: 2px;
          background-color: #00BCD4;
          margin: 1.5rem 0 2rem 0;
          width: 100%;
        }

        /* Newsletter section */
        .menu-newsletter {
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .menu-newsletter-title {
          color: white;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          display: block;
        }

        .menu-newsletter-form {
          position: relative;
          width: 100%;
          height: 67px;
          background: rgba(36, 36, 36, 0.2);
          border: 1px solid #262626;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          display: flex;
          align-items: center;
          padding: 0 30px;
          margin-bottom: 1rem;
        }

        .menu-newsletter-input {
          flex: 1;
          background-color: transparent;
          border: none;
          padding: 0;
          height: 22px;
          font-family: 'Barlow', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: #FFFFFF;
          width: 100%;
        }

        .menu-newsletter-input::placeholder {
          color: #98989A;
        }

        .menu-newsletter-input:focus {
          outline: none;
        }

        .menu-newsletter-button {
          position: absolute;
          right: 10px;
          width: 88px;
          height: 40px;
          background: #0D98BA;
          border-radius: 5px;
          border: none;
          font-family: 'Barlow', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 150%;
          text-align: center;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s ease;
          top: 13px;
        }

        .menu-newsletter-button:hover {
          background: #0B89A9;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(13, 152, 186, 0.3);
        }

        .menu-newsletter-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-top: 0.8rem;
        }

        /* Social links */
        .menu-social {
          display: flex;
          margin-top: 1.5rem;
          gap: 1rem;
        }

        .menu-social-link {
          color: white;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .menu-social-link:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          transform: scale(0.8);
        }

        .menu-social-link:hover {
          transform: translateY(-3px);
        }

        .menu-social-link:hover:before {
          opacity: 0.8;
          transform: scale(1);
        }

        .menu-social-link img {
          width: 20px !important;
          height: 20px !important;
          filter: brightness(1.2);
          position: relative;
          z-index: 2;
        }

        /* ========== SERVICE SLIDER STYLES - IMPROVED & RESPONSIVE ========== */
        .service-slider {
          position: fixed;
          top: 10px; /* Start below navbar - adjust based on your navbar height */
          left: 0px; /* Move more to the left - closer to sidebar */
          width: calc(90vw - 350px); /* Cover remaining screen with new left position */
          height: calc(100vh - 80px); /* Account for navbar height */
          background: linear-gradient(135deg, #050922 0%, #0a1240 100%);
          z-index: 1000; /* Above overlay but same level as navbar */
          transform: translateX(100%); /* Hidden to the right */
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          display: flex;
          box-shadow: -8px 0 32px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
          will-change: transform;
        }

        .service-slider.open {
          transform: translateX(0); /* Slide into view */
          z-index: 1000; /* Keep same level as navbar when open */
        }

        /* Left tabs section - IMPROVED */
        .service-slider-tabs {
          width: 280px;
          background: linear-gradient(180deg, rgba(5, 9, 34, 0.95) 0%, rgba(9, 17, 53, 0.98) 100%);
          padding: 2rem 1.5rem;
          border-right: 1px solid rgba(0, 188, 212, 0.15);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          backdrop-filter: blur(5px);
          will-change: transform;
        }

        .service-slider-tab {
          padding: 1rem 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 500;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          border-left: 3px solid transparent;
          font-family: 'Barlow', sans-serif;
          letter-spacing: 0.3px;
        }

        .service-slider-tab:hover {
          background: linear-gradient(135deg, rgba(13, 152, 186, 0.12) 0%, rgba(0, 188, 212, 0.08) 100%);
          color: #00BCD4;
          border-left-color: rgba(0, 188, 212, 0.5);
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.1);
        }

        .service-slider-tab.active {
          background: linear-gradient(135deg, rgba(13, 152, 186, 0.2) 0%, rgba(0, 188, 212, 0.15) 100%);
          color: #00BCD4;
          border-left-color: #00BCD4;
          transform: translateX(6px);
          box-shadow: 0 6px 20px rgba(0, 188, 212, 0.15);
          font-weight: 600;
        }

        .service-slider-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-slider-tab:hover::before {
          opacity: 1;
        }

        /* Right content section - IMPROVED */
        .service-slider-content {
          flex: 1;
          padding: 2.5rem;
          overflow-y: auto;
          background: linear-gradient(135deg, rgba(5, 9, 34, 0.98) 0%, rgba(9, 17, 53, 0.95) 100%);
          will-change: transform;
        }

        .service-slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(0, 188, 212, 0.2);
          padding-bottom: 2rem;
        }

        .service-slider-title {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #00BCD4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .service-slider-close {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #091135 0%, #0d1540 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(0, 188, 212, 0.2);
          will-change: transform;
        }

        .service-slider-close:hover {
          transform: rotate(90deg) scale(1.05);
          background: linear-gradient(135deg, #0d1540 0%, #162660 100%);
          box-shadow: 0 6px 20px rgba(0, 188, 212, 0.15);
          border-color: rgba(0, 188, 212, 0.4);
        }

        .service-slider-panel {
          display: none;
          animation: fadeIn 0.4s ease-out;
        }

        .service-slider-panel.active {
          display: block;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Service items grid - IMPROVED - FIXED TO 2 COLUMNS ON DESKTOP */
        .service-slider-items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          padding: 1rem 0;
          max-width: 100%;
          will-change: transform;
        }

        .service-slider-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 188, 212, 0.05) 100%);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(5px);
          will-change: transform;
        }

        .service-slider-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(13, 152, 186, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 12px;
        }

        .service-slider-item:hover::before {
          opacity: 1;
        }

        .service-slider-item:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 188, 212, 0.3);
          box-shadow: 0 12px 32px rgba(0, 188, 212, 0.15);
        }

        .service-slider-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 600;
          transition: all 0.4s ease;
          display: block;
          position: relative;
          z-index: 2;
          font-family: 'Barlow', sans-serif;
          letter-spacing: 0.3px;
          line-height: 1.4;
        }

        .service-slider-link:hover {
          color: #00BCD4;
          text-shadow: 0 0 8px rgba(0, 188, 212, 0.3);
        }

        .service-slider-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00BCD4 0%, #0D98BA 100%);
          transition: width 0.4s ease;
          border-radius: 1px;
        }

        .service-slider-link:hover::after {
          width: 100%;
        }

        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 9, 34, 0.85);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          backdrop-filter: blur(8px);
        }

        .overlay.show {
          opacity: 1;
          visibility: visible;
        }

        /* Body classes for menu states */
        .menu-open .navbar {
          z-index: 997;
        }

        .menu-open .navbar .logo-container {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        /* Desktop-specific service slider behavior */
        @media (min-width: 769px) {
          /* Only show service slider when menu is open */
          .service-slider {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            top: 10px; /* Ensure it starts below navbar */
            height: calc(120vh - 80px);
            left: 0px; /* More to the left */
            width: calc(90vw - 350px);
          }

          /* When both menu and service slider are open */
          .menu-open .service-slider {
            opacity: 1;
            visibility: visible;
            pointer-events: all;
          }

          .menu-open .service-slider.open {
            transform: translateX(0);
            z-index: 1000; /* Same as navbar, above overlay */
          }

          /* Ensure service slider stays properly positioned */
          .menu-open .service-slider:not(.open) {
            z-index: 1000;
          }

          /* Adjust navbar z-index to ensure it stays on top */
          .navbar {
            z-index: 1000; /* Same level - they don't overlap vertically */
          }
        }

        /* ========== RESPONSIVE BREAKPOINTS ========== */

        /* Large screens */
        @media (max-width: 1400px) {
          .container {
            padding: 1.1rem 3rem;
          }
          
          .button-container {
            margin-right: -60px;
          }
        }

        /* Tablet view */
        @media (max-width: 992px) {
          .container {
            padding: 1rem 2rem;
          }
          
          .logo-container {
            margin-left: -40px;
          }
          
          .button-container {
            margin-right: -40px;
          }
          
          .quote-button {
            padding: 0.65rem 1.2rem;
            font-size: 0.9rem;
          }

          /* Service slider adjustments for tablet */
          .service-slider-tabs {
            width: 240px;
            padding: 1.5rem 1rem;
          }

          .service-slider-content {
            padding: 2rem 1.5rem;
          }

          .service-slider-items {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.2rem;
          }

          .service-slider-title {
            font-size: 1.8rem;
          }
        }

        /* Mobile view - MAJOR IMPROVEMENTS */
        @media (max-width: 768px) {
          .container {
            padding: 1rem 1.5rem;
          }

          /* Hide quote button on mobile navbar */
          .navbar .container .quote-button {
            display: none !important;
          }
          
          .logo-container {
            margin-left: -10px;
          }
          
          .logo-container img {
            width: 160px !important;
          }
          
          .button-container {
            margin-right: -15px;
          }

          .hamburger-container {
            margin-right: 5px;
          }

          /* Menu sidebar adjustments */
          .menu-side {
            width: 400px;
            right: -400px;
            padding: 2rem 1.8rem 4rem;
            overflow-y: auto;
          }
          
          .menu-links {
            margin-bottom: 2rem;
          }
          
          .menu-item {
            margin: 0.8rem 0;
          }
          
          .menu-header {
            margin-bottom: 2.5rem;
            justify-content: space-between;
          }

          /* MOBILE SERVICE SLIDER - FULL SCREEN BEHAVIOR */
          .service-slider {
            left: 0;
            width: 100vw;
            flex-direction: column;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1001;
            opacity: 1;
            visibility: visible;
            pointer-events: all;
            transform: translateX(100%);
            top: 0; /* Full screen on mobile */
            height: 100vh;
          }

          .service-slider.open {
            transform: translateX(0);
            z-index: 1002; /* Above navbar on mobile when needed */
          }
          
          .service-slider-tabs {
            width: 100%;
            flex-direction: row;
            padding: 1.2rem 0.8rem;
            border-right: none;
            border-bottom: 1px solid rgba(0, 188, 212, 0.15);
            gap: 0.6rem;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            justify-content: space-between;
            min-height: 80px;
            align-items: center;
          }

          .service-slider-tabs::-webkit-scrollbar {
            display: none;
          }
          
          .service-slider-tab {
            flex: 1;
            white-space: nowrap;
            padding: 0.9rem 0.8rem;
            font-size: 0.85rem;
            text-align: center;
            min-width: 100px;
            border-left: none;
            border-bottom: 3px solid transparent;
            border-radius: 8px;
            margin: 0 0.2rem;
            background: rgba(255, 255, 255, 0.05);
          }

          .service-slider-tab:hover,
          .service-slider-tab.active {
            border-left: none;
            border-bottom-color: #00BCD4;
            transform: translateY(-2px);
            background: rgba(0, 188, 212, 0.1);
          }
          
          .service-slider-content {
            flex: 1;
            padding: 1.5rem;
            overflow-y: auto;
          }

          .service-slider-header {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
          }

          .service-slider-title {
            font-size: 1.5rem;
            line-height: 1.3;
          }

          .service-slider-close {
            width: 40px;
            height: 40px;
          }
          
          .service-slider-items {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 0.5rem 0;
          }
          
          .service-slider-item {
            padding: 1.2rem;
          }
          
          .service-slider-link {
            font-size: 1.1rem;
          }

          /* Newsletter adjustments */
          .menu-newsletter-form {
            height: 60px;
            padding: 0 15px;
          }
          
          .menu-newsletter-input {
            font-size: 14px;
          }
          
          .menu-newsletter-button {
            width: 120px;
            height: 40px;
            right: 10px;
            font-size: 13px;
            top: 10px;
          }

          /* Social links improvements */
          .menu-social {
            gap: 1.2rem;
            justify-content: center;
          }
          
          .menu-social-link {
            width: 46px;
            height: 46px;
          }
        }

        /* Very small mobile screens */
        @media (max-width: 480px) {
          .container {
            padding: 0.9rem 1.2rem;
          }
          
          .hamburger-container {
            width: 42px;
            height: 42px;
            margin-right: 0;
          }
          
          .logo-container img {
            width: 140px !important;
          }
          
          .logo-container {
            margin-left: -5px;
          }
          
          .button-container {
            margin-right: -10px;
          }

          /* Service slider for very small screens */
          .service-slider {
            left: 0; /* Full screen on very small devices */
          }

          .service-slider-tabs {
            padding: 1rem 0.5rem;
            gap: 0.4rem;
            min-height: 70px;
          }

          .service-slider-tab {
            min-width: 80px;
            padding: 0.7rem 0.6rem;
            font-size: 0.8rem;
            margin: 0 0.1rem;
          }

          .service-slider-content {
            padding: 1rem;
          }

          .service-slider-title {
            font-size: 1.3rem;
          }

          .service-slider-item {
            padding: 1rem;
          }

          .service-slider-link {
            font-size: 1rem;
          }

          /* Newsletter for tiny screens */
          .menu-newsletter-form {
            height: 55px;
            padding: 0 15px;
          }
          
          .menu-newsletter-button {
            width: 90px;
            height: 36px;
            font-size: 12px;
            right: 8px;
            top: 9px;
          }
        }

        /* Full width menu for very small screens */
        @media (max-width: 420px) {
          .menu-side {
            width: 100%;
            right: -100%;
            padding: 1.8rem 1.5rem;
          }
          
          .menu-side.open {
            transform: translateX(-100%);
          }
          
          .menu-links {
            margin-top: 0.8rem;
          }
          
          .menu-item {
            margin: 0.7rem 0;
          }

          /* Full screen service slider on very small devices */
          .service-slider {
            left: 0;
            width: 100vw;
            top: 0; /* Full screen on very small devices */
            height: 100vh;
          }

          .service-slider-tabs {
            padding: 1rem 0.5rem;
            gap: 0.4rem;
            min-height: 70px;
          }

          .service-slider-tab {
            min-width: 80px;
            padding: 0.7rem 0.6rem;
            font-size: 0.8rem;
            margin: 0 0.1rem;
          }
        }

        /* Performance optimizations */
        .service-slider,
        .service-slider-tabs,
        .service-slider-content,
        .service-slider-item {
          will-change: transform;
        }

        /* Smooth scrolling for tab container */
        .service-slider-tabs {
          scroll-behavior: smooth;
        }

        /* Focus states for accessibility */
        .service-slider-tab:focus,
        .service-slider-close:focus,
        .service-slider-link:focus {
          outline: 2px solid #00BCD4;
          outline-offset: 2px;
        }

        /* Prevent body scrolling when either menu or slider is open */
        body.menu-open,
        body.service-slider-open {
          overflow: hidden;
        }
      `}</style>

      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container">
          <div className="logo-container">
            <Link href="/" aria-label="Homepage">
              <Image 
                src="/images/logo.svg" 
                alt="Kinseb Web Development" 
                width={190} 
                height={188} 
                priority
              />
            </Link>
          </div>
          
          <div className="button-container">
            {/* Show the Request A Quote button in main navbar */}
            <Link href="/quote" className="quote-button" aria-label="Request A Quote">
              Request A Quote
            </Link>
            
            <div 
              className="hamburger-container"
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
              <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Menu */}
        <div 
          className={`menu-side ${isMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMenuOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="menu-header">
            <div className="menu-logo">
              <Image 
                src="/images/logo.svg" 
                alt="Kinseb Web Development" 
                width={180} 
                height={50}
                priority
              />
            </div>
            
            <button 
              className="menu-close" 
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6L6 16" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L16 16" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <ul className="menu-links">
            {navigationLinks.map((link) => (
              <li className="menu-item" key={link.id}>
                {link.id === 'services' ? (
                  <div className={`menu-link menu-link-with-dropdown ${activeLink === link.id ? 'active' : ''}`}>
                    <Link 
                      href={link.href} 
                      className="menu-link-text"
                      onClick={() => handleLinkClick(link.id)}
                      aria-label={link.label}
                    >
                      <span className="menu-link-icon">
                        {link.icon && (
                          <Image 
                            src={link.icon} 
                            alt={`${link.label} icon`} 
                            width={24} 
                            height={24} 
                          />
                        )}
                      </span>
                      {link.label}
                    </Link>
                    
                    <span 
                      className={`plus-icon ${isServiceSliderOpen ? 'open' : ''}`}
                      onClick={toggleServiceSlider}
                      aria-expanded={isServiceSliderOpen}
                      aria-label={isServiceSliderOpen ? "Close Services Panel" : "Open Services Panel"}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          toggleServiceSlider(e);
                        }
                      }}
                    ></span>
                  </div>
                ) : (
                  <Link 
                    href={link.href} 
                    className={`menu-link ${activeLink === link.id ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.id)}
                    aria-label={link.label}
                  >
                    <span className="menu-link-icon">
                      {link.icon && (
                        <Image 
                          src={link.icon} 
                          alt={`${link.label} icon`} 
                          width={24} 
                          height={24} 
                        />
                      )}
                    </span>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="menu-divider" aria-hidden="true"></div>

          <div className="menu-newsletter">
            <span className="menu-newsletter-title">Get updates</span>
            
            <form 
              className="menu-newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Newsletter subscription");
              }}
            >
              <input 
                type="email" 
                className="menu-newsletter-input" 
                placeholder="Enter your email" 
                aria-label="Email address for newsletter"
                required
              />
              <button 
                type="submit" 
                className="menu-newsletter-button"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
            
            <p className="menu-newsletter-text">
              By subscribing you agree to our Privacy Policy and provide consent to receive updates from our company.
            </p>
          </div>

          <div className="menu-social">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="menu-social-link" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Image 
                  src={social.icon} 
                  alt={social.label} 
                  width={20} 
                  height={20} 
                />
              </a>
            ))}
          </div>
        </div>

        {/* IMPROVED SERVICE SLIDER */}
        <div 
          className={`service-slider ${isServiceSliderOpen ? 'open' : ''}`}
          aria-hidden={!isServiceSliderOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Services Menu"
        >
          {/* Left side tabs */}
          <div className="service-slider-tabs">
            <button 
              className={`service-slider-tab ${activeServiceTab === 'web' ? 'active' : ''}`}
              onClick={() => changeServiceTab('web')}
              aria-label="Web Development Services"
            >
              Web Development
            </button>
            <button 
              className={`service-slider-tab ${activeServiceTab === 'ecommerce' ? 'active' : ''}`}
              onClick={() => changeServiceTab('ecommerce')}
              aria-label="E-commerce Solutions"
            >
              E-commerce
            </button>
            <button 
              className={`service-slider-tab ${activeServiceTab === 'cms' ? 'active' : ''}`}
              onClick={() => changeServiceTab('cms')}
              aria-label="CMS Solutions"
            >
              CMS Solutions
            </button>
          </div>
          
          {/* Right side content */}
          <div className="service-slider-content">
            <div className="service-slider-header">
              <h2 className="service-slider-title">
                {activeServiceTab === 'web' && 'Web Development Services'}
                {activeServiceTab === 'ecommerce' && 'E-commerce Solutions'}
                {activeServiceTab === 'cms' && 'CMS & Platform Services'}
              </h2>
              <button 
                className="service-slider-close" 
                onClick={closeServiceSlider}
                aria-label="Close services panel"
              >
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6L6 16" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L16 16" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Web Development panel */}
            <div className={`service-slider-panel ${activeServiceTab === 'web' ? 'active' : ''}`}>
              <div className="service-slider-items">
                <div className="service-slider-item">
                  <Link 
                    href="/services/custom-website" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Custom Website Development
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/web-apps" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Web Applications
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/responsive-design" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Responsive Design
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/frontend-development" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Frontend Development
                  </Link>
                </div>
              </div>
            </div>
            
            {/* E-commerce panel */}
            <div className={`service-slider-panel ${activeServiceTab === 'ecommerce' ? 'active' : ''}`}>
              <div className="service-slider-items">
                <div className="service-slider-item">
                  <Link 
                    href="/services/shopify" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Shopify Development
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/woocommerce" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    WooCommerce Solutions
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/ecommerce-optimization" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Store Optimization
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/payment-integration" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Payment Gateway Integration
                  </Link>
                </div>
              </div>
            </div>
            
            {/* CMS panel */}
            <div className={`service-slider-panel ${activeServiceTab === 'cms' ? 'active' : ''}`}>
              <div className="service-slider-items">
                <div className="service-slider-item">
                  <Link 
                    href="/services/wordpress" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    WordPress Development
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/contentful" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Contentful Integration
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/strapi" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    Strapi Headless CMS
                  </Link>
                </div>
                <div className="service-slider-item">
                  <Link 
                    href="/services/migrations" 
                    className="service-slider-link"
                    onClick={() => {
                      handleLinkClick('services');
                      closeServiceSlider();
                    }}
                  >
                    CMS Migrations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div 
          className={`overlay ${isMenuOpen ? 'show' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      </nav>
    </>
  );
};

export default Navbar;
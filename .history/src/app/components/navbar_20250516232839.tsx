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
  const [showServicesDialog, setShowServicesDialog] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0 });

  // Fix hydration issues by only rendering client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showServicesDialog) {
      setShowServicesDialog(false);
    }
  };

  const toggleDropdown = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      
      // For services dropdown, calculate position for the dialog
      if (id === 'services') {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate centered position vertically
        const dialogHeight = 300; // Approximate height, adjust as needed
        const topPosition = Math.max(0, rect.top - (dialogHeight / 2) + (rect.height / 2));
        
        // Ensure the dialog doesn't go off screen
        const adjustedTop = Math.min(topPosition, windowHeight - dialogHeight);
        
        setDropdownPosition({ top: adjustedTop });
        setShowServicesDialog(!showServicesDialog);
        return;
      }
    }

    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  // Close services dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showServicesDialog && !target.closest('.services-dialog') && !target.closest('.dropdown-arrow')) {
        setShowServicesDialog(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showServicesDialog]);

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
    setShowServicesDialog(false);
  };

  // Add class to body when menu is open to control z-index
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  // Reset dropdown when menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setOpenDropdown(null);
      setShowServicesDialog(false);
    }
  }, [isMenuOpen]);

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
        { href: "/services/redesigns", label: "Redesigns" },
        { href: "/services/web-app-design", label: "Web App Design" },
        { href: "/services/mobile-app-design", label: "Mobile App Design" },
        { href: "/services/website-app-design", label: "Website App Design" },
        { href: "/services/website-redesign", label: "Website Redesign" },
        { href: "/services/web-development-ecommerce", label: "Web Development Ecommerce" },
        { href: "/services/web-development-shopify", label: "Web Development Shopify" },
        { href: "/services/website-development-custom", label: "Website Development Custom" }
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

  // Find services for easier access
  const servicesLink = navigationLinks.find(link => link.id === 'services');

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

        /* Hamburger styling - FIXED for no shaking */
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

        /* Middle line shorter */
        .hamburger-line:nth-child(2) {
          width: 16px;
          margin-left: auto;
          transition: all 0.3s ease;
        }

        /* Fixed hamburger hover animation */
        .mobile-menu-toggle:hover .hamburger-line:nth-child(2),
        .hamburger-container:hover .hamburger-line:nth-child(2) {
          width: 20px;
        }

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

        /* Button styling */
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
          font-family: 'Barlow', sans-serif;
          margin-right: 20px;
        }

        .quote-button:hover {
          background-color: #0B8DAD;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(13, 152, 186, 0.3);
        }

        /* Mobile menu toggle button with hamburger */
        .mobile-menu-toggle {
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

        .mobile-menu-toggle:hover {
          background-color: #222222;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .mobile-menu-toggle:after {
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

        .mobile-menu-toggle:hover:after {
          opacity: 1;
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

        /* Fixed Hamburger to X animation - prevent shaking */
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

        /* Menu panel - Fixed width to exactly 400px */
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

        /* Close button in menu - positioned in line with logo */
        .navbar .menu-side .menu-header .menu-close {
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
          cursor: pointer !important; /* Add this line */
          transition: transform 0.3s ease !important; /* Improve transition effect */
        }

        /* Ensure the SVG is centered properly */
        .navbar .menu-side .menu-header .menu-close svg {
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

        /* Menu header with logo and close button in one row */
        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          width: 100%;
        }

        /* Menu logo styling - in line with close button */
        .menu-logo {
          display: flex;
          align-items: center;
        }

        /* Menu content structure */
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
          margin: 0.5rem 0;  /* Increased gap between nav links */
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

        /* Menu links with icons */
        .menu-link {
          color: white;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          padding: 0.6rem 0;  /* Increased padding for links */
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

        /* Dropdown Styles - IMPROVED */
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

        /* When dropdown is open, keep active color on the text */
        .menu-link-with-dropdown.active .menu-link-text,
        .menu-link-with-dropdown .menu-link-text.active {
          color: #00BCD4;
        }

        /* Change arrow color when active */
        .menu-link-with-dropdown.active .dropdown-arrow svg path {
          stroke: #00BCD4;
        }

        /* Ensure dropdown icon also has active color */
        .dropdown-toggle.active svg path {
          stroke: #00BCD4;
        }

        .menu-link-with-dropdown.active {
          color: #00BCD4;
        }
        
        /* Arrow icon next to Services text - ADDED GAP */
        .dropdown-icon {
          display: inline-flex;
          margin-left: 8px;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        /* Added space between Services text and dropdown arrow */
        .dropdown-arrow {
          margin-left: 10px;
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .menu-link-with-dropdown:hover .dropdown-arrow {
          opacity: 1;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          width: 30px;
          height: 30px;
          margin-left: auto;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .dropdown-toggle:hover {
          background-color: rgba(13, 152, 186, 0.25);
        }

        /* Original dropdown menu - keeping for reference */
        .dropdown-menu {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          margin-left: 35px;
          transition: max-height 0.5s ease, opacity 0.3s ease;
        }

        .dropdown-menu.open {
          max-height: 500px;
          opacity: 1;
        }

        /* NEW FLOATING SERVICES DIALOG */
        .services-dialog {
          position: fixed;
          left: 0;
          background-color: #050922;
          border-radius: 0 8px 8px 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
          padding: 1.5rem;
          z-index: 1001;
          max-width: 85vw;
          min-width: 300px;
          /* Animation */
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border-left: 4px solid #0D98BA;
        }

        .services-dialog.show {
          transform: translateX(0);
        }

        /* Dialog header */
        .services-dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.8rem;
        }

        .services-dialog-title {
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .services-dialog-title img {
          margin-right: 10px;
        }

        .services-dialog-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .services-dialog-close:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        /* Two column dropdown for services dialog */
        .services-dialog-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem 1.5rem;
          margin-top: 0.5rem;
        }

        .services-dialog-item {
          margin: 0.4rem 0;
        }

        .services-dialog-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          transition: all 0.3s ease;
          display: block;
          padding: 0.5rem 0;
          position: relative;
        }

        .services-dialog-link:hover {
          color: #00BCD4;
          transform: translateX(5px);
        }

        .services-dialog-link:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background-color: rgba(0, 188, 212, 0.5);
          transition: width 0.3s ease;
        }

        .services-dialog-link:hover:before {
          width: 20px;
        }

        /* Menu divider */
        .menu-divider {
          height: 2px;
          background-color: #00BCD4;
          margin: 1.5rem 0 2rem 0;  /* Increased top margin */
          width: 100%;
        }

        /* Updated Newsletter section */
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

        /* Updated newsletter form to match the design */
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
          top: 10px;
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

        /* Improved Social links */
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

        /* Improved hover effect for mobile */
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

        /* Ensure social icons are visible */
        .menu-social-link img {
          width: 20px !important;
          height: 20px !important;
          filter: brightness(1.2);
          position: relative;
          z-index: 2;
        }

        /* Overlay - ensure it covers the navbar */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 9, 34, 0.9);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                      visibility 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          backdrop-filter: blur(3px);
        }

        .overlay.show {
          opacity: 1;
          visibility: visible;
        }

        /* Make navbar appear under overlay when menu is open */
        .menu-open .navbar {
          z-index: 997;
        }

        /* Hide main logo when menu is open - now for all screen sizes including laptop */
        .menu-open .navbar .logo-container {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

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
        }

        /* Mobile view - IMPROVED */
        @media (max-width: 768px) {
          .container {
            padding: 1rem 1.5rem;
          }
          
          /* Menu keeps 400px width on mobile but shifts more */
          .menu-side {
            width: 400px;
            right: -400px;
            padding: 2rem 1.8rem 4rem; /* Added bottom padding for more space */
            overflow-y: auto; /* Allow scrolling for smaller screens */
          }
          
          .menu-links {
            margin-bottom: 2rem;
          }
          
          .menu-item {
            margin: 0.8rem 0; /* Increased spacing between items */
          }
    
          /* Two column service items on mobile */
          .dropdown-items-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem 1rem;
            margin-top: 0.5rem;
          }
          
          /* Improved header alignment */
          .menu-header {
            margin-bottom: 2.5rem;
            justify-content: space-between;
          }
          
          /* Adjust logo size for mobile */
          .logo-container img {
            width: 160px !important;
          }
          
          /* Adjust logo position on mobile */
          .logo-container {
            margin-left: -10px;
          }
          
          /* Adjust hamburger position on mobile */
          .button-container {
            margin-right: -15px;
          }
          
          /* Hide main navbar quote button on mobile */
          .navbar .container .quote-button {
            display: none !important;
          }
          
          /* Adjust hamburger size on mobile */
          .hamburger-container {
            margin-right: 5px;
          }
          
          .menu-content {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .menu-links {
            flex: 1;
          }

          /* Enhanced mobile dropdown */
          .dropdown-toggle {
            width: 32px;
            height: 32px;
          }

          /* Responsive newsletter on mobile */
          .menu-newsletter-form {
            height: 60px;
            padding: 0 15px;
          }
          
          .menu-newsletter-input {
            font-size: 14px;
          }
          
          /* Fixed Subscribe button position and size */
          .menu-newsletter-button {
            width: 80px;
            height: 40px;
            right: 10px;
            font-size: 13px;
            position: absolute;
            top: 10px;
            border-radius: 5px;
          }
          
          .menu-newsletter-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(13, 152, 186, 0.3);
          }
          
          /* Enhanced mobile social links - Improved hover effects */
          .menu-social {
            gap: 1.2rem;
            justify-content: center;
          }
          
          .menu-social-link {
            width: 46px;
            height: 46px;
          }
          
          /* Mobile-specific hover improvements */
          .menu-social-link:before {
            transform: scale(0.7);
          }
          
          .menu-social-link:hover:before {
            transform: scale(1.1);
          }
          
          /* Adjust services dialog for mobile */
          .services-dialog {
            max-width: 90vw;
            min-width: 280px;
            padding: 1.2rem;
          }
          
          .services-dialog-grid {
            gap: 0.5rem 1rem;
          }
        }

        /* For very small mobile screens, make menu full width */
        @media (max-width: 420px) {
          .menu-side {
            width: 100%;
            right: -100%;
            padding: 1.8rem 1.5rem;
          }
          
          .menu-side.open {
            transform: translateX(-100%);
          }
          
          /* Enhanced menu items spacing on small screens */
          .menu-links {
            margin-top: 0.8rem;
          }
          
          .menu-item {
            margin: 0.7rem 0;
          }
          
          /* Improved dropdown spacing for tiny screens */
          .dropdown-arrow {
            margin-left: 8px;
          }
          
          /* Maintain two-column layout but adjust for tiny screens */
          .dropdown-items-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.4rem 0.7rem;
          }
          
          /* Adjusted Subscribe button for tiny screens */
          .menu-newsletter-button {
            width: 80px;
            right: 8px;
          }
          
          /* Full width services dialog on tiny screens */
          .services-dialog {
            max-width: 100vw;
            padding: 1rem;
          }
          
          .services-dialog-grid {
            gap: 0.4rem 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0.9rem 1.2rem;
          }
          
          .hamburger-container {
            width: 42px;
            height: 42px;
            margin-right: 0;
          }
          
          /* Further adjust logo size for small screens */
          .logo-container img {
            width: 140px !important;
          }
          
          .logo-container {
            margin-left: -5px;
          }
          
          .button-container {
            margin-right: -10px;
          }

          /* Smaller newsletter on very small screens */
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
          
          /* Improved hover circle effect on mobile */
          .menu-social-link:hover:before {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}
          </style>

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

        {/* Side Menu - Updated to match the provided design */}
        <div 
          className={`menu-side ${isMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMenuOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Menu header with logo and close button in one row */}
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

          {/* Navigation links with icons and dropdowns */}
          <ul className="menu-links">
            {navigationLinks.map((link) => (
              <li className="menu-item" key={link.id}>
                {link.hasDropdown ? (
  <>
    <div 
      className={`menu-link menu-link-with-dropdown ${activeLink === link.id ? 'active' : ''}`}
    >
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
        className={`dropdown-arrow ${openDropdown === link.id ? 'open' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown(link.id);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown(link.id);
          }
        }}
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
    
    <div className={`dropdown-menu ${openDropdown === link.id ? 'open' : ''}`}>
      <div className="dropdown-items-grid">
        {link.dropdownItems?.map((item, index) => (
          <div className="dropdown-item" key={index}>
            <Link 
              href={item.href} 
              className="dropdown-link"
              onClick={() => handleLinkClick(link.id)}
              aria-label={item.label}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </>
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

          {/* Newsletter section */}
          <div className="menu-newsletter">
            <span className="menu-newsletter-title">Get updates</span>
            
            <form 
              className="menu-newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter subscription
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

          {/* Social media links */}
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

        {/* Overlay that appears when menu is open */}
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
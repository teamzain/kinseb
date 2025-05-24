
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

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
          margin-left: -70px; /* Increased left margin to move logo more to left */
        }

        .logo-container img {
          transition: transform 0.3s ease;
          width: 190px !important; /* Make logo bigger */
          height: auto !important;
          object-fit: contain;
        }

        .logo-container:hover img {
          transform: translateY(-2px);
        }

        .button-container {
          display: flex;
          align-items: center;
          margin-right: -70px; /* Move the container more to the right */
          margin-left: auto; /* Push the container to the right */
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
          margin-right: 20px; /* Space between button and hamburger */
        }

        .quote-button:hover {
          background-color: #0B8DAD;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(13, 152, 186, 0.3);
        }

        /* Hamburger container */
        .hamburger-container {
          background-color: #1A1A1A;
          border-radius: 6px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1001;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          margin-left: auto; /* Push to right */
          margin-right: 10px; /* Add some space from the edge */
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

        /* Hamburger styling */
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
          background-color: #809B0D; /* Primary green color */
          border-radius: 1px;
          transition: transform 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6),
                     opacity 0.3s ease,
                     width 0.3s ease;
        }

        /* Middle line shorter */
        .hamburger-line:nth-child(2) {
          width: 16px;
          margin-left: auto;
          transition: transform 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6),
                     opacity 0.3s ease,
                     width 0.3s ease,
                     margin-left 0.3s ease;
        }

        .hamburger-container:hover .hamburger-line:nth-child(2) {
          width: 20px;
        }

        /* Hamburger to X animation */
        .hamburger.active .hamburger-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
          width: 24px;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Menu panel */
        .menu-side {
          position: fixed;
          top: 0;
          right: -320px;
          width: 320px;
          height: 100vh;
          background-color: #091135;
          z-index: 1000;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
          overflow-y: auto;
          padding: 6rem 2.5rem 2.5rem;
          background-image: linear-gradient(135deg, #091135 0%, #0E1C4A 100%);
        }

        .menu-side:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #809B0D, transparent);
          opacity: 0.4;
        }

        .menu-side.open {
          transform: translateX(-320px);
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
          margin: 0 0 2.5rem 0;
        }

        .menu-item {
          margin: 1.2rem 0;
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

        /* Menu links */
        .menu-link {
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          padding: 0.6rem 0;
          letter-spacing: 0.5px;
          position: relative;
          font-family: 'Barlow', sans-serif;
        }

        .menu-link:before {
          content: '';
          position: absolute;
          left: -18px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #809B0D;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
        }

        .menu-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background-color: #809B0D;
          bottom: 0;
          left: 0;
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .menu-link:hover {
          color: #809B0D;
          transform: translateX(5px);
        }

        .menu-link:hover:before {
          opacity: 1;
          transform: scale(1);
        }

        .menu-link:hover:after {
          width: 40px;
        }

        .menu-link.active {
          color: #809B0D;
          font-weight: 600;
        }

        .menu-link.active:before {
          opacity: 1;
          transform: scale(1);
        }

        .menu-link.active:after {
          width: 40px;
        }

        /* Menu CTA button */
        .menu-cta {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transition-delay: 0.45s;
          text-align: center;
          margin-top: 1.5rem;
          display: none; /* Hide the CTA button in the menu */
        }

        .menu-side.open .menu-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* Menu CTA Button with enhanced styling - HIDDEN IN MENU */
        .menu-side .quote-button {
          margin-right: 0;
          padding: 0.85rem 2rem;
          width: 100%;
          text-align: center;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 6px 15px rgba(13, 152, 186, 0.25);
          display: none !important; /* Force hide in menu */
        }

        .menu-side .quote-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
          z-index: -1;
        }

        .menu-side .quote-button:hover:before {
          left: 100%;
        }

        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 17, 53, 0.95), rgba(9, 17, 53, 0.85));
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                      visibility 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          backdrop-filter: blur(5px);
        }

        .overlay.show {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 1400px) {
          .container {
            padding: 1.1rem 3rem;
          }
          
          .button-container {
            margin-right: -60px; /* Slightly less margin on smaller screens */
          }
        }

        /* Tablet view */
        @media (max-width: 992px) {
          .container {
            padding: 1rem 2rem;
          }
          
          .logo-container {
            margin-left: -40px; /* Less margin on tablet */
          }
          
          .button-container {
            margin-right: -40px; /* Adjusted margin for tablet */
          }
          
          .quote-button {
            padding: 0.65rem 1.2rem; /* Smaller padding */
            font-size: 0.9rem; /* Smaller font */
          }
        }

        /* Mobile view */
        @media (max-width: 768px) {
          .container {
            padding: 1rem 1.5rem;
          }
          
          .menu-side {
            width: 280px;
            right: -280px;
          }
          
          .menu-side.open {
            transform: translateX(-280px);
          }
          
          .menu-content {
            padding: 5rem 2rem 2rem;
          }
          
          /* Adjust logo size for mobile */
          .logo-container img {
            width: 160px !important;
          }
          
          /* Adjust logo position on mobile */
          .logo-container {
            margin-left: -10px; /* Move logo more to the right on mobile compared to desktop */
          }
          
          /* Adjust hamburger position on mobile */
          .button-container {
            margin-right: -15px; /* Less margin on mobile */
          }
          
          /* Hide main navbar quote button on mobile */
          .navbar .container .quote-button {
            display: none !important;
          }
          
          /* Adjust hamburger size on mobile */
          .hamburger-container {
            margin-right: 5px;
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
            margin-left: -5px; /* Even less margin on very small screens */
          }
          
          .button-container {
            margin-right: -10px; /* Adjusted for small screens */
          }
        }
        
        /* For portrait tablet orientation */
        @media (min-width: 768px) and (max-width: 992px) and (orientation: portrait) {
          .button-container {
            margin-right: -30px;
          }
          
          .quote-button {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }
        }
        
        /* For landscape tablet orientation */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
          .button-container {
            margin-right: -50px;
          }
          
          .container {
            padding: 1rem 2.5rem;
          }
        }
      `}</style>

      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container">
          <div className="logo-container">
            <Link href="/" aria-label="Homepage">
              <Image 
                src="/images/logo.png" 
                alt="Company Logo" 
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

        {/* Side Menu with Enhanced Animation */}
        <div 
          className={`menu-side ${isMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMenuOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="menu-content">
            <ul className="menu-links">
              {navigationLinks.map((link) => (
                <li className="menu-item" key={link.id}>
                  <Link href={link.href} 
                    className={`menu-link ${activeLink === link.id ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.id)}
                    aria-current={activeLink === link.id ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="menu-cta">
              <Link href="/quote" className="quote-button" onClick={() => setIsMenuOpen(false)} aria-label="Request A Quote">
                Request A Quote
              </Link>
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
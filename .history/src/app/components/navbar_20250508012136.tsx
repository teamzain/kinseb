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
icon?: string; // Added icon property for navigation links
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

// Fix TypeScript error by specifying the parameter type
const handleLinkClick = (link: string) => {
setActiveLink(link);
setIsMenuOpen(false);
};

// Add class to body when menu is open to control z-index
useEffect(() => {
if (isMenuOpen) {
document.body.classList.add('menu-open');
} else {
document.body.classList.remove('menu-open');
}
}, [isMenuOpen]);

// Don't render until client-side to prevent hydration errors
if (!mounted) {
return null;
}

// Navigation links for SEO and DRY code
const navigationLinks: NavigationLink[] = [
{ href: "/", label: "Home", id: "home", icon: "/icons/home-icon.svg" },
{ href: "/services", label: "Services", id: "services", icon: "/icons/services-icon.svg" },
{ href: "/portfolio", label: "Portfolio", id: "portfolio", icon: "/icons/portfolio-icon.svg" },
{ href: "/about", label: "About", id: "about", icon: "/icons/about-icon.svg" },
{ href: "/contact", label: "Contact", id: "contact", icon: "/icons/contact-icon.svg" }
];

// Social media links
const socialLinks = [
{ href: "https://twitter.com", icon: "/icons/twitter-icon.svg", label: "Twitter" },
{ href: "https://facebook.com", icon: "/icons/facebook-icon.svg", label: "Facebook" },
{ href: "https://instagram.com", icon: "/icons/instagram-icon.svg", label: "Instagram" },
{ href: "https://linkedin.com", icon: "/icons/linkedin-icon.svg", label: "LinkedIn" }
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
  background-color: #809B0D;
  border-radius: 1px;
  transition: all 0.3s ease;
}

/* Middle line shorter */
.hamburger-line:nth-child(2) {
  width: 16px;
  margin-left: auto;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover .hamburger-line:nth-child(2) {
  width: 20px;
}
.navbar {
  background-color: #020210;
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
  background-color: #809B0D;
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

/* Menu panel - Updated to match the provided design */
.menu-side {
  position: fixed;
  top: 0;
  right: -340px;
  width: 340px;
  height: 100vh;
  background-color: #050922;
  z-index: 1000;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 2.5rem 2.5rem 2.5rem;
}

.menu-side.open {
  transform: translateX(-340px);
}

/* Close button in menu */
.menu-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.menu-close:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: rotate(90deg);
}

/* Menu logo styling */
.menu-logo {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  margin: 0.8rem 0;
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
  padding: 0.75rem 0;
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

/* Menu divider */
.menu-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
  width: 100%;
}

/* Newsletter section */
.menu-newsletter {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

.menu-newsletter-title {
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  position: relative;
  display: inline-block;
}

.menu-newsletter-title:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #00BCD4;
}

.menu-newsletter-form {
  display: flex;
  margin-bottom: 1rem;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.menu-newsletter-input {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px 0 0 4px;
  padding: 0.7rem 1rem;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.menu-newsletter-input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 188, 212, 0.5);
}

.menu-newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.menu-newsletter-button {
  background-color: #00BCD4;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 1rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.menu-newsletter-button:hover {
  background-color: #00ACC1;
  box-shadow: 0 0 10px rgba(0, 188, 212, 0.4);
}

.menu-newsletter-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  line-height: 1.5;
}

/* Social links */
.menu-social {
  display: flex;
  margin-top: 2rem;
  gap: 1.2rem;
}

.menu-social-link {
  color: white;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.08);
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
  background: radial-gradient(circle at center, rgba(0, 188, 212, 0.4) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-social-link:hover {
  background-color: rgba(0, 188, 212, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.menu-social-link:hover:before {
  opacity: 0.6;
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

/* Mobile view */
@media (max-width: 768px) {
  .container {
    padding: 1rem 1.5rem;
  }
  
  .menu-side {
    width: 300px;
    right: -300px;
    padding: 2rem;
  }
  
  .menu-side.open {
    transform: translateX(-300px);
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

{/* Side Menu - Updated to match the provided design */}
<div 
  className={`menu-side ${isMenuOpen ? 'open' : ''}`}
  aria-hidden={!isMenuOpen}
  role="dialog"
  aria-modal="true"
  aria-label="Navigation Menu"
>
  {/* Close button (X) - using SVG for better styling */}
  <button 
    className="menu-close" 
    onClick={() => setIsMenuOpen(false)}
    aria-label="Close menu"
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L5 15" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 5L15 15" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
  
  {/* Logo in the menu - Just the image, moved to its own line */}
  <div className="menu-logo">
    <Image 
      src="/images/logo-full.png" 
      alt="Kinseb Web Development" 
      width={180} 
      height={50}
      priority
    />
  </div>

    {/* Navigation links with icons */}
    <ul className="menu-links">
      {navigationLinks.map((link) => (
        <li className="menu-item" key={link.id}>
          <Link href={link.href} 
            className={`menu-link ${activeLink === link.id ? 'active' : ''}`}
            onClick={() => handleLinkClick(link.id)}
            aria-current={activeLink === link.id ? 'page' : undefined}
          >
            <span className="menu-link-icon">
              <Image
                src={link.icon || "/icons/default-icon.svg"}
                alt=""
                width={20}
                height={20}
              />
            </span>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>

    {/* Divider - removed to save space */}
    
    {/* Newsletter signup */}
    <div className="menu-newsletter">
      <h3 className="menu-newsletter-title">Get updates</h3>
      <div className="menu-newsletter-form">
        <input
          type="email"
          className="menu-newsletter-input"
          placeholder="example@gmail.com"
          aria-label="Email for newsletter"
        />
        <button className="menu-newsletter-button" aria-label="Subscribe">
          Send
        </button>
      </div>
      <p className="menu-newsletter-text">
        Stay informed! Sign up now for direct updates and exclusive insights.
      </p>
    </div>

    {/* Social media icons */}
    <div className="menu-social">
      {socialLinks.map((social, index) => (
        <a 
          key={index}
          href={social.href}
          className="menu-social-link"
          aria-label={social.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={social.icon}
            alt={social.label}
            width={18}
            height={18}
          />
        </a>
      ))}
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
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define an interface for navigation links
interface NavigationLink {
  href: string;
  label: string;
  id: string;
  icon: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');

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

  // Handle link click
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // Handle email subscription
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your email subscription logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  // Don't render until client-side to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // Navigation links with icons
  const navigationLinks: NavigationLink[] = [
    { href: "/", label: "Home", id: "home", icon: "/images/icons/home.svg" },
    { href: "/services", label: "Services", id: "services", icon: "/images/icons/services.svg" },
    { href: "/portfolio", label: "Portfolio", id: "portfolio", icon: "/images/icons/portfolio.svg" },
    { href: "/about", label: "About", id: "about", icon: "/images/icons/about.svg" },
    { href: "/contact", label: "Contact", id: "contact", icon: "/images/icons/contact.svg" }
  ];

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }

        .navbar {
          background-color: #020210;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          height: 80px;
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          height: 100%;
        }

        .logo-container {
          display: flex;
          align-items: center;
          z-index: 1001;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          margin-left: 0.75rem;
        }

        .logo-brand {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .logo-tagline {
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* Hamburger container */
        .hamburger-container {
          background-color: transparent;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1001;
        }

        /* Close button styling */
        .close-button {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 32px;
          height: 32px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1002;
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
          transition: transform 0.4s ease;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 4rem 2rem 2rem;
        }

        .menu-side.open {
          transform: translateX(-320px);
        }

        /* Menu content structure */
        .menu-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .menu-links {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 1rem;
        }

        .menu-item {
          margin: 0.5rem 0;
        }

        /* Menu links */
        .menu-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          position: relative;
        }

        .menu-link.active {
          color: #00E0FF;
        }

        .menu-link-icon {
          margin-right: 1rem;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00E0FF;
        }

        .menu-link-active-indicator {
          position: absolute;
          left: -1rem;
          width: 3px;
          height: 100%;
          background-color: #00E0FF;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .menu-link.active .menu-link-active-indicator {
          transform: scaleY(1);
        }

        /* Newsletter section */
        .newsletter-section {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-section h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          margin-bottom: 1rem;
        }

        .newsletter-input {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px 0 0 4px;
          color: white;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-button {
          background-color: #00E0FF;
          color: #091135;
          font-weight: 600;
          padding: 0 1.5rem;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-button:hover {
          background-color: #33E6FF;
        }

        .newsletter-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        /* Social icons */
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: transform 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
        }

        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .overlay.show {
          opacity: 1;
          visibility: visible;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .menu-side {
            width: 280px;
            right: -280px;
          }
          
          .menu-side.open {
            transform: translateX(-280px);
          }
        }
      `}</style>

      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container">
          <div className="logo-container">
            <Link href="/" aria-label="Homepage">
              <Image 
                src="/images/logo.svg" 
                alt="Kinseb Logo" 
                width={40} 
                height={40} 
                priority
              />
             
            </Link>
          </div>
          
          <div className="hamburger-container" onClick={toggleMenu} aria-label="Open Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
          <div className="close-button" onClick={toggleMenu} aria-label="Close Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="logo-container">
            <Image 
              src="/images/logo.svg" 
              alt="Kinseb Logo" 
              width={40} 
              height={40}
              priority
            />
            <div className="logo-text">
              <span className="logo-brand">KINSEB</span>
              <span className="logo-tagline">WEB DEVELOPMENT</span>
            </div>
          </div>
          
          <div className="menu-content">
            <ul className="menu-links">
              {navigationLinks.map((link) => (
                <li className="menu-item" key={link.id}>
                  <Link href={link.href} 
                    className={`menu-link ${activeLink === link.id ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.id)}
                    aria-current={activeLink === link.id ? 'page' : undefined}
                  >
                    <span className="menu-link-active-indicator"></span>
                    <span className="menu-link-icon">
                      <Image src={link.icon} alt="" width={20} height={20} />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="newsletter-section">
              <h3>Get updates</h3>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  className="newsletter-input"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-button">Send</button>
              </form>
              <p className="newsletter-text">
                Stay informed! Sign up now for direct updates and exclusive insights.
              </p>
              
              <div className="social-links">
                <a href="https://twitter.com" className="social-icon" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4.01C21 4.5 20.02 4.84 19 5C18.05 4.13 16.74 3.58 15.26 3.58C12.41 3.58 10.1 5.89 10.1 8.74C10.1 9.13 10.15 9.5 10.23 9.86C6.5 9.65 3.27 7.61 1.35 4.69C1.01 5.42 0.83 6.22 0.83 7.09C0.83 8.75 1.61 10.21 2.8 11.06C2.1 11.03 1.43 10.84 0.85 10.5V10.54C0.85 13.05 2.5 15.13 4.76 15.58C4.42 15.68 4.06 15.73 3.69 15.73C3.37 15.73 3.05 15.7 2.75 15.63C3.37 17.64 5.15 19.13 7.27 19.16C5.6 20.55 3.45 21.38 1.13 21.38C0.73 21.38 0.35 21.36 0 21.3C2.16 22.8 4.71 23.65 7.46 23.65C15.26 23.65 19.8 17.1 19.8 11.36L19.79 10.73C20.83 9.97 21.7 9.01 22.4 7.92C21.5 8.32 20.52 8.58 19.5 8.7C20.57 8.02 21.38 6.93 21.77 5.65C20.77 6.28 19.65 6.74 18.45 6.98C17.5 6 16.15 5.39 14.66 5.39C11.78 5.39 9.45 7.7 9.45 10.57C9.45 10.96 9.49 11.33 9.58 11.69C5.37 11.49 1.65 9.39 -0.5 6.06C-0.87 6.82 -1.05 7.66 -1.05 8.56C-1.05 10.2 -0.2 11.66 1.04 12.52C0.28 12.5 -0.45 12.3 -1.09 11.96V12.02C-1.09 14.53 0.75 16.65 3.15 17.1C2.83 17.2 2.48 17.25 2.12 17.25C1.84 17.25 1.58 17.23 1.31 17.18C1.86 19.26 3.76 20.79 6.03 20.82C4.24 22.24 1.99 23.09 -0.47 23.09C-0.82 23.09 -1.17 23.07 -1.5 23.04C0.8 24.53 3.46 25.4 6.34 25.4C13.95 25.4 18.27 19.14 18.27 13.67C18.27 13.46 18.27 13.26 18.26 13.05C19.27 12.33 20.17 11.4 20.88 10.35L22 4.01Z" />
                  </svg>
                </a>
                <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" />
                  </svg>
                </a>
                <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.02 2.286 18.855 2.491 19.577 2.786C20.321 3.087 20.941 3.483 21.561 4.103C22.181 4.723 22.577 5.343 22.878 6.087C23.173 6.809 23.378 7.644 23.431 8.814C23.489 10.08 23.501 10.46 23.501 13.664C23.501 16.868 23.489 17.248 23.431 18.514C23.378 19.684 23.173 20.519 22.878 21.241C22.577 21.985 22.181 22.605 21.561 23.225C20.941 23.845 20.321 24.241 19.577 24.542C18.855 24.837 18.02 25.042 16.85 25.095C15.584 25.153 15.204 25.165 12 25.165C8.796 25.165 8.416 25.153 7.15 25.095C5.98 25.042 5.145 24.837 4.423 24.542C3.679 24.241 3.059 23.845 2.439 23.225C1.819 22.605 1.423 21.985 1.122 21.241C0.827 20.519 0.622 19.684 0.569 18.514C0.511 17.248 0.499 16.868 0.499 13.664C0.499 10.46 0.511 10.08 0.569 8.814C0.622 7.644 0.827 6.809 1.122 6.087C1.423 5.343 1.819 4.723 2.439 4.103C3.059 3.483 3.679 3.087 4.423 2.786C5.145 2.491 5.98 2.286 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.775 0.13 4.905 0.333 4.14 0.63C3.351 0.936 2.682 1.347 2.014 2.014C1.347 2.682 0.935 3.35 0.63 4.14C0.333 4.905 0.13 5.775 0.072 7.053C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.667 0.072 16.947C0.13 18.225 0.333 19.095 0.63 19.86C0.936 20.649 1.347 21.318 2.014 21.986C2.682 22.653 3.35 23.065 4.14 23.37C4.905 23.667 5.775 23.87 7.053 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.667 23.986 16.947 23.928C18.225 23.87 19.095 23.667 19.86 23.37C20.649 23.064 21.318 22.653 21.986 21.986C22.653 21.318 23.065 20.65 23.37 19.86C23.667 19.095 23.87 18.225 23.928 16.947C23.986 15.667 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.87 5.775 23.667 4.905 23.37 4.14C23.064 3.351 22.653 2.682 21.986 2.014C21.318 1.347 20.65 0.935 19.86 0.63C19.095 0.333 18.225 0.13 16.947 0.072C15.667 0.014 15.259 0 12 0Z" />
                    <path d="M12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z" />
                    <path d="M18.406 7.034C19.2355 7.034 19.906 6.36346 19.906 5.534C19.906 4.70453 19.2355 4.034 18.406 4.034C17.5765 4.034 16.906 4.70453 16.906 5.534C16.906 6.36346 17.5765 7.034 18.406 7.034Z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" />
                    <path d="M6 9H2V21H6V9Z" />
                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" />
                  </svg>
                </a>
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
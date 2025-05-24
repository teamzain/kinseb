'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Facebook, Linkedin, Instagram, ChevronDown } from 'lucide-react';

// Define TypeScript interfaces for better type safety
interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
  ariaLabel: string;
}

const Footer = () => {
  // State to track which section is expanded on mobile (only one at a time)
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // State for newsletter email input
  const [email, setEmail] = useState('');
  
  // Toggle section expansion (close others when opening a new one)
  const toggleSection = (title: string) => {
    setExpandedSection(prev => prev === title ? null : title);
  };
  
  // Handle newsletter form submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log('Subscribing email:', email);
    // Reset email field after submission
    setEmail('');
    // Provide user feedback (in a real app)
    alert('Thank you for subscribing!');
  };
  
  // Social media links with proper aria labels
  const socialLinks = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  ];
  
  // Footer columns with links and semantic aria labels
  const footerColumns: FooterColumn[] = [
    {
      title: "Company",
      ariaLabel: "Company links",
      links: [
        { href: "/about-us", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
        { href: "/careers", label: "Careers" },
      ]
    },
    {
      title: "Product",
      ariaLabel: "Product links",
      links: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/news", label: "News" },
        { href: "/help-desk", label: "Help Desk" },
        { href: "/support", label: "Support" },
      ]
    },
    {
      title: "Services",
      ariaLabel: "Services links",
      links: [
        { href: "/digital-marketing", label: "Digital Marketing" },
        { href: "/content-writing", label: "Content Writing" },
        { href: "/seo-for-business", label: "SEO for Business" },
        { href: "/ui-design", label: "UI Design" },
      ]
    },
    {
      title: "Legal",
      ariaLabel: "Legal links",
      links: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms-conditions", label: "Terms & Conditions" },
        { href: "/return-policy", label: "Return Policy" },
      ]
    },
  ];
  
  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Company Description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Link href="/" aria-label="KinSeb Web Development - Homepage">
                <Image 
                  src="/images/logo.png" 
                  alt="KinSeb Web Development Logo" 
                  width={200} 
                  height={50} 
                  priority
                  className="logo-image"
                />
              </Link>
            </div>
            <p className="footer-description">
              We are a professional web development and design team that will transform your ideas into amazing digital experiences.
            </p>
            <div className="footer-social" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="social-icon"
                  aria-label={`Follow us on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Link Columns */}
          {footerColumns.map((column, index) => (
            <div className="footer-column" key={index}>
              <div 
                className="footer-column-header" 
                onClick={() => toggleSection(column.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSection(column.title);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={expandedSection === column.title}
                aria-controls={`footer-links-${index}`}
              >
                <h3 className="footer-column-title">{column.title}</h3>
                <span 
                  className={`chevron-icon ${expandedSection === column.title ? 'rotate' : ''}`}
                  aria-hidden="true"
                >
                  <ChevronDown size={18} />
                </span>
              </div>
              <ul 
                id={`footer-links-${index}`}
                className={`footer-links ${expandedSection === column.title ? 'expanded' : ''}`}
                aria-label={column.ariaLabel}
                aria-hidden={expandedSection !== column.title && window.innerWidth <= 768}
              >
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="footer-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter Subscription */}
          <div className="newsletter-column">
            <h3 className="newsletter-title">Subscribe newsletter</h3>
            <form 
              className="newsletter-form" 
              onSubmit={handleSubscribe}
              aria-label="Newsletter subscription form"
            >
              <div className="input-container">
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input 
                  id="email-input"
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                />
                <button 
                  type="submit" 
                  className="newsletter-button"
                  aria-label="Sign up for newsletter"
                >
                  Sign Up
                </button>
              </div>
              <div className="consent-checkbox">
                <input 
                  type="checkbox" 
                  id="consent" 
                  required 
                  aria-required="true"
                />
                <label htmlFor="consent" className="consent-text">
                  I'm okay with getting emails and having them tracked to improve my experience
                </label>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} KinSeb Web Development. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Base Styles */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .footer {
          background: linear-gradient(135deg, #020210 0%, #10102b 50%, #0a0a25 100%);
          color: white;
          padding: 4rem 0 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'Barlow', sans-serif;
        }
        
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          width: 100%;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 2rem;
        }
        
        /* Logo Section */
        .footer-brand {
          display: flex;
          flex-direction: column;
          padding-right: 2rem;
        }
        
        .logo-image {
          object-fit: contain;
        }
        
        .footer-logo {
          margin-bottom: 1rem;
          display: block;
        }
        
        .footer-description {
          color: #B0B0B0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 100%;
        }
        
        /* Social Media Links */
        .footer-social {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          color: #B0B0B0;
        }
        
        .social-icon:hover {
          background-color: #809B0D;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        /* Column Styles */
        .footer-column {
          display: flex;
          flex-direction: column;
        }
        
        .footer-column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }
        
        .chevron-icon {
          display: none;
          transition: transform 0.3s ease;
        }
        
        .chevron-icon.rotate {
          transform: rotate(180deg);
        }
        
        .footer-column-title {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 0.8rem;
          margin: 0;
        }
        
        .footer-column-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: #809B0D;
        }
        
        /* Link Lists */
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          list-style: none;
          padding: 0;
          margin: 0;
          transition: max-height 0.3s ease;
          overflow: hidden;
          max-height: 500px; /* Default height for desktop */
        }
        
        .footer-link {
          color: #B0B0B0;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 0;
          display: inline-block;
        }
        
        .footer-link:hover {
          color: #809B0D;
          transform: translateX(3px);
        }
        
        .footer-link:before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          width: 0;
          height: 0;
          background-color: #809B0D;
          border-radius: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .footer-link:hover:before {
          width: 5px;
          height: 5px;
          left: -12px;
          opacity: 1;
        }
        
        /* Newsletter Section */
        .newsletter-column {
          display: flex;
          flex-direction: column;
          grid-column: span 1;
        }
        
        .newsletter-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
          position: relative;
          padding-bottom: 0.8rem;
        }
        
        .newsletter-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: #809B0D;
        }
        
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .input-container {
          display: flex;
          width: 100%;
        }
        
        .newsletter-input {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.8rem 1rem;
          border-radius: 4px 0 0 4px;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .newsletter-input:focus {
          border-color: #4361EE;
          background-color: rgba(255, 255, 255, 0.12);
        }
        
        .newsletter-input::placeholder {
          color: #7A7A7A;
        }
        
        .newsletter-button {
          background: linear-gradient(90deg, #809B0D 0%, #5A700A 100%);
          color: white;
          border: none;
          padding: 0 1.5rem;
          border-radius: 0 4px 4px 0;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .newsletter-button:hover {
          background: linear-gradient(90deg, #97B810 0%, #6B830B 100%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .newsletter-button:focus {
          outline: 2px solid #809B0D;
          outline-offset: 2px;
        }
        
        /* Checkbox styling */
        .consent-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        
        .consent-checkbox input {
          margin-top: 0.25rem;
          cursor: pointer;
        }
        
        .consent-text {
          color: #7A7A7A;
          font-size: 0.85rem;
          line-height: 1.5;
        }
        
        /* Footer Bottom / Copyright */
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: center;
          text-align: center;
        }
        
        .copyright {
          color: #7A7A7A;
          font-size: 0.85rem;
        }
        
        /* Responsive styles */
        @media (max-width: 1200px) {
          .footer-content {
            grid-template-columns: 1.2fr repeat(4, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 1100px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          
          .footer-brand {
            grid-column: span 3;
            margin-bottom: 1.5rem;
            padding-right: 0;
          }
          
          .newsletter-column {
            grid-column: span 3;
            margin-top: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .footer-container {
            padding: 0 2rem;
          }
          
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 0;
          }
          
          .footer-brand {
            grid-column: span 2;
            margin-bottom: 2rem;
          }
          
          .chevron-icon {
            display: block;
          }
          
          .footer-links {
            max-height: 0;
            margin-bottom: 1rem;
          }
          
          .footer-links.expanded {
            max-height: 500px;
          }
          
          .newsletter-column {
            grid-column: span 2;
            margin-top: 1rem;
          }
          
          .footer-column {
            margin-bottom: 0.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .footer {
            padding: 3rem 0 1.5rem;
          }
          
          .footer-container {
            padding: 0 1.5rem;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
          }
          
          .footer-brand {
            grid-column: 1;
            margin-bottom: 2rem;
          }
          
          .footer-column-header {
            margin-bottom: 0;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .footer-column-title {
            margin-bottom: 0;
            padding-bottom: 0;
          }
          
          .footer-column-title:after {
            display: none;
          }
          
          .newsletter-column {
            grid-column: 1;
            margin-top: 1.5rem;
          }
          
          .input-container {
            flex-direction: column;
          }
          
          .newsletter-input {
            border-radius: 4px;
          }
          
          .newsletter-button {
            margin-top: 0.5rem;
            width: 100%;
            padding: 0.8rem;
            border-radius: 4px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
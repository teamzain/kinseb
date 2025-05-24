'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Facebook, Linkedin, Instagram, ChevronDown } from 'lucide-react';
import { Metadata } from 'next';

// Define interfaces for footer links
interface FooterLink {
  href: string;
  label: string;
  description?: string; // Added for SEO - description for each link
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Schema.org Organization JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Web Development",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/images/logo.png",
  "description": "Professional web development and design team that transforms ideas into amazing digital experiences.",
  "sameAs": [
    "https://twitter.com/webdevelopment",
    "https://facebook.com/webdevelopment",
    "https://linkedin.com/company/webdevelopment",
    "https://instagram.com/webdevelopment"
  ]
};

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
  };
  
  // Social media links with Lucide icons - Added descriptive labels and aria-labels for accessibility and SEO
  const socialLinks = [
    { href: "https://twitter.com/webdevelopment", icon: Twitter, label: "Twitter", description: "Follow us on Twitter for the latest updates" },
    { href: "https://facebook.com/webdevelopment", icon: Facebook, label: "Facebook", description: "Connect with us on Facebook" },
    { href: "https://linkedin.com/company/webdevelopment", icon: Linkedin, label: "LinkedIn", description: "Follow our company on LinkedIn" },
    { href: "https://instagram.com/webdevelopment", icon: Instagram, label: "Instagram", description: "See our work and culture on Instagram" },
  ];
  
  // Footer columns with links - Added descriptions and improved labels for SEO
  const footerColumns: FooterColumn[] = [
    {
      title: "Company",
      links: [
        { href: "/about-us", label: "About Us", description: "Learn about our company history and values" },
        { href: "/contact-us", label: "Contact Us", description: "Get in touch with our team" },
       
      ]
    },
    {
      title: "Product",
      links: [
        { href: "/features", label: "Features", description: "Explore our product features" },
        { href: "/pricing", label: "Pricing Plans", description: "View our competitive pricing options" },
        { href: "/news", label: "Latest News", description: "Stay updated with our latest announcements" },
        { href: "/help-desk", label: "Help Desk", description: "Get assistance with our products" },
        { href: "/support", label: "Customer Support", description: "Access our customer support resources" },
      ]
    },
    {
      title: "Services",
      links: [
        { href: "/digital-marketing", label: "Digital Marketing Services", description: "Boost your online presence with our digital marketing expertise" },
        { href: "/content-writing", label: "Content Writing", description: "Professional content creation services" },
        { href: "/seo-for-business", label: "SEO for Business", description: "Improve your search engine rankings" },
        { href: "/ui-design", label: "UI Design", description: "Create beautiful and functional user interfaces" },
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy-policy", label: "Privacy Policy", description: "Read our privacy policy" },
        { href: "/terms-conditions", label: "Terms & Conditions", description: "Review our terms and conditions" },
        
      ]
    },
  ];

  return (
    <>
      <style jsx global>{`
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
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1fr repeat(5, 1fr);
          gap: 2rem;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          padding-right: 2rem;
        }
        .footer-logo {
          margin-bottom: 1rem;
       
        }
        .footer-description {
          color: #B0B0B0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
           
          max-width: 100%; /* Increased from 95% to 100% */
        }
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
        }
        .footer-column {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
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
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          list-style: none;
          padding: 0;
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
        .newsletter-column {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
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
          width: 100%;
          max-width: 400px; /* Increased width */
        }
        .input-container {
          display: flex;
          width: 100%;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
        }
        .newsletter-input {
          flex: 1;
          background-color: transparent;
          border: none;
          color: white;
          padding: 0.8rem 1rem;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
          width: 100%;
          padding-right: 0px; /* Make room for the button */
          height: 52px; /* Increased height */
        }
        .newsletter-input:focus {
          background-color: rgba(255, 255, 255, 0.05);
        }
        .newsletter-input::placeholder {
          color: #7A7A7A;
        }
        .newsletter-button {
          background: #0093E9;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap; /* Prevent button text from wrapping */
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          padding: 0.7rem 1.8rem;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .newsletter-button:hover {
          background: linear-gradient(to bottom, #03a9f4, #039be5);
        }
        .consent-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .consent-checkbox input {
          margin-top: 0.25rem;
        }
        .consent-text {
          color: #7A7A7A;
          font-size: 0.85rem;
          line-height: 1.5;
        }
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
            grid-template-columns: 1fr repeat(5, 1fr);
          }
        }
        @media (max-width: 1100px) {
          .footer-content {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;
          }
          
          .footer-brand {
            grid-column: span 3;
            margin-bottom: 1rem;
            padding-right: 0;
          }
          
          .footer-description {
            max-width: 100%; /* Changed from 80% to 100% */
          }
          
          .newsletter-column {
            grid-column: span 3;
            margin-top: 2rem;
          }
        }
        @media (max-width: 768px) {
          .footer-container {
            padding: 0 2rem;
          }
          
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
          
          .footer-brand {
            grid-column: span 2;
          }
          
          .footer-description {
            max-width: 100%;
          }
          
          .chevron-icon {
            display: block;
          }
          
          .footer-links {
            max-height: 0;
          }
          
          .footer-links.expanded {
            max-height: 500px;
          }
          .newsletter-column {
            grid-column: span 2;
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
            gap: 1rem;
          }
          
          .footer-brand {
            grid-column: 1;
            margin-bottom: 2rem;
          }
          
          .footer-column-header {
            margin-bottom: 0.5rem;
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
          }
          
          .newsletter-form {
            max-width: 100%; /* Full width on mobile */
          }
          
          .input-container {
            flex-direction: row;
          }
          
          .newsletter-input {
            border-radius: 8px;
          }
          
          .newsletter-button {
            position: absolute;
            right: 8px;
          }
          
          .footer-bottom {
            margin-top: 2rem;
          }
          
          .footer-social {
            justify-content: center;
          }
        }
      `}</style>
      <footer className="footer" role="contentinfo" itemScope itemType="http://schema.org/WPFooter">
        <div className="footer-container">
          <div className="footer-content">
            {/* 1. About Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <Link href="/" aria-label="Web Development Homepage" title="Web Development">
                  <Image 
                    src="/images/logo.png" 
                    alt="Web Development Company Logo" 
                    width={250} 
                    height={80} 
                    priority
                  />
                </Link>
              </div>
              <p className="footer-description" itemProp="description">
                We are a professional web development and design team that will transform your ideas into amazing digital experiences.
              </p>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="social-icon"
                    aria-label={`Follow us on ${social.label}: ${social.description}`}
                    title={social.description}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* 2-5. Footer Link Columns */}
            {footerColumns.map((column, index) => (
              <div className="footer-column" key={index}>
                <div 
                  className="footer-column-header" 
                  onClick={() => toggleSection(column.title)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedSection === column.title}
                >
                  <h3 className="footer-column-title">{column.title}</h3>
                  <span className={`chevron-icon ${expandedSection === column.title ? 'rotate' : ''}`}>
                    <ChevronDown size={18} aria-hidden="true" />
                  </span>
                </div>
                <ul 
                  className={`footer-links ${expandedSection === column.title ? 'expanded' : ''}`}
                  aria-hidden={expandedSection !== column.title}
                >
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="footer-link"
                        title={link.description}
                        aria-label={link.description}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* 6. Newsletter Column */}
            <div className="newsletter-column">
              <h3 className="newsletter-title">Subscribe newsletter</h3>
              <form className="newsletter-form" onSubmit={handleSubscribe} aria-label="Newsletter subscription form">
                <div className="input-container">
                  <input 
                    type="email" 
                    className="newsletter-input" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Your email address"
                  />
                  <button type="submit" className="newsletter-button" aria-label="Subscribe to our newsletter">
                    Sign Up
                  </button>
                </div>
                <div className="consent-checkbox">
                  <input type="checkbox" id="consent" required aria-label="Consent to receive emails" />
                  <label htmlFor="consent" className="consent-text">
                    I'm okay with getting emails and having them tracked to improve my experience
                  </label>
                </div>
              </form>
            </div>
          </div>
          
          {/* Footer Bottom / Copyright */}
          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} Web Development. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Schema.org JSON-LD markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </footer>
    </>
  );
};

export default Footer;
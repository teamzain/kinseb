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
  "name": "Kinseb Web Development",
  "url": "https://www.kinsebwebdevelopment.com",
  "logo": "https://www.kinsebwebdevelopment.com/images/logo.png",
  "description": "Professional web development and design team that transforms ideas into amazing digital experiences.",
  "sameAs": [
    "https://twitter.com/kinsebwebdev",
    "https://facebook.com/kinsebwebdevelopment",
    "https://linkedin.com/company/kinsebwebdevelopment",
    "https://instagram.com/kinsebwebdevelopment"
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
    { href: "https://twitter.com/kinsebwebdev", icon: Twitter, label: "Twitter", description: "Follow us on Twitter for the latest updates" },
    { href: "https://facebook.com/kinsebwebdevelopment", icon: Facebook, label: "Facebook", description: "Connect with us on Facebook" },
    { href: "https://linkedin.com/company/kinsebwebdevelopment", icon: Linkedin, label: "LinkedIn", description: "Follow our company on LinkedIn" },
    { href: "https://instagram.com/kinsebwebdevelopment", icon: Instagram, label: "Instagram", description: "See our work and culture on Instagram" },
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
      title: "Services",
 links: [

  {
    href: "/services/ecommerce-development",
    label: "eCommerce Development",
    description: "Build scalable and secure online stores tailored to your business goals"
  },
  {
    href: "/services/mobile-app-design",
    label: "Mobile App Design",
    description: "Design intuitive and engaging mobile app interfaces for iOS and Android"
  },
  {
    href: "/services/custom-web-development",
    label: "Custom Web Development",
    description: "Develop robust and scalable web applications built to meet your unique needs"
  }
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
          grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
          gap: 3rem;
          align-items: start;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          padding-right: 2rem;
        }
        .footer-logo {
          margin-bottom: 1.5rem;
        }
        .footer-description {
          color: #B0B0B0;
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 100%;
        }
        .footer-social {
          display: flex;
          gap: 1.2rem;
          margin-top: 1rem;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          color: #B0B0B0;
          backdrop-filter: blur(10px);
        }
        .social-icon:hover {
          background-color: #809B0D;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(128, 155, 13, 0.3);
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
          font-size: 1.15rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 1rem;
        }
        .footer-column-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 35px;
          height: 3px;
          background: linear-gradient(90deg, #809B0D 0%, #a5c611 100%);
          border-radius: 2px;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          list-style: none;
          padding: 0;
          transition: max-height 0.3s ease;
          overflow: hidden;
          max-height: 500px;
        }
        .footer-link {
          color: #B0B0B0;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 0;
          line-height: 1.6;
        }
        .footer-link:hover {
          color: #809B0D;
          transform: translateX(5px);
        }
        .footer-link:before {
          content: '';
          position: absolute;
          left: -12px;
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
          width: 6px;
          height: 6px;
          left: -15px;
          opacity: 1;
        }
        .newsletter-column {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
          width: 100%;
        }
        .newsletter-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          color: white;
          position: relative;
          padding-bottom: 1rem;
        }
        .newsletter-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 35px;
          height: 3px;
          background: linear-gradient(90deg, #809B0D 0%, #a5c611 100%);
          border-radius: 2px;
        }
        .newsletter-description {
          color: #B0B0B0;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .input-container {
          display: flex;
          width: 100%;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .input-container:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(128, 155, 13, 0.3);
        }
        .input-container:focus-within {
          background: rgba(255, 255, 255, 0.15);
          border-color: #809B0D;
          box-shadow: 0 0 20px rgba(128, 155, 13, 0.2);
        }
        .newsletter-input {
          flex: 1;
          background-color: transparent;
          border: none;
          color: white;
          padding: 1rem 1.2rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          height: 58px;
          padding-right: 120px;
        }
        .newsletter-input::placeholder {
          color: #8A8A8A;
          font-weight: 400;
        }
        .newsletter-button {
          background: linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          padding: 0.8rem 1.8rem;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 15px rgba(0, 147, 233, 0.3);
        }
        .newsletter-button:hover {
          background: linear-gradient(135deg, #007bb5 0%, #66b8a8 100%);
          transform: translateY(-50%) translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 147, 233, 0.4);
        }
        .newsletter-button:active {
          transform: translateY(-50%) translateY(0px);
        }
        .consent-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .consent-checkbox input {
          margin-top: 0.25rem;
          accent-color: #809B0D;
          transform: scale(1.1);
        }
        .consent-text {
          color: #8A8A8A;
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .copyright {
          color: #8A8A8A;
          font-size: 0.9rem;
          font-weight: 400;
        }
        
        /* Responsive styles */
        @media (max-width: 1200px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1fr 1fr 1.8fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 1100px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          
          .footer-brand {
            grid-column: span 2;
            margin-bottom: 2rem;
            padding-right: 0;
            text-align: center;
          }
          
          .footer-social {
            justify-content: center;
          }
          
          .newsletter-column {
            grid-column: span 2;
            margin-top: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media (max-width: 768px) {
          .footer-container {
            padding: 0 2rem;
          }
          
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .footer-brand {
            grid-column: span 2;
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
            gap: 2rem;
          }
          
          .footer-brand {
            grid-column: 1;
            margin-bottom: 2rem;
          }
          
          .footer-column-header {
            margin-bottom: 0.5rem;
            padding: 1rem 0;
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
          
          .newsletter-input {
            padding-right: 100px;
            font-size: 0.95rem;
          }
          
          .newsletter-button {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
          
          .footer-bottom {
            margin-top: 2.5rem;
          }
        }
      `}</style>
      <footer className="footer" role="contentinfo" itemScope itemType="http://schema.org/WPFooter">
        <div className="footer-container">
          <div className="footer-content">
            {/* 1. About Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <Link href="/" aria-label="Kinseb Web Development Homepage" title="Kinseb Web Development">
                  <Image 
                    src="/images/logo.png" 
                    alt="Kinseb Web Development Company Logo" 
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
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* 2-4. Footer Link Columns (Company, Services, Legal) */}
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
            
            {/* 5. Newsletter Column */}
            <div className="newsletter-column">
              <h3 className="newsletter-title">Subscribe Newsletter</h3>
              <p className="newsletter-description">
                Stay updated with our latest web development insights, tips, and exclusive offers.
              </p>
              <form className="newsletter-form" onSubmit={handleSubscribe} aria-label="Newsletter subscription form">
                <div className="input-container">
                  <input 
                    type="email" 
                    className="newsletter-input" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Your email address"
                  />
                  <button type="submit" className="newsletter-button" aria-label="Subscribe to our newsletter">
                    Subscribe
                  </button>
                </div>
                <div className="consent-checkbox">
                  <input type="checkbox" id="consent" required aria-label="Consent to receive emails" />
                  <label htmlFor="consent" className="consent-text">
                    I agree to receive promotional emails and newsletters. You can unsubscribe at any time.
                  </label>
                </div>
              </form>
            </div>
          </div>
          
          {/* Footer Bottom / Copyright */}
          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} Kinseb Web Development. All rights reserved.
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
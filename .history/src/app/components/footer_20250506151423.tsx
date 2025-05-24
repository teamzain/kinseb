'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define interfaces for footer links
interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  // Social media links
  const socialLinks = [
    { href: "https://twitter.com", icon: "/images/twitter.svg", label: "Twitter" },
    { href: "https://facebook.com", icon: "/images/facebook.svg", label: "Facebook" },
    { href: "https://linkedin.com", icon: "/images/linkedin.svg", label: "LinkedIn" },
    { href: "https://instagram.com", icon: "/images/instagram.svg", label: "Instagram" },
  ];

  // Footer columns with links
  const footerColumns: FooterColumn[] = [
    {
      title: "Company",
      links: [
        { href: "/about-us", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
        { href: "/careers", label: "Careers" },
      ]
    },
    {
      title: "Product",
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
      links: [
        { href: "/digital-marketing", label: "Digital Marketing" },
        { href: "/content-writing", label: "Content Writing" },
        { href: "/seo-for-business", label: "SEO for Business" },
        { href: "/ui-design", label: "UI Design" },
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms-conditions", label: "Terms & Conditions" },
        { href: "/return-policy", label: "Return Policy" },
      ]
    },
  ];

  return (
    <>
      <style jsx global>{`
        .footer {
          background-color: #020210;
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
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 2rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          margin-bottom: 1.2rem;
        }

        .footer-description {
          color: #B0B0B0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 90%;
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background-color: rgba(128, 155, 13, 0.2);
          transform: translateY(-3px);
        }

        .footer-column {
          display: flex;
          flex-direction: column;
        }

        .footer-column-title {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
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
          }
        }

        @media (max-width: 992px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem 3rem;
          }
          
          .footer-brand {
            grid-column: span 3;
            margin-bottom: 1rem;
          }
          
          .footer-description {
            max-width: 80%;
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
          }
          
          .footer-column-title {
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
          }
          
          .footer-bottom {
            margin-top: 2rem;
          }
        }
      `}</style>

      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <Link href="/" aria-label="Homepage">
                  <Image 
                    src="/images/logo.png" 
                    alt="Company Logo" 
                    width={150} 
                    height={75} 
                    priority
                  />
                </Link>
              </div>
              <p className="footer-description">
                We are a professional web development and design team that will transform your ideas into amazing digital experiences.
              </p>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="social-icon"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image 
                      src={social.icon} 
                      alt={social.label} 
                      width={16} 
                      height={16} 
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Link Columns */}
            {footerColumns.map((column, index) => (
              <div className="footer-column" key={index}>
                <h3 className="footer-column-title">{column.title}</h3>
                <ul className="footer-links">
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
          </div>

          {/* Footer Bottom / Copyright */}
          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} Web Development. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
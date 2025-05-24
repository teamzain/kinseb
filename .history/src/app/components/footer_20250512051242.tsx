'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Facebook, Linkedin, Instagram, ChevronDown } from 'lucide-react';

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

  // Social media links with Lucide icons and proper aria labels
  const socialLinks = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  ];

  // Footer columns with links - using descriptive link text for SEO
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#020210] via-[#10102b] to-[#0a0a25] text-white py-16 pb-8 relative overflow-hidden font-['Barlow',sans-serif]" role="contentinfo" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Information Section */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="KINSEB Web Development Homepage">
              <div className="mb-4 inline-block relative h-12 w-auto">
                <Image 
                  src="/images/logo.png" 
                  alt="KINSEB Web Development Logo" 
                  width={200} 
                  height={60} 
                  priority
                  className="object-contain"
                  onError={(e) => {
                    // Fallback for image loading errors
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('span');
                      fallback.textContent = 'KINSEB WEB DEVELOPMENT';
                      fallback.className = 'text-white text-xl font-bold';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </Link>
            <p className="text-gray-400 text-base mb-6 max-w-md">
              We are a professional web development and design team that will transform your ideas into amazing digital experiences.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-gray-400 hover:bg-[#809B0D] hover:text-white hover:-translate-y-1 transition-all duration-300"
                  aria-label={`Follow us on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Link Columns */}
          {footerColumns.map((column, index) => (
            <div key={index} className="flex flex-col">
              <div 
                className="flex justify-between items-center mb-6 cursor-pointer"
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
                <h2 className="text-white text-lg font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#809B0D]">
                  {column.title}
                </h2>
                <ChevronDown 
                  size={18} 
                  className={`md:hidden transition-transform duration-300 ${expandedSection === column.title ? 'rotate-180' : ''}`} 
                />
              </div>
              <ul 
                id={`footer-links-${index}`}
                className={`flex flex-col space-y-3 transition-all duration-300 overflow-hidden ${
                  expandedSection === column.title || window.innerWidth >= 768 
                    ? 'max-h-96' 
                    : 'max-h-0 md:max-h-96'
                }`}
              >
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#809B0D] hover:translate-x-1 transition-all duration-300 relative pl-0 hover:pl-1 block text-base"
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter Column */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-lg font-semibold relative pb-2 mb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#809B0D]">
              Subscribe newsletter
            </h2>
            <form 
              className="flex flex-col space-y-3" 
              onSubmit={handleSubscribe}
              aria-label="Newsletter subscription form"
            >
              <div className="flex flex-col sm:flex-row">
                <input 
                  type="email" 
                  className="flex-1 bg-white/10 border border-white/10 text-white px-4 py-3 rounded-t-md sm:rounded-l-md sm:rounded-tr-none focus:outline-none focus:border-blue-500 focus:bg-white/20 text-base"
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  name="email"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-b from-[rgba(13,152,186,0.3)] to-[rgba(0,0,0,0.3)] bg-[#16161E] text-white border-none px-6 py-3 sm:rounded-r-md rounded-b-md sm:rounded-bl-none font-medium cursor-pointer hover:from-[rgba(13,152,186,0.5)] hover:to-[rgba(0,0,0,0.5)] transition-all duration-300"
                  aria-label="Sign up for newsletter"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-start space-x-2">
                <input 
                  type="checkbox" 
                  id="consent" 
                  className="mt-1" 
                  required
                  aria-required="true"
                />
                <label htmlFor="consent" className="text-gray-500 text-sm leading-relaxed">
                  I'm okay with getting emails and having them tracked to improve my experience
                </label>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer Bottom / Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} KINSEB Web Development. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Poppins, Lato, Barlow } from 'next/font/google';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import servicesData from '../../../public/data/services.json';

// Font setup
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

// Note: Lato only supports weights 100, 300, 400, 700, 900 in Next.js
const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

interface FaqItem {
  id: string;
  title: string;
  description: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  featured?: boolean;
  image: string;
  deliverables: string[];
  process: string[];
  faq: FaqItem[];
}

export default function ContactForm2() {
  // Form state management with useMemo for initial state
  interface FormData {
    fullName: string;
    email: string;
    companyName: string;
    contactNumber: string;
    message: string;
  }
  
  const initialFormData = useMemo<FormData>(() => ({
    fullName: '',
    email: '',
    companyName: '',
    contactNumber: '',
    message: '',
  }), []);
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [animateElements, setAnimateElements] = useState<boolean>(false);
  
  // Get the current service ID from the URL
  const params = useParams();
  const serviceId = params?.id ? Number(params.id) : 1; // Default to first service if no ID
  
  // Find the current service data from services.json
  const currentService = useMemo(() => {
    return servicesData.services.find((service: Service) => service.id === serviceId) || 
           servicesData.services[0]; // Default to first service if not found
  }, [serviceId]);
  
  // FAQ sections expanded state
  const [expandedSection, setExpandedSection] = useState<string | null>('null');
  
  // Animation triggers with refs for intersection observer
  const leftContentRef = useRef(null);
  const formContainerRef = useRef(null);

  // Handle animation on component mount with useEffect
  useEffect(() => {
    // Trigger initial animations after a short delay
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 100);

    // Set up intersection observer for scroll animations
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      animatedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Toggle FAQ section expansion
  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  }, [expandedSection]);

  // Optimize form input handling with useCallback
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Form submission handler
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would add your API call to send the form data
  }, [formData]);

  return (
    <main className="landing-container">
      {/* Left side content with services */}
      <div 
        className={`left-content ${animateElements ? 'animate' : ''}`} 
        ref={leftContentRef}
      >
        <div className="content-wrapper">
          {/* Header content section */}
          <div className="header-content">
            <h1 className={`main-heading ${poppins.className} animate-item`}>
              {currentService.title.includes('Design') ? (
                <>
                  {currentService.title.split('Design')[0]} 
                  <span className="blue-text">Design</span> 
                  {currentService.title.includes('Design Services') ? 'Services' : ''}
                </>
              ) : (
                currentService.title
              )}
            </h1>
                
            <p className={`description ${lato.className} animate-item`}>
              {currentService.description}
            </p>
          </div>
          
          {/* FAQ sections */}
          <div className="faq-container animate-on-scroll">
            {currentService.faq.map((faqItem: FaqItem) => (
              <div 
                key={faqItem.id}
                className={`faq-item ${expandedSection === faqItem.id ? 'expanded' : ''}`}
              >
                <div className="faq-header" onClick={() => toggleSection(faqItem.id)}>
                  <h2 className={`faq-title ${poppins.className}`}>{faqItem.title}</h2>
                  <div className={`faq-arrow ${expandedSection === faqItem.id ? 'rotated' : ''}`}>
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L10 10L19 1" stroke="#0D98BA" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="faq-content">
                  <p className={`faq-text ${lato.className}`}>
                    {faqItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div 
        className={`form-container ${animateElements ? 'animate' : ''}`}
        ref={formContainerRef}
      >
        <h2 className={`form-heading ${poppins.className} animate-item`}>
          Start a Conversation
        </h2>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group animate-item">
              <label htmlFor="fullName" className={`form-label ${lato.className}`}>Full Name</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/user.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                    loading="lazy"
                  />
                </div>
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  placeholder="Your Name"
                  className={`form-input ${barlow.className}`}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group animate-item" style={{ animationDelay: '100ms' }}>
              <label htmlFor="email" className={`form-label ${lato.className}`}>Email Address</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/email.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                    loading="lazy"
                  />
                </div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className={`form-input ${barlow.className}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group animate-item" style={{ animationDelay: '200ms' }}>
              <label htmlFor="companyName" className={`form-label ${lato.className}`}>Company Name</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/company.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                    loading="lazy"
                  />
                </div>
                <input 
                  type="text" 
                  id="companyName"
                  name="companyName"
                  placeholder="Company Name"
                  className={`form-input ${barlow.className}`}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group animate-item" style={{ animationDelay: '300ms' }}>
              <label htmlFor="contactNumber" className={`form-label ${lato.className}`}>Contact Number</label>
              <div className="input-container">
                <div className="input-icon" aria-hidden="true">
                  <Image 
                    src="/images/phone.svg" 
                    width={24} 
                    height={24} 
                    alt="" 
                    loading="lazy"
                  />
                </div>
                <input 
                  type="tel" 
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className={`form-input ${barlow.className}`}
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group full-width animate-item" style={{ animationDelay: '400ms' }}>
            <label htmlFor="message" className={`form-label ${lato.className}`}>Your Message</label>
            <textarea 
              id="message"
              name="message"
              placeholder="Describe Your Project Needs..."
              className={`form-textarea ${barlow.className}`}
              value={formData.message}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button ${barlow.className} animate-item`}
            style={{ animationDelay: '500ms' }}
          >
            Get in Touch
          </button>
        </form>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Base Styles */
        .landing-container {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          width: 100%;
          min-height: 100vh;
          height: 100%;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 287.92%);
          padding: 2rem;
          color: #FFFFFF;
          box-sizing: border-box;
          gap: 2.5rem;
          overflow: hidden;
        }

        /* Animation classes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-item {
          opacity: 0;
        }

        .left-content.animate .animate-item,
        .form-container.animate .animate-item {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .left-content.animate .animate-item:nth-child(1) {
          animation-delay: 0.1s;
        }

        .left-content.animate .animate-item:nth-child(2) {
          animation-delay: 0.2s;
        }

        .left-content.animate .animate-item:nth-child(3) {
          animation-delay: 0.3s;
        }

        /* Scroll animation handling */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Left Content Styles - Restructured for FAQ */
        .left-content {
          flex: 1;
          max-width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: flex-start;
          gap: 2rem;
        }

        /* Header section at top */
        .header-content {
          padding-top: 1.5rem;
        }

        .main-heading {
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 2.8rem);
          line-height: 1.3;
          color: #FFFFFF;
          margin: 0 0 1rem 0;
        }
        
        .blue-text {
          color: #0D98BA;
        }

        .description {
          font-weight: 600;
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          line-height: 1.5;
          color: #FFFFFF;
          margin: 0 0 1.5rem 0;
          max-width: 95%;
        }

        /* FAQ Styles */
        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          margin-top: 3px;
        }

        .faq-item {
          width: 100%;
          background: rgba(13, 152, 186, 0.1);
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s ease;
          min-height: 75px;
        }

        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 75px;
        }

        .faq-header:hover {
          background: rgba(13, 152, 186, 0.15);
        }

        .faq-title {
          font-weight: 600;
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          line-height: 1.4;
          color: #FFFFFF;
          margin: 0;
          padding-left: 0.5rem;
        }

        .faq-arrow {
          transition: transform 0.3s ease;
        }

        .faq-arrow.rotated {
          transform: rotate(180deg);
        }

        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          padding: 0 1.5rem;
        }

        .faq-item.expanded .faq-content {
          max-height: 300px;
          padding-bottom: 1.2rem;
        }

        .faq-text {
          font-weight: 600;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          line-height: 1.5;
          color: #E6E6E6;
          margin: 0;
        }

        /* Form Container Styles */
        .form-container {
          flex: 1;
          max-width: 50%;
          min-height: 55vh;
          background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px rgba(4, 9, 29, 0.3);
        }

        .form-heading {
          font-weight: 600;
          font-size: clamp(1.5rem, 3vw, 2.375rem);
          line-height: 1.3;
          color: #FFFFFF;
          margin: 0 0 1.5rem 0;
        }

        /* Form Styles */
        .contact-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          width: 100%;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .full-width {
          width: 100%;
        }

        .form-label {
          font-weight: 700;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.4;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin-bottom: 0.5rem;
        }

        .input-container {
          position: relative;
          width: 100%;
          height: 3.125rem;
          background: rgba(4, 9, 29, 0.9);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding-left: 3.125rem;
          transition: all 0.3s ease;
        }

        .input-container:focus-within {
          border-color: #0D98BA;
          box-shadow: 0 0 0 2px rgba(13, 152, 186, 0.3);
          transform: translateY(-2px);
        }

        .input-icon {
          position: absolute;
          left: 0.9375rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0D98BA;
          width: 1.5rem;
          height: 1.5rem;
          z-index: 1;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          height: 100%;
          font-weight: 400;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.5;
          color: #FFFFFF;
          padding: 0 0.9375rem 0 0;
        }

        .form-input::placeholder {
          color: #98989A;
        }

        .form-textarea {
          width: 100%;
          min-height: 5.5rem;
          background: rgba(4, 9, 29, 0.9);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 8px;
          padding: 0.9375rem;
          font-weight: 400;
          font-size: clamp(0.875rem, 1vw, 1rem);
          line-height: 1.4;
          color: #FFFFFF;
          resize: none;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-textarea::placeholder {
          color: #98989A;
        }

        .form-textarea:focus {
          border-color: #0D98BA;
          box-shadow: 0 0 0 2px rgba(13, 152, 186, 0.3);
          transform: translateY(-2px);
        }

        .submit-button {
          width: 145px;
          height: 48px;
          background: #0D98BA;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A1A;
          border: none;
          cursor: pointer;
          margin-top: 0.625rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        /* Button hover effect */
        .submit-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: width 0.3s ease;
        }

        .submit-button:hover {
          background: #0B86A5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 152, 186, 0.3);
        }

        .submit-button:hover:before {
          width: 100%;
        }

        .submit-button:focus {
          outline: 2px solid #0D98BA;
          outline-offset: 2px;
        }

        /* Responsive Styles - Enhanced for all screen sizes */
        @media (max-width: 1200px) {
          .landing-container {
            padding: 1.5rem;
            gap: 2rem;
          }
          
          .form-container {
            padding: 2rem;
          }
          
          .faq-header {
            padding: 1rem 1.2rem;
          }
        }

        @media (max-width: 1024px) {
          .landing-container {
            padding: 1.25rem;
          }
          
          .form-container {
            padding: 1.75rem;
          }
          
          .faq-title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 900px) {
          .landing-container {
            flex-direction: column;
            justify-content: flex-start;
            min-height: 100vh;
            height: auto;
            gap: 2rem;
            padding: 2rem 1.25rem;
          }
          
          .left-content {
            max-width: 100%;
            flex: none;
            width: 100%;
            padding-bottom: 1rem;
            order: 1; /* Display content first on mobile */
          }
          
          .form-container {
            max-width: 100%;
            flex: none;
            width: 100%;
            min-height: auto;
            padding: 2rem 1.75rem;
            order: 2; /* Display form below content on mobile */
          }
          
          .faq-container {
            margin-top: 1rem;
          }
        }

        @media (max-width: 768px) {
          .landing-container {
            padding: 1.5rem 1rem;
          }
          
          .form-row {
            flex-direction: column;
            gap: 1rem;
          }
          
          .form-heading {
            margin-bottom: 1rem;
          }
          
          .form-container {
            padding: 1.75rem 1.5rem;
          }
          
          /* Simplify animations on smaller screens for performance */
          .animate-item {
            animation-duration: 0.5s !important;
          }
        }

        @media (max-width: 480px) {
          .landing-container {
            padding: 1rem 0.75rem;
            gap: 1.5rem;
          }
          
          .form-container {
            padding: 1.5rem 1.25rem;
          }
          
          .left-content {
            padding: 0 0.5rem;
          }
          
          .form-textarea {
            min-height: 5rem;
          }
          
          .header-content {
            padding-top: 1rem;
          }
          
          .faq-header {
            padding: 0.75rem 1rem;
          }
          
          .faq-title {
            font-size: 1.125rem;
          }
          
          /* Simplify animations further for smallest screens */
          .left-content.animate .animate-item,
          .form-container.animate .animate-item {
            animation-duration: 0.4s;
          }
        }
      `}</style>
    </main>
  );
}
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Poppins, Lato, Barlow } from 'next/font/google';
import Image from 'next/image';

// Font setup
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

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

export default function LandingPage() {
  // Form state management with useMemo for initial state
  const initialFormData = useMemo(() => ({
    fullName: '',
    email: '',
    companyName: '',
    contactNumber: '',
    message: '',
  }), []);
  
  const [formData, setFormData] = useState(initialFormData);
  const [animateElements, setAnimateElements] = useState(false);
  
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
      entries.forEach((entry) => {
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
      {/* Left side content with background image */}
      <div 
        className={`left-content ${animateElements ? 'animate' : ''}`} 
        ref={leftContentRef}
      >
        <div className="content-wrapper">
          {/* Header content section */}
          <div className="header-content">
            <p className={`tagline ${poppins.className} animate-item`}>
              Turn Your Ideas Into
            </p>
            
            <h1 className={`main-heading ${poppins.className} animate-item`}>
              Impactful Digital Products
            </h1>
          </div>
          
          {/* Background image positioned after heading */}
          <div 
            className="background-image animate-on-scroll" 
            aria-hidden="true"
          ></div>
          
          {/* Description below the image */}
          <p className={`description ${lato.className} animate-item`}>
            Have an idea, question, or collaboration in mind? Drop us a line – we're all ears.
          </p>

          {/* Contact Info moved to bottom */}
          <div className="contact-info animate-on-scroll">
            <h2 className={`contact-heading ${poppins.className}`}>Follow us</h2>
            
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter">
                <Image 
                  src="/images/twitter.svg" 
                  width={24} 
                  height={24} 
                  alt="Twitter icon" 
                  loading="lazy"
                />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <Image 
                  src="/images/facebook.svg" 
                  width={24} 
                  height={24} 
                  alt="Facebook icon" 
                  loading="lazy"
                />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Image 
                  src="/images/insta.svg" 
                  width={24} 
                  height={24} 
                  alt="Instagram icon" 
                  loading="lazy"
                />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Image 
                  src="/images/linkedin.svg" 
                  width={24} 
                  height={24} 
                  alt="LinkedIn icon" 
                  loading="lazy"
                />
              </a>
            </div>
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
            Get in touch
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
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
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

        /* Left Content Styles - Restructured */
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
          justify-content: space-between;
        }

        /* Header section at top */
        .header-content {
          padding-top: 2rem;
        }

        .tagline {
          font-weight: 600;
          font-size: clamp(1.125rem, 2vw, 1.375rem);
          line-height: 1.4;
          color: #0D94BB;
          margin: 0 0 0.25rem 0;
        }

        .main-heading {
          font-weight: 600;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          line-height: 1.3;
          color: #0D98BA;
          margin: 0 0 0.75rem 0;
        }

        /* Background image container - Repositioned */
        .background-image {
          width: 90%;
          height: 200px;
          max-height: 250px;
          background-image: url('/images/message.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          margin: 1.5rem auto;
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        /* Description below image */
        .description {
          font-weight: 600;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          line-height: 1.4;
          letter-spacing: -0.006em;
          color: #E6E6E6;
          margin: 0 0 1.5rem 0;
          max-width: 85%;
        }

        /* Contact Info Styles - Moved to bottom */
        .contact-info {
          margin-top: auto;
          padding-top: 2rem;
          margin-bottom: 1.5rem;
        }

        .contact-heading {
          font-weight: 600;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          line-height: 1.4;
          letter-spacing: -0.03em;
          margin: 0 0 1rem 0;
          color: #FFFFFF;
        }

        /* Social Icons Row */
        .social-icons {
          display: flex;
          gap: 1.25rem;
        }

        .social-icon {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          background: rgba(13, 152, 186, 0.1);
          border-radius: 50%;
          padding: 0.5rem;
        }

        .social-icon:hover {
          transform: translateY(-3px) scale(1.05);
          background: rgba(13, 152, 186, 0.3);
          box-shadow: 0 4px 12px rgba(13, 152, 186, 0.2);
        }

        /* Form Container Styles - Adjusted height */
        .form-container {
          flex: 1;
          max-width: 50%;
          min-height: 75vh; /* Decreased from 85vh */
          background: linear-gradient(180deg, #0D98BA -213.84%, #04091D 103.97%);
          border: 1px solid #07435D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 2.5rem; /* Increased padding */
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

        /* Form Styles - Enhanced */
        .contact-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem; /* Slightly increased */
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
          min-height: 6.25rem;
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
          width: 145px; /* Slightly increased */
          height: 48px; /* Slightly increased */
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

        /* Enhanced button hover effect */
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

        /* Responsive Styles - Enhanced */
        @media (max-width: 1200px) {
          .landing-container {
            padding: 1.5rem;
            gap: 2rem;
          }
          
          .form-container {
            padding: 2rem;
            min-height: 70vh; /* Decreased from 80vh */
          }
          
          .background-image {
            max-height: 200px;
          }
        }

        @media (max-width: 1024px) {
          .landing-container {
            padding: 1.25rem;
          }
          
          .form-container {
            padding: 1.75rem;
            min-height: 65vh; /* Decreased from 75vh */
          }
          
          .background-image {
            opacity: 0.6;
            max-height: 180px;
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
          }
          
          .form-container {
            max-width: 100%;
            flex: none;
            width: 100%;
            min-height: auto;
            padding: 2rem 1.75rem;
          }
          
          .background-image {
            width: 70%;
            max-height: 160px;
            margin: 1.25rem auto;
            opacity: 0.5;
          }
          
          .contact-info {
            margin-top: 2rem;
            padding-top: 1rem;
          }
          
          .description {
            max-width: 100%;
          }
          
          /* Add staggered animations for mobile */
          .left-content.animate .animate-item:nth-child(1) {
            animation-delay: 0.1s;
          }
          .left-content.animate .animate-item:nth-child(2) {
            animation-delay: 0.2s;
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
          
          .background-image {
            opacity: 0.4;
            max-height: 140px;
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
          
          .social-icons {
            gap: 0.75rem;
          }
          
          .social-icon {
            width: 1.75rem;
            height: 1.75rem;
            padding: 0.375rem;
          }
          
          .form-textarea {
            min-height: 5rem;
          }
          
          .background-image {
            display: none; /* Hide on mobile as requested */
          }
          
          .header-content {
            padding-top: 1rem;
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
'use client';

import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Poppins, Barlow } from 'next/font/google';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-poppins',
});

const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-barlow',
});

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible for earlier animation
        rootMargin: '0px 0px -50px 0px' // Slightly earlier detection
      }
    );

    if (newsletterRef.current) {
      observer.observe(newsletterRef.current);
    }

    return () => {
      if (newsletterRef.current) {
        observer.unobserve(newsletterRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <div 
      ref={newsletterRef}
      className={`${poppins.variable} ${barlow.variable} newsletter-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Background image and overlay */}
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>
      
      {/* Content container */}
      <div className="content-container">
        <div className="text-column">
          {/* Main heading */}
          <h2 className="main-heading">
            Stay in the <span className="highlight">Loop</span>
          </h2>

          {/* Subheading */}
          <h3 className="sub-heading">
            Get exclusive insights, updates, and early access to our services.
          </h3>
        </div>

        {/* Form Column */}
        <div className="form-column">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={handleChange}
                  required
                  className="email-input"
                  aria-label="Email address"
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
                aria-label="Subscribe"
              >
                <span className="button-text">{isSubmitted ? 'Thanks!' : 'Subscribe'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .newsletter-section {
          position: relative;
          width: 100%;
          min-height: 380px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
        }
        
        .newsletter-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .background-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }
        
        .background-wrapper::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url('/images/news.jpg');
          background-size: cover;
          background-position: center;
          z-index: -1;
          transform: scale(1.05); /* Slight scale to prevent white edges during animations */
          transition: transform 0.8s ease-out;
        }
        
        .newsletter-section.visible .background-wrapper::before {
          transform: scale(1);
        }
        
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(4, 9, 29, 0.8); /* Darker overlay for better text visibility */
          z-index: 2;
        }
        
        .content-container {
          position: relative;
          max-width: 1200px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 60px 40px;
          z-index: 3;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }
        
        .text-column {
          flex: 1;
          padding-right: 40px;
        }
        
        .form-column {
          flex: 0 0 auto;
          width: 425px;
          max-width: 100%;
        }
        
        .main-heading {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.3s;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 52px;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        .sub-heading {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.6s;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 500;
          font-size: 22px;
          line-height: 1.5;
          color: #F0F0F0;
          margin: 16px 0 0 0;
          max-width: 600px;
        }
        
        .highlight {
          color: #0D98BA;
          position: relative;
          display: inline-block;
        }
        
        .highlight::after {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: #0D98BA;
          animation: lineWidth 1s forwards;
          animation-delay: 1s;
        }
        
        .form-container {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.9s;
          box-sizing: border-box;
          width: 100%;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(125, 129, 141, 0.3);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .form-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
        }
        
        .input-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
          margin-bottom: 16px;
          position: relative;
        }
        
        .email-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          outline: none;
          font-family: var(--font-barlow);
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #FFFFFF;
          padding: 12px 16px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        
        .email-input:focus {
          border-color: #0D98BA;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .submit-button {
          width: 100%;
          height: 48px;
          background: #0D98BA;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .submit-button:hover {
          background: #0A7F9A;
          transform: translateY(-2px);
        }
        
        .submit-button:hover::before {
          left: 100%;
        }
        
        .submit-button:active {
          transform: translateY(1px);
        }
        
        .submitted {
          background: #4CAF50 !important;
        }
        
        .button-text {
          font-family: var(--font-barlow);
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #FFFFFF;
          white-space: nowrap;
          position: relative;
          z-index: 1;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes lineWidth {
          to {
            width: 100%;
          }
        }
        
        /* Responsive styles */
        @media (max-width: 1200px) {
          .content-container {
            padding: 60px 30px;
          }
          
          .form-column {
            width: 400px;
          }
          
          .main-heading {
            font-size: 48px;
          }
          
          .sub-heading {
            font-size: 20px;
          }
        }
        
        @media (max-width: 1024px) {
          .content-container {
            padding: 50px 30px;
          }
          
          .text-column {
            padding-right: 30px;
          }
          
          .form-column {
            width: 360px;
          }
          
          .main-heading {
            font-size: 44px;
          }
        }
        
        @media (max-width: 900px) {
          .main-heading {
            font-size: 40px;
          }
          
          .sub-heading {
            font-size: 18px;
            margin-top: 12px;
          }
        }
        
        @media (max-width: 840px) {
          .newsletter-section {
            min-height: 420px;
          }
          
          .content-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 30px;
            padding: 40px 30px;
          }
          
          .text-column {
            width: 100%;
            padding-right: 0;
          }
          
          .form-column {
            width: 100%;
            max-width: 500px;
          }
        }
        
        @media (max-width: 768px) {
          .newsletter-section {
            min-height: 450px;
          }
          
          .content-container {
            padding: 40px 25px;
          }
          
          .main-heading {
            font-size: 36px;
          }
          
          .sub-heading {
            font-size: 18px;
            margin-top: 10px;
          }
        }
        
        @media (max-width: 576px) {
          .newsletter-section {
            min-height: 470px;
          }
          
          .content-container {
            padding: 40px 20px;
            gap: 25px;
          }
          
          .main-heading {
            font-size: 32px;
            line-height: 1.2;
          }
          
          .sub-heading {
            font-size: 16px;
            line-height: 1.5;
            margin-top: 8px;
          }
          
          .form-container {
            padding: 20px;
          }
          
          .email-input {
            font-size: 15px;
            padding: 10px 14px;
          }
          
          .submit-button {
            height: 44px;
          }
          
          .button-text {
            font-size: 15px;
          }
        }
        
        @media (max-width: 380px) {
          .newsletter-section {
            min-height: 500px;
          }
          
          .content-container {
            padding: 35px 16px;
          }
          
          .main-heading {
            font-size: 28px;
          }
          
          .sub-heading {
            font-size: 15px;
          }
          
          .form-container {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
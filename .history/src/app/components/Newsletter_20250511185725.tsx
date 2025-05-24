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
        threshold: 0.3, // Trigger when 30% of the component is visible
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
            Get <span className="highlight">Updates</span>
          </h2>

          {/* Subheading */}
          <h3 className="sub-heading">
            Sign up to get the latest updates and exclusive insights!
          </h3>
        </div>

        {/* Form Container */}
        <div className="form-column">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={handleChange}
                  required
                  className="email-input"
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
              >
                <span className="button-text">{isSubmitted ? 'Sent!' : 'Send'}</span>
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
          height: 400px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
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
        }
        
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(4, 9, 29, 0.75); /* Darker overlay for better visibility */
          z-index: 2;
        }
        
        .content-container {
          position: relative;
          max-width: 1200px;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 0 20px;
          z-index: 3;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        
        .text-column {
          flex: 1;
          padding-right: 20px;
          margin-top: -40px;
        }
        
        .form-column {
          flex: 0 0 425px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        
        .main-heading {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.3s;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          color: #FFFFFF;
          margin: 0;
        }
        
        .sub-heading {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.6s;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 500;
          font-size: 32px;
          line-height: 42px;
          color: #FFFFFF;
          margin: 10px 0 0 0;
          max-width: 600px;
        }
        
        .highlight {
          color: #0D98BA;
          position: relative;
        }
        
        .highlight::after {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: -4px;
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
          width: 425px;
          height: 73px;
          background: rgba(4, 9, 29, 0.8);
          border: 1px solid #7D818D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          position: relative;
        }
        
        .input-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          width: calc(100% - 134px); /* Width minus button width and padding */
        }
        
        .email-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-barlow);
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: #FFFFFF;
        }
        
        .email-input::placeholder {
          color: #98989A;
        }
        
        .submit-button {
          position: absolute;
          width: 104px;
          height: 50px;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          background: #0D98BA;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-button:hover {
          background: #0A7F9A;
          transform: translateY(-50%) scale(1.05);
        }
        
        .submit-button:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        .submitted {
          background: #4CAF50 !important;
        }
        
        .button-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-barlow);
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #FFFFFF;
          white-space: nowrap;
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
            padding: 0 40px;
          }
          
          .form-column {
            flex: 0 0 400px;
          }
          
          .form-container {
            width: 400px;
          }
        }
        
        @media (max-width: 992px) {
          .main-heading {
            font-size: 48px;
            line-height: 56px;
          }
          
          .sub-heading {
            font-size: 28px;
            line-height: 36px;
            max-width: 500px;
          }
          
          .form-column {
            flex: 0 0 350px;
          }
          
          .form-container {
            width: 350px;
          }
        }
        
        @media (max-width: 768px) {
          .newsletter-section {
            height: 480px;
          }
          
          .content-container {
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
          
          .text-column {
            width: 100%;
            padding-right: 0;
            margin-top: 0;
            margin-bottom: 40px;
          }
          
          .form-column {
            width: 100%;
            flex: none;
            justify-content: flex-start;
          }
          
          .main-heading {
            font-size: 42px;
            line-height: 48px;
          }
          
          .sub-heading {
            font-size: 24px;
            line-height: 32px;
            max-width: 100%;
          }
          
          .form-container {
            width: 100%;
            max-width: 425px;
          }
        }
        
        @media (max-width: 576px) {
          .newsletter-section {
            height: 500px;
          }
          
          .main-heading {
            font-size: 36px;
            line-height: 42px;
          }
          
          .sub-heading {
            font-size: 22px;
            line-height: 30px;
          }
          
          .form-container {
            height: auto;
            padding: 15px;
          }
          
          .input-wrapper {
            position: static;
            width: 100%;
            left: 0;
            transform: none;
            margin-bottom: 60px;
          }
          
          .submit-button {
            width: 100%;
            position: absolute;
            bottom: 15px;
            left: 0;
            right: 0;
            top: auto;
            transform: none;
            margin: 0 15px;
            width: calc(100% - 30px);
          }
          
          .submit-button:hover {
            transform: scale(1.02);
          }
          
          .submit-button:active {
            transform: scale(0.98);
          }
        }
        
        @media (max-width: 380px) {
          .newsletter-section {
            height: 520px;
          }
          
          .main-heading {
            font-size: 32px;
            line-height: 38px;
          }
          
          .sub-heading {
            font-size: 20px;
            line-height: 28px;
          }
          
          .form-container {
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
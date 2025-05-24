'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Poppins, Barlow } from 'next/font/google';
import Image from 'next/image';

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
    <div className={`${poppins.variable} ${barlow.variable} newsletter-container`}>
      {/* Background Image with overlay */}
      <div className="background-container">
        <Image 
          src="/images/news.jpg" 
          alt="Network Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Gradient overlay - ensuring this is properly visible */}
        <div className="gradient-overlay" />
      </div>

      {/* Content container */}
      <div className="content-container">
        {/* Left side content */}
        <div className="text-content">
          {/* Heading */}
          <h2 className="heading">
            Get <span className="highlight">Updates</span>
          </h2>

          {/* Subheading */}
          <h3 className="subheading">
            Sign up to get the latest updates and exclusive insights!
          </h3>
        </div>

        {/* Right side form */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-container">
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
              onMouseOver={(e) => {
                if (!isSubmitted) e.currentTarget.style.background = '#0A7F9A';
              }}
              onMouseOut={(e) => {
                if (!isSubmitted) e.currentTarget.style.background = '#0D98BA';
              }}
            >
              {isSubmitted ? 'Sent!' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .newsletter-container {
          position: relative;
          width: 100%;
          height: auto;
          min-height: 350px;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        
        .background-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }
        
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(0deg, rgba(4, 9, 29, 0.08) 62.29%, rgba(4, 9, 29, 0.4) 100%), 
                    linear-gradient(270deg, rgba(0, 0, 0, 0.6) -0.83%, rgba(0, 0, 0, 0) 50%);
          z-index: 1;
        }
        
        .content-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 40px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          z-index: 2;
        }
        
        .text-content {
          flex: 1 0 60%;
          max-width: 650px;
          margin-right: 20px;
        }
        
        .heading {
          position: relative;
          width: 100%;
          font-family: var(--font-poppins);
          font-weight: 600;
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0 0 10px 0;
        }
        
        .highlight {
          color: #0D98BA;
        }
        
        .subheading {
          position: relative;
          width: 100%;
          font-family: var(--font-poppins);
          font-weight: 500;
          font-size: clamp(18px, 3vw, 35px);
          line-height: 1.3;
          color: #FFFFFF;
          margin: 0;
        }
        
        .form-container {
          flex: 1 0 300px;
          max-width: 425px;
        }
        
        .newsletter-form {
          position: relative;
          width: 100%;
          height: auto;
          min-height: 73px;
          background: rgba(4, 9, 29, 0.8);
          border: 1px solid #7D818D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          box-sizing: border-box;
        }
        
        .input-container {
          display: flex;
          align-items: center;
          padding-left: 10px;
          flex: 1 1 auto;
        }
        
        .email-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-barlow);
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #FFFFFF;
          width: 100%;
          padding: 10px 5px;
        }
        
        .submit-button {
          width: 104px;
          height: 50px;
          background: #0D98BA;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-family: var(--font-barlow);
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #FFFFFF;
          transition: all 0.3s ease;
          flex: 0 0 auto;
        }
        
        .submitted {
          background: #4CAF50 !important;
        }
        
        @media (max-width: 768px) {
          .newsletter-form {
            margin-top: 30px;
          }
        }
        
        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column;
            padding: 15px;
          }
          
          .submit-button {
            width: 100%;
            margin-top: 10px;
          }
          
          .email-input {
            padding: 10px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
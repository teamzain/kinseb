'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
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
    <div className={`${poppins.variable} ${barlow.variable} newsletter-section`}>
      {/* Background image and overlay */}
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>
      
      {/* Content container */}
      <div className="content-container">
        {/* Main heading */}
        <h2 className="main-heading">
          Get <span className="highlight">Updates</span>
        </h2>

        {/* Subheading */}
        <h3 className="sub-heading">
          Sign up to get the latest updates and exclusive insights!
        </h3>

        {/* Form Container */}
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

      {/* Styles */}
      <style jsx>{`
        .newsletter-section {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
        }
        
        .background-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url('/images/news.jpg');
          background-size: cover;
          background-position: center;
          z-index: 1;
        }
        
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(4, 9, 29, 0.6); /* Enhanced overlay opacity for better visibility */
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
          flex-direction: column;
        }
        
        .main-heading {
          position: absolute;
          width: 100%;
          max-width: 1136px;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          color: #FFFFFF;
          top: 108px;
          margin: 0;
        }
        
        .highlight {
          color: #0D98BA;
        }
        
        .sub-heading {
          position: absolute;
          width: 650px;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 500;
          font-size: 35px;
          line-height: 45px;
          color: #FFFFFF;
          top: 175px;
          margin: 0;
        }
        
        .form-container {
          box-sizing: border-box;
          position: absolute;
          width: 425px;
          height: 73px;
          top: 150px;
          right: 20px; /* Positioned to the right side */
          background: rgba(4, 9, 29, 0.8);
          border: 1px solid #7D818D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
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
        
        /* Responsive styles for all screen sizes */
        @media (max-width: 1200px) {
          .content-container {
            padding: 0 40px;
          }
          
          .form-container {
            right: 40px;
          }
        }
        
        @media (max-width: 992px) {
          .main-heading {
            font-size: 48px;
            line-height: 56px;
            top: 80px;
          }
          
          .sub-heading {
            font-size: 30px;
            line-height: 40px;
            width: 60%; /* Reduced width to avoid overlap with form */
            top: 150px;
          }
          
          .form-container {
            width: 80%;
            max-width: 425px;
            top: 230px;
            right: 40px;
          }
        }
        
        @media (max-width: 768px) {
          .newsletter-section {
            height: 400px;
          }
          
          .main-heading {
            font-size: 42px;
            line-height: 48px;
            top: 60px;
          }
          
          .sub-heading {
            font-size: 26px;
            line-height: 34px;
            width: 100%;
            top: 120px;
          }
          
          .form-container {
            width: 100%;
            top: 200px;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 576px) {
          .newsletter-section {
            height: 450px;
          }
          
          .content-container {
            padding: 0 20px;
          }
          
          .main-heading {
            font-size: 36px;
            line-height: 42px;
            top: 50px;
          }
          
          .sub-heading {
            font-size: 22px;
            line-height: 30px;
            top: 110px;
          }
          
          .form-container {
            height: auto;
            padding: 15px 0;
            top: 200px;
            transform: translateX(-50%);
          }
          
          .input-wrapper {
            position: relative;
            left: 15px;
            width: calc(100% - 30px);
            transform: none;
            top: 0;
            margin-bottom: 50px;
          }
          
          .submit-button {
            position: relative;
            width: calc(100% - 30px);
            right: auto;
            top: 10px;
            left: 15px;
            transform: none;
            margin-top: 10px;
          }
        }
        
        @media (max-width: 380px) {
          .newsletter-section {
            height: 480px;
          }
          
          .main-heading {
            font-size: 32px;
            line-height: 38px;
          }
          
          .sub-heading {
            font-size: 20px;
            line-height: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
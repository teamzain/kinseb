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
    <div className={`${poppins.variable} ${barlow.variable} frame-14`}>
      {/* Background container with image and gradients directly applied */}
      <div className="frame-12">
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
            <div className="sub-container">
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
        .frame-14 {
          position: relative;
          width: 100%;
          max-width: 1440px;
          height: 350px;
          margin: 0 auto;
        }
        
        .frame-12 {
          position: absolute;
          width: 100%;
          height: 350px;
          left: 0px;
          top: 0px;
          background: linear-gradient(0deg, rgba(4, 9, 29, 0.08) 62.29%, rgba(4, 9, 29, 0.4) 100%), 
                    linear-gradient(270deg, rgba(0, 0, 0, 0.6) -0.83%, rgba(0, 0, 0, 0) 50%), 
                    url('/images/news.jpg');
          background-size: cover;
          background-position: center;
        }
        
        .main-heading {
          position: absolute;
          width: 100%;
          max-width: 1136px;
          height: 67px;
          left: 74px;
          top: 108px;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          color: #FFFFFF;
        }
        
        .highlight {
          color: #0D98BA;
        }
        
        .sub-heading {
          position: absolute;
          width: 650px;
          height: 67px;
          left: 74px;
          top: 175px;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 500;
          font-size: 35px;
          line-height: 45px;
          color: #FFFFFF;
        }
        
        .form-container {
          box-sizing: border-box;
          position: absolute;
          width: 425px;
          height: 73px;
          left: 74px;
          top: 239px;
          background: rgba(4, 9, 29, 0.8);
          border: 1px solid #7D818D;
          backdrop-filter: blur(6px);
          border-radius: 10px;
        }
        
        .sub-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 14px;
          position: absolute;
          width: 191px;
          height: 22px;
          left: 30px;
          top: calc(50% - 22px/2 + 0.5px);
        }
        
        .email-input {
          width: 250px;
          height: 22px;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-barlow);
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: #FFFFFF;
          flex: none;
          order: 0;
          flex-grow: 0;
        }
        
        .email-input::placeholder {
          color: #98989A;
        }
        
        .submit-button {
          position: absolute;
          width: 104px;
          height: 50px;
          right: 13px;
          top: calc(50% - 50px/2 + 0.5px);
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
          width: 36px;
          height: 24px;
          left: calc(50% - 36px/2);
          top: 14px;
          font-family: var(--font-barlow);
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #FFFFFF;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .main-heading {
            left: 40px;
            font-size: 42px;
            line-height: 50px;
          }
          
          .sub-heading {
            left: 40px;
            width: 80%;
            font-size: 28px;
            line-height: 36px;
          }
          
          .form-container {
            left: 40px;
            width: 80%;
            max-width: 425px;
          }
        }
        
        @media (max-width: 480px) {
          .main-heading {
            left: 20px;
            font-size: 36px;
            line-height: 44px;
            top: 80px;
          }
          
          .sub-heading {
            left: 20px;
            width: 90%;
            font-size: 24px;
            line-height: 32px;
            top: 150px;
          }
          
          .form-container {
            left: 20px;
            width: 90%;
            top: 230px;
          }
          
          .email-input {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
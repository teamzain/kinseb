'use client';

import React from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-poppins'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-lato'
});

// Service data interface
interface ServiceBannerData {
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface ServiceBannerProps {
  service: ServiceBannerData;
}

const ServiceBanner: React.FC<ServiceBannerProps> = ({ service }) => {
  return (
    <div className={`${poppins.variable} ${lato.variable} banner-container`}>
      <div className="banner-content">
        <div className="title-section">
          <h1>{service.title}</h1>
        </div>
        
        <div className="description-section">
          <p>{service.description}</p>
        </div>
        
        <div className="features-section">
          {service.features.map((feature, index) => (
            <div key={`feature-${index}`} className="feature-item">
              <div className="feature-checkmark">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6666 5L7.49998 14.1667L3.33331 10" stroke="#0D98BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">{feature}</span>
            </div>
          ))}
        </div>
        
        <button className="cta-button">
          Speak With Our Experts
        </button>
      </div>
      
      <div className="banner-image">
        <Image 
          src={service.image} 
          alt="Website Design Showcase"
          width={632}
          height={422}
          priority
        />
      </div>
      
      <style jsx>{`
        .banner-container {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: 750px;
          margin-top:80px;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          border: 1px solid #000000;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          padding: 0 74px;
        }
        
        .banner-content {
          position: relative;
          max-width: 690px;
          padding-top: 71px;
          z-index: 2;
        }
        
        .title-section {
          position: relative;
          margin-bottom: 60px;
        }
        
        .title-section h1 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 65px;
          line-height: 98px;
          color: #FFFFFF;
          margin: 0;
        }
        
        .description-section {
          position: relative;
          margin-bottom: 32px;
        }
        
        .description-section p {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          max-width: 650px;
          margin: 0;
        }
        
        .features-section {
          position: relative;
          margin-bottom: 40px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .feature-checkmark {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(13, 152, 186, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
        }
        
        .feature-text {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 42px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
        }
        
        .cta-button {
          position: relative;
          width: 207px;
          height: 45px;
          background: #0D98BA;
          border: 2px solid #0D98BA;
          border-radius: 6px;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #04091D;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          background: transparent;
          color: #0D98BA;
        }
        
        .banner-image {
          position: absolute;
          width: 632px;
          height: 422px;
          right: 74px;
          top: 153px;
          border-radius: 10px;
          overflow: hidden;
        }
        
        /* Responsive styles */
        @media (max-width: 1400px) {
          .banner-container {
            height: auto;
            padding-bottom: 60px;
          }
          
          .banner-image {
            position: relative;
            right: auto;
            top: auto;
            margin-top: 40px;
            width: 100%;
            height: auto;
            max-width: 632px;
          }
        }
        
        @media (max-width: 1024px) {
          .title-section h1 {
            font-size: 48px;
            line-height: 72px;
          }
          
          .banner-image {
            max-width: 500px;
          }
        }
        
        @media (max-width: 768px) {
          .banner-container {
            padding: 0 40px;
            padding-bottom: 60px;
          }
          
          .title-section h1 {
            font-size: 36px;
            line-height: 54px;
          }
          
          .description-section p {
            font-size: 18px;
            line-height: 27px;
          }
          
          .feature-text {
            font-size: 18px;
            line-height: 36px;
          }
        }
        
        @media (max-width: 480px) {
          .banner-container {
            padding: 0 20px;
            padding-bottom: 40px;
          }
          
          .title-section h1 {
            font-size: 28px;
            line-height: 42px;
          }
          
          .description-section p {
            font-size: 16px;
            line-height: 24px;
          }
          
          .feature-text {
            font-size: 16px;
            line-height: 32px;
          }
          
          .feature-checkmark {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceBanner;
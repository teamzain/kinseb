'use client';

import React from 'react';
import { ServiceData } from './serviceData';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-lato'
});

interface ServiceBannerProps {
  service: ServiceData;
}

const ServiceBanner: React.FC<ServiceBannerProps> = ({ service }) => {
  return (
    <div className={`${poppins.variable} ${lato.variable} service-banner`}>
      <div className="banner-content">
        <h1 className="banner-title">{service.title}</h1>
        <p className="banner-description">{service.longDescription}</p>
        
        <div className="features-list">
          <div className="feature-item">
            <div className="tick-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 13.5L4 10L5 9L7.5 11.5L15 4L16 5L7.5 13.5Z" fill="#0D98BA"/>
              </svg>
            </div>
            <span>100% custom, no cookie-cutter layouts</span>
          </div>
          
          <div className="feature-item">
            <div className="tick-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 13.5L4 10L5 9L7.5 11.5L15 4L16 5L7.5 13.5Z" fill="#0D98BA"/>
              </svg>
            </div>
            <span>Designed for conversion & engagement</span>
          </div>
          
          <div className="feature-item">
            <div className="tick-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 13.5L4 10L5 9L7.5 11.5L15 4L16 5L7.5 13.5Z" fill="#0D98BA"/>
              </svg>
            </div>
            <span>Strengthens your brand's digital identity</span>
          </div>
        </div>
        
        <button className="cta-button">
          Speak With Our Experts
        </button>
      </div>
      
      <div className="banner-image">
        <div className="mockup-image"></div>
      </div>
      
      <style jsx>{`
        .service-banner {
          box-sizing: border-box;
          position: relative;
          width: 100%;
          height: 750px;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        
        .banner-content {
          position: relative;
          width: 650px;
          padding-left: 74px;
          padding-top: 71px;
          z-index: 10;
        }
        
        .banner-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 65px;
          line-height: 98px;
          color: #FFFFFF;
          margin-bottom: 144px;
        }
        
        .banner-description {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          max-width: 650px;
          margin-bottom: 32px;
        }
        
        .features-list {
          margin-bottom: 46px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .tick-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        
        .feature-item span {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 42px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
        }
        
        .cta-button {
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
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .cta-button:hover {
          background-color: transparent;
          color: #0D98BA;
        }
        
        .banner-image {
          position: absolute;
          width: 632px;
          height: 422px;
          right: 40px;
          top: 153px;
        }
        
        .mockup-image {
          width: 100%;
          height: 100%;
          background-image: url('/images/website-mockups.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 10px;
        }
        
        @media (max-width: 1440px) {
          .banner-image {
            right: 2%;
            width: 45%;
          }
          
          .banner-content {
            width: 45%;
          }
        }
        
        @media (max-width: 1024px) {
          .service-banner {
            height: auto;
            padding-bottom: 60px;
          }
          
          .banner-content {
            width: 90%;
            padding-left: 5%;
          }
          
          .banner-title {
            font-size: 48px;
            line-height: 72px;
            margin-bottom: 80px;
          }
          
          .banner-image {
            position: relative;
            width: 90%;
            margin: 40px auto 0;
            right: auto;
            top: auto;
          }
        }
        
        @media (max-width: 768px) {
          .banner-title {
            font-size: 40px;
            line-height: 60px;
            margin-bottom: 60px;
          }
          
          .banner-description {
            font-size: 18px;
            line-height: 28px;
          }
          
          .feature-item span {
            font-size: 18px;
            line-height: 36px;
          }
        }
        
        @media (max-width: 480px) {
          .banner-title {
            font-size: 32px;
            line-height: 48px;
            margin-bottom: 40px;
          }
          
          .banner-description {
            font-size: 16px;
            line-height: 24px;
          }
          
          .feature-item span {
            font-size: 16px;
            line-height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceBanner;
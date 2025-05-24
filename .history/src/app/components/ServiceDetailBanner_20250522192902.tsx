'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  sectionHeading?: string;
}

interface ServiceBannerProps {
  service: ServiceBannerData;
}

const ServiceBanner: React.FC<ServiceBannerProps> = ({ service }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className={`${poppins.variable} ${lato.variable} banner-container ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="banner-wrapper">
        <div className="banner-content">
          <div className="title-section">
            <h1>{service.title}</h1>
          </div>
          
          <div className="description-section">
            <p>{service.description}</p>
          </div>
          
          <div className="features-section">
            {service.features.map((feature, index) => (
              <div key={`feature-${index}`} className="feature-item" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
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
            width={568}
            height={379}
            priority
          />
        </div>

        {/* Section Heading on Right Side */}
        <div className="section-heading">
          <h2>{service.sectionHeading || 'Featured Work'}</h2>
        </div>
      </div>
      
      <style jsx>{`
        .banner-container {
          box-sizing: border-box;
          position: relative;
          width: 100vw;
          min-height: 100vh;
          left: 50%;
          right: 50%;
          margin-top:20px;
          margin-left: -50vw;
          margin-right: -50vw;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          border: 1px solid #000000;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .banner-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .banner-wrapper {
          position: relative;
          width: 100%;
          max-width: 1440px;
          height: 750px;
          margin: 0 auto;
          padding: 0 74px;
          display: flex;
          align-items: center;
        }
        
        .banner-content {
          position: relative;
          max-width: 690px;
          z-index: 2;
          opacity: 0;
          transform: translateX(-30px);
          animation: slideInLeft 0.8s ease-out 0.3s forwards;
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-90deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: rotate(-90deg) scale(1);
          }
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
          opacity: 0;
          transform: translateY(20px);
        }

        .animate-in .feature-item {
          animation: fadeInUp 0.6s ease-out forwards;
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
          transition: all 0.3s ease;
        }

        .feature-checkmark:hover {
          background: rgba(13, 152, 186, 0.2);
          transform: scale(1.1);
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
          transform: translateY(10px);
          opacity: 0;
        }

        .animate-in .cta-button {
          animation: fadeInUp 0.6s ease-out 0.8s forwards;
        }
        
        .cta-button:hover {
          background: transparent;
          color: #0D98BA;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 152, 186, 0.3);
        }
        
        .banner-image {
          position: absolute;
          width: 568px;
          height: 379px;
          right: 74px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 10px;
          overflow: hidden;
          opacity: 0;
          z-index: 1;
        }

        .animate-in .banner-image {
          animation: slideInRight 0.8s ease-out 0.5s forwards;
        }

        .section-heading {
          position: absolute;
          right: -100px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          z-index: 3;
          opacity: 0;
        }

        .animate-in .section-heading {
          animation: rotateIn 0.8s ease-out 1s forwards;
        }

        .section-heading h2 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 54px;
          line-height: 64px;
          letter-spacing: -0.03em;
          color: rgba(13, 152, 186, 0.3);
          margin: 0;
          white-space: nowrap;
        }
        
        /* Responsive styles */
        @media (max-width: 1400px) {
          .banner-wrapper {
            height: auto;
            min-height: 100vh;
            padding: 60px 40px;
            flex-direction: column;
            justify-content: center;
          }

          .section-heading {
            display: none;
          }
          
          .banner-image {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            margin-top: 40px;
            width: 100%;
            height: auto;
            max-width: 568px;
          }

          .banner-content {
            max-width: 100%;
          }
        }
        
        @media (max-width: 1024px) {
          .banner-wrapper {
            padding: 50px 30px;
          }

          .title-section h1 {
            font-size: 48px;
            line-height: 72px;
          }
          
          .banner-image {
            max-width: 500px;
          }
        }
        
        @media (max-width: 768px) {
          .banner-wrapper {
            padding: 40px 20px;
            min-height: 100vh;
          }
          
          .title-section {
            margin-bottom: 40px;
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

          .banner-image {
            margin-top: 30px;
            max-width: 100%;
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .banner-wrapper {
            padding: 30px 15px;
            min-height: 100vh;
          }
          
          .title-section {
            margin-bottom: 30px;
          }

          .title-section h1 {
            font-size: 28px;
            line-height: 42px;
          }
          
          .description-section {
            margin-bottom: 24px;
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
            margin-right: 15px;
          }

          .feature-checkmark svg {
            width: 16px;
            height: 16px;
          }

          .cta-button {
            width: 100%;
            max-width: 207px;
          }

          .banner-image {
            margin-top: 24px;
          }
        }

        @media (max-width: 360px) {
          .banner-wrapper {
            padding: 25px 10px;
          }

          .title-section h1 {
            font-size: 24px;
            line-height: 36px;
          }

          .description-section p {
            font-size: 14px;
            line-height: 21px;
          }

          .feature-text {
            font-size: 14px;
            line-height: 28px;
          }
        }

        /* High resolution displays */
        @media (min-width: 1441px) {
          .banner-wrapper {
            max-width: 1600px;
            padding: 0 100px;
          }

          .banner-image {
            right: 100px;
          }

          .section-heading {
            right: -80px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceBanner;
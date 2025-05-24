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
        rootMargin: '-100px 0px -100px 0px'
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
              <div key={`feature-${index}`} className="feature-item" style={{ animationDelay: `${0.8 + index * 0.2}s` }}>
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
            <span>Speak With Our Experts</span>
            <div className="button-glow"></div>
          </button>
        </div>
        
        <div className="banner-image">
          <div className="image-glow"></div>
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
          width: 100%;
          min-height: 100vh;
          margin-top: 120px;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0px 20px 40px rgba(0, 0, 0, 0.3),
            inset 0px 1px 0px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(100px) scale(0.95);
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .banner-container.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
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
          transform: translateX(-60px);
        }

        .animate-in .banner-content {
          animation: slideInLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards;
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px) translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateIn {
          0% {
            opacity: 0;
            transform: rotate(-90deg) scale(0.7) translateX(20px);
          }
          100% {
            opacity: 1;
            transform: rotate(-90deg) scale(1) translateX(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes checkmarkDraw {
          0% {
            stroke-dasharray: 0 20;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 20 0;
            stroke-dashoffset: 0;
          }
        }

        @keyframes buttonHover {
          0% {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(13, 152, 186, 0.2);
          }
          100% {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(13, 152, 186, 0.4);
          }
        }
        
        .title-section {
          position: relative;
          margin-bottom: 60px;
          overflow: hidden;
        }
        
        .title-section h1 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 65px;
          line-height: 98px;
          color: #FFFFFF;
          margin: 0;
          background: linear-gradient(135deg, #FFFFFF 0%, #0D98BA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          color: rgba(255, 255, 255, 0.9);
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
          transform: translateY(30px);
        }

        .animate-in .feature-item {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        .feature-checkmark {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(13, 152, 186, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13, 152, 186, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-checkmark::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(13, 152, 186, 0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.6s ease;
          opacity: 0;
        }

        .feature-checkmark:hover::before {
          opacity: 1;
          animation: glowPulse 2s infinite;
        }

        .feature-checkmark:hover {
          background: rgba(13, 152, 186, 0.25);
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 5px 20px rgba(13, 152, 186, 0.3);
        }

        .animate-in .feature-checkmark svg path {
          animation: checkmarkDraw 0.6s ease-out forwards;
        }
        
        .feature-text {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 42px;
          letter-spacing: -0.03em;
          color: rgba(255, 255, 255, 0.95);
          transition: color 0.3s ease;
        }

        .feature-item:hover .feature-text {
          color: #FFFFFF;
        }
        
        .cta-button {
          position: relative;
          width: 207px;
          height: 45px;
          background: linear-gradient(135deg, #0D98BA 0%, #0A7A94 100%);
          border: 2px solid #0D98BA;
          border-radius: 8px;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #04091D;
          cursor: pointer;
          transform: translateY(20px);
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animate-in .cta-button {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.4s forwards;
        }

        .cta-button span {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          background: linear-gradient(135deg, #0A7A94 0%, #085F75 100%);
          color: #FFFFFF;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(13, 152, 186, 0.4);
        }

        .cta-button:hover .button-glow {
          opacity: 1;
        }

        .cta-button:active {
          transform: translateY(-1px);
          transition: all 0.1s ease;
        }
        
        .banner-image {
          position: absolute;
          width: 568px;
          height: 379px;
          right: 74px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 15px;
          overflow: hidden;
          opacity: 0;
          z-index: 1;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .animate-in .banner-image {
          animation: slideInRight 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards;
        }

        .image-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, #0D98BA, #04091D, #0D98BA);
          border-radius: 20px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.6s ease;
          animation: glowPulse 3s infinite;
        }

        .banner-image:hover .image-glow {
          opacity: 0.3;
        }

        .section-heading {
          position: absolute;
          right: -120px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          z-index: 3;
          opacity: 0;
        }

        .animate-in .section-heading {
          animation: rotateIn 1s cubic-bezier(0.23, 1, 0.32, 1) 1.2s forwards;
        }

        .section-heading h2 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 54px;
          line-height: 64px;
          letter-spacing: -0.03em;
          color: rgba(13, 152, 186, 0.25);
          margin: 0;
          white-space: nowrap;
          background: linear-gradient(135deg, rgba(13, 152, 186, 0.3) 0%, rgba(13, 152, 186, 0.1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
            margin-top: 50px;
            width: 100%;
            height: auto;
            max-width: 568px;
          }

          .banner-content {
            max-width: 100%;
          }
        }
        
        @media (max-width: 1024px) {
          .banner-container {
            margin-top: 80px;
          }

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
          .banner-container {
            margin-top: 60px;
          }

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
            margin-top: 40px;
            max-width: 100%;
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .banner-container {
            margin-top: 40px;
          }

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
            max-width: 250px;
          }

          .banner-image {
            margin-top: 30px;
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
            right: -100px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceBanner;
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
      {/* Animated Background Elements */}
      <div className="bg-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="banner-wrapper">
        <div className="banner-content">
          <div className="title-section">
            <h1>{service.title}</h1>
            {/* <div className="title-underline"></div> */}
          </div>
          
          <div className="description-section">
            <p>{service.description}</p>
          </div>
          
          <div className="features-section">
            {service.features.map((feature, index) => (
              <div key={`feature-${index}`} className="feature-item" style={{ animationDelay: `${0.4 + index * 0.15}s` }}>
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
            <div className="button-shine"></div>
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
          max-width: 100vw;
          min-height: 100vh;
          margin: 20px 0 0 0;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          border: 1px solid #000000;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          overflow-x: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(80px) scale(0.95);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .banner-container.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Animated Background Particles */
        .bg-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          background: rgba(13, 152, 186, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
          animation-duration: 8s;
        }

        .particle-2 {
          width: 60px;
          height: 60px;
          top: 60%;
          left: 80%;
          animation-delay: 1s;
          animation-duration: 6s;
        }

        .particle-3 {
          width: 80px;
          height: 80px;
          top: 10%;
          right: 20%;
          animation-delay: 2s;
          animation-duration: 7s;
        }

        .particle-4 {
          width: 40px;
          height: 40px;
          top: 80%;
          left: 15%;
          animation-delay: 3s;
          animation-duration: 5s;
        }

        .particle-5 {
          width: 120px;
          height: 120px;
          top: 40%;
          right: 10%;
          animation-delay: 1.5s;
          animation-duration: 9s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
            opacity: 0.7;
          }
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
          z-index: 1;
        }
        
        .banner-content {
          position: relative;
          max-width: 690px;
          z-index: 2;
          opacity: 0;
          transform: translateX(-60px);
        }

        .animate-in .banner-content {
          animation: slideInLeftSmooth 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        @keyframes slideInLeftSmooth {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRightSmooth {
          from {
            opacity: 0;
            transform: translateX(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes fadeInUpSmooth {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateInSmooth {
          from {
            opacity: 0;
            transform: translateY(-50%) rotate(-90deg) scale(0.7);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) rotate(-90deg) scale(1);
          }
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateY(30px);
            clip-path: inset(100% 0 0 0);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            clip-path: inset(0% 0 0 0);
          }
        }

        @keyframes underlineGrow {
          from {
            width: 0;
          }
          to {
            width: 120px;
          }
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(13, 152, 186, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(13, 152, 186, 0);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        .title-section {
          position: relative;
          margin-bottom: 60px;
          overflow: hidden;
        }

        .animate-in .title-section h1 {
          animation: titleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }

        .title-underline {
          height: 4px;
          background: linear-gradient(90deg, #0D98BA, #04091D);
          margin-top: 15px;
          width: 0;
          border-radius: 2px;
        }

        .animate-in .title-underline {
          animation: underlineGrow 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }
        
        .title-section h1 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 65px;
          line-height: 70px;
          color: #FFFFFF;
          margin: 0;
          opacity: 0;
          background: linear-gradient(135deg, #FFFFFF 0%, #0D98BA 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .description-section {
          position: relative;
          margin-bottom: 12px;
        }

        .animate-in .description-section p {
          animation: fadeInUpSmooth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
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
          opacity: 0;
          transform: translateY(20px);
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
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-item:hover {
          transform: translateX(10px);
        }

        .animate-in .feature-item {
          animation: fadeInUpSmooth 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .feature-checkmark {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(13, 152, 186, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 2px solid rgba(13, 152, 186, 0.3);
        }

        .feature-checkmark:hover {
          background: rgba(13, 152, 186, 0.3);
          transform: scale(1.1) rotate(360deg);
          box-shadow: 0 4px 15px rgba(13, 152, 186, 0.4);
        }
        
        .feature-text {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 42px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          transition: color 0.3s ease;
        }

        .feature-item:hover .feature-text {
          color: #0D98BA;
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
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(30px);
          opacity: 0;
          overflow: hidden;
        }

        .animate-in .cta-button {
          animation: fadeInUpSmooth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards;
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .cta-button:hover .button-shine {
          left: 100%;
        }
        
        .cta-button:hover {
          background: transparent;
          color: #0D98BA;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(13, 152, 186, 0.4);
          animation: pulse 2s infinite;
        }

        .cta-button span {
          position: relative;
          z-index: 2;
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

        .image-glow {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(13, 152, 186, 0.3) 0%, transparent 70%);
          border-radius: 20px;
          z-index: -1;
          animation: glow 3s ease-in-out infinite;
        }

        .animate-in .banner-image {
          animation: slideInRightSmooth 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
        }

        .banner-image img {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .banner-image:hover img {
          transform: scale(1.05);
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
          animation: rotateInSmooth 1s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards;
        }

        .section-heading h2 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 54px;
          line-height: 64px;
          letter-spacing: -0.03em;
          color: rgba(13, 152, 186, 0.2);
          margin: 0;
          white-space: nowrap;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
          .banner-container {
            overflow-x: hidden;
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
            margin-top: 30px;
            max-width: 100%;
            width: 100%;
          }

          .particle {
            display: none;
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
      `}</style>
    </div>
  );
};

export default ServiceBanner;
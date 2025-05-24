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
        rootMargin: '0px'
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
            sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1400px) 50vw, 40vw"
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
          height: 100vh;
          max-height: 100vh;
          margin: 0;
          background: linear-gradient(180deg, #04091D 16.18%, #0D98BA 219.08%);
          border: 1px solid #000000;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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
          overflow: hidden;
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
            transform: translateY(-15px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
            opacity: 0.7;
          }
        }

        .banner-wrapper {
          position: relative;
          width: 100%;
          max-width: 1440px;
          height: 100%;
          margin: 0 auto;
          padding: 40px 74px;
          display: flex;
          align-items: center;
          z-index: 1;
          box-sizing: border-box;
        }
        
        .banner-content {
          position: relative;
          max-width: 690px;
          z-index: 2;
          opacity: 0;
          transform: translateX(-30px);
          flex-shrink: 0;
        }

        .animate-in .banner-content {
          animation: slideInLeftSmooth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
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
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes fadeInUpSmooth {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateInSmooth {
          from {
            opacity: 0;
            transform: translateY(-50%) rotate(-90deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) rotate(-90deg) scale(1);
          }
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(13, 152, 186, 0);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        .title-section {
          position: relative;
          margin-bottom: 40px;
        }

        .animate-in .title-section h1 {
          animation: titleReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }
        
        .title-section h1 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 1.1;
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
          margin-bottom: 24px;
        }

        .animate-in .description-section p {
          animation: fadeInUpSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }
        
        .description-section p {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.5;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          max-width: 650px;
          margin: 0;
          opacity: 0;
          transform: translateY(15px);
        }
        
        .features-section {
          position: relative;
          margin-bottom: 32px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-item:hover {
          transform: translateX(8px);
        }

        .animate-in .feature-item {
          animation: fadeInUpSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .feature-checkmark {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .feature-checkmark:hover {
          background: rgba(13, 152, 186, 0.2);
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(13, 152, 186, 0.3);
        }
        
        .feature-text {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.4;
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
          transform: translateY(20px);
          opacity: 0;
          overflow: hidden;
          flex-shrink: 0;
        }

        .animate-in .cta-button {
          animation: fadeInUpSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
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
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 152, 186, 0.3);
          animation: pulse 2s infinite;
        }

        .cta-button span {
          position: relative;
          z-index: 2;
        }
        
        .banner-image {
          position: absolute;
          width: clamp(300px, 40vw, 600px);
          height: auto;
          right: clamp(20px, 8vw, 104px);
          top: 50%;
          transform: translateY(-50%);
          border-radius: 10px;
          overflow: hidden;
          opacity: 0;
          z-index: 1;
        }

        .banner-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 10px;
          max-height: clamp(250px, 50vh, 500px);
        }

        .image-glow {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(13, 152, 186, 0.2) 0%, transparent 70%);
          border-radius: 20px;
          z-index: -1;
          animation: glow 3s ease-in-out infinite;
        }

        .animate-in .banner-image {
          animation: slideInRightSmooth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }

        .banner-image:hover img {
          transform: scale(1.02);
        }

        .section-heading {
          position: absolute;
          right: -130px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          z-index: 3;
          opacity: 0;
        }

        .animate-in .section-heading {
          animation: rotateInSmooth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }

        .section-heading h2 {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: #0D98BA;
          margin: 0;
          white-space: nowrap;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        /* Responsive styles */
        @media (max-width: 1400px) {
          .banner-wrapper {
            padding: 40px;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }

          .section-heading {
            display: none;
          }
          
          .banner-image {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            margin-top: 32px;
            width: clamp(280px, 70vw, 500px);
            max-width: 100%;
          }

          .banner-image img {
            max-height: clamp(200px, 40vh, 350px);
          }

          .banner-content {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .title-section,
          .description-section,
          .features-section {
            width: 100%;
            max-width: 600px;
          }
        }
        
        @media (max-width: 1024px) {
          .banner-container {
            height: auto;
            min-height: 100vh;
            padding: 20px 0;
          }

          .banner-wrapper {
            padding: 60px 32px 32px 32px;
          }
          
          .banner-image {
            width: clamp(250px, 60vw, 400px);
            margin-top: 24px;
          }

          .banner-image img {
            max-height: clamp(180px, 35vh, 300px);
          }

          .particle {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .banner-container {
            height: auto;
            min-height: 100vh;
            padding: 40px 0;
          }

          .banner-wrapper {
            padding: 60px 24px 40px 24px;
            text-align: center;
          }
          
          .title-section {
            margin-bottom: 32px;
            text-align: center;
          }

          .title-section h1 {
            font-size: clamp(1.8rem, 6vw, 3rem) !important;
          }
          
          .description-section {
            margin-bottom: 20px;
            text-align: center;
          }

          .features-section {
            margin-bottom: 28px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .feature-item {
            margin-bottom: 12px;
            justify-content: flex-start;
            text-align: left;
            max-width: 100%;
            width: 100%;
          }

          .feature-text {
            font-size: clamp(0.9rem, 3vw, 1.1rem) !important;
          }

          .feature-checkmark {
            width: 28px;
            height: 28px;
            margin-right: 12px;
          }

          .feature-checkmark svg {
            width: 16px;
            height: 16px;
          }

          .banner-image {
            width: clamp(220px, 80vw, 350px);
            margin-top: 20px;
          }

          .banner-image img {
            max-height: clamp(150px, 30vh, 250px);
          }

          .cta-button {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 480px) {
          .banner-container {
            padding: 20px 0;
          }

          .banner-wrapper {
            padding: 40px 16px 30px 16px;
            text-align: center;
          }
          
          .title-section {
            margin-bottom: 24px;
            text-align: center;
          }

          .title-section h1 {
            font-size: clamp(1.5rem, 7vw, 2.5rem) !important;
          }
          
          .description-section {
            margin-bottom: 16px;
            text-align: center;
          }

          .description-section p {
            font-size: clamp(0.9rem, 3.5vw, 1.1rem) !important;
          }

          .features-section {
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .feature-item {
            justify-content: flex-start;
            text-align: left;
            width: 100%;
            margin-bottom: 10px;
          }

          .feature-text {
            font-size: clamp(0.8rem, 3.5vw, 1rem) !important;
          }
          
          .feature-checkmark {
            width: 24px;
            height: 24px;
            margin-right: 10px;
          }

          .feature-checkmark svg {
            width: 14px;
            height: 14px;
          }

          .banner-image {
            width: clamp(200px, 85vw, 300px);
            margin-top: 16px;
          }

          .banner-image img {
            max-height: clamp(120px, 25vh, 200px);
          }

          .cta-button {
            margin: 0 auto;
            width: clamp(180px, 80vw, 250px);
            font-size: clamp(14px, 3.5vw, 16px);
            height: clamp(40px, 10vw, 45px);
          }
        }

        @media (max-width: 360px) {
          .banner-wrapper {
            padding: 30px 12px 20px 12px;
          }

          .banner-image {
            width: clamp(180px, 90vw, 280px);
          }

          .banner-image img {
            max-height: clamp(100px, 20vh, 180px);
          }

          .title-section h1 {
            font-size: clamp(1.3rem, 8vw, 2rem) !important;
          }
        }

        @media (max-height: 600px) {
          .banner-container {
            height: auto;
            min-height: 100vh;
            padding: 10px 0;
          }

          .banner-wrapper {
            padding: 40px 20px 20px 20px;
          }

          .title-section {
            margin-bottom: 16px;
          }

          .description-section {
            margin-bottom: 12px;
          }

          .features-section {
            margin-bottom: 16px;
          }

          .feature-item {
            margin-bottom: 8px;
          }

          .banner-image img {
            max-height: clamp(100px, 20vh, 150px);
          }
        }

        /* Landscape mobile orientation */
        @media (max-width: 768px) and (orientation: landscape) {
          .banner-container {
            height: auto;
            min-height: 100vh;
            padding: 20px 0;
          }

          .banner-wrapper {
            padding: 40px 24px 20px 24px;
            flex-direction: row;
            align-items: center;
            gap: 20px;
          }

          .banner-content {
            flex: 1;
            max-width: 50%;
          }

          .banner-image {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            margin-top: 0;
            width: clamp(200px, 40vw, 300px);
            flex-shrink: 0;
          }

          .banner-image img {
            max-height: clamp(120px, 40vh, 200px);
          }

          .section-heading {
            display: none;
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1920px) {
          .banner-image {
            width: clamp(500px, 35vw, 700px);
            right: clamp(80px, 6vw, 150px);
          }

          .banner-image img {
            max-height: clamp(400px, 45vh, 600px);
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceBanner;
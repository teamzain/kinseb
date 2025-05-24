'use client';

import React, { useState, useEffect } from 'react';
import { Poppins, Lato } from 'next/font/google';
import { getFAQsByServiceId } from './faqData';

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

// FAQ interface
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  serviceId: number;
  title?: string;
}

const ServiceFAQ: React.FC<ServiceFAQProps> = ({ serviceId, title }) => {
  const faqs = getFAQsByServiceId(serviceId);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const getServiceTitle = (serviceId: number) => {
    const serviceTitles: { [key: number]: string } = {
      1: 'Website Design Company',
      2: 'E-commerce Solutions',
      3: 'Digital Marketing Agency'
    };
    return serviceTitles[serviceId] || 'Our Services';
  };

  const displayTitle = title || getServiceTitle(serviceId);

  return (
    <div className={`${poppins.variable} ${lato.variable} faq-container`}>
      <div className={`faq-content ${isVisible ? 'fade-in' : ''}`}>
        <h2 className="faq-title">
          {displayTitle} <span className="highlight">FAQs</span>
        </h2>
        
        <div className="faq-items-container">
          {faqs.map((faq, index) => (
            <div 
              key={`faq-${faq.id}`} 
              className={`faq-item ${openFAQ === index ? 'open' : 'closed'} fade-in-item`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="faq-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div className="faq-content-wrapper">
                <button 
                  className="faq-question-button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <h3 className="faq-question">{faq.question}</h3>
                  <div className={`faq-arrow ${openFAQ === index ? 'open' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                
                <div className={`faq-answer-container ${openFAQ === index ? 'open' : ''}`}>
                  <div className="faq-answer-wrapper">
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(180deg, #04091D 67.5%, #0D98BA 381.5%);
          padding: clamp(40px, 8vw, 77px) 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
        }

        .faq-content {
          position: relative;
          width: 100%;
          max-width: 1440px;
          padding: 0 clamp(15px, 4vw, 59px);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-content.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(24px, 5vw, 56px);
          line-height: 1.2;
          color: #FFFFFF;
          text-align: center;
          margin: 0 0 clamp(25px, 5vw, 67px) 0;
          animation: titleGlow 2s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          from {
            text-shadow: 0 0 20px rgba(13, 152, 186, 0.3);
          }
          to {
            text-shadow: 0 0 30px rgba(13, 152, 186, 0.6);
          }
        }

        .highlight {
          color: #0D98BA;
          position: relative;
          display: inline-block;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #0D98BA, #0CC0DF);
          border-radius: 2px;
          animation: highlightPulse 2s ease-in-out infinite;
        }

        @keyframes highlightPulse {
          0%, 100% { opacity: 0.6; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.05); }
        }

        .faq-items-container {
          position: relative;
          width: 100%;
          max-width: 1321px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 24px);
        }

        .faq-item {
          position: relative;
          width: 100%;
          background: rgba(13, 152, 186, 0.08);
          border: 1px solid rgba(13, 152, 186, 0.2);
          border-radius: clamp(8px, 1vw, 15px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateX(-50px);
        }

        .fade-in-item {
          animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .faq-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(13, 152, 186, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .faq-item:hover::before {
          left: 100%;
        }

        .faq-item.closed {
          height: clamp(80px, 10vw, 106px);
        }

        .faq-item.open {
          min-height: clamp(140px, 18vw, 187px);
          height: auto;
          background: rgba(13, 152, 186, 0.12);
          border-color: rgba(13, 152, 186, 0.4);
          box-shadow: 0 8px 32px rgba(13, 152, 186, 0.15);
        }

        .faq-number {
          position: absolute;
          left: clamp(15px, 3vw, 40px);
          top: clamp(15px, 2vw, 23px);
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(20px, 4vw, 40px);
          line-height: 1.5;
          color: #0D94BB;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .faq-item.open .faq-number {
          color: #0CC0DF;
          transform: scale(1.1);
          text-shadow: 0 0 10px rgba(12, 192, 223, 0.5);
        }

        .faq-content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          padding-left: clamp(55px, 10vw, 142px);
          padding-right: clamp(15px, 3vw, 40px);
        }

        .faq-question-button {
          position: relative;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: clamp(80px, 10vw, 106px);
          text-align: left;
          transition: all 0.3s ease;
        }

        .faq-question-button:hover {
          transform: translateX(5px);
        }

        .faq-question {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(14px, 2vw, 18px);
          line-height: 1.5;
          color: #FFFFFF;
          margin: 0;
          flex: 1;
          padding-right: clamp(10px, 2vw, 20px);
          transition: all 0.3s ease;
        }

        .faq-item.open .faq-question {
          font-family: var(--font-poppins);
          font-size: clamp(16px, 2.5vw, 22px);
          line-height: 1.5;
          color: #0D98BA;
          margin-bottom: clamp(12px, 2vw, 16px);
          text-shadow: 0 0 10px rgba(13, 152, 186, 0.3);
        }

        .faq-arrow {
          width: clamp(16px, 2vw, 20px);
          height: clamp(16px, 2vw, 20px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: rotate(0deg);
          color: #0D98BA;
        }

        .faq-arrow.open {
          transform: rotate(180deg);
          color: #0CC0DF;
        }

        .faq-arrow svg {
          width: 100%;
          height: 100%;
        }

        .faq-answer-container {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .faq-answer-container.open {
          max-height: 300px;
          opacity: 1;
          padding-bottom: clamp(20px, 3vw, 24px);
        }

        .faq-answer-wrapper {
          transform: translateY(-20px);
          transition: transform 0.3s ease 0.1s;
        }

        .faq-answer-container.open .faq-answer-wrapper {
          transform: translateY(0);
        }

        .faq-answer {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(14px, 2vw, 18px);
          line-height: 1.6;
          color: #E6E6E6;
          margin: 0;
          padding-right: clamp(20px, 4vw, 60px);
        }

        .faq-item:hover {
          background: rgba(13, 152, 186, 0.15);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(13, 152, 186, 0.2);
          border-color: rgba(13, 152, 186, 0.3);
        }

        /* Enhanced Responsive Design */
        @media (max-width: 1440px) {
          .faq-container {
            min-height: auto;
          }
        }

        @media (max-width: 1200px) {
          .faq-item.closed {
            height: clamp(85px, 12vw, 100px);
          }
          
          .faq-question-button {
            min-height: clamp(85px, 12vw, 100px);
          }
        }

        @media (max-width: 968px) {
          .faq-container {
            padding: clamp(30px, 6vw, 60px) 0;
          }
          
          .faq-item.open {
            min-height: clamp(120px, 15vw, 150px);
          }
          
          .faq-question-button:hover {
            transform: translateX(3px);
          }
        }

        @media (max-width: 768px) {
          .faq-item:hover {
            transform: translateY(-2px);
          }
          
          .faq-answer-container.open {
            max-height: 250px;
          }
        }

        @media (max-width: 640px) {
          .faq-container {
            min-height: auto;
          }
          
          .faq-item.closed {
            height: auto;
            min-height: clamp(70px, 15vw, 85px);
          }
          
          .faq-question-button {
            min-height: clamp(70px, 15vw, 85px);
            padding: clamp(10px, 2vw, 15px) 0;
          }
        }

        @media (max-width: 480px) {
          .faq-arrow {
            width: 14px;
            height: 14px;
          }
          
          .faq-answer-container.open {
            max-height: 200px;
          }
        }

        @media (max-width: 375px) {
          .faq-container {
            padding: 25px 0;
          }
          
          .faq-content {
            padding: 0 10px;
          }
          
          .faq-item {
            border-radius: 8px;
          }
          
          .faq-items-container {
            gap: 12px;
          }
        }

        /* Animation optimizations for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .faq-item,
          .faq-content,
          .faq-arrow,
          .faq-answer-container,
          .faq-number {
            transition: none;
            animation: none;
          }
          
          .fade-in-item {
            opacity: 1;
            transform: translateX(0);
          }
          
          .faq-content.fade-in {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .faq-item {
            border: 2px solid #0D98BA;
          }
          
          .faq-question {
            color: #FFFFFF;
          }
          
          .faq-item.open .faq-question {
            color: #00D4FF;
          }
        }

        /* Dark mode optimization */
        @media (prefers-color-scheme: dark) {
          .faq-container {
            background: linear-gradient(180deg, #02050F 67.5%, #0A7A96 381.5%);
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceFAQ;
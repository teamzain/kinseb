'use client';

import React, { useState } from 'react';
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
  weight: ['600'],
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default

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
      <div className="faq-content">
        <h2 className="faq-title">
          {displayTitle} <span className="highlight">FAQs</span>
        </h2>
        
        <div className="faq-items-container">
          {faqs.map((faq, index) => (
            <div 
              key={`faq-${faq.id}`} 
              className={`faq-item ${openFAQ === index ? 'open' : 'closed'}`}
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
                    <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 15L10 20L15 15" stroke="#0D98BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                
                <div className={`faq-answer-container ${openFAQ === index ? 'open' : ''}`}>
                  <p className="faq-answer">{faq.answer}</p>
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
          min-height: 800px;
          background: linear-gradient(180deg, #04091D 67.5%, #0D98BA 381.5%);
          padding: 77px 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .faq-content {
          position: relative;
          width: 100%;
          max-width: 1440px;
          padding: 0 59px;
        }

        .faq-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          color: #FFFFFF;
          text-align: center;
          margin: 0 0 67px 0;
        }

        .highlight {
          color: #0D98BA;
        }

        .faq-items-container {
          position: relative;
          width: 100%;
          max-width: 1321px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .faq-item {
          position: relative;
          width: 100%;
          background: rgba(13, 152, 186, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .faq-item.closed {
          height: 106px;
        }

        .faq-item.open {
          min-height: 187px;
          height: auto;
        }

        .faq-number {
          position: absolute;
          left: 40px;
          top: 23px;
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 60px;
          color: #0D94BB;
          z-index: 2;
        }

        .faq-content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          padding-left: 142px;
          padding-right: 40px;
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
          min-height: 106px;
          text-align: left;
        }

        .faq-question {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 150%;
          color: #FFFFFF;
          margin: 0;
          flex: 1;
          padding-right: 20px;
        }

        .faq-item.open .faq-question {
          font-family: var(--font-poppins);
          font-size: 22px;
          line-height: 33px;
          color: #0D98BA;
          margin-bottom: 16px;
        }

        .faq-arrow {
          width: 20px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          transform: rotate(90deg);
        }

        .faq-arrow.open {
          transform: rotate(-90deg);
        }

        .faq-answer-container {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .faq-answer-container.open {
          max-height: 200px;
          padding-bottom: 24px;
        }

        .faq-answer {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 150%;
          color: #E6E6E6;
          margin: 0;
          padding-right: 60px;
        }

        .faq-item:hover {
          background: rgba(13, 152, 186, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(13, 152, 186, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 1440px) {
          .faq-content {
            padding: 0 40px;
          }
          
          .faq-items-container {
            max-width: 100%;
          }
        }

        @media (max-width: 1200px) {
          .faq-title {
            font-size: 48px;
            line-height: 56px;
            margin-bottom: 50px;
          }
          
          .faq-content-wrapper {
            padding-left: 120px;
            padding-right: 30px;
          }
        }

        @media (max-width: 968px) {
          .faq-container {
            min-height: auto;
            padding: 60px 0;
          }
          
          .faq-content {
            padding: 0 30px;
          }
          
          .faq-title {
            font-size: 40px;
            line-height: 48px;
            margin-bottom: 40px;
          }
          
          .faq-number {
            left: 25px;
            font-size: 32px;
            line-height: 48px;
          }
          
          .faq-content-wrapper {
            padding-left: 90px;
            padding-right: 20px;
          }
          
          .faq-item.closed {
            height: auto;
            min-height: 90px;
          }
          
          .faq-item.open {
            min-height: 150px;
          }
          
          .faq-question-button {
            min-height: 90px;
            padding: 15px 0;
          }
        }

        @media (max-width: 768px) {
          .faq-content {
            padding: 0 20px;
          }
          
          .faq-title {
            font-size: 32px;
            line-height: 40px;
            margin-bottom: 30px;
          }
          
          .faq-number {
            left: 20px;
            font-size: 28px;
            line-height: 42px;
            top: 20px;
          }
          
          .faq-content-wrapper {
            padding-left: 70px;
            padding-right: 15px;
          }
          
          .faq-question {
            font-size: 16px;
          }
          
          .faq-item.open .faq-question {
            font-size: 18px;
            line-height: 27px;
          }
          
          .faq-answer {
            font-size: 16px;
            padding-right: 40px;
          }
          
          .faq-answer-container.open {
            max-height: 150px;
            padding-bottom: 20px;
          }
        }

        @media (max-width: 640px) {
          .faq-container {
            padding: 40px 0;
          }
          
          .faq-content {
            padding: 0 15px;
          }
          
          .faq-title {
            font-size: 28px;
            line-height: 36px;
            margin-bottom: 25px;
          }
          
          .faq-number {
            left: 15px;
            font-size: 24px;
            line-height: 36px;
            top: 18px;
          }
          
          .faq-content-wrapper {
            padding-left: 55px;
            padding-right: 10px;
          }
          
          .faq-question {
            font-size: 15px;
          }
          
          .faq-item.open .faq-question {
            font-size: 17px;
            line-height: 25px;
          }
          
          .faq-answer {
            font-size: 15px;
            padding-right: 30px;
          }
          
          .faq-arrow {
            width: 16px;
            height: 32px;
          }
        }

        @media (max-width: 480px) {
          .faq-title {
            font-size: 24px;
            line-height: 32px;
          }
          
          .faq-number {
            font-size: 20px;
            line-height: 30px;
          }
          
          .faq-content-wrapper {
            padding-left: 45px;
          }
          
          .faq-question {
            font-size: 14px;
          }
          
          .faq-item.open .faq-question {
            font-size: 16px;
            line-height: 24px;
          }
          
          .faq-answer {
            font-size: 14px;
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceFAQ;
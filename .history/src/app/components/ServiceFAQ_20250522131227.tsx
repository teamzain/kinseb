'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === containerRef.current) {
              setIsVisible(true);
            } else if (entry.target === titleRef.current) {
              // Title animation trigger
            } else {
              // FAQ item animation
              const index = itemRefs.current.findIndex(ref => ref === entry.target);
              if (index !== -1) {
                setVisibleItems(prev => [...new Set([...prev, index])]);
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe container
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Observe title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // Observe FAQ items with staggered delay
    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          observer.observe(ref);
        }, index * 100); // Stagger the observation
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [faqs]);

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
    <div 
      ref={containerRef}
      className={`${poppins.variable} ${lato.variable} faq-container ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="faq-content">
        <h2 
          ref={titleRef}
          className={`faq-title ${isVisible ? 'title-animate' : ''}`}
        >
          {displayTitle} <span className="highlight">FAQs</span>
        </h2>
        
        <div className="faq-items-container">
          {faqs.map((faq, index) => (
            <div 
              key={`faq-${faq.id}`}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className={`faq-item ${openFAQ === index ? 'open' : 'closed'} ${
                visibleItems.includes(index) ? 'item-animate' : ''
              }`}
              style={{
                animationDelay: `${index * 0.15}s`
              }}
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
          height: 100vh;
          max-height: 800px;
          min-height: 700px;
          background: linear-gradient(180deg, #04091D 67.5%, #0D98BA 381.5%);
          padding: clamp(1.5rem, 4vw, 3rem) 0;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .faq-container.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .faq-content {
          position: relative;
          width: 100%;
          max-width: 1440px;
          padding: 0 clamp(1rem, 5vw, 3.7rem);
        }

        .faq-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          line-height: 1.15;
          color: #FFFFFF;
          text-align: center;
          margin: 0 0 clamp(1.5rem, 4vw, 2.5rem) 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out 0.2s;
        }

        .faq-title.title-animate {
          opacity: 1;
          transform: translateY(0);
        }

        .highlight {
          color: #0D98BA;
          position: relative;
          display: inline-block;
        }

        .highlight::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(90deg, #0D98BA, #04091D);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.8s ease-out 0.8s;
        }

        .title-animate .highlight::after {
          transform: scaleX(1);
        }

        .faq-items-container {
          position: relative;
          width: 100%;
          max-width: min(75rem, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 2vw, 1rem);
          max-height: 60vh;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .faq-item {
          position: relative;
          width: 100%;
          background: rgba(13, 152, 186, 0.1);
          border-radius: clamp(8px, 1.5vw, 10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          opacity: 0;
          transform: translateX(-50px) rotateY(-10deg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(13, 152, 186, 0.2);
        }

        .faq-item.item-animate {
          opacity: 1;
          transform: translateX(0) rotateY(0deg);
        }

        .faq-item.closed {
          min-height: clamp(3.5rem, 8vw, 4.5rem);
        }

        .faq-item.open {
          min-height: clamp(6rem, 15vw, 8rem);
          height: auto;
          max-height: 12rem;
          background: rgba(13, 152, 186, 0.15);
          border-color: rgba(13, 152, 186, 0.3);
          box-shadow: 0 8px 32px rgba(13, 152, 186, 0.1);
        }

        .faq-number {
          position: absolute;
          left: clamp(0.75rem, 3vw, 1.5rem);
          top: clamp(0.75rem, 2vw, 1rem);
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          line-height: 1.5;
          color: #0D94BB;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .faq-item:hover .faq-number {
          transform: scale(1.1);
          color: #0D98BA;
        }

        .faq-content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          padding-left: clamp(3rem, 8vw, 5rem);
          padding-right: clamp(0.75rem, 3vw, 1.5rem);
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
          min-height: clamp(3.5rem, 8vw, 4.5rem);
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
          font-size: clamp(0.875rem, 2vw, 1rem);
          line-height: 1.4;
          color: #FFFFFF;
          margin: 0;
          flex: 1;
          padding-right: clamp(0.75rem, 2vw, 1rem);
          transition: all 0.3s ease;
        }

        .faq-item.open .faq-question {
          font-family: var(--font-poppins);
          font-size: clamp(1rem, 2.5vw, 1.125rem);
          line-height: 1.3;
          color: #0D98BA;
          margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
          text-shadow: 0 0 10px rgba(13, 152, 186, 0.3);
        }

        .faq-arrow {
          width: clamp(16px, 3vw, 20px);
          height: clamp(32px, 6vw, 40px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: rotate(90deg);
          filter: drop-shadow(0 0 5px rgba(13, 152, 186, 0.5));
        }

        .faq-arrow.open {
          transform: rotate(-90deg) scale(1.1);
          filter: drop-shadow(0 0 10px rgba(13, 152, 186, 0.8));
        }

        .faq-answer-container {
          max-height: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .faq-answer-container.open {
          max-height: 8rem;
          padding-bottom: clamp(0.75rem, 2vw, 1rem);
          opacity: 1;
        }

        .faq-answer {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(0.8125rem, 2vw, 0.9375rem);
          line-height: 1.5;
          color: #E6E6E6;
          margin: 0;
          padding-right: clamp(1.5rem, 4vw, 2.5rem);
          transform: translateY(10px);
          transition: transform 0.3s ease 0.2s;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .faq-answer-container.open .faq-answer {
          transform: translateY(0);
        }

        .faq-item:hover {
          background: rgba(13, 152, 186, 0.18);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 12px 40px rgba(13, 152, 186, 0.25);
          border-color: rgba(13, 152, 186, 0.4);
        }

        /* Custom scrollbar for FAQ container */
        .faq-items-container::-webkit-scrollbar {
          width: 6px;
        }

        .faq-items-container::-webkit-scrollbar-track {
          background: rgba(13, 152, 186, 0.1);
          border-radius: 3px;
        }

        .faq-items-container::-webkit-scrollbar-thumb {
          background: rgba(13, 152, 186, 0.5);
          border-radius: 3px;
        }

        .faq-items-container::-webkit-scrollbar-thumb:hover {
          background: rgba(13, 152, 186, 0.7);
        }

        /* Enhanced Responsive Design for All Screen Sizes */
        
        /* Ultra-large screens (2560px+) */
        @media (min-width: 2560px) {
          .faq-container {
            padding: 6rem 0;
          }
          
          .faq-title {
            font-size: 4.5rem;
            margin-bottom: 5rem;
          }
          
          .faq-number {
            font-size: 3rem;
          }
          
          .faq-question {
            font-size: 1.5rem;
          }
          
          .faq-item.open .faq-question {
            font-size: 1.75rem;
          }
          
          .faq-answer {
            font-size: 1.375rem;
          }
        }

        /* Large desktop (1920px) */
        @media (max-width: 1920px) and (min-width: 1441px) {
          .faq-content {
            padding: 0 4rem;
          }
        }

        /* Standard desktop (1440px) */
        @media (max-width: 1440px) {
          .faq-content {
            padding: 0 3rem;
          }
          
          .faq-items-container {
            max-width: 100%;
          }
        }

        /* Small desktop/Large tablet (1200px) */
        @media (max-width: 1200px) {
          .faq-container {
            padding: 3.5rem 0;
          }
          
          .faq-title {
            font-size: 3rem;
            margin-bottom: 3rem;
          }
          
          .faq-content-wrapper {
            padding-left: 7.5rem;
            padding-right: 2rem;
          }
        }

        /* Tablet landscape (1024px) */
        @media (max-width: 1024px) {
          .faq-container {
            min-height: auto;
            padding: 3rem 0;
          }
          
          .faq-content {
            padding: 0 2.5rem;
          }
          
          .faq-title {
            font-size: 2.5rem;
            line-height: 1.2;
          }
          
          .faq-number {
            left: 2rem;
            font-size: 2rem;
          }
          
          .faq-content-wrapper {
            padding-left: 6rem;
            padding-right: 1.5rem;
          }
        }

        /* Tablet portrait (768px) */
        @media (max-width: 768px) {
          .faq-container {
            padding: 2.5rem 0;
            height: auto;
            min-height: 100vh;
            align-items: flex-start;
          }
          
          .faq-items-container {
            max-height: none;
            overflow-y: visible;
          }
          
          .faq-content {
            padding: 0 1.5rem;
          }
          
          .faq-title {
            font-size: 2rem;
            line-height: 1.25;
            margin-bottom: 2rem;
          }
          
          .faq-number {
            left: 1.25rem;
            font-size: 1.75rem;
            top: 1.25rem;
          }
          
          .faq-content-wrapper {
            padding-left: 4.5rem;
            padding-right: 1rem;
          }
          
          .faq-question {
            font-size: 1rem;
          }
          
          .faq-item.open .faq-question {
            font-size: 1.125rem;
            line-height: 1.35;
          }
          
          .faq-answer {
            font-size: 1rem;
            padding-right: 2.5rem;
          }
          
          .faq-answer-container.open {
            max-height: 12rem;
            padding-bottom: 1.25rem;
          }
        }

        /* Large mobile (640px) */
        @media (max-width: 640px) {
          .faq-container {
            padding: 2rem 0;
            height: auto;
            min-height: 100vh;
            align-items: flex-start;
          }
          
          .faq-items-container {
            max-height: none;
            overflow-y: visible;
          }
          
          .faq-content {
            padding: 0 1rem;
          }
          
          .faq-title {
            font-size: 1.75rem;
            line-height: 1.3;
            margin-bottom: 1.5rem;
          }
          
          .faq-number {
            left: 1rem;
            font-size: 1.5rem;
            top: 1rem;
          }
          
          .faq-content-wrapper {
            padding-left: 3.5rem;
            padding-right: 0.75rem;
          }
          
          .faq-question {
            font-size: 0.9375rem;
          }
          
          .faq-item.open .faq-question {
            font-size: 1.0625rem;
            line-height: 1.4;
          }
          
          .faq-answer {
            font-size: 0.9375rem;
            padding-right: 2rem;
          }
          
          .faq-arrow {
            width: 16px;
            height: 32px;
          }
        }

        /* Standard mobile (480px) */
        @media (max-width: 480px) {
          .faq-container {
            padding: 1.5rem 0;
          }
          
          .faq-title {
            font-size: 1.5rem;
            line-height: 1.35;
            margin-bottom: 1.25rem;
          }
          
          .faq-number {
            font-size: 1.25rem;
            line-height: 1.4;
          }
          
          .faq-content-wrapper {
            padding-left: 3rem;
          }
          
          .faq-question {
            font-size: 0.875rem;
          }
          
          .faq-item.open .faq-question {
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .faq-answer {
            font-size: 0.875rem;
            padding-right: 1.5rem;
          }
          
          .faq-answer-container.open {
            max-height: 10rem;
          }
        }

        /* Small mobile (375px) */
        @media (max-width: 375px) {
          .faq-container {
            padding: 1.25rem 0;
          }
          
          .faq-content {
            padding: 0 0.75rem;
          }
          
          .faq-title {
            font-size: 1.375rem;
            margin-bottom: 1rem;
          }
          
          .faq-number {
            left: 0.75rem;
            font-size: 1.125rem;
          }
          
          .faq-content-wrapper {
            padding-left: 2.75rem;
            padding-right: 0.5rem;
          }
          
          .faq-question {
            font-size: 0.8125rem;
          }
          
          .faq-item.open .faq-question {
            font-size: 0.9375rem;
          }
          
          .faq-answer {
            font-size: 0.8125rem;
            padding-right: 1rem;
          }
        }

        /* Extra small mobile (320px) */
        @media (max-width: 320px) {
          .faq-title {
            font-size: 1.25rem;
          }
          
          .faq-number {
            font-size: 1rem;
          }
          
          .faq-content-wrapper {
            padding-left: 2.5rem;
          }
          
          .faq-question, .faq-answer {
            font-size: 0.75rem;
          }
          
          .faq-item.open .faq-question {
            font-size: 0.875rem;
          }
        }

        /* High DPI displays optimization */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .faq-number, .faq-question, .faq-answer {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }

        /* Landscape orientation optimization */
        @media (orientation: landscape) and (max-height: 500px) {
          .faq-container {
            padding: 1rem 0;
            min-height: auto;
          }
          
          .faq-title {
            margin-bottom: 1rem;
          }
          
          .faq-items-container {
            gap: 0.75rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .faq-item {
            border-color: rgba(13, 152, 186, 0.3);
          }
          
          .faq-item:hover {
            border-color: rgba(13, 152, 186, 0.5);
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .faq-container, .faq-title, .faq-item {
            transition: none;
            animation: none;
          }
          
          .faq-arrow {
            transition: transform 0.2s ease;
          }
        }

        /* Focus styles for accessibility */
        .faq-question-button:focus {
          outline: 2px solid #0D98BA;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Print styles */
        @media print {
          .faq-container {
            background: white;
            color: black;
          }
          
          .faq-item {
            background: #f5f5f5;
            page-break-inside: avoid;
          }
          
          .faq-answer-container {
            max-height: none !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceFAQ;
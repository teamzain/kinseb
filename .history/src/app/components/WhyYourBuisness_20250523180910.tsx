'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Poppins, Lato } from 'next/font/google';
import Head from 'next/head';
import servicesData from '../../../public/data/services.json';

// Font configurations with preload for performance
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
  preload: true
});

// Custom hook for intersection observer
function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = {}, 
  once: boolean = false
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once && ref.current) observer.unobserve(ref.current);
      } else if (!once) {
        setIsVisible(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options, once]);

  return [ref, isVisible];
}

// Types from JSON data
interface BusinessCard {
  number: string;
  title: string;
  description: string;
}

interface WhyYourBusinessNeeds {
  paragraph: string;
  cards: BusinessCard[];
}

interface Service {
  id: string;
  title: string;
  whyYourBusinessNeeds: WhyYourBusinessNeeds;
}

interface BusinessNeedsCardProps {
  card: BusinessCard;
  index: number;
  serviceTitle?: string;
}

interface BusinessNeedsSectionProps {
  serviceId?: string;
  customTitle?: string;
  customParagraph?: string;
  customCards?: BusinessCard[];
}

const BusinessNeedsCard: React.FC<BusinessNeedsCardProps> = ({ card, index, serviceTitle }) => {
  return (
    <article 
      className={`business-card animate-card`}
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="card-number" aria-hidden="true">{card.number}</div>
      <div className="card-content">
        <h3 
          className="card-title"
          itemProp="name"
        >
          {card.title}
        </h3>
        <p 
          className="card-description"
          itemProp="description"
        >
          {card.description}
        </p>
      </div>
    </article>
  );
};
const BusinessNeedsSection: React.FC<BusinessNeedsSectionProps> = ({ 
  serviceId, 
  customTitle,
  customParagraph,
  customCards => {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>(
    {
      threshold: 0.1,
      rootMargin: '0px',
    },
    true
  );

  // Get the current service ID from the URL
  const params = useParams();
  const urlServiceId = params?.id ? Number(params.id) : null;
  
  // Use URL service ID if available, otherwise use prop or default to 1
  const currentServiceId = urlServiceId || serviceId || 1;

  // Find the current service data from services.json
  const currentService = useMemo(() => {
    return servicesData.services.find((service: Service) => service.id === currentServiceId) || 
           servicesData.services[0]; // Default to first service if not found
  }, [currentServiceId]);

  // Get data from JSON or use custom data
  const getServiceData = (): WhyYourBusinessNeeds | null => {
    if (customCards && customParagraph) {
      return {
        paragraph: customParagraph,
        cards: customCards
      };
    }
    return currentService?.whyYourBusinessNeeds || null;
  };

  const serviceData = getServiceData();
  
  // If no service data found, don't render the component
  if (!serviceData) {
    console.warn(`Service with ID ${currentServiceId} not found in services data`);
    return null;
  }

  // Get service title for dynamic heading
  const getServiceTitle = (): string => {
    if (customTitle) return customTitle;
    
    if (currentService) {
      return `Why Your Business Needs ${currentService.title}`;
    }
    
    return `Why Your Business Needs Our Services`;
  };

  const displayTitle = getServiceTitle();
  const displayParagraph = customParagraph || serviceData.paragraph;
  const displayCards = customCards || serviceData.cards;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": currentService?.title || "Business Services",
    "description": displayParagraph,
    "provider": {
      "@type": "Organization",
      "name": "Kinseb"
    },
    "serviceType": currentService?.title || "Business Services",
    "offers": displayCards.map(card => ({
      "@type": "Offer",
      "name": card.title,
      "description": card.description
    }))
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>

      <section 
        className={`${poppins.variable} ${lato.variable} business-needs-section`}
        role="main"
        aria-labelledby="business-needs-title"
        itemScope
        itemType="https://schema.org/Service"
      >
        {/* Header Section */}
        <header 
          ref={headerRef}
          className={`section-header ${headerVisible ? 'visible' : ''}`}
        >
          <div className="header-content">
            <h1 
              id="business-needs-title"
              className="main-heading"
              itemProp="name"
            >
              {displayTitle.split(' ').map((word, index) => {
                if (word.toLowerCase().includes('design')) {
                  return (
                    <React.Fragment key={index}>
                      {index > 0 && ' '}
                      <span className="highlight">{word}</span>
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={index}>
                    {index > 0 && ' '}
                    {word}
                  </React.Fragment>
                );
              })}
            </h1>
            <p 
              className="section-description"
              itemProp="description"
            >
              {displayParagraph}
            </p>
          </div>
        </header>

        {/* Cards Grid */}
        <div className="cards-container">
          <div 
            className="cards-grid animate-cards-container"
            role="list"
            aria-label="Business service benefits"
          >
            {displayCards.map((card, index) => (
              <BusinessNeedsCard 
                key={`${card.number}-${index}`}
                card={card} 
                index={index}
                serviceTitle={currentService?.title}
              />
            ))}
          </div>
        </div>

        <style jsx global>{`
          .business-needs-section {
            position: relative;
            width: 100%;
            max-width: 100%;
            padding: 80px 0;
            background: linear-gradient(0deg, rgba(4, 9, 29, 0.4), rgba(4, 9, 29, 0.4)), 
                        url('/images/whyyourbuisness.jpg') center/cover no-repeat;
            background-size: cover;
            background-position: center;
            background-attachment: scroll;
            backdrop-filter: blur(40px);
            overflow-x: hidden;
            box-sizing: border-box;
          }

          .business-needs-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(4, 9, 29, 0.7) 0%, rgba(4, 9, 29, 0.8) 50%, rgba(13, 148, 186, 0.8) 100%);
            pointer-events: none;
            z-index: 1;
          }

          .section-header {
            position: relative;
            z-index: 2;
            margin: 0 auto 50px auto;
            max-width: 1600px;
            padding: 0 60px;
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
            box-sizing: border-box;
          }

          .section-header.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .header-content {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: start;
          }

          .main-heading {
            font-family: var(--font-poppins);
            font-weight: 600;
            font-size: 45px;
            line-height: 68px;
            color: #FFFFFF;
            margin: 0;
            word-wrap: break-word;
            grid-column: 1;
            grid-row: 1;
          }

          .highlight {
            color: #0D94BB;
          }

          .section-description {
            font-family: var(--font-lato);
            font-weight: 600;
            font-size: 20px;
            line-height: 150%;
            letter-spacing: -0.006em;
            color: #FFFFFF;
            margin: 0;
            word-wrap: break-word;
            grid-column: 2;
            grid-row: 1;
            align-self: end;
          }

          .cards-container {
            position: relative;
            z-index: 2;
            max-width: 1600px;
            margin: 0 auto;
            padding: 0 60px;
            box-sizing: border-box;
          }

          .cards-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
            perspective: 1000px;
          }

          /* Card Animation Styles */
          @keyframes cardSlideUp {
            from {
              opacity: 0;
              transform: translateY(50px) rotateX(10deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }

          .animate-cards-container {
            animation: fadeIn 0.5s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-card {
            animation: cardSlideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
          }

          .business-card {
            position: relative;
            width: 100%;
            min-height: 389px;
            height: auto;
            background: #041629;
            backdrop-filter: blur(2px);
            border-radius: 10px;
            padding: 28px;
            box-sizing: border-box;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.3s ease;
            will-change: transform, opacity;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
          }

          .business-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(13, 148, 186, 0.1) 0%, rgba(13, 148, 186, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 10px;
          }

          .business-card:hover::before {
            opacity: 1;
          }

          .business-card:hover {
            background: linear-gradient(360deg, #04091D -10.5%, #0D98BA 146.5%);
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 20px rgba(13, 152, 186, 0.2);
          }

          .card-number {
            font-family: var(--font-poppins);
            font-weight: 600;
            font-size: 40px;
            line-height: 60px;
            color: #0D94BB;
            z-index: 3;
            margin-bottom: 20px;
            flex-shrink: 0;
          }

          .card-content {
            position: relative;
            z-index: 3;
            display: flex;
            flex-direction: column;
            gap: 14px;
            flex-grow: 1;
          }

          .card-title {
            font-family: var(--font-poppins);
            font-weight: 600;
            font-size: 26px;
            line-height: 150%;
            letter-spacing: -0.006em;
            color: #FFFFFF;
            margin: 0;
            transition: color 0.3s ease;
            word-wrap: break-word;
            flex-shrink: 0;
          }

          .card-description {
            font-family: var(--font-lato);
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
            letter-spacing: -0.006em;
            color: #FFFFFF;
            margin: 0;
            opacity: 0.9;
            transition: opacity 0.3s ease;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }

          .business-card:hover .card-description {
            opacity: 1;
          }

          /* Focus states for accessibility */
          .business-card:focus {
            outline: 2px solid #0D94BB;
            outline-offset: 2px;
          }

          .business-card:focus-visible {
            outline: 2px solid #0D94BB;
            outline-offset: 2px;
          }

          /* Responsive Design */
          @media (max-width: 1400px) {
            .section-header {
              max-width: 1400px;
              padding: 0 50px;
            }
            
            .cards-container {
              max-width: 1400px;
              padding: 0 50px;
            }
            
            .header-content {
              gap: 60px;
            }
          }

          @media (max-width: 1200px) {
            .cards-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
            
            .main-heading {
              font-size: 38px;
              line-height: 58px;
            }
            
            .section-description {
              font-size: 18px;
            }
            .section-header {
              padding: 0 40px;
            }
            .cards-container {
              padding: 0 40px;
            }
            .header-content {
              gap: 40px;
            }
          }

          @media (max-width: 768px) {
            .business-needs-section {
              padding: 60px 0;
            }
            .section-header {
              padding: 0 24px;
            }
            .cards-container {
              padding: 0 24px;
            }
            .header-content {
              display: flex;
              flex-direction: column;
              gap: 24px;
              align-items: start;
            }
            .main-heading {
              font-size: 32px;
              line-height: 44px;
              order: 1;
            }
            .section-description {
              font-size: 16px;
              order: 2;
            }
            .cards-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .business-card {
              min-height: auto;
              padding: 24px;
            }
            .card-number {
              font-size: 32px;
              line-height: 48px;
              margin-bottom: 16px;
            }
            .card-title {
              font-size: 22px;
              line-height: 140%;
            }
            .card-description {
              font-size: 16px;
              line-height: 140%;
            }
          }

          @media (max-width: 480px) {
            .business-needs-section {
              padding: 40px 0;
            }
            .section-header {
              padding: 0 20px;
            }
            .cards-container {
              padding: 0 20px;
            }
            .main-heading {
              font-size: 28px;
              line-height: 38px;
            }
            .section-description {
              font-size: 15px;
            }
            .business-card {
              padding: 20px;
            }
            .card-number {
              font-size: 28px;
              line-height: 42px;
              margin-bottom: 14px;
            }
            .card-title {
              font-size: 20px;
              line-height: 130%;
            }
            .card-description {
              font-size: 15px;
              line-height: 140%;
            }
            .arrow-container {
              display: none;
            }
          }

          /* Extra small screens */
          @media (max-width: 375px) {
            .business-card {
              padding: 18px;
            }
            .card-number {
              font-size: 26px;
              line-height: 38px;
              margin-bottom: 12px;
            }
            .card-title {
              font-size: 18px;
              line-height: 130%;
            }
            .card-description {
              font-size: 14px;
              line-height: 140%;
            }
          }

          /* Reduce motion for users who prefer it */
          @media (prefers-reduced-motion: reduce) {
            .animate-card {
              animation: none;
              opacity: 1;
            }
            
            .section-header {
              transition: none;
            }
            
            .business-card {
              transition: none;
            }
            
            .business-card:hover {
              transform: none;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default BusinessNeedsSection;
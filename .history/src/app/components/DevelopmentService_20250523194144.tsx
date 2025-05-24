'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Poppins, Barlow, Lato } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-barlow'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400',  '700'],
  display: 'swap',
  variable: '--font-lato'
});

// Type definitions
interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  featured?: boolean;
  index: number;
  onClick: (id: number) => void;
}

interface ServiceCardData {
  id: number;
  title: string;
  description: string;
  featured?: boolean;
}

// Enhanced custom hook for intersection observer with proper TypeScript typing
function useIntersectionObserver<T extends HTMLElement>(
  options = {},
  triggerOnce = true
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Only update if state needs to change
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        // Once visible and triggerOnce is true, no need to observe anymore
        if (triggerOnce && ref.current) observer.unobserve(ref.current);
      } else if (!entry.isIntersecting && isVisible && !triggerOnce) {
        // Only reset visibility to false if we're not in view and not in triggerOnce mode
        setIsVisible(false);
      }
    }, options);
    
    observerRef.current = observer;

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) observerRef.current.unobserve(currentRef);
    };
  }, [options, triggerOnce, isVisible]);

  return [ref, isVisible];
}

const serviceCards: ServiceCardData[] = [
  {
    id: "website-development",
    title: 'Website Development',
    description: 'Building robust, scalable websites with cutting-edge technology.',
    featured: true
  },
  {
    id: "webapp-development",
    title: 'Web App Development',
    description: 'Creating powerful web applications for complex business needs.'
  },
  {
    id: "custom-web-development",
    title: 'Custom Web Development',
    description: 'Tailored web solutions built specifically for your unique requirements.'
  },
  {
    id: "ecommerce-development",
    title: 'E-commerce Development',
    description: 'Building high-converting online stores with advanced functionality.'
  },
  {
    id: "shopify-development",
    title: 'Shopify Development',
    description: 'Expert Shopify store development and customization services.'
  },
  {
    id: "wordpress-development",
    title: 'WordPress Development',
    description: 'Professional WordPress websites with custom functionality.'
  },
  {
    id: "pos-development",
    title: 'POS Development',
    description: 'Custom point-of-sale systems for retail and service businesses.'
  },
  {
    id: "custom-software-development",
    title: 'Custom Software Development',
    description: 'Bespoke software solutions for unique business challenges.'
  },
  {
    id: "backend-api-development",
    title: 'Backend & API Development',
    description: 'Robust backend systems and APIs that power modern applications.'
  }
];

const DevelopmentService: React.FC = () => {
  const router = useRouter();
  const [leftColRef, leftColVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  }, true);
  
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px',
  }, true);

  const handleServiceClick = (id: number) => {
    router.push(`/development/${id}`);
  };

  // Service Card Component
  const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, featured = false, index, onClick }) => {
    const [cardRef, isCardVisible] = useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      // Increase rootMargin to make cards animate earlier (before they're fully in view)
      // Here, we're detecting 200px before the card enters the viewport
      rootMargin: '200px 0px',
    }, true);

    return (
      <div 
        ref={cardRef}
        className={`service-card ${isCardVisible ? 'visible' : ''}`} 
        style={{ 
          transitionDelay: isCardVisible ? `${index * 0.1}s` : '0s',
          willChange: 'opacity, transform'
        }}
        onClick={() => onClick(id)}
        role="button"
        aria-label={`Learn more about ${title}`}
        tabIndex={0}
      >
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
        <div className="explore-link">
          <span className="explore-text">Explore</span>
          <span className="arrow-container">
            <span className="arrow"></span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Professional Web Development Services | Website & App Development</title>
        <meta name="description" content="Expert web development services including custom websites, e-commerce solutions, web applications, and more. Building scalable solutions for growth, speed, and performance." />
        <meta name="keywords" content="web development, website development, web app development, eCommerce development, WordPress development, Shopify development, custom software development, API development" />
        <link rel="canonical" href="/development" />
        <meta property="og:title" content="Professional Web Development Services | Website & App Development" />
        <meta property="og:description" content="Expert web development services including custom websites, e-commerce solutions, web applications, and more. Building scalable solutions for growth, speed, and performance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/development" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Web Development Services | Website & App Development" />
        <meta name="twitter:description" content="Expert web development services including custom websites, e-commerce solutions, web applications, and more. Building scalable solutions for growth, speed, and performance." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Web Development Services",
              "description": "Professional web development services focused on building scalable solutions for growth, speed, and performance.",
              "provider": {
                "@type": "Organization",
                "name": "Your Company Name"
              },
              "serviceType": ["Website Development", "Web App Development", "eCommerce Development", "Custom Software Development"],
              "areaServed": "Global"
            }
          `}
        </script>
      </Head>
      <main className={`${poppins.variable} ${barlow.variable} ${lato.variable} development-services-container`}>
        {/* Two-column layout container */}
        <section className="two-column-layout">
          {/* Left Column - Sticky */}
          <div 
            ref={leftColRef} 
            className={`left-column ${leftColVisible ? 'visible' : ''}`}
          >
            {/* Title Section */}
            <div className="title-container">
              <h1 className="main-title">
                DEVELOPMENT<br className="desktop-break" /><span className="mobile-space"> </span>SERVICES
              </h1>
            </div>

            {/* CTA Button */}
            <Link href="/contact" passHref>
              <button className="cta-button" aria-label="Contact us about development services">
                Let's Connect
              </button>
            </Link>
          </div>

          {/* Right Column - Scrollable */}
          <div className="right-column">
            {/* Main Heading */}
            <header 
              ref={headerRef} 
              className={`content-header ${headerVisible ? 'visible' : ''}`}
            >
              <h2 className="content-heading">
                Building scalable solutions for<br />
                <span className="highlight">growth, speed, and performance</span>
              </h2>

              {/* Horizontal Line */}
              <div className="divider"></div>
            </header>

            {/* Service Cards Grid */}
            <div className="service-cards-grid">
              {serviceCards.map((card, index) => (
                <ServiceCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  featured={card.featured}
                  index={index}
                  onClick={handleServiceClick}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Global styles */}
        <style jsx global>{`
          /* Base layout styles */
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            background-color: #04091D;
            color: #FFFFFF;
          }
          
          .development-services-container {
            width: 100%;
            background-color: #04091D;
                margin: 12px auto;
            position: relative;
          }
          
          .two-column-layout {
            display: flex;
            flex-direction: row;
            max-width: 1440px;
            margin: 0 auto;
            position: relative;
            min-height: 100vh;
          }
          
          /* Left column - sticky */
          .left-column {
            width: 30%;
            position: sticky;
            top: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 80px 40px;
            box-sizing: border-box;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: opacity, transform;
          }
          
          .left-column.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .title-container {
            margin-top: 80px; /* Move the title down */
          }
          
          .main-title {
            font-family: var(--font-poppins);
            font-style: normal;
            font-weight: 600;
            font-size: 38px;
            line-height: 45px;
            letter-spacing: -0.03em;
            color: #0D98BA;
            margin: 0 0 80px 0;
          }
          
          .mobile-space {
            display: none;
          }
          
          .cta-button {
            width: 182px;
            height: 52px;
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
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          
          /* Right column - scrollable */
          .right-column {
            width: 70%;
            padding: 80px 40px;
            box-sizing: border-box;
            overflow-y: auto;
          }
          
          .content-header {
            margin-bottom: 50px;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: opacity, transform;
          }
          
          .content-header.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .content-heading {
            font-family: var(--font-poppins);
            font-style: normal;
            font-weight: 600;
            font-size: clamp(32px, 5vw, 56px);
            line-height: 1.15;
            letter-spacing: -0.03em;
            color: #FFFFFF;
            margin: 0 0 24px 0;
          }
          
          .highlight {
            color: #0D98BA;
          }
          
          .divider {
            width: 100%;
            height: 4px;
            background: #0D98BA;
            border-radius: 10px;
            margin-bottom: 40px;
          }
          
          /* Service Cards Grid */
          .service-cards-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            width: 100%;
          }
          
          .service-cards-grid .service-card {
            flex: 0 0 calc(33.333% - 16px);
            margin-bottom: 24px;
          }
          
          /* Service Cards Styling */
          .service-card {
            width: 315px;
            height: 230px;
            background: rgba(13, 152, 186, 0.1);
            border-radius: 10px;
            padding: 24px;
            box-sizing: border-box;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            will-change: transform, opacity;
            cursor: pointer;
          }
          
          .service-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .card-content {
            flex-grow: 1;
          }
          
          /* Hover effect - apply featured style on hover */
          .service-card:hover {
            background: linear-gradient(360deg, #04091D -10.5%, #0D98BA 146.5%);
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(13, 152, 186, 0.2);
          }
          
          .card-title {
            margin: 0 0 12px 0;
            font-family: var(--font-poppins);
            font-weight: 600;
            font-size: 22px;
            line-height: 1.3;
            letter-spacing: -0.03em;
            color: #FFFFFF;
          }
          
          .card-description {
            margin: 0;
            font-family: var(--font-barlow);
            font-weight: 500;
            font-size: 18px;
            line-height: 150%;
            color: #FFFFFF;
          }
          
          .explore-link {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 12px;
          }
          
          .explore-text {
            font-family: var(--font-poppins);
            font-weight: 600;
            font-size: 20px;
            line-height: 35px;
            color: #0D98BA;
            margin-right: 8px;
          }
          
          .arrow-container {
            display: inline-block;
            width: 28px;
            height: 28px;
            position: relative;
            transition: transform 0.3s ease;
          }
          
          .arrow {
            position: absolute;
            width: 15px;
            height: 15px;
            border-top: 2.5px solid #0D98BA;
            border-right: 2.5px solid #0D98BA;
            transform: rotate(45deg);
            top: 6px;
            left: 3px;
          }
          
          /* Animations and interactive elements */
          
          .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(13, 152, 186, 0.2);
          }
          
          .service-card:hover .arrow-container {
            transform: translateX(5px);
          }
          
          .cta-button:hover {
            background-color: #04091D;
            color: #0D98BA;
            transform: translateY(-2px);
          }
          
          /* Media query for responsive design */
          @media (max-width: 1200px) {
            .service-cards-grid .service-card {
              flex: 0 0 calc(50% - 12px);
              width: calc(50% - 12px);
            }
          }
          
          @media (max-width: 768px) {
            .two-column-layout {
              flex-direction: column;
            }
            
            .left-column {
              width: 100%;
              position: relative;
              height: auto;
              padding: 20px 24px;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
            
            .mobile-space {
              display: inline;
            }
            
            .desktop-break {
              display: none;
            }
            
            .title-container {
              margin-top: 0;
            }
            
            .main-title {
              margin: 0;
              font-size: 28px;
              line-height: 36px;
            }
            
            .cta-button {
              margin: 0;
              width: auto;
              height: 44px;
              padding: 0 20px;
              font-size: 14px;
            }
            
            .right-column {
              width: 100%;
              padding: 20px 24px 60px;
            }
            
            .service-cards-grid .service-card {
              flex: 0 0 100%;
              width: 100%;
            }
            
            .service-card {
              flex-direction: column;
              height: auto;
              min-height: 150px;
              width: 100%;
            }
            
            .card-content {
              flex: 1;
              margin-right: 15px;
            }
            
            .explore-link {
              margin-top: 12px;
              align-self: flex-end;
              white-space: nowrap;
            }
          }
          
          @media (max-width: 480px) {
            .content-heading {
              font-size: 28px;
            }
            
            .service-card {
              padding: 20px;
            }
            
            .card-title {
              font-size: 20px;
            }
            
            .card-description {
              font-size: 16px;
            }
            
            .explore-text {
              font-size: 18px;
            }
            
            .left-column {
              padding: 15px 20px;
            }
            
            .main-title {
              font-size: 24px;
              line-height: 30px;
            }
            
            .cta-button {
              height: 40px;
              padding: 0 16px;
              font-size: 13px;
            }
               .two-column-layout {
    margin-top: 22px; /* Slightly less margin for very small screens */
  }
          }
        `}</style>
      </main>
    </>
  );
};

export default DevelopmentService;
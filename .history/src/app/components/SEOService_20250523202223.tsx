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
  id: string;
  title: string;
  description: string;
  featured?: boolean;
  index: number;
  onClick: (id: string) => void;
}

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
}

// Enhanced intersection observer hook with once option and better defaults
function useIntersectionObserver<T extends HTMLElement>(
  options = {},
  once = true
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // If once is true, stop observing after first visibility
        if (once && ref.current) observer.unobserve(ref.current);
      } else if (!once) {
        // If once is false, we can toggle visibility off when leaving viewport
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

// Service card data array for easier management
const serviceCards: ServiceCardData[] = [
  {
    id: "seo-strategy",
    title: 'SEO Strategy',
    description: 'Comprehensive SEO strategies that drive long-term organic growth.',
    featured: true
  },
  {
    id: "local-seo",
    title: 'Local SEO',
    description: 'Dominate local search results and attract nearby customers.',
    featured: true
  },
  {
    id: "technical-seo",
    title: 'Technical SEO',
    description: 'Optimize your website\'s technical foundation for search engines.'
  },
  {
    id: "on-page-seo",
    title: 'On-Page SEO',
    description: 'Optimize individual pages for higher rankings and better user experience.'
  },
  {
    id: "off-page-seo",
    title: 'Off-Page SEO',
    description: 'Build authority and trust through strategic link building and promotion.'
  },
  {
    id: "ecommerce-seo",
    title: 'E-commerce SEO',
    description: 'Drive more qualified traffic and sales to your online store.',
    featured: true
  },
  {
    id: "content-strategy",
    title: 'Content Strategy',
    description: 'Create content that ranks, engages, and converts your audience.'
  },
  {
    id: "keyword-research",
    title: 'Keyword Research',
    description: 'Discover high-value keywords that drive targeted traffic and conversions.'
  },
  {
    id: "seo-audit",
    title: 'SEO Audit',
    description: 'Comprehensive analysis to identify and fix SEO issues holding you back.'
  }
];

const SEOServices: React.FC = () => {
  const router = useRouter();
  const [leftColRef, leftColVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });
  
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });

  const handleServiceClick = (id: string) => {
    router.push(`/service/${id}`);
  };

  // Service Card Component
  const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, featured = false, index, onClick }) => {
    // Updated observer options to detect cards earlier and improve scroll behavior
    const [cardRef, isCardVisible] = useIntersectionObserver<HTMLDivElement>({
      threshold: 0.01, // Detect with just 1% visibility
      rootMargin: '100px 0px', // Start detecting 100px before the card enters viewport
    }, true); // Always use once=true to prevent re-animation

    return (
      <div 
        ref={cardRef}
        className={`service-card ${isCardVisible ? 'visible' : ''}`} 
        style={{ 
          transitionDelay: isCardVisible ? `${index * 0.12}s` : '0s', // Slightly increased delay between cards
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
        <title>Expert SEO Services | Drive Organic Growth & Improve Rankings</title>
        <meta name="description" content="Boost your online visibility with our strategic SEO services. Specialized in technical SEO, local SEO, e-commerce SEO, and content strategy to drive organic growth." />
        <meta name="keywords" content="SEO services, search engine optimization, local SEO, technical SEO, on-page SEO, off-page SEO, e-commerce SEO, content strategy, keyword research, SEO audit" />
        <link rel="canonical" href="/seo-services" />
        <meta property="og:title" content="Expert SEO Services | Drive Organic Growth & Improve Rankings" />
        <meta property="og:description" content="Boost your online visibility with our strategic SEO services. Specialized in technical SEO, local SEO, e-commerce SEO, and content strategy to drive organic growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/seo-services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Expert SEO Services | Drive Organic Growth & Improve Rankings" />
        <meta name="twitter:description" content="Boost your online visibility with our strategic SEO services. Specialized in technical SEO, local SEO, e-commerce SEO, and content strategy to drive organic growth." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "SEO Services",
              "description": "Professional SEO services focused on driving organic growth with strategic search optimization.",
              "provider": {
                "@type": "Organization",
                "name": "Your Company Name"
              },
              "serviceType": ["SEO Strategy", "Local SEO", "Technical SEO", "On-Page SEO", "Off-Page SEO", "E-commerce SEO", "Content Strategy", "Keyword Research", "SEO Audit"],
              "areaServed": "Global"
            }
          `}
        </script>
      </Head>
      <main className={`${poppins.variable} ${barlow.variable} ${lato.variable} seo-services-container`}>
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
                SEO<br className="desktop-break" /><span className="mobile-space"> </span>SERVICES
              </h1>
            </div>

            {/* CTA Button */}
            <Link href="/contact" passHref>
              <button className="cta-button" aria-label="Contact us about SEO services">
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
                Driving organic growth with<br />
                <span className="highlight">strategic search optimization</span>
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
          
          .seo-services-container {
            width: 100%;
            background-color: #04091D;
            margin: 0 auto;
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
            transition: opacity 0.8s ease, transform 0.8s ease;
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
            transition: opacity 0.8s ease, transform 0.8s ease;
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
            transition: opacity 0.7s ease, transform 0.7s ease, background 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            will-change: transform, opacity;
            perspective: 1000px;
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

export default SEOServices;
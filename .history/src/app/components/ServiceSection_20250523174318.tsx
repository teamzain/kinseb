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
  id: string; // Changed from number to string
  title: string;
  description: string;
  featured?: boolean;
  index: number;
  onClick: (id: string) => void; // Changed parameter type from number to string
}
interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
}

// Enhanced custom hook for intersection observer with proper TypeScript typing
function useIntersectionObserver<T extends HTMLElement>(
  options = {},
  once = false
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Set visible when element enters viewport
      if (entry.isIntersecting) {
        setIsVisible(true);
        // If once is true, stop observing after element becomes visible
        if (once && ref.current) observer.unobserve(ref.current);
      } 
      // Only update visibility to false if we're not in "once" mode
      else if (!once) {
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
    id: "web-design",
    title: 'Website Design Services',
    description: 'Creating sleek, strategic websites tailored to your brand.',
    featured: true
  },
  {
    id: "website-redesign",
    title: 'Website Redesign',
    description: 'Revamping outdated sites into modern, high-performing platforms.'
  },
  {
    id: "",
    title: 'Web App Design',
    description: 'Designing intuitive web apps focused on user experience.'
  },
  {
    id: "",
    title: 'Mobile App Design',
    description: 'Crafting beautiful, functional apps for mobile-first users.'
  },
  {
    id: "",
    title: 'Branding',
    description: 'Building powerful brand identities that truly connect.'
  },
  {
    id:"",
    title: 'Logo Design',
    description: 'Iconic, memorable logos that define your brand instantly.'
  },
  {
    id: "",
    title: 'Brand Identity',
    description: 'Unified brand visuals for consistent, lasting impressions.'
  },
  {
    id: "",
    title: 'Graphic Design',
    description: 'Engaging graphics that amplify your brand\'s message.'
  },
  {
    id: "",
    title: 'Custom Website Design',
    description: 'Tailor-made websites built around your unique goals.'
  },
  {
    id: "",
    title: 'Shopify Website Design',
    description: 'High-converting Shopify stores with custom design solutions.'
  },
  {
    id: "",
    title: 'WordPress Web Design',
    description: 'Flexible, user-friendly WordPress sites that grow with you.'
  },
  {
    id: "",
    title: 'eCommerce Web Design',
    description: 'Driving sales with stunning, conversion-focused store designs.'
  },
  {
    id: "",
    title: 'UI/UX Design',
    description: 'Creating intuitive interfaces that delight users and drive engagement.'
  },
  {
    id: "",
    title: 'Design Systems',
    description: 'Building scalable design frameworks for consistent digital experiences.'
  },
  {
    id: "",
    title: 'E-commerce Design',
    description: 'Crafting high-converting online stores that drive sales and growth.'
  }
];

const ServiceSection: React.FC = () => {
  const router = useRouter();
  const [leftColRef, leftColVisible] = useIntersectionObserver<HTMLDivElement>(
    {
      threshold: 0.1,
      rootMargin: '0px',
    },
    true // Once visible, always visible
  );
  
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLElement>(
    {
      threshold: 0.1,
      rootMargin: '0px',
    },
    true // Once visible, always visible
  );

const handleServiceClick = (id: string) => { // Changed from number to string
  router.push(`/services/${id}`);
};

  // Service Card Component
  const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, featured = false, index, onClick }) => {
    const [cardRef, isCardVisible] = useIntersectionObserver<HTMLDivElement>(
      {
        threshold: 0.01, // Reduced threshold to detect earlier
        rootMargin: '100px 0px', // Positive value to start detection before element enters viewport
      },
      true // Only animate once when it comes into view
    );

    return (
      <div 
        ref={cardRef}
        className={`service-card ${isCardVisible ? 'visible' : ''}`} 
        style={{ 
          transitionDelay: isCardVisible ? `${index * 0.12}s` : '0s'
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
        <title>Professional Design Services | Web Design, Branding & UI/UX</title>
        <meta name="description" content="Expert design services for websites, mobile apps, branding, and UI/UX. Creating experiences designed for conversion and business growth." />
        <meta name="keywords" content="website design, web design services, logo design, branding, UI/UX design, mobile app design, WordPress design, Shopify design, eCommerce website design" />
        <link rel="canonical" href="/services" />
        <meta property="og:title" content="Professional Design Services | Web Design, Branding & UI/UX" />
        <meta property="og:description" content="Expert design services for websites, mobile apps, branding, and UI/UX. Creating experiences designed for conversion and business growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Design Services | Web Design, Branding & UI/UX" />
        <meta name="twitter:description" content="Expert design services for websites, mobile apps, branding, and UI/UX. Creating experiences designed for conversion and business growth." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Design Services",
              "description": "Professional web design, branding, and UI/UX services focused on conversion and business growth.",
              "provider": {
                "@type": "Organization",
                "name": "Your Company Name"
              },
              "serviceType": ["Website Design", "Branding", "UI/UX Design", "Mobile App Design", "eCommerce Design"],
              "areaServed": "Global"
            }
          `}
        </script>
      </Head>
      <main className={`${poppins.variable} ${barlow.variable} ${lato.variable} design-services-container`}>
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
                DESIGN<br className="desktop-break" /><span className="mobile-space"> </span>SERVICES
              </h1>
            </div>

            {/* CTA Button */}
            <Link href="/contact" passHref>
              <button className="cta-button" aria-label="Go to contact page">
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
                Designing experiences for<br />
                <span className="highlight">conversion and expansion</span>
              </h2>

              {/* Horizontal Line */}
              <div className="divider"></div>
            </header>

            {/* Service Cards Grid */}
            <div className="service-cards-grid">
        {serviceCards.map((card, index) => (
  <ServiceCard
    key={card.id || `service-${index}`} // Use index as fallback since many cards have empty id
    id={card.id || `service-${index}`} // Provide a fallback id
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
          
          .design-services-container {
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
            perspective: 1000px; /* Added for better 3D effect on card animations */
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
            backface-visibility: hidden; /* Prevents flickering during animation */
            cursor: pointer; /* Add pointer cursor to indicate clickable */
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
   
    margin-top: 22px; /* Add margin-top for mobile screens */
  }
  
          }
        `}</style>
      </main>
    </>
  );
};

export default ServiceSection;
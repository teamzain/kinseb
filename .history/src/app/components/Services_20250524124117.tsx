'use client';

import { useState, useEffect, useRef, CSSProperties, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

export default function WebSolutions(): ReactElement {
  const router = useRouter();
  // State to track which service card is currently hovered or active (for mobile)
  const [hoveredService, setHoveredService] = useState<number>(0);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Custom intersection observer setup
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section comes into view
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once we've seen it, no need to keep observing
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
        rootMargin: '0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Array of service images with descriptive alt texts
  const serviceImages: Array<{src: string, alt: string}> = [
    { src: '/images/1.jpg', alt: 'Default service visualization' },
    { src: '/images/2.jpg', alt: 'Performance optimization service visualization' },
    { src: '/images/3.jpg', alt: 'Industry-specific solutions visualization' },
    { src: '/images/4.jpg', alt: 'Reliable support service visualization' },
    { src: '/images/service.png', alt: 'Responsive design service visualization' },
    { src: '/images/service.png', alt: 'Data-driven design visualization' },
    { src: '/images/7.jpg', alt: 'SEO optimization service visualization' },
    { src: '/images/1.jpg', alt: 'Collaboration process visualization' },
    { src: '/images/1.jpg', alt: 'Web development services visualization' },
  ];

  // Service card data with enhanced descriptions for SEO
  const serviceCards = [
    {
      title: 'Conversion-Focused Design',
      description: 'We craft each site to turn visitors into customers with strategic UX/UI design.',
      slug: 'web-design',
      metaDescription: 'Boost your conversion rates with our strategic web design services focused on turning visitors into customers through data-driven UX/UI design.'
    },
    {
      title: 'Performance Optimized',
      description: 'Fast-loading sites that keep users engaged and improve search rankings.',
      slug: 'website-development',
      metaDescription: 'Enhance user experience with lightning-fast websites optimized for speed, reducing bounce rates and improving search engine rankings.'
    },
    {
      title: 'Industry-Specific Solutions',
      description: 'Designs shaped by your market and what actually works for your specific industry.',
      slug: 'custom-web-development',
      metaDescription: 'Custom web solutions tailored to your industry\'s unique requirements with features and design patterns proven to work in your market.'
    },
    {
      title: 'Reliable Support',
      description: 'Ongoing help whenever you need updates, maintenance, or technical fixes.',
      slug: 'custom-software-development',
      metaDescription: 'Count on our reliable web support services with fast response times for updates, maintenance, and technical troubleshooting.'
    },
    {
      title: 'Responsive Across Devices',
      description: 'Looks great and works perfectly on every screen size and device type.',
      slug: 'custom-website-design',
      metaDescription: 'Mobile-friendly, responsive websites that provide seamless user experiences across all devices from smartphones to desktop computers.'
    },
    {
      title: 'Driven by Data',
      description: 'Our design decisions are guided by real analytics and user behavior insights.',
      slug: 'ui-ux-design',
      metaDescription: 'Evidence-based web design services using analytics and user behavior data to create websites that achieve measurable business objectives.'
    },
    {
      title: 'SEO-First Foundation',
      description: 'Built to help you rank higher in search results from day one of launch.',
      slug: 'seo-strategy',
      metaDescription: 'Improve your search engine visibility with our SEO-optimized websites built from the ground up to rank higher in search results.'
    },
    {
      title: 'Smooth Collaboration',
      description: 'We keep the development process clear, efficient, and on track with your goals.',
      slug: 'custom-web-development',
      metaDescription: 'Experience a transparent, efficient web development process with clear communication and collaboration every step of the way.'
    },
  ];

  // Generate structured data for JSON-LD
  const generateStructuredData = () => {
    const servicesData = serviceCards.map(card => ({
      "@type": "Service",
      "name": card.title,
      "description": card.metaDescription,
      "url": `https://kinsebwebdevelopment/services/${card.slug}`
    }));
    
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kinseb Web Development",
      "url": "https://kinsebwebdevelopment.com/",
      "logo": "https://kinswebdevelopment/logo.png",
      "description": "Custom web development solutions tailored to your business needs with conversion-focused design, performance optimization, and SEO-first approach.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Development Services",
        "itemListElement": servicesData
      }
    };
    
    return JSON.stringify(organizationData);
  };

  // Handler for card click - navigate to different page
  const handleCardClick = (index: number): void => {
    // For mobile, toggle the active state
    if (isMobile) {
      setActiveService(activeService === index ? null : index);
    }
    
    // Array of URLs for each service card
    const serviceUrls = serviceCards.map(card => `/services/${card.slug}`);
    
    // On mobile, only navigate if tapped twice (first tap activates, second navigates)
    if (!isMobile || activeService === index) {
      // Direct navigation with Next.js router instead of alert
      router.push(serviceUrls[index]);
    }
  };

  // Check if card is active (hovered on desktop or clicked on mobile)
  const isCardActive = (index: number): boolean => {
    return (isMobile && activeService === index) || (!isMobile && hoveredService === index + 1);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Custom Web Development Solutions | Your Company Name</title>
        <meta name="description" content="Our tailored web solutions are designed to match your exact business needs with conversion-focused design, performance optimization, and SEO-first approaches." />
        <meta name="keywords" content="web development, custom websites, conversion design, performance optimization, SEO, responsive design, industry solutions" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Custom Web Development Solutions | Your Company Name" />
        <meta property="og:description" content="Tailored web solutions for your business with conversion-focused design and SEO-first approaches." />
        <meta property="og:image" content="https://kinsebwebdevelopment/og-image.jpg" />
        <meta property="og:url" content="https://kinsebwebdevelopment/services" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Web Development Solutions | Your Company Name" />
        <meta name="twitter:description" content="Tailored web solutions for your business with conversion-focused design and SEO-first approaches." />
        <meta name="twitter:image" content="https://kinsebwebdevelopment.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kinsebwebdevelopment/services" />
        
        {/* JSON-LD Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
      </Head>
      
      <div 
        ref={sectionRef}
        style={styles.frame}
        className="web-solutions-section"
        id="web-solutions"
      >
        {/* Add responsive styles */}
        <ResponsiveStyles />
        
        <div 
          style={{
            ...styles.container,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <div style={styles.leftColumn}>
            <h1 
              className="main-heading"
              style={{
                ...styles.mainHeading,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
              }}
            >
              Because One-Size Never <span style={styles.accentText}>Fits</span> All
            </h1>
            <p 
              className="sub-heading"
              style={{
                ...styles.subHeading,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
              }}
            >
              Our custom web solutions are made to match your exact needs.
            </p>
            <div 
              className="image-container"
              style={{
                ...styles.imageContainer,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s'
              }}
              aria-hidden="true"
            >
              <Image 
                src={serviceImages[hoveredService].src}
                alt={serviceImages[hoveredService].alt}
                style={styles.serviceImage}
                width={400}
                height={300}
                priority={true}
              />
            </div>
          </div>

          <div className="right-column" style={styles.rightColumn} role="list">
            {serviceCards.map((card, index) => (
              <div 
                key={index}
                className={`card ${isCardActive(index) ? 'active' : ''}`}
                style={{
                  ...styles.card,
                  ...(isCardActive(index) ? styles.activeCard : {}),
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'translateY(0)' 
                    : 'translateY(40px)',
                  transition: `opacity 0.8s ease ${0.4 + index * 0.1}s, transform 0.8s ease ${0.4 + index * 0.1}s`
                }}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => !isMobile && setHoveredService(index + 1)}
                onMouseLeave={() => !isMobile && setHoveredService(0)}
                role="listitem"
                tabIndex={0}
                aria-label={`Service: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                <div style={styles.cardContent}>
                  <h2 className="card-title" style={styles.cardTitle}>{card.title}</h2>
                  <p className="card-description" style={styles.cardDescription}>{card.description}</p>
                </div>
                <div 
                  className={`card-icon ${isCardActive(index) ? 'active' : ''}`} 
                  style={styles.cardIcon}
                  aria-hidden="true"
                >
                  <span className="cs-iconbox_icon" style={styles.arrowIconWrapper}>
                    <div 
                      className={`arrow-circle ${isCardActive(index) ? 'active' : ''}`} 
                      style={isCardActive(index) ? styles.activeCircle : styles.normalCircle}
                    ></div>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 30 29" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        ...(isCardActive(index) ? styles.activeArrow : styles.normalArrow)
                      }}
                      className={`arrow-svg ${isCardActive(index) ? 'active' : ''}`}
                    >
                      <path 
                        d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" 
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// All styles as an object for inline styling with proper TypeScript types
const styles: Record<string, CSSProperties> = {
  frame: {
    width: '100%',
    minHeight: '600px',
    background: 'linear-gradient(180deg, #04091D 13.75%, #051D33 65.8%, #0D98BA 281.75%)',
    padding: '40px 0',
    fontFamily: "'Poppins', 'Lato', 'Barlow', sans-serif",
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
    scrollMarginTop: '60px',
  },
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0 20px',
  },
  leftColumn: {
    flex: '1',
    minWidth: '300px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn: {
    flex: '2',
    minWidth: '300px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Exactly two columns for larger screens
    gap: '20px',
    padding: '20px',
  },
  mainHeading: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '42px',
    lineHeight: '48px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 10px 0',
  },
  accentText: {
    color: '#0D98BA',
  },
  subHeading: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '20px',
  },
  imageContainer: {
    width: '100%',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.5s ease',
  },
  serviceImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    transition: 'all 0.5s ease',
  },
  card: {
    backgroundColor: 'rgba(13, 152, 186, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '120px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid transparent',
  },
  activeCard: {
    backgroundColor: 'rgba(13, 152, 186, 0.25)',
    transform: 'translateY(-5px) !important',
    boxShadow: '0 10px 20px rgba(13, 152, 186, 0.2)',
    border: '1px solid rgba(13, 152, 186, 0.5)',
  },
  cardContent: {
    zIndex: 1,
  },
  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 8px 0',
  },
  cardDescription: {
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '22px',
    color: '#FFFFFF',
    margin: 0,
  },
  cardIcon: {
    position: 'absolute',
    right: '15px',
    bottom: '15px',
    width: '36px',
    height: '36px',
    zIndex: 1,
  },
  arrowIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '36px',
    height: '36px',
  },
  normalCircle: {
    position: 'absolute',
    top: '7px',
    left: '0',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  },
  activeCircle: {
    position: 'absolute',
    top: '7px',
    left: '0',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid rgba(13, 152, 186, 0.8)',
    boxShadow: '0 0 10px rgba(13, 152, 186,.7)',
    backgroundColor: 'rgba(13, 152, 186, 0.15)',
    transition: 'all 0.3s ease',
  },
  normalArrow: {
    transition: 'all 0.3s ease',
    transform: 'rotate(9.85deg)',
    color: 'rgba(255, 255, 255, 0.5)',
    position: 'relative',
    zIndex: 2,
    top:'7px'
  },
  activeArrow: {
    transition: 'all 0.3s ease',
    transform: 'rotate(9.85deg) scale(1.1)',
    color: '#0D98BA',
    filter: 'drop-shadow(0 0 3px rgba(13, 152, 186, .7))',
    position: 'relative',
    zIndex: 2,
    top:'7px'
  }
};

// Add component CSS to handle responsiveness properly
const ResponsiveStyles = () => {
  return (
    <style jsx global>{`
      @media (max-width: 992px) {
        .web-solutions-section .card {
          padding: 15px;
        }
        .web-solutions-section .main-heading {
          font-size: 36px;
          line-height: 42px;
        }
      }
      @media (max-width: 768px) {
        .web-solutions-section .right-column {
          grid-template-columns: repeat(1, 1fr) !important;
        }
        .web-solutions-section .main-heading {
          font-size: 32px;
          line-height: 38px;
        }
        .web-solutions-section .sub-heading {
          font-size: 16px;
          line-height: 22px;
        }
        .web-solutions-section .image-container {
          height: 250px;
        }
        .web-solutions-section .card-title {
          font-size: 16px;
          line-height: 22px;
        }
        .web-solutions-section .card-description {
          font-size: 14px;
          line-height: 20px;
        }
      }
      @media (max-width: 576px) {
        .web-solutions-section .main-heading {
          font-size: 28px;
          line-height: 34px;
        }
        .web-solutions-section .image-container {
          height: 200px;
        }
      }
      /* Add CSS animations for the arrow glow effect */
      .arrow-svg.active {
        animation: glow 1.5s infinite alternate;
      }
      .arrow-circle.active {
        animation: pulse 1.5s infinite alternate;
      }
      @keyframes glow {
        from {
          filter: drop-shadow(0 0 2px rgba(13, 152, 186, 0.7));
        }
        to {
          filter: drop-shadow(0 0 6px rgba(13, 152, 186, 1));
        }
      }
      @keyframes pulse {
        from {
          box-shadow: 0 0 5px rgba(13, 152, 186, 0.5);
        }
        to {
          box-shadow: 0 0 12px rgba(13, 152, 186, 0.8);
        }
      }
    `}</style>
  );
};
'use client';

import { useState, useEffect, useRef, CSSProperties, ReactElement } from 'react';

export default function WebSolutions(): ReactElement {
  // State to track which service card is currently hovered
  const [hoveredService, setHoveredService] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Custom intersection observer setup
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

  // Array of service images (you would replace these with your actual images)
  const serviceImages: string[] = [
    '/images/service.png', // Default image
    '/images/service.png',
    '/images/performance-optimized.png',
    '/images/industry-specific.png',
    '/images/reliable-support.png',
    '/images/responsive-devices.png',
    '/images/data-driven.png',
    '/images/seo-foundation.png',
    '/images/smooth-collaboration.png',
  ];

  // Service card data
  const serviceCards = [
    {
      title: 'Conversion-Focused Design',
      description: 'We craft each site to turn visitors into customers.',
    },
    {
      title: 'Performance Optimized',
      description: 'Fast-loading sites that keep users engaged.',
    },
    {
      title: 'Industry-Specific Solutions',
      description: 'Designs shaped by your market and what actually works.',
    },
    {
      title: 'Reliable Support',
      description: 'Ongoing help whenever you need updates or fixes.',
    },
    {
      title: 'Responsive Across Devices',
      description: 'Looks great and works perfectly on every screen.',
    },
    {
      title: 'Driven by Data',
      description: 'Our design decisions are guided by real analytics.',
    },
    {
      title: 'SEO-First Foundation',
      description: 'Built to help you rank higher from day one.',
    },
    {
      title: 'Smooth Collaboration',
      description: 'We keep things clear, efficient, and on track.',
    },
  ];

  // Handler for card click - navigate to different page
  const handleCardClick = (index: number): void => {
    // Array of URLs for each service card
    const serviceUrls = [
      '/services/conversion-design',
      '/services/performance-optimization',
      '/services/industry-solutions',
      '/services/support',
      '/services/responsive-design',
      '/services/data-driven',
      '/services/seo',
      '/services/collaboration',
    ];
    
    // In a real app, you would use router.push
    // For this demo, we'll just alert the URL
    alert(`Navigating to: ${serviceUrls[index]}`);
    // In a real Next.js app, you would do:
    // router.push(serviceUrls[index]);
  };

  return (
    <div 
      ref={sectionRef}
      style={styles.frame}
      className="web-solutions-section"
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
          <h2 
            className="main-heading"
            style={{
              ...styles.mainHeading,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >
            Because One-Size Never <span style={styles.accentText}>Fits</span> All
          </h2>
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
          >
            <img 
              src={serviceImages[hoveredService]} 
              alt="Service visualization" 
              style={styles.serviceImage}
            />
          </div>
        </div>

        <div className="right-column" style={styles.rightColumn}>
          {serviceCards.map((card, index) => (
            <div 
              key={index}
              className="card" 
              style={{
                ...styles.card,
                ...(hoveredService === index + 1 ? styles.hoveredCard : {}),
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateY(0)' 
                  : 'translateY(40px)',
                transition: `opacity 0.8s ease ${0.4 + index * 0.1}s, transform 0.8s ease ${0.4 + index * 0.1}s`
              }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoveredService(index + 1)}
              onMouseLeave={() => setHoveredService(0)}
            >
              <div style={styles.cardContent}>
                <h3 className="card-title" style={styles.cardTitle}>{card.title}</h3>
                <p className="card-description" style={styles.cardDescription}>{card.description}</p>
              </div>
              <div style={styles.cardIcon}>
                <img 
                  src="/images/arrow.svg" 
                  alt="Arrow" 
                  style={{
                    ...styles.arrowImage,
                    ...(hoveredService === index + 1 ? styles.coloredArrow : {})
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
  },
  hoveredCard: {
    backgroundColor: 'rgba(13, 152, 186, 0.25)',
    transform: 'translateY(-5px) !important',
    boxShadow: '0 10px 20px rgba(13, 152, 186, 0.2)',
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
    width: '24px',
    height: '24px',
    zIndex: 1,
  },
  arrowImage: {
    width: '42px',
    height: '40px',
    objectFit: 'contain',
    transform: 'rotate(9.85deg)',
    transition: 'all 0.3s ease',
    filter: 'brightness(1) saturate(0)',
  },
  coloredArrow: {
    filter: 'brightness(1) saturate(1)',
    transform: 'rotate(9.85deg) scale(1.1)',
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
    `}</style>
  );
};
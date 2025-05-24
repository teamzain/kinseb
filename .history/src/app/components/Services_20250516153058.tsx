'use client';

import { useState, useEffect, useRef, CSSProperties, ReactElement } from 'react';

export default function WebSolutions(): ReactElement {
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

  // Array of service images (you would replace these with your actual images)
  const serviceImages: string[] = [
    '/images/1.jpg', // Default image
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/1.jpg',
    '/images/1.jpg',
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
    // For mobile, toggle the active state
    if (isMobile) {
      setActiveService(activeService === index ? null : index);
    }
    
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
    // On mobile, only navigate if tapped twice (first tap activates, second navigates)
    if (!isMobile || activeService === index) {
      alert(`Navigating to: ${serviceUrls[index]}`);
      // In a real Next.js app, you would do:
      // router.push(serviceUrls[index]);
    }
  };

  // Check if card is active (hovered on desktop or clicked on mobile)
  const isCardActive = (index: number): boolean => {
    return (isMobile && activeService === index) || (!isMobile && hoveredService === index + 1);
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
            >
              <div style={styles.cardContent}>
                <h3 className="card-title" style={styles.cardTitle}>{card.title}</h3>
                <p className="card-description" style={styles.cardDescription}>{card.description}</p>
              </div>
              <div 
                className={`card-icon ${isCardActive(index) ? 'active' : ''}`} 
                style={styles.cardIcon}
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
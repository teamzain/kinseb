'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Poppins, Lato } from 'next/font/google';

// Font optimization with next/font/google
const poppins = Poppins({
  weight: [ '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: [ '700'],
  subsets: ['latin'],
  display: 'swap',
});

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean\nDigital",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
      backgroundImage: "/images/mission.png" // Using placeholder image
    },
    {
      title: "Vision",
      heading: "Creating Digital\nExcellence",
      description: "We envision a digital landscape where businesses thrive through thoughtful design, strategic development, and purposeful innovation — setting new standards for what the web can achieve.",
      backgroundImage: "/api/placeholder/1302/520" // Using placeholder image
    },
    {
      title: "Values",
      heading: "Building Lasting",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      backgroundImage: "/api/placeholder/1302/520" // Using placeholder image
    }
  ];

  // Detect screen size and set initial values
  useEffect(() => {
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    
    // Initial set on component mount
    if (typeof window !== 'undefined') {
      updateViewportDimensions();
      window.addEventListener('resize', updateViewportDimensions);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateViewportDimensions);
      }
    };
  }, []);

  // Handle card rotation and visibility detection
  useEffect(() => {
    // Auto rotate cards
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    // Scroll animation observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.15 } // Trigger when at least 15% of the element is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearInterval(interval);
      if (sectionRef.current) observer.disconnect();
    };
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  const getResponsiveStyles = () => {
    // Only calculate on client-side when dimensions are available
    if (typeof window !== 'undefined' && viewportHeight > 0 && viewportWidth > 0) {
      // Base scale factors
      const isMobile = viewportWidth < 640;
      const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
      const isLaptop = viewportWidth >= 1024 && viewportWidth < 1440;
      const isDesktop = viewportWidth >= 1440;
      
      // Responsive sizing factors
      const heightScaleFactor = Math.min(1, viewportHeight / 900);
      const widthScaleFactor = Math.min(1, viewportWidth / 1440);
      const scaleFactor = Math.min(heightScaleFactor, widthScaleFactor);
      
      // Dynamic container aspect ratio
      let containerAspectRatio = '2.2 / 1'; // Default desktop
      if (isMobile) containerAspectRatio = '1.2 / 1';
      else if (isTablet) containerAspectRatio = '1.6 / 1';
      else if (isLaptop) containerAspectRatio = '2 / 1';
      
      // Dynamic text container width
      let textContainerWidth = '60%'; // Default desktop
      if (isMobile) textContainerWidth = '90%';
      else if (isTablet) textContainerWidth = '80%';
      else if (isLaptop) textContainerWidth = '70%';
      
      // Dynamic heading font size
      let mainHeadingSize = `${Math.max(40, 65 * scaleFactor)}px`; // Default desktop
      if (isMobile) mainHeadingSize = '28px';
      else if (isTablet) mainHeadingSize = '36px';
      
      // Dynamic content sizing
      return {
        // Main container
        frame: {
          ...styles.frame,
          minHeight: isMobile ? 'unset' : '100vh',
          padding: isMobile ? '60px 0' : `${20 * scaleFactor}px 0`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        },
        
        // Main heading
        mainHeading: {
          ...styles.mainHeading,
          fontSize: mainHeadingSize,
          lineHeight: isMobile ? '38px' : isTablet ? '50px' : `${Math.max(60, 98 * scaleFactor)}px`,
          margin: isMobile ? '20px 0 30px' : isTablet ? '30px 0 40px' : `${Math.max(30, 54 * scaleFactor)}px 0`,
          padding: '0 15px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        },
        
        // Carousel container
        carouselContainer: {
          ...styles.carouselContainer,
          width: isMobile ? '95%' : '92%',
          maxHeight: isMobile ? 'unset' : isTablet ? '80vh' : 'calc(100vh - 180px)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
          display: 'flex',
          flexDirection: 'column',
        },
        
        // Carousel
        carousel: {
          ...styles.carousel,
          height: 'auto',
          maxHeight: isMobile ? 'unset' : isTablet ? '75vh' : 'calc(100vh - 220px)',
        },
        
        // Card container
        container: {
          ...styles.container,
          height: 'auto',
          minHeight: isMobile ? '380px' : isTablet ? '420px' : '520px',
          maxHeight: isMobile ? 'unset' : isTablet ? '75vh' : 'calc(100vh - 220px)',
          aspectRatio: containerAspectRatio,
        },
        
        // Text container for cards
        textContainer: {
          ...styles.textContainer,
          width: textContainerWidth,
          margin: isMobile 
            ? '80px 0 30px 20px' 
            : isTablet
              ? '100px 0 40px 40px'
              : isLaptop
                ? '140px 0 50px 50px'
                : '180px 0 0 75px',
          padding: isMobile ? '0 15px' : '0',
          position: 'relative',
          zIndex: 2,
        },
        
        // Large background text
        h2: {
          ...styles.h2,
          fontSize: isMobile ? '50px' : isTablet ? '90px' : isLaptop ? '120px' : '150px',
          lineHeight: isMobile ? '28px' : isTablet ? '40px' : '64px',
          top: isMobile ? '-25px' : isTablet ? '-35px' : `-${50 * scaleFactor}px`,
          left: isMobile ? '-5px' : '-8px',
          width: isMobile ? '100%' : isTablet ? '140%' : '782px',
          opacity: isMobile ? 0.45 : 0.5,
          color: 'rgba(13, 151, 186, 0.82)',
        },
        
        // Card heading
        heading: {
          ...styles.heading,
          fontSize: isMobile ? '22px' : isTablet ? '26px' : isLaptop ? '30px' : '35px',
          lineHeight: isMobile ? '30px' : isTablet ? '34px' : isLaptop ? '38px' : '45px',
          marginBottom: isMobile ? '15px' : isTablet ? '20px' : '30px',
          marginTop: isMobile ? '30px' : isTablet ? '40px' : isLaptop ? '60px' : '84px',
          width: isMobile ? '100%' : isTablet ? '100%' : '572px',
        },
        
        // Card paragraph
        paragraph: {
          ...styles.paragraph,
          fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
          lineHeight: '150%',
          marginBottom: isMobile ? '20px' : isTablet ? '30px' : '40px',
          width: isMobile ? '95%' : isTablet ? '90%' : '533px',
        },
        
        // Pagination dots
        paginationContainer: {
          ...styles.paginationContainer,
          margin: isMobile ? '15px auto' : `${Math.max(15, 30 * scaleFactor)}px auto`,
          marginTop: isMobile ? '10px' : '20px',
        },
        
        // Button container
        buttonsContainer: {
          ...styles.buttonsContainer,
          marginBottom: isMobile ? '20px' : '20px',
          marginTop: isMobile ? '20px' : '20px',
          justifyContent: 'flex-start',
        },
        
        // Button
        button: {
          ...styles.button,
          width: isMobile ? '140px' : '157px',
          height: isMobile ? '40px' : '45px',
        },
        
        // Button text
        buttonText: {
          ...styles.buttonText,
          fontSize: isMobile ? '14px' : '16px',
        },
        
        // Card animation
        cardItem: {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        },
        
        // Background image
        backgroundImageStyle: {
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center right' : 'center center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          width: '100%',
        },
        
        // Improved overlay for better text readability on mobile
        overlay: {
          ...styles.overlay,
          background: isMobile 
            ? 'linear-gradient(270deg, rgba(4, 9, 29, 0.4) 0%, rgba(4, 9, 29, 0.8) 50%, #04091D 85%), linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)'
            : isTablet
              ? 'linear-gradient(270deg, rgba(4, 9, 29, 0.3) 15%, rgba(4, 9, 29, 0.75) 50%, #04091D 80%), linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.75) 100%)'
              : 'linear-gradient(270deg, rgba(4, 9, 29, 0) 25.96%, rgba(4, 9, 29, 0.719008) 43.56%, #04091D 72.04%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
        }
      };
    }
    
    // Return base styles when client measurements not available
    return styles;
  };
  
  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={responsiveStyles.frame} ref={sectionRef} className="scroll-reveal-section">
      <h2 style={responsiveStyles.mainHeading} className={poppins.className}>
        What <span style={styles.accentText}>Drives</span> Us
      </h2>
      
      <div style={responsiveStyles.carouselContainer}>
        <div style={responsiveStyles.carousel} className="carousel">
          {cards.map((card, index) => (
            <div 
              key={index} 
              style={{
                ...responsiveStyles.container,
                display: index === activeCard ? 'block' : 'none',
                position: 'relative',
                ...responsiveStyles.cardItem
              }}
            >
              {/* Background image layer */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${card.backgroundImage})`,
                  ...responsiveStyles.backgroundImageStyle
                }}
              ></div>
              
              {/* Overlay gradient for text readability */}
              <div style={responsiveStyles.overlay}></div>
              
              {/* Content container */}
              <div style={responsiveStyles.textContainer}>
                <h2 style={responsiveStyles.h2} className={poppins.className}>{card.title}</h2>
                <h3 
                  style={{
                    ...responsiveStyles.heading,
                    animation: isVisible && index === activeCard ? 'fadeInUp 0.8s ease forwards' : 'none',
                  }} 
                  className={poppins.className}
                >
                  {card.heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.heading.split('\n').length - 1 && <br />}
                      {i === card.heading.split('\n').length - 1 && 
                        <span style={styles.solutions}>{line.includes('Digital') && i === 0 ? ' Solutions' : 
                                                       line.includes('Excellence') ? ' Excellence' : 
                                                       ' Relationships'}</span>}
                    </React.Fragment>
                  ))}
                </h3>
                
                <p 
                  style={{
                    ...responsiveStyles.paragraph,
                    animation: isVisible && index === activeCard ? 'fadeInUp 0.8s ease 0.2s forwards' : 'none',
                  }} 
                  className={lato.className}
                >
                  {card.description}
                </p>
                
                <div 
                  style={{
                    ...responsiveStyles.buttonsContainer,
                    animation: isVisible && index === activeCard ? 'fadeInUp 0.8s ease 0.3s forwards' : 'none',
                  }}
                >
                  <button style={responsiveStyles.button}>
                    <span style={responsiveStyles.buttonText} className={lato.className}>Start a Project</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div style={responsiveStyles.paginationContainer}>
          {cards.map((_, index) => (
            <div 
              key={index} 
              onClick={() => handleDotClick(index)}
              style={{
                ...(index === activeCard ? styles.activeDot : styles.inactiveDot),
                animation: isVisible ? `fadeIn 0.5s ease ${0.7 + (index * 0.1)}s forwards` : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Additional media queries for fine-tuning responsive behaviors */
        @media screen and (max-width: 480px) {
          /* Extra small mobile adjustments */
          .scroll-reveal-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
        }
        
        @media screen and (min-width: 481px) and (max-width: 767px) {
          /* Medium mobile adjustments */
        }
        
        @media screen and (min-width: 768px) and (max-width: 1023px) {
          /* Tablet adjustments */
        }
        
        @media screen and (orientation: landscape) and (max-height: 600px) {
          /* Landscape mobile adjustment */
          .scroll-reveal-section {
            height: auto !important;
            min-height: unset !important;
            padding: 30px 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  // Base styles that will be enhanced by responsive adjustments
  frame: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainHeading: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '65px',
    lineHeight: '98px',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: '54px 0',
    width: '100%',
  },
  accentText: {
    color: '#0D98BA',
  },
  carouselContainer: {
    width: '92%',
    maxWidth: '1300px',
    position: 'relative',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    flex: '1 1 auto',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '400px',
    aspectRatio: '1.8 / 1',
    border: '1px solid #7D818D',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 25.96%, rgba(4, 9, 29, 0.719008) 43.56%, #04091D 72.04%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
    zIndex: 1,
  },
  textContainer: {
    position: 'relative',
    width: '535px',
    margin: '180px 0 0 75px',
    zIndex: 2,
  },
  h2: {
    position: 'absolute',
    width: '782px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '150px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: 'rgba(13, 151, 186, 0.82)',
    top: '-64px',
    left: '-11px',
  },
  heading: {
    width: '572px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '35px',
    lineHeight: '45px',
    color: '#FFFFFF',
    marginBottom: '30px',
    marginTop: '84px',
  },
  solutions: {
    color: '#0D98BA',
  },
  paragraph: {
    width: '533px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: '40px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '13px',
    marginTop: '20px',
  },
  button: {
    width: '157px',
    height: '45px',
    background: '#0D98BA',
    border: '2px solid #0D98BA',
    borderRadius: '6px',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    color: 'white',
  },
  paginationContainer: {
    position: 'relative',
    display: 'flex',
    width: '100px',
    height: '10px',
    margin: '30px auto',
    gap: '6px',
    justifyContent: 'center',
  },
  activeDot: {
    width: '50px',
    height: '10px',
    background: '#0D98BA',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  inactiveDot: {
    width: '20px',
    height: '10px',
    background: '#0D98BA',
    opacity: 0.4,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'width 0.3s ease, opacity 0.3s ease',
  }
};

export default FigmaDesignComponent;
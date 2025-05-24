'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Poppins, Lato } from 'next/font/google';

// Font optimization with next/font/google
const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
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

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Update viewport dimensions on mount
      const updateViewportDimensions = () => {
        setViewportHeight(window.innerHeight);
        setViewportWidth(window.innerWidth);
      };
      
      updateViewportDimensions();
      
      // Add debounce to resize event for better performance
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          updateViewportDimensions();
        }, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Auto-carousel
      const interval = setInterval(() => {
        setActiveCard((prevCard) => (prevCard + 1) % cards.length);
      }, 5000); // Change cards every 5 seconds

      // Set up intersection observer for scroll animations
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            // When the section becomes visible in the viewport
            if (entries[0].isIntersecting) {
              setIsVisible(true);
              // Only set hasAnimated to true after first animation is complete
              if (!hasAnimated) {
                setTimeout(() => {
                  setHasAnimated(true);
                }, 1500); // Wait for main animations to complete
              }
            } else if (!hasAnimated) {
              // Only reset visibility when scrolled out if hasn't fully animated yet
              setIsVisible(false);
            }
          },
          // Adjusted to trigger earlier when scrolling down (negative top margin)
          { threshold: 0.15, rootMargin: '-50px 0px -10% 0px' }
        );
        
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
        
        return () => {
          clearInterval(interval);
          clearTimeout(resizeTimer);
          window.removeEventListener('resize', handleResize);
          observer.disconnect();
        };
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setIsVisible(true);
        
        return () => {
          clearInterval(interval);
          clearTimeout(resizeTimer);
          window.removeEventListener('resize', handleResize);
        };
      }
    }
  }, [cards.length, hasAnimated]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  // Enhanced responsive styles with smoother transitions
  const getResponsiveStyles = () => {
    // Only apply these calculations on client-side
    if (typeof window !== 'undefined' && viewportHeight > 0 && viewportWidth > 0) {
      // Improved responsive scale factors with better minimum values
      let heightScaleFactor = Math.min(1, viewportHeight / 960);
      let widthScaleFactor = Math.min(1, viewportWidth / 1440);
      let combinedFactor = Math.min(heightScaleFactor, widthScaleFactor);
      
      // More refined scaling for different screen sizes
      if (viewportWidth < 480) {
        combinedFactor = Math.min(combinedFactor, 0.7); // Extra small
      } else if (viewportWidth < 768) {
        combinedFactor = Math.min(combinedFactor, 0.8); // Small
      } else if (viewportWidth < 1024) {
        combinedFactor = Math.min(combinedFactor, 0.9); // Medium
      } else if (viewportWidth < 1200) {
        combinedFactor = Math.min(combinedFactor, 0.95); // Large
      }
      
      // Enhanced responsive aspect ratio
      let containerAspectRatio;
      if (viewportWidth >= 1200) {
        containerAspectRatio = '2.2 / 1'; // Desktop
      } else if (viewportWidth >= 992) {
        containerAspectRatio = '2.1 / 1'; // Small desktop
      } else if (viewportWidth >= 768) {
        containerAspectRatio = '2 / 1'; // Tablet
      } else if (viewportWidth >= 576) {
        containerAspectRatio = '1.8 / 1'; // Large mobile
      } else if (viewportWidth >= 480) {
        containerAspectRatio = '1.5 / 1'; // Medium mobile
      } else {
        containerAspectRatio = '1.2 / 1'; // Small mobile
      }
      
      // Improved text container width based on viewport width
      let textContainerWidth;
      if (viewportWidth >= 1200) {
        textContainerWidth = '50%';
      } else if (viewportWidth >= 992) {
        textContainerWidth = '55%';
      } else if (viewportWidth >= 768) {
        textContainerWidth = '65%';
      } else if (viewportWidth >= 576) {
        textContainerWidth = '75%';
      } else if (viewportWidth >= 480) {
        textContainerWidth = '85%';
      } else {
        textContainerWidth = '92%';
      }
      
      // Enhanced animation properties with smoother transitions
      const shouldAnimate = isVisible;
      
      // Calculate vertical animation offset based on screen size
      const verticalOffset = viewportWidth < 480 ? 20 : 
                            viewportWidth < 768 ? 30 : 
                            viewportWidth < 1024 ? 35 : 40;
      
      return {
        frame: {
          ...styles.frame,
          minHeight: viewportWidth < 768 ? `${Math.min(800, viewportHeight)}px` : '100vh',
          padding: viewportWidth < 480 ? '40px 0 60px' :
                  viewportWidth < 768 ? '50px 0 70px' : `${20 * combinedFactor}px 0`,
        },
        mainHeading: {
          ...styles.mainHeading,
          fontSize: viewportWidth < 360 ? '22px' :
                   viewportWidth < 480 ? '26px' : 
                   viewportWidth < 768 ? '32px' : 
                   viewportWidth < 1024 ? '42px' : 
                   `${Math.max(42, 65 * combinedFactor)}px`,
          lineHeight: viewportWidth < 360 ? '30px' :
                      viewportWidth < 480 ? '34px' : 
                      viewportWidth < 768 ? '40px' : 
                      viewportWidth < 1024 ? '52px' : 
                      `${Math.max(52, 98 * combinedFactor)}px`,
          margin: viewportWidth < 480 ? '10px 0 20px' :
                 viewportWidth < 768 ? '15px 0 25px' : 
                 `${Math.max(20, 30 * combinedFactor)}px 0 ${Math.max(25, 40 * combinedFactor)}px`,
          padding: viewportWidth < 768 ? '0 15px' : '0',
          opacity: shouldAnimate ? 1 : 0,
          transform: shouldAnimate ? 'translateY(0)' : `translateY(${verticalOffset}px)`,
          transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
        },
        carouselContainer: {
          ...styles.carouselContainer,
          width: viewportWidth < 480 ? '95%' : 
                 viewportWidth < 768 ? '92%' : '90%', 
          maxWidth: '1300px',
          maxHeight: viewportWidth >= 768 ? 'calc(100vh - 180px)' : 'auto',
          marginBottom: 0,
          opacity: shouldAnimate ? 1 : 0,
          transform: shouldAnimate ? 'translateY(0)' : `translateY(${verticalOffset}px)`,
          transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
        },
        carousel: {
          ...styles.carousel,
          height: 'auto',
          maxHeight: viewportWidth >= 768 ? 'calc(100vh - 220px)' : 'auto',
        },
        container: {
          ...styles.container,
          height: 'auto',
          minHeight: viewportWidth < 360 ? '250px' :
                     viewportWidth < 480 ? '300px' : 
                     viewportWidth < 768 ? '350px' : '400px',
          maxHeight: viewportWidth >= 768 ? 'calc(100vh - 240px)' : 'auto',
          aspectRatio: containerAspectRatio,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(125, 129, 141, 0.5)',
        },
        textContainer: {
          ...styles.textContainer,
          width: textContainerWidth,
          maxWidth: viewportWidth < 768 ? '100%' : '580px',
          margin: viewportWidth < 360 ? '30px 0 20px 12px' :
                 viewportWidth < 480 ? '40px 0 25px 15px' : 
                 viewportWidth < 768 ? '60px 0 30px 20px' : 
                 viewportWidth < 1024 ? '90px 0 30px 40px' : 
                 `${Math.max(120, 180 * combinedFactor)}px 0 0 ${Math.max(30, 75 * combinedFactor)}px`,
          padding: viewportWidth < 768 ? '0 15px' : '0',
        },
        h2: {
          ...styles.h2,
          fontSize: viewportWidth < 360 ? '36px' :
                    viewportWidth < 480 ? '45px' : 
                    viewportWidth < 768 ? '60px' : 
                    viewportWidth < 1024 ? '80px' : 
                    `${Math.max(80, 130 * combinedFactor)}px`,
          lineHeight: viewportWidth < 360 ? '20px' :
                      viewportWidth < 480 ? '24px' : 
                      viewportWidth < 768 ? '32px' : 
                      viewportWidth < 1024 ? '40px' : 
                      `${Math.max(40, 64 * combinedFactor)}px`,
          top: viewportWidth < 360 ? '-20px' :
               viewportWidth < 480 ? '-25px' : 
               viewportWidth < 768 ? '-30px' : 
               viewportWidth < 1024 ? '-40px' : 
               `${-64 * combinedFactor}px`,
          width: viewportWidth < 360 ? '180px' :
                 viewportWidth < 480 ? '200px' : 
                 viewportWidth < 768 ? '300px' :
                 viewportWidth < 1024 ? '500px' : '782px',
          left: viewportWidth < 768 ? '-5px' : '-11px',
          opacity: viewportWidth < 768 ? '0.45' : '0.5',
        },
        heading: {
          ...styles.heading,
          fontSize: viewportWidth < 360 ? '16px' :
                    viewportWidth < 480 ? '18px' : 
                    viewportWidth < 768 ? '22px' : 
                    viewportWidth < 1024 ? '28px' : 
                    `${Math.max(28, 35 * combinedFactor)}px`,
          lineHeight: viewportWidth < 360 ? '22px' :
                      viewportWidth < 480 ? '24px' : 
                      viewportWidth < 768 ? '28px' : 
                      viewportWidth < 1024 ? '36px' : 
                      `${Math.max(36, 45 * combinedFactor)}px`,
          marginBottom: viewportWidth < 768 ? '14px' : `${Math.max(15, 30 * combinedFactor)}px`,
          marginTop: viewportWidth < 360 ? '10px' :
                     viewportWidth < 480 ? '15px' : 
                     viewportWidth < 768 ? '30px' : 
                     viewportWidth < 1024 ? '40px' : 
                     `${Math.max(50, 84 * combinedFactor)}px`,
          width: viewportWidth < 480 ? '95%' : 
                 viewportWidth < 1024 ? '100%' : '580px',
        },
        paragraph: {
          ...styles.paragraph,
          fontSize: viewportWidth < 360 ? '11px' :
                    viewportWidth < 480 ? '12px' : 
                    viewportWidth < 768 ? '14px' : 
                    viewportWidth < 1024 ? '16px' : 
                    `${Math.max(16, 18 * combinedFactor)}px`,
          lineHeight: viewportWidth < 768 ? '145%' : '150%',
          marginBottom: viewportWidth < 768 ? '20px' : `${Math.max(20, 40 * combinedFactor)}px`,
          width: viewportWidth < 480 ? '95%' : 
                 viewportWidth < 768 ? '90%' : 
                 viewportWidth < 1024 ? '100%' : '540px',
        },
        paginationContainer: {
          ...styles.paginationContainer,
          margin: '15px auto 0',
          padding: '5px 0',
          position: 'relative',
          bottom: viewportWidth < 480 ? '-5px' : 
                  viewportWidth < 768 ? '-10px' : 
                  viewportWidth < 1024 ? '-15px' : '-20px',
          zIndex: 10,
        },
        buttonsContainer: {
          ...styles.buttonsContainer,
          marginBottom: viewportWidth < 768 ? '15px' : '20px',
          marginTop: viewportWidth < 768 ? '10px' : '20px',
          justifyContent: 'flex-start',
        },
        button: {
          ...styles.button,
          width: viewportWidth < 360 ? '120px' :
                 viewportWidth < 480 ? '130px' : 
                 viewportWidth < 768 ? '140px' : '157px',
          height: viewportWidth < 360 ? '36px' :
                  viewportWidth < 480 ? '38px' : 
                  viewportWidth < 768 ? '40px' : '45px',
        },
        buttonText: {
          ...styles.buttonText,
          fontSize: viewportWidth < 360 ? '12px' :
                    viewportWidth < 480 ? '13px' : 
                    viewportWidth < 768 ? '14px' : '16px',
        },
        cardItem: {
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        },
        backgroundImageStyle: {
          backgroundSize: 'cover',
          backgroundPosition: viewportWidth < 768 ? 'center right' : 'center center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          width: '100%',
          transition: 'all 0.5s ease-in-out',
        },
        activeDot: {
          ...styles.activeDot,
          width: viewportWidth < 360 ? '25px' :
                 viewportWidth < 480 ? '30px' : '50px',
          height: viewportWidth < 480 ? '8px' : '10px',
        },
        inactiveDot: {
          ...styles.inactiveDot,
          width: viewportWidth < 360 ? '12px' :
                 viewportWidth < 480 ? '15px' : '20px',
          height: viewportWidth < 480 ? '8px' : '10px',
        }
      };
    }
    
    return styles;
  };
  
  const responsiveStyles = getResponsiveStyles();

  // Function to calculate animation delay based on element index
  const getDelayStyle = (index, baseDelay = 0.2) => {
    if (!isVisible) return { opacity: 0, transform: 'translateY(40px)' };
    
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `opacity 0.8s ease-out ${baseDelay + (index * 0.1)}s, transform 0.8s ease-out ${baseDelay + (index * 0.1)}s`
    };
  };

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
              className={`card-item ${index === activeCard ? 'active' : ''}`}
            >
              {/* Enhanced background image div with added transition effects */}
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
                className="card-background"
              ></div>
              
              {/* Enhanced overlay gradient for better text readability */}
              <div style={styles.overlay} className="card-overlay"></div>
              
              <div style={responsiveStyles.textContainer}>
                <h2 style={responsiveStyles.h2} className={`${poppins.className} card-watermark`}>{card.title}</h2>
                <h3 
                  style={{
                    ...responsiveStyles.heading,
                    ...getDelayStyle(0, 0.3)
                  }} 
                  className={`${poppins.className} card-heading`}
                >
                  {card.heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.heading.split('\n').length - 1 && <br />}
                      {i === card.heading.split('\n').length - 1 && 
                        <span style={styles.solutions} className="accent-text">
                          {line.includes('Digital') && i === 0 ? ' Solutions' : 
                           line.includes('Excellence') ? ' Excellence' : 
                           ' Relationships'}
                        </span>}
                    </React.Fragment>
                  ))}
                </h3>
                
                <p 
                  style={{
                    ...responsiveStyles.paragraph,
                    ...getDelayStyle(1, 0.3)
                  }} 
                  className={`${lato.className} card-description`}
                >
                  {card.description}
                </p>
                
                <div 
                  style={{
                    ...responsiveStyles.buttonsContainer,
                    ...getDelayStyle(2, 0.3)
                  }}
                  className="button-container"
                >
                  <button 
                    style={responsiveStyles.button} 
                    className="cta-button"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(13, 152, 186, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span style={responsiveStyles.buttonText} className={lato.className}>Start a Project</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={responsiveStyles.paginationContainer} className="pagination">
          {cards.map((_, index) => (
            <div 
              key={index} 
              onClick={() => handleDotClick(index)}
              style={{
                ...(index === activeCard ? responsiveStyles.activeDot : responsiveStyles.inactiveDot),
                ...getDelayStyle(index, 0.7)
              }}
              className={`pagination-dot ${index === activeCard ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .card-item.active .card-heading,
        .card-item.active .card-description,
        .card-item.active .button-container {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .card-item.active .card-heading {
          animation-delay: 0.2s;
        }
        
        .card-item.active .card-description {
          animation-delay: 0.3s;
        }
        
        .card-item.active .button-container {
          animation-delay: 0.4s;
        }
        
        .cta-button:hover {
          background: #0EAAD4;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(13, 152, 186, 0.4);
        }
        
        .pagination-dot {
          transition: all 0.3s ease-out;
        }
        
        .pagination-dot:hover {
          transform: scale(1.1);
        }
        
        .pagination-dot.active {
          animation: expandDot 0.5s ease-out forwards;
        }
        
        @keyframes expandDot {
          from { width: 20px; }
          to { width: 50px; }
        }
        
        /* Extra styling for touch devices */
        @media (hover: none) {
          .cta-button:active {
            background: #0EAAD4;
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
};

// Base styles
const styles = {
  frame: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'all 0.3s ease-out',
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
    transition: 'all 0.3s ease-out',
  },
  accentText: {
    color: '#0D98BA',
    textShadow: '0 2px 8px rgba(13, 152, 186, 0.3)',
  },
  carouselContainer: {
    width: '92%',
    maxWidth: '1300px',
    position: 'relative',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    transition: 'all 0.3s ease-out',
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    flex: '1 1 auto',
    transition: 'all 0.3s ease-out',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '400px',
    aspectRatio: '1.8 / 1',
    border: '1px solid rgba(125, 129, 141, 0.5)',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease-out',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 20%, rgba(4, 9, 29, 0.75) 45%, #04091D 75%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
    zIndex: 1,
    transition: 'all 0.3s ease-out',
  },
  textContainer: {
    position: 'relative',
    width: '535px',
    margin: '180px 0 0 75px',
    zIndex: 2,
    transition: 'all 0.3s ease-out',
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
    left: '4px',
    opacity: 0.5,
    transition: 'all 0.3s ease-out',
    textShadow: '0 2px 10px rgba(13, 151, 186, 0.2)',
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
    transition: 'all 0.3s ease-out',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  },
  solutions: {
    color: '#0D98BA',
    textShadow: '0 2px 8px rgba(13, 152, 186, 0.3)',
    transition: 'all 0.3s ease-out',
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
    transition: 'all 0.3s ease-out',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '13px',
    marginTop: '20px',
    transition: 'all 0.3s ease-out',
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
    transition: 'all 0.3s ease-out',
    boxShadow: '0 4px 12px rgba(13, 152, 186, 0.15)',
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    color: 'white',
    transition: 'all 0.3s ease-out',
  },
  paginationContainer: {
    position: 'relative',
    display: 'flex',
    width: '120px',
    height: '15px',
    margin: '10px auto 0',
    gap: '6px',
    justifyContent: 'center',
    transition: 'all 0.3s ease-out',
  },
  activeDot: {
    width: '50px',
    height: '10px',
    background: '#0D98BA',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
    boxShadow: '0 2px 8px rgba(13, 152, 186, 0.3)',
  },
  inactiveDot: {
    width: '20px',
    height: '10px',
    background: '#0D98BA',
    opacity: 0.4,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
  }
};

export default FigmaDesignComponent;
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
  weight: ['700'],
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

  useEffect(() => {
    // Update viewport dimensions on mount and resize
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    
    updateViewportDimensions();
    window.addEventListener('resize', updateViewportDimensions);
    
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    // Scroll animation observer - ONLY trigger when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section becomes visible in the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility when scrolled out of view
          setIsVisible(false);
        }
      },
      // Trigger when at least 20% of the element is visible
      { threshold: 0.2, rootMargin: '0px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateViewportDimensions);
      if (sectionRef.current) observer.disconnect();
    };
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  // Dynamically calculate sizes based on viewport dimensions
  const getResponsiveStyles = () => {
    // Only apply these calculations on client-side
    if (typeof window !== 'undefined' && viewportHeight > 0 && viewportWidth > 0) {
      // Responsive scale factors
      let heightScaleFactor = Math.min(1, viewportHeight / 960);
      let widthScaleFactor = Math.min(1, viewportWidth / 1440);
      let combinedFactor = Math.min(heightScaleFactor, widthScaleFactor);
      
      // More aggressive scaling for smaller screens
      if (viewportWidth < 768) {
        combinedFactor = Math.min(combinedFactor, 0.8);
      } else if (viewportWidth < 1024) {
        combinedFactor = Math.min(combinedFactor, 0.9);
      }
      
      // Determine aspect ratio based on screen size
      let containerAspectRatio;
      if (viewportWidth >= 1200) {
        containerAspectRatio = '2.2 / 1'; // Desktop
      } else if (viewportWidth >= 768) {
        containerAspectRatio = '2 / 1'; // Tablet
      } else if (viewportWidth >= 480) {
        containerAspectRatio = '1.5 / 1'; // Large mobile
      } else {
        containerAspectRatio = '1.2 / 1'; // Small mobile
      }
      
      // Calculate text container width based on viewport width
      let textContainerWidth;
      if (viewportWidth >= 1200) {
        textContainerWidth = '60%';
      } else if (viewportWidth >= 768) {
        textContainerWidth = '70%';
      } else if (viewportWidth >= 480) {
        textContainerWidth = '85%';
      } else {
        textContainerWidth = '90%';
      }
      
      // Calculate animation properties
      const animationEnabled = isVisible;
      const fadeInTransform = animationEnabled ? 'translateY(0)' : 'translateY(40px)';
      const fadeInOpacity = animationEnabled ? 1 : 0;
      
      return {
        frame: {
          ...styles.frame,
          minHeight: viewportWidth < 768 ? 'auto' : '100vh',
          padding: viewportWidth < 768 ? '60px 0' : `${20 * combinedFactor}px 0`,
          opacity: 1, // Base container is always visible
          transition: 'all 0.6s ease-out',
        },
        mainHeading: {
          ...styles.mainHeading,
          fontSize: viewportWidth < 480 ? '24px' : 
                   viewportWidth < 768 ? '30px' : 
                   viewportWidth < 1024 ? '40px' : 
                   `${Math.max(40, 65 * combinedFactor)}px`,
          lineHeight: viewportWidth < 480 ? '32px' : 
                      viewportWidth < 768 ? '38px' : 
                      viewportWidth < 1024 ? '50px' : 
                      `${Math.max(60, 98 * combinedFactor)}px`,
          margin: viewportWidth < 768 ? '20px 0' : `${Math.max(20, 40 * combinedFactor)}px 0`,
          padding: viewportWidth < 768 ? '0 15px' : '0',
          opacity: fadeInOpacity,
          transform: fadeInTransform,
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        },
        carouselContainer: {
          ...styles.carouselContainer,
          width: viewportWidth < 480 ? '95%' : '92%',
          maxHeight: viewportWidth >= 768 ? 'calc(100vh - 180px)' : 'auto',
          opacity: fadeInOpacity,
          transform: fadeInTransform,
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
        },
        carousel: {
          ...styles.carousel,
          height: 'auto',
          maxHeight: viewportWidth >= 768 ? 'calc(100vh - 240px)' : 'auto',
        },
        container: {
          ...styles.container,
          height: 'auto',
          minHeight: viewportWidth < 480 ? '300px' : 
                     viewportWidth < 768 ? '350px' : '400px',
          maxHeight: viewportWidth >= 768 ? 'calc(100vh - 240px)' : 'auto',
          aspectRatio: containerAspectRatio,
        },
        textContainer: {
          ...styles.textContainer,
          width: textContainerWidth,
          maxWidth: viewportWidth < 768 ? '100%' : '572px',
          margin: viewportWidth < 480 ? '50px 0 30px 15px' : 
                 viewportWidth < 768 ? '80px 0 30px 20px' : 
                 viewportWidth < 1024 ? '120px 0 30px 40px' : 
                 `${Math.max(120, 180 * combinedFactor)}px 0 0 ${Math.max(30, 75 * combinedFactor)}px`,
          padding: viewportWidth < 768 ? '0 15px' : '0',
        },
        h2: {
          ...styles.h2,
          fontSize: viewportWidth < 480 ? '45px' : 
                    viewportWidth < 768 ? '60px' : 
                    viewportWidth < 1024 ? '80px' : 
                    `${Math.max(80, 130 * combinedFactor)}px`,
          lineHeight: viewportWidth < 480 ? '24px' : 
                      viewportWidth < 768 ? '32px' : 
                      viewportWidth < 1024 ? '40px' : 
                      `${Math.max(40, 64 * combinedFactor)}px`,
          top: viewportWidth < 480 ? '-25px' : 
               viewportWidth < 768 ? '-30px' : 
               viewportWidth < 1024 ? '-40px' : 
               `${-64 * combinedFactor}px`,
          width: viewportWidth < 480 ? '200px' : 
                 viewportWidth < 768 ? '300px' :
                 viewportWidth < 1024 ? '500px' : '782px',
          left: viewportWidth < 768 ? '-5px' : '-11px',
          opacity: viewportWidth < 768 ? '0.45' : '0.5',
          color: 'rgba(13, 151, 186, 0.82)',
        },
        heading: {
          ...styles.heading,
          fontSize: viewportWidth < 480 ? '18px' : 
                    viewportWidth < 768 ? '22px' : 
                    viewportWidth < 1024 ? '28px' : 
                    `${Math.max(25, 35 * combinedFactor)}px`,
          lineHeight: viewportWidth < 480 ? '24px' : 
                      viewportWidth < 768 ? '28px' : 
                      viewportWidth < 1024 ? '36px' : 
                      `${Math.max(30, 45 * combinedFactor)}px`,
          marginBottom: viewportWidth < 768 ? '14px' : `${Math.max(15, 30 * combinedFactor)}px`,
          marginTop: viewportWidth < 480 ? '15px' : 
                     viewportWidth < 768 ? '30px' : 
                     viewportWidth < 1024 ? '40px' : 
                     `${Math.max(50, 84 * combinedFactor)}px`,
          width: viewportWidth < 480 ? '95%' : 
                 viewportWidth < 1024 ? '100%' : '572px',
        },
        paragraph: {
          ...styles.paragraph,
          fontSize: viewportWidth < 480 ? '12px' : 
                    viewportWidth < 768 ? '14px' : 
                    viewportWidth < 1024 ? '16px' : 
                    `${Math.max(14, 18 * combinedFactor)}px`,
          lineHeight: viewportWidth < 768 ? '145%' : '150%',
          marginBottom: viewportWidth < 768 ? '20px' : `${Math.max(20, 40 * combinedFactor)}px`,
          width: viewportWidth < 480 ? '95%' : 
                 viewportWidth < 768 ? '85%' : 
                 viewportWidth < 1024 ? '100%' : '533px',
        },
        paginationContainer: {
          ...styles.paginationContainer,
          margin: '8px auto 0',
          marginTop: '8px',
          position: 'relative',
          bottom: viewportWidth < 480 ? '5px' : 
                  viewportWidth < 768 ? '10px' : 
                  viewportWidth < 1024 ? '15px' : '10px',
        },
        buttonsContainer: {
          ...styles.buttonsContainer,
          marginBottom: viewportWidth < 768 ? '20px' : '20px',
          marginTop: viewportWidth < 768 ? '15px' : '20px',
          justifyContent: 'flex-start',
        },
        button: {
          ...styles.button,
          width: viewportWidth < 480 ? '130px' : 
                 viewportWidth < 768 ? '140px' : '157px',
          height: viewportWidth < 480 ? '38px' : 
                  viewportWidth < 768 ? '40px' : '45px',
        },
        buttonText: {
          ...styles.buttonText,
          fontSize: viewportWidth < 480 ? '13px' : 
                    viewportWidth < 768 ? '14px' : '16px',
        },
        cardItem: {
          opacity: fadeInOpacity,
          transform: fadeInTransform,
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
        },
        backgroundImageStyle: {
          backgroundSize: 'cover',
          backgroundPosition: viewportWidth < 768 ? 'center right' : 'center center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          width: '100%',
        },
        activeDot: {
          ...styles.activeDot,
          width: viewportWidth < 480 ? '30px' : '50px',
          height: viewportWidth < 480 ? '8px' : '10px',
        },
        inactiveDot: {
          ...styles.inactiveDot,
          width: viewportWidth < 480 ? '15px' : '20px',
          height: viewportWidth < 480 ? '8px' : '10px',
        }
      };
    }
    
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
              {/* Separate background image div for better scaling */}
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
              
              {/* Enhanced overlay gradient for better text readability */}
              <div style={styles.overlay}></div>
              
              <div style={responsiveStyles.textContainer}>
                <h2 style={responsiveStyles.h2} className={poppins.className}>{card.title}</h2>
                <h3 
                  style={{
                    ...responsiveStyles.heading,
                    animation: isVisible && index === activeCard ? 'fadeInUp 0.8s ease forwards' : 'none',
                    opacity: isVisible && index === activeCard ? 1 : 0,
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
                    opacity: isVisible && index === activeCard ? 1 : 0,
                  }} 
                  className={lato.className}
                >
                  {card.description}
                </p>
                
                <div 
                  style={{
                    ...responsiveStyles.buttonsContainer,
                    animation: isVisible && index === activeCard ? 'fadeInUp 0.8s ease 0.3s forwards' : 'none',
                    opacity: isVisible && index === activeCard ? 1 : 0,
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
        
        <div style={responsiveStyles.paginationContainer}>
          {cards.map((_, index) => (
            <div 
              key={index} 
              onClick={() => handleDotClick(index)}
              style={{
                ...(index === activeCard ? responsiveStyles.activeDot : responsiveStyles.inactiveDot),
                animation: isVisible ? `fadeIn 0.5s ease ${0.7 + (index * 0.1)}s forwards` : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            ></div>
          ))}
        </div>
      </div>

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
        
        .carousel-slide-enter {
          opacity: 0;
          transform: translateX(100%);
        }
        
        .carousel-slide-enter-active {
          opacity: 1;
          transform: translateX(0%);
          transition: opacity 500ms, transform 500ms;
        }
        
        .carousel-slide-exit {
          opacity: 1;
          transform: translateX(0%);
        }
        
        .carousel-slide-exit-active {
          opacity: 0;
          transform: translateX(-100%);
          transition: opacity 500ms, transform 500ms;
        }
        
        /* Improved responsive breakpoints */
        @media (max-width: 1200px) {
          /* Large tablet & small desktop adjustments */
        }
        
        @media (max-width: 768px) {
          /* Tablet adjustments */
        }
        
        @media (max-width: 480px) {
          /* Mobile adjustments */
        }
      `}</style>
    </div>
  );
};

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
    marginBottom: '15px',
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
    left: '4px',
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
    margin: '10px auto 0',
    gap: '6px',
    justifyContent: 'center',
  },
  activeDot: {
    width: '50px',
    height: '10px',
    background: '#0D98BA',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  inactiveDot: {
    width: '20px',
    height: '10px',
    background: '#0D98BA',
    opacity: 0.4,
    borderRadius: '10px',
    cursor: 'pointer',
  }
};

export default FigmaDesignComponent;
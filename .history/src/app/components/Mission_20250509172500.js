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
  const sectionRef = useRef(null);
  
  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean",
      subheading: "Digital Solutions",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
      backgroundImage: "/images/mission.png" // Using placeholder image
    },
    {
      title: "Vision",
      heading: "Creating Digital",
      subheading: "Excellence",
      description: "We envision a digital landscape where businesses thrive through thoughtful design, strategic development, and purposeful innovation — setting new standards for what the web can achieve.",
      backgroundImage: "/api/placeholder/1302/520" // Using placeholder image
    },
    {
      title: "Values",
      heading: "Building Lasting",
      subheading: "Relationships",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      backgroundImage: "/api/placeholder/1302/520" // Using placeholder image
    }
  ];

  // Check if element is in viewport for animation
  const checkVisibility = () => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75;
    
    if (isInViewport) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    // Update viewport dimensions on mount and resize
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    
    updateViewportDimensions();
    window.addEventListener('resize', updateViewportDimensions);
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check for visibility
    checkVisibility();
    
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateViewportDimensions);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  // Dynamically calculate sizes based on viewport dimensions
  const getResponsiveStyles = () => {
    // Only apply these calculations on client-side
    if (typeof window !== 'undefined' && viewportHeight > 0 && viewportWidth > 0) {
      const heightScaleFactor = Math.min(1, viewportHeight / 960);
      const widthScaleFactor = Math.min(1, viewportWidth / 1440);
      const combinedFactor = Math.min(heightScaleFactor, widthScaleFactor);
      
      // Determine text container width based on viewport width
      let textContainerWidth = '100%';
      if (viewportWidth >= 1024) {
        textContainerWidth = '60%';
      } else if (viewportWidth >= 768) {
        textContainerWidth = '75%';
      } else {
        textContainerWidth = '90%';
      }
      
      return {
        frame: {
          ...styles.frame,
          minHeight: '100vh',
          padding: `${20 * combinedFactor}px 0`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        },
        mainHeading: {
          ...styles.mainHeading,
          fontSize: viewportWidth < 768 ? '26px' : `${Math.max(40, 65 * combinedFactor)}px`, // Smaller on mobile
          lineHeight: viewportWidth < 768 ? '34px' : `${Math.max(60, 98 * combinedFactor)}px`,
          margin: viewportWidth < 768 ? '30px 0 20px' : `${Math.max(20, 54 * combinedFactor)}px 0`,
          padding: '0 15px',
        },
        carouselContainer: {
          ...styles.carouselContainer,
          width: '95%', // Increased from 90%
        },
        carousel: {
          ...styles.carousel,
          height: viewportWidth < 768 ? 'auto' : `${Math.max(400, 650 * heightScaleFactor)}px`, // Decreased height
        },
        container: {
          ...styles.container,
          height: viewportWidth < 768 ? 'auto' : `${Math.max(400, 650 * heightScaleFactor)}px`, // Decreased height
          minHeight: viewportWidth < 768 ? '420px' : 'auto', // Decreased mobile height from 480px
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
        textContainer: {
          ...styles.textContainer,
          width: textContainerWidth,
          margin: viewportWidth < 768 
            ? '80px 0 30px 20px' // Less space from top on mobile (adjusted from 100px)
            : `${Math.max(180, 200 * combinedFactor)}px 0 0 ${Math.max(30, 75 * combinedFactor)}px`, // Less space from top on laptop
          padding: viewportWidth < 768 ? '0 15px' : '0',
        },
        h2: {
          ...styles.h2,
          fontSize: viewportWidth < 768 ? '60px' : `${Math.max(80, 150 * combinedFactor)}px`, // Much smaller on mobile
          lineHeight: viewportWidth < 768 ? '32px' : `${Math.max(40, 64 * combinedFactor)}px`,
          top: viewportWidth < 768 ? '-30px' : `${-64 * combinedFactor}px`,
          width: viewportWidth < 768 ? '100%' : '782px',
          left: viewportWidth < 768 ? '-5px' : '-11px',
          opacity: viewportWidth < 768 ? '0.4' : '0.45', // Darker title text (was 0.25/0.3)
          color: 'rgba(13, 151, 186, 0.95)', // Slightly darker blue
        },
        heading: {
          ...styles.heading,
          fontSize: viewportWidth < 768 ? '20px' : `${Math.max(25, 35 * combinedFactor)}px`, // Smaller on mobile
          lineHeight: viewportWidth < 768 ? '28px' : `${Math.max(30, 45 * combinedFactor)}px`,
          marginBottom: viewportWidth < 768 ? '8px' : `${Math.max(8, 15 * combinedFactor)}px`,
          marginTop: viewportWidth < 768 ? '30px' : `${Math.max(50, 84 * combinedFactor)}px`,
          width: viewportWidth < 768 ? '95%' : '572px',
        },
        subheading: {
          ...styles.heading,
          fontSize: viewportWidth < 768 ? '20px' : `${Math.max(25, 35 * combinedFactor)}px`,
          lineHeight: viewportWidth < 768 ? '28px' : `${Math.max(30, 45 * combinedFactor)}px`,
          marginBottom: viewportWidth < 768 ? '14px' : `${Math.max(15, 30 * combinedFactor)}px`,
          width: viewportWidth < 768 ? '95%' : '572px',
          color: '#0D98BA', // Blue color for subheading
        },
        paragraph: {
          ...styles.paragraph,
          fontSize: viewportWidth < 768 ? '13px' : `${Math.max(14, 18 * combinedFactor)}px`, // Even smaller on mobile
          lineHeight: viewportWidth < 768 ? '145%' : '150%',
          marginBottom: viewportWidth < 768 ? '20px' : `${Math.max(20, 40 * combinedFactor)}px`,
          width: viewportWidth < 768 ? '85%' : '533px', // Narrower on mobile
        },
        paginationContainer: {
          ...styles.paginationContainer,
          margin: `${Math.max(15, 30 * combinedFactor)}px auto`,
        },
        buttonsContainer: {
          ...styles.buttonsContainer,
          marginBottom: viewportWidth < 768 ? '40px' : '20px',
          marginTop: viewportWidth < 768 ? '25px' : '20px',
          justifyContent: viewportWidth < 768 ? 'flex-start' : 'flex-start', // Ensuring left-aligned on mobile
        },
        button: {
          ...styles.button,
          width: viewportWidth < 768 ? '140px' : '157px', // Slightly narrower on mobile
          height: viewportWidth < 768 ? '40px' : '45px', // Slightly shorter on mobile
        },
        buttonText: {
          ...styles.buttonText,
          fontSize: viewportWidth < 768 ? '14px' : '16px', // Smaller button text on mobile
        }
      };
    }
    
    return styles;
  };
  
  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={responsiveStyles.frame} ref={sectionRef} className={`section ${isVisible ? 'visible' : ''}`}>
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
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
              }}
              className={index === activeCard ? "active-card" : ""}
            >
              {/* Overlay to ensure text readability */}
              <div style={styles.overlay}></div>
              
              <div style={responsiveStyles.textContainer}>
                <h2 style={responsiveStyles.h2} className={poppins.className}>{card.title}</h2>
                <h3 style={responsiveStyles.heading} className={poppins.className}>
                  {card.heading}
                </h3>
                <h3 style={responsiveStyles.subheading} className={poppins.className}>
                  {card.subheading}
                </h3>
                
                <p style={responsiveStyles.paragraph} className={lato.className}>
                  {card.description}
                </p>
                
                <div style={responsiveStyles.buttonsContainer}>
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
              style={index === activeCard ? styles.activeDot : styles.inactiveDot}
            ></div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .active-card {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0.6;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
    width: '92%', // Slightly decreased from 95%
    maxWidth: '1300px', // Slightly decreased from 1400px
    position: 'relative',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: '820px', // Decreased height from 920px
    flex: '1 1 auto',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '820px', // Decreased height from 920px
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
    margin: '200px 0 0 75px', // Changed from 240px to 200px - less space from top
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
    color: 'rgba(13, 151, 186, 0.64)',
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
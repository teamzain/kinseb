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
  const [scale, setScale] = useState(1);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 960
  });
  const containerRef = useRef(null);
  
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
      heading: "Building Lasting\nRelationships",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      backgroundImage: "/api/placeholder/1302/520" // Using placeholder image
    }
  ];

  useEffect(() => {
    // Calculate scaling factor based on viewport size
    const updateScale = () => {
      // Base dimensions that the design was created for
      const baseWidth = 1440;
      const baseHeight = 960;
      
      // Get current viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Update screen size state
      setScreenSize({
        width: viewportWidth,
        height: viewportHeight
      });
      
      // Calculate scale factors for width and height
      const widthScale = viewportWidth / baseWidth;
      const heightScale = viewportHeight / baseHeight;
      
      // Use the smaller scale to ensure entire design fits
      // For mobile, use a different approach to ensure better scaling
      const minScale = viewportWidth < 768 ? 0.65 : 0.4; // Increased minimum scale for mobile
      
      // For laptop screens, use a more generous scale
      let newScale;
      if (viewportWidth >= 768 && viewportWidth <= 1440) {
        // For laptops, prioritize width scaling slightly more
        newScale = Math.max(
          Math.min(widthScale * 1.05, heightScale, 1), 
          minScale
        );
      } else if (viewportWidth < 768) {
        // For mobile, use a fixed scale that works better visually
        newScale = Math.max(minScale, Math.min(widthScale * 1.2, 0.85));
      } else {
        newScale = Math.max(
          Math.min(widthScale, heightScale, 1), 
          minScale
        );
      }
      
      setScale(newScale);
    };
    
    // Update scale on mount and resize
    updateScale();
    window.addEventListener('resize', updateScale);
    
    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateScale);
    };
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  // Apply scaling to all styles
  const applyScale = (styleObj) => {
    const scaledStyles = {};
    
    Object.keys(styleObj).forEach(key => {
      const value = styleObj[key];
      
      // Skip non-numeric properties and certain properties that shouldn't scale
      if (
        typeof value !== 'string' || 
        !value.match(/^-?\d+(\.\d+)?(px|em|rem|%)$/) ||
        key === 'fontWeight' ||
        key === 'opacity' ||
        key === 'zIndex'
      ) {
        scaledStyles[key] = value;
        return;
      }
      
      // Extract numeric value and unit
      const matches = value.match(/^(-?\d+(\.\d+)?)(px|em|rem|%)$/);
      if (matches) {
        const numericValue = parseFloat(matches[1]);
        const unit = matches[3];
        
        // Scale the value (only scale px values)
        if (unit === 'px') {
          scaledStyles[key] = `${Math.round(numericValue * scale)}px`;
        } else {
          scaledStyles[key] = value;
        }
      } else {
        scaledStyles[key] = value;
      }
    });
    
    return scaledStyles;
  };
  
  // Check if we're on mobile or laptop
  const isMobile = screenSize.width < 768;
  const isLaptop = screenSize.width >= 768 && screenSize.width <= 1440;
  
  // Apply scaling to base styles with mobile-specific adjustments
  const scaledStyles = {
    frame: applyScale(styles.frame),
    mainHeading: applyScale({
      ...styles.mainHeading,
      // Make main heading smaller on mobile
      fontSize: isMobile ? '45px' : styles.mainHeading.fontSize,
      lineHeight: isMobile ? '60px' : styles.mainHeading.lineHeight,
      margin: isMobile ? '30px 0' : styles.mainHeading.margin
    }),
    accentText: styles.accentText,
    carouselContainer: applyScale({
      ...styles.carouselContainer,
      // Make carousel full width on mobile
      width: '100%',
      padding: isMobile ? '0 10px' : '0'
    }),
    carousel: applyScale({
      ...styles.carousel,
      // Set appropriate height for mobile
      height: isMobile ? '480px' : styles.carousel.height
    }),
    container: applyScale({
      ...styles.container,
      // Set appropriate height for mobile
      height: isMobile ? '480px' : styles.container.height,
      borderRadius: isMobile ? '8px' : styles.container.borderRadius
    }),
    overlay: styles.overlay,
    mobileOverlay: {
      ...styles.mobileOverlay,
      // Improved overlay for mobile to match desktop look
      background: 'linear-gradient(270deg, rgba(4, 9, 29, 0.3) 0%, rgba(4, 9, 29, 0.8) 40%, #04091D 70%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)'
    },
    textContainer: applyScale({
      ...styles.textContainer,
      // Adjust text positioning for mobile
      width: isMobile ? '85%' : styles.textContainer.width,
      margin: isMobile ? '70px 0 0 20px' : isLaptop ? '140px 0 0 60px' : styles.textContainer.margin
    }),
    h2: applyScale({
      ...styles.h2,
      // Adjust title for mobile
      fontSize: isMobile ? '100px' : styles.h2.fontSize,
      lineHeight: isMobile ? '50px' : styles.h2.lineHeight,
      width: isMobile ? '100%' : styles.h2.width,
      top: isMobile ? '-50px' : styles.h2.top,
      left: isMobile ? '-8px' : styles.h2.left,
      color: 'rgba(13, 152, 186, 0.3)' // Consistent color across devices
    }),
    heading: applyScale({
      ...styles.heading,
      // Adjust heading for mobile
      width: isMobile ? '100%' : styles.heading.width,
      fontSize: isMobile ? '28px' : styles.heading.fontSize,
      lineHeight: isMobile ? '36px' : styles.heading.lineHeight,
      marginTop: isMobile ? '60px' : styles.heading.marginTop
    }),
    solutions: styles.solutions,
    paragraph: applyScale({
      ...styles.paragraph,
      // Adjust paragraph for mobile
      width: isMobile ? '100%' : isLaptop ? '100%' : styles.paragraph.width,
      fontSize: isMobile ? '16px' : styles.paragraph.fontSize
    }),
    buttonsContainer: applyScale(styles.buttonsContainer),
    button: applyScale(styles.button),
    buttonText: applyScale(styles.buttonText),
    paginationContainer: applyScale({
      ...styles.paginationContainer,
      margin: isMobile ? '20px auto' : styles.paginationContainer.margin
    }),
    activeDot: applyScale(styles.activeDot),
    inactiveDot: applyScale(styles.inactiveDot)
  };

  // Adjust card visibility and styling based on screen size
  const getCardStyles = (index) => {
    const isActive = index === activeCard;
    
    // Get content for the current card
    const cardContent = cards[index];
    
    return {
      ...scaledStyles.container,
      display: isActive ? 'block' : 'none',
      backgroundImage: `url(${cardContent.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center', // Consistent positioning across devices
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      filter: 'brightness(1.1)', // Consistent brightness across devices
      width: '100%',
      height: '100%'
    };
  };

  return (
    <div style={scaledStyles.frame} ref={containerRef}>
      <h2 style={scaledStyles.mainHeading} className={poppins.className}>
        What <span style={scaledStyles.accentText}>Drives</span> Us
      </h2>
      
      <div style={scaledStyles.carouselContainer}>
        <div style={scaledStyles.carousel} className="carousel">
          {cards.map((card, index) => (
            <div 
              key={index} 
              style={getCardStyles(index)}
            >
              {/* Consistent overlay for both mobile and desktop */}
              <div style={isMobile ? scaledStyles.mobileOverlay : scaledStyles.overlay}></div>
              
              <div style={scaledStyles.textContainer}>
                <h2 style={scaledStyles.h2} className={poppins.className}>{card.title}</h2>
                <h3 style={scaledStyles.heading} className={poppins.className}>
                  {card.heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.heading.split('\n').length - 1 && <br />}
                      {i === card.heading.split('\n').length - 1 && 
                        <span style={scaledStyles.solutions}>
                          {line.includes('Digital') && i === 0 ? ' Solutions' : 
                           line.includes('Excellence') ? ' Excellence' : 
                           ' Relationships'}
                        </span>}
                    </React.Fragment>
                  ))}
                </h3>
                
                <p style={scaledStyles.paragraph} className={lato.className}>
                  {card.description}
                </p>
                
                <div style={scaledStyles.buttonsContainer}>
                  <button style={scaledStyles.button}>
                    <span style={scaledStyles.buttonText} className={lato.className}>Start a Project</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={scaledStyles.paginationContainer}>
          {cards.map((_, index) => (
            <div 
              key={index} 
              onClick={() => handleDotClick(index)}
              style={index === activeCard ? scaledStyles.activeDot : scaledStyles.inactiveDot}
            ></div>
          ))}
        </div>
      </div>
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
    width: '100%',
    maxWidth: '1400px',
    position: 'relative',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: '620px',
    flex: '1 1 auto',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '620px',
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
  mobileOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 15%, rgba(4, 9, 29, 0.75) 35%, #04091D 60%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
    zIndex: 1,
  },
  textContainer: {
    position: 'relative',
    width: '535px',
    margin: '160px 0 0 75px',
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
    color: 'rgba(13, 152, 186, 0.3)',
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
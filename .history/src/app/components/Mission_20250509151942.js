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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
      backgroundImage: "/api/placeholder/1302/620" // Updated height to 620px
    },
    {
      title: "Values",
      heading: "Building Lasting\nRelationships",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      backgroundImage: "/api/placeholder/1302/620" // Updated height to 620px
    }
  ];

  useEffect(() => {
    // Calculate scaling factor based on viewport size
    const updateDimensions = () => {
      // Get current viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      setDimensions({
        width: viewportWidth,
        height: viewportHeight
      });
      
      // Base dimensions that the design was created for
      const baseWidth = 1440;
      const baseHeight = 960;
      
      // Calculate scale factors for width and height
      const widthScale = viewportWidth / baseWidth;
      const heightScale = viewportHeight / baseHeight;
      
      // Use the smaller scale to ensure entire design fits
      const newScale = Math.min(widthScale, heightScale, 1);
      
      setScale(newScale);
    };
    
    // Update scale on mount and resize
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateDimensions);
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
  
  // Apply responsive adjustments for mobile
  const getResponsiveStyles = () => {
    const isMobile = dimensions.width < 768;
    const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
    
    let responsiveStyles = JSON.parse(JSON.stringify(styles));
    
    if (isMobile) {
      // Mobile adjustments
      responsiveStyles.mainHeading.fontSize = '40px';
      responsiveStyles.mainHeading.lineHeight = '60px';
      responsiveStyles.mainHeading.margin = '30px 0';
      
      responsiveStyles.h2.fontSize = '100px';
      responsiveStyles.h2.top = '-40px';
      
      responsiveStyles.heading.fontSize = '28px';
      responsiveStyles.heading.lineHeight = '36px';
      responsiveStyles.heading.width = '90%';
      
      responsiveStyles.textContainer.width = '90%';
      responsiveStyles.textContainer.margin = '120px 0 0 20px';
      
      responsiveStyles.paragraph.width = '90%';
      responsiveStyles.paragraph.fontSize = '16px';
      
      responsiveStyles.carousel.height = '520px';
      responsiveStyles.container.height = '520px';
    } else if (isTablet) {
      // Tablet adjustments
      responsiveStyles.mainHeading.fontSize = '55px';
      responsiveStyles.mainHeading.lineHeight = '80px';
      
      responsiveStyles.h2.fontSize = '120px';
      responsiveStyles.h2.top = '-50px';
      
      responsiveStyles.textContainer.width = '80%';
      responsiveStyles.textContainer.margin = '140px 0 0 40px';
      
      responsiveStyles.heading.width = '90%';
      responsiveStyles.paragraph.width = '90%';
    }
    
    return responsiveStyles;
  };

  // Get responsive base styles
  const baseStyles = getResponsiveStyles();
  
  // Apply scaling to responsive base styles
  const scaledStyles = {
    frame: applyScale(baseStyles.frame),
    mainHeading: applyScale(baseStyles.mainHeading),
    accentText: baseStyles.accentText,
    carouselContainer: applyScale(baseStyles.carouselContainer),
    carousel: applyScale(baseStyles.carousel),
    container: applyScale(baseStyles.container),
    overlay: baseStyles.overlay,
    textContainer: applyScale(baseStyles.textContainer),
    h2: applyScale(baseStyles.h2),
    heading: applyScale(baseStyles.heading),
    solutions: baseStyles.solutions,
    paragraph: applyScale(baseStyles.paragraph),
    buttonsContainer: applyScale(baseStyles.buttonsContainer),
    button: applyScale(baseStyles.button),
    buttonText: applyScale(baseStyles.buttonText),
    paginationContainer: applyScale(baseStyles.paginationContainer),
    activeDot: applyScale(baseStyles.activeDot),
    inactiveDot: applyScale(baseStyles.inactiveDot)
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
              style={{
                ...scaledStyles.container,
                display: index === activeCard ? 'block' : 'none',
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
              }}
            >
              {/* Overlay to ensure text readability */}
              <div style={scaledStyles.overlay}></div>
              
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
                           line.includes('Digital') && i === 1 ? ' Excellence' : 
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
    padding: '20px',
    boxSizing: 'border-box',
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
    width: '90%',
    maxWidth: '1302px',
    position: 'relative',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '50px', // Added to ensure pagination dots are visible
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: '620px', // Increased height to show full image
    flex: '1 1 auto',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '620px', // Increased height to match carousel
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
    margin: '20px auto',
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
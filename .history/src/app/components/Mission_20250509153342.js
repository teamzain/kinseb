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
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 960,
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
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Update dimensions on mount and resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initial call
    }
    
    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      clearInterval(interval);
    };
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  // Get responsive styles based on current window size
  const getResponsiveStyles = () => {
    const { width } = windowSize;
    
    // Base styles (for desktop/laptop)
    let currentStyles = { ...styles };
    
    // Mobile styles (< 768px)
    if (width < 768) {
      currentStyles = {
        ...currentStyles,
        frame: {
          ...currentStyles.frame,
          height: 'auto',
          minHeight: '100vh',
        },
        mainHeading: {
          ...currentStyles.mainHeading,
          fontSize: '32px',
          lineHeight: '48px',
          margin: '30px 0',
        },
        carouselContainer: {
          ...currentStyles.carouselContainer,
          width: '95%',
        },
        carousel: {
          ...currentStyles.carousel,
          height: 'auto',
          minHeight: '500px',
        },
        container: {
          ...currentStyles.container,
          height: 'auto',
          minHeight: '500px',
        },
        textContainer: {
          ...currentStyles.textContainer,
          width: '85%',
          margin: '100px 20px 40px',
        },
        h2: {
          ...currentStyles.h2,
          fontSize: '80px',
          width: '100%',
          top: '-40px',
          left: '-5px',
        },
        heading: {
          ...currentStyles.heading,
          width: '100%',
          fontSize: '28px',
          lineHeight: '36px',
          marginTop: '40px',
        },
        paragraph: {
          ...currentStyles.paragraph,
          width: '100%',
          fontSize: '16px',
          marginBottom: '30px',
        },
        buttonsContainer: {
          ...currentStyles.buttonsContainer,
          marginTop: '10px',
        },
        paginationContainer: {
          ...currentStyles.paginationContainer,
          margin: '15px auto',
        },
      };
    }
    // Tablet styles (768px - 1023px)
    else if (width >= 768 && width < 1024) {
      currentStyles = {
        ...currentStyles,
        mainHeading: {
          ...currentStyles.mainHeading,
          fontSize: '50px',
          lineHeight: '75px',
        },
        carouselContainer: {
          ...currentStyles.carouselContainer,
          width: '90%',
        },
        carousel: {
          ...currentStyles.carousel,
          height: '580px',
        },
        container: {
          ...currentStyles.container,
          height: '580px',
        },
        textContainer: {
          ...currentStyles.textContainer,
          width: '450px',
          margin: '140px 0 0 40px',
        },
        h2: {
          ...currentStyles.h2,
          fontSize: '120px',
          width: '600px',
          top: '-50px',
        },
        heading: {
          ...currentStyles.heading,
          width: '100%',
          fontSize: '32px',
          lineHeight: '42px',
        },
        paragraph: {
          ...currentStyles.paragraph,
          width: '100%',
          fontSize: '17px',
        },
      };
    }
    // Small desktop styles (1024px - 1279px)
    else if (width >= 1024 && width < 1280) {
      currentStyles = {
        ...currentStyles,
        carouselContainer: {
          ...currentStyles.carouselContainer,
          width: '90%',
        },
        textContainer: {
          ...currentStyles.textContainer,
          width: '480px',
          margin: '150px 0 0 60px',
        },
        h2: {
          ...currentStyles.h2,
          fontSize: '140px',
          width: '700px',
        },
        heading: {
          ...currentStyles.heading,
          width: '520px',
        },
        paragraph: {
          ...currentStyles.paragraph,
          width: '480px',
        },
      };
    }
    // Large desktop/laptop (1280px and above)
    // No changes needed, use default styles
    
    return currentStyles;
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div style={responsiveStyles.frame} ref={containerRef}>
      <h2 style={responsiveStyles.mainHeading} className={poppins.className}>
        What <span style={responsiveStyles.accentText}>Drives</span> Us
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
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
              }}
            >
              {/* Overlay to ensure text readability */}
              <div style={responsiveStyles.overlay}></div>
              
              <div style={responsiveStyles.textContainer}>
                <h2 style={responsiveStyles.h2} className={poppins.className}>{card.title}</h2>
                <h3 style={responsiveStyles.heading} className={poppins.className}>
                  {card.heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.heading.split('\n').length - 1 && <br />}
                      {i === card.heading.split('\n').length - 1 && 
                        <span style={responsiveStyles.solutions}>
                          {line.includes('Digital') && i === 0 ? ' Solutions' : 
                           line.includes('Digital') && i === 1 ? ' Excellence' : 
                           ' Relationships'}
                        </span>}
                    </React.Fragment>
                  ))}
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
              style={index === activeCard ? responsiveStyles.activeDot : responsiveStyles.inactiveDot}
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
    marginBottom: '50px',
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
'use client';
import React, { useState, useEffect } from 'react';
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

const AIExcellenceCard = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Automatic slide change
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);
  
  // Determine if mobile view
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Adjust styles based on screen size
  const getResponsiveStyles = () => {
    if (isMobile) {
      return {
        card: {
          ...styles.card,
          padding: '24px 20px',
          height: 'auto',
          minHeight: '300px',
        },
        content: {
          ...styles.content,
          flexDirection: 'column',
          textAlign: 'center',
          marginTop: '20px',
        },
        textContainer: {
          ...styles.textContainer,
          width: '100%',
          paddingRight: 0,
          marginTop: '20px',
        },
        heading: {
          ...styles.heading,
          fontSize: '24px',
          lineHeight: '32px',
          marginBottom: '16px',
        },
        description: {
          ...styles.description,
          fontSize: '14px',
          lineHeight: '22px',
          marginBottom: '20px',
        },
        button: {
          ...styles.button,
          width: '100%',
          marginTop: '8px',
        },
        dotContainer: {
          ...styles.dotContainer,
          marginTop: '20px',
        }
      };
    } else if (isTablet) {
      return {
        card: {
          ...styles.card,
          padding: '30px 24px',
        },
        content: {
          ...styles.content,
          marginTop: '15px',
        },
        textContainer: {
          ...styles.textContainer,
          width: '60%',
          paddingRight: '15px',
          marginTop: '20px',
        },
        heading: {
          ...styles.heading,
          fontSize: '26px',
          lineHeight: '34px',
        },
        description: {
          ...styles.description,
          fontSize: '15px',
          lineHeight: '24px',
        }
      };
    } else {
      return styles;
    }
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  return (
    <div style={responsiveStyles.card}>
      <div style={responsiveStyles.content}>
        <div style={responsiveStyles.textContainer}>
          <h2 style={responsiveStyles.heading} className={poppins.className}>
            AI Excellence at Your <span style={styles.accentText}>Fingertips</span>
          </h2>
          
          <p style={responsiveStyles.description} className={lato.className}>
            Achieve efficient AI integration with our tailored solutions. We support AI practice management and scalability, helping you maintain a competitive advantage and streamline operations.
          </p>
          
          <button style={responsiveStyles.button} className={lato.className}>
            Get Started Today!
          </button>
        </div>
      </div>
      
      <div style={responsiveStyles.dotContainer}>
        <div 
          style={activeSlide === 0 ? styles.inactiveDot : styles.dot} 
          onClick={() => setActiveSlide(0)}
        ></div>
        <div 
          style={activeSlide === 1 ? styles.activeDot : styles.dot} 
          onClick={() => setActiveSlide(1)}
        ></div>
        <div 
          style={activeSlide === 2 ? styles.inactiveDot : styles.dot} 
          onClick={() => setActiveSlide(2)}
        ></div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#001523',
    borderRadius: '8px',
    padding: '36px 32px',
    color: '#ffffff',
    width: '100%',
    maxWidth: '800px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    margin: '0 auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '30px',
  },
  textContainer: {
    width: '70%',
    paddingRight: '20px',
    marginTop: '30px',  // Increased margin to move text down
  },
  heading: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#ffffff',
  },
  accentText: {
    color: '#FF7A21',
  },
  description: {
    fontSize: '16px',
    lineHeight: '26px',
    marginBottom: '30px',
    color: '#E6E6E6',
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#FF7A21',
    color: '#ffffff',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  dotContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '30px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
  },
  activeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#FF7A21',
    cursor: 'pointer',
    position: 'relative',
  },
  inactiveDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
  }
};

export default AIExcellenceCard;
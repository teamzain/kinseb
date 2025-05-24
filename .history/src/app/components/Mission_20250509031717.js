'use client';
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  
  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean\nDigital",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
      image: "/api/placeholder/500/520", // Placeholder for mission image
      imageAlt: "Digital solutions illustration"
    },
    {
      title: "Vision",
      heading: "Creating Digital\n",
      description: "We envision a digital landscape where businesses thrive through thoughtful design, strategic development, and purposeful innovation — setting new standards for what the web can achieve.",
      image: "/api/placeholder/500/520", // Placeholder for vision image
      imageAlt: "Digital excellence illustration"
    },
    {
      title: "Values",
      heading: "Building Lasting\n",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      image: "/api/placeholder/500/520", // Placeholder for values image
      imageAlt: "Business relationships illustration"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the component is visible
    );
    
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  // Determine which text to highlight based on card title
  const getHighlightText = (title) => {
    switch(title) {
      case "Mission": return " Solutions";
      case "Vision": return " Excellence";
      case "Values": return " Relationships";
      default: return "";
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Lato:wght@600&display=swap" rel="stylesheet" />
      </Head>
      
      <div 
        ref={componentRef} 
        style={{
          ...styles.frame,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      >
        <h2 
          style={{
            ...styles.mainHeading,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            transitionDelay: '0.3s'
          }}
        >
          What <span style={styles.accentText}>Drives</span> Us
        </h2>
        
        <div style={styles.carouselContainer}>
          <div style={styles.carousel} className="carousel">
            {cards.map((card, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.container,
                  opacity: index === activeCard ? 1 : 0,
                  transform: index === activeCard ? 'translateX(0)' : 'translateX(50px)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  display: 'flex' // Changed to flex to arrange text and image
                }}
              >
                <div style={styles.textContainer}>
                  <h2 style={styles.h2}>{card.title}</h2>
                  <h3 style={styles.heading}>
                    {card.heading}
                    <span style={styles.solutions}>{getHighlightText(card.title)}</span>
                  </h3>
                  
                  <p style={styles.paragraph}>
                    {card.description}
                  </p>
                  
                  <div style={styles.buttonsContainer}>
                    <button style={styles.button}>
                      <span style={styles.buttonText}>Start a Project</span>
                    </button>
                  </div>
                </div>
                
                {/* Image container */}
                <div style={styles.imageContainer}>
                  <Image 
                    src={card.image}
                    alt={card.imageAlt}
                    width={500}
                    height={520}
                    style={styles.cardImage}
                  />
                  <div style={styles.imageOverlay}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.paginationContainer}>
            {cards.map((_, index) => (
              <div 
                key={index} 
                onClick={() => handleDotClick(index)}
                style={{
                  ...(index === activeCard ? styles.activeDot : styles.inactiveDot),
                  transition: 'width 0.3s ease-out, opacity 0.3s ease-out'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  frame: {
    position: 'relative',
    width: '100%',
    height: '100vh', // Full viewport height to avoid scrolling
    background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    minHeight: '750px', // Minimum height to ensure content fits
    overflowX: 'hidden' // Prevent horizontal scrolling
  },
  mainHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '98px',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: '0 0 40px 0', // Reduced margin to fit in viewport
    width: '100%',
  },
  accentText: {
    color: '#0D98BA',
  },
  carouselContainer: {
    width: '90%',
    maxWidth: '1302px',
    position: 'relative',
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: '520px',
  },
  container: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '520px',
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 25.96%, rgba(4, 9, 29, 0.719008) 43.56%, #04091D 72.04%)',
    border: '1px solid #7D818D',
    borderRadius: '10px',
    overflow: 'hidden',
    justifyContent: 'space-between' // Space between text and image
  },
  textContainer: {
    position: 'relative',
    width: '50%',
    padding: '60px 0 0 75px',
    zIndex: 2 // Ensure text is above any overlays
  },
  imageContainer: {
    position: 'relative',
    width: '50%',
    height: '100%',
    overflow: 'hidden'
  },
  cardImage: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    transition: 'transform 0.5s ease-out'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #04091D 0%, rgba(4, 9, 29, 0.5) 50%, rgba(4, 9, 29, 0.1) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
    zIndex: 1
  },
  h2: {
    position: 'absolute',
    fontFamily: 'Poppins, sans-serif',
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
    fontFamily: 'Poppins, sans-serif',
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
    width: '90%', // Slightly reduced width to fit better
    fontFamily: 'Lato, sans-serif',
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
    transition: 'background-color 0.3s ease',
    '&:hover': {
      background: '#0A7B95',
    }
  },
  buttonText: {
    fontFamily: 'Lato, sans-serif',
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
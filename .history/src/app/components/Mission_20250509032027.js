'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
  
  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean Digital",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals.",
      image: "/api/placeholder/400/320",
      imageAlt: "Digital solutions illustration"
    },
    {
      title: "Vision",
      heading: "Creating Digital Excellence",
      description: "We envision a digital landscape where businesses thrive through thoughtful design and strategic development.",
      image: "/api/placeholder/400/320",
      imageAlt: "Digital excellence illustration"
    },
    {
      title: "Values",
      heading: "Building Lasting Relationships",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work.",
      image: "/api/placeholder/400/320",
      imageAlt: "Business relationships illustration"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Lato:wght@600&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={styles.frame}>
        <h2 style={styles.mainHeading}>What <span style={styles.accentText}>Drives</span> Us</h2>
        
        <div style={styles.carouselContainer}>
          <div style={styles.carousel} className="carousel">
            {cards.map((card, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.container,
                  display: index === activeCard ? 'flex' : 'none'
                }}
              >
                <div style={styles.textContainer}>
                  <h2 style={styles.h2}>{card.title}</h2>
                  <h3 style={styles.heading}>
                    {card.heading.split(' ').map((word, i, arr) => (
                      <React.Fragment key={i}>
                        {word}
                        {i < arr.length - 1 && ' '}
                        {i === arr.length - 1 && card.title === "Mission" && <span style={styles.solutions}> Solutions</span>}
                        {i === arr.length - 1 && card.title === "Vision" && <span style={styles.solutions}> Excellence</span>}
                        {i === arr.length - 1 && card.title === "Values" && <span style={styles.solutions}> Relationships</span>}
                      </React.Fragment>
                    ))}
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
                    width={400}
                    height={320}
                    style={styles.cardImage}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.paginationContainer}>
            {cards.map((_, index) => (
              <div 
                key={index} 
                onClick={() => handleDotClick(index)}
                style={index === activeCard ? styles.activeDot : styles.inactiveDot}
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
    height: '650px', // Fixed height to fit above the fold
    background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '50px', // Reduced font size
    lineHeight: '65px', // Reduced line height
    textAlign: 'center',
    color: '#FFFFFF',
    margin: '20px 0', // Reduced margin
    width: '100%',
  },
  accentText: {
    color: '#0D98BA',
  },
  carouselContainer: {
    width: '90%',
    maxWidth: '1200px',
    position: 'relative',
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: '400px', // Reduced height
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '400px', // Reduced height
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 25.96%, rgba(4, 9, 29, 0.719008) 43.56%, #04091D 72.04%)',
    border: '1px solid #7D818D',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textContainer: {
    position: 'relative',
    width: '60%',
    padding: '30px 0 0 40px', // Reduced padding
  },
  imageContainer: {
    position: 'relative',
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    objectFit: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '0 10px 10px 0',
  },
  h2: {
    position: 'absolute',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '100px', // Reduced font size
    lineHeight: '60px',
    letterSpacing: '-0.03em',
    color: 'rgba(13, 152, 186, 0.3)',
    top: '-50px',
    left: '-11px',
  },
  heading: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '30px', // Reduced font size
    lineHeight: '36px', // Reduced line height
    color: '#FFFFFF',
    marginBottom: '15px', // Reduced margin
    marginTop: '60px', // Reduced top margin
  },
  solutions: {
    color: '#0D98BA',
  },
  paragraph: {
    width: '90%',
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px', // Reduced font size
    lineHeight: '140%', // Reduced line height
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: '20px', // Reduced margin
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '13px',
    marginTop: '10px', // Reduced margin
  },
  button: {
    width: '150px',
    height: '40px', // Reduced height
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
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px', // Reduced font size
    lineHeight: '150%',
    color: 'white',
  },
  paginationContainer: {
    position: 'relative',
    display: 'flex',
    width: '100px',
    height: '10px',
    margin: '20px auto', // Reduced margin
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
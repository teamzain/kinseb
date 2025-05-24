'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean\nDigital",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
      backgroundImage: "/api/placeholder/1302/520" // Using placeholder image
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
                  display: index === activeCard ? 'block' : 'none',
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative'
                }}
              >
                {/* Overlay to ensure text readability */}
                <div style={styles.overlay}></div>
                
                <div style={styles.textContainer}>
                  <h2 style={styles.h2}>{card.title}</h2>
                  <h3 style={styles.heading}>
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
                  
                  <p style={styles.paragraph}>
                    {card.description}
                  </p>
                  
                  <div style={styles.buttonsContainer}>
                    <button style={styles.button}>
                      <span style={styles.buttonText}>Start a Project</span>
                    </button>
                  </div>
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
    minHeight: '828px',
    background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainHeading: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
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
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: '520px',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '520px',
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
    width: '572px',
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
    width: '533px',
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
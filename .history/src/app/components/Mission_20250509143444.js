'use client';
import React, { useState, useEffect, useCallback, memo } from 'react';
import Head from 'next/head';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Font configuration
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const lato = Lato({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

// Memoized card component for performance
const CarouselCard = memo(({ card, isActive, index }) => {
  if (!isActive) return null;
  
  return (
    <div 
      style={{
        ...styles.container,
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
                <span style={styles.solutions}>{
                  line.includes('Digital') && i === 0 ? ' Solutions' : 
                  line.includes('Excellence') ? ' Excellence' : 
                  ' Relationships'
                }</span>
              }
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
  );
});

CarouselCard.displayName = 'CarouselCard';

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
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
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  const handleDotClick = useCallback((index) => {
    setActiveCard(index);
  }, []);

  return (
    <>
      <Head>
        <title>Our Mission, Vision & Values | Digital Solutions Agency</title>
        <meta name="description" content="Discover what drives us - our mission to craft clean digital solutions, our vision for digital excellence, and our values focused on building lasting relationships." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="digital solutions, web design, digital agency, clean design" />
        <meta property="og:title" content="Our Mission, Vision & Values | Digital Solutions Agency" />
        <meta property="og:description" content="Discover what drives us - our mission to craft clean digital solutions, our vision for digital excellence, and our values focused on building lasting relationships." />
        <meta property="og:type" content="website" />
      </Head>
      
      <div className={`${poppins.variable} ${lato.variable}`} style={styles.frame}>
        <h2 style={styles.mainHeading}>What <span style={styles.accentText}>Drives</span> Us</h2>
        
        <div style={styles.carouselContainer}>
          <div style={styles.carousel} className="carousel">
            {cards.map((card, index) => (
              <CarouselCard 
                key={index}
                card={card}
                isActive={index === activeCard}
                index={index}
              />
            ))}
          </div>
          
          <div style={styles.paginationContainer}>
            {cards.map((_, index) => (
              <div 
                key={index} 
                onClick={() => handleDotClick(index)}
                style={index === activeCard ? styles.activeDot : styles.inactiveDot}
                role="button"
                aria-label={`Go to slide ${index + 1}`}
                tabIndex={0}
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
    fontFamily: 'var(--font-poppins)',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 'clamp(35px, 5vw, 65px)',
    lineHeight: '1.5',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 'clamp(30px, 5vw, 54px) 0',
    width: '100%',
    padding: '0 15px',
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
    height: 'clamp(400px, 60vw, 520px)',
  },
  container: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: 'clamp(400px, 60vw, 520px)',
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
    width: 'clamp(300px, 90%, 535px)',
    margin: 'clamp(80px, 15vw, 160px) 0 0 clamp(20px, 5vw, 75px)',
    zIndex: 2,
    '@media (max-width: 768px)': {
      margin: '60px 0 0 20px',
    },
  },
  h2: {
    position: 'absolute',
    width: 'clamp(300px, 80vw, 782px)',
    fontFamily: 'var(--font-poppins)',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 'clamp(60px, 12vw, 150px)',
    lineHeight: 'clamp(40px, 8vw, 64px)',
    letterSpacing: '-0.03em',
    color: 'rgba(13, 152, 186, 0.3)',
    top: '-clamp(30px, 5vw, 64px)',
    left: '-clamp(5px, 1vw, 11px)',
  },
  heading: {
    width: 'clamp(300px, 100%, 572px)',
    fontFamily: 'var(--font-poppins)',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 'clamp(24px, 4vw, 35px)',
    lineHeight: 'clamp(30px, 5vw, 45px)',
    color: '#FFFFFF',
    marginBottom: 'clamp(15px, 3vw, 30px)',
    marginTop: 'clamp(40px, 8vw, 84px)',
  },
  solutions: {
    color: '#0D98BA',
  },
  paragraph: {
    width: 'clamp(280px, 100%, 533px)',
    fontFamily: 'var(--font-lato)',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 'clamp(16px, 2vw, 18px)',
    lineHeight: '150%',
    letterSpacing: '-0.006em',
    color: '#E6E6E6',
    marginBottom: 'clamp(20px, 4vw, 40px)',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '13px',
    marginTop: 'clamp(10px, 2vw, 20px)',
  },
  button: {
    width: 'clamp(140px, 15vw, 157px)',
    height: 'clamp(40px, 5vw, 45px)',
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
    fontFamily: 'var(--font-lato)',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 'clamp(14px, 1.8vw, 16px)',
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
    width: 'clamp(30px, 5vw, 50px)',
    height: '10px',
    background: '#0D98BA',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  inactiveDot: {
    width: 'clamp(10px, 2vw, 20px)',
    height: '10px',
    background: '#0D98BA',
    opacity: 0.4,
    borderRadius: '10px',
    cursor: 'pointer',
  }
};

export default FigmaDesignComponent;
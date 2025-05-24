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
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  
  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean\nDigital",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
      backgroundImage: "/images/mission.png", // Using placeholder image
      accent: "Solutions"
    },
    {
      title: "Vision",
      heading: "Creating Digital\nExcellence",
      description: "We envision a digital landscape where businesses thrive through thoughtful design, strategic development, and purposeful innovation — setting new standards for what the web can achieve.",
      backgroundImage: "/api/placeholder/1302/520", // Using placeholder image
      accent: "Excellence"
    },
    {
      title: "Values",
      heading: "Building Lasting",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      backgroundImage: "/api/placeholder/1302/520", // Using placeholder image
      accent: "Relationships"
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    
    // Auto-carousel
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds

    // Set up intersection observer for scroll animations
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          // When the section becomes visible in the viewport
          if (entries[0].isIntersecting) {
            setIsVisible(true);
            // Only set hasAnimated to true after first animation is complete
            if (!hasAnimated) {
              setTimeout(() => {
                setHasAnimated(true);
              }, 1500); // Wait for main animations to complete
            }
          } else if (!hasAnimated) {
            // Only reset visibility when scrolled out if hasn't fully animated yet
            setIsVisible(false);
          }
        },
        // Adjusted to trigger earlier when scrolling down
        { threshold: 0.15, rootMargin: '-50px 0px -10% 0px' }
      );
      
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      
      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsVisible(true);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [cards.length, hasAnimated]);

  const handleDotClick = (index) => {
    setActiveCard(index);
  };

  return (
    <div 
      ref={sectionRef} 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '40px 0 60px',
        transition: 'all 0.3s ease-out',
      }}
      className="scroll-reveal-section"
    >
      {/* Main heading with animation */}
      <h2 
        style={{
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: isMounted ? 'clamp(22px, 6vw, 65px)' : '65px',
          lineHeight: isMounted ? 'clamp(30px, 8vw, 98px)' : '98px',
          textAlign: 'center',
          color: '#FFFFFF',
          margin: isMounted ? 'clamp(15px, 4vh, 54px) 0' : '54px 0',
          width: '100%',
          padding: '0 15px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }} 
        className={poppins.className}
      >
        What <span style={{color: '#0D98BA', textShadow: '0 2px 8px rgba(13, 152, 186, 0.3)'}}>Drives</span> Us
      </h2>
      
      {/* Carousel container with animation */}
      <div 
        style={{
          width: isMounted ? 'clamp(95%, 90vw, 1300px)' : '90%',
          maxWidth: '1300px',
          position: 'relative',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '0',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}
      >
        {/* Carousel */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          flex: '1 1 auto',
        }}>
          {cards.map((card, index) => (
            <div 
              key={index}
              style={{
                boxSizing: 'border-box',
                display: index === activeCard ? 'block' : 'none',
                position: 'relative',
                width: '100%',
                height: 'auto',
                minHeight: isMounted ? 'clamp(250px, 50vh, 500px)' : '400px',
                aspectRatio: isMounted ? 'calc(clamp(1.2, 1.2 + 1vw, 2.2) / 1)' : '1.8 / 1',
                border: '1px solid rgba(125, 129, 141, 0.5)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease-out',
                opacity: 1,
                transform: 'translateY(0)',
              }}
              className={`card-item ${index === activeCard ? 'active' : ''}`}
            >
              {/* Background image */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: isMounted && window.innerWidth < 768 ? 'center right' : 'center center',
                  backgroundRepeat: 'no-repeat',
                  height: '100%',
                  width: '100%',
                  transition: 'all 0.5s ease-in-out',
                }}
                className="card-background"
              ></div>
              
              {/* Overlay gradient */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 20%, rgba(4, 9, 29, 0.75) 45%, #04091D 75%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
                  zIndex: 1,
                }}
                className="card-overlay"
              ></div>
              
              {/* Text content */}
              <div 
                style={{
                  position: 'relative',
                  width: isMounted ? 'clamp(88%, calc(45% + 5vw), 535px)' : '535px',
                  maxWidth: '580px',
                  margin: isMounted ? `clamp(30px, 15vh, 180px) 0 0 clamp(12px, 4vw, 75px)` : '180px 0 0 75px',
                  padding: isMounted && window.innerWidth < 768 ? '0 15px' : '0',
                  zIndex: 2,
                }}
              >
                {/* Watermark title */}
                <h2 
                  style={{
                    position: 'absolute',
                    width: isMounted ? 'clamp(180px, 50vw, 782px)' : '782px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: isMounted ? 'clamp(36px, 10vw, 130px)' : '150px',
                    lineHeight: isMounted ? 'clamp(20px, 5vw, 64px)' : '64px',
                    letterSpacing: '-0.03em',
                    color: 'rgba(13, 151, 186, 0.82)',
                    top: isMounted ? 'clamp(-20px, -5vw, -64px)' : '-64px',
                    left: isMounted && window.innerWidth < 768 ? '-5px' : '-11px',
                    opacity: isMounted && window.innerWidth < 768 ? 0.45 : 0.5,
                    transition: 'all 0.3s ease-out',
                    textShadow: '0 2px 10px rgba(13, 151, 186, 0.2)',
                  }}
                  className={`${poppins.className} card-watermark`}
                >
                  {card.title}
                </h2>
                
                {/* Card heading */}
                <h3 
                  style={{
                    width: isMounted ? 'clamp(90%, calc(70% + 5vw), 572px)' : '572px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: isMounted ? 'clamp(16px, 3.5vw, 35px)' : '35px',
                    lineHeight: isMounted ? 'clamp(22px, 4.5vw, 45px)' : '45px',
                    color: '#FFFFFF',
                    marginBottom: isMounted ? 'clamp(14px, 2vw, 30px)' : '30px',
                    marginTop: isMounted ? 'clamp(10px, 7vh, 84px)' : '84px',
                    transition: 'all 0.3s ease-out',
                    textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s`,
                  }}
                  className={`${poppins.className} card-heading`}
                >
                  {card.heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.heading.split('\n').length - 1 && <br />}
                      {i === card.heading.split('\n').length - 1 && 
                        <span 
                          style={{
                            color: '#0D98BA',
                            textShadow: '0 2px 8px rgba(13, 152, 186, 0.3)',
                          }}
                          className="accent-text"
                        >
                          {' ' + card.accent}
                        </span>
                      }
                    </React.Fragment>
                  ))}
                </h3>
                
                {/* Description */}
                <p 
                  style={{
                    width: isMounted ? 'clamp(90%, calc(60% + 10vw), 533px)' : '533px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: isMounted ? 'clamp(11px, 1.8vw, 18px)' : '18px',
                    lineHeight: isMounted && window.innerWidth < 768 ? '145%' : '150%',
                    letterSpacing: '-0.006em',
                    color: '#E6E6E6',
                    marginBottom: isMounted ? 'clamp(20px, 3vh, 40px)' : '40px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s`,
                  }}
                  className={`${lato.className} card-description`}
                >
                  {card.description}
                </p>
                
                {/* Button container */}
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: '13px',
                    marginTop: isMounted ? 'clamp(10px, 2vh, 20px)' : '20px',
                    marginBottom: isMounted ? 'clamp(15px, 2vh, 20px)' : '20px',
                    justifyContent: 'flex-start',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s`,
                  }}
                  className="button-container"
                >
                  <button 
                    style={{
                      width: isMounted ? 'clamp(120px, calc(100px + 4vw), 157px)' : '157px',
                      height: isMounted ? 'clamp(36px, calc(30px + 1.5vh), 45px)' : '45px',
                      background: '#0D98BA',
                      border: '2px solid #0D98BA',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.3s ease-out',
                      boxShadow: '0 4px 12px rgba(13, 152, 186, 0.15)',
                    }}
                    className="cta-button"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(13, 152, 186, 0.4)';
                      e.currentTarget.style.background = '#0EAAD4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 152, 186, 0.15)';
                      e.currentTarget.style.background = '#0D98BA';
                    }}
                  >
                    <span 
                      style={{
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: isMounted ? 'clamp(12px, calc(10px + 0.5vw), 16px)' : '16px',
                        lineHeight: '150%',
                        color: 'white',
                      }}
                      className={lato.className}
                    >
                      Start a Project
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div 
          style={{
            position: 'absolute',
            display: 'flex',
            margin: '0',
            padding: '0',
            gap: '6px',
            justifyContent: 'center',
            bottom: isMounted ? 'clamp(10px, 2vh, 25px)' : '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease-out 0.5s',
          }}
          className="pagination"
        >
          {cards.map((_, index) => (
            <div 
              key={index} 
              onClick={() => handleDotClick(index)}
              style={{
                width: index === activeCard 
                  ? (isMounted ? 'clamp(25px, 3vw, 50px)' : '50px')
                  : (isMounted ? 'clamp(12px, 1.5vw, 20px)' : '20px'),
                height: isMounted ? 'clamp(8px, 0.8vh, 10px)' : '10px',
                background: '#0D98BA',
                opacity: index === activeCard ? 1 : 0.4,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease-out',
                boxShadow: index === activeCard ? '0 2px 8px rgba(13, 152, 186, 0.3)' : 'none',
              }}
              className={`pagination-dot ${index === activeCard ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandDot {
          from { width: 20px; }
          to { width: 50px; }
        }
        
        .pagination-dot {
          transition: all 0.3s ease-out;
        }
        
        .pagination-dot:hover {
          transform: scale(1.1);
        }
        
        .pagination-dot.active {
          animation: expandDot 0.5s ease-out forwards;
        }
        
        /* Touch device optimizations */
        @media (hover: none) {
          .cta-button:active {
            background: #0EAAD4 !important;
            transform: translateY(-3px) !important;
            box-shadow: 0 5px 15px rgba(13, 152, 186, 0.4) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FigmaDesignComponent;
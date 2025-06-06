'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Poppins, Lato } from 'next/font/google';


import { useRouter } from 'next/navigation';
import Link from 'next/link';


const router = useRouter();
  
const handleNavigation = useCallback((path) => {
  router.push(path);
}, [router]);

// SEO metadata - Add this constant near the top of your component or outside it
const SEO_DATA = {
  title: "Our Mission, Vision & Values | Professional Digital Solutions",
  description: "Discover what drives us: our mission to craft clean digital solutions, our vision for digital excellence, and our values centered on building lasting relationships.",
  keywords: "mission, vision, values, digital solutions, web development",
  canonicalUrl: "/about-us",
};
// Font optimization with next/font/google
const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const FigmaDesignComponent = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef(null);

  const cards = [
    {
      title: "Mission",
      heading: "Crafting Clean",
      accent: "Digital Solutions",
      description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
      backgroundImage: "/images/mission.png", // Using placeholder image
    },
    {
      title: "Vision",
      heading: "Creating Digital",
      accent: "Excellence",
      description: "We envision a digital landscape where businesses thrive through thoughtful design, strategic development, and purposeful innovation — setting new standards for what the web can achieve.",
      backgroundImage: "/api/placeholder/1302/520", // Using placeholder image
    },
    {
      title: "Values",
      heading: "Building Lasting",
      accent: "Relationships",
      description: "We believe in transparent communication, honest partnerships, and delivering exceptional value through our work — ensuring every project contributes to your long-term success.",
      backgroundImage: "/api/placeholder/1302/520", // Using placeholder image
    }
  ];

  // Handle window resize events for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Initialize window width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    // Set mounted state
    setIsMounted(true);
    setIsVisible(true);
    
    // Auto-carousel
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000); // Change cards every 5 seconds
    // Set hasAnimated to true after initial animations
    setTimeout(() => {
      setHasAnimated(true);
    }, 1500);
    
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

  // Swipe handling for mobile devices
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - go to next card
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }
    
    if (touchEnd - touchStart > 75) {
      // Swipe right - go to previous card
      setActiveCard((prevCard) => (prevCard === 0 ? cards.length - 1 : prevCard - 1));
    }
  };

  // Responsive styles based on device size
  const isSmallMobile = windowWidth > 0 && windowWidth <= 480;
  const isMobile = windowWidth > 0 && windowWidth <= 767;
  const isTablet = windowWidth >= 768 && windowWidth <= 1023;
  const isDesktop = windowWidth >= 1024;

  // Dynamic height calculation - INCREASED heights for all screen sizes
  const getDynamicHeight = () => {
    if (isSmallMobile) return '620px'; // Increased from 580px
    if (isMobile) return '660px';      // Increased from 620px
    if (isTablet) return '700px';      // Increased from 650px
    return '740px';                    // Increased from 680px
  };

  const getCardHeight = () => {
    if (isSmallMobile) return '380px'; // Increased from 340px
    if (isMobile) return '400px';      // Increased from 360px
    if (isTablet) return '420px';      // Increased from 380px
    return '450px';                    // Increased from 400px
  };

  return (
    <div 
      ref={sectionRef} 
      style={{
        position: 'relative',
        width: '100%',
        height: getDynamicHeight(),
        maxHeight: getDynamicHeight(),
        background: 'linear-gradient(360deg, #04091D -16.43%, #0D98BA 261.84%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isMobile ? '15px 0 25px' : '20px 0 30px',
        transition: 'all 0.3s ease-out',
      }}
      className="scroll-reveal-section"
    >
      {/* Main heading with responsive sizing */}
      <h2 
        style={{
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: isMobile ? '28px' : isTablet ? '36px' : '50px',
          lineHeight: isMobile ? '36px' : isTablet ? '48px' : '74px',
          textAlign: 'center',
          color: '#FFFFFF',
          margin: isMobile ? '10px 0' : isTablet ? '20px 0' : '30px 0',
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
      
      {/* Carousel container with responsive sizing */}
      <div 
        style={{
          width: isMobile ? '92%' : isTablet ? '94%' : '90%',
          maxWidth: '1300px',
          position: 'relative',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: isMobile ? '5px' : '10px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}
      >
        {/* Carousel with touch events for mobile */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            flex: '1 1 auto',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, index) => (
            <div 
              key={index}
              style={{
                boxSizing: 'border-box',
                display: index === activeCard ? 'block' : 'none',
                position: 'relative',
                width: '100%',
                height: getCardHeight(),
                maxHeight: getCardHeight(),
                border: '1px solid rgba(125, 129, 141, 0.5)',
                borderRadius: isMobile ? '8px' : '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease-out',
                opacity: 1,
                transform: 'translateY(0)',
              }}
              className={`card-item ${index === activeCard ? 'active' : ''}`}
            >
              {/* Background image with responsive positioning */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: isMobile ? 'right center' : isTablet ? 'center right' : 'center center',
                  backgroundRepeat: 'no-repeat',
                  height: '100%',
                  width: '100%',
                  transition: 'all 0.5s ease-in-out',
                }}
                className="card-background"
              ></div>
              
              {/* Overlay gradient with adjusted opacity for smaller screens */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: isMobile 
                    ? 'linear-gradient(270deg, rgba(4, 9, 29, 0) 0%, rgba(4, 9, 29, 0.85) 40%, #04091D 70%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)' 
                    : 'linear-gradient(270deg, rgba(4, 9, 29, 0) 25.96%, rgba(4, 9, 29, 0.719008) 43.56%, #04091D 72.04%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
                  zIndex: 1,
                }}
                className="card-overlay"
              ></div>
              
            <div 
  style={{
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // This centers the content vertically
    height: '100%', // Take full height to enable vertical centering
    width: isSmallMobile ? '90%' : isMobile ? '88%' : isTablet ? '70%' : '535px',
    maxWidth: '580px',
    left: isSmallMobile ? '15px' : isMobile ? '20px' : isTablet ? '40px' : '75px',
    padding: isMobile ? '0 10px' : '0',
    zIndex: 2,
    alignItems: 'flex-start', // Add this to ensure children align to the left
  }}
  className="text-content-wrapper"
>
  {/* Card content container */}
  <div className="card-content" style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    width: '100%', // Ensure full width
    alignItems: 'flex-start', // Add this to force left alignment of all children
  }}>
                  {/* NEW - Large watermark title (Mission/Vision/Values) */}
                  <h2 
                    style={{
                      position: 'absolute',
                      fontFamily: "'Poppins'",
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: isSmallMobile ? '36px' : isMobile ? '48px' : isTablet ? '80px' : '130px',
                      lineHeight: isSmallMobile ? '32px' : isMobile ? '38px' : isTablet ? '48px' : '64px',
                      letterSpacing: '-0.03em',
                      color: 'rgba(13, 151, 186, 0.82)',
                      top: isSmallMobile ? '24px' : isMobile ? '34px' : isTablet ? '30px' : '30px',
                      left: isSmallMobile ? '-2px' : isMobile ? '-1px' : isTablet ? '-4px' : '-7px',
                      opacity: isMobile ? 0.45 : 0.5,
                      transition: 'all 0.3s ease-out',
                      textShadow: '0 2px 10px rgba(13, 151, 186, 0.2)',
                      zIndex: 1,
                    }}
                    className={`${poppins.className} card-watermark`}
                  >
                    {card.title}
                  </h2>

                  {/* Card heading with two-line styling and color change */}
                  <div 
                    style={{
                      position: 'relative',
                      width: isSmallMobile ? '95%' : isMobile ? '90%' : isTablet ? '85%' : '572px',
                      marginBottom: isSmallMobile ? '10px' : isMobile ? '14px' : isTablet ? '16px' : '20px',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
                      zIndex: 2,
                      marginTop: isSmallMobile ? '45px' : isMobile ? '60px' : isTablet ? '70px' : '84px',
                    }}
                  >
                    <h4 
                      style={{
                        fontFamily: "'Poppins'",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: isSmallMobile ? '16px' : isMobile ? '22px' : isTablet ? '26px' : '35px',
                        lineHeight: isSmallMobile ? '22px' : isMobile ? '28px' : isTablet ? '34px' : '45px',
                        color: '#FFFFFF',
                        margin: '0',
                        padding: '0',
                        transition: 'all 0.3s ease-out',
                        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                      }}
                      className={`${poppins.className} card-heading`}
                    >
                      {card.heading}
                    </h4>
                    <h4 
                      style={{
                        fontFamily: "'Poppins'",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: isSmallMobile ? '16px' : isMobile ? '22px' : isTablet ? '26px' : '35px',
                        lineHeight: isSmallMobile ? '22px' : isMobile ? '28px' : isTablet ? '34px' : '45px',
                        color: '#0D98BA',
                        margin: '0',
                        padding: '0',
                        transition: 'all 0.3s ease-out',
                        textShadow: '0 2px 8px rgba(13, 152, 186, 0.3)',
                      }}
                      className={`${poppins.className} card-heading accent-text`}
                    >
                      {card.accent}
                    </h4>
                  </div>
                  
                  {/* Description with responsive sizing */}
                  <p 
                    style={{
                      position: 'relative',
                      width: isSmallMobile ? '95%' : isMobile ? '90%' : isTablet ? '85%' : '533px',
                      fontFamily: "'Lato'",
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : isTablet ? '14px' : '18px',
                      lineHeight: '150%',
                      letterSpacing: '-0.006em',
                      color: '#E6E6E6',
                      marginBottom: isSmallMobile ? '15px' : isMobile ? '20px' : isTablet ? '25px' : '30px',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
                      zIndex: 2,
                    }}
                    className={`${lato.className} card-description`}
                  >
                    {card.description}
                  </p>
      <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: isMobile ? '10px' : '13px',
        marginTop: isSmallMobile ? '8px' : isMobile ? '10px' : isTablet ? '12px' : '15px',
        marginBottom: isSmallMobile ? '0' : isMobile ? '0' : isTablet ? '0' : '0',
        justifyContent: 'flex-start',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
        zIndex: 2,
        position: 'relative',
        width: 'auto',
        marginLeft: '0', // Force left alignment
        paddingLeft: '0', // Force left alignment
        alignSelf: 'flex-start', // Force this container to the left of its parent
      }}
      className="button-container"
    >
      <button 
        style={{
          width: isSmallMobile ? '120px' : isMobile ? '130px' : isTablet ? '145px' : '157px',
          height: isSmallMobile ? '36px' : isMobile ? '38px' : isTablet ? '42px' : '45px',
          background: '#0D98BA',
          border: '2px solid #0D98BA',
          borderRadius: isMobile ? '5px' : '6px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease-out',
          boxShadow: '0 4px 12px rgba(13, 152, 186, 0.15)',
          left: '0', // Force to the left
          marginLeft: '0', // Force left margin
            textDecoration: 'none',
        }}
        className="cta-button"
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(13, 152, 186, 0.4)';
            e.currentTarget.style.background = '#0EAAD4';
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 152, 186, 0.15)';
            e.currentTarget.style.background = '#0D98BA';
          }
        }}
      >
        <span 
          style={{
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: isSmallMobile ? '12px' : isMobile ? '13px' : isTablet ? '14px' : '16px',
            lineHeight: '150%',
            color: 'white',
          }}
          className={lato.className}
        >
          Start A Project
        </span>
      </button>
    </div>
  </div>
</div>

            </div>
          ))}
        </div>
        
        {/* Pagination dots with responsive sizing */}
        <div 
          style={{
            position: 'absolute',
            display: 'flex',
            margin: '0',
            padding: '0',
            gap: isSmallMobile ? '4px' : isMobile ? '5px' : '6px',
            justifyContent: 'center',
            bottom: isSmallMobile ? '5px' : isMobile ? '10px' : isTablet ? '15px' : '20px',
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
                  ? (isSmallMobile ? '25px' : isMobile ? '30px' : isTablet ? '35px' : '40px')
                  : (isSmallMobile ? '10px' : isMobile ? '12px' : isTablet ? '15px' : '18px'),
                height: isSmallMobile ? '6px' : isMobile ? '7px' : isTablet ? '9px' : '10px',
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
          from { width: 18px; }
          to { width: 40px; }
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
        
        /* Text content positioning and card content spacing */
        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        
        /* Touch device optimizations */
        @media (hover: none) {
          .cta-button:active {
            background: #0EAAD4 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(13, 152, 186, 0.4) !important;
          }
        }
        
        /* Mobile-specific styles */
        @media (max-width: 480px) {
          .card-watermark {
            font-size: 36px !important;
            line-height: 32px !important;
          }
          
          .card-heading {
            font-size: 16px !important;
            line-height: 22px !important;
          }
          
          .card-description {
            font-size: 11px !important;
          }
          
          .pagination-dot.active {
            animation: none !important;
            width: 25px !important;
          }
        }
        
        /* Small tablet styles */
        @media (min-width: 481px) and (max-width: 767px) {
          .card-watermark {
            font-size: 48px !important;
            line-height: 38px !important;
          }
          
          .card-heading {
            font-size: 22px !important;
            line-height: 28px !important;
          }
          
          .pagination-dot.active {
            animation: none !important;
            width: 30px !important;
          }
        }
        
        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .card-watermark {
            font-size: 80px !important;
            line-height: 48px !important;
          }
          
          .card-heading {
            font-size: 26px !important;
            line-height: 34px !important;
          }
          
          .pagination-dot.active {
            animation: none !important;
            width: 35px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FigmaDesignComponent;
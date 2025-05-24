'use client';
import React, { useEffect, useRef, useState } from 'react';

// Define types for our data and refs
interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface CardPosition {
  index: number;
  position: number;
  xPosition: number;
  scale: number;
  zIndex: number;
  opacity: number;
  isVisible: boolean;
  isActive: boolean;
}

const TestimonialSection = () => {
 const testimonials: Testimonial[] = [

  {
    name: "Imtiaz Gul",
    role: "CEO, TechVision365",
    text: "Developed customized modules and dynamic websites tailored for our business needs with exceptional quality and efficiency."
  },
  {
    name: "Kashaf Noor",
    role: "Software Developer",
    text: "Delivered a complete POS system that streamlined our operations and improved our customer service significantly."
  },
  {
    name: "Ali Raza",
    role: "CEO, Captive Power Solutions",
    text: "Created a robust and professional website that perfectly showcases our engineering services. Highly recommended."
  },
  {
    name: "Haytham Aliejil",
    role: "Founder, Ejil",
    text: "Designed and developed a modern website for Ejil that reflects our brand and meets our user expectations excellently."
  },
  {
    name: "Natalie Brooks",
    role: "CTO, Finverse",
    text: "Helped us launch a secure and scalable platform that meets both our technical and business goals seamlessly."
  },
  {
    name: "Zubair Khan",
    role: "Creative Director",
    text: "The attention to detail in design and functionality exceeded our expectations. A true partner in our digital transformation."
  }
];


  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  // Set up responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle auto scrolling
  useEffect(() => {
    if (isAutoScrolling && !isAnimating && !userHasInteracted && !isUserScrolling) {
      autoScrollTimerRef.current = setInterval(() => {
        handleNext();
      }, 2000);
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, isAnimating, userHasInteracted, isUserScrolling]);

  // Set up wheel and touch event listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isAnimating) return;
      
      // Disable auto-scrolling permanently after first manual interaction
      setUserHasInteracted(true);
      setIsUserScrolling(true);
      
      // Clear any existing scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Determine scroll direction
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
      
      // Reset scrolling state after a delay
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent default scrolling
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      
      const touch = e.changedTouches[0];
      touchEndRef.current = { x: touch.clientX, y: touch.clientY };
      
      const deltaX = touchStartRef.current.x - touchEndRef.current.x;
      const deltaY = touchStartRef.current.y - touchEndRef.current.y;
      
      // Only handle horizontal swipes (ignore vertical scrolling)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (isAnimating) return;
        
        // Disable auto-scrolling permanently after first manual interaction
        setUserHasInteracted(true);
        setIsUserScrolling(true);
        
        if (deltaX > 0) {
          handleNext(); // Swipe left = next
        } else {
          handlePrev(); // Swipe right = previous
        }
        
        // Reset scrolling state after a delay
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false);
        }, 1000);
      }
      
      touchStartRef.current = null;
      touchEndRef.current = null;
    };

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('wheel', handleWheel, { passive: false });
      sliderElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      sliderElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      sliderElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel);
        sliderElement.removeEventListener('touchstart', handleTouchStart);
        sliderElement.removeEventListener('touchmove', handleTouchMove);
        sliderElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isAnimating]);

  // Create the card arrangement
  const getCardPositions = (): CardPosition[] => {
    const positions: CardPosition[] = [];
    const totalCards = testimonials.length;
    const visibleCards = isMobile ? 1 : 5;
    
    for (let i = 0; i < totalCards; i++) {
      let position = i - activeIndex;
      
      if (position < 0) {
        position += totalCards;
      }
      if (position >= totalCards) {
        position -= totalCards;
      }
      
      const isVisible = position < visibleCards;
      
      let xPosition = 0;
      
      if (isMobile) {
        if (position === 0) {
          xPosition = 0;
        } else if (position === 1) {
          xPosition = 100;
        } else if (position === totalCards - 1) {
          xPosition = -100;
        } else {
          xPosition = position > 0 ? 200 : -200;
        }
      } else {
        if (position === 0) {
          xPosition = -70;
        } else if (position === 1) {
          xPosition = -35;
        } else if (position === 2) {
          xPosition = 0;
        } else if (position === 3) {
          xPosition = 35;
        } else if (position === 4) {
          xPosition = 70;
        }
      }
      
      let scale = 1;
      let zIndex = 10 - position;
      let opacity = 1;
      
      if ((isMobile && position === 0) || (!isMobile && position === 2)) {
        scale = 1.05;
        zIndex = 15;
      } else if (position >= visibleCards) {
        opacity = 0;
        zIndex = 0;
      }
      
      positions.push({
        index: i,
        position,
        xPosition,
        scale,
        zIndex,
        opacity,
        isVisible,
        isActive: isMobile ? position === 0 : position === 2
      });
    }
    
    return positions;
  };
  
  const handleNext = (): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const handlePrev = (): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  const handleMouseEnter = (): void => {
    setIsAutoScrolling(false);
  };
  
  const handleMouseLeave = (): void => {
    if (!userHasInteracted) {
      setIsAutoScrolling(true);
    }
  };
  
  const handleIndicatorClick = (index: number): void => {
    if (isAnimating) return;
    
    // Disable auto-scrolling permanently after first manual interaction
    setUserHasInteracted(true);
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const cardPositions = getCardPositions();

  // Inline CSS styles
  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#031B30',
    padding: '80px 0',
    fontFamily: "'Poppins', sans-serif",
    color: '#F6F6F7',
    overflowX: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    position: 'relative',
    padding: '0 40px',
    boxSizing: 'border-box'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '80px'
  };

  const h2Style: React.CSSProperties = {
    fontSize: isMobile ? (window.innerWidth <= 480 ? '28px' : '36px') : '44px',
    fontWeight: '600',
    margin: '0 0 20px 0',
    fontFamily: "'Poppins', sans-serif"
  };

  const highlightStyle: React.CSSProperties = {
    color: '#0D98BA'
  };

  const pStyle: React.CSSProperties = {
    fontSize: isMobile && window.innerWidth <= 480 ? '14px' : '16px',
    lineHeight: '24px',
    maxWidth: '600px',
    margin: '0 auto',
    color: '#8F9BB7',
    fontFamily: "'Poppins', sans-serif"
  };

  const sliderWrapperStyle: React.CSSProperties = {
    position: 'relative',
    height: isMobile ? '350px' : '400px',
    marginBottom: '50px',
    overflow: isMobile ? 'hidden' : 'visible',
    width: '100%',
    cursor: 'grab',
    touchAction: 'pan-y pinch-zoom'
  };

  const cardsStyle: React.CSSProperties = {
    position: 'relative',
    height: '100%',
    width: '100%',
    perspective: '1000px'
  };

  const dotsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '-30px'
  };

  const dotStyle: React.CSSProperties = {
    width: '10px',
    height: '4px',
    background: '#8F9BB7',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const activeDotStyle: React.CSSProperties = {
    ...dotStyle,
    width: '30px',
    background: '#0D98BA'
  };

  return (
    <section style={sectionStyle} aria-label="Client testimonials">
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={h2Style}>
            What Our <span style={highlightStyle}>Clients</span> Say
          </h2>
          <p style={pStyle}>
            Rmet facilisi arcu odio urna aenean erat. Pellentesque in vitae lobortis orci tincidunt facilisi. Pulvinar lacus ultricies turpis urna sapien.
          </p>
        </div>
        
        <div 
          ref={sliderRef}
          style={sliderWrapperStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={cardsStyle}>
            {cardPositions.map((card) => {
              const wrapperStyle: React.CSSProperties = {
                position: 'absolute',
                width: isMobile ? (window.innerWidth <= 480 ? '280px' : '300px') : '343px',
                height: '280px',
                top: '50%',
                marginTop: card.isActive ? '-160px' : '-140px',
                marginLeft: isMobile ? (window.innerWidth <= 480 ? '-140px' : '-150px') : '-171.5px',
                transformOrigin: 'center',
                transition: 'all 0.6s ease',
                opacity: card.opacity,
                pointerEvents: card.isVisible ? 'auto' : 'none',
                left: `calc(50% + ${card.xPosition}%)`,
                transform: `scale(${card.scale})`,
                zIndex: card.zIndex
              };

              const cardStyle: React.CSSProperties = {
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: isMobile && window.innerWidth <= 480 ? '20px' : '25px',
                gap: '25px',
                position: 'absolute',
                width: isMobile ? (window.innerWidth <= 480 ? '280px' : '300px') : '343px',
                height: '235px',
                top: 0,
                background: card.isActive 
                  ? 'linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, rgba(47, 60, 54, 0.2) 100%), #15141D'
                  : '#15141D',
                border: '1px solid #262626',
                borderRadius: '10px',
                zIndex: 2,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: card.isActive ? '0 8px 16px rgba(0, 0, 0, 0.2)' : 'none'
              };

              const personContainerStyle: React.CSSProperties = {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '10px',
                width: isMobile ? (window.innerWidth <= 480 ? '240px' : '250px') : '293px',
                height: '40px'
              };

              const avatarStyle: React.CSSProperties = {
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#333',
                overflow: 'hidden'
              };

              const avatarContentStyle: React.CSSProperties = {
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: "'Poppins', sans-serif"
              };

              const personInfoStyle: React.CSSProperties = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '10px',
                width: '160px',
                height: '38px'
              };

              const personNameStyle: React.CSSProperties = {
                width: '160px',
                height: '16px',
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '16px',
                color: '#F6F6F7'
              };

              const personRoleStyle: React.CSSProperties = {
                width: '160px',
                height: '12px',
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '12px',
                color: '#8F9BB7'
              };

              const testimonialTextStyle: React.CSSProperties = {
                width: isMobile ? (window.innerWidth <= 480 ? '240px' : '250px') : '293px',
                height: '96px',
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '24px',
                color: '#F6F6F7',
                overflow: 'hidden'
              };

              const quotePlaceholderStyle: React.CSSProperties = {
                position: 'absolute',
                width: '57px',
                height: '41px',
                right: '25px',
                top: '25px',
                borderRadius: '4px',
                overflow: 'hidden'
              };

              const quoteImageStyle: React.CSSProperties = {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              };

              const blueGradientStyle: React.CSSProperties = {
                boxSizing: 'border-box',
                position: 'absolute',
                width: isMobile ? (window.innerWidth <= 480 ? '320px' : '350px') : '392px',
                height: '110px',
                left: isMobile && window.innerWidth <= 480 ? '-20px' : '-25px',
                top: '150px',
                background: 'linear-gradient(90deg, #04091D 0%, #0D98BA 100%)',
                border: '1px solid #04091D',
                borderRadius: '10px',
                zIndex: 1
              };

              const blurEllipseBaseStyle: React.CSSProperties = {
                position: 'absolute',
                width: '119px',
                height: '119px',
                background: 'linear-gradient(90deg, #04091D 0%, #0D98BA 100%)',
                border: '1px solid #04091D',
                filter: 'blur(75px)',
                zIndex: 0
              };

              return (
                <div key={card.index} style={wrapperStyle}>
                  <div style={cardStyle}>
                    <div style={personContainerStyle}>
                      <div style={avatarStyle}>
                        <div style={avatarContentStyle}>
                          {testimonials[card.index].name.charAt(0)}
                        </div>
                      </div>
                      
                      <div style={personInfoStyle}>
                        <div style={personNameStyle}>
                          {testimonials[card.index].name}
                        </div>
                        <div style={personRoleStyle}>
                          {testimonials[card.index].role}
                        </div>
                      </div>
                    </div>
                    
                    <div style={testimonialTextStyle}>
                      {testimonials[card.index].text}
                    </div>
                    
                    <div style={quotePlaceholderStyle}>
                      <img 
                        src="/images/48.png" 
                        alt="Quote icon placeholder" 
                        style={quoteImageStyle}
                      />
                    </div>
                  </div>
                  
                  <div style={blueGradientStyle}></div>
                  <div style={{...blurEllipseBaseStyle, left: '-5px', top: '116px'}}></div>
                  <div style={{...blurEllipseBaseStyle, left: '111px', top: '116px'}}></div>
                  <div style={{...blurEllipseBaseStyle, left: '230px', top: '115px'}}></div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={dotsContainerStyle}>
          {testimonials.map((_, index) => (
            <div 
              key={index}
              style={index === activeIndex ? activeDotStyle : dotStyle}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
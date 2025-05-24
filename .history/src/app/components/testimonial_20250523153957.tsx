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
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);
  
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Touch handling for mobile swipe
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

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

  // Intersection Observer for scroll-based activation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (!hasAnimated) {
              // Trigger entrance animation
              setTimeout(() => {
                setHasAnimated(true);
              }, 100);
            }
            // Start auto-scrolling when in view and not user interacting
            if (!userInteracting) {
              setIsAutoScrolling(true);
            }
          } else {
            setIsInView(false);
            setIsAutoScrolling(false);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated, userInteracting]);

  // Handle auto scrolling
  useEffect(() => {
    if (isAutoScrolling && !isAnimating && !userInteracting && isInView) {
      autoScrollTimerRef.current = setInterval(() => {
        handleNext();
      }, 2000);
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, isAnimating, userInteracting, isInView]);

  // User interaction handler
  const handleUserInteraction = () => {
    setUserInteracting(true);
    setIsAutoScrolling(false);
    
    // Clear existing timeout
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    
    // Resume auto-scrolling after 5 seconds of no interaction
    userInteractionTimeoutRef.current = setTimeout(() => {
      setUserInteracting(false);
      if (isInView) {
        setIsAutoScrolling(true);
      }
    }, 5000);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    handleUserInteraction();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

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
        // Reduced positioning values to prevent overflow
        if (position === 0) {
          xPosition = -50;
        } else if (position === 1) {
          xPosition = -25;
        } else if (position === 2) {
          xPosition = 0;
        } else if (position === 3) {
          xPosition = 25;
        } else if (position === 4) {
          xPosition = 50;
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
    handleUserInteraction();
  };
  
  const handleIndicatorClick = (index: number): void => {
    if (isAnimating) return;
    
    handleUserInteraction();
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
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  const cardPositions = getCardPositions();

  return (
    <>
      <style jsx>{`
        /* Global styles with Poppins font */
        * {
          box-sizing: border-box;
        }

        .testimonial-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #031B30;
          padding: 80px 0;
          font-family: 'Poppins', sans-serif;
          color: #F6F6F7;
          overflow-x: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .testimonial-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .testimonial-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          padding: 0 40px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .testimonial-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease 0.2s;
        }

        .testimonial-section.animate-in .testimonial-header {
          opacity: 1;
          transform: translateY(0);
        }

        .testimonial-header h2 {
          font-size: 44px;
          font-weight: 600;
          margin: 0 0 20px 0;
          font-family: 'Poppins', sans-serif;
        }

        .highlight {
          color: #0D98BA;
        }

        .testimonial-header p {
          font-size: 16px;
          line-height: 24px;
          max-width: 600px;
          margin: 0 auto;
          color: #8F9BB7;
          font-family: 'Poppins', sans-serif;
        }

        .testimonial-slider-wrapper {
          position: relative;
          height: 400px;
          margin-bottom: 50px;
          overflow: hidden;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease 0.4s;
        }

        .testimonial-section.animate-in .testimonial-slider-wrapper {
          opacity: 1;
          transform: translateY(0);
        }

        .testimonial-cards {
          position: relative;
          height: 100%;
          width: 100%;
          perspective: 1000px;
          overflow: hidden;
        }

        .testimonial-wrapper {
          position: absolute;
          width: 343px;
          height: 280px;
          top: 50%;
          margin-top: -140px;
          margin-left: -171.5px;
          transform-origin: center;
          transition: all 0.6s ease;
          opacity: 0;
          pointer-events: none;
        }

        .testimonial-wrapper.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .testimonial-wrapper.active {
          margin-top: -160px;
        }

        .testimonial-card {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 25px;
          gap: 25px;
          position: absolute;
          width: 343px;
          height: 235px;
          top: 0;
          background: #15141D;
          border: 1px solid #262626;
          border-radius: 10px;
          z-index: 2;
          font-family: 'Poppins', sans-serif;
        }

        .testimonial-wrapper.active .testimonial-card {
          background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, rgba(47, 60, 54, 0.2) 100%), #15141D;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .person-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 10px;
          width: 293px;
          height: 40px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: #333;
          overflow: hidden;
          flex-shrink: 0;
        }

        .avatar-content {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #555;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
        }

        .person-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 10px;
          width: 160px;
          height: 38px;
          overflow: hidden;
        }

        .person-name {
          width: 160px;
          height: 16px;
          font-family: 'Poppins', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 16px;
          color: #F6F6F7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .person-role {
          width: 160px;
          height: 12px;
          font-family: 'Poppins', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 12px;
          color: #8F9BB7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .testimonial-text {
          width: 293px;
          height: 96px;
          font-family: 'Poppins', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #F6F6F7;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        .quote-placeholder {
          position: absolute;
          width: 57px;
          height: 41px;
          right: 25px;
          top: 25px;
          border-radius: 4px;
          overflow: hidden;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0D98BA;
          font-size: 24px;
        }

        .quote-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blue-gradient-shape {
          box-sizing: border-box;
          position: absolute;
          width: 343px;
          height: 110px;
          left: 0;
          top: 150px;
          background: linear-gradient(90deg, #04091D 0%, #0D98BA 100%);
          border: 1px solid #04091D;
          border-radius: 10px;
          z-index: 1;
        }

        .blur-ellipse {
          position: absolute;
          width: 119px;
          height: 119px;
          background: linear-gradient(90deg, #04091D 0%, #0D98BA 100%);
          border: 1px solid #04091D;
          filter: blur(75px);
          z-index: 0;
        }

        .blur-1 {
          left: 20px;
          top: 116px;
        }

        .blur-2 {
          left: 111px;
          top: 116px;
        }

        .blur-3 {
          left: 204px;
          top: 115px;
        }

        .navigation-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: -30px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.6s;
        }

        .testimonial-section.animate-in .navigation-dots {
          opacity: 1;
          transform: translateY(0);
        }

        .dot {
          width: 10px;
          height: 4px;
          background: #8F9BB7;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 30px;
          background: #0D98BA;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 152, 186, 0.2);
          border: 1px solid #0D98BA;
          color: #F6F6F7;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          background: rgba(13, 152, 186, 0.4);
        }

        .prev-button {
          left: 10px;
        }

        .next-button {
          right: 10px;
        }

        @media (max-width: 1280px) {
          .testimonial-container {
            padding: 0 60px;
          }
          
          .prev-button {
            left: 20px;
          }
          
          .next-button {
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          .testimonial-section {
            padding: 60px 0;
          }
          
          .testimonial-container {
            padding: 0 20px;
          }
          
          .testimonial-header h2 {
            font-size: 36px;
          }
          
          .testimonial-slider-wrapper {
            height: 350px;
            overflow: hidden;
          }
          
          .testimonial-wrapper {
            width: 300px;
            margin-left: -150px;
          }
          
          .testimonial-card {
            width: 300px;
          }
          
          .person-container,
          .testimonial-text {
            width: 250px;
          }
          
          .blue-gradient-shape {
            width: 300px;
          }
          
          .blur-1 {
            left: 10px;
          }
          
          .blur-2 {
            left: 90px;
          }
          
          .blur-3 {
            left: 170px;
          }
          
          .nav-button {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          
          .prev-button {
            left: 5px;
          }
          
          .next-button {
            right: 5px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-header h2 {
            font-size: 28px;
          }
          
          .testimonial-header p {
            font-size: 14px;
          }
          
          .testimonial-wrapper {
            width: 280px;
            margin-left: -140px;
          }
          
          .testimonial-card {
            width: 280px;
            padding: 20px;
          }
          
          .person-container,
          .testimonial-text {
            width: 240px;
          }
          
          .blue-gradient-shape {
            width: 280px;
          }
          
          .blur-1 {
            left: 5px;
          }
          
          .blur-2 {
            left: 80px;
          }
          
          .blur-3 {
            left: 155px;
          }
          
          .nav-button {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
        }

        html, body {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          width: 100%;
        }
      `}</style>
      
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    
      <section 
        ref={sectionRef}
        className={`testimonial-section ${hasAnimated ? 'animate-in' : ''}`}
        aria-label="Client testimonials"
      >
        <div className="testimonial-container">
          <div className="testimonial-header">
            <h2>
              What Our <span className="highlight">Clients</span> Say
            </h2>
            <p>
              Discover why businesses trust us to deliver exceptional results. Our clients share their experiences working with our dedicated team and the transformative impact we've made on their digital presence and business growth.
            </p>
          </div>
          
          <div 
            className="testimonial-slider-wrapper" 
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={sliderRef}
          >
            <div className="testimonial-cards">
              {cardPositions.map((card) => (
                <div 
                  key={card.index} 
                  className={`testimonial-wrapper ${card.isVisible ? 'visible' : ''} ${card.isActive ? 'active' : ''}`}
                  style={{ 
                    left: `calc(50% + ${card.xPosition}%)`,
                    transform: `scale(${card.scale})`,
                    opacity: card.opacity,
                    zIndex: card.zIndex,
                    transition: 'all 0.6s ease'
                  }}
                >
                  <div className="testimonial-card">
                    <div className="person-container">
                      <div className="avatar">
                        <div className="avatar-content">
                          {testimonials[card.index].name.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="person-info">
                        <div className="person-name">
                          {testimonials[card.index].name}
                        </div>
                        
                        <div className="person-role">
                          {testimonials[card.index].role}
                        </div>
                      </div>
                    </div>
                    
                    <div className="testimonial-text">
                      {testimonials[card.index].text}
                    </div>
                    
                    <div className="quote-placeholder">
                      "
                    </div>
                  </div>
                  
                  <div className="blue-gradient-shape"></div>
                  <div className="blur-ellipse blur-1"></div>
                  <div className="blur-ellipse blur-2"></div>
                  <div className="blur-ellipse blur-3"></div>
                </div>
              ))}
            </div>
            
            <button className="nav-button prev-button" onClick={handlePrev}>
              ‹
            </button>
            <button className="nav-button next-button" onClick={handleNext}>
              ›
            </button>
          </div>
          
          <div className="navigation-dots">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
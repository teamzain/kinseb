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
      name: "Gavin Wills",
      role: "Web Designer",
      text: "Lorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisi et neque sed fermentum sollicitudin lectus."
    },
    {
      name: "Esther Howard",
      role: "Web Developer",
      text: "At viverra enim enim sed turpis orci cursus. Imperdiet eros mauris sed sodales nisi interdum ac. Eu congue quis egestas donec lectus."
    },
    {
      name: "Jenny Wilson",
      role: "UI/UX Designer",
      text: "Sed ut diam amet accumsan in. Elementum lorem aliquam venenatis amet sit posuere sed sit. Aliquet suspendisse vitae placerat donec."
    },
    {
      name: "Robert Johnson",
      role: "Product Manager",
      text: "Nulla facilisi. Vivamus sagittis pulvinar tellus nec tristique. Sed eget sapien euismod, convallis nisl non, elementum magna."
    },
    {
      name: "Sophia Chen",
      role: "Marketing Specialist",
      text: "Donec consequat sapien ut leo cursus rhoncus. Nullam dui mi, vulputate ac metus at, semper varius orci. Nulla accumsan ac elit in congue."
    },
    {
      name: "Michael Davis",
      role: "Frontend Developer",
      text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel."
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
          overflow: visible;
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
        }

        .quote-placeholder {
          position: absolute;
          width: 57px;
          height: 41px;
          right: 25px;
          top: 25px;
          border-radius: 4px;
          overflow: hidden;
        }

        .quote-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blue-gradient-shape {
          box-sizing: border-box;
          position: absolute;
          width: 392px;
          height: 110px;
          left: -25px;
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
          left: -5px;
          top: 116px;
        }

        .blur-2 {
          left: 111px;
          top: 116px;
        }

        .blur-3 {
          left: 230px;
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
          left: 5%;
        }

        .next-button {
          right: 5%;
        }

        @media (max-width: 1280px) {
          .testimonial-container {
            padding: 0 20px;
          }
          
          .prev-button {
            left: 2%;
          }
          
          .next-button {
            right: 2%;
          }
        }

        @media (max-width: 768px) {
          .testimonial-section {
            padding: 60px 0;
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
            width: 350px;
          }
          
          .nav-button {
            width: 40px;
            height: 40px;
            font-size: 18px;
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
            width: 320px;
            left: -20px;
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
                      <img 
                        src="/images/48.png" 
                        alt="Quote icon placeholder" 
                        className="quote-image" 
                      />
                    </div>
                  </div>
                  
                  <div className="blue-gradient-shape"></div>
                  <div className="blur-ellipse blur-1"></div>
                  <div className="blur-ellipse blur-2"></div>
                  <div className="blur-ellipse blur-3"></div>
                </div>
              ))}
            </div>
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
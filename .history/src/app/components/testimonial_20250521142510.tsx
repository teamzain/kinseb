'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import './testimonial.css'; // Import the separate CSS file

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
      text: "The team delivered exceptional modules for our various websites. Their attention to detail and understanding of our requirements exceeded expectations. We've seen a significant improvement in user engagement since implementation."
    },
    {
      name: "Kashaf Noor",
      role: "Business Owner",
      text: "The POS system provided has completely transformed our daily operations. It's intuitive, reliable, and perfectly tailored to our specific needs. Our staff adapted quickly and customer checkout times have been reduced by 40%."
    },
    {
      name: "Ali Raza",
      role: "CEO, Captive Power Solutions",
      text: "Working with this team has been a game-changer for our business. They understood our complex requirements and delivered solutions that streamlined our operations. Their support and responsiveness are truly outstanding."
    },
    {
      name: "Sarah Ahmad",
      role: "Operations Manager, GreenTech",
      text: "The custom inventory management system developed for us has eliminated countless hours of manual work. The reporting features provide insights we never had access to before. A truly valuable business investment."
    },
    {
      name: "Mohammad Khalid",
      role: "Director, Retail Chain",
      text: "After implementing their e-commerce solution, our online sales increased by 65% in just three months. The platform is robust, secure, and offers an exceptional user experience. Highly recommended for any business."
    },
    {
      name: "Farah Javed",
      role: "Founder, HealthPlus",
      text: "Their patient management system has revolutionized how we operate. From appointment scheduling to medical records, everything is now seamlessly integrated. Their technical expertise and industry knowledge are impressive."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  
  // Fix TypeScript errors by using correct types for timer refs
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Set up responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on first load
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle auto scrolling - set to 4 seconds interval
  useEffect(() => {
    if (isAutoScrolling && !isAnimating) {
      autoScrollTimerRef.current = setInterval(() => {
        handleNext();
      }, 2000); // Auto-scrolls every 2 seconds
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, isAnimating]);

  // Create the card arrangement
  const getCardPositions = (): CardPosition[] => {
    const positions: CardPosition[] = [];
    const totalCards = testimonials.length;
    // Show only 1 card on mobile, 5 on desktop
    const visibleCards = isMobile ? 1 : 5;
    
    for (let i = 0; i < totalCards; i++) {
      // Calculate position relative to active card
      let position = i - activeIndex;
      
      // Handle circular wrapping
      if (position < 0) {
        position += totalCards;
      }
      if (position >= totalCards) {
        position -= totalCards;
      }
      
      // Determine visibility based on position
      const isVisible = position < visibleCards;
      
      // Calculate x-position percentage
      let xPosition = 0;
      
      if (isMobile) {
        // Mobile: Only show 1 card, others off-screen
        if (position === 0) {
          xPosition = 0; // Center card
        } else if (position === 1) {
          xPosition = 100; // Next card (off-screen right)
        } else if (position === totalCards - 1) {
          xPosition = -100; // Previous card (off-screen left)
        } else {
          xPosition = position > 0 ? 200 : -200; // Far off-screen
        }
      } else {
        // Desktop: Show multiple cards with wider spacing
        if (position === 0) {
          xPosition = -70; // Far left card
        } else if (position === 1) {
          xPosition = -35; // Left card
        } else if (position === 2) {
          xPosition = 0;   // Center card
        } else if (position === 3) {
          xPosition = 35;  // Right card
        } else if (position === 4) {
          xPosition = 70;  // Far right card
        }
      }
      
      // Calculate scale and z-index
      let scale = 1;
      let zIndex = 10 - position;
      let opacity = 1;
      
      // Enhanced active card
      if ((isMobile && position === 0) || (!isMobile && position === 2)) {
        scale = 1.05;
        zIndex = 15;
      } else if (position >= visibleCards) {
        // Hide cards that are not in the visible range
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
        isActive: isMobile ? position === 0 : position === 2 // Middle position is active
      });
    }
    
    return positions;
  };
  
  // Handle next card
  const handleNext = (): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    // Reset animation flag after transition completes
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  // Handle previous card
  const handlePrev = (): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    // Reset animation flag after transition completes
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };
  
  // Handle pause on hover
  const handleMouseEnter = (): void => setIsAutoScrolling(false);
  const handleMouseLeave = (): void => setIsAutoScrolling(true);
  
  // Handle indicator click - add proper type for index
  const handleIndicatorClick = (index: number): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Reset animation flag after transition completes
    animationRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    // Reset timer for smoother UX
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      setIsAutoScrolling(false);
      
      setTimeout(() => {
        setIsAutoScrolling(true);
      }, 2000);
    }
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
    };
  }, []);

  const cardPositions = getCardPositions();

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>Client Testimonials | Our Success Stories</title>
        <meta name="description" content="Read what our clients say about our services. Real testimonials from satisfied customers who have benefited from our expertise." />
        <meta name="keywords" content="testimonials, client reviews, customer feedback, success stories" />
        <meta property="og:title" content="Client Testimonials | Our Success Stories" />
        <meta property="og:description" content="Read what our clients say about our services. Real testimonials from satisfied customers." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Testimonials | Our Success Stories" />
        <meta name="twitter:description" content="Read what our clients say about our services. Real testimonials from satisfied customers." />
      </Head>
    
      <section 
        className="testimonial-section"
        aria-label="Client testimonials"
      >
        <div className="testimonial-container">
          <div className="testimonial-header">
            <h2>
              What Our <span className="highlight">Clients</span> Say
            </h2>
            <p>
              Rmet facilisi arcu odio urna aenean erat. Pellentesque in vitae lobortis orci tincidunt facilisi. Pulvinar lacus ultricies turpis urna sapien.
            </p>
          </div>
          
          <div 
            className="testimonial-slider-wrapper" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
                  {/* Card */}
                  <div className="testimonial-card">
                    {/* Inner Container */}
                    <div className="person-container">
                      {/* Avatar */}
                      <div className="avatar">
                        <div className="avatar-content">
                          {testimonials[card.index].name.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Text */}
                      <div className="person-info">
                        {/* Name */}
                        <div className="person-name">
                          {testimonials[card.index].name}
                        </div>
                        
                        {/* Caption */}
                        <div className="person-role">
                          {testimonials[card.index].role}
                        </div>
                      </div>
                    </div>
                    
                    {/* Paragraph */}
                    <div className="testimonial-text">
                      {testimonials[card.index].text}
                    </div>
                    
                    {/* Quote mark (replaced with placeholder) */}
                    <div className="quote-placeholder">
                      <img 
                        src="/images/48.png" 
                        alt="Quote icon placeholder" 
                        className="quote-image" 
                      />
                    </div>
                  </div>
                  
                  {/* Card background elements */}
                  <div className="blue-gradient-shape"></div>
                  <div className="blur-ellipse blur-1"></div>
                  <div className="blur-ellipse blur-2"></div>
                  <div className="blur-ellipse blur-3"></div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows - Uncomment if needed */}
            {/* <button className="nav-button prev-button" onClick={handlePrev} aria-label="Previous testimonial">
              &lt;
            </button>
            <button className="nav-button next-button" onClick={handleNext} aria-label="Next testimonial">
              &gt;
            </button> */}
          </div>
          
          {/* Navigation dots */}
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
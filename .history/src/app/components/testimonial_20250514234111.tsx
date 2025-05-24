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
        <title>Client Testimonials & Reviews | Success Stories from Our Customers</title>
        <meta name="description" content="Read authentic client testimonials about our services. Discover how our solutions have helped businesses succeed with real feedback from satisfied customers." />
        <meta name="keywords" content="client testimonials, customer reviews, success stories, customer feedback, business reviews, client satisfaction" />
        
        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="Client Testimonials & Reviews | Real Customer Feedback" />
        <meta property="og:description" content="Read authentic reviews from our clients. See how our services have helped businesses achieve their goals with real testimonials from satisfied customers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/testimonials" />
        <meta property="og:image" content="https://yourwebsite.com/images/testimonials-preview.jpg" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Testimonials & Reviews | Success Stories" />
        <meta name="twitter:description" content="Read authentic reviews from our clients. Real testimonials from businesses that have achieved success with our services." />
        <meta name="twitter:image" content="https://yourwebsite.com/images/testimonials-twitter.jpg" />
        
        {/* Canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href="https://yourwebsite.com/testimonials" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
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
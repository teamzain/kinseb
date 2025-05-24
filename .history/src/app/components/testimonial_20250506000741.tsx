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
      name: "Cameron Williamson",
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
  const sliderRef = useRef<HTMLDivElement | null>(null);
  
  // Fix TypeScript errors by using correct types for timer refs
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Drag functionality states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const dragThreshold = 50; // Minimum drag distance to trigger navigation

  // Calculate total width for proper circular motion
  const visibleCards = 5; // Show 5 cards at once
  
  // Handle auto scrolling
  useEffect(() => {
    if (isAutoScrolling && !isAnimating && !isDragging) {
      autoScrollTimerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, isAnimating, isDragging]);

  // Create the circular card arrangement with wider spacing between cards
  const getCardPositions = (): CardPosition[] => {
    const positions: CardPosition[] = [];
    const totalCards = testimonials.length;
    
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
      
      // Calculate x-position percentage - key change for wider spacing
      let xPosition = 0;
      
      // Update spacing between cards - wider gaps like in the reference image
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
      
      // Calculate scale and z-index
      let scale = 1;
      let zIndex = 10 - position;
      let opacity = 1;
      
      // Enhanced middle card (position 2)
      if (position === 2) {
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
        isActive: position === 2 // Middle position is active
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
  const handleMouseLeave = (): void => {
    if (!isDragging) {
      setIsAutoScrolling(true);
    }
  };
  
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

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    if (isAnimating) return;
    
    // Pause auto-scrolling while dragging
    setIsAutoScrolling(false);
    setIsDragging(true);
    
    // Get the starting X position
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    setDragStartX(clientX);
    setDragOffsetX(0);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging) return;
    
    // Get current X position
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    // Calculate drag distance
    const offsetX = clientX - dragStartX;
    setDragOffsetX(offsetX);
    
    // Prevent default behavior to avoid text selection during drag
    e.preventDefault();
  };
  
  const handleDragEnd = (): void => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Navigate based on drag direction and distance
    if (Math.abs(dragOffsetX) >= dragThreshold) {
      if (dragOffsetX > 0) {
        // Dragged right, go to previous
        handlePrev();
      } else {
        // Dragged left, go to next
        handleNext();
      }
    }
    
    // Reset drag offset
    setDragOffsetX(0);
    
    // Resume auto-scrolling after a delay
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
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

  // Setup global mouse/touch event listeners for drag handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (isDragging) {
        handleDragMove(e as unknown as React.MouseEvent);
      }
    };
    
    const handleMouseUp = (): void => {
      if (isDragging) {
        handleDragEnd();
      }
    };
    
    const handleTouchMove = (e: TouchEvent): void => {
      if (isDragging) {
        handleDragMove(e as unknown as React.TouchEvent);
      }
    };
    
    const handleTouchEnd = (): void => {
      if (isDragging) {
        handleDragEnd();
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

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
            <div 
              className={`testimonial-cards ${isDragging ? 'dragging' : ''}`}
              style={{
                // Apply slight movement during drag for visual feedback
                transform: isDragging ? `translateX(${dragOffsetX * 0.2}px)` : 'translateX(0)',
                transition: isDragging ? 'none' : 'transform 0.3s ease'
              }}
            >
              {cardPositions.map((card) => (
                <div 
                  key={card.index} 
                  className={`testimonial-wrapper ${card.isVisible ? 'visible' : ''} ${card.isActive ? 'active' : ''}`}
                  style={{ 
                    left: `calc(50% + ${card.xPosition}%)`,
                    transform: `scale(${card.scale})`,
                    opacity: card.opacity,
                    zIndex: card.zIndex,
                    transition: isDragging ? 'none' : 'all 0.6s ease',
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={(e) => handleDragStart(e)}
                  onTouchStart={(e) => handleDragStart(e)}
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
                        draggable="false"
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
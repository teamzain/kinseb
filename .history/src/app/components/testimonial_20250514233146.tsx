'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import './testimonial.css'; // Import the separate CSS file

// Define types for our data and refs
interface Testimonial {
  name: string;
  role: string;
  text: string;
  company?: string; // Added for SEO
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
      company: "Design Solutions Inc.",
      text: "Lorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisi et neque sed fermentum sollicitudin lectus."
    },
    {
      name: "Esther Howard",
      role: "Web Developer",
      company: "Tech Innovations Ltd.",
      text: "At viverra enim enim sed turpis orci cursus. Imperdiet eros mauris sed sodales nisi interdum ac. Eu congue quis egestas donec lectus."
    },
    {
      name: "Jenny Wilson",
      role: "UI/UX Designer",
      company: "Creative Minds Studio",
      text: "Sed ut diam amet accumsan in. Elementum lorem aliquam venenatis amet sit posuere sed sit. Aliquet suspendisse vitae placerat donec."
    },
    {
      name: "Robert Johnson",
      role: "Product Manager",
      company: "Innovative Products Co.",
      text: "Nulla facilisi. Vivamus sagittis pulvinar tellus nec tristique. Sed eget sapien euismod, convallis nisl non, elementum magna."
    },
    {
      name: "Sophia Chen",
      role: "Marketing Specialist",
      company: "Growth Marketing Agency",
      text: "Donec consequat sapien ut leo cursus rhoncus. Nullam dui mi, vulputate ac metus at, semper varius orci. Nulla accumsan ac elit in congue."
    },
    {
      name: "Michael Davis",
      role: "Frontend Developer",
      company: "WebCraft Solutions",
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
        {/* Improved font loading with display=swap for better performance */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        
        {/* Enhanced SEO meta tags */}
        <title>Client Testimonials and Reviews | Real Success Stories</title>
        <meta name="description" content="Read authentic testimonials from our satisfied clients. Discover how our services have helped businesses grow and achieve their goals with proven results." />
        <meta name="keywords" content="testimonials, client reviews, customer feedback, success stories, client satisfaction, business reviews, service testimonials" />
        
        {/* Technical SEO tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/testimonials" />
        <meta name="author" content="Your Company Name" />
        
        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="Client Testimonials | Real Stories from Satisfied Customers" />
        <meta property="og:description" content="Read what our clients say about our services. Authentic testimonials from businesses who have experienced real results with our solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/testimonials" />
        <meta property="og:image" content="https://yourwebsite.com/images/testimonials-social-share.jpg" />
        <meta property="og:site_name" content="Your Company Name" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Testimonials | Real Success Stories" />
        <meta name="twitter:description" content="Discover how our clients have achieved success through our services. Read authentic testimonials and reviews." />
        <meta name="twitter:image" content="https://yourwebsite.com/images/testimonials-twitter-card.jpg" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>
    
      {/* JSON-LD structured data for testimonials */}
      <Script
        id="testimonial-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Organization",
            "name": "Your Company Name",
            "url": "https://yourwebsite.com",
            "review": testimonials.map((testimonial) => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewBody": testimonial.text
            }))
          })
        }}
      />
      
      <section 
        className="testimonial-section"
        aria-label="Client testimonials"
        itemScope
        itemType="https://schema.org/Review"
      >
        <div className="testimonial-container">
          <div className="testimonial-header">
            <h2>
              What Our <span className="highlight">Clients</span> Say
            </h2>
            <p>
              Discover how our services have helped businesses achieve their goals. Read authentic testimonials from our satisfied clients who have experienced real results with our solutions.
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
                  itemProp={card.isActive ? "review" : undefined}
                >
                  {/* Card */}
                  <div className="testimonial-card">
                    {/* Inner Container */}
                    <div className="person-container">
                      {/* Avatar */}
                      <div className="avatar" aria-hidden="true">
                        <div className="avatar-content">
                          {testimonials[card.index].name.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Text */}
                      <div className="person-info">
                        {/* Name */}
                        <div className="person-name" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <span itemProp="name">{testimonials[card.index].name}</span>
                        </div>
                        
                        {/* Caption with company name for better SEO */}
                        <div className="person-role">
                          <span itemProp="jobTitle">{testimonials[card.index].role}</span>
                          {testimonials[card.index].company && (
                            <span>, <span itemProp="worksFor">{testimonials[card.index].company}</span></span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Paragraph */}
                    <div className="testimonial-text" itemProp="reviewBody">
                      {testimonials[card.index].text}
                    </div>
                    
                    {/* Quote mark (replaced with placeholder) */}
                    <div className="quote-placeholder">
                      <img 
                        src="/images/48.png" 
                        alt="Quote icon" 
                        className="quote-image"
                        width="48"
                        height="48"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Card background elements */}
                  <div className="blue-gradient-shape" aria-hidden="true"></div>
                  <div className="blur-ellipse blur-1" aria-hidden="true"></div>
                  <div className="blur-ellipse blur-2" aria-hidden="true"></div>
                  <div className="blur-ellipse blur-3" aria-hidden="true"></div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows - Improved accessibility */}
            <div className="navigation-controls" aria-label="Testimonial navigation">
              <button 
                className="nav-button prev-button" 
                onClick={handlePrev} 
                aria-label="Previous testimonial"
                title="View previous testimonial"
              >
                <span aria-hidden="true">&lt;</span>
              </button>
              <button 
                className="nav-button next-button" 
                onClick={handleNext} 
                aria-label="Next testimonial"
                title="View next testimonial"
              >
                <span aria-hidden="true">&gt;</span>
              </button>
            </div>
          </div>
          
          {/* Navigation dots with improved accessibility */}
          <div className="navigation-dots" role="tablist" aria-label="Testimonial pagination">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Testimonial from ${testimonial.name}`}
                title={`View testimonial from ${testimonial.name}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
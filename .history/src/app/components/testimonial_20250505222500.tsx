'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

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

  // Calculate total width for proper circular motion
  const visibleCards = 5; // Show 5 cards at once
  
  // Handle auto scrolling
  useEffect(() => {
    if (isAutoScrolling && !isAnimating) {
      autoScrollTimerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, isAnimating]);

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
            
            {/* Navigation arrows */}
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
        
        <style jsx>{`
          /* Global styles with Poppins font */
          .testimonial-section {
            position: relative;
            width: 100vw;
            min-height: 100vh;
            background-color: #031B30;
            padding: 80px 0;
            font-family: 'Poppins', sans-serif;
            color: #F6F6F7;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
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
          
          /* Slider container - increased height for better visibility */
          .testimonial-slider-wrapper {
            position: relative;
            height: 400px;
            margin-bottom: 50px;
            overflow: visible;
            width: 100%;
          }
          
          .testimonial-cards {
            position: relative;
            height: 100%;
            width: 100%;
            perspective: 1000px;
          }
          
          /* Card styles - updated positioning logic */
          .testimonial-wrapper {
            position: absolute;
            width: 343px;
            height: 280px;
            top: 50%;
            margin-top: -140px; /* Half the height */
            margin-left: -171.5px; /* Half the width */
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
            margin-top: -160px; /* Shift active card up slightly */
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
          
          /* Quote placeholder */
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
          
          /* Blue gradient shape */
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
          
          /* Blurred ellipses */
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
          
          /* Navigation dots */
          .navigation-dots {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 50px;
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
          
          /* Navigation buttons */
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
          
          /* Responsive styles */
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
            }
            
            .testimonial-wrapper {
              width: 300px;
              margin-left: -150px; /* Half the width */
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
              margin-left: -140px; /* Half the width */
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
        `}</style>
      </section>
    </>
  );
};

export default TestimonialSection;
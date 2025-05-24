'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const KinsebWebDevelopment = () => {
  const containerRef = useRef(null);
  const laptopScreenRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [allowNextComponentScroll, setAllowNextComponentScroll] = useState(false);
  const [allowPrevComponentScroll, setAllowPrevComponentScroll] = useState(false);
  
  // Card content data
  const cards = [
    {
      icon: "/images/custom-icon.svg", // SVG for better performance
      title: "Custom Web Design",
      description: "Each website we create is meticulously crafted to deliver a 100% unique online experience tailored to your brand. Our expert designers transform your vision into a dynamic, custom design that enhances your brand's visibility, boosts engagement, and drives conversions."
    },
    {
      icon: "/images/performance-icon.svg", 
      title: "Performance Optimization",
      description: "We build lightning-fast websites optimized for both users and search engines. Our performance-focused approach ensures your site loads quickly, responds instantly, and delivers a seamless experience across all devices and platforms."
    },
    {
      icon: "/images/growth-icon.svg",
      title: "Growth Solutions",
      description: "Transform your website into a powerful growth engine. Our strategic approaches to user experience, conversion optimization, and digital marketing help drive meaningful traffic, increase engagement, and maximize your ROI."
    },
    {
      icon: "/images/responsive-icon.svg",
      title: "Responsive Development",
      description: "We create websites that look and function flawlessly across all devices and screen sizes. From desktop computers to smartphones and tablets, your website will automatically adjust to provide an optimal viewing experience."
    },
    {
      icon: "/images/seo-icon.svg",
      title: "SEO Optimization",
      description: "We build websites with search engines in mind from day one. Our development practices incorporate technical SEO best practices to help improve your visibility in search results and attract more organic traffic."
    },
    {
      icon: "/images/support-icon.svg",
      title: "Ongoing Support",
      description: "Our relationship doesn't end when your website launches. We provide ongoing maintenance and support to ensure your site remains secure, up-to-date, and performing at its best."
    }
  ];

  // Observe when component is fully in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
          setIsVisible(true);
          // Start auto-cycling cards when component is fully visible
          startCardCycle();
        } else if (!entry.isIntersecting) {
          setIsVisible(false);
          setActiveCardIndex(0);
          setAllowNextComponentScroll(false);
          setAllowPrevComponentScroll(false);
        }
      },
      { threshold: [0.8, 1] } // Higher threshold for "fully on component"
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-cycle through cards when component is visible
  const startCardCycle = () => {
    let currentIndex = 0;
    const cycleInterval = setInterval(() => {
      if (!isVisible) {
        clearInterval(cycleInterval);
        return;
      }
      
      currentIndex = (currentIndex + 1) % cards.length;
      setActiveCardIndex(currentIndex);
      
      // Set scroll permissions based on current card
      if (currentIndex === cards.length - 1) {
        setAllowNextComponentScroll(true);
        setAllowPrevComponentScroll(false);
      } else if (currentIndex === 0) {
        setAllowPrevComponentScroll(true);
        setAllowNextComponentScroll(false);
      } else {
        setAllowNextComponentScroll(false);
        setAllowPrevComponentScroll(false);
      }
    }, 5000); // Change card every 5 seconds
    
    return () => clearInterval(cycleInterval);
  };

  // Auto-scroll the laptop screen image with improved smoothness
  useEffect(() => {
    if (isVisible && laptopScreenRef.current) {
      const laptopScreen = laptopScreenRef.current;
      let scrollPosition = 0;
      const scrollSpeed = 0.4; // Even smoother scroll speed
      const maxScroll = laptopScreen.scrollHeight - laptopScreen.clientHeight;
      
      const scrollInterval = setInterval(() => {
        if (scrollPosition >= maxScroll) {
          // Reset to top with a slight pause for better UX
          setTimeout(() => {
            laptopScreen.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            scrollPosition = 0;
          }, 1000);
        } else {
          scrollPosition += scrollSpeed;
          laptopScreen.scrollTop = scrollPosition;
        }
      }, 20);
      
      return () => clearInterval(scrollInterval);
    }
  }, [isVisible]);

  // Handle scroll for card transitions or to adjacent components
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isVisible) return;
      
      // Allow scrolling to previous component if on first card and scrolling up
      if (activeCardIndex === 0 && e.deltaY < 0) {
        setAllowPrevComponentScroll(true);
        // Important: Don't prevent default scroll behavior for touchpad/mouse
        return;
      }
      
      // Allow scrolling to next component if on last card and scrolling down
      if (activeCardIndex === cards.length - 1 && e.deltaY > 0) {
        setAllowNextComponentScroll(true);
        return; // Don't prevent default - allow scrolling to next component
      }
      
      // Otherwise prevent page scrolling while in this component
      if (!allowNextComponentScroll && !allowPrevComponentScroll) {
        e.preventDefault();
      }
      
      // Prevent too rapid transitions with smoother delay
      if (scrollLocked) return;
      
      if (e.deltaY > 8 && activeCardIndex < cards.length - 1) {
        setActiveCardIndex(prev => prev + 1);
        setScrollLocked(true);
        setTimeout(() => setScrollLocked(false), 700); // Smoother transition
      } else if (e.deltaY < -8 && activeCardIndex > 0) {
        setActiveCardIndex(prev => prev - 1);
        setScrollLocked(true);
        setTimeout(() => setScrollLocked(false), 700);
      }
    };
    
    // Enhanced keyboard navigation
    const handleKeyDown = (e) => {
      if (!isVisible) return;
      if (scrollLocked) return;
      
      // Allow scrolling to previous component if on first card
      if (activeCardIndex === 0 && 
         (e.key === 'ArrowUp' || e.key === 'PageUp')) {
        setAllowPrevComponentScroll(true);
        return; // Allow normal scroll behavior
      }
      
      // Allow scrolling to next component if on last card
      if (activeCardIndex === cards.length - 1 && 
         (e.key === 'ArrowDown' || e.key === 'PageDown')) {
        setAllowNextComponentScroll(true);
        return; // Allow normal scroll behavior
      }
      
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && activeCardIndex < cards.length - 1) {
        e.preventDefault();
        setActiveCardIndex(prev => prev + 1);
        setScrollLocked(true);
        setTimeout(() => setScrollLocked(false), 700);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && activeCardIndex > 0) {
        e.preventDefault();
        setActiveCardIndex(prev => prev - 1);
        setScrollLocked(true);
        setTimeout(() => setScrollLocked(false), 700);
      }
    };
    
    // Improved touch events for mobile/touchpad
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e) => {
      if (!isVisible) return;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    
    const handleTouchMove = (e) => {
      if (!isVisible) return;
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      const timeDiff = Date.now() - touchStartTime;
      
      // Faster swipe detection for more responsive feel
      const isFastSwipe = timeDiff < 300;
      const swipeThreshold = isFastSwipe ? 30 : 50;
      
      // Allow scrolling to previous component if on first card and swiping up (negative diff means swiping up)
      if (activeCardIndex === 0 && diff < -30) {
        setAllowPrevComponentScroll(true);
        // Don't call preventDefault() here to allow normal scrolling behavior to previous component
        return;
      }
      
      // Allow scrolling to next component if on last card and swiping down
      if (activeCardIndex === cards.length - 1 && diff > 30) {
        setAllowNextComponentScroll(true);
        return;
      }
      
      // Prevent default only if we're handling card transitions within this component
      if (!allowNextComponentScroll && !allowPrevComponentScroll) {
        e.preventDefault();
      }
      
      // Prevent too rapid transitions
      if (scrollLocked) return;
      
      // Scroll down with more responsive threshold
      if (diff > swipeThreshold && activeCardIndex < cards.length - 1) {
        setActiveCardIndex(prev => prev + 1);
        setScrollLocked(true);
        setTimeout(() => setScrollLocked(false), 700);
        touchStartY = touchY;
        touchStartTime = Date.now();
      } 
      // Scroll up with more responsive threshold
      else if (diff < -swipeThreshold && activeCardIndex > 0) {
        setActiveCardIndex(prev => prev - 1);
        setScrollLocked(true);
        setTimeout(() => setScrollLocked(false), 700);
        touchStartY = touchY;
        touchStartTime = Date.now();
      }
    };
    
    // Use passive: false to allow preventDefault()
    const options = { passive: false };
    window.addEventListener('wheel', handleWheel, options);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, options);
    window.addEventListener('touchmove', handleTouchMove, options);
    
    // Only prevent default scroll behavior if not on first or last card
    if (isVisible && containerRef.current) {
      // Modified to handle both first and last card scenarios
      if (activeCardIndex > 0 && activeCardIndex < cards.length - 1) {
        const preventDefaultScroll = (e) => {
          e.preventDefault();
          return false;
        };
        
        containerRef.current.addEventListener('wheel', preventDefaultScroll, options);
        
        return () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
          if (containerRef.current) {
            containerRef.current.removeEventListener('wheel', preventDefaultScroll);
          }
        };
      }
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isVisible, activeCardIndex, scrollLocked, cards.length, allowNextComponentScroll, allowPrevComponentScroll]);

  return (
    <>
      {/* SEO Optimizations */}
      <Head>
        <title>Why Choose Kinseb Web Development? | Custom Web Solutions</title>
        <meta name="description" content="Kinseb Web Development offers custom web design, performance optimization, and growth-focused solutions to help your business thrive online." />
        <meta name="keywords" content="web development, custom websites, SEO optimization, performance, responsive design" />
        <meta property="og:title" content="Why Choose Kinseb Web Development?" />
        <meta property="og:description" content="Your one-stop web partner for growth, design & performance." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourdomain.com/services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <section 
        ref={containerRef}
        id="services-section"
        aria-label="Kinseb Web Development Services"
        className="services-section"
        style={{
          backgroundColor: '#061E3C',
          color: 'white',
          padding: '60px 5%',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <div className="services-container" style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '40px',
          minHeight: '80vh',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left side - Styled like the image reference */}
          <div className="services-info" style={{
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2,
            maxWidth: '600px',
          }}>
            {/* New styling based on reference image */}
            <div className="services-heading" style={{
              marginBottom: '40px',
              position: 'relative',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: 'left',
            }}>              
              <h1 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '700',
                marginBottom: '16px',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.2',
              }}>
                <span style={{ color: 'white' }}>Why </span>
                <span style={{ color: '#30B8DB' }}>Kinseb</span>
                <span style={{ color: 'white' }}> Web Development?</span>
              </h1>
              
              <p style={{
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.6',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '30px',
                maxWidth: '100%',
              }}>
                Your One-Stop Web Partner for Growth, Design & Performance
              </p>
            </div>

            {/* Laptop with screen showing website - styled to match reference image */}
            <div className="laptop-container" style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1s ease, transform 1s ease',
            }}>
              {/* Laptop glow effect */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '10%',
                width: '80%',
                height: '30px',
                background: 'radial-gradient(ellipse at center, rgba(48,184,219,0.3) 0%, rgba(48,184,219,0) 70%)',
                filter: 'blur(15px)',
                zIndex: '-1',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1.5s ease',
              }}></div>
              
              {/* Laptop image with website inside */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '66%', /* Aspect ratio for laptop */
                borderRadius: '12px',
                overflow: 'hidden',
             
              }}>
                <img 
                  src="/images/laptop.png" 
                  alt="Kinseb Web Development Project Example"
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                   
                    transition: 'transform 0.5s ease',
                    transform: isVisible ? 'scale(1)' : 'scale(0.98)',
                  }}
                />
                
                {/* Screen content that scrolls inside laptop */}
                <div 
                  ref={laptopScreenRef}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '80%',
                    height: '77%',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
                    scrollbarWidth: 'none', // Hide scrollbar in Firefox
                    WebkitOverflowScrolling: 'touch', // Better scrolling on iOS
                  }}
                  aria-hidden="true"
                >
                  {/* This part should be visible in the laptop screen */}
                  <img 
                    src="/images/leftColumn.png"
                    alt=""
                    style={{
                      width: '100%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Cards that change on scroll */}
          <div className="services-cards" style={{
            flex: '1 1 500px',
            height: '400px',
            position: 'relative',
          }}>
            {/* Decorative background elements */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              right: '-100px',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(48,184,219,0.15) 0%, rgba(48,184,219,0) 70%)',
              zIndex: 0,
              filter: 'blur(10px)',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1.5s ease',
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              right: '30%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(48,184,219,0.12) 0%, rgba(48,184,219,0) 70%)',
              zIndex: 0,
              filter: 'blur(8px)',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1.5s ease',
            }}></div>
            
            {cards.map((card, index) => (
              <div 
                key={index}
                className="service-card"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(9, 40, 75, 0.75)',
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: activeCardIndex === index 
                    ? '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(48, 184, 219, 0.25)' 
                    : '0 5px 15px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(48, 184, 219, 0.3)',
                  opacity: activeCardIndex === index ? 1 : 0,
                  transform: activeCardIndex === index ? 'translateY(0) scale(1)' : 
                            index < activeCardIndex ? 'translateY(-50px) scale(0.95)' : 'translateY(50px) scale(0.95)',
                  transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: activeCardIndex === index ? 'auto' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1,
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '25px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(48, 184, 219, 0.12)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 6px rgba(48, 184, 219, 0.3)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    transform: activeCardIndex === index ? 'translateY(0)' : 'translateY(10px)',
                  }}>
                    <img 
                      src={card.icon} 
                      alt=""
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain'
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(22px, 3.5vw, 28px)',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0,
                    fontFamily: 'Poppins, sans-serif',
                  }}>
                    {card.title}
                  </h2>
                </div>
                
                <p style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'Poppins, sans-serif',
                }}>
                  {card.description}
                </p>
                
                {/* Card number indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Poppins, sans-serif',
                  background: 'rgba(9, 40, 75, 0.5)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(5px)',
                }}>
                  {index + 1}/{cards.length}
                </div>
              </div>
            ))}
            
            {/* Card progress indicators */}
            <div className="card-indicators" style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
              padding: '5px 12px',
              background: 'rgba(9, 40, 75, 0.4)',
              borderRadius: '20px',
              backdropFilter: 'blur(5px)',
              zIndex: 5,
            }}>
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCardIndex(index);
                    setAllowNextComponentScroll(index === cards.length - 1);
                    setAllowPrevComponentScroll(index === 0);
                  }}
                  style={{
                    width: activeCardIndex === index ? '24px' : '12px',
                    height: '12px',
                    borderRadius: '20px',
                    background: activeCardIndex === index ? '#30B8DB' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: activeCardIndex === index ? 'scale(1.1)' : 'scale(1)',
                    cursor: 'pointer',
                    border: 'none',
                    padding: 0,
                    boxShadow: activeCardIndex === index ? '0 0 10px rgba(48, 184, 219, 0.7)' : 'none',
                  }}
                  aria-label={`View ${cards[index].title} service`}
                />
              ))}
            </div>
            
            {/* Scroll up instruction - visible only on first card */}
            {activeCardIndex === 0 && (
              <div className="scroll-indicator scroll-up" style={{
                position: 'absolute',
                top: '-80px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                opacity: 0.8,
                animation: 'pulse-up 2s infinite',
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  color: '#30B8DB',
                  marginBottom: '5px'
                }}>↑</div>
                <div style={{ 
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'Poppins, sans-serif',
                }}>
                  Scroll up
                </div>
              </div>
            )}
            
            {/* Scroll down instruction - visible only on last card */}
            {activeCardIndex === cards.length - 1 && (
              <div className="scroll-indicator scroll-down" style={{
                position: 'absolute',
                bottom: '-80px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                opacity: 0.8,
                animation: 'pulse-down 2s infinite',
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  color: '#30B8DB',
                  marginBottom: '5px'
                }}>↓</div>
                <div style={{ 
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'Poppins, sans-serif',
                }}>
                  Scroll down
                </div>
              </div>
            )}
          </div>
        </div>

        <style jsx global>{`
          /* Import Poppins font */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
          
          /* Prevent default scrolling behavior on the container */
          html, body {
            overflow-x: hidden;
            scroll-behavior: smooth;
            font-family: 'Poppins', sans-serif;
          }
          
          /* Smoother animations with improved cubic-bezier */
          * {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Animation for the scroll down indicator */
          @keyframes pulse-down {
            0% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
            50% { opacity: 1; transform: translateX(-50%) translateY(8px); }
            100% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
          }
          
          /* Animation for the scroll up indicator */
          @keyframes pulse-up {
            0% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
            50% { opacity: 1; transform: translateX(-50%) translateY(-8px); }
            100% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
          }
          
          /* Add hover effect for card indicator buttons */
          button:hover {
            transform: scale(1.2) !important;
            box-shadow: 0 0 12px rgba(48, 184, 219, 0.8) !important;
          }
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .services-container {
              flex-direction: column;
              gap: 50px;
            }
            
            .services-info, .services-cards {
              flex: 1 1 100%;
            }
            
            .services-heading {
              text-align: center;
            }
            
            .laptop-container {
              margin-bottom: 40px;
            }
            
            .service-card {
              padding: 30px 25px;
              height: auto;
              min-height: 380px;
            }
            
            .card-indicators {
              bottom: -60px;
            }
          }
          
          @media (max-width: 480px) {
            .services-section {
              padding: 40px 20px;
            }
            
            .service-card {
              padding: 25px 20px;
              min-height: 420px;
            }
            
            .service-card h2 {
              font-size: 22px;
            }
            
            .service-card p {
              font-size: 14px;
            }
          }
          
          /* Improve accessibility */
          .service-card:focus-within {
            outline: 2px solid #30B8DB;
          }
          
          /* Improve SEO with structured content */
          .services-section {
            scroll-margin-top: 80px;
          }
          
          /* Optimize images for better performance */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Improve performance with will-change */
          .service-card {
            will-change: transform, opacity;
          }
        `}</style>
      </section>
    </>
  );
};

export default KinsebWebDevelopment;
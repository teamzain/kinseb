'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const KinsebWebDevelopment = () => {
  const containerRef = useRef(null);
  const laptopScreenRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Card content data
  const cards = [
    {
      icon: "/images/custom-icon.svg",
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

  // Observe when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
          setIsVisible(false);
        }
      },
      { threshold: [0.1, 0.5, 0.9] }
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

  // Auto-scroll the laptop screen image
  useEffect(() => {
    if (isVisible && laptopScreenRef.current) {
      const laptopScreen = laptopScreenRef.current;
      let scrollPosition = 0;
      const scrollSpeed = 0.4;
      const maxScroll = laptopScreen.scrollHeight - laptopScreen.clientHeight;
      
      const scrollInterval = setInterval(() => {
        if (scrollPosition >= maxScroll) {
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

  // Handle scroll events to control card transitions
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !cardsContainerRef.current || !isVisible) return;
      
      // Get the position of the cards container relative to the viewport
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRect.height;
      const containerTop = containerRect.top;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the container is in view
      const visibleHeight = Math.min(containerHeight, viewportHeight - containerTop);
      const visibleRatio = visibleHeight / containerHeight;
      
      // Use this to determine scroll progress
      let progress = 0;
      
      if (containerTop <= 0) {
        // Container is at or above viewport top
        if (containerTop + containerHeight <= viewportHeight) {
          // Container is fully in view or below
          progress = 1;
        } else {
          // Container is partially in view
          progress = Math.abs(containerTop) / (containerHeight - viewportHeight);
        }
      }
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      
      // Calculate which card should be active based on scroll position
      const newActiveIndex = Math.min(
        cards.length - 1,
        Math.floor(progress * cards.length)
      );
      
      setActiveCardIndex(newActiveIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, cards.length]);

  // Calculate card positions based on active index
  const getCardStyle = (index) => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '400px',
      backgroundColor: 'rgba(9, 40, 75, 0.75)',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: activeCardIndex === index 
        ? '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(48, 184, 219, 0.25)' 
        : '0 5px 15px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(48, 184, 219, 0.3)',
      backdropFilter: 'blur(10px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease, visibility 0.6s ease',
      display: 'flex',
      flexDirection: 'column',
      visibility: Math.abs(activeCardIndex - index) <= 1 ? 'visible' : 'hidden',
    };
    
    if (index === activeCardIndex) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        zIndex: 3,
      };
    } else if (index < activeCardIndex) {
      return {
        ...baseStyle,
        opacity: 0,
        transform: 'translateY(-100%) scale(0.95)',
        zIndex: 1,
      };
    } else {
      return {
        ...baseStyle,
        opacity: Math.abs(activeCardIndex - index) === 1 ? 0.3 : 0,
        transform: 'translateY(100%) scale(0.95)',
        zIndex: Math.abs(activeCardIndex - index) === 1 ? 2 : 1,
      };
    }
  };

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
          padding: '120px 5%',
          minHeight: '150vh', // Make taller to allow for scrolling
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
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
          {/* Left side - Fixed position while scrolling */}
          <div className="services-info" style={{
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: '100px',
            zIndex: 2,
            maxWidth: '600px',
            alignSelf: 'flex-start',
          }}>
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

            {/* Laptop with screen showing website */}
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
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}
                  aria-hidden="true"
                >
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

          {/* Right side - Scrolling cards */}
          <div 
            ref={cardsContainerRef}
            className="services-cards" 
            style={{
              flex: '1 1 500px',
              position: 'relative',
              minHeight: '1500px', // Make this taller to allow for scrolling
              display: 'flex',
              flexDirection: 'column',
              gap: '100vh', // Space between cards for scroll
              paddingTop: '20vh',
              paddingBottom: '20vh',
            }}
          >
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
              bottom: '50%',
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
            
            {/* Fixed position visible card container - cards will appear here */}
            <div style={{
              position: 'sticky',
              top: '20vh',
              height: '500px',
              width: '100%',
            }}>
              {cards.map((card, index) => (
                <div 
                  key={index}
                  className="service-card"
                  style={getCardStyle(index)}
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
            </div>
            
            {/* Empty div elements to create scroll space for each card */}
            {cards.map((_, index) => (
              <div 
                key={`spacer-${index}`} 
                style={{ height: '100vh', visibility: 'hidden' }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Card progress indicators */}
        <div className="card-indicators" style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '12px 5px',
          background: 'rgba(9, 40, 75, 0.4)',
          borderRadius: '20px',
          backdropFilter: 'blur(5px)',
          zIndex: 5,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Calculate position to scroll to
                if (containerRef.current && cardsContainerRef.current) {
                  const containerTop = containerRef.current.offsetTop;
                  const cardSpace = cardsContainerRef.current.scrollHeight / cards.length;
                  const targetPosition = containerTop + (cardSpace * index) + 100;
                  
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                width: '12px',
                height: activeCardIndex === index ? '24px' : '12px',
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

        <style jsx global>{`
          /* Import Poppins font */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
          
          /* Better scrolling behavior */
          html {
            scroll-behavior: smooth;
            overflow-x: hidden;
            font-family: 'Poppins', sans-serif;
          }
          
          /* Smoother animations */
          * {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .services-container {
              flex-direction: column;
            }
            
            .services-info {
              position: relative;
              top: 0;
              margin-bottom: 50px;
            }
            
            .services-heading {
              text-align: center;
            }
            
            .card-indicators {
              right: 10px;
            }
          }
          
          @media (max-width: 480px) {
            .services-section {
              padding: 60px 20px;
            }
            
            .service-card {
              padding: 25px 20px;
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
          
          /* Will-change for better performance */
          .service-card {
            will-change: transform, opacity;
          }
        `}</style>
      </section>
    </>
  );
};

export default KinsebWebDevelopment;
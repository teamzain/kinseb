'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const KinsebWebDevelopment = () => {
  const containerRef = useRef(null);
  const laptopScreenRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [nextSectionTriggered, setNextSectionTriggered] = useState(false);
  
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

  // Handle scroll to show one card at a time
  useEffect(() => {
    const handleScroll = () => {
      if (!cardsContainerRef.current || !isVisible) return;
      
      const cards = cardsContainerRef.current.querySelectorAll('.service-card');
      const cardHeight = cards[0].offsetHeight + 30; // Card height + margin
      const scrollPosition = cardsContainerRef.current.scrollTop;
      
      // Calculate which card should be active based on scroll position
      const newActiveIndex = Math.min(
        Math.floor(scrollPosition / cardHeight),
        cards.length - 1
      );
      
      setActiveCardIndex(newActiveIndex);
      
      // Check if we've scrolled past the last card
      if (newActiveIndex === cards.length - 1 && 
          scrollPosition > (cards.length - 0.5) * cardHeight && 
          !nextSectionTriggered) {
        
        // Trigger scroll to next section
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
          setNextSectionTriggered(true);
          setTimeout(() => {
            nextSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => setNextSectionTriggered(false), 1000);
          }, 500);
        }
      }
    };
    
    const cardsContainer = cardsContainerRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isVisible, nextSectionTriggered]);

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
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,184,219,0.15) 0%, rgba(48,184,219,0) 70%)',
          zIndex: 0,
          filter: 'blur(20px)',
          opacity: isVisible ? 0.7 : 0,
          transition: 'opacity 1.5s ease',
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '60%',
          right: '40%',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,184,219,0.12) 0%, rgba(48,184,219,0) 70%)',
          zIndex: 0,
          filter: 'blur(15px)',
          opacity: isVisible ? 0.6 : 0,
          transition: 'opacity 1.5s ease',
        }}></div>
        
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(48,184,219,0.08) 0%, rgba(48,184,219,0) 70%)',
          zIndex: 0,
          filter: 'blur(15px)',
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 1.5s ease',
        }}></div>
        
        <div className="services-container" style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          height: 'calc(100vh - 240px)', // Subtract the padding
        }}>
          {/* Left side - Fixed position while scrolling */}
          <div className="services-info" style={{
            flex: '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: '100px',
            zIndex: 2,
            minWidth: '45%',
            height: 'fit-content',
            alignSelf: 'flex-start',
            paddingRight: '20px',
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

          {/* Right side - Single card view with vertical scrolling */}
          <div 
            ref={cardsContainerRef}
            className="services-cards" 
            style={{
              flex: '1 1 500px',
              height: '100%',
              overflow: 'auto',
              scrollSnapType: 'y mandatory',
              padding: '10px',
              position: 'relative',
              msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
              scrollbarWidth: 'none', // Hide scrollbar in Firefox
            }}
          >
            {/* Card Container */}
            <div style={{
              paddingBottom: '40px', // Add padding at the bottom to trigger the next section
            }}>
              {cards.map((card, index) => (
                <div 
                  key={index}
                  className="service-card"
                  style={{
                    backgroundColor: 'rgba(9, 40, 75, 0.75)',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: activeCardIndex === index 
                      ? '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(48, 184, 219, 0.3)' 
                      : '0 5px 15px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(48, 184, 219, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.4s ease',
                    transform: `scale(${activeCardIndex === index ? 1 : 0.95}) translateY(${activeCardIndex === index ? 0 : 20}px)`,
                    opacity: activeCardIndex === index ? 1 : 0.6,
                    height: 'calc(100vh - 340px)', // Make card take full height of view minus margins/padding
                    minHeight: '400px',
                    maxHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always',
                    marginBottom: '30px',
                    position: 'relative',
                    visibility: Math.abs(activeCardIndex - index) > 2 ? 'hidden' : 'visible', // Hide cards far from view
                  }}
                  id={`card-${index}`}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '25px',
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      marginRight: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(48, 184, 219, 0.12)',
                      borderRadius: '16px',
                      boxShadow: activeCardIndex === index ? 
                        '0 8px 16px rgba(0, 0, 0, 0.2), 0 0 10px rgba(48, 184, 219, 0.4)' : 
                        '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 6px rgba(48, 184, 219, 0.2)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                      <img 
                        src={card.icon} 
                        alt=""
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
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
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {card.title}
                    </h2>
                  </div>
                  
                  <p style={{
                    fontSize: 'clamp(15px, 2vw, 17px)',
                    lineHeight: '1.7',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Poppins, sans-serif',
                    marginBottom: '30px',
                    flex: '1'
                  }}>
                    {card.description}
                  </p>
                  
                  {/* Card indicator and progress */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#30B8DB',
                      fontFamily: 'Poppins, sans-serif',
                    }}>
                      {index + 1}/{cards.length}
                    </div>
                    
                    <div style={{
                      flex: 1,
                      height: '4px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '20px',
                      margin: '0 20px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${((index + 1) / cards.length) * 100}%`,
                        background: 'linear-gradient(90deg, rgba(48,184,219,0.7) 0%, #30B8DB 100%)',
                        borderRadius: '20px',
                        transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}></div>
                    </div>
                    
                    {index < cards.length - 1 && (
                      <button
                        aria-label={`Go to ${cards[index + 1].title}`}
                        onClick={() => {
                          // Scroll to next card
                          const nextCard = document.getElementById(`card-${index + 1}`);
                          if (nextCard && cardsContainerRef.current) {
                            cardsContainerRef.current.scrollTo({
                              top: cardsContainerRef.current.scrollTop + nextCard.offsetTop - (cardsContainerRef.current.offsetTop + cardsContainerRef.current.scrollTop),
                              behavior: 'smooth'
                            });
                          }
                        }}
                        style={{
                          fontSize: '24px',
                          color: '#30B8DB',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0',
                        }}
                      >
                        ↓
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side navigation dots */}
        <div className="card-indicators" style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px 8px',
          background: 'rgba(9, 40, 75, 0.6)',
          borderRadius: '30px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(48, 184, 219, 0.15)',
          zIndex: 50,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          transform: isVisible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(20px)',
        }}>
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => {
                const targetCard = document.getElementById(`card-${index}`);
                if (targetCard && cardsContainerRef.current) {
                  cardsContainerRef.current.scrollTo({
                    top: cardsContainerRef.current.scrollTop + targetCard.offsetTop - (cardsContainerRef.current.offsetTop + cardsContainerRef.current.scrollTop),
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                width: activeCardIndex === index ? '12px' : '8px',
                height: activeCardIndex === index ? '36px' : '8px',
                borderRadius: '20px',
                background: activeCardIndex === index ? '#30B8DB' : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                border: 'none',
                padding: 0,
                boxShadow: activeCardIndex === index ? '0 0 15px rgba(48, 184, 219, 0.7)' : 'none',
                position: 'relative',
              }}
              aria-label={`View ${cards[index].title} service`}
            >
              {activeCardIndex === index && (
                <div 
                  className="tooltip" 
                  style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(9, 40, 75, 0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(48, 184, 219, 0.2)',
                    opacity: 1,
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  {card.title}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Add a marker for the next section */}
        <div id="next-section" style={{ position: 'absolute', bottom: 0, height: '1px' }}></div>

        {/* Adding the CSS that was outside of the component structure */}
        <style jsx>{`
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
          
          /* Remove scrollbar appearance but keep functionality */
          .services-cards::-webkit-scrollbar {
            display: none;
          }
          
          .services-cards {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* Responsive styles */
          @media (max-width: 1100px) {
            .services-container {
              flex-direction: column;
              height: auto;
            }
            
            .services-info {
              position: relative;
              top: 0;
              margin-bottom: 50px;
              min-width: 100%;
            }
            
            .services-cards {
              height: auto;
              max-height: none;
            }
            
            .service-card {
              height: auto !important;
              min-height: 300px !important;
            }
          }
          
          @media (max-width: 768px) {
            .services-heading {
              text-align: center;
            }
            
            .card-indicators {
              right: 10px;
            }
            
            .services-section {
              padding: 80px 4%;
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
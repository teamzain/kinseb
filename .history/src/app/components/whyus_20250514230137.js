'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const KinsebWebDevelopment = () => {
  const containerRef = useRef(null);
  const laptopScreenRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Card content data with improved semantic structure
  const cards = [
    {
      icon: "/images/web-design-icon.svg", // Updated icon names for better context
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

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1100);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Observe when component is in viewport with animation thresholds
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
          setIsVisible(false);
        }
      },
      { threshold: [0.1, 0.5, 0.9], rootMargin: '0px 0px -10% 0px' }
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

  // Auto-scroll the laptop screen image - keep this unchanged as requested
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

  // Set up IntersectionObserver for cards to implement snap scrolling (for desktop only)
  useEffect(() => {
    if (!isVisible || !cardsContainerRef.current || !isInitialized || isMobile) return;

    // Use IntersectionObserver to detect when cards are visible
    const options = {
      root: cardsContainerRef.current,
      rootMargin: '0px',
      threshold: 0.7, // Card is considered visible when 70% visible
    };

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveCardIndex(cardIndex);
        }
      });
    }, options);

    // Observe all card elements
    const cardElements = cardsContainerRef.current.querySelectorAll('.service-card');
    cardElements.forEach(card => {
      cardObserver.observe(card);
    });

    return () => {
      cardElements.forEach(card => {
        cardObserver.unobserve(card);
      });
    };
  }, [isVisible, isInitialized, isMobile]);

  // For mobile devices - add animation to cards as they come into view
  useEffect(() => {
    if (!isVisible || !isMobile) return;

    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.15, // Trigger when 15% visible
    };

    const cardObserverMobile = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          const cardIndex = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveCardIndex(cardIndex);
        }
      });
    }, options);

    // Observe all card elements
    const cardElements = document.querySelectorAll('.service-card');
    cardElements.forEach(card => {
      cardObserverMobile.observe(card);
    });

    return () => {
      cardElements.forEach(card => {
        cardObserverMobile.unobserve(card);
      });
    };
  }, [isVisible, isMobile]);

  // Handle scroll events for the cards container (desktop)
  useEffect(() => {
    if (!isVisible || !cardsContainerRef.current || isMobile) return;

    const handleScroll = () => {
      if (!cardsContainerRef.current) return;

      // Check if we've reached the last card and scrolled past it
      const container = cardsContainerRef.current;
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
      
      if (isAtBottom && activeCardIndex === cards.length - 1 && !hasReachedEnd) {
        setHasReachedEnd(true);
        // Go to next section
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
          setTimeout(() => {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }
      } else if (!isAtBottom) {
        setHasReachedEnd(false);
      }
    };

    const cardsContainer = cardsContainerRef.current;
    cardsContainer.addEventListener('scroll', handleScroll);
    
    // Set initialized state to true after a short delay to let layout settle
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isVisible, activeCardIndex, cards.length, hasReachedEnd, isMobile]);

  // Handle keyboard navigation (only when not mobile)
  useEffect(() => {
    if (!isVisible || isMobile) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        
        if (activeCardIndex < cards.length - 1) {
          const nextCard = document.getElementById(`card-${activeCardIndex + 1}`);
          if (nextCard && cardsContainerRef.current) {
            nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (activeCardIndex === cards.length - 1) {
          // Go to next section
          const nextSection = document.getElementById('next-section');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        
        if (activeCardIndex > 0) {
          const prevCard = document.getElementById(`card-${activeCardIndex - 1}`);
          if (prevCard && cardsContainerRef.current) {
            prevCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, activeCardIndex, cards.length, isMobile]);

  return (
    <>
      {/* Enhanced SEO Optimizations */}
      <Head>
        <title>Professional Web Development Services | Kinseb Web Design and Development</title>
        <meta name="description" content="Kinseb Web Development offers custom web design, performance optimization, and growth-focused solutions that drive traffic, boost engagement, and maximize ROI for your business." />
        <meta name="keywords" content="web development, custom website design, SEO optimization, website performance, responsive design, web growth solutions, web maintenance, professional web services" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Expert Web Development Services | Kinseb Web Development" />
        <meta property="og:description" content="Transform your online presence with our custom web design, performance optimization, and growth-focused solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kinseb.com/services" />
        <meta property="og:image" content="https://kinseb.com/images/kinseb-services-og.jpg" />
        <meta property="og:site_name" content="Kinseb Web Development" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Web Development Services | Kinseb" />
        <meta name="twitter:description" content="Custom websites designed to drive traffic, engagement, and conversions for your business." />
        <meta name="twitter:image" content="https://kinseb.com/images/kinseb-services-twitter.jpg" />
        
        {/* Canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href="https://kinseb.com/services" />
        
        {/* Mobile viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Additional helpful SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kinseb Web Development" />
        <meta name="geo.region" content="US" /> {/* Update with your region */}
        <meta name="geo.placename" content="Chicago" /> {/* Update with your location */}
        <meta httpEquiv="Content-Language" content="en" />
        
        {/* Favicon links - important for brand recognition */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      {/* Structured data for rich search results */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Web Development Services by Kinseb",
            "description": "Professional web development services including custom design, performance optimization, and growth solutions.",
            "url": "https://kinseb.com/services",
            "provider": {
              "@type": "Organization",
              "name": "Kinseb Web Development",
              "url": "https://kinseb.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kinseb.com/images/logo.png"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-123-4567",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English"
              }
            },
            "offers": {
              "@type": "AggregateOffer",
              "name": "Web Development Services",
              "priceCurrency": "USD",
              "lowPrice": "1000",
              "highPrice": "10000",
              "offerCount": "6"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": cards.map((card, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": card.title,
                "description": card.description
              }))
            }
          })
        }}
      />
      
      <section 
        ref={containerRef}
        id="services-section"
        aria-label="Kinseb Web Development Services"
        className="services-section"
        style={{
          backgroundColor: '#061E3C',
          color: 'white',
          padding: isMobile ? '80px 5% 60px' : '120px 5%',
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
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '50px' : '40px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          height: isMobile ? 'auto' : 'calc(100vh - 240px)', // Subtract the padding
        }}>
          {/* Left side - Fixed position while scrolling on desktop, stacked first on mobile */}
          <div className="services-info" style={{
            flex: isMobile ? 'auto' : '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? 'auto' : '100px',
            zIndex: 2,
            minWidth: isMobile ? '100%' : '45%',
            height: 'fit-content',
            alignSelf: 'flex-start',
            paddingRight: isMobile ? '0' : '20px',
            marginBottom: isMobile ? '20px' : '0',
            width: '100%',
          }}>
            <div className="services-heading" style={{
              marginBottom: '40px',
              position: 'relative',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: isMobile ? 'center' : 'left',
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

            {/* Laptop with screen showing website - keep unchanged as requested */}
            <div className="laptop-container" style={{
              position: 'relative',
              width: '100%',
              maxWidth: isMobile ? '90%' : '500px',
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

          {/* Right side - Cards with scroll snapping on desktop, vertical stack on mobile */}
          <div 
            ref={cardsContainerRef}
            className="services-cards-container" 
            style={{
              flex: isMobile ? 'auto' : '1 1 500px',
              height: isMobile ? 'auto' : '100%',
              position: 'relative',
              overflowY: isMobile ? 'visible' : 'auto',
              scrollSnapType: isMobile ? 'none' : 'y mandatory',
              scrollBehavior: 'smooth',
              scrollPaddingTop: '20px',
              msOverflowStyle: 'none', /* IE and Edge */
              scrollbarWidth: 'none', /* Firefox */
              width: '100%',
            }}
          >
            {/* CSS styles moved to the single global styled-jsx section at the bottom */}
            
            {/* Card Container */}
            <div className="services-cards">
              {cards.map((card, index) => (
                <div 
                  key={index}
                  className="service-card"
                  data-index={index}
                  style={{
                    backgroundColor: 'rgba(9, 40, 75, 0.75)',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(48, 184, 219, 0.2)',
                    border: '1px solid rgba(48, 184, 219, 0.3)',
                    backdropFilter: 'blur(10px)',
                    minHeight: isMobile ? 'auto' : 'calc(100vh - 340px)',
                    maxHeight: isMobile ? 'none' : '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    marginBottom: '20px',
                    scrollSnapAlign: isMobile ? 'none' : 'start',
                    scrollSnapStop: isMobile ? 'none' : 'always',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    opacity: 1, // Show all cards with full opacity
                    transform: 'scale(1)', // Show all cards at full size
                  }}
                  id={`card-${index}`}
                  tabIndex={activeCardIndex === index ? 0 : -1}
                  aria-hidden="false" /* Make all cards visible to screen readers */
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
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 0 10px rgba(48, 184, 219, 0.4)',
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
                  
                  {/* Card indicator and progress - show only on desktop */}
                  {!isMobile && (
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
                      
                      {/* Navigation arrows - desktop only */}
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {index > 0 && (
                          <button
                            aria-label={`Go to ${cards[index - 1].title}`}
                            onClick={() => {
                              setActiveCardIndex(index - 1);
                              const prevCard = document.getElementById(`card-${index - 1}`);
                              if (prevCard && cardsContainerRef.current) {
                                prevCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                            style={{
                              fontSize: '20px',
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
                            ↑
                          </button>
                        )}
                        {index < cards.length - 1 && (
                          <button
                            aria-label={`Go to ${cards[index + 1].title}`}
                            onClick={() => {
                              setActiveCardIndex(index + 1);
                              const nextCard = document.getElementById(`card-${index + 1}`);
                              if (nextCard && cardsContainerRef.current) {
                                nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                            style={{
                              fontSize: '20px',
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side navigation dots - show only on desktop */}
        {!isMobile && (
          <div className="card-indicators" style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: isVisible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(20px)',
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
          }}>
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCardIndex(index);
                  const targetCard = document.getElementById(`card-${index}`);
                  if (targetCard && cardsContainerRef.current) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        )}

        {/* Message indicator for scrolling - show only on desktop and not at the last card */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isVisible && activeCardIndex < cards.length - 1 ? 0.8 : 0,
            transition: 'opacity 0.4s ease',
          }}>
            <span>Scroll to discover more</span>
            <span style={{ fontSize: '20px', animation: 'bounce 1.5s infinite'}}>↓</span>
          </div>
        )}

        {/* Add a marker for the next section */}
        <div id="next-section" style={{ position: 'absolute', bottom: 0, height: '1px' }}></div>

        {/* Adding the CSS for animations and responsive behavior */}
        <style jsx global>{`
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
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          /* Scroll snap styles for card container */
          .services-cards-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .services-cards-container::-webkit-scrollbar {
            display: none;
          }
          
          /* Card animations */
          .service-card {
            opacity: ${isMobile ? 0 : 1}; /* Show all cards with full opacity on desktop */
            transform: ${isMobile ? 'translateY(20px)' : 'scale(1)'}; /* Show all cards at full size on desktop */
            transition: opacity 0.6s ease, transform 0.6s ease;
            will-change: transform, opacity;
          }
          
          .card-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
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
              padding-right: 0;
            }
            
            .services-cards-container {
              height: auto;
              max-height: none;
              overflow: visible;
              scroll-snap-type: none;
            }
            
            .service-card {
              min-height: auto !important;
              scroll-snap-align: none;
              margin-bottom: 25px !important;
              transform: translateY(20px);
              opacity: 0;
            }
            
            .card-visible {
              transform: translateY(0);
              opacity: 1;
            }
            
            .card-indicators {
              display: none !important;
            }
          }
          
          @media (max-width: 768px) {
            .services-heading {
              text-align: center;
            }
            
            .services-section {
              padding: 80px 4%;
            }
            
            .laptop-container {
              max-width: 80% !important;
            }
            
            .service-card {
              padding: 30px !important;
            }
          }
          
          @media (max-width: 480px) {
            .services-section {
              padding: 60px 20px;
            }
            
            .service-card {
              padding: 25px 20px !important;
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
        `}</style>
      </section>
    </>
  );
};

export default KinsebWebDevelopment;
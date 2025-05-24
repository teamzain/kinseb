"use client"
import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Check on window resize
    window.addEventListener('resize', checkMobile);
    
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);
  
  // Handle video loaded event
  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };
  
  // Fixed video paths - removed 'public' from the desktop path
  const desktopVideo = "/video.mp4";
  const mobileVideo = "/videos/mobile-video.mp4";
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      // Increased height for mobile screens
      height: isMobile ? '94vh' : '91vh',
      overflow: 'hidden'
    }}>
      {/* Background Video */}
      <video 
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoaded}
      >
        {/* Use different video source based on screen size */}
        <source src={isMobile ? mobileVideo : desktopVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'black',
        opacity: 0.6,
        zIndex: 1
      }}></div>
      
      {/* Bottom left corner gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '33.333%',
        height: '33.333%',
        background: 'linear-gradient(to top right, rgba(6, 182, 212, 0.3), transparent)',
        zIndex: 2
      }}></div>
      
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: isMobile ? '2rem' : '3rem' // Adjusted padding for mobile
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0',
          padding: '0 2rem',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
          {/* Text content - always aligned left */}
          <div style={{
            maxWidth: '46rem',
            margin: '0',
            textAlign: 'left',
            paddingLeft: '1rem'
          }}>
            {/* Your Web Development Provider text */}
            <p style={{
              color: 'rgb(34, 211, 238)',
              fontWeight: 500,
              marginBottom: '1rem',
              letterSpacing: '0.05em',
              fontSize: isMobile ? '0.875rem' : '1rem',
              textTransform: 'uppercase',
              transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 700ms, opacity 700ms',
              transitionDelay: '200ms'
            }}>
              YOUR WEB DEVELOPMENT PROVIDER
            </p>
            
            {/* Main Heading - Combined into a single line */}
            <div style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 700ms, opacity 700ms',
              transitionDelay: '400ms'
            }}>
              <h1 style={{
                fontSize: isMobile ? '2.25rem' : '4rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: 1.2
              }}>
                {isMobile ? (
                  <>
                    Building <span style={{ color: 'rgb(34, 211, 238)' }}>Websites</span>
                    <br />That Drive Growth
                  </>
                ) : (
                  <>
                    Building <span style={{ color: 'rgb(34, 211, 238)' }}>Websites</span>{' '}
                     That 
                    <br />Drive Growth
                  </>
                )}
              </h1>
            </div>
            
            {/* Description text */}
            <p style={{
              color: 'rgb(229, 231, 235)',
              maxWidth: '36rem',
              marginBottom: '2rem',
              fontSize: isMobile ? '1rem' : '1.125rem',
              transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 700ms, opacity 700ms',
              transitionDelay: '600ms'
            }}>
              From startups to enterprises, we build responsive, SEO-optimized 
              websites. Let your brand stand out with designs tailored for results.
            </p>
            
            {/* Buttons - Modified to ensure they stay in one line on mobile */}
            <div style={{
              display: 'flex',
              flexWrap: isMobile ? 'nowrap' : 'wrap', // Prevent wrapping on mobile
              gap: isMobile ? '0.5rem' : '1rem', // Reduced gap on mobile
              justifyContent: 'flex-start',
              transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 700ms, opacity 700ms',
              transitionDelay: '800ms'
            }}>
              <button style={{
                padding: isMobile ? '0.75rem 1rem' : '0.75rem 1.5rem', // Reduced padding on mobile
                border: '2px solid rgb(34, 211, 238)',
                color: 'rgb(34, 211, 238)',
                fontWeight: 500,
                borderRadius: '0.25rem',
                transition: 'background-color 300ms, color 300ms',
                fontSize: isMobile ? '0.875rem' : '1rem', // Smaller font on mobile
                whiteSpace: 'nowrap' // Prevent text wrapping
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(34, 211, 238)';
                e.currentTarget.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'rgb(34, 211, 238)';
              }}>
                See Our Work
              </button>
              <button style={{
                padding: isMobile ? '0.75rem 1rem' : '0.75rem 1.5rem', // Reduced padding on mobile
                backgroundColor: 'rgb(34, 211, 238)',
                color: 'black',
                fontWeight: 500,
                borderRadius: '0.25rem',
                border: 'none',
                transition: 'background-color 300ms',
                fontSize: isMobile ? '0.875rem' : '1rem', // Smaller font on mobile
                whiteSpace: 'nowrap' // Prevent text wrapping
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(6, 182, 212)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(34, 211, 238)';
              }}>
                Request A Quote
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom text with decorative lines */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '1.5rem' : '2rem', // Adjusted for mobile
          left: 0,
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontSize: '0.875rem',
          transform: isVisible ? 'translateY(0)' : 'translateY(1.25rem)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 700ms, opacity 700ms',
          transitionDelay: '1000ms'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            <span style={{
              display: isMobile ? 'none' : 'block',
              height: '1px',
              width: '3rem',
              backgroundColor: 'rgba(34, 211, 238, 0.6)'
            }}></span>
            <p>Built With Industry-Leading Technologies</p>
            <span style={{
              display: isMobile ? 'none' : 'block',
              height: '1px',
              width: '3rem',
              backgroundColor: 'rgba(34, 211, 238, 0.6)'
            }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
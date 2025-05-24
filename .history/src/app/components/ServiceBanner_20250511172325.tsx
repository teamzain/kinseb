'use client';

import { useEffect, useRef, useState } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';
import { CSSProperties } from 'react';

// Initialize fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Handle responsive styles based on window width
  const getResponsiveStyles = (width: number): {
    subtitleStyles: CSSProperties,
    titleStyles: CSSProperties,
    buttonContainerStyles: CSSProperties
  } => {
    return {
      subtitleStyles: {
        fontSize: width < 768 ? '20px' : '25px',
      },
      titleStyles: {
        fontSize: width < 768 ? '32px' : width < 1024 ? '48px' : '65px',
        lineHeight: width < 768 ? '1.3' : width < 1024 ? '1.2' : '98px',
      },
      buttonContainerStyles: {
        flexDirection: width < 768 ? 'column' : 'row' as 'column' | 'row',
      }
    };
  };

  // Get responsive styles
  const responsive = getResponsiveStyles(windowWidth);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    // Window resize handler
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Only add listeners on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Base styles
  const bannerStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '750px',
    margin: '0 auto',
    overflow: 'hidden',
    background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -28.61%, #04091D 210%)',
    border: '1px solid #000000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: 'all 1000ms ease-in-out',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(16px)'
  };

  const overlayStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
  };

  const gradientOverlayStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 0%, #04091D 100%)',
    zIndex: 10,
  };

  const contentContainerStyles: CSSProperties = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0 16px',
  };

  const subtitleStyles: CSSProperties = {
    color: '#0D94BB',
    textAlign: 'center',
    marginBottom: '16px',
    transition: 'all 700ms ease-out 300ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '38px',
    ...responsive.subtitleStyles
  };

  const titleStyles: CSSProperties = {
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: '1200px',
    marginBottom: '48px',
    transition: 'all 700ms ease-out 500ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
    fontStyle: 'normal',
    fontWeight: 600,
    ...responsive.titleStyles
  };

  const buttonContainerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    transition: 'all 700ms ease-out 700ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
    ...responsive.buttonContainerStyles
  };

  const primaryButtonStyles: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    padding: '12px 32px',
    backgroundColor: '#0D98BA',
    color: '#04091D',
    borderRadius: '6px',
    border: '2px solid #0D98BA',
    transition: 'all 300ms',
    cursor: 'pointer',
  };

  const secondaryButtonStyles: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    padding: '12px 32px',
    backgroundColor: 'transparent',
    color: '#0D98BA',
    borderRadius: '6px',
    border: '2px solid #0D98BA',
    transition: 'all 300ms',
    cursor: 'pointer',
  };

  const imageContainerStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%'
  };

  // Button hover state handlers
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  return (
    <div ref={bannerRef} style={bannerStyles}>
      {/* Background image with overlay */}
      <div style={overlayStyles}>
        <div style={gradientOverlayStyles}></div>
        {/* Replace with your actual image path */}
        <div style={imageContainerStyles}>
          <Image 
            src="/images/service-bg.png"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div style={contentContainerStyles}>
        {/* Subtitle */}
        <div 
          className={poppins.className}
          style={subtitleStyles}
        >
          From Idea to Execution
        </div>

        {/* Main Title */}
        <h1 
          className={poppins.className}
          style={titleStyles}
        >
          Crafting <span style={{ color: '#0D94BB' }}>Powerful</span> Web Experiences 
          {windowWidth < 768 ? ' ' : <br />} That Convert & Perform
        </h1>

        {/* Buttons */}
        <div style={buttonContainerStyles}>
          {/* Primary Button */}
          <button 
            className={lato.className}
            style={{
              ...primaryButtonStyles,
              backgroundColor: isPrimaryHovered ? 'rgba(13, 152, 186, 0.9)' : '#0D98BA'
            }}
            onMouseEnter={() => setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
          >
            Speak With Our Experts
          </button>

          {/* Secondary Button */}
          <button 
            className={lato.className}
            style={{
              ...secondaryButtonStyles,
              backgroundColor: isSecondaryHovered ? 'rgba(13, 152, 186, 0.1)' : 'transparent'
            }}
            onMouseEnter={() => setIsSecondaryHovered(true)}
            onMouseLeave={() => setIsSecondaryHovered(false)}
          >
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

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
  const bannerRef = useRef(null);

  useEffect(() => {
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

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  const bannerStyles = {
    position: 'relative',
    width: '100%',
    height: '660px',
    margin: '0 auto',
    overflow: 'hidden',
    background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -28.61%, #04091D 210%)',
    border: '1px solid #000000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: 'all 1000ms ease-in-out',
    opacity: isVisible ? '1' : '0',
    transform: isVisible ? 'translateY(0)' : 'translateY(16px)'
  };

  const overlayStyles = {
    position: 'absolute',
    inset: '0',
    zIndex: '0',
  };

  const gradientOverlayStyles = {
    position: 'absolute',
    inset: '0',
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 0%, #04091D 100%)',
    zIndex: '10',
  };

  const contentContainerStyles = {
    position: 'relative',
    zIndex: '10',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0 16px',
  };

  const subtitleStyles = {
    color: '#0D94BB',
    textAlign: 'center',
    marginBottom: '16px',
    transition: 'all 700ms ease-out 300ms',
    opacity: isVisible ? '1' : '0',
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
  };

  const titleStyles = {
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: '1200px',
    marginBottom: '48px',
    transition: 'all 700ms ease-out 500ms',
    opacity: isVisible ? '1' : '0',
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
  };

  const buttonContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    transition: 'all 700ms ease-out 700ms',
    opacity: isVisible ? '1' : '0',
    transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
  };

  const primaryButtonStyles = {
    fontFamily: 'inherit',
    fontWeight: '600',
    padding: '12px 32px',
    backgroundColor: '#0D98BA',
    color: '#04091D',
    borderRadius: '6px',
    border: '2px solid #0D98BA',
    transition: 'all 300ms',
    cursor: 'pointer',
  };

  const secondaryButtonStyles = {
    fontFamily: 'inherit',
    fontWeight: '600',
    padding: '12px 32px',
    backgroundColor: 'transparent',
    color: '#0D98BA',
    borderRadius: '6px',
    border: '2px solid #0D98BA',
    transition: 'all 300ms',
    cursor: 'pointer',
  };

  // Media query styles using inline media queries
  useEffect(() => {
    const handleResize = () => {
      // This is just to trigger a re-render when window size changes
      setWindowWidth(window.innerWidth);
    };

    const setWindowWidth = (width) => {
      // Update subtitle font size
      const subtitleElement = document.querySelector('.subtitle');
      if (subtitleElement) {
        if (width < 768) {
          subtitleElement.style.fontSize = '20px';
        } else {
          subtitleElement.style.fontSize = '25px';
        }
      }

      // Update title font size
      const titleElement = document.querySelector('.title');
      if (titleElement) {
        if (width < 768) {
          titleElement.style.fontSize = '32px';
          titleElement.style.lineHeight = '1.3';
        } else if (width < 1024) {
          titleElement.style.fontSize = '48px';
          titleElement.style.lineHeight = '1.2';
        } else {
          titleElement.style.fontSize = '65px';
          titleElement.style.lineHeight = '98px';
        }
      }

      // Update button container direction
      const buttonContainer = document.querySelector('.buttonContainer');
      if (buttonContainer) {
        if (width < 768) {
          buttonContainer.style.flexDirection = 'column';
        } else {
          buttonContainer.style.flexDirection = 'row';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Set initial sizes
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={bannerRef} style={bannerStyles}>
      {/* Background image with overlay */}
      <div style={overlayStyles}>
        <div style={gradientOverlayStyles}></div>
        {/* Replace with your actual image path */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image 
            src="/placeholder-banner.jpg"
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
          className={`subtitle ${poppins.className}`}
          style={{
            ...subtitleStyles,
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '38px',
          }}
        >
          From Idea to Execution
        </div>

        {/* Main Title */}
        <h1 
          className={`title ${poppins.className}`}
          style={{
            ...titleStyles,
            fontStyle: 'normal',
            fontWeight: '600',
          }}
        >
          Crafting <span style={{ color: '#0D94BB' }}>Powerful</span> Web Experiences 
          {window.innerWidth < 768 ? ' ' : <br />} That Convert & Perform
        </h1>

        {/* Buttons */}
        <div className="buttonContainer" style={buttonContainerStyles}>
          {/* Primary Button */}
          <button 
            className={lato.className}
            style={primaryButtonStyles}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(13, 152, 186, 0.9)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0D98BA'}
          >
            Speak With Our Experts
          </button>

          {/* Secondary Button */}
          <button 
            className={lato.className}
            style={secondaryButtonStyles}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(13, 152, 186, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  );
}
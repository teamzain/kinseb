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
  // State for animation and responsive handling
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const bannerRef = useRef<HTMLElement>(null);
  
  // Button hover states
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Update window width on client-side only
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 768);
    
    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setIsMobile(window.innerWidth < 768);
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    // Skip if we're server-side rendering
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only trigger animation if user has scrolled to it (not on initial load)
          if (window.scrollY > 100 || hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
          }
          // If it's in view on page load, don't animate immediately
          else {
            // Set a small delay for the first view if user hasn't scrolled
            setTimeout(() => {
              setIsInView(true);
              setHasAnimated(true);
            }, 500);
          }
          
          // Keep observing for exit/re-entry
          // observer.unobserve(entry.target);
        } else {
          // Reset animation when it's out of view (optional - comment this for one-time animation)
          // setIsInView(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-50px 0px',
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
  }, [hasAnimated]);

  // Determine responsive text content based on breakpoints
  const getResponsiveTitle = () => {
    if (windowWidth < 768) {
      return (
        <>
          Crafting <span className="highlight">Powerful</span> Web 
          Experiences That Convert & Perform
        </>
      );
    }
    
    return (
      <>
        Crafting <span className="highlight">Powerful Web</span> Experiences 
        <br /> 
        That Convert & Perform
      </>
    );
  };

  return (
    <header 
      ref={bannerRef}
      className={`hero-banner ${isInView ? 'in-view' : ''}`}
      role="banner"
      aria-label="Website main banner"
    >
      {/* Background with gradient overlay */}
      <div className="background-container">
        <div className="gradient-overlay"></div>
        <div className="image-container">
          <Image 
            src="/images/service-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Subtitle with staggered animation */}
        <p 
          className={`subtitle ${poppins.className} ${isInView ? 'animate-in' : ''}`}
          aria-hidden="false"
        >
          From Idea to Execution
        </p>

        {/* Main Title with staggered animation */}
        <h1 
          className={`title ${poppins.className} ${isInView ? 'animate-in' : ''}`}
        >
          {getResponsiveTitle()}
        </h1>

        {/* Buttons with staggered animation */}
        <div className={`button-container ${isInView ? 'animate-in' : ''}`}>
          <button 
            className={`primary-button ${lato.className}`}
            onMouseEnter={() => !isMobile && setIsPrimaryHovered(true)}
            onMouseLeave={() => !isMobile && setIsPrimaryHovered(false)}
            onFocus={() => setIsPrimaryHovered(true)}
            onBlur={() => setIsPrimaryHovered(false)}
            data-hovered={isPrimaryHovered}
          >
            Speak With Our Experts
          </button>

          <button 
            className={`secondary-button ${lato.className}`}
            onMouseEnter={() => !isMobile && setIsSecondaryHovered(true)}
            onMouseLeave={() => !isMobile && setIsSecondaryHovered(false)}
            onFocus={() => setIsSecondaryHovered(true)}
            onBlur={() => setIsSecondaryHovered(false)}
            data-hovered={isSecondaryHovered}
          >
            View Case Studies
          </button>
        </div>
      </div>

      {/* Add CSS styles */}
      <style jsx>{`
        .hero-banner {
          position: relative;
          width: 100%;
          height: 750px;
          margin: 0 auto;
          overflow: hidden;
          background: linear-gradient(270deg, rgba(0, 0, 0, 0) -28.61%, #04091D 210%);
          border: 1px solid #000000;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 600ms ease, transform 600ms ease;
        }
        
        .hero-banner.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .background-container {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 0;
        }
        
        .gradient-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(270deg, rgba(4, 9, 29, 0.7) 0%, #04091D 100%);
          z-index: 10;
        }
        
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .content-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 0 24px;
          max-width: 1440px;
          margin: 0 auto;
        }
        
        .subtitle {
          color: #0D94BB;
          text-align: center;
          margin-bottom: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 1.5;
          font-size: 25px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0ms ease, transform 0ms ease;
        }
        
        .title {
          color: #FFFFFF;
          text-align: center;
          max-width: 1200px;
          margin-bottom: 48px;
          font-style: normal;
          font-weight: 600;
          font-size: 65px;
          line-height: 1.25;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0ms ease, transform 0ms ease;
        }
        
        .highlight {
          color: #0D94BB;
          display: inline-block;
        }
        
        .button-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0ms ease, transform 0ms ease;
        }
        
        .primary-button, .secondary-button {
          font-weight: 600;
          padding: 12px 32px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 300ms ease;
          font-size: 16px;
          position: relative;
          overflow: hidden;
          outline: none;
        }
        
        .primary-button {
          background-color: #0D98BA;
          color: #04091D;
          border: 2px solid #0D98BA;
        }
        
        .primary-button:hover, 
        .primary-button:focus,
        .primary-button[data-hovered="true"] {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(13, 152, 186, 0.4);
          background: linear-gradient(90deg, #0D98BA 0%, #0AABCE 100%);
        }
        
        .primary-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(45deg);
          opacity: 0;
          transition: opacity 500ms ease;
        }
        
        .primary-button:hover::before,
        .primary-button:focus::before,
        .primary-button[data-hovered="true"]::before {
          opacity: 1;
          animation: shimmer 2s infinite;
        }
        
        .secondary-button {
          background-color: transparent;
          color: #0D98BA;
          border: 2px solid #0D98BA;
        }
        
        .secondary-button:hover,
        .secondary-button:focus,
        .secondary-button[data-hovered="true"] {
          transform: scale(1.05);
          background-color: rgba(13, 152, 186, 0.1);
          box-shadow: 0 0 15px rgba(13, 152, 186, 0.2);
        }
        
        /* Animation keyframes */
        @keyframes shimmer {
          0% {
            transform: rotate(45deg) translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: rotate(45deg) translateY(-100%);
            opacity: 0.7;
          }
          100% {
            transform: rotate(45deg) translateY(-200%);
            opacity: 0.2;
          }
        }
        
        /* Staggered animations when in view */
        .subtitle.animate-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 700ms ease 100ms, transform 700ms ease 100ms;
        }
        
        .title.animate-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 700ms ease 300ms, transform 700ms ease 300ms;
        }
        
        .button-container.animate-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 700ms ease 500ms, transform 700ms ease 500ms;
        }
        
        /* Responsive styles */
        @media (max-width: 1024px) {
          .title {
            font-size: 48px;
            line-height: 1.2;
          }
          
          .subtitle {
            font-size: 22px;
          }
        }
        
        @media (max-width: 768px) {
          .hero-banner {
            height: 650px;
          }
          
          .title {
            font-size: 36px;
            line-height: 1.3;
            margin-bottom: 32px;
          }
          
          .subtitle {
            font-size: 20px;
            margin-bottom: 12px;
          }
          
          .button-container {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
          }
          
          .primary-button, .secondary-button {
            width: 100%;
            text-align: center;
          }
          
          /* On mobile, disable hover effects and only show on tap/active */
          .primary-button:hover, .secondary-button:hover {
            transform: none;
            box-shadow: none;
          }
          
          .primary-button:active, .secondary-button:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </header>
  );
}
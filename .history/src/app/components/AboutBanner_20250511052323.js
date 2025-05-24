'use client';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Initialize fonts with better performance
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400',  '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400',  '700'],
  display: 'swap',
  variable: '--font-lato',
});

// Extracted reusable styles and constants
const COLORS = {
  primary: '#0D94BB',
  primaryDark: '#0A7A94',
  primaryLight: 'rgba(13, 148, 187, 0.7)',
  white: '#FFFFFF',
  dark: '#04091D',
  grey: '#F5F5F5',
};

const BREAKPOINTS = {
  smallMobile: 480,
  mobile: 768,
  tablet: 1024,
};

// Modified StatItem component - Smaller size
const StatItem = ({ icon, title, subtitle, highlighted = false, delay, isVisible, counter, isSmallMobile, isMobile, isTablet }) => {
  const statItemStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: isSmallMobile || isMobile ? 'auto' : 1,
    width: isSmallMobile || isMobile ? '100%' : 'auto',
    padding: isSmallMobile ? '10px' : isMobile ? '15px' : '15px', // Reduced padding

    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: isSmallMobile || isMobile ? '15px' : 0, // Reduced margin
  }), [highlighted, isSmallMobile, isMobile]);

  // Animation styles
  const animationStyle = useMemo(() => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? (isSmallMobile || isMobile) 
        ? 'translateY(0)' 
        : `translateY(${highlighted ? '-10px' : '0'})` // Reduced transform
      : 'translateY(30px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
  }), [isVisible, highlighted, delay, isSmallMobile, isMobile]);

  return (
    <div
      style={{
        ...statItemStyle,
        ...animationStyle,
      }}
      className="stat-item"
      aria-label={`${title || ''} ${subtitle}`}
    >
      <div className="stat-icon"
        style={{
          width: isSmallMobile ? '50px' : isMobile ? '60px' : isTablet ? '65px' : '120px', // Smaller icons
          height: isSmallMobile ? '50px' : isMobile ? '60px' : isTablet ? '65px' : '120px', // Smaller icons
          marginBottom: isSmallMobile ? '10px' : '12px', // Reduced margin
          position: 'relative',
          filter: highlighted ? 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2))',
        }}
      >
        <Image
          src={icon}
          alt=""
          layout="fill"
          objectFit="contain"
          aria-hidden="true"
        />
      </div>
      
      <h3 
        style={{
          fontFamily: 'var(--font-poppins)',
          fontWeight: highlighted ? '700' : '600',
          fontSize: isSmallMobile ? '22px' : isMobile ? '26px' : isTablet ? '30px' : highlighted ? '36px' : '34px', // Smaller font
          lineHeight: isSmallMobile ? '28px' : isMobile ? '32px' : isTablet ? '38px' : '44px', // Smaller line height
          textAlign: 'center',
          letterSpacing: '-0.03em',
          color: COLORS.white,
          margin: '0 0 6px 0', // Reduced margin
          textShadow: highlighted ? '0px 2px 4px rgba(0, 0, 0, 0.4)' : '0px 2px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        {counter !== undefined ? (
          <>
            <span>{counter}</span>
            <span
              style={{
                color: COLORS.primary,
                fontWeight: '700',
                display: 'inline-block',
                marginLeft: '2px',
                animation: isVisible ? 'pulse 2s infinite' : 'none',
                position: 'relative',
                textShadow: `0 0 15px ${COLORS.primaryLight}`,
              }}
            >
              +
            </span>
          </>
        ) : (
          title
        )}
      </h3>
      
      <p
        style={{
          fontFamily: 'var(--font-lato)',
          fontWeight: '600',
          fontSize: isSmallMobile ? '14px' : isMobile ? '16px' : isTablet ? '18px' : '20px', // Smaller font
          lineHeight: isSmallMobile ? '18px' : isMobile ? '20px' : isTablet ? '22px' : '24px', // Smaller line height
          textAlign: 'center',
          color: COLORS.primary,
          margin: '0',
        }}
      >
        {subtitle}
      </p>
      
      {highlighted && (
        <div
          style={{
            position: 'absolute',
            bottom: '-8px',
            width: '35%',
            height: '3px', // Smaller line
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.primary} 50%, transparent 100%)`,
            borderRadius: '2px',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// CTAButton component - Unchanged
const CTAButton = ({ text, isVisible, delay, isMobile, isSmallMobile, isTablet }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const buttonStyle = useMemo(() => ({
    width: isSmallMobile ? '180px' : isMobile ? '200px' : isTablet ? '220px' : '230px',
    height: isSmallMobile ? '42px' : isMobile ? '45px' : isTablet ? '48px' : '50px',
    background: isHovered 
      ? `linear-gradient(90deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`
      : `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
           fontFamily: 'var(--font-lato)',
           color:Black;
    position: 'relative',
    transition: 'all 0.3s ease',
    boxShadow: isHovered
      ? `0 6px 20px rgba(13, 148, 187, 0.4), 0 0 15px ${COLORS.primaryLight}`
      : `0 4px 15px rgba(13, 148, 187, 0.3), 0 0 10px ${COLORS.primaryLight}`,
    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
    opacity: isVisible ? 1 : 0,
    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
    animationDelay: `${delay}s`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }), [isHovered, isVisible, delay, isSmallMobile, isMobile, isTablet]);

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text}
    >
      <span
        style={{
          fontFamily: 'var(--font-lato)',
          fontWeight: '600',
          fontSize: isSmallMobile ? '14px' : '16px',
          lineHeight: '150%',
          textAlign: 'center',
          color: COLORS.white,
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '0 12px',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
        <svg width={isSmallMobile ? "16" : "18"} height={isSmallMobile ? "16" : "18"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
};

// Modified Banner component with the stats section moved up
const Banner = () => {
  // Banner refs and visibility state
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // State for counter animations
  const [counters, setCounters] = useState({
    projects: 0
  });
  
  // Target values for counters
  const counterTargets = {
    projects: 70
  };

  // Custom hook for responsive design using window.matchMedia
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      // Create the media query list
      const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
      
      // Set the initial value
      setTargetReached(mediaQuery.matches);
      
      // Define a callback function to handle changes
      const updateTarget = (e) => setTargetReached(e.matches);
      
      // Add the callback as a listener
      mediaQuery.addEventListener('change', updateTarget);
      
      // Clean up
      return () => mediaQuery.removeEventListener('change', updateTarget);
    }, [width]);

    return targetReached;
  };

  // Responsive breakpoints
  const isSmallMobile = useMediaQuery(BREAKPOINTS.smallMobile);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const isTablet = useMediaQuery(BREAKPOINTS.tablet);

  // Counter animation function with improved performance
  const animateCounters = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = easeOutCubic(progress); // Smoother easing function
      
      setCounters({
        projects: Math.floor(counterTargets.projects * Math.min(easedProgress, 1))
      });
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  }, [hasAnimated, counterTargets.projects]);

  // Easing function for smoother animations
  const easeOutCubic = (x) => {
    return 1 - Math.pow(1 - x, 3);
  };

  // Setting up Intersection Observer with better performance
  useEffect(() => {
    if (typeof window === 'undefined' || !bannerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Start counter animations when visible and not already animated
          if (!hasAnimated) {
            animateCounters();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Trigger when at least 20% of the element is visible
      }
    );
    
    observer.observe(bannerRef.current);
    
    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, [bannerRef, hasAnimated, animateCounters]);

  // Modified banner height to be smaller
  const bannerStyles = useMemo(() => ({
    position: 'relative',
    width: '100%',
    height: isSmallMobile ? 'auto' : isMobile ? 'auto' : isTablet ? '600px' : '650px', // Reduced height
    minHeight: isSmallMobile ? '700px' : isMobile ? '680px' : '750px', // Reduced min-height
    boxSizing: 'border-box',
    background: `linear-gradient(270deg, rgba(0, 0, 0, 0) -188.54%, rgba(1, 3, 10, 0.5) -0.99%, rgba(1, 3, 9, 0.5) 2.8%, ${COLORS.dark} 100%)`,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    paddingBottom: isSmallMobile ? '60px' : isMobile ? '40px' : '0',
  }), [isSmallMobile, isMobile, isTablet]);

  const contentContainerStyles = useMemo(() => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isSmallMobile ? '30px 15px' : isMobile ? '40px 20px' : isTablet ? '50px 40px' : '60px 60px', // Reduced padding
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }), [isSmallMobile, isMobile, isTablet]);

  const headerStyles = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: isSmallMobile ? '15px' : isMobile ? '40px' : isTablet ? '20px' : '30px', // Reduced margin
  }), [isSmallMobile, isMobile, isTablet]);

  const subtitleStyles = useMemo(() => ({
    width: isSmallMobile ? '100%' : isMobile ? '90%' : isTablet ? '80%' : '607px',
    fontFamily: 'var(--font-poppins)',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: isSmallMobile ? '16px' : isMobile ? '18px' : isTablet ? '20px' : '22px', // Smaller font
    lineHeight: isSmallMobile ? '24px' : isMobile ? '26px' : isTablet ? '28px' : '32px', // Smaller line height
    textAlign: 'center',
    color: COLORS.primary,
    margin: '20px auto',
    padding: '5px 14px', // Reduced padding

    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
  }), [isSmallMobile, isMobile, isTablet, isVisible]);

  const headingStyles = useMemo(() => ({
    width: isSmallMobile ? '100%' : isMobile ? '100%' : isTablet ? '90%' : '1000px',
    fontFamily: 'var(--font-poppins)',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: isSmallMobile ? '28px' : isMobile ? '30px' : isTablet ? '42px' : '55px', // Smaller font
    lineHeight: isSmallMobile ? '36px' : isMobile ? '40px' : isTablet ? '60px' : '80px', // Smaller line height
    textAlign: 'center',
    color: COLORS.white,
    margin: isSmallMobile ? '15px 0 0' : isMobile ? '0px 0 0' : isTablet ? '20px 0 0' : '-30px 0 0',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
  }), [isSmallMobile, isMobile, isTablet, isVisible]);

  // Modified statsContainerStyles - Moved upward (reduced margin top)
  const statsContainerStyles = useMemo(() => ({
    display: 'flex',
    flexDirection: isSmallMobile || isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: isSmallMobile ? '100%' : isMobile ? '90%' : '1000px', // Smaller max-width
    marginTop: isSmallMobile ? '30px' : isMobile ? '40px' : isTablet ? '50px' : '70px', // Reduced margin-top
    gap: isSmallMobile ? '8px' : isMobile ? '15px' : '20px', // Reduced gap
    padding: isSmallMobile || isMobile ? '0 10px' : isTablet ? '0 20px' : '0 20px', // Reduced padding
  }), [isSmallMobile, isMobile, isTablet]);

  // Modified ctaContainerStyles - Ensured the button remains visible
  const ctaContainerStyles = useMemo(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: isSmallMobile ? '40px' : isMobile ? '50px' : isTablet ? '60px' : '80px', // Adjusted margin for better spacing after smaller stats
    position: 'relative',
    zIndex: 2,
  }), [isSmallMobile, isMobile, isTablet]);

  return (
    <section
      ref={bannerRef}
      className={`banner ${poppins.variable} ${lato.variable}`}
      style={bannerStyles}
      role="banner"
      aria-label="Company statistics and introduction"
    >
      {/* Background Image with parallax effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          transform: isVisible ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 10s ease-out',
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/about-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          quality={90}
          style={{
            filter: 'brightness(0.85)',
          }}
        />
        
        {/* Gradient overlay for better text contrast */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(4, 9, 29, 0.6) 0%, rgba(4, 9, 29, 0.3) 100%)',
            zIndex: 1,
          }}
        />
      </div>
      
      {/* Content Container - Responsive */}
      <div style={contentContainerStyles}>
        {/* Header Content */}
        <header style={headerStyles}>
          {/* Subtitle with enhanced styling */}
          <div 
            style={subtitleStyles}
            aria-label="Subtitle"
          >
            Seasoned Professionals, Proven Results
          </div>
          
          {/* Main Heading with enhanced styling */}
          <h1 style={headingStyles}>
            Your Trusted <span style={{ color: COLORS.primary, textShadow: `0 0 10px ${COLORS.primaryLight}` }}>Project</span> Partners
          </h1>
          
          {/* Decorative divider */}
          <div
            style={{
              width: '80px', // Smaller divider
              height: '3px', // Thinner line
              background: `linear-gradient(90deg, transparent 0%, ${COLORS.primary} 50%, transparent 100%)`,
              borderRadius: '2px',
              marginTop: '20px', // Reduced margin
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }}
            aria-hidden="true"
          />
        </header>
        
        {/* Stats Section - Moved upward and made smaller */}
        <div style={statsContainerStyles}>
          {/* Stat Item 1 - Proven */}
          <StatItem
            icon="/images/about2.svg"
            title="Proven"
            subtitle="Established Record"
            isVisible={isVisible}
            delay={0.6}
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          
          {/* Stat Item 2 - 70+ with counter animation */}
          <StatItem
            icon="/images/about1.svg"
            subtitle="Projects Delivered"
            highlighted={true}
            isVisible={isVisible}
            delay={0.8}
            counter={counters.projects}
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          
          {/* Stat Item 3 - Trusted */}
          <StatItem
            icon="/images/about3.svg"
            title="Trusted"
            subtitle="Partner Network"
            isVisible={isVisible}
            delay={1.0}
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
        
        {/* CTA Button - Preserved visibility */}
        <div style={ctaContainerStyles}>
          <CTAButton 
            text="Speak With Our Experts" 
            isVisible={isVisible} 
            delay={1.2}
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .banner {
          scroll-margin-top: 80px;
        }
        
        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .banner * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
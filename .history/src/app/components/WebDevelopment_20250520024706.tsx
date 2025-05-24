'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Poppins, Lato } from 'next/font/google';

// Load fonts locally
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const WebsiteDevelopmentSection = () => {
  // Animation states
  const [animated, setAnimated] = useState(false);
  
  // Intersection Observer hook - only trigger when section is 20% visible
  // Removed triggerOnce to allow repeated animations
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  // Reset animation state when not in view and set it when in view
  useEffect(() => {
    if (!inView) {
      setAnimated(false);
    } else {
      setAnimated(true);
    }
  }, [inView]);

  // Staggered animation delay values (in ms)
  const animationDelays = {
    title: 0,
    subtitle: 200,
    description: 400,
    button: 600,
    image: 300,
  };

  // Media query helper (to be used in inline styles)
  const getResponsiveStyles = useCallback(() => {
    // These would normally be in a useEffect with window.matchMedia
    // But for inline styles, we'll handle responsiveness with min/max width and clamp
    return {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
    };
  }, []);

  return (
    <section 
      ref={ref}
      aria-label="Website Maintenance Services" 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '650px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        padding: '40px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left side - Image Container with responsive sizing */}
        <div style={{
          flex: '1 1 500px',
          position: 'relative',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          overflow: 'hidden',
          transform: animated ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
          opacity: animated ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
          transitionDelay: `${animationDelays.image}ms`,
          order: getResponsiveStyles().isMobile ? 2 : 1, // Change order on mobile
        }}>
          <Image
            src="/images/about-3.png"
            alt="Multiple device screens showing website maintenance services"
            width={500}
            height={422}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
            style={{
              objectFit: 'contain',
              objectPosition: 'center',
              width: '100%',
              height: 'auto',
              maxHeight: '100%',
            }}
            priority={false}
          />
        </div>

        {/* Right side - Content Container */}
        <div style={{
          flex: '1 1 500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1rem',
          order: getResponsiveStyles().isMobile ? 1 : 2, // Change order on mobile
        }}>
          {/* Title */}
          <h2 
            className={poppins.className}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.2',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              transform: animated ? 'translateY(0)' : 'translateY(30px)',
              opacity: animated ? 1 : 0,
              transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              transitionDelay: `${animationDelays.title}ms`,
            }}
          >
      Web Development
          </h2>

          {/* Subtitle */}
          <h3 
            className={poppins.className}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
              lineHeight: '1.3',
              fontWeight: 600,
              color: '#0D98BA',
              marginBottom: '1.25rem',
              transform: animated ? 'translateY(0)' : 'translateY(30px)',
              opacity: animated ? 1 : 0,
              transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              transitionDelay: `${animationDelays.subtitle}ms`,
            }}
          >
          Developing High-Performance Websites That Scale With You
          </h3>

          {/* Description */}
          <p 
            className={lato.className}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: '1.5',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '2rem',
              maxWidth: '650px',
              transform: animated ? 'translateY(0)' : 'translateY(30px)',
              opacity: animated ? 1 : 0,
              transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              transitionDelay: `${animationDelays.description}ms`,
            }}
          >
          From frontend finesse to powerful backend systems, we build secure, scalable websites tailored to your business needs. Be it WordPress, Shopify, or custom development, our solutions are as reliable as they are refined.
          </p>

          {/* Button with improved accessibility and hover effect */}
          <button 
            aria-label="Learn more about our website maintenance services"
            className={lato.className}
            style={{
              position: 'relative',
              width: 'fit-content',
              padding: '0.75rem 1.5rem',
              background: '#0D98BA',
              color: '#04091D',
              border: '2px solid #0D98BA',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              transform: animated ? 'translateY(0)' : 'translateY(30px)',
              opacity: animated ? 1 : 0,
              transitionDelay: `${animationDelays.button}ms`,
              // Focus styles for keyboard navigation
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(13, 152, 186, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0D98BA';
              e.currentTarget.style.color = '#04091D';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 152, 186, 0.6)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#0D98BA';
              e.currentTarget.style.color = '#04091D';
            }}
            // Add keyboard interaction for better accessibility
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
              }
            }}
          >
       See Development Section
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebsiteDevelopmentSection;
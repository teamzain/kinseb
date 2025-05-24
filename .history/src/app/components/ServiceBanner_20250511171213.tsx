'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Define types for our component
interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Breakpoints {
  mobile: number;
  tablet: number;
}

const WebDevelopmentServicesSection: React.FC = () => {
  // State for animations and interactions
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Service data with icon paths, titles, and descriptions
  const services: ServiceItem[] = [
    {
      id: 'custom-development',
      icon: '/icons/code.svg',
      title: 'Custom Development',
      description: 'Tailor-made web solutions that perfectly align with your business goals and user needs.'
    },
    {
      id: 'responsive-design',
      icon: '/icons/responsive.svg',
      title: 'Responsive Design',
      description: 'Fluid layouts that adapt seamlessly to any device, ensuring optimal user experience.'
    },
    {
      id: 'performance-optimization',
      icon: '/icons/speed.svg',
      title: 'Performance Optimization',
      description: 'Speed-focused development that prioritizes fast loading times and smooth interactions.'
    },
    {
      id: 'maintenance-support',
      icon: '/icons/support.svg',
      title: 'Maintenance & Support',
      description: 'Ongoing technical support to keep your web applications running flawlessly.'
    }
  ];

  // Media query breakpoints
  const breakpoints: Breakpoints = {
    mobile: 767,
    tablet: 1023,
  };

  // Handle resize events with debounce for performance
  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Intersection Observer to trigger animations when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Determine layout based on screen size
  const isMobile = windowWidth <= breakpoints.mobile;
  const isTablet = windowWidth > breakpoints.mobile && windowWidth <= breakpoints.tablet;

  // Handle click for mobile/tablet
  const handleCardClick = useCallback((id: string): void => {
    if (isMobile || isTablet) {
      setActiveSection(activeSection === id ? null : id);
    }
  }, [activeSection, isMobile, isTablet]);

  // Render the timeline connector between cards
  const renderTimelineConnector = (): React.ReactElement => {
    // Different timeline layouts based on device size
    if (isMobile) {
      return (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}>
          {services.map((_, index) => (
            <div key={`connector-${index}`} style={{
              position: 'absolute',
              top: `${(index * 25) + 10}%`,
              height: '20%',
              width: '100%',
              background: 'linear-gradient(to bottom, rgba(13, 152, 186, 0.3), rgba(13, 152, 186, 0.8), rgba(13, 152, 186, 0.3))',
              animation: isVisible ? 'shimmer 2s infinite' : 'none',
              animationDelay: `${index * 0.2}s`,
            }} />
          ))}
        </div>
      );
    }
    
    if (isTablet) {
      return (
        <div style={{
          position: 'absolute',
          left: '0',
          right: '0',
          top: '50%',
          height: '2px',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}>
          {[0, 1].map((row) => (
            <React.Fragment key={`row-${row}`}>
              {[0, 1].map((col) => (
                <div key={`connector-${row}-${col}`} style={{
                  position: 'absolute',
                  left: `${25 + (col * 50)}%`,
                  width: '25%',
                  height: '100%',
                  background: 'linear-gradient(to right, rgba(13, 152, 186, 0.3), rgba(13, 152, 186, 0.8), rgba(13, 152, 186, 0.3))',
                  animation: isVisible ? 'shimmer 2s infinite' : 'none',
                  animationDelay: `${(row * 2 + col) * 0.2}s`,
                  top: row === 0 ? '-100px' : '100px',
                }} />
              ))}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    // Desktop timeline
    return (
      <div style={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '50%',
        height: '2px',
        transform: 'translateY(-50%)',
        zIndex: 0,
      }}>
        {services.map((_, index) => (
          <div key={`connector-${index}`} style={{
            position: 'absolute',
            left: `${(index * 25) + 6.25}%`,
            width: '18.5%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(13, 152, 186, 0.3), rgba(13, 152, 186, 0.8), rgba(13, 152, 186, 0.3))',
            animation: isVisible ? 'shimmer 2s infinite' : 'none',
            animationDelay: `${index * 0.2}s`,
          }} />
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: isMobile ? '60px 20px' : isTablet ? '80px 40px' : '100px 60px',
        backgroundImage: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -28.61%, #04091D 210%), url(/background.jpg), linear-gradient(270deg, rgba(4, 9, 29, 0) 0%, #04091D 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div style={{
        marginBottom: isMobile ? '40px' : '60px',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <h3 style={{
          color: '#0D94BB',
          fontFamily: 'Poppins, sans-serif',
          fontSize: isMobile ? '18px' : isTablet ? '22px' : '25px',
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          From Idea to Execution
        </h3>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: isMobile ? '32px' : isTablet ? '48px' : '65px',
          fontWeight: 600,
          lineHeight: isMobile ? '1.3' : '1.5',
          margin: '0 auto',
          maxWidth: '1249px',
        }}>
          <span>Crafting </span>
          <span style={{ color: '#0D98BA' }}>Powerful </span>
          <span>Web Experiences</span>
          <br />
          <span>That Convert & Perform</span>
        </h2>
      </div>

      {/* Service cards container */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: isTablet ? 'wrap' : 'nowrap',
        justifyContent: 'space-between',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '30px 0' : '50px 0',
      }}>
        {/* Timeline connector */}
        {renderTimelineConnector()}

        {/* Service cards */}
        {services.map((service, index) => {
          const isHovered = hoveredSection === service.id;
          const isActive = activeSection === service.id;
          const shouldShowButton = (!isMobile && !isTablet && isHovered) || ((isMobile || isTablet) && isActive);
          
          return (
            <div
              key={service.id}
              style={{
                width: isMobile ? '100%' : isTablet ? 'calc(50% - 20px)' : 'calc(25% - 20px)',
                padding: '24px',
                marginBottom: isMobile ? '30px' : isTablet ? '40px' : '0',
                backgroundColor: (isHovered || isActive) ? 'rgba(13, 152, 186, 0.1)' : 'transparent',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 0.1}s`,
                transitionProperty: 'opacity, transform, background-color',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: isMobile ? 'auto' : '280px',
              }}
              onMouseEnter={() => !isMobile && !isTablet && setHoveredSection(service.id)}
              onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
              onClick={() => handleCardClick(service.id)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(service.id);
                  e.preventDefault();
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
            >
              {/* Service icon */}
              <div style={{
                width: '60px',
                height: '60px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(13, 152, 186, 0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {/* We're using a placeholder for the icon since actual SVGs aren't provided */}
                  <div style={{
                    width: '30px',
                    height: '30px',
                    backgroundImage: `url(${service.icon})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }} />
                </div>
              </div>

              {/* Service title */}
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: isMobile ? '20px' : '22px',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#FFFFFF',
              }}>
                {service.title}
              </h3>

              {/* Service description */}
              <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '24px',
                flex: 1,
              }}>
                {service.description}
              </p>

              {/* View Service button */}
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  border: '2px solid #0D98BA',
                  borderRadius: '6px',
                  color: '#0D98BA',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: shouldShowButton ? 1 : 0,
                  transform: shouldShowButton ? 'translateY(0)' : 'translateY(10px)',
                  pointerEvents: shouldShowButton ? 'auto' : 'none',
                  marginTop: 'auto',
                }}
                aria-hidden={!shouldShowButton}
              >
                View Service
              </button>
            </div>
          );
        })}
      </div>

      {/* Call to action buttons */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '16px' : '24px',
        marginTop: '50px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        transitionDelay: '0.4s',
      }}>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#0D98BA',
          border: '2px solid #0D98BA',
          borderRadius: '6px',
          color: '#04091D',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: isMobile ? '100%' : 'auto',
          minWidth: '200px',
        }}>
          Speak With Our Experts
        </button>
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'transparent',
          border: '2px solid #0D98BA',
          borderRadius: '6px',
          color: '#0D98BA',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: isMobile ? '100%' : 'auto',
          minWidth: '160px',
        }}>
          View Case Studies
        </button>
      </div>

      {/* CSS keyframes for shimmer effect */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
};

export default WebDevelopmentServicesSection;
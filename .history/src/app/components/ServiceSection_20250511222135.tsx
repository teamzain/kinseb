'use client';

// src/app/components/DesignExperienceSection.tsx
import React, { useEffect, useRef, useState } from 'react';

interface ServiceItemProps {
  title: string;
  description: string;
}

interface DesignExperienceSectionProps {
  ctaText?: string;
}

const DesignExperienceSection: React.FC<DesignExperienceSectionProps> = ({ 
  ctaText = "Explore Web Design Services" 
}) => {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Array of service items with unique content
  const serviceItems: ServiceItemProps[] = [
    { title: "Responsive Design", description: "Creating websites that look great on all devices and screen sizes." },
    { title: "User Experience", description: "Designing intuitive interfaces that guide users toward conversion." },
    { title: "Visual Identity", description: "Crafting memorable brand experiences through consistent visuals." },
    { title: "Conversion Optimization", description: "Enhancing user flows to improve conversion rates." },
    { title: "Interactive Elements", description: "Building engaging components that elevate user experience." },
    { title: "Accessibility", description: "Ensuring designs are usable for all, including those with disabilities." },
  ];

  // Animation on scroll into view
  useEffect(() => {
    // Intersection Observer setup
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section comes into view, set visible state to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    // Start observing when component mounts
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Updated design word stack configuration - using the styles from DesignWordPreview
  const designWords = [
    { color: '#0D98BA', opacity: 1, textShadow: '0 0 2px rgba(13, 152, 186, 0.8)', stroke: 'none', top: '0px' },
    { color: 'transparent', opacity: 0.8, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.7)', top: '36px' },
    { color: 'transparent', opacity: 0.6, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.7)', top: '72px' },
    { color: 'transparent', opacity: 0.4, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.5)', top: '108px' },
    { color: 'transparent', opacity: 0.25, textShadow: 'none', stroke: '1px rgba(255, 255, 255, 0.3)', top: '144px' },
  ];

  return (
    <div ref={sectionRef} style={styles.designContainer}>
      {/* Stacked "DESIGN" words - Updated with new styling */}
      <div 
        style={styles.designWordStack}
        className={isVisible ? 'animate-fade-in' : ''}
      >
        {designWords.map((design, index) => (
          <span 
            key={index} 
            style={{
              ...styles.designWord,
              color: design.color,
              top: design.top,
              opacity: design.opacity,
              textShadow: design.textShadow,
              animation: isVisible ? `fadeIn 0.5s ease ${index * 0.1}s forwards` : 'none',
              WebkitTextStroke: design.stroke,
            }}
            aria-hidden="true" // Hide from screen readers as this is decorative
          >
            DESIGN
          </span>
        ))}
      </div>

      {/* Main content section */}
      <div 
        style={{
          ...styles.contentSection,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Main heading with fade-in + slide-up animation */}
        <h2 
          style={{
            ...styles.mainHeading,
            animation: isVisible ? 'fadeInUp 0.8s ease forwards' : 'none',
          }}
        >
          Designing experiences for conversion and expansion
        </h2>
        
        {/* Blue divider */}
        <div 
          style={{
            ...styles.blueDivider,
            width: isVisible ? '100%' : '0%',
            transition: 'width 1s ease 0.3s',
          }}
        ></div>
        
        {/* Services grid with slide-in animation */}
        <div 
          style={{
            ...styles.servicesGrid,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          {serviceItems.map((item, index) => (
            <div 
              key={index} 
              style={styles.serviceItem}
              className="service-item-hover"
              tabIndex={0} // Make focusable for keyboard navigation
            >
              <h3 style={styles.serviceTitle}>{item.title}</h3>
              <p style={styles.serviceDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button with fade-in animation */}
      <button 
        style={{
          ...styles.ctaButton,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s, background-color 0.3s ease',
        }}
        aria-label={ctaText}
        className="cta-button-hover"
      >
        <span style={styles.buttonText}>{ctaText}</span>
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: ${isVisible ? 1 : 0}; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .service-item-hover {
          transition: all 0.3s ease;
        }
        
        .service-item-hover:hover, .service-item-hover:focus {
          background: rgba(13, 152, 186, 0.25);
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .cta-button-hover:hover, .cta-button-hover:focus {
          background-color: #10b0d8 !important;
          transform: scale(1.05) !important;
          box-shadow: 0 5px 15px rgba(13, 152, 186, 0.3);
        }
        
        @media (max-width: 768px) {
          .service-item-hover:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

// Inline styles as JavaScript objects for App Router compatibility
const styles = {
  designContainer: {
    position: 'relative' as const,
    width: '100%',
    minHeight: '750px',
    background: 'linear-gradient(180deg, #04091D 0%, #051032 60%, #072047 100%)',
    padding: 0,
    overflow: 'hidden' as const,
    fontFamily: "'Poppins', 'Barlow', 'Lato', sans-serif",
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
  },
  designWordStack: {
    position: 'relative' as const,
    width: '258px',
    height: '300px',
    marginLeft: '74px',
    marginTop: '4px',
    zIndex: 1,
  },
  designWord: {
    position: 'absolute' as const,
    width: '258px',
    height: '98px',
    fontStyle: 'normal' as const,
    fontWeight: 900,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '0.03em',
    color: 'transparent',
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    textTransform: 'uppercase' as const,
  },
  contentSection: {
    position: 'absolute' as const,
    top: '74px',
    left: '377px',
    width: '983px',
    zIndex: 2,
  },
  mainHeading: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '56px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '30px',
    opacity: 0,
  },
  blueDivider: {
    width: '0%',
    height: '4px',
    background: '#0D98BA',
    borderRadius: '10px',
    marginBottom: '40px',
    transition: 'width 1s ease',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  serviceItem: {
    background: 'rgba(13, 152, 186, 0.1)',
    borderRadius: '10px',
    padding: '25px',
    position: 'relative' as const,
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(13, 152, 186, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  serviceTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '32px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 10px 0',
    padding: 0,
  },
  serviceDescription: {
    fontFamily: "'Barlow', sans-serif",
    fontStyle: 'normal' as const,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 0,
  },
  ctaButton: {
    position: 'absolute' as const,
    width: '260px',
    height: '50px',
    left: '74px',
    bottom: '50px',
    background: '#0D98BA',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(13, 152, 186, 0.2)',
    transition: 'all 0.3s ease',
  },
  buttonText: {
    fontFamily: "'Lato', sans-serif",
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    textAlign: 'center' as const,
    color: '#FFFFFF',
  },
  
  // Add media queries for responsive design
  '@media (max-width: 1440px)': {
    contentSection: {
      width: 'calc(100% - 430px)',
    },
    servicesGrid: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
    },
  },
  '@media (max-width: 992px)': {
    designWordStack: {
      marginLeft: '40px',
      marginTop: '4px',
    },
    contentSection: {
      position: 'relative' as const,
      top: '30px',
      left: '40px',
      width: 'calc(100% - 80px)',
    },
    mainHeading: {
      fontSize: '42px',
      lineHeight: '48px',
    },
    servicesGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    ctaButton: {
      left: '40px',
    },
  },
  '@media (max-width: 768px)': {
    designWordStack: {
      marginLeft: '20px',
      marginTop: '3px',
      height: '200px',
    },
    designWord: {
      fontSize: '50px',
      lineHeight: '70px',
    },
    contentSection: {
      left: '20px',
      width: 'calc(100% - 40px)',
      marginTop: '200px',
    },
    mainHeading: {
      fontSize: '32px',
      lineHeight: '40px',
    },
    servicesGrid: {
      gridTemplateColumns: '1fr',
    },
    ctaButton: {
      position: 'relative' as const,
      left: '20px',
      marginTop: '30px',
      width: '90%',
      maxWidth: '280px',
      height: '55px', // Larger touch target for mobile
    },
  },
};

export default DesignExperienceSection;
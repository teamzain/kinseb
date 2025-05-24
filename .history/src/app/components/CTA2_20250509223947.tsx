'use client';


import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import { Poppins, Lato } from 'next/font/google';

// Font optimization with next/font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export default function ProjectCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px',
      }
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

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '350px',
    background: `
      linear-gradient(0deg, rgba(4, 9, 29, 0.08) 62.29%, rgba(4, 9, 29, 0.4) 100%), 
      linear-gradient(0deg, rgba(0, 0, 0, 0.6) -15.43%, rgba(0, 0, 0, 0) 123.66%), 
      url(/abstract-background-with-low-poly-design.jpg)
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
  };

  const headingStyle: CSSProperties = {
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    maxWidth: '1136px',
    margin: '0 0 20px 0',
    fontSize: 'clamp(32px, 5vw, 56px)',
    lineHeight: 1.2,
    transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
    transitionDelay: '0.2s',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  const subheadingStyle: CSSProperties = {
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    maxWidth: '1136px',
    margin: '0 0 30px 0',
    fontSize: 'clamp(24px, 3.5vw, 35px)',
    lineHeight: 1.4,
    transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
    transitionDelay: '0.4s',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  const buttonContainerStyle: CSSProperties = {
    transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
    transitionDelay: '0.6s',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  const buttonStyle: CSSProperties = {
    background: '#0D98BA',
    border: '2px solid #0D98BA',
    borderRadius: '6px',
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#04091D',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const hoverButtonStyle: CSSProperties = {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(13, 152, 186, 0.3)',
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={sectionRef} 
      style={containerStyle}
      id="project-cta"
    >
      <h1 className={poppins.className} style={headingStyle}>
        Have a <span style={{ color: '#0D98BA' }}>Project</span> in Mind?
      </h1>

      <h2 className={poppins.className} style={subheadingStyle}>
        Let's Build Something Great Together
      </h2>

      <div style={buttonContainerStyle}>
        <button 
          className={lato.className} 
          style={{
            ...buttonStyle,
            ...(isHovered ? hoverButtonStyle : {})
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Let's Talk
        </button>
      </div>
    </div>
  );
}
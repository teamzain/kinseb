'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// SVG Arrow Icon
const ArrowIcon = () => (
  <svg className="icon icon-lib-icon-arrow3" aria-hidden="true" role="img" style={{
    width: '24px',
    height: '24px',
    fill: 'currentColor',
    marginLeft: '8px',
    transition: 'transform 0.3s ease',
  }}>
    <path d="M13.025 1l8.91 8.91-8.91 8.909M0 9.91h21.935" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      strokeLinejoin="round"/>
  </svg>
);

export default function HeroSection() {
  const scrollVElements = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded state to true
    setIsLoaded(true);
    
    // Animation for vertical scrolling images
    const animationFrames = [];
    
    scrollVElements.current.forEach((el, i) => {
      if (!el) return;
      
      const direction = i % 2 === 0 ? 1 : -1;
      let position = 0;
      
      const animate = () => {
        position += 0.5 * direction;
        
        // Reset position when it gets too large for infinite scroll effect
        if (position > 1000) position = 0;
        if (position < -1000) position = 0;
        
        el.style.transform = `translateY(${position * -1}px)`;
        animationFrames[i] = requestAnimationFrame(animate);
      };
      
      animationFrames[i] = requestAnimationFrame(animate);
    });
    
    // Cleanup function to cancel animation frames
    return () => {
      animationFrames.forEach(frame => cancelAnimationFrame(frame));
    };
  }, []);

  // These are the image paths you should replace with your own images
  const columnOneImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
  ];

  const columnTwoImages = [
    '/images/7.jpg',
    '/images/2.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ];

  const columnThreeImages = [
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
  ];

  return (
    <section className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      <div className="hero-content">
        {/* Main Content Flex Container */}
        <div className="content-container">
          {/* Content Section - LEFT */}
          <div className="text-section">
            {/* Heading */}
            <div className="heading-container">
              <h1 className="subtitle">Your Web Development Provider</h1>
              
              <p className="main-title">
                <span className="text-white">Building </span>
                <span className="text-blue">Websites </span>
                <span className="text-white">That Drive Growth</span>
              </p>
              
              <div className="description">
                <p>From startups to enterprises, we build responsive, SEO-optimized websites.</p>
                <p>Let your brand stand out with designs tailored for results.</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="button-container">
              {/* See Our Work Button */}
              <Link href="/our-work/" className="btn btn-outline">
                <span>See Our Work</span>
              </Link>
              
              {/* Request A Quote Button */}
              <Link href="/request-a-quote/" className="btn btn-solid">
                <span>Request A Quote</span>
              </Link>
            </div>
          </div>
          
          {/* Images Section - RIGHT */}
          <div className="project-gallery">
            <div className="gallery-wrapper">
              <div className="gallery-columns">
                {/* Column 1 */}
                <div className="gallery-column">
                  <div 
                    className="v-scroll" 
                    ref={el => scrollVElements.current[0] = el}
                  >
                    {/* Duplicate images for infinite scroll effect */}
                    {[...columnOneImages, ...columnOneImages, ...columnOneImages].map((src, index) => (
                      <div key={`col1-${index}`} className="image-container">
                        <Image 
                          src={src}
                          alt={`Project image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="project-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="gallery-column">
                  <div 
                    className="v-scroll column-offset" 
                    ref={el => scrollVElements.current[1] = el}
                  >
                    {/* Duplicate images for infinite scroll effect */}
                    {[...columnTwoImages, ...columnTwoImages, ...columnTwoImages].map((src, index) => (
                      <div key={`col2-${index}`} className="image-container">
                        <Image 
                          src={src}
                          alt={`Project image ${index + 6}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="project-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 3 */}
                <div className="gallery-column">
                  <div 
                    className="v-scroll" 
                    ref={el => scrollVElements.current[2] = el}
                  >
                    {/* Duplicate images for infinite scroll effect */}
                    {[...columnThreeImages, ...columnThreeImages, ...columnThreeImages].map((src, index) => (
                      <div key={`col3-${index}`} className="image-container">
                        <Image 
                          src={src}
                          alt={`Project image ${index + 11}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="project-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Gradient Overlay for Images */}
              <div className="gradient-overlay"></div>
            </div>
          </div>
        </div>
        
        {/* Background Gradient */}
        <div className="background-gradient"></div>
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Raleway:wght@300;400;500;700&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #1B2C5C;
        }
        
        .hero-section {
          min-height: 100vh;
          width: 100%;
          background-color: #091135;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center bottom;
          position: relative;
          overflow: hidden;
          padding: 5vmin 0;
        }
        
        .hero-content {
          width: 100%;
          height: 100%;
          position: relative;
          color: #091135;
        }
        
        .content-container {
          display: flex;
          flex-direction: row;
          height: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 3;
        }
        
        .text-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-right: 2rem;
          z-index: 3;
          margin-top: 40px;
          min-width: 0; /* Prevent flex item from expanding beyond container */
          width: 50%;  /* Explicitly set width */
        }
        
        .heading-container {
          margin-bottom: 30px;
          width: 100%;
          text-align: left;
        }
        
        .subtitle {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1E90FF;
          margin: 0 0 10px 0;
        }
        
        .main-title {
          font-size: clamp(36px, 3.5vw + 1rem, 6rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 15px 0;
          color: #fff;
        }
        
        .text-white {
          color: #ffffff;
        }
        
        .text-blue {
          color: #1E90FF;
        }
        
        .description {
          font-size: 1rem;
          line-height: 1.6;
          font-weight: 400;
          color: #fff;
          max-width: 540px;
          margin-top: 20px;
        }
        
        .button-container {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.7em 1.4em;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        
        .btn-outline {
          color: #ffffff;
          background-color: transparent;
          border: 1px solid #1E90FF;
        }
        
        .btn-solid {
          color: #ffffff;
          background-color: #1E90FF;
          border: none;
        }
        
        .project-gallery {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          height: 100%;
          max-height: 1200px;
          width: 50%;  /* Explicitly set width */
          min-width: 0; /* Prevent flex item from expanding beyond container */
        }
        
        .gallery-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform: rotate(5deg);
          transform-origin: center center;
          padding-bottom: 20px;
        }
        
        .gallery-columns {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          gap: 1px;
        }
        
        .gallery-column {
          flex: 1;
          overflow: hidden;
          border-radius: 8px;
          min-width: 0; /* Prevent flex item from expanding beyond container */
        }
        
        .v-scroll {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 5px;
          transition: transform 0.5s ease-out;
        }
        
        .column-offset {
          margin-top: 20px; /* Offset to create staggered effect */
        }
        
        .image-container {
          width: 100%;
          height: 220px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .project-image {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to right, rgba(0, 4, 42, 0.8) 0%, rgba(0, 4, 42, 0.4) 100%);
          z-index: 2;
          pointer-events: none;
        }
        
        .background-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to top, rgba(0, 4, 42, 1) 0%, rgba(0, 4, 42, 0.9) 60%, rgba(0, 4, 42, 0.8) 100%);
          z-index: 1;
        }
        
        .loaded .text-section,
        .loaded .project-gallery {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Animation classes for smooth page load */
        .hero-section:not(.loaded) .text-section,
        .hero-section:not(.loaded) .project-gallery {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .text-section {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .project-gallery {
          transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
        }
        
        @media (max-width: 1112px) {
          body {
            font-size: 18px;
          }
          
          .hero-section {
            height: auto;
            min-height: 100vh;
          }
        }
        
        @media (max-width: 968px) {
          .content-container {
            flex-direction: column;
          }
          
          .text-section,
          .project-gallery {
            width: 100%;
            padding-right: 0;
          }
          
          .project-gallery {
            height: 600px;
            margin-top: 40px;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 20px;
          }
          
          .text-section {
            margin-top: 2rem;
          }
          
          .project-gallery {
            margin-bottom: 30px;
          }
          
          .button-container {
            flex-direction: column;
            width: 100%;
          }
          
          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
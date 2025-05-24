'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Intersection Observer to detect when the section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Optional: Add floating animation
  useEffect(() => {
    if (isVisible && cardRef.current) {
      // Add subtle floating animation to card
      const floatAnimation = () => {
        const card = cardRef.current;
        if (card) {
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const translateY = Math.sin(elapsed / 1000) * 5; // Subtle 5px movement
            card.style.transform = `translateY(${translateY}px)`;
            animationRef.current = requestAnimationFrame(animate);
          };
          const animationRef = { current: requestAnimationFrame(animate) };
          
          // Clean up animation
          return () => {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
          };
        }
      };
      
      // Start floating animation after initial entry animation completes
      const floatTimer = setTimeout(floatAnimation, 1500);
      return () => clearTimeout(floatTimer);
    }
  }, [isVisible]);

  return (
    <>
      <Head>
        <title>Elevate Your Online Presence | Professional Web Design Services</title>
        <meta name="description" content="Enhance your digital footprint with our professional web design services. Let's create a website that works as hard as you do." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="web design, online presence, digital marketing, professional website" />
        <link rel="canonical" href="https://yourwebsite.com/services" />
        <meta property="og:title" content="Elevate Your Online Presence | Professional Web Design Services" />
        <meta property="og:description" content="Enhance your digital footprint with our professional web design services. Let's create a website that works as hard as you do." />
        <meta property="og:image" content="https://yourwebsite.com/images/og-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad={(e) => { if(e.currentTarget) e.currentTarget.media='all'; }}
        />
      </Head>
      
      <section 
        ref={sectionRef} 
        className="hero-section"
        aria-label="Hero section showcasing our web design services"
      >
        <div className="container">
          <div 
            ref={cardRef}
            className={`card ${isVisible ? 'visible' : ''}`}
          >
            {/* Animated background elements */}
            <div className="animated-bg">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
            <div className="overlay"></div>
            
            <div className="card-content">
              <h1 ref={headingRef} className={`heading ${isVisible ? 'animate-heading' : ''}`}>
                Ready To <span className="highlight">Elevate</span><br />
                Your Online Presence?
              </h1>
              <p ref={subtextRef} className={`subtext ${isVisible ? 'animate-subtext' : ''}`}>
                Let's create a website that works as hard as you do. Our team is just one click away.
              </p>
              <div ref={buttonsRef} className={`button-container ${isVisible ? 'animate-buttons' : ''}`}>
                <a href="#contact" className="primary-button" role="button">
                  <span className="button-text">Let's Talk</span>
                  <span className="button-icon">→</span>
                </a>
                <a href="#quote" className="secondary-button" role="button">
                  <span className="button-text">Request A Quote</span>
                  <span className="button-icon">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          padding: 80px 0;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #050e1d;
          font-family: 'Poppins', sans-serif;
          color: white;
          overflow: hidden;
        }

        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          z-index: 1;
        }

        .card {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background-image: url("/images/card-bg.jpg");
          background-size: cover;
          background-position: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 21/9;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Consistent card size and padding across all devices */
        @media (max-width: 1024px) {
          .card {
            padding: 50px 30px;
          }
        }

        @media (max-width: 767px) {
          .card {
            padding: 40px 25px;
            aspect-ratio: 16/9;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 30px 20px;
            aspect-ratio: 3/4;
          }
          
          .hero-section {
            padding: 40px 0;
          }
        }

        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card overlay for better text readability */
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,10,30,0.6) 0%, rgba(0,10,30,0.4) 100%);
          z-index: 1;
        }

        /* Animated background elements */
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #43c6ac, transparent);
          top: -100px;
          right: -50px;
          animation: pulse 8s infinite alternate;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #00c3ff, transparent);
          bottom: -70px;
          left: 10%;
          animation: pulse 12s infinite alternate-reverse;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(45deg, #5643cc, transparent);
          top: 20%;
          left: -50px;
          animation: pulse 10s infinite alternate;
        }

        .particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }

        .particle-1 {
          width: 8px;
          height: 8px;
          top: 20%;
          left: 20%;
          animation: float 20s infinite ease-in-out;
        }

        .particle-2 {
          width: 12px;
          height: 12px;
          top: 40%;
          right: 25%;
          animation: float 25s infinite ease-in-out reverse;
        }

        .particle-3 {
          width: 6px;
          height: 6px;
          bottom: 30%;
          right: 10%;
          animation: float 18s infinite ease-in-out;
        }

        .particle-4 {
          width: 10px;
          height: 10px;
          bottom: 20%;
          left: 30%;
          animation: float 22s infinite ease-in-out reverse;
        }

        .particle-5 {
          width: 14px;
          height: 14px;
          top: 15%;
          right: 35%;
          animation: float 28s infinite ease-in-out;
        }

        .card-content {
          text-align: center;
          z-index: 2;
          position: relative;
          width: 100%;
          max-width: 800px;
        }

        .heading {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1.8rem;
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-heading {
          opacity: 1;
          transform: translateY(0);
        }

        .highlight {
          background: linear-gradient(to right, #43c6ac, #00c3ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
          position: relative;
          display: inline-block;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, #43c6ac, #00c3ff);
          transition: width 1.2s ease-out;
        }

        .animate-heading .highlight::after {
          width: 100%;
        }

        .subtext {
          font-size: clamp(1rem, 2vw, 1.2rem);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
          font-weight: 300;
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        .animate-subtext {
          opacity: 0.9;
          transform: translateY(0);
        }

        .button-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
        }

        .animate-buttons {
          opacity: 1;
          transform: translateY(0);
        }

        .primary-button, .secondary-button {
          padding: 0.9rem 2.2rem;
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          outline: none;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 160px;
          position: relative;
          overflow: hidden;
        }

        .primary-button {
          border: 2px solid #00c3ff;
          background-color: transparent;
          color: #fff;
        }

        .secondary-button {
          border: none;
          background: linear-gradient(45deg, #43c6ac, #00c3ff);
          color: #fff;
          box-shadow: 0 5px 15px rgba(0, 195, 255, 0.3);
        }

        .button-icon {
          transition: transform 0.3s ease;
        }

        .primary-button:hover, .secondary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .primary-button:hover .button-icon, 
        .secondary-button:hover .button-icon {
          transform: translateX(5px);
        }

        .primary-button:active, .secondary-button:active {
          transform: translateY(1px);
        }

        /* Consistent button layout on all screen sizes */
        @media (max-width: 640px) {
          .button-container {
            gap: 1rem;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
          
          .primary-button, .secondary-button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }

        /* Animations */
        @keyframes pulse {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
            opacity: 0.15;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.1;
          }
        }

        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(20px, -15px);
          }
          50% {
            transform: translate(-10px, 30px);
          }
          75% {
            transform: translate(-25px, -25px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* Ensure fonts are loaded properly across devices */
        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
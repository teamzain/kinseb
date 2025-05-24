'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '../components/supabaseClient'; // Import the existing Supabase client

const StatsSection = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState({
    // Default fallback values
    heading: "Ready To Elevate Your Online Presence?",
    description: "Let's create a website that works as hard as you do. Our expert team delivers custom solutions that drive real business results.",
    button1: "Let's Talk",
    button2: "Request A Quote",
  });

  const handleNavigation = (path) => {
    router.push(path);
  };
  
  // Fetch data from Supabase
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('homecta')
          .select('*')
          .limit(1)
          .single();
        
        if (error) {
          console.error('Error fetching content:', error);
          // Will use default fallback values
          setIsLoading(false);
          return;
        }
        
        if (data) {
          setContent({
            heading: data.heading || content.heading,
            description: data.description || content.description,
            button1: data.button1 || content.button1,
            button2: data.button2 || content.button2,
          });
        }
      } catch (error) {
        console.error('Unexpected error fetching content:', error);
        // Will use default fallback values
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Intersection Observer to detect when the section is in viewport
  useEffect(() => {
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
          let startTime = null;
          const animate = (timestamp) => {
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
    <section 
      ref={sectionRef} 
      className="hero-section"
      aria-label="Hero section showcasing our web design services"
      id="hero"
    >
      <div className="container">
        <div 
          ref={cardRef}
          className={`card ${isVisible ? 'visible' : ''}`}
        >
          {/* Animated background elements */}
          <div className="animated-bg" aria-hidden="true">
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
            {isLoading ? (
              <div className="loading-indicator">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                <h1 ref={headingRef} className={`heading ${isVisible ? 'animate-heading' : ''}`}>
                  {content.heading.includes("Elevate") ? (
                    <>
                      Ready To <span className="highlight">Elevate</span><br className="break-sm" />
                      Your Online Presence?
                    </>
                  ) : (
                    content.heading
                  )}
                </h1>
                <p ref={subtextRef} className={`subtext ${isVisible ? 'animate-subtext' : ''}`}>
                  {content.description}
                </p>
                <div ref={buttonsRef} className={`button-container ${isVisible ? 'animate-buttons' : ''}`}>
                  <a 
                    href="/contact"
                    className="primary-button" 
                    role="button"
                    aria-label="Contact us to discuss your web design project"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/contact');
                    }}
                  >
                    <span className="button-text">{content.button1}</span>
                    <span className="button-icon" aria-hidden="true">→</span>
                  </a>

                  <a 
                    href="/request-quote"
                    className="secondary-button" 
                    role="button"
                    aria-label="Request a quote for your web design project"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/request-quote');
                    }}
                  >
                    <span className="button-text">{content.button2}</span>
                    <span className="button-icon" aria-hidden="true">↗</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          padding: 5rem 1rem;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #050e1d;
          font-family: 'Poppins', sans-serif;
          color: white;
          overflow: hidden;
        }

        /* More adaptive padding for different screen sizes */
        @media (max-width: 1280px) {
          .hero-section {
            padding: 4rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 1rem;
            min-height: 80vh;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 2.5rem 0.75rem;
            min-height: 70vh;
          }
        }

        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.5rem;
          }
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
          padding: 4rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px; /* Minimum height to ensure content is visible */
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Adaptive card instead of fixed aspect ratio */
        @media (min-width: 1281px) {
          .card {
            padding: 5rem 3rem;
            min-height: 450px;
          }
        }

        @media (max-width: 1280px) {
          .card {
            padding: 3.5rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .card {
            padding: 3rem 1.5rem;
            border-radius: 12px;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 2.5rem 1.25rem;
            border-radius: 10px;
            min-height: 350px;
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
          background: linear-gradient(135deg, rgba(0,10,30,0.7) 0%, rgba(0,10,30,0.5) 100%);
          z-index: 1;
        }

        /* Loading indicator styles */
        .loading-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          z-index: 3;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #43c6ac;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
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

        /* Scale circles for smaller screens */
        @media (max-width: 768px) {
          .circle-1 {
            width: 200px;
            height: 200px;
          }
          .circle-2 {
            width: 150px;
            height: 150px;
          }
          .circle-3 {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 480px) {
          .circle-1 {
            width: 150px;
            height: 150px;
          }
          .circle-2 {
            width: 100px;
            height: 100px;
          }
          .circle-3 {
            width: 80px;
            height: 80px;
          }
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

        /* Hide particles on very small screens to improve performance */
        @media (max-width: 360px) {
          .particle {
            display: none;
          }
        }

        .card-content {
          text-align: center;
          z-index: 2;
          position: relative;
          width: 100%;
          max-width: 800px;
        }

        .heading {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* Line break control for headings */
        .break-sm {
          display: none;
        }

        @media (max-width: 480px) {
          .break-sm {
            display: inline;
          }
          .heading {
            margin-bottom: 1.2rem;
            line-height: 1.3;
          }
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
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
          font-weight: 300;
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .subtext {
            margin-bottom: 2rem;
            max-width: 90%; /* Better width on smaller screens */
          }
        }

        @media (max-width: 480px) {
          .subtext {
            margin-bottom: 1.8rem;
            letter-spacing: 0;
            line-height: 1.5;
          }
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

        @media (max-width: 768px) {
          .button-container {
            gap: 1.2rem;
          }
        }

        .animate-buttons {
          opacity: 1;
          transform: translateY(0);
        }

        .primary-button, .secondary-button {
          padding: 0.9rem 2rem;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
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
          min-width: 140px;
          position: relative;
          overflow: hidden;
        }

        /* More adaptive button sizes */
        @media (max-width: 768px) {
          .primary-button, .secondary-button {
            padding: 0.8rem 1.8rem;
            min-width: 130px;
          }
        }

        @media (max-width: 480px) {
          .primary-button, .secondary-button {
            padding: 0.75rem 1.5rem;
            min-width: 120px;
          }
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

        /* Disable hover effects on touch devices */
        @media (hover: none) {
          .primary-button:hover, .secondary-button:hover {
            transform: none;
            box-shadow: none;
          }
          
          .primary-button:hover .button-icon, 
          .secondary-button:hover .button-icon {
            transform: none;
          }
        }

        .primary-button:hover .button-icon, 
        .secondary-button:hover .button-icon {
          transform: translateX(5px);
        }

        .primary-button:active, .secondary-button:active {
          transform: translateY(1px);
        }

        /* More precise button layout on small screens */
        @media (max-width: 600px) {
          .button-container {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
          
          .primary-button, .secondary-button {
            width: 100%;
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
    </section>
  );
};

export default StatsSection;
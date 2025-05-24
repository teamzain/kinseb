'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
// Import the supabaseClient
import { supabase } from './supabaseClient'; 

const HeroSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // New state for Supabase data
  const [ctaData, setCtaData] = useState<{
    heading: string | null;
    description: string | null;
    button1: string | null;
    button2: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Default content values from the original component
  const defaultContent = {
    heading: "Ready To <span class=\"highlight\">Elevate</span><br class=\"break-sm\" /> Your Online Presence?",
    description: "Let's create a website that works as hard as you do. Our expert team delivers custom solutions that drive real business results.",
    button1: "Let's Talk",
    button2: "Request A Quote"
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('homecta')
          .select('heading, description, button1, button2')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching CTA data:', error);
          setCtaData(null);
        } else {
          setCtaData(data);
        }
      } catch (err) {
        console.error('Error in CTA data fetch:', err);
        setCtaData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCtaData();
  }, []);
  
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

  // Get the content values from Supabase data or fall back to defaults
  const content = {
    heading: ctaData?.heading || defaultContent.heading,
    description: ctaData?.description || defaultContent.description,
    button1: ctaData?.button1 || defaultContent.button1,
    button2: ctaData?.button2 || defaultContent.button2
  };

  return (
    <>
      <Head>
        <title>Professional Web Design Services | Transform Your Online Presence | Your Brand</title>
        <meta name="description" content="Transform your digital presence with our expert web design services. Create a website that drives results, connects with customers, and grows your business 24/7." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="keywords" content="web design services, professional website design, custom web development, responsive design, business websites, online presence, digital strategy, web agency" />
        <link rel="canonical" href="https://yourbrand.com/" />
        
        {/* Open Graph Tags for better social sharing */}
        <meta property="og:title" content="Professional Web Design Services | Transform Your Online Presence" />
        <meta property="og:description" content="Create a website that works as hard as you do. Our expert team delivers custom web design solutions that drive real business results." />
        <meta property="og:image" content="https://yourbrand.com/images/web-design-services-hero.jpg" />
        <meta property="og:url" content="https://yourbrand.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your Brand Web Design" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourbrand" />
        <meta name="twitter:title" content="Professional Web Design Services | Transform Your Online Presence" />
        <meta name="twitter:description" content="Create a website that works as hard as you do. Our expert team delivers custom web design solutions that drive real business results." />
        <meta name="twitter:image" content="https://yourbrand.com/images/web-design-services-twitter.jpg" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Your Brand Web Design" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Your City" />
        
        {/* Preconnect to required origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad={(e) => { if(e.currentTarget) e.currentTarget.media='all'; }}
        />
      </Head>
      
      {/* Structured Data for SEO */}
      <Script
        id="structured-data-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Professional Web Design Services",
            "description": "Transform your digital presence with our expert web design services. Create a website that drives results and grows your business 24/7.",
            "url": "https://yourbrand.com/",
            "mainEntity": {
              "@type": "Service",
              "name": "Web Design Services",
              "description": "Professional web design services that help businesses establish a strong online presence with custom, responsive websites.",
              "provider": {
                "@type": "Organization",
                "name": "Your Brand",
                "url": "https://yourbrand.com/",
                "logo": "https://yourbrand.com/images/logo.png"
              },
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Design Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Website Design"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Responsive Web Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-commerce Solutions"
                    }
                  }
                ]
              }
            }
          })
        }}
      />
      
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
              <h1 
                ref={headingRef} 
                className={`heading ${isVisible ? 'animate-heading' : ''}`}
                dangerouslySetInnerHTML={{ __html: content.heading }}
              >
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
            </div>
          </div>
        </div>
      </section>

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
          position: relative;
          z-index: 1;
        }

        /* Add a pseudo-element for the gradient background */
        .primary-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #43c6ac, #00c3ff);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* Show gradient on hover */
        .primary-button:hover::before {
          opacity: 1;
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
          
          .primary-button:hover::before {
            opacity: 0;
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
    </>
  );
};

export default HeroSection;
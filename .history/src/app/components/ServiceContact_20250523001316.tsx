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
  const mockup1Ref = useRef<HTMLDivElement | null>(null);
  const mockup2Ref = useRef<HTMLDivElement | null>(null);
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
    heading: "Ready To <span class=\"highlight\">Elevate</span><br />Your Online Presence?",
    description: "We design and develop purpose-built websites that are clean, fast, and tailored to your brand's goals — empowering you to grow, connect, and lead with confidence in the digital world.",
    button1: "Request A Quote",
    button2: "Let's Talk"
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

  // Optional: Add floating animation with straight images
  useEffect(() => {
    if (isVisible && mockup1Ref.current && mockup2Ref.current) {
      // Add subtle floating animation to mockup cards (no rotation)
      const floatAnimation = () => {
        const mockup1 = mockup1Ref.current;
        const mockup2 = mockup2Ref.current;
        if (mockup1 && mockup2) {
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const translateY1 = Math.sin(elapsed / 3000) * 6; // Different timing for each mockup
            const translateY2 = Math.sin(elapsed / 3500 + Math.PI/3) * 8;
            
            // Remove rotation, keep only vertical floating
            mockup1.style.transform = `translateY(${translateY1}px)`;
            mockup2.style.transform = `translateY(${translateY2}px)`;
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
      const floatTimer = setTimeout(floatAnimation, 2500);
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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lato:wght@300;400;600;700&display=swap"
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
            className={`main-card ${isVisible ? 'visible' : ''}`}
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
            
            {/* Content Layout - Text on Left, Mockup Cards on Right */}
            <div className="content-layout">
              {/* Left Side - Text Content */}
              <div className="text-content">
                <h1 
                  ref={headingRef} 
                  className={`heading ${isVisible ? 'animate-heading' : ''}`}
                >
                  Ready To <span className="highlight">Elevate</span><br />
                  Your Online Presence?
                </h1>
                <p ref={subtextRef} className={`subtext ${isVisible ? 'animate-subtext' : ''}`}>
                  {content.description}
                </p>
                <div ref={buttonsRef} className={`button-container ${isVisible ? 'animate-buttons' : ''}`}>
                  <a 
                    href="/request-quote"
                    className="primary-button" 
                    role="button"
                    aria-label="Request a quote for your web design project"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/request-quote');
                    }}
                  >
                    <span className="button-text">{content.button1}</span>
                    <span className="button-icon" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* Right Side - Mockup Cards */}
              <div className="mockups-container">
                {/* Website Mockup Card 1 - Background */}
                <div 
                  ref={mockup1Ref}
                  className={`mockup-card mockup-card-1 ${isVisible ? 'animate-mockup-1' : ''}`}
                >
                  <div className="mockup-card-inner">
                    <div className="mockup-image">
                      <img src="/images/89.png" alt="Website Design Example 1" />
                    </div>
                    <div className="mockup-glow"></div>
                  </div>
                </div>

                {/* Website Mockup Card 2 - Foreground */}
                <div 
                  ref={mockup2Ref}
                  className={`mockup-card mockup-card-2 ${isVisible ? 'animate-mockup-2' : ''}`}
                >
                  <div className="mockup-card-inner">
                    <div className="mockup-image">
                      <img src="/images/90.png" alt="Website Design Example 2" />
                    </div>
                    <div className="mockup-glow"></div>
                  </div>
                </div>
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
          background: linear-gradient(180deg, #04091D 0%, #0D98BA 100%);
          font-family: 'Poppins', sans-serif;
          color: white;
          overflow: hidden;
        }

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
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1rem;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.5rem;
          }
        }

        .main-card {
          position: relative;
          width: 100%;
          max-width: 1302px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(270deg, rgba(4, 9, 29, 0) -264.67%, rgba(4, 9, 29, 0.7) 100%), url('/images/card-bg.jpg');
          background-blend-mode: normal, normal;
          background-size: cover;
          background-position: center;
          border: 1px solid #7D818D;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          padding: 4rem 3rem;
          min-height: 520px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (max-width: 1280px) {
          .main-card {
            padding: 3.5rem 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .main-card {
            padding: 3rem 2rem;
            border-radius: 12px;
            min-height: 400px;
          }
        }

        @media (max-width: 480px) {
          .main-card {
            padding: 2.5rem 1.5rem;
            border-radius: 10px;
            min-height: 350px;
          }
        }

        .main-card.visible {
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
          background: linear-gradient(270deg, rgba(4, 9, 29, 0) -264.67%, rgba(4, 9, 29, 0.7) 100%);
          z-index: 1;
        }

        /* Content Layout */
        .content-layout {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          height: 100%;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .content-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
        }

        /* Text Content - Left Side */
        .text-content {
          z-index: 2;
          position: relative;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .text-content {
            order: 1;
            max-width: 100%;
          }
        }

        /* Updated Heading - Reduced font size for desktop/laptop */
        .heading {
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 2rem;
          line-height: 1.15;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 1s ease, transform 1s ease;
          letter-spacing: -0.02em;
        }

        .heading br {
          display: block;
        }

        @media (max-width: 768px) {
          .heading {
            font-size: clamp(2.4rem, 8vw, 3.5rem);
            margin-bottom: 1.8rem;
            line-height: 1.15;
          }
        }

        @media (max-width: 480px) {
          .heading {
            margin-bottom: 1.5rem;
            line-height: 1.2;
            font-size: clamp(2rem, 9vw, 2.8rem);
          }
        }

        .animate-heading {
          opacity: 1;
          transform: translateX(0);
        }

        .highlight {
          color: #0D98BA;
          font-weight: 800;
          position: relative;
          display: inline-block;
        }

        /* Updated Subtext - Better hierarchy */
        .subtext {
          font-size: clamp(1.05rem, 2.2vw, 1.2rem);
          margin: 0 0 3rem;
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 1s ease 0.3s, transform 1s ease 0.3s;
          font-weight: 400;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: #E0E0E0;
          font-family: 'Lato', sans-serif;
          max-width: 550px;
        }

        @media (max-width: 768px) {
          .subtext {
            margin-bottom: 2.5rem;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .subtext {
            margin-bottom: 2rem;
            letter-spacing: 0;
            font-size: clamp(0.95rem, 4vw, 1.1rem);
          }
        }

        .animate-subtext {
          opacity: 1;
          transform: translateX(0);
        }

        /* Updated Button Container - Centered on mobile */
        .button-container {
          display: flex;
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
        }

        @media (max-width: 768px) {
          .button-container {
            justify-content: center;
          }
        }

        .animate-buttons {
          opacity: 1;
          transform: translateX(0);
        }

        /* Updated Button - More prominent styling */
        .primary-button {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 180px;
          position: relative;
          overflow: hidden;
          font-family: 'Lato', sans-serif;
          background: #0D98BA;
          border: 2px solid #0D98BA;
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(13, 152, 186, 0.3);
        }

        @media (max-width: 480px) {
          .primary-button {
            padding: 0.9rem 2rem;
            font-size: 1rem;
            min-width: 160px;
          }
        }

        .button-icon {
          transition: transform 0.3s ease;
        }

        .primary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(13, 152, 186, 0.4);
          background: #0B8AA3;
          border-color: #0B8AA3;
        }

        .primary-button:hover .button-icon {
          transform: translateX(6px);
        }

        @media (hover: none) {
          .primary-button:hover {
            transform: none;
            box-shadow: 0 4px 15px rgba(13, 152, 186, 0.3);
          }
          
          .primary-button:hover .button-icon {
            transform: none;
          }
        }

        /* Mockups Container - Right Side */
        .mockups-container {
          position: relative;
          height: 450px;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .mockups-container {
            height: 320px;
            order: 2;
          }
        }

        @media (max-width: 480px) {
          .mockups-container {
            height: 280px;
          }
        }

        /* Mockup Cards - Adjusted Heights */
        .mockup-card {
          position: absolute;
          opacity: 0;
          transition: all 1.4s cubic-bezier(0.23, 1, 0.32, 1);
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3));
        }

        .mockup-card-inner {
          position: relative;
          border-radius: 15px;
          padding: 1rem;
          overflow: hidden;
        }

        .mockup-image {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(13, 152, 186, 0.1) 0%, rgba(4, 9, 29, 0.3) 100%);
        }

        .mockup-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          transition: transform 0.4s ease;
        }

        /* Add margin-top to the second mockup image to show specific part */
        .mockup-card-2 .mockup-image img {
          margin-top: -300px; /* Adjust this value to show the desired part of the screenshot */
        }

        .mockup-card:hover .mockup-image img {
          transform: scale(1.05);
        }

        .mockup-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(13, 152, 186, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .mockup-card:hover .mockup-glow {
          opacity: 1;
        }

        /* Updated mockup positioning - Increased height for first, decreased for second */
        .mockup-card-1 {
          width: 320px;
          height: 480px; /* Increased from 420px */
          right: 120px;
          top: -20px; /* Adjusted position */
          z-index: 2;
        }

        .mockup-card-2 {
          width: 280px;
          height: 160px; /* Decreased from 200px */
          right: -65px;
          top: 20px; /* Adjusted position */
          z-index: 1;
        }

        @media (max-width: 768px) {
          .mockup-card-1 {
            width: 220px;
            height: 300px; /* Increased proportionally */
            right: 60px;
            top: 10px;
          }
          
          .mockup-card-2 {
            width: 180px;
            height: 140px; /* Decreased proportionally */
            right: 10px;
            top: 25px;
          }
        }

        @media (max-width: 480px) {
          .mockup-card-1 {
            width: 160px;
            height: 220px; /* Increased proportionally */
            right: 40px;
            top: 20px;
          }
          
          .mockup-card-2 {
            width: 120px;
            height: 120px; /* Decreased proportionally */
            right: 10px;
            top: 35px;
          }
        }

        /* Mockup Animations - removed rotation */
        .animate-mockup-1 {
          opacity: 1;
          transform: translateX(0); /* Removed rotate(0deg) */
          transition-delay: 1s;
        }

        .animate-mockup-2 {
          opacity: 1;
          transform: translateX(0); /* Removed rotate(0deg) */
          transition-delay: 1.4s;
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
          opacity: 0.08;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #0D98BA, transparent);
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
          background-color: rgba(255, 255, 255, 0.1);
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

        @media (max-width: 360px) {
          .particle {
            display: none;
          }
        }

        /* Animations */
        @keyframes pulse {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: scale(1.05) rotate(0deg);
            opacity: 0.08;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.05;
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

        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
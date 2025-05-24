'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Poppins, Lato } from 'next/font/google';

// Font optimization using next/font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400',  '700'],
  display: 'swap',
  variable: '--font-lato',
});

const WhatMattersComponent = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Intersection Observer for section animation and video autoplay
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Intersection Observer for stats with higher threshold for staggered effect
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Handle video autoplay when component comes into view
  React.useEffect(() => {
    if (videoRef.current) {
      if (containerInView) {
        videoRef.current.play().catch((error: any) => {
          console.log('Video autoplay failed:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [containerInView]);

  // Array of stats for easy mapping
  const stats = [
    { icon: "/images/people.png", number: "50+", label: "Happy Clients", alt: "Icon showing 50+ happy clients we've served" },
    { icon: "/images/45.png", number: "70+", label: "Projects Delivered", alt: "Icon representing 70+ web development projects delivered" },
    { icon: "/images/46.png", number: "98%", label: "Client Satisfaction", alt: "Icon showing 98% client satisfaction rate" },
    { icon: "/images/47.png", number: "5+", label: "Years of Experience", alt: "Icon representing 5+ years of web development experience" },
  ];

  // Function to determine image dimensions based on screen size - REDUCED SIZES
  const getImageDimensions = () => {
    // Use different dimensions for mobile devices - SMALLER SIZES
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) {
        return { width: 320, height: 270 }; // Reduced from 400x340
      } else if (window.innerWidth <= 768) {
        return { width: 440, height: 390 }; // Reduced from 550x490
      } else if (window.innerWidth <= 992) {
        return { width: 600, height: 550 }; // Reduced from 750x690
      } else if (window.innerWidth <= 1200) {
        return { width: 520, height: 600 }; // Reduced from 650x750
      }
    }
    
    // Default dimensions for desktop - REDUCED SIZE
    return { width: 540, height: 600 }; // Reduced from 680x750
  };

  // State to hold image dimensions
  const [imageDimensions, setImageDimensions] = React.useState({ width: 480, height: 600 }); // Reduced initial

  // Update dimensions on window resize
  React.useEffect(() => {
    // Set initial dimensions
    setImageDimensions(getImageDimensions());

    // Handle window resize
    const handleResize = () => {
      setImageDimensions(getImageDimensions());
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      className={`whatMattersContainer ${poppins.variable} ${lato.variable}`}
      ref={containerRef}
      aria-label="Company achievements and statistics"
      id="web-development-expertise"
    >
      <div className={`contentWrapper ${containerInView ? 'animate-in' : ''}`}>
        <figure className={`imageSection ${containerInView ? 'animate-slide-right' : ''}`}>
          <div className="imageWrapper">
            {/* Your TV Image */}
            <Image 
              src="/images/whyus.png" 
              alt="Professional web development team collaborating on website projects"
              width={imageDimensions.width}
              height={imageDimensions.height}
              className="serviceImage"
              priority={true}
              quality={85}
              sizes="(max-width: 480px) 240px, (max-width: 768px) 260px, (max-width: 992px) 360px, (max-width: 1200px) 360px, 480px"
            />
            
            {/* Video overlay positioned on the TV screen */}
            <div className="videoContainer">
              <video
                ref={videoRef}
                className="overlayVideo"
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/"
              >
                <source src="/images/web.mp4" type="video/mp4" />
                <source src="/images/web.mp4" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Screen reflection effect */}
              <div className="screenReflection"></div>
            </div>
          </div>
        </figure>

        <div className={`textSection ${containerInView ? 'animate-fade-in' : ''}`}>
          <h2 className="heading">
            We <span className="highlight">Build</span> What Matters
          </h2>
          <p className="subheading">
            Whether you're refining an idea or building from scratch, we help you design 
            smarter, develop faster, and scale better. With an agile team, deep expertise, 
            and a commitment to quality—you'll stay focused on what matters most: growth.
          </p>

          <div className="statsSection" ref={statsRef}>
            <div className="statsGrid">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className={`statItem ${statsInView ? `animate-fade-up delay-${index}` : ''}`}
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <div className="statIcon">
                    <Image 
                      src={stat.icon} 
                      alt={stat.alt} 
                      width={68} 
                      height={68} 
                      loading="lazy"
                    />
                  </div>
                  <div className="statContent">
                    <h3 className="statNumber" itemProp="name">{stat.number}</h3>
                    <p className="statLabel" itemProp="description">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .whatMattersContainer {
          width: 100%;
          background: linear-gradient(180deg, #0D98BA -216%, #04091D 100%);
          min-height: 750px;
          color: #FFFFFF;
          overflow: hidden;
          padding: 40px 0;
          position: relative;
        }

        .contentWrapper {
          display: flex;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }

        .contentWrapper.animate-in {
          opacity: 1;
        }

        /* DESKTOP IMAGE STYLES (1200px and above) - REDUCED MAX-WIDTH */
        .imageSection {
          width: 50%;
          position: relative;
          transform: translateX(-100px);
          opacity: 0;
          transition: all 1s ease-out;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imageSection.animate-slide-right {
          transform: translateX(0);
          opacity: 1;
        }

        .imageWrapper {
          width: 100%;
          max-width: 400px; /* Reduced from 500px */
          position: relative;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          height: auto;
        }

        .serviceImage {
          object-fit: contain;
          transition: transform 0.5s ease;
          border-radius: 8px;
        }

        .serviceImage:hover {
          transform: scale(1.03);
        }

        /* Video Container - Positioned over the TV screen area - LAPTOP OPTIMIZED */
        .videoContainer {
          position: absolute;
          top: 5%;
          left: -12%;
          width: 134%;
          height: 60%;
          border-radius: 4px;
          overflow: hidden;
          z-index: 2;
        }

        .overlayVideo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .screenReflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(255, 255, 255, 0.05) 45%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 55%,
            transparent 60%
          );
          pointer-events: none;
        }
        /* END DESKTOP IMAGE STYLES */

        .textSection {
          width: 60%;
          padding: 60px 40px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out 0.3s;
        }

        .textSection.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .heading {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: 45px;
          line-height: 68px;
          margin-bottom: 32px;
        }

        .highlight {
          color: #0D98BA;
          background: linear-gradient(90deg, #0D98BA, #06C8FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #0D98BA, #06C8FF);
          border-radius: 2px;
        }

        .subheading {
          font-family: var(--font-lato), sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          max-width: 648px;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .statsSection {
          display: flex;
          flex-direction: column;
          margin-bottom: 60px;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          grid-template-rows: 1fr 2px 1fr;
          gap: 0;
          position: relative;
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
        }

        .statsGrid::before {
          content: "";
          position: absolute;
          top: 10%;
          bottom: 10%;
          left: 50%;
          width: 2px;
          background: linear-gradient(180deg, transparent, #0D98BA, transparent);
          transform: translateX(-50%);
        }

        .statsGrid::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          top: 50%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0D98BA, transparent);
          transform: translateY(-50%);
        }

        .statItem {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 25px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .statItem.animate-fade-up {
          opacity: 1;
          transform: translateY(0);
        }

        .statItem.delay-0 { transition-delay: 0.2s; }
        .statItem.delay-1 { transition-delay: 0.4s; }
        .statItem.delay-2 { transition-delay: 0.6s; }
        .statItem.delay-3 { transition-delay: 0.8s; }

        .statItem:hover {
          transform: translateY(-5px);
        }

        .statItem:nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }

        .statItem:nth-child(2) {
          grid-column: 3;
          grid-row: 1;
        }

        .statItem:nth-child(3) {
          grid-column: 1;
          grid-row: 3;
        }

        .statItem:nth-child(4) {
          grid-column: 3;
          grid-row: 3;
        }

        .statIcon {
          margin-right: 15px;
          background: rgba(13, 152, 186, 0.1);
          border-radius: 50%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(13, 152, 186, 0.15);
        }

        .statContent {
          display: flex;
          flex-direction: column;
        }

        .statNumber {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(90deg, #FFFFFF, #0D98BA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .statLabel {
          font-family: var(--font-lato), sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          margin-top: 5px;
        }

        /* LARGE TABLET STYLES (992px to 1200px) */
        @media (max-width: 1200px) {
          .contentWrapper {
            flex-direction: row;
            padding: 0 20px;
          }
          
          .heading {
            font-size: 38px;
            line-height: 54px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr 1px 1fr;
          }
          
          .statNumber {
            font-size: 48px;
            line-height: 56px;
          }
          
          /* IMAGE STYLES FOR LARGE TABLET - REDUCED */
          .imageWrapper {
            max-width: 360px; /* Reduced from 450px */
          }
          
          /* Video container adjustments for large tablet */
          .videoContainer {
            top: 5.5%;
            left: 2.5%;
            width: 93%;
            height: 59%;
          }
        }

        /* TABLET STYLES (768px to 992px) */
        @media (max-width: 992px) {
          .contentWrapper {
            flex-direction: column;
            align-items: center;
          }

          /* IMAGE STYLES FOR TABLET - REDUCED */
          .imageSection, .textSection {
            width: 100%;
            max-width: 600px;
          }
          
          .imageSection {
            transform: translateY(-50px);
            margin-bottom: 20px;
          }
          
          .imageWrapper {
            max-width: 360px; /* Reduced from 450px */
            margin: 0 auto;
          }
          
          .imageSection.animate-slide-right {
            transform: translateY(0);
          }
          
          .statsGrid {
            grid-template-columns: 1fr 1px 1fr;
          }

          .textSection {
            padding: 20px 40px;
          }
          
          /* Video container adjustments for tablet */
          .videoContainer {
            top: 7%;
            left: 4%;
            width: 90%;
            height: 55%;
          }
        }

        /* SMALL TABLET / LARGE MOBILE STYLES (480px to 768px) */
        @media (max-width: 768px) {
          .heading {
            font-size: 36px;
            line-height: 48px;
          }

          .textSection {
            padding: 20px;
            width: 100%;
          }
          
          .statsGrid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, auto);
            padding: 15px;
          }
          
          .statsGrid::before, .statsGrid::after {
            display: none;
          }
          
          .statItem:nth-child(1),
          .statItem:nth-child(2),
          .statItem:nth-child(3),
          .statItem:nth-child(4) {
            grid-column: 1;
          }
          
          .statItem:nth-child(1) { grid-row: 1; }
          .statItem:nth-child(2) { grid-row: 2; }
          .statItem:nth-child(3) { grid-row: 3; }
          .statItem:nth-child(4) { grid-row: 4; }
          
          .statItem {
            justify-content: flex-start;
            padding: 15px 0;
            border-bottom: 1px solid rgba(13, 152, 186, 0.2);
          }
          
          .statItem:last-child {
            border-bottom: none;
          }
          
          /* IMAGE STYLES FOR SMALL TABLET / LARGE MOBILE - REDUCED */
          .imageSection {
            width: 100%;
            max-width: 100%;
            padding: 0 20px;
          }
          
          .imageWrapper {
            max-width: 240px; /* Reduced from 300px */
            width: 100%;
          }
          
          /* Video container adjustments for small tablet/large mobile */
          .videoContainer {
            top: 8%;
            left: 5%;
            width: 88%;
            height: 52%;
          }
        }
        
        /* MOBILE STYLES (below 480px) */
        @media (max-width: 480px) {
          .heading {
            font-size: 32px;
            line-height: 42px;
          }
          
          .subheading {
            font-size: 18px;
            line-height: 26px;
          }
          
          .statNumber {
            font-size: 42px;
            line-height: 50px;
          }
          
          .statLabel {
            font-size: 16px;
          }
          
          /* IMAGE STYLES FOR MOBILE - REDUCED */
          .imageWrapper {
            max-width: 220px; /* Reduced from 280px */
            width: 100%;
          }

          .whatMattersContainer {
            padding: 20px 0;
          }
          
          /* Video container adjustments for mobile */
          .videoContainer {
            top: 2%;
            left: -15%;
            width: 140%;
            height: 63%;
          }
        }
      `}</style>
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "WebPageElement",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.kinsebwebdevelopment.com/web-development-services"
          },
          "name": "Web Development Services",
          "description": "Professional web development services with 5+ years of experience, 50+ happy clients, 70+ projects delivered and 98% client satisfaction.",
          "offers": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Development",
              "description": "Whether you're refining an idea or building from scratch, we help you design smarter, develop faster, and scale better."
            }
          }
        }
      `}} />
    </section>
  );
};

export default WhatMattersComponent;
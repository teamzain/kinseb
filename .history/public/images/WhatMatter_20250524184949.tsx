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
    triggerOnce: false, // Changed to false to handle video play/pause
    threshold: 0.3,
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
              width={480}
              height={420}
              className="serviceImage"
              priority={true}
              quality={85}
              sizes="(max-width: 480px) 280px, (max-width: 768px) 320px, (max-width: 992px) 380px, (max-width: 1200px) 420px, 480px"
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
          padding: 60px 0;
          position: relative;
        }

        .contentWrapper {
          display: flex;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          opacity: 0;
          transition: opacity 0.8s ease-out;
          align-items: center;
          padding: 0 20px;
        }

        .contentWrapper.animate-in {
          opacity: 1;
        }

        /* IMAGE SECTION STYLES (Your TV Image with Video Overlay) */
        .imageSection {
          width: 45%;
          position: relative;
          transform: translateX(-100px);
          opacity: 0;
          transition: all 1s ease-out;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .imageSection.animate-slide-right {
          transform: translateX(0);
          opacity: 1;
        }

        .imageWrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .serviceImage {
          object-fit: contain;
          transition: transform 0.5s ease;
          border-radius: 8px;
          width: 100%;
          height: auto;
        }

        .serviceImage:hover {
          transform: scale(1.03);
        }

        /* Video Container - Positioned over the TV screen area - LAPTOP OPTIMIZED */
        .videoContainer {
          position: absolute;
          top: 5%;
          left: 2%;
          width: 94%;
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

        /* TEXT SECTION STYLES */
        .textSection {
          width: 55%;
          padding: 60px 40px 60px 60px;
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
          font-size: clamp(32px, 4vw, 45px);
          line-height: 1.4;
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
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.6;
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
          min-width: 60px;
          height: 60px;
        }

        .statIcon img {
          width: clamp(24px, 3vw, 32px);
          height: clamp(24px, 3vw, 32px);
        }

        .statContent {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .statNumber {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: clamp(40px, 5vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(90deg, #FFFFFF, #0D98BA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .statLabel {
          font-family: var(--font-lato), sans-serif;
          font-weight: 600;
          font-size: clamp(14px, 1.5vw, 20px);
          line-height: 1.2;
          margin-top: 5px;
          white-space: nowrap;
        }

        /* RESPONSIVE STYLES */
        
        /* EXTRA LARGE SCREENS (1400px+) */
        @media (min-width: 1400px) {
          .whatMattersContainer {
            padding: 80px 0;
          }
          
          .textSection {
            padding: 80px 60px 80px 80px;
          }
          
          /* Video container adjustments for extra large screens */
          .videoContainer {
            top: 4%;
            left: 3%;
            width: 94%;
            height: 61%;
          }
        }

        /* LARGE DESKTOP (1200px to 1400px) */
        @media (max-width: 1400px) and (min-width: 1200px) {
          .contentWrapper {
            max-width: 1200px;
          }
          
          .imageWrapper {
            max-width: 420px;
          }
          
          /* Video ctainer adjustments for large desktop */
          .videoContainer {
            top: 4.5%;
            left: -5%;
            width: 108%;
            height: 61%;
          }
        }

        /* MEDIUM DESKTOP (992px to 1200px) */
        @media (max-width: 1200px) and (min-width: 992px) {
          .contentWrapper {
            max-width: 1000px;
          }
          
          .imageSection {
            width: 42%;
          }
          
          .textSection {
            width: 58%;
            padding: 40px 30px 40px 40px;
          }
          
          .imageWrapper {
            max-width: 380px;
          }
          
          .statsGrid {
            padding: 18px;
          }
          
          .statItem {
            padding: 20px;
          }
          
          /* Video container adjustments for medium desktop */
          .videoContainer {
            top: 6%;
            left: 3%;
            width: 102%;
            height: 67%;
          }
        }

        /* TABLET LANDSCAPE (768px to 992px) */
        @media (max-width: 992px) and (min-width: 768px) {
          .whatMattersContainer {
            min-height: 900px;
            padding: 40px 0;
          }

          .contentWrapper {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .imageSection, .textSection {
            width: 100%;
            max-width: 700px;
          }
          
          .imageSection {
            transform: translateY(-50px);
            padding: 0 40px;
            order: 1;
          }
          
          .imageSection.animate-slide-right {
            transform: translateY(0);
          }
          
          .textSection {
            padding: 0 40px 40px;
            order: 2;
          }
          
          .imageWrapper {
            max-width: 400px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr 1px 1fr;
            max-width: 600px;
            margin: 0 auto;
          }
          
          /* Video container adjustments for tablet landscape */
          .videoContainer {
            top: 7%;
            left: 4%;
            width: 90%;
            height: 55%;
          }
        }

        /* TABLET PORTRAIT (600px to 768px) */
        @media (max-width: 768px) and (min-width: 600px) {
          .whatMattersContainer {
            padding: 30px 0;
            min-height: 800px;
          }

          .contentWrapper {
            gap: 30px;
            padding: 0 30px;
          }

          .imageSection {
            padding: 0 20px;
          }
          
          .textSection {
            padding: 0 20px 30px;
          }
          
          .imageWrapper {
            max-width: 350px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, auto);
            padding: 20px;
            gap: 0;
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
            padding: 20px 0;
            border-bottom: 1px solid rgba(13, 152, 186, 0.2);
          }
          
          .statItem:last-child {
            border-bottom: none;
          }
          
          .statLabel {
            white-space: normal;
          }
          
          /* Video container adjustments for tablet portrait */
          .videoContainer {
            top: 8%;
            left: 5%;
            width: 88%;
            height: 52%;
          }
        }
        
        /* LARGE MOBILE (480px to 600px) */
        @media (max-width: 600px) and (min-width: 480px) {
          .whatMattersContainer {
            padding: 30px 0;
            min-height: auto;
          }

          .contentWrapper {
            gap: 25px;
            padding: 0 20px;
          }

          .imageSection {
            padding: 0 10px;
          }
          
          .textSection {
            padding: 0 10px 20px;
          }
          
          .imageWrapper {
            max-width: 320px;
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
            padding: 18px 0;
            border-bottom: 1px solid rgba(13, 152, 186, 0.2);
          }
          
          .statItem:last-child {
            border-bottom: none;
          }
          
          .statIcon {
            margin-right: 12px;
            min-width: 50px;
            height: 50px;
            padding: 10px;
          }
          
          .statLabel {
            white-space: normal;
          }
          
          /* Video container adjustments for large mobile */
          .videoContainer {
            top: 9%;
            left: 6%;
            width: 86%;
            height: 50%;
          }
        }
        
        /* SMALL MOBILE (below 480px) */
        @media (max-width: 480px) {
          .whatMattersContainer {
            padding: 20px 0;
            min-height: auto;
          }

          .contentWrapper {
            gap: 20px;
            padding: 0 15px;
          }

          .imageSection {
            padding: 0 5px;
          }
          
          .textSection {
            padding: 0 5px 15px;
          }
          
          .imageWrapper {
            max-width: 280px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, auto);
            padding: 12px;
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
          
          .statIcon {
            margin-right: 10px;
            min-width: 45px;
            height: 45px;
            padding: 8px;
          }
          
          .statLabel {
            white-space: normal;
            line-height: 1.3;
          }
          
          /* Video container adjustments for small mobile */
          .videoContainer {
            top: 10%;
            left: 7%;
            width: 84%;
            height: 48%;
          }
        }

        /* EXTRA SMALL MOBILE (below 360px) */
        @media (max-width: 360px) {
          .contentWrapper {
            padding: 0 10px;
          }
          
          .imageWrapper {
            max-width: 250px;
          }
          
          .statsGrid {
            padding: 10px;
          }
          
          .statItem {
            padding: 12px 0;
          }
          
          .statIcon {
            min-width: 40px;
            height: 40px;
            padding: 6px;
          }
          
          /* Video container adjustments for extra small mobile */
          .videoContainer {
            top: 12%;
            left: 8%;
            width: 82%;
            height: 45%;
          }
        }

        /* LANDSCAPE MOBILE ORIENTATION */
        @media (max-height: 500px) and (orientation: landscape) {
          .whatMattersContainer {
            min-height: auto;
            padding: 20px 0;
          }
          
          .contentWrapper {
            flex-direction: row;
            gap: 20px;
          }
          
          .imageSection, .textSection {
            width: 50%;
          }
          
          .imageSection {
            transform: translateX(-50px);
          }
          
          .imageSection.animate-slide-right {
            transform: translateX(0);
          }
          
          .textSection {
            padding: 20px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr 1px 1fr;
            grid-template-rows: 1fr 2px 1fr;
          }
          
          .statsGrid::before, .statsGrid::after {
            display: block;
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
          
          .statItem {
            border-bottom: none;
            padding: 15px;
          }
          
          /* Video container adjustments for landscape mobile */
          .videoContainer {
            top: 8%;
            left: 4%;
            width: 90%;
            height: 52%;
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
            "@id": "https://www.example.com/web-development-services"
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
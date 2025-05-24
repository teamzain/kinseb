'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from './supabaseClient'; 

// Define interface for hero content
interface HeroContent {
  short_title: string;
  title: string;
  description: string;
  first_button_text: string;
  second_button_text: string;
}

export default function DiagonalMarquee() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // State for hero content and loading status
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Default content as fallback
  const defaultContent: HeroContent = {
    short_title: "Your Web Development Provider",
    title: "Building Websites That Drive Growth",
    description: "From startups to enterprises, we build responsive, SEO-optimized websites. Let your brand stand out with designs tailored for results.",
    first_button_text: "See Our Work",
    second_button_text: "Request A Quote"
  };

  // Function to fetch hero content from Supabase
  useEffect(() => {
 const fetchHeroContent = async () => {
  try {
   const { data, error } = await supabase
          .from('herohome')
          .select('short_title, title, description, first_button_text, second_button_text')
          .order('id', { ascending: false })
          .limit(1)
          .single();
        if (error) {
          console.error('Error fetching hero content:', error);
          setHeroContent(null);
        } else if (data) {
          setHeroContent(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching hero content:', error);
        setHeroContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Get content to display - use fetched content or default
  const displayContent = heroContent || defaultContent;

  // Function to split the title into first and second lines
  const splitTitle = (title: string): { firstLine: string, secondLine: string } => {
    const titleParts = title.split(' ');
    const midpoint = Math.ceil(titleParts.length / 2);
    
    // Try to find "That" as a natural break point
    const thatIndex = titleParts.findIndex(word => word.toLowerCase() === 'that');
    const breakIndex = thatIndex !== -1 ? thatIndex : midpoint;
    
    const firstLine = titleParts.slice(0, breakIndex + 1).join(' ');
    const secondLine = titleParts.slice(breakIndex + 1).join(' ');
    
    return { firstLine, secondLine };
  };

  // Get formatted title with highlighted word
  const formatTitle = (title: string): { firstLine: React.ReactNode, secondLine: string } => {
    const { firstLine, secondLine } = splitTitle(title);
    
    // Highlight "Websites" or another key word if present
    const highlightWord = "Websites";
    const formattedFirstLine = firstLine.includes(highlightWord) ? (
      <>
        {firstLine.split(highlightWord)[0]}
        <span style={{ color: '#0099cc' }}>{highlightWord}</span>
        {firstLine.split(highlightWord)[1]}
      </>
    ) : firstLine;
    
    return { firstLine: formattedFirstLine, secondLine };
  };

  const formattedTitle = formatTitle(displayContent.title);

  useEffect(() => {
    // Function to duplicate images to ensure smooth animation
    const ensureSmoothAnimation = (columnRef: { current: HTMLDivElement | null }) => {
      if (!columnRef.current) return;
      
      const column = columnRef.current;
      const images = column.querySelectorAll('img');
      
      if (images.length === 0) return;
      
      // Get first image to calculate its height
      const firstImage = images[0] as HTMLImageElement;
      
      // Wait for image to load to get its dimensions
      const handleImageLoad = () => {
        const columnHeight = column.offsetHeight;
        const imageHeight = firstImage.height;
        
        // Calculate how many images we need to fill the track and then some
        const imagesNeeded = Math.ceil((columnHeight * 4) / imageHeight) + 4;
        const currentImages = images.length;
        
        // Add more images if needed
        if (currentImages < imagesNeeded) {
          for (let i = 0; i < imagesNeeded - currentImages; i++) {
            const clone = firstImage.cloneNode(true) as HTMLImageElement;
            // Ensure image is fully loaded before appending
            clone.onload = () => {
              // This helps prevent layout shifts
              clone.style.opacity = '1';
            };
            clone.style.opacity = '0';
            column.appendChild(clone);
          }
        }
      };
      
      // If image is already loaded
      if (firstImage.complete) {
        handleImageLoad();
      } else {
        firstImage.onload = handleImageLoad;
      }
    };

    // Apply to all columns
    ensureSmoothAnimation(column1Ref);
    ensureSmoothAnimation(column2Ref);
    ensureSmoothAnimation(column3Ref);
    
    // Handle window resize
    const handleResize = () => {
      ensureSmoothAnimation(column1Ref);
      ensureSmoothAnimation(column2Ref);
      ensureSmoothAnimation(column3Ref);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Also run on initial load to prevent layout shifts
    window.addEventListener('load', handleResize);
    
    // Add delayed re-calculation to handle late-loading images
    const delayedResize = setTimeout(handleResize, 1000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      clearTimeout(delayedResize);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Primary SEO Meta Tags */}
        <title>Web Development Services | Responsive & SEO-Optimized Websites</title>
        <meta name="description" content="Expert web development services for startups and enterprises. We create responsive, SEO-optimized websites that drive growth and help your brand stand out." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Open Graph / Social Media Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web Development Services | Responsive & SEO-Optimized Websites" />
        <meta property="og:description" content="Expert web development services for startups and enterprises. We create responsive, SEO-optimized websites that drive growth and help your brand stand out." />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Services | Responsive & SEO-Optimized Websites" />
        <meta name="twitter:description" content="Expert web development services for startups and enterprises. We create responsive, SEO-optimized websites that drive growth and help your brand stand out." />
        <meta name="twitter:image" content="/images/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.yourwebsite.com" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preconnect for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font with preload for better performance */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Web Development Services",
            "url": "https://www.yourwebsite.com",
            "description": "Expert web development services for startups and enterprises",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.yourwebsite.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Web Development Agency",
            "image": "/images/og-image.jpg",
            "url": "https://www.yourwebsite.com",
            "telephone": "+1-XXX-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Web Dev Street",
              "addressLocality": "Tech City",
              "addressRegion": "CA",
              "postalCode": "12345",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 37.7749,
              "longitude": -122.4194
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "17:00"
            },
            "sameAs": [
              "https://www.linkedin.com/company/yourcompany",
              "https://www.twitter.com/yourcompany",
              "https://www.facebook.com/yourcompany"
            ]
          })}
        </script>
      </Head>
      
      <div 
        className="hero-container" 
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#04091d',
          overflow: 'hidden',
          height: '89vh',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          fontFamily: 'Poppins, sans-serif',
        }}
        // Add semantic role for accessibility
        role="main"
      >
        {/* Full screen overlay with gradient for depth */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.5) 100%)',
          zIndex: 10,
        }}>
          {/* Content positioned on the left side with animation classes */}
          <div 
            className="content-container" 
            style={{
              padding: '70px 50px',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '100%',
              width: '100%',
              textAlign: 'left', // Default to left aligned for desktop
              alignItems: 'flex-start', // Default to left aligned for desktop
            }}
          >
            <div 
              className="slide-down" 
              style={{ 
                color: '#0099cc', 
                fontSize: '20px', 
                marginBottom: '20px', 
                fontWeight: '500' 
              }}
              // Improve accessibility
              aria-label="Service Description"
            >
              {displayContent.short_title}
            </div>
            <h1 
              className="heading-animation" 
              style={{ 
                fontSize: '56px', 
                marginBottom: '25px', 
                fontWeight: '700', 
                lineHeight: 1.1, 
                textAlign: 'left' 
              }}
            >
              <div className="first-line">{formattedTitle.firstLine}</div>
              <div className="second-line">{formattedTitle.secondLine}</div>
            </h1>
            <p 
              className="fade-in" 
              style={{ 
                fontSize: '20px', 
                lineHeight: 1.6, 
                marginBottom: '35px', 
                maxWidth: '700px', 
                textAlign: 'left' 
              }}
            >
              {displayContent.description}
            </p>
            <div 
              className="buttons-animation" 
              style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'flex-start' 
              }}
            >
              <Link href="/portfolio">
              <button 
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid #0099cc',
                  padding: '14px 28px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
                // Add semantic attributes for accessibility
                aria-label={displayContent.first_button_text}
                onClick={() => handleNavigation('/portfolio')}
              >
                {displayContent.first_button_text}
              </button>
              </Link>
              <Link href="/contact">
              <button 
                style={{
                  backgroundColor: '#0099cc',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
                // Add semantic attributes for accessibility
                aria-label={displayContent.second_button_text}
                onClick={() => handleNavigation('/ContactPage')}
              >
                {displayContent.second_button_text}
              </button>
              </Link>
            </div>
          </div>
          <div 
            className="tech-text" 
            style={{ 
              position: 'absolute', 
              bottom: '30px', 
              left: '0',
              right: '0',
              textAlign: 'center',
              fontSize: '14px',
              color: '#aaa',
              zIndex: 11
            }}
          >
            Built With Industry-Leading Technologies
          </div>
        </div>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-100%',
            left: 0,
            width: '100%',
            height: '300%',
            transform: 'rotate(15deg)',
            transformOrigin: 'center',
            willChange: 'transform',
          }}>
            {/* First Column - moving down */}
            <div 
              ref={column1Ref}
              className="diagonal-column column-1"
              style={{
                position: 'absolute',
                height: '100%',
                width: '25%',
                left: '40%',
                display: 'flex',
                flexDirection: 'column',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animation: 'marquee-diagonal-down 65s linear infinite',
                willChange: 'transform',
              }}
            >
              <img 
                src="/images/col-left.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>
            
            {/* Middle Column - moving up */}
            <div 
              ref={column2Ref}
              className="diagonal-column column-2"
              style={{
                position: 'absolute',
                height: '100%',
                width: '25%',
                left: '65%',
                display: 'flex',
                flexDirection: 'column',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animation: 'marquee-diagonal-up 55s linear infinite',
                animationDelay: '-15s',
                willChange: 'transform',
              }}
            >
              <img 
                src="/images/col-middle.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>
            
            {/* Third Column - moving down */}
            <div 
              ref={column3Ref}
              className="diagonal-column column-3"
              style={{
                position: 'absolute',
                height: '100%',
                width: '25%',
                left: '90%',
                display: 'flex',
                flexDirection: 'column',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animation: 'marquee-diagonal-down 65s linear infinite',
                animationDelay: '-25s',
                willChange: 'transform',
              }}
            >
              <img 
                src="/images/col-right.png" 
                alt=""
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  marginBottom: '1px',
                  willChange: 'transform',
                }}
                loading="eager"
              />
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          
          /* Smooth animation with GPU acceleration */
          @keyframes marquee-diagonal-up {
            0% {
              transform: translateY(0%) translateZ(0);
            }
            100% {
              transform: translateY(-50%) translateZ(0);
            }
          }

          @keyframes marquee-diagonal-down {
            0% {
              transform: translateY(-50%) translateZ(0);
            }
            100% {
              transform: translateY(0%) translateZ(0);
            }
          }
          
          /* Left content animations - improved for smoothness */
          .hero-container .slide-down {
            animation: slideDown 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }
          
          .hero-container .heading-animation {
            overflow: hidden;
          }
          
          .hero-container .heading-animation div {
            animation: slideInRight 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }
          
          .hero-container .heading-animation div:nth-child(1) {
            animation-delay: 0.3s;
          }
          
          .hero-container .heading-animation div:nth-child(2) {
            animation-delay: 0.6s;
          }
          
          .hero-container .fade-in {
            animation: fadeIn 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 0.7s;
            opacity: 0;
            will-change: opacity;
          }
          
          .hero-container .buttons-animation {
            animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1s;
            opacity: 0;
            will-change: transform, opacity;
          }
          
          .hero-container .tech-text {
            animation: fadeIn 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1.3s;
            opacity: 0;
            will-change: opacity;
          }
          
          @keyframes slideDown {
            from {
              transform: translateY(-20px) translateZ(0);
              opacity: 0;
            }
            to {
              transform: translateY(0) translateZ(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(-30px) translateZ(0);
              opacity: 0;
            }
            to {
              transform: translateX(0) translateZ(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes fadeInUp {
            from {
              transform: translateY(20px) translateZ(0);
              opacity: 0;
            }
            to {
              transform: translateY(0) translateZ(0);
              opacity: 1;
            }
          }
          
          /* Button hover effects - SCOPED to hero-container only */
          .hero-container button {
            transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
            will-change: transform, box-shadow;
          }
          
          .hero-container button:hover {
            transform: translateY(-3px) translateZ(0);
            box-shadow: 0 5px 15px rgba(0, 153, 204, 0.3);
          }
          
          /* Force images to start in their initial positions */
          .hero-container .diagonal-column img {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          /* Responsive adjustments - Mobile height change */
          @media (max-width: 768px) {
            .hero-container {
              height: 82vh !important;
            }
            
            .hero-container .content-container {
              padding: 50px 30px !important;
              justify-content: center !important;
              padding-top: 100px !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .hero-container .content-container h1 {
              font-size: 44px !important;
              text-align: center !important;
              line-height: 1.2 !important;
            }
            
            .hero-container .heading-animation .first-line,
            .hero-container .heading-animation .second-line {
              display: block !important;
              text-align: center !important;
            }
            
            .hero-container .content-container p {
              text-align: center !important;
            }
            
            .hero-container .buttons-animation {
              justify-content: center !important;
            }
            
            .hero-container .content-container p {
              font-size: 16px !important;
            }
            
            .hero-container .diagonal-column {
              width: 30% !important;
            }
            
            .hero-container .column-1 {
              left: 30% !important;
            }
            
            .hero-container .column-2 {
              left: 60% !important;
            }
            
            .hero-container .column-3 {
              left: 90% !important;
            }
          }
          
          /* Small tablet and large mobile */
          @media (max-width: 640px) {
            .hero-container {
              height: 82vh !important;
            }
            
            .hero-container .content-container {
              padding: 40px 25px !important;
              padding-top: 100px !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .hero-container .content-container h1 {
              font-size: 36px !important;
              margin-bottom: 20px !important;
              line-height: 1.2 !important;
              text-align: center !important;
            }
            
            .hero-container .heading-animation .heading-text span {
              display: inline-block !important;
            }
            
            .hero-container .content-container p {
              font-size: 15px !important;
              margin-bottom: 25px !important;
              text-align: center !important;
            }
            
            .hero-container .buttons-animation {
              flex-direction: row !important;
              gap: 10px !important;
              width: 100%;
              justify-content: center !important;
            }
            
            .hero-container button {
              padding: 10px 20px !important;
              font-size: 14px !important;
            }
          }
          
          /* Mobile view with only two columns visible */
          @media (max-width: 480px) {
            .hero-container {
              height: 82vh !important;
            }
            
            .hero-container .content-container {
              padding: 30px 20px !important;
              padding-top: 90px !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .hero-container .content-container h1 {
              font-size: 32px !important;
              margin-bottom: 15px !important;
              text-align: center !important;
              line-height: 1.3 !important;
            }
            
            /* Force heading to display in two lines only on mobile */
            .hero-container .heading-animation .first-line,
            .hero-container .heading-animation .second-line {
              display: block !important;
              text-align: center !important;
            }
            
            .hero-container .content-container p {
              font-size: 14px !important;
              margin-bottom: 20px !important;
              text-align: center !important;
            }
            
            .hero-container .buttons-animation {
              flex-direction: row !important;
              gap: 8px !important;
              width: 100%;
              justify-content: center !important;
            }
            
            .hero-container button {
              padding: 10px 16px !important;
              font-size: 13px !important;
              white-space: nowrap !important;
              flex: 1 !important;
            }
            
            .hero-container .diagonal-column {
              width: 45% !important;
            }
            
            .hero-container .column-1 {
              left: 35% !important;
              z-index: 1;
              opacity: 0.7;
            }
            
            .hero-container .column-2 {
              left: 80% !important;
              z-index: 2;
              opacity: 0.7;
            }
            
            .hero-container .column-3 {
              display: none !important; /* Hide the third column on mobile */
            }
            
            .hero-container .tech-text {
              left: 20px !important;
              bottom: 20px !important;
              font-size: 12px !important;
            }
            
            .hero-container .slide-down {
              font-size: 16px !important;
            }
          }
          
          /* Extra small mobile devices */
          @media (max-width: 360px) {
            .hero-container {
              height: 82vh !important;
            }
            
            .hero-container .content-container {
              text-align: center !important;
              align-items: center !important;
            }
            
            .hero-container .content-container h1 {
              font-size: 28px !important;
              text-align: center !important;
              line-height: 1.3 !important;
            }
            
            /* Ensure heading text stays in two lines */
            .hero-container .heading-animation .first-line,
            .hero-container .heading-animation .second-line {
              display: block !important;
              text-align: center !important;
            }
            
            .hero-container .content-container p {
              font-size: 13px !important;
              text-align: center !important;
            }
            
            .hero-container .buttons-animation {
              gap: 8px !important;
              justify-content: center !important;
            }
            
            .hero-container button {
              padding: 10px 16px !important;
              font-size: 12px !important;
            }
            
            .hero-container .slide-down {
              font-size: 14px !important;
            }
          }
          
          /* Prevent animation flashing on page load */
          @media (prefers-reduced-motion: no-preference) {
            .hero-container .diagonal-column {
              will-change: transform;
            }
          }
          
          /* Optimize for devices with reduced motion preferences */
          @media (prefers-reduced-motion: reduce) {
            .hero-container .diagonal-column {
              animation-duration: 120s !important;
            }
            
            .hero-container .slide-down,
            .hero-container .heading-animation .heading-text,
            .hero-container .fade-in,
            .hero-container .buttons-animation,
            .hero-container .tech-text {
              animation-duration: 1.5s !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import Head from 'next/head';

// Initialize fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

// SEO metadata for the Hero component
const SEOMetadata = () => (
  <Head>
    {/* Primary Meta Tags */}
    <title>Crafting Powerful Web Experiences That Convert & Perform | Your Company</title>
    <meta name="title" content="Crafting Powerful Web Experiences That Convert & Perform | Your Company" />
    <meta name="description" content="From idea to execution, we create powerful web solutions that drive conversions and performance. Speak with our experts today or view our case studies." />
    
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourwebsite.com/" />
    <meta property="og:title" content="Crafting Powerful Web Experiences That Convert & Perform" />
    <meta property="og:description" content="From idea to execution, we create powerful web solutions that drive conversions and performance." />
    <meta property="og:image" content="https://yourwebsite.com/images/hero-banner-og.jpg" />
    
    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://yourwebsite.com/" />
    <meta property="twitter:title" content="Crafting Powerful Web Experiences That Convert & Perform" />
    <meta property="twitter:description" content="From idea to execution, we create powerful web solutions that drive conversions and performance." />
    <meta property="twitter:image" content="https://yourwebsite.com/images/hero-banner-twitter.jpg" />

    {/* Structured data for better SEO */}
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Your Company Name",
          "url": "https://yourwebsite.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://yourwebsite.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}
    </script>
  </Head>
);

export default function HeroBanner() {
  // Navigation URLs for buttons
  const contactUrl = "/contact";
  const caseStudiesUrl = "/case-studies";
  
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isMounted, setIsMounted] = useState(false);
  
  // Button hover state handlers
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  // Keep original responsive styles
  const getResponsiveStyles = (width: number): {
    subtitleStyles: CSSProperties,
    titleStyles: CSSProperties,
    buttonContainerStyles: CSSProperties
  } => {
    return {
      subtitleStyles: {
        fontSize: width < 768 ? '20px' : '25px',
      },
      titleStyles: {
        fontSize: width < 768 ? '32px' : width < 1024 ? '48px' : '65px',
        lineHeight: width < 768 ? '1.3' : width < 1024 ? '1.2' : '98px',
      },
      buttonContainerStyles: {
        flexDirection: width < 768 ? 'column' : 'row' as 'column' | 'row',
      }
    };
  };

  // Get responsive styles
  const responsive = getResponsiveStyles(windowWidth);

  useEffect(() => {
    // Set isMounted to true once component is mounted
    setIsMounted(true);
    
    // Set initial visibility based on scroll position
    const checkInitialVisibility = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const isCurrentlyVisible = rect.top <= window.innerHeight * 0.9;
        setIsVisible(isCurrentlyVisible);
      }
    };
    
    // Update on initial load
    checkInitialVisibility();

    // Enhanced Intersection Observer with better thresholds
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Optional: Hide when scrolled away
          // setIsVisible(false);
        }
      },
      {
        threshold: [0.1, 0.2, 0.3], // Multiple thresholds for smoother detection
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters viewport
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    // Window resize handler
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Only add listeners on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', checkInitialVisibility);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', checkInitialVisibility);
      }
    };
  }, []);

  // Base styles - Now conditional based on isMounted to prevent issues during SSR
  const bannerStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '750px',
    margin: '0',
    padding: '0',
    background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -28.61%, #04091D 210%)',
    border: '1px solid #000000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: isMounted ? 'all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none', // Only apply transition when mounted
    opacity: isMounted ? (isVisible ? 1 : 0) : 1, // Default to visible if not mounted yet
    transform: isMounted ? (isVisible ? 'translateY(0)' : 'translateY(40px)') : 'none',
    maxWidth: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const overlayStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
  };

  const gradientOverlayStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(270deg, rgba(4, 9, 29, 0) 0%, #04091D 100%)',
    zIndex: 10,
  };

  const contentContainerStyles: CSSProperties = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0 16px',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
  };

  const subtitleStyles: CSSProperties = {
    color: '#0D94BB',
    textAlign: 'center',
    marginBottom: '16px',
    transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    fontStyle: 'normal',
    fontWeight: 600,
    ...responsive.subtitleStyles
  };

  const titleStyles: CSSProperties = {
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: '100%',
    marginBottom: '48px',
    transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 400ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    fontStyle: 'normal',
    fontWeight: 600,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    ...responsive.titleStyles
  };

  const buttonContainerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 600ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    ...responsive.buttonContainerStyles
  };

  // Enhanced primary button styles
  const primaryButtonStyles: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    padding: '12px 32px',
    backgroundColor: '#0D98BA',
    color: '#04091D', // Keeping original color
    borderRadius: '6px',
    border: '2px solid #0D98BA',
    transition: 'all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy effect
    cursor: 'pointer',
    boxShadow: isPrimaryHovered ? '0 8px 15px rgba(13, 152, 186, 0.3)' : 'none',
    transform: isPrimaryHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0)',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center' as 'center',
  };

  // Enhanced secondary button styles
  const secondaryButtonStyles: CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 600,
    padding: '12px 32px',
    backgroundColor: 'transparent',
    color: '#0D98BA', 
    borderRadius: '6px',
    border: '2px solid #0D98BA',
    transition: 'all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy effect
    cursor: 'pointer',
    boxShadow: isSecondaryHovered ? '0 8px 15px rgba(13, 152, 186, 0.15)' : 'none',
    transform: isSecondaryHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0)',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center' as 'center',
  };

  const imageContainerStyles: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  };

  // Let's add a wrapper style to ensure no scrolling at all
  const heroWrapperStyle: CSSProperties = {
    width: '100%',
    overflow: 'hidden', // Hide both horizontal and vertical scrollbars
    position: 'relative',
  };

  return (
    <>
      {/* Add SEO metadata */}
      <SEOMetadata />
      
      {/* Hero Section with semantic HTML for better SEO */}
      <section aria-label="Hero Banner" style={heroWrapperStyle}>
        <div ref={bannerRef} style={bannerStyles}>
          {/* Background image with overlay */}
          <div style={overlayStyles}>
            <div style={gradientOverlayStyles}></div>
            {/* Image with proper alt text for SEO */}
            <div style={imageContainerStyles}>
              <Image 
                src="/images/service-bg.jpg"
                alt="Web development services background showcasing digital transformation"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
              />
            </div>
          </div>

          {/* Content Container with semantic HTML */}
          <div style={contentContainerStyles}>
            {/* Subtitle */}
            <p 
              className={poppins.className}
              style={subtitleStyles}
              aria-label="Tagline"
            >
              From Idea to Execution
            </p>

            {/* Main Title - Semantic heading with proper markup */}
            <h1 
              className={poppins.className}
              style={titleStyles}
              itemProp="headline"
            >
              <span style={{ 
                display: 'inline-block', 
                maxWidth: '100%',
              }}>
                Crafting <span style={{ color: '#0D94BB' }}>Powerful</span> Web Experiences 
                {windowWidth < 768 ? ' ' : <br />} That Convert & Perform
              </span>
            </h1>

            {/* Buttons with navigation */}
            <div style={buttonContainerStyles}>
              {/* Primary Button with Link */}
              <Link href={contactUrl} passHref legacyBehavior>
                <a 
                  className={lato.className}
                  style={primaryButtonStyles}
                  onMouseEnter={() => setIsPrimaryHovered(true)}
                  onMouseLeave={() => setIsPrimaryHovered(false)}
                  aria-label="Contact our web development experts"
                  role="button"
                >
                  Speak With Our Experts
                </a>
              </Link>

              {/* Secondary Button with Link */}
              <Link href={caseStudiesUrl} passHref legacyBehavior>
                <a 
                  className={lato.className}
                  style={secondaryButtonStyles}
                  onMouseEnter={() => setIsSecondaryHovered(true)}
                  onMouseLeave={() => setIsSecondaryHovered(false)}
                  aria-label="View our web development case studies"
                  role="button"
                >
                  View Case Studies
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
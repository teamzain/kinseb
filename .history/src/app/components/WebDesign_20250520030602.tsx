'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Poppins, Lato } from 'next/font/google';
import Head from 'next/head';

// Load fonts locally
const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// SEO Component for Web Design Section with improved metadata
const WebDesignSEO = () => (
  <Head>
    {/* Primary Meta Tags */}
    <title>Web Design Services | Crafting Digital Masterpieces That Convert</title>
    <meta name="description" content="Our web design services blend aesthetic excellence with user intent, delivering visuals that connect, convert, and endure. Explore our design expertise." />
    <meta name="keywords" content="web design, UI/UX design, responsive design, website creation, digital branding" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="canonical" href="https://yourwebsite.com/services/web-design" />
    
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourwebsite.com/services/web-design" />
    <meta property="og:title" content="Web Design Services | Crafting Digital Masterpieces" />
    <meta property="og:description" content="From branding to UI/UX, our design process blends aesthetic excellence with user intent, delivering visuals that connect and convert." />
    <meta property="og:image" content="https://yourwebsite.com/images/web-design-og.jpg" />
    <meta property="og:image:alt" content="Web design services illustration" />
    <meta property="og:site_name" content="Your Company Name" />
    
    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://yourwebsite.com/services/web-design" />
    <meta property="twitter:title" content="Web Design Services | Crafting Digital Masterpieces" />
    <meta property="twitter:description" content="Our web design services blend aesthetic excellence with user intent, delivering visuals that connect, convert, and endure." />
    <meta property="twitter:image" content="https://yourwebsite.com/images/web-design-twitter.jpg" />
    <meta property="twitter:image:alt" content="Web design services showcase" />
    
    {/* Structured data for rich snippets - expanded and enhanced */}
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web Design Services",
          "description": "From branding to UI/UX, our design process blends aesthetic excellence with user intent, delivering visuals that connect, convert, and endure.",
          "provider": {
            "@type": "Organization",
            "name": "Your Company Name",
            "url": "https://yourwebsite.com/",
            "logo": "https://yourwebsite.com/images/logo.png"
          },
          "serviceType": "Web Design",
          "areaServed": {
            "@type": "Country",
            "name": "United States"
          },
          "offers": {
            "@type": "Offer",
            "price": "1000.00",
            "priceCurrency": "USD"
          },
          "image": "https://yourwebsite.com/images/web-design-service.jpg"
        }
      `}
    </script>
  </Head>
);

const WebDesignSection = () => {
  // Navigation URL for the button
  const webDesignServicesUrl = "/services/web-design";
  
  // Animation states
  const [animated, setAnimated] = useState(false);
  
  // Intersection Observer hook - only trigger when section is 20% visible
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  // Reset animation state when not in view and set it when in view
  useEffect(() => {
    if (!inView) {
      setAnimated(false);
    } else {
      setAnimated(true);
    }
  }, [inView]);

  // Staggered animation delay values (in ms)
  const animationDelays = {
    title: 0,
    subtitle: 200,
    description: 400,
    button: 600,
    image: 300,
  };

  // Enhanced media query hook for better responsiveness with multiple breakpoints
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  
  useEffect(() => {
    // Function to handle viewport changes with multiple breakpoints
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1200,
        isDesktop: width >= 1200
      });
    };
    
    // Set initial value
    if (typeof window !== 'undefined') {
      handleResize();
    }
    
    // Add event listener with debounce for performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return (
    <>
      {/* Add SEO metadata */}
      <WebDesignSEO />
      
      {/* Main section with semantic HTML structure */}
      <section 
        ref={ref}
        aria-label="Web Design Services" 
        itemScope
        itemType="https://schema.org/Service"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '650px',
          background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
          padding: '40px 20px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: screenSize.isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: screenSize.isMobile ? '1rem' : '2rem',
          position: 'relative',
          zIndex: 1,
          padding: screenSize.isMobile ? '0' : '0 20px',
        }}>
          {/* Left side - Content Container */}
          <div style={{
            flex: screenSize.isMobile ? '1 1 auto' : '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: screenSize.isMobile ? '1rem 1rem 0.5rem 1rem' : '2rem',
            width: '100%',
            maxWidth: screenSize.isMobile ? '100%' : (screenSize.isTablet ? '60%' : '50%'),
          }}>
            {/* Title with schema markup */}
            <h2 
              className={poppins.className}
              itemProp="name"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: '1.2',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '1.5rem',
                transform: animated ? 'translateY(0)' : 'translateY(30px)',
                opacity: animated ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                transitionDelay: `${animationDelays.title}ms`,
              }}
            >
              Web Design
            </h2>

            {/* Subtitle */}
            <h3 
              className={poppins.className}
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
                lineHeight: '1.3',
                fontWeight: 600,
                color: '#0D98BA',
                marginBottom: '1.25rem',
                transform: animated ? 'translateY(0)' : 'translateY(30px)',
                opacity: animated ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                transitionDelay: `${animationDelays.subtitle}ms`,
              }}
            >
              Crafting Digital Masterpieces Through Strategic Design
            </h3>

            {/* Description with schema markup */}
            <p 
              className={lato.className}
              itemProp="description"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: '1.5',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '2rem',
                maxWidth: '650px',
                transform: animated ? 'translateY(0)' : 'translateY(30px)',
                opacity: animated ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                transitionDelay: `${animationDelays.description}ms`,
              }}
            >
              From branding to UI/UX, our design process blends aesthetic excellence with user intent. Whether you're building from scratch or refining your existing identity, we deliver visuals that connect, convert, and endure.
            </p>

            {/* Button with Link component for navigation */}
            <div
              style={{
                position: 'relative',
                width: 'fit-content',
                transform: animated ? 'translateY(0)' : 'translateY(30px)',
                opacity: animated ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                transitionDelay: `${animationDelays.button}ms`,
              }}
            >
              <Link href={webDesignServicesUrl} passHref legacyBehavior>
                <a 
                  aria-label="Explore Web Design Services"
                  className={lato.className}
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    background: '#0D98BA',
                    color: '#04091D',
                    border: '2px solid #0D98BA',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    // Focus styles for keyboard navigation
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(13, 152, 186, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0D98BA';
                    e.currentTarget.style.color = '#04091D';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 152, 186, 0.6)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = '#0D98BA';
                    e.currentTarget.style.color = '#04091D';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  Explore Web Design Services
                </a>
              </Link>
            </div>
          </div>

          {/* Right side - Image Container with completely revamped responsive handling */}
          <div style={{
            flex: screenSize.isMobile ? '1 1 auto' : '1 1 500px',
            position: 'relative',
            width: screenSize.isMobile ? '100%' : (screenSize.isTablet ? '40%' : '50%'),
            aspectRatio: screenSize.isMobile ? '4/3' : '6/5',
            margin: screenSize.isMobile ? '0 auto' : 'auto',
            overflow: 'visible',
            transform: animated ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: animated ? 1 : 0,
            transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
            transitionDelay: `${animationDelays.image}ms`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'visible',
            }}>
              <Image
                src="/images/about-3.png" 
                alt="Web design showcased on multiple devices including desktop, tablet, and mobile" 
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 40vw, 600px"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  width: '100%',
                  height: 'auto',
                  maxWidth: screenSize.isMobile ? '95%' : '100%',
                  maxHeight: screenSize.isMobile ? 'auto' : '100%',
                }}
                width={600}
                height={500}
                priority={true} // Load image with priority for better LCP
                quality={90}
              />
            </div>
          </div>
        </div>
        
        {/* Removed hidden WebP preload and replaced with better image optimization */}
        <picture>
          <source srcSet="/images/about-3.webp" type="image/webp" />
          <source srcSet="/images/about-3.png" type="image/png" />
          {/* This img is hidden but helps with SEO and preloading */}
          <img 
            src="/images/about-3.png" 
            alt="Web design services" 
            width="1" 
            height="1" 
            style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px' }} 
            aria-hidden="true" 
          />
        </picture>
      </section>
    </>
  );
};

export default WebDesignSection;
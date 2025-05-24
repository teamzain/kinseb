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

// SEO Component for Web Design Section
const WebDesignSEO = () => (
  <Head>
    {/* Primary Meta Tags */}
    <title>Web Design Services | Crafting Digital Masterpieces That Convert</title>
    <meta name="description" content="Our web design services blend aesthetic excellence with user intent, delivering visuals that connect, convert, and endure. Explore our design expertise." />
    
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Web Design Services | Crafting Digital Masterpieces" />
    <meta property="og:description" content="From branding to UI/UX, our design process blends aesthetic excellence with user intent, delivering visuals that connect and convert." />
    <meta property="og:image" content="https://yourwebsite.com/images/web-design-og.jpg" />
    
    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Web Design Services | Crafting Digital Masterpieces" />
    <meta property="twitter:description" content="Our web design services blend aesthetic excellence with user intent, delivering visuals that connect, convert, and endure." />
    <meta property="twitter:image" content="https://yourwebsite.com/images/web-design-twitter.jpg" />
    
    {/* Structured data for rich snippets */}
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
            "url": "https://yourwebsite.com/"
          },
          "serviceType": "Web Design",
          "areaServed": {
            "@type": "Country",
            "name": "United States"
          }
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
  // Removed triggerOnce to allow repeated animations
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

  // Media query helper (to be used in inline styles)
  const getResponsiveStyles = useCallback(() => {
    // These would normally be in a useEffect with window.matchMedia
    // But for inline styles, we'll handle responsiveness with min/max width and clamp
    return {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Left side - Content Container */}
          <div style={{
            flex: '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem',
            order: getResponsiveStyles().isMobile ? 1 : 1, // First for both desktop and mobile
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

          {/* Right side - Image Container with responsive sizing and improved SEO */}
          <div style={{
            flex: '1 1 500px',
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
          
            order: getResponsiveStyles().isMobile ? 2 : 2, // Second for both desktop and mobile
          }}>
            <Image
              src="/images/about-3.png" 
              alt="Web design showcased on multiple devices including desktop, tablet, and mobile" 
              width={500}
              height={422}
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                width: '100%',
                height: 'auto',
                maxHeight: '100%',
              }}
              priority={false}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WebDesignSection;
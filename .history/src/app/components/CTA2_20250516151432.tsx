'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import Head from 'next/head'; // Import Head for SEO meta tags
import { Poppins, Lato } from 'next/font/google';
import styles from './ProjectCTA.module.css';

// Font optimization with next/font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-lato',
});

// Define the component props interface
interface ProjectCTAProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string; // Added buttonLink prop for navigation
  backgroundImage?: string;
  onButtonClick?: () => void;
  metaTitle?: string; // Added for SEO
  metaDescription?: string; // Added for SEO
  metaKeywords?: string; // Added for SEO
  metaImage?: string; // Added for Open Graph image
}

export default function ProjectCTA({
  heading = "Have a Project in Mind?",
  subheading = "Let's Build Something Great Together",
  buttonText = "Let's Talk",
  buttonLink = "/contact", // Default link to contact page
  backgroundImage = "/images/cta2.jpg",
  onButtonClick = () => {},
  metaTitle = "Start Your Project | Professional Web Development Services",
  metaDescription = "Ready to start your next project? Contact our team of experts and let's build something exceptional together. Get a free consultation today.",
  metaKeywords = "web development, project consultation, digital solutions, custom websites",
  metaImage = "/images/cta2.jpg",
}: ProjectCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageLoaded = useRef(false);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development Services",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name",
      "url": "https://yourwebsite.com"
    },
    "offers": {
      "@type": "Offer",
      "url": buttonLink
    }
  };

  useEffect(() => {
    // Preload background image
    const img = new globalThis.Image();
    img.src = backgroundImage;
    img.onload = () => {
      if (!imageLoaded.current) {
        setIsImageLoaded(true);
        imageLoaded.current = true;
      }
    };

    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay to ensure smoother animation after scrolling
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [backgroundImage]);

  // Handle button click while preserving the Link navigation
  const handleButtonClick = (e: React.MouseEvent) => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        {/* Primary Meta Tags */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        
        {/* Canonical URL - Important for SEO */}
        <link rel="canonical" href={`https://yourwebsite.com${buttonLink}`} />
        
        {/* Schema.org JSON-LD structured data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(structuredData) 
          }}
        />
      </Head>
      
      <div 
        ref={sectionRef} 
        className={`${styles.container} ${poppins.variable} ${lato.variable} ${isVisible ? styles.visible : ''}`}
        id="project-cta"
        aria-labelledby="cta-heading"
      >
        {/* Skeleton/placeholder with dominant background color */}
        <div className={styles.backgroundSkeleton} aria-hidden="true"></div>
        
        {/* Background image with overlay */}
        <div 
          className={`${styles.backgroundImage} ${isImageLoaded ? styles.loaded : ''}`}
          aria-hidden="true"
        >
          <Image
            src={backgroundImage}
            alt="" // Empty alt since this is a decorative image
            fill
            sizes="100vw"
            priority
            quality={90}
            onLoad={() => setIsImageLoaded(true)}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className={styles.overlay}></div>
        </div>
        
        {/* Content container */}
        <div className={styles.content}>
          <h2 
            id="cta-heading"
            className={`${styles.heading} ${isVisible ? styles.animate : ''}`}
          >
            {heading.includes('Project') ? (
              <>
                {heading.split('Project')[0]}
                <span className={styles.highlight}>Project</span>
                {heading.split('Project')[1]}
              </>
            ) : heading}
          </h2>
          
          <p 
            className={`${styles.subheading} ${isVisible ? styles.animate : ''}`}
          >
            {subheading}
          </p>
          
          <div className={`${styles.buttonContainer} ${isVisible ? styles.animate : ''}`}>
            {/* Using Next.js Link component for navigation */}
            <Link 
              href={buttonLink} 
              passHref
              onClick={handleButtonClick}
              aria-label={`Contact us about your ${heading.toLowerCase().includes('project') ? 'project' : 'inquiry'}`}
            >
              <div 
                className={`${styles.button} ${isHovered ? styles.hovered : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  // Accessibility: handle keyboard activation
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onButtonClick) onButtonClick();
                  }
                }}
              >
                {buttonText}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
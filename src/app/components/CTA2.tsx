'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
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
  buttonLink?: string;
  backgroundImage?: string;
  onButtonClick?: () => void;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaImage?: string;
}

export default function ProjectCTA({
  heading = "Have a Project in Mind?",
  subheading = "Let's Build Something Great Together",
  buttonText = "Let's Talk",
  buttonLink = "/contact",
  backgroundImage = "/images/cta2.jpg",
  onButtonClick = () => {},
  metaTitle = "Start Your Project | Professional Web Development Services",
  metaDescription = "Ready to start your next project? Contact our team of experts and let's build something exceptional together. Get a free consultation today.",
  metaKeywords = "web development, project consultation, digital solutions, custom websites",
  metaImage = "/images/cta2.jpg",
}: ProjectCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development Services",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Kinseb Marketing",
      "url": "https://kinsebwebdevelopment.com/"
    },
    "offers": {
      "@type": "Offer",
      "url": buttonLink
    }
  };

  useEffect(() => {
    // Intersection Observer for scroll animation - only animate text when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay for smooth animation after element enters viewport
          setTimeout(() => {
            setIsVisible(true);
          }, 150);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -80px 0px', // Start animation slightly before fully in view
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
  }, []);

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
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        
        <link rel="canonical" href={`https://kinsebwebdevelopment.com/${buttonLink}`} />
        
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(structuredData) 
          }}
        />
      </Head>
      
      <div 
        ref={sectionRef} 
        className={`${styles.container} ${poppins.variable} ${lato.variable}`}
        id="project-cta"
        aria-labelledby="cta-heading"
      >        
        {/* Background image - static, no animation */}
        <div className={styles.backgroundImage} aria-hidden="true">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            priority
            quality={90}
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
            <Link 
              href={buttonLink} 
              passHref
              onClick={handleButtonClick}
              aria-label={`Contact us about your ${heading.toLowerCase().includes('project') ? 'project' : 'inquiry'}`}
              style={{ textDecoration: 'none' }}
            >
              <div 
                className={`${styles.button} ${isHovered ? styles.hovered : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
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
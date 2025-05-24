'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

export default function ProjectCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageLoaded = useRef(false);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = '/images/cta2.jpg';
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
  }, []);

  return (
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
          src="/images/cta2.jpg"
          alt=""
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
          Have a <span className={styles.highlight}>Project</span> in Mind?
        </h2>

        <p 
          className={`${styles.subheading} ${isVisible ? styles.animate : ''}`}
        >
          Let's Build Something Great Together
        </p>

        <div className={`${styles.buttonContainer} ${isVisible ? styles.animate : ''}`}>
          <button 
            className={`${styles.button} ${isHovered ? styles.hovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Contact us about your project"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </div>
  );
}
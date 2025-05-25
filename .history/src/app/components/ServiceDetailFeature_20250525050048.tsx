'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';
import { getProjectsByServiceId } from './featuredWorkData';
import { useRouter } from 'next/navigation';
// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-poppins'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-lato'
});

// Featured project interface
interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FeaturedWorkProps {
  serviceId: number;
  backgroundImage: string;
  monitorImage: string;
}

const FeaturedWorkShowcase: React.FC<FeaturedWorkProps> = ({ serviceId, backgroundImage, monitorImage }) => {
  // Get service-specific projects
  const projects = getProjectsByServiceId(serviceId);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
const handleQuoteClick = () => {
  router.push('/contact');
};
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (isMobile && isVisible && projects.length > 1) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change slide every 4 seconds

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    }
  }, [isMobile, isVisible, projects.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation effect when slide changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isAnimating && !isMobile) {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (!isAnimating && !isMobile) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      );
    }
  };

  const handleIndicatorClick = (index: number) => {
    if (!isAnimating) {
      setCurrentIndex(index);
      // Reset auto-scroll timer on mobile when user interacts
      if (isMobile && autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => 
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
          );
        }, 4000);
      }
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <div ref={containerRef} className={`${poppins.variable} ${lato.variable} featured-work-container`}>
      <div className="content-wrapper">
        <div className={`header-section ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="featured-work-title">
            Our Featured <span className="highlight">Work</span>
          </h2>
          <p className="featured-work-description">
            Explore a selection of our recent projects that highlight our expertise and
            solutions. We're dedicated to delivering experiences that drive results.
          </p>
        </div>

        <div className="project-showcase">
          <div className={`project-info ${isAnimating ? 'animate-fade-in' : ''} ${isVisible ? 'animate-in' : ''}`}>
            <h3 className="project-title">{currentProject.title}</h3>
            <p className="project-description">{currentProject.description}</p>
            <button className="quote-button">
              <span className="button-text">Request A Quote</span>
              <span className="button-hover-effect"></span>
            </button>
          </div>

          <div className={`project-image ${isAnimating ? 'animate-slide-in' : ''} ${isVisible ? 'animate-in' : ''}`}>
            <div className="monitor-frame">
              <Image 
                src={monitorImage} 
                alt="Monitor frame"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              <div className="screen-content">
                <Image 
                  src={currentProject.image} 
                  alt={currentProject.title}
                  fill
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center top'
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Only show arrow controls on non-mobile screens */}
        {!isMobile && (
          <div className="slider-controls">
            <button 
              className="control-button prev-button" 
              onClick={prevSlide}
              aria-label="Previous project"
              disabled={isAnimating}
            >
              <div className="button-circle">
                <svg width="24" height="48" viewBox="0 0 43 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 5L7 43L32 81" stroke="#0D98BA" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            
            <button 
              className="control-button next-button" 
              onClick={nextSlide}
              aria-label="Next project"
              disabled={isAnimating}
            >
              <div className="button-circle">
                <svg width="24" height="48" viewBox="0 0 43 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5L36 43L11 81" stroke="#0D98BA" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        )}

        <div className={`project-indicators ${isVisible ? 'animate-in' : ''}`}>
          {projects.map((_, index) => (
            <button 
              key={`indicator-${index}`}
              className={`indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .featured-work-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          max-height: 900px;
          background: linear-gradient(180deg, #04091D 0%, rgba(4, 9, 29, 0) 64.5%), url(${backgroundImage});
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          overflow: hidden;
        }

        .content-wrapper {
          position: relative;
          max-width: 1440px;
          height: 100%;
          margin: 0 auto;
          padding: 0 4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-top: 3rem;
          margin-bottom: 2rem;
          gap: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .header-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .featured-work-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
          flex-shrink: 0;
        }

        .highlight {
          color: #0D98BA;
          position: relative;
          display: inline-block;
        }

        .animate-in .highlight::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -2px;
          left: 0;
          background-color: #0D98BA;
          transform: scaleX(0);
          transform-origin: bottom left;
          animation: underlineGrow 1s ease-out forwards 1s;
        }

        .featured-work-description {
          max-width: 40rem;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.6;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin: 0;
        }

        .project-showcase {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          flex: 1;
          min-height: 0;
          gap: 4rem;
        }

        .project-info {
          width: 100%;
          max-width: 28rem;
          margin-left: 2rem;
          z-index: 10;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s ease-out 0.3s;
        }

        .project-info.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .project-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 2.5rem);
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0 0 1rem 0;
        }

        .project-description {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          line-height: 1.6;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .quote-button {
          position: relative;
          width: 11.25rem;
          height: 2.8rem;
          background: #0D98BA;
          border: 2px solid #0D98BA;
          border-radius: 6px;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.5;
          color: #04091D;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .button-text {
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .button-hover-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 1;
        }

        .quote-button:hover {
          color: #0D98BA;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(13, 152, 186, 0.3);
        }

        .quote-button:hover .button-hover-effect {
          transform: translateX(0);
          background-color: rgba(4, 9, 29, 0.9);
        }

        .project-image {
          position: relative;
          width: 100%;
          max-width: 45rem;
          height: auto;
          aspect-ratio: 16/10;
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.8s ease-out 0.5s;
        }

        .project-image.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-in-out;
        }
        
        .monitor-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .screen-content {
          position: absolute;
          top: 5%;
          left: 16%;
          width: 67%;
          height: 80%;
          overflow: hidden;
          border-radius: 6px;
       
        }

        .slider-controls {
          position: absolute;
          width: 100%;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 30;
        }

        .control-button {
          position: absolute;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          pointer-events: auto;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .control-button:hover {
          transform: scale(1.1);
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: default;
          transform: none;
        }

        .button-circle {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .button-circle:hover {
          background: rgba(13, 152, 186, 0.2);
          box-shadow: 0 0 25px rgba(13, 152, 186, 0.4);
          border-color: rgba(13, 152, 186, 0.3);
        }

        .prev-button {
          left: 0.5rem;
        }

        .next-button {
          right: 0.5rem;
        }

        .project-indicators {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 0.75rem;
          z-index: 10;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out 0.7s;
        }

        .project-indicators.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .indicator {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #0D98BA;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(13, 152, 186, 0.6);
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes underlineGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        /* Responsive Design for Large Screens */
        @media (min-width: 1921px) {
          .content-wrapper {
            padding: 0 6rem;
          }
          
          .project-image {
            max-width: 50rem;
          }

          .prev-button {
            left: 2rem;
          }

          .next-button {
            right: 2rem;
          }
        }

        @media (max-width: 1440px) {
          .content-wrapper {
            padding: 0 3rem;
          }
          
          .project-image {
            max-width: 38rem;
          }

          .prev-button {
            left: 0.5rem;
          }

          .next-button {
            right: 0.5rem;
          }
        }

        @media (max-width: 1200px) {
          .header-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          .featured-work-description {
            max-width: 100%;
          }

          .project-showcase {
            gap: 3rem;
          }

          .project-image {
            max-width: 32rem;
          }

          .prev-button {
            left: 0rem;
          }

          .next-button {
            right: 0rem;
          }
        }

        /* Tablet screens - Keep arrow buttons visible and positioned upward */
        @media (max-width: 1024px) and (min-width: 769px) {
          .slider-controls {
            position: absolute;
            width: 100%;
            top: 40%;
            left: 0;
            transform: translateY(-50%);
            pointer-events: none;
            z-index: 30;
          }

          .control-button {
            position: absolute;
            pointer-events: auto;
          }

          .prev-button {
            left: 1rem;
          }

          .next-button {
            right: 1rem;
          }

          .button-circle {
            width: 3.5rem;
            height: 3.5rem;
            background: rgba(255, 255, 255, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(20px);
          }

          .button-circle:hover {
            background: rgba(13, 152, 186, 0.3);
            box-shadow: 0 0 30px rgba(13, 152, 186, 0.5);
            border-color: rgba(13, 152, 186, 0.4);
          }

          .project-indicators {
            margin-bottom: 2rem;
            gap: 0.75rem;
          }

          .indicator {
            width: 0.75rem;
            height: 0.75rem;
          }
        }

        /* Mobile screens - Remove arrow controls and enable auto-scroll */
        @media (max-width: 768px) {
          .featured-work-container {
            height: auto;
            min-height: 100vh;
            padding-bottom: 2rem;
          }

          .content-wrapper {
            padding: 0 2rem;
            justify-content: flex-start;
            gap: 2rem;
          }

          .project-showcase {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
            align-items: center;
          }

          .project-info {
            max-width: 100%;
            order: 2;
            margin-left: 0;
            transform: translateY(30px);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .project-info.animate-in {
            transform: translateY(0);
          }

          .quote-button {
            align-self: center;
            margin: 0 auto;
          }

          .project-title {
            text-align: center;
          }

          .project-description {
            text-align: center;
            max-width: 90%;
            margin-bottom: 1rem;
            -webkit-line-clamp: 5;
          }

          .project-image {
            max-width: 90%;
            width: 100%;
            order: 1;
            transform: translateY(30px);
          }

          .project-image.animate-in {
            transform: translateY(0);
          }

          .screen-content {
            top: 5%;
            left: 16%;
            width: 68%;
            height: 61%;
            border-radius: 4px;
          }

          .project-indicators {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            gap: 0.6rem;
            z-index: 10;
            opacity: 1;
            transform: translateY(0);
          }

          .indicator {
            width: 0.7rem;
            height: 0.7rem;
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .indicator.active {
            background: #0D98BA;
            border: 1px solid #0D98BA;
            transform: scale(1.2);
            box-shadow: 0 0 12px rgba(13, 152, 186, 0.7);
          }

          .indicator:hover {
            background: rgba(255, 255, 255, 0.7);
            transform: scale(1.1);
          }
        }

        @media (max-width: 640px) {
          .content-wrapper {
            padding: 0 1rem;
          }

          .header-section {
            padding-top: 1.5rem;
            margin-bottom: 1rem;
          }

          .project-description {
            -webkit-line-clamp: 4;
            margin-bottom: 1.5rem;
          }

          .quote-button {
            width: 10rem;
            height: 2.5rem;
            font-size: 0.875rem;
          }

          .project-indicators {
            margin-bottom: 2rem;
            gap: 0.5rem;
          }

          .indicator {
            width: 0.6rem;
            height: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 0 0.75rem;
          }

          .header-section {
            padding-top: 1rem;
          }

          .project-description {
            -webkit-line-clamp: 3;
          }

          .screen-content {
            top: 3%;
            left: 16%;
            width: 67%;
            height: 63%;
            border-radius: 3px;
          }

          .project-indicators {
            gap: 0.4rem;
          }

          .indicator {
            width: 0.5rem;
            height: 0.5rem;
          }
        }

        /* Fix for 770x669 dimension - ensure dots are visible */
        @media (max-width: 770px) and (max-height: 669px) {
          .project-indicators {
            display: flex !important;
            justify-content: center;
            margin-bottom: 2rem;
            gap: 0.6rem;
            z-index: 20;
            opacity: 1 !important;
            transform: translateY(0) !important;
            position: relative;
          }

          .indicator {
            width: 0.7rem;
            height: 0.7rem;
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
            display: block !important;
            visibility: visible !important;
          }

          .indicator.active {
            background: #0D98BA;
            border: 1px solid #0D98BA;
            transform: scale(1.3);
            box-shadow: 0 0 15px rgba(13, 152, 186, 0.8);
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 2560px) {
          .content-wrapper {
            padding: 0 8rem;
          }
          
          .project-image {
            max-width: 60rem;
          }
          
          .featured-work-title {
            font-size: 4rem;
          }
          
          .project-title {
            font-size: 3rem;
          }

          .button-circle {
            width: 4.5rem;
            height: 4.5rem;
          }

          .prev-button {
            left: 3rem;
          }

          .next-button {
            right: 3rem;
          }
        }

        /* High-resolution mobile screens */
        @media (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
          .screen-content {
            border-radius: 2px;
          }
          
          .button-circle {
            backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedWorkShowcase;
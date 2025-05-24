'use client';

import React, { useState, useEffect } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';
import { getProjectsByServiceId } from './featuredWorkData';

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
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect when slide changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isAnimating) {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      );
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <div className={`${poppins.variable} ${lato.variable} featured-work-container`}>
      <div className="content-wrapper">
        <div className="header-section">
          <h2 className="featured-work-title">
            Our Featured <span className="highlight">Work</span>
          </h2>
          <p className="featured-work-description">
            Explore a selection of our recent projects that highlight our expertise and
            solutions. We're dedicated to delivering experiences that drive results.
          </p>
        </div>

        <div className="project-showcase">
          <div className={`project-info ${isAnimating ? 'animate-fade-in' : ''}`}>
            <h3 className="project-title">{currentProject.title}</h3>
            <p className="project-description">{currentProject.description}</p>
            <button className="quote-button">
              <span className="button-text">Request A Quote</span>
              <span className="button-hover-effect"></span>
            </button>
          </div>

          <div className={`project-image ${isAnimating ? 'animate-slide-in' : ''}`}>
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
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

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

        <div className="project-indicators">
          {projects.map((_, index) => (
            <button 
              key={`indicator-${index}`}
              className={`indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
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
        }

        .featured-work-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
          animation: fadeIn 0.8s ease-in-out;
          flex-shrink: 0;
        }

        .highlight {
          color: #0D98BA;
          position: relative;
          display: inline-block;
        }

        .highlight::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -2px;
          left: 0;
          background-color: #0D98BA;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.6s ease-out;
          animation: underlineGrow 1s ease-out forwards 0.5s;
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
          animation: fadeIn 0.8s ease-in-out 0.3s both;
        }

        .project-showcase {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          flex: 1;
          min-height: 0;
          gap: 2rem;
        }

        .project-info {
          width: 100%;
          max-width: 25rem;
          z-index: 10;
          transition: opacity 0.5s ease, transform 0.5s ease;
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
          margin-bottom: 2rem;
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
          max-width: 43rem;
          height: auto;
          aspect-ratio: 16/10;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-in-out;
        }
        
        .monitor-frame {
          position: relative;
          width: 100%;
          height: 100%;
          animation: float 6s ease-in-out infinite;
        }
        
        .screen-content {
          position: absolute;
          top: 5%;
          left: 16%;
          width: 67%;
          height: 60%;
          overflow: hidden;
          border-radius: 6px;
          background: #000;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
        }

        .slider-controls {
          position: absolute;
          width: 100%;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 20;
        }

        .control-button {
          position: absolute;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          pointer-events: auto;
          transition: transform 0.3s ease;
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
          width: 3.75rem;
          height: 3.75rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .button-circle:hover {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(13, 152, 186, 0.6);
        }

        .prev-button {
          left: 2rem;
        }

        .next-button {
          right: 2rem;
        }

        .project-indicators {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 0.75rem;
          z-index: 10;
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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
        }

        @media (max-width: 1440px) {
          .content-wrapper {
            padding: 0 3rem;
          }
          
          .project-image {
            max-width: 38rem;
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
            gap: 1.5rem;
          }

          .project-image {
            max-width: 32rem;
          }
        }

        @media (max-width: 968px) {
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
          }

          .project-info {
            max-width: 100%;
            order: 2;
          }

          .project-image {
            max-width: 100%;
            width: 100%;
            order: 1;
          }

          .slider-controls {
            position: relative;
            top: auto;
            transform: none;
            margin-top: 1rem;
            order: 3;
          }
          
          .prev-button {
            left: calc(50% - 6rem);
          }
          
          .next-button {
            right: calc(50% - 6rem);
          }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 0 1.5rem;
          }

          .header-section {
            padding-top: 2rem;
            margin-bottom: 1.5rem;
          }

          .project-description {
            -webkit-line-clamp: 5;
          }

          .button-circle {
            width: 3rem;
            height: 3rem;
          }

          .prev-button {
            left: calc(50% - 5rem);
          }
          
          .next-button {
            right: calc(50% - 5rem);
          }

          .screen-content {
            top: 2%;
            left: 14%;
            width: 72%;
            height: 63%;
            border-radius: 4px;
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

          .button-circle {
            width: 2.5rem;
            height: 2.5rem;
          }

          .prev-button {
            left: calc(50% - 4rem);
          }
          
          .next-button {
            right: calc(50% - 4rem);
          }

          .project-indicators {
            margin-bottom: 1rem;
            gap: 0.5rem;
          }

          .indicator {
            width: 0.5rem;
            height: 0.5rem;
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
            top: 10%;
            left: 15%;
            width: 70%;
            height: 60%;
            border-radius: 3px;
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
        }

        /* High-resolution mobile screens */
        @media (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
          .screen-content {
            border-radius: 2px;
          }
          
          .button-circle {
            backdrop-filter: blur(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedWorkShowcase;
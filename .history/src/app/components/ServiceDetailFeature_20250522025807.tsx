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
                  style={{ objectFit: 'cover' }}
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
              onClick={() => !isAnimating && setCurrentIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .featured-work-container {
          position: relative;
          width: 100%;
          height: 100vh; /* Use viewport height */
          min-height: 600px; /* Minimum height for very tall screens */
          max-height: 800px; /* Maximum height to prevent excessive stretching */
          background: linear-gradient(180deg, #04091D 0%, rgba(4, 9, 29, 0) 64.5%), url(${backgroundImage});
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        .content-wrapper {
          position: relative;
          width: 100%;
          max-width: 1440px;
          height: 100%;
          margin: 0 auto;
          padding: 0 74px;
          display: flex;
          flex-direction: column;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-top: 40px;
          margin-bottom: 20px;
        }

        .featured-work-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 48px;
          line-height: 1.4;
          color: #FFFFFF;
          margin: 0;
          animation: fadeIn 0.8s ease-in-out;
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
          bottom: 0;
          left: 0;
          background-color: #0D98BA;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.6s ease-out;
          animation: underlineGrow 1s ease-out forwards 0.5s;
        }

        .featured-work-description {
          width: 45%;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 150%;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin: 0;
          align-self: center;
          animation: fadeIn 0.8s ease-in-out 0.3s both;
        }

        .project-showcase {
          display: flex;
          justify-content: space-between;
          position: relative;
          flex: 1;
          width: 100%;
        }

        .project-info {
          width: 30%;
          max-width: 320px;
          min-width: 250px;
          margin-left: 80px;
          padding-top: 30px;
          transition: opacity 0.5s ease, transform 0.5s ease;
          z-index: 10;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .project-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 1.3;
          color: #FFFFFF;
          margin: 0 0 15px 0;
        }

        .project-description {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.5;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin-bottom: 30px;
          display: -webkit-box;
          -webkit-line-clamp: 6; /* Limit to 6 lines */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .quote-button {
          position: relative;
          width: 180px;
          height: 45px;
          background: #0D98BA;
          border: 2px solid #0D98BA;
          border-radius: 6px;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          color: #04091D;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          text-align: center;
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
        }

        .quote-button:hover .button-hover-effect {
          transform: translateX(0);
          background-color: rgba(4, 9, 29, 0.9);
        }

        .project-image {
          position: absolute;
          right: 0;
          top: 0;
          width: 65%;
          max-width: 700px;
          height: auto;
          aspect-ratio: 701/606;
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
          top: 5.9%;
          left: 13.4%;
          width: 73.2%;
          height: 63.5%;
          overflow: hidden;
          border-radius: 4px;
          background-color: #000; /* Add a background color to ensure no transparency */
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
        }

        .button-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .button-circle:hover {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 15px rgba(13, 152, 186, 0.6);
        }

        .prev-button {
          left: 24px;
        }

        .next-button {
          right: 24px;
        }

        .project-indicators {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          gap: 12px;
          z-index: 20;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #0D98BA;
          transform: scale(1.2);
        }

        .indicator:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.5);
        }

        .indicator:disabled {
          cursor: default;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
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

        /* Responsive styles */
        @media (max-width: 1440px) {
          .project-info {
            margin-left: 40px;
          }
          
          .project-image {
            width: 60%;
          }
        }

        @media (max-width: 1280px) {
          .header-section {
            flex-direction: column;
          }

          .featured-work-description {
            width: 100%;
            max-width: 640px;
            margin-top: 15px;
          }
          
          .project-info {
            margin-left: 20px;
            padding-top: 20px;
          }
        }

        @media (max-width: 1024px) {
          .content-wrapper {
            padding: 0 40px;
          }
          
          .project-showcase {
            flex-direction: column;
            align-items: center;
          }
          
          .project-info {
            width: 100%;
            max-width: 500px;
            margin-left: 0;
            margin-bottom: 30px;
            text-align: center;
          }
          
          .project-image {
            position: relative;
            width: 90%;
            max-width: 550px;
            margin: 0 auto;
          }
          
          .quote-button {
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .featured-work-title {
            font-size: 36px;
          }

          .featured-work-description {
            font-size: 16px;
          }

          .project-title {
            font-size: 32px;
          }

          .project-description {
            font-size: 15px;
            -webkit-line-clamp: 5; /* Reduce to 5 lines on smaller screens */
          }

          .project-image {
            width: 100%;
            max-width: 500px;
          }

          .prev-button {
            left: 10px;
          }

          .next-button {
            right: 10px;
          }

          .button-circle {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 600px) {
          .featured-work-container {
            min-height: 700px;
          }
          
          .content-wrapper {
            padding: 0 20px;
          }

          .header-section {
            padding-top: 30px;
          }

          .featured-work-title {
            font-size: 30px;
          }

          .featured-work-description {
            font-size: 14px;
            margin-top: 10px;
          }

          .project-title {
            font-size: 26px;
          }

          .project-description {
            font-size: 14px;
            -webkit-line-clamp: 4; /* Reduce to 4 lines on mobile */
            margin-bottom: 20px;
          }
          
          .project-image {
            max-width: 450px;
          }

          .button-circle {
            width: 40px;
            height: 40px;
          }
          
          .project-indicators {
            margin-bottom: 15px;
          }
          
          .indicator {
            width: 8px;
            height: 8px;
          }
        }

        @media (max-width: 480px) {
          .featured-work-title {
            font-size: 26px;
          }
          
          .project-title {
            font-size: 22px;
            margin-bottom: 10px;
          }
          
          .project-description {
            margin-bottom: 15px;
          }
          
          .project-image {
            max-width: 320px;
          }
          
          .quote-button {
            width: 160px;
            height: 40px;
            font-size: 14px;
          }
          
          .project-indicators {
            gap: 8px;
          }
        }
        
        /* For very small screens */
        @media (max-width: 360px) {
          .featured-work-title {
            font-size: 24px;
          }
          
          .featured-work-description {
            font-size: 13px;
          }
          
          .project-title {
            font-size: 20px;
          }
          
          .project-description {
            font-size: 13px;
            -webkit-line-clamp: 3;
          }
          
          .project-image {
            max-width: 280px;
          }
          
          .button-circle {
            width: 36px;
            height: 36px;
          }
        }
        
        /* Handle different aspect ratios */
        @media (max-aspect-ratio: 16/10) {
          .featured-work-container {
            height: auto;
            min-height: 100vh;
            padding-bottom: 30px;
          }
        }
        
        /* For very tall screens */
        @media (min-aspect-ratio: 2/1) {
          .featured-work-container {
            height: auto;
            min-height: 700px;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedWorkShowcase;
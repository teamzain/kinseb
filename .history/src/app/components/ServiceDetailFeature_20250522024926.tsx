'use client';

import React, { useState } from 'react';
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
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
          <div className="project-info">
            <h3 className="project-title">{currentProject.title}</h3>
            <p className="project-description">{currentProject.description}</p>
            <button className="quote-button">Request A Quote</button>
          </div>

          <div className="project-image">
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
          >
            <div className="button-circle">
              <svg width="24" height="48" viewBox="0 0 43 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L36 43L11 81" stroke="#0D98BA" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .featured-work-container {
          position: relative;
          width: 100%;
          height: 100vh; /* Use viewport height instead of fixed pixels */
          min-height: 600px; /* Minimum height for very tall screens */
          max-height: 800px; /* Maximum height to prevent excessive stretching */
          background: linear-gradient(180deg, #04091D 0%, rgba(4, 9, 29, 0) 64.5%), url(${backgroundImage});
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        .content-wrapper {
          position: relative;
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
          padding-top: 40px; /* Reduced from 66px */
          margin-bottom: 30px; /* Reduced from 60px */
        }

        .featured-work-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 48px; /* Reduced from 56px */
          line-height: 1.4;
          color: #FFFFFF;
          margin: 0;
        }

        .highlight {
          color: #0D98BA;
        }

        .featured-work-description {
          width: 640px;
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 18px; /* Reduced from 20px */
          line-height: 150%;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin: 0;
          align-self: center;
        }

        .project-showcase {
          display: flex;
          justify-content: space-between;
          position: relative;
          flex: 1;
        }

        .project-info {
          width: 272px;
          margin-left: 129px;
          padding-top: 50px; /* Reduced from 85px */
        }

        .project-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 40px; /* Reduced from 45px */
          line-height: 1.5;
          color: #FFFFFF;
          margin: 0 0 15px 0; /* Reduced from 17px */
        }

        .project-description {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 16px; /* Reduced from 18px */
          line-height: 150%;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin-bottom: 30px; /* Reduced from 49px */
          max-height: 180px; /* Limit description height */
          overflow-y: auto; /* Add scroll if content exceeds height */
        }

        .quote-button {
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
          text-align: center;
          color: #04091D;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quote-button:hover {
          background: transparent;
          color: #0D98BA;
        }

        .project-image {
          position: absolute;
          right: 74px;
          top: 0;
          width: 600px; /* Reduced from 701px */
          height: 520px; /* Reduced from 606px */
        }
        
        .monitor-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .screen-content {
          position: absolute;
          top: 6%;
          left: 13.5%;
          width: 73%;
          height: 63%;
          overflow: hidden;
          border-radius: 4px;
        }

        .slider-controls {
          position: absolute;
          width: 100%;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .control-button {
          position: absolute;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          pointer-events: auto;
        }

        .button-circle {
          width: 60px; /* Reduced from 79px */
          height: 60px; /* Reduced from 79px */
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
        }

        .prev-button {
          left: 64px;
        }

        .next-button {
          right: 64px;
        }

        /* Responsive styles */
        @media (max-width: 1440px) {
          .project-image {
            width: 500px;
            height: 433px;
            right: 40px;
          }
        }

        @media (max-width: 1200px) {
          .header-section {
            flex-direction: column;
          }

          .featured-work-description {
            width: 100%;
            max-width: 640px;
            margin-top: 20px;
          }

          .project-info {
            margin-left: 0;
            padding-top: 30px;
          }

          .project-image {
            width: 450px;
            height: 390px;
            right: 20px;
          }
        }

        @media (max-width: 968px) {
          .featured-work-container {
            height: 100vh;
            min-height: 600px;
          }

          .project-showcase {
            flex-direction: column;
          }

          .project-info {
            width: 100%;
            max-width: 600px;
            margin-bottom: 30px;
          }

          .project-image {
            position: relative;
            width: 100%;
            max-width: 500px;
            height: auto;
            aspect-ratio: 701/606;
            right: auto;
            margin: 0 auto;
          }
          
          .monitor-frame {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .screen-content {
            top: 6%;
            left: 13.5%;
            width: 73%;
            height: 63%;
          }

          .slider-controls {
            top: auto;
            bottom: 20px;
            transform: none;
          }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 0 40px;
          }

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
          }

          .prev-button {
            left: 20px;
          }

          .next-button {
            right: 20px;
          }

          .button-circle {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 0 20px;
          }

          .featured-work-title {
            font-size: 28px;
          }

          .featured-work-description {
            font-size: 14px;
          }

          .project-title {
            font-size: 24px;
          }

          .button-circle {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedWorkShowcase;
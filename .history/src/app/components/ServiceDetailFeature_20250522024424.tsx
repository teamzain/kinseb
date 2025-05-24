'use client';

import React, { useState } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

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
          height: 800px;
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
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          padding-top: 66px;
          margin-bottom: 60px;
        }

        .featured-work-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 56px;
          line-height: 84px;
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
          font-size: 20px;
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
        }

        .project-info {
          width: 272px;
          margin-left: 129px;
          padding-top: 85px;
        }

        .project-title {
          font-family: var(--font-poppins);
          font-style: normal;
          font-weight: 600;
          font-size: 45px;
          line-height: 68px;
          color: #FFFFFF;
          margin: 0 0 17px 0;
        }

        .project-description {
          font-family: var(--font-lato);
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 150%;
          letter-spacing: -0.006em;
          color: #FFFFFF;
          margin-bottom: 49px;
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
          width: 701px;
          height: 606px;
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
          width: 79px;
          height: 79px;
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
            width: 600px;
            height: 520px;
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
            padding-top: 40px;
          }

          .project-image {
            width: 500px;
            height: 433px;
            right: 20px;
          }
        }

        @media (max-width: 968px) {
          .featured-work-container {
            height: auto;
            min-height: 1000px;
            padding-bottom: 60px;
          }

          .project-showcase {
            flex-direction: column;
          }

          .project-info {
            width: 100%;
            max-width: 600px;
            margin-bottom: 40px;
          }

          .project-image {
            position: relative;
            width: 100%;
            max-width: 600px;
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
            font-size: 40px;
            line-height: 60px;
          }

          .featured-work-description {
            font-size: 18px;
          }

          .project-title {
            font-size: 36px;
            line-height: 54px;
          }

          .project-description {
            font-size: 16px;
          }

          .prev-button {
            left: 20px;
          }

          .next-button {
            right: 20px;
          }

          .button-circle {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 0 20px;
          }

          .featured-work-title {
            font-size: 32px;
            line-height: 48px;
          }

          .featured-work-description {
            font-size: 16px;
          }

          .project-title {
            font-size: 28px;
            line-height: 42px;
          }

          .button-circle {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedWorkShowcase;
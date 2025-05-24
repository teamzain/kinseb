'use client';

import React from 'react';
import Image from 'next/image';

const WhatMattersComponent = () => {
  return (
    <div className="what-matters-container">
      <div className="content-wrapper">
        <div className="image-section">
          <Image 
            src="/design-image.jpg" 
            alt="Web Design Services" 
            width={600} 
            height={750}
            className="service-image"
          />
        </div>

        <div className="text-section">
          <h1 className="heading">
            We <span className="highlight">Build</span> What Matters
          </h1>
          <p className="subheading">
            Whether you're refining an idea or building from scratch, we help you design 
            smarter, develop faster, and scale better. With an agile team, deep expertise, 
            and a commitment to quality—you'll stay focused on what matters most: growth.
          </p>

          <div className="stats-section">
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-icon">
                  <Image src="/client-icon.png" alt="Clients icon" width={68} height={68} />
                </div>
                <h2 className="stat-number">50+</h2>
                <p className="stat-label">Happy Clients</p>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <Image src="/projects-icon.png" alt="Projects icon" width={68} height={68} />
                </div>
                <h2 className="stat-number">70+</h2>
                <p className="stat-label">Projects Delivered</p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-icon">
                  <Image src="/satisfaction-icon.png" alt="Satisfaction icon" width={74} height={74} />
                </div>
                <h2 className="stat-number">98%</h2>
                <p className="stat-label">Client Satisfaction</p>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <Image src="/experience-icon.png" alt="Experience icon" width={68} height={68} />
                </div>
                <h2 className="stat-number">5+</h2>
                <p className="stat-label">Years of Experience</p>
              </div>
            </div>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title">Integrity</h3>
              <h4 className="value-subtitle">We deliver what we promise.</h4>
              <p className="value-description">
                Trust is earned — and we work to earn it on every project.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Creativity</h3>
              <h4 className="value-subtitle">Uniquely Crafted Websites.</h4>
              <p className="value-description">
                No templates, no shortcuts — only thoughtful, custom design.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Speed</h3>
              <h4 className="value-subtitle">Fast Work, Quality Kept.</h4>
              <p className="value-description">
                We know timelines matter — and we never sacrifice quality.
              </p>
            </div>

            <div className="value-card">
              <h3 className="value-title">Client First</h3>
              <h4 className="value-subtitle">Your success is our focus.</h4>
              <p className="value-description">
                We build for your users, your goals, and your growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .what-matters-container {
          width: 100%;
          background: linear-gradient(180deg, #0D98BA -216%, #04091D 100%);
          min-height: 750px;
          color: #FFFFFF;
          overflow: hidden;
        }

        .content-wrapper {
          display: flex;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .image-section {
          width: 40%;
          position: relative;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .text-section {
          width: 60%;
          padding: 60px 40px;
        }

        .heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 45px;
          line-height: 68px;
          margin-bottom: 32px;
        }

        .highlight {
          color: #0D98BA;
        }

        .subheading {
          font-family: 'Lato', sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          max-width: 648px;
          margin-bottom: 40px;
        }

        .stats-section {
          display: flex;
          flex-direction: column;
          margin-bottom: 60px;
        }

        .stats-row {
          display: flex;
          justify-content: flex-start;
          gap: 80px;
          margin-bottom: 30px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-icon {
          margin-bottom: 15px;
        }

        .stat-number {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .stat-label {
          font-family: 'Lato', sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          margin-top: 5px;
        }

        .divider {
          width: 100%;
          height: 2px;
          background: #0D98BA;
          border-radius: 10px;
          margin: 20px 0;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .value-card {
          background: rgba(13, 152, 186, 0.06);
          border-radius: 10px;
          padding: 25px;
          min-height: 191px;
        }

        .value-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 25px;
          line-height: 35px;
          margin: 0 0 10px 0;
        }

        .value-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 22px;
          line-height: 33px;
          color: #0D94BB;
          margin: 0 0 10px 0;
        }

        .value-description {
          font-family: 'Lato', sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .content-wrapper {
            flex-direction: column;
          }

          .image-section, .text-section {
            width: 100%;
          }

          .image-section {
            height: 400px;
          }

          .stats-row {
            justify-content: space-around;
            gap: 20px;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 36px;
            line-height: 48px;
          }

          .stats-row {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .text-section {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatMattersComponent;
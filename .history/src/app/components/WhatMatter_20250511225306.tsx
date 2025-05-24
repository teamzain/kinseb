'use client';

import React from 'react';
import Image from 'next/image';

const WhatMattersComponent = () => {
  return (
    <div className="whatMattersContainer">
      <div className="contentWrapper">
        <div className="imageSection">
          <Image 
            src="/images/about-3.png" 
            alt="Web Design Services" 
            width={600} 
            height={750}
            className="serviceImage"
          />
        </div>

        <div className="textSection">
          <h1 className="heading">
            We <span className="highlight">Build</span> What Matters
          </h1>
          <p className="subheading">
            Whether you're refining an idea or building from scratch, we help you design 
            smarter, develop faster, and scale better. With an agile team, deep expertise, 
            and a commitment to quality—you'll stay focused on what matters most: growth.
          </p>

          <div className="statsSection">
            <div className="statsRow">
              <div className="statItem">
                <div className="statIcon">
                  <Image src="/images/people.png" alt="Clients icon" width={68} height={68} />
                </div>
                <div className="statContent">
                  <h2 className="statNumber">50+</h2>
                  <p className="statLabel">Happy Clients</p>
                </div>
              </div>
              
              <div className="statItem">
                <div className="statIcon">
                  <Image src="/images/45.png" alt="Projects icon" width={68} height={68} />
                </div>
                <div className="statContent">
                  <h2 className="statNumber">70+</h2>
                  <p className="statLabel">Projects Delivered</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="statsRow">
              <div className="statItem">
                <div className="statIcon">
                  <Image src="/images/46.png" alt="Satisfaction icon" width={74} height={74} />
                </div>
                <div className="statContent">
                  <h2 className="statNumber">98%</h2>
                  <p className="statLabel">Client Satisfaction</p>
                </div>
              </div>
              
              <div className="statItem">
                <div className="statIcon">
                  <Image src="/experience-icon.png" alt="Experience icon" width={68} height={68} />
                </div>
                <div className="statContent">
                  <h2 className="statNumber">5+</h2>
                  <p className="statLabel">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="valuesGrid">
            <div className="valueCard">
              <h3 className="valueTitle">Integrity</h3>
              <h4 className="valueSubtitle">We deliver what we promise.</h4>
              <p className="valueDescription">
                Trust is earned — and we work to earn it on every project.
              </p>
            </div>

            <div className="valueCard">
              <h3 className="valueTitle">Creativity</h3>
              <h4 className="valueSubtitle">Uniquely Crafted Websites.</h4>
              <p className="valueDescription">
                No templates, no shortcuts — only thoughtful, custom design.
              </p>
            </div>

            <div className="valueCard">
              <h3 className="valueTitle">Speed</h3>
              <h4 className="valueSubtitle">Fast Work, Quality Kept.</h4>
              <p className="valueDescription">
                We know timelines matter — and we never sacrifice quality.
              </p>
            </div>

            <div className="valueCard">
              <h3 className="valueTitle">Client First</h3>
              <h4 className="valueSubtitle">Your success is our focus.</h4>
              <p className="valueDescription">
                We build for your users, your goals, and your growth.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .whatMattersContainer {
          width: 100%;
          background: linear-gradient(180deg, #0D98BA -216%, #04091D 100%);
          min-height: 750px;
          color: #FFFFFF;
          overflow: hidden;
        }

        .contentWrapper {
          display: flex;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .imageSection {
          width: 40%;
          position: relative;
        }

        .serviceImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .textSection {
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

        .statsSection {
          display: flex;
          flex-direction: column;
          margin-bottom: 60px;
        }

        .statsRow {
          display: flex;
          justify-content: flex-start;
          gap: 80px;
          margin-bottom: 30px;
        }

        .statItem {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .statIcon {
          margin-right: 15px;
        }

        .statContent {
          display: flex;
          flex-direction: column;
        }

        .statNumber {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .statLabel {
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

        .valuesGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .valueCard {
          background: rgba(13, 152, 186, 0.06);
          border-radius: 10px;
          padding: 25px;
          min-height: 191px;
        }

        .valueTitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 25px;
          line-height: 35px;
          margin: 0 0 10px 0;
        }

        .valueSubtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 22px;
          line-height: 33px;
          color: #0D94BB;
          margin: 0 0 10px 0;
        }

        .valueDescription {
          font-family: 'Lato', sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .contentWrapper {
            flex-direction: column;
          }

          .imageSection, .textSection {
            width: 100%;
          }

          .imageSection {
            height: 400px;
          }

          .statsRow {
            justify-content: space-around;
            gap: 20px;
          }

          .valuesGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 36px;
            line-height: 48px;
          }

          .statsRow {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }
          
          .statItem {
            flex-direction: row;
            justify-content: flex-start;
            width: 100%;
          }

          .textSection {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatMattersComponent;
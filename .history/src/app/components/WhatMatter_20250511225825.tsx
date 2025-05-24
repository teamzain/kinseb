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
            <div className="statsGrid">
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
                  <Image src="/images/47.png" alt="Experience icon" width={68} height={68} />
                </div>
                <div className="statContent">
                  <h2 className="statNumber">5+</h2>
                  <p className="statLabel">Years of Experience</p>
                </div>
              </div>
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

        .statsGrid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          grid-template-rows: 1fr 1px 1fr;
          gap: 0;
          position: relative;
        }

        .statsGrid::before {
          content: "";
          position: absolute;
          top: 10%;
          bottom: 10%;
          left: 50%;
          width: 1px;
          background-color: #0D98BA;
          transform: translateX(-50%);
        }

        .statsGrid::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          top: 50%;
          height: 2px;
          background-color: #0D98BA;
          transform: translateY(-50%);
        }

        .statItem {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 20px;
        }

        .statItem:nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }

        .statItem:nth-child(2) {
          grid-column: 3;
          grid-row: 1;
        }

        .statItem:nth-child(3) {
          grid-column: 1;
          grid-row: 3;
        }

        .statItem:nth-child(4) {
          grid-column: 3;
          grid-row: 3;
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

          .statsGrid {
            grid-template-columns: 1fr 1px 1fr;
          }
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 36px;
            line-height: 48px;
          }

          .textSection {
            padding: 40px 20px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, auto);
          }
          
          .statsGrid::before {
            display: none;
          }
          
          .statsGrid::after {
            display: none;
          }
          
          .statItem:nth-child(1),
          .statItem:nth-child(2),
          .statItem:nth-child(3),
          .statItem:nth-child(4) {
            grid-column: 1;
          }
          
          .statItem:nth-child(1) { grid-row: 1; }
          .statItem:nth-child(2) { grid-row: 2; }
          .statItem:nth-child(3) { grid-row: 3; }
          .statItem:nth-child(4) { grid-row: 4; }
          
          .statItem {
            justify-content: flex-start;
            padding: 15px 0;
          }
        }
        
        @media (max-width: 480px) {
          .heading {
            font-size: 32px;
            line-height: 42px;
          }
          
          .subheading {
            font-size: 18px;
            line-height: 26px;
          }
          
          .statNumber {
            font-size: 42px;
            line-height: 50px;
          }
          
          .statLabel {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatMattersComponent;
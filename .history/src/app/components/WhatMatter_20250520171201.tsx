'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Poppins, Lato } from 'next/font/google';

// Font optimization using next/font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400',  '700'],
  display: 'swap',
  variable: '--font-lato',
});

const WhatMattersComponent = () => {
  // Intersection Observer for section animation
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Intersection Observer for stats with higher threshold for staggered effect
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Array of stats for easy mapping
  const stats = [
    { icon: "/images/people.png", number: "50+", label: "Happy Clients", alt: "Happy clients icon" },
    { icon: "/images/45.png", number: "70+", label: "Projects Delivered", alt: "Completed projects icon" },
    { icon: "/images/46.png", number: "98%", label: "Client Satisfaction", alt: "Client satisfaction icon" },
    { icon: "/images/47.png", number: "5+", label: "Years of Experience", alt: "Years of experience icon" },
  ];

  return (
    <section 
      className={`whatMattersContainer ${poppins.variable} ${lato.variable}`}
      ref={containerRef}
      aria-label="Company achievements and statistics"
    >
      <div className={`contentWrapper ${containerInView ? 'animate-in' : ''}`}>
        <figure className={`imageSection ${containerInView ? 'animate-slide-right' : ''}`}>
          <Image 
            src="/images/about-3.png" 
            alt="Team of web design professionals collaborating" 
            width={600} 
            height={750}
            sizes="(max-width: 480px) 200px, (max-width: 768px) 350px, 500px"
            priority={true}
            quality={85}
            className="serviceImage"
          />
        </figure>

        <div className={`textSection ${containerInView ? 'animate-fade-in' : ''}`}>
          <h2 className="heading">
            We <span className="highlight">Build</span> What Matters
          </h2>
          <p className="subheading">
            Whether you're refining an idea or building from scratch, we help you design 
            smarter, develop faster, and scale better. With an agile team, deep expertise, 
            and a commitment to quality—you'll stay focused on what matters most: growth.
          </p>

          <div className="statsSection" ref={statsRef}>
            <div className="statsGrid">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className={`statItem ${statsInView ? `animate-fade-up delay-${index}` : ''}`}
                >
                  <div className="statIcon">
                    <Image 
                      src={stat.icon} 
                      alt={stat.alt} 
                      width={68} 
                      height={68} 
                      loading="lazy"
                    />
                  </div>
                  <div className="statContent">
                    <h3 className="statNumber">{stat.number}</h3>
                    <p className="statLabel">{stat.label}</p>
                  </div>
                </div>
              ))}
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
          padding: 40px 0;
          position: relative;
        }

        .contentWrapper {
          display: flex;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }

        .contentWrapper.animate-in {
          opacity: 1;
        }

        .imageSection {
          width: 50%;
          position: relative;
          transform: translateX(-100px);
          opacity: 0;
          transition: all 1s ease-out;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imageSection.animate-slide-right {
          transform: translateX(0);
          opacity: 1;
        }

        .serviceImage {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
          border-radius: 8px;
        }

        .serviceImage:hover {
          transform: scale(1.03);
        }

        .textSection {
          width: 60%;
          padding: 60px 40px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out 0.3s;
        }

        .textSection.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .heading {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: 45px;
          line-height: 68px;
          margin-bottom: 32px;
        }

        .highlight {
          color: #0D98BA;
          background: linear-gradient(90deg, #0D98BA, #06C8FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #0D98BA, #06C8FF);
          border-radius: 2px;
        }

        .subheading {
          font-family: var(--font-lato), sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: -0.03em;
          max-width: 648px;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .statsSection {
          display: flex;
          flex-direction: column;
          margin-bottom: 60px;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          grid-template-rows: 1fr 2px 1fr;
          gap: 0;
          position: relative;
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
        }

        .statsGrid::before {
          content: "";
          position: absolute;
          top: 10%;
          bottom: 10%;
          left: 50%;
          width: 2px;
          background: linear-gradient(180deg, transparent, #0D98BA, transparent);
          transform: translateX(-50%);
        }

        .statsGrid::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          top: 50%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0D98BA, transparent);
          transform: translateY(-50%);
        }

        .statItem {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 25px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .statItem.animate-fade-up {
          opacity: 1;
          transform: translateY(0);
        }

        .statItem.delay-0 { transition-delay: 0.2s; }
        .statItem.delay-1 { transition-delay: 0.4s; }
        .statItem.delay-2 { transition-delay: 0.6s; }
        .statItem.delay-3 { transition-delay: 0.8s; }

        .statItem:hover {
          transform: translateY(-5px);
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
          background: rgba(13, 152, 186, 0.1);
          border-radius: 50%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(13, 152, 186, 0.15);
        }

        .statContent {
          display: flex;
          flex-direction: column;
        }

        .statNumber {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(90deg, #FFFFFF, #0D98BA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .statLabel {
          font-family: var(--font-lato), sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          margin-top: 5px;
        }

        @media (max-width: 1200px) {
          .contentWrapper {
            flex-direction: row;
            padding: 0 20px;
          }
          
          .heading {
            font-size: 38px;
            line-height: 54px;
          }
          
          .statsGrid {
            grid-template-columns: 1fr 1px 1fr;
          }
          
          .statNumber {
            font-size: 48px;
            line-height: 56px;
          }
        }

        @media (max-width: 992px) {
          .contentWrapper {
            flex-direction: column;
          }

          .imageSection, .textSection {
            width: 100%;
          }
          
          .imageSection {
            transform: translateY(-100px);
            margin-bottom: 20px;
          }
          
          .imageSection.animate-slide-right {
            transform: translateY(0);
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
            padding: 15px;
          }
          
          .statsGrid::before, .statsGrid::after {
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
            border-bottom: 1px solid rgba(13, 152, 186, 0.2);
          }
          
          .statItem:last-child {
            border-bottom: none;
          }
          
          .serviceImage {
            max-height: 350px;
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
          
          .serviceImage {
           height:20px;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatMattersComponent;
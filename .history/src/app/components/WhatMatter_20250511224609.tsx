import React from 'react';
import Image from 'next/image';
import styles from './WhatMatters.module.css';

const WhatMattersComponent = () => {
  return (
    <div className={styles.whatMattersContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageSection}>
          <Image 
            src="/design-image.jpg" 
            alt="Web Design Services" 
            width={600} 
            height={750}
            className={styles.serviceImage}
          />
        </div>

        <div className={styles.textSection}>
          <h1 className={styles.heading}>
            We <span className={styles.highlight}>Build</span> What Matters
          </h1>
          <p className={styles.subheading}>
            Whether you're refining an idea or building from scratch, we help you design 
            smarter, develop faster, and scale better. With an agile team, deep expertise, 
            and a commitment to quality—you'll stay focused on what matters most: growth.
          </p>

          <div className={styles.statsSection}>
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Image src="/client-icon.png" alt="Clients icon" width={68} height={68} />
                </div>
                <h2 className={styles.statNumber}>50+</h2>
                <p className={styles.statLabel}>Happy Clients</p>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Image src="/projects-icon.png" alt="Projects icon" width={68} height={68} />
                </div>
                <h2 className={styles.statNumber}>70+</h2>
                <p className={styles.statLabel}>Projects Delivered</p>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Image src="/satisfaction-icon.png" alt="Satisfaction icon" width={74} height={74} />
                </div>
                <h2 className={styles.statNumber}>98%</h2>
                <p className={styles.statLabel}>Client Satisfaction</p>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <Image src="/experience-icon.png" alt="Experience icon" width={68} height={68} />
                </div>
                <h2 className={styles.statNumber}>5+</h2>
                <p className={styles.statLabel}>Years of Experience</p>
              </div>
            </div>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Integrity</h3>
              <h4 className={styles.valueSubtitle}>We deliver what we promise.</h4>
              <p className={styles.valueDescription}>
                Trust is earned — and we work to earn it on every project.
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Creativity</h3>
              <h4 className={styles.valueSubtitle}>Uniquely Crafted Websites.</h4>
              <p className={styles.valueDescription}>
                No templates, no shortcuts — only thoughtful, custom design.
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Speed</h3>
              <h4 className={styles.valueSubtitle}>Fast Work, Quality Kept.</h4>
              <p className={styles.valueDescription}>
                We know timelines matter — and we never sacrifice quality.
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Client First</h3>
              <h4 className={styles.valueSubtitle}>Your success is our focus.</h4>
              <p className={styles.valueDescription}>
                We build for your users, your goals, and your growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatMattersComponent;
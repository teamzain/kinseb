'use client';

import { useState, CSSProperties, ReactElement } from 'react';
import Image from 'next/image';

export default function WebSolutions(): ReactElement {
  // State to track which service card is currently selected
  const [selectedService, setSelectedService] = useState<number>(0);

  // Array of service images (you would replace these with your actual images)
  const serviceImages: string[] = [
    '/images/default-service.png', // Default image
    '/images/conversion-focused.png',
    '/images/performance-optimized.png',
    '/images/industry-specific.png',
    '/images/reliable-support.png',
    '/images/responsive-devices.png',
    '/images/data-driven.png',
    '/images/seo-foundation.png',
    '/images/smooth-collaboration.png',
  ];

  // Service card data
  const serviceCards = [
    {
      title: 'Conversion-Focused Design',
      description: 'We craft each site to turn visitors into customers.',
    },
    {
      title: 'Performance Optimized',
      description: 'Fast-loading sites that keep users engaged.',
    },
    {
      title: 'Industry-Specific Solutions',
      description: 'Designs shaped by your market and what actually works.',
    },
    {
      title: 'Reliable Support',
      description: 'Ongoing help whenever you need updates or fixes.',
    },
    {
      title: 'Responsive Across Devices',
      description: 'Looks great and works perfectly on every screen.',
    },
    {
      title: 'Driven by Data',
      description: 'Our design decisions are guided by real analytics.',
    },
    {
      title: 'SEO-First Foundation',
      description: 'Built to help you rank higher from day one.',
    },
    {
      title: 'Smooth Collaboration',
      description: 'We keep things clear, efficient, and on track.',
    },
  ];

  // Handler for card click
  const handleCardClick = (index: number): void => {
    setSelectedService(index + 1); // +1 because our first image is the default
  };

  return (
    <div style={styles.frame}>
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <h2 style={styles.mainHeading}>
            Because One-Size Never <span style={styles.accentText}>Fits</span> All
          </h2>
          <p style={styles.subHeading}>
            Our custom web solutions are made to match your exact needs.
          </p>
          <div style={styles.imageContainer}>
            <img 
              src={serviceImages[selectedService]} 
              alt="Service visualization" 
              style={styles.serviceImage}
            />
          </div>
        </div>

        <div style={styles.rightColumn}>
          {serviceCards.map((card, index) => (
            <div 
              key={index} 
              style={{
                ...styles.card,
                ...(selectedService === index + 1 ? styles.selectedCard : {})
              }}
              onClick={() => handleCardClick(index)}
            >
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDescription}>{card.description}</p>
              </div>
              <div style={styles.cardIcon}>
               
                  <img 
                    src="/images/arrow.svg" 
                    alt="Arrow" 
                    style={styles.arrowImage}
                  />
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// All styles as an object for inline styling with proper TypeScript types
const styles: Record<string, CSSProperties> = {
  frame: {
    width: '100%',
    minHeight: '800px',
    background: 'linear-gradient(180deg, #04091D 13.75%, #051D33 65.8%, #0D98BA 281.75%)',
    padding: '40px 0',
    fontFamily: "'Poppins', 'Lato', 'Barlow', sans-serif",
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0 20px',
  },
  leftColumn: {
    flex: '1',
    minWidth: '300px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn: {
    flex: '2',
    minWidth: '300px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  mainHeading: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '56px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 10px 0',
  },
  accentText: {
    color: '#0D98BA',
  },
  subHeading: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '30px',
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  serviceImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    transition: 'all 0.5s ease',
  },
  card: {
    backgroundColor: 'rgba(13, 152, 186, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '145px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  selectedCard: {
    backgroundColor: 'rgba(13, 152, 186, 0.3)',
    boxShadow: '0 0 15px rgba(13, 152, 186, 0.5)',
  },
  cardContent: {
    zIndex: 1,
  },
  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '28px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 10px 0',
  },
  cardDescription: {
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    color: '#FFFFFF',
    margin: 0,
  },
  cardIcon: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    width: '26px',
    height: '26px',
    zIndex: 1,
  },
  arrowCircle: {
   
    borderRadius: '50%',
    border: '2px solid #FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  
    padding: '5px',
  },
  arrowImage: {
    width: '38px',
    height: '36px',
    objectFit: 'contain',
      transform: 'rotate(-69.85deg)',
  },
};
'use client';

import { useState, CSSProperties, ReactElement } from 'react';

export default function WebSolutions(): ReactElement {
  // State to track which service card is currently hovered
  const [hoveredService, setHoveredService] = useState<number>(0);

  // Array of service images (you would replace these with your actual images)
  const serviceImages: string[] = [
    '/images/service.png', // Default image
    '/images/service.png',
    '/images/mission.png',
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

  // Handler for card click - navigate to different page
  const handleCardClick = (index: number): void => {
    // Array of URLs for each service card
    const serviceUrls = [
      '/services/conversion-design',
      '/services/performance-optimization',
      '/services/industry-solutions',
      '/services/support',
      '/services/responsive-design',
      '/services/data-driven',
      '/services/seo',
      '/services/collaboration',
    ];
    
    // In a real app, you would use router.push
    // For this demo, we'll just alert the URL
    alert(`Navigating to: ${serviceUrls[index]}`);
    // In a real Next.js app, you would do:
    // router.push(serviceUrls[index]);
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
              src={serviceImages[hoveredService]} 
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
                ...(hoveredService === index + 1 ? styles.hoveredCard : {})
              }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoveredService(index + 1)}
              onMouseLeave={() => setHoveredService(0)}
            >
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDescription}>{card.description}</p>
              </div>
              <div style={styles.cardIcon}>
                <img 
                  src="/images/arrow.svg" 
                  alt="Arrow" 
                  style={{
                    ...styles.arrowImage,
                    ...(hoveredService === index + 1 ? styles.coloredArrow : {})
                  }}
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
    minHeight: '600px', // Reduced from 800px
    background: 'linear-gradient(180deg, #04091D 13.75%, #051D33 65.8%, #0D98BA 281.75%)',
    padding: '20px 0', // Reduced padding
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
    padding: '10px', // Reduced padding
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn: {
    flex: '2',
    minWidth: '300px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Exactly two columns
    gap: '15px', // Reduced gap
    padding: '10px', // Reduced padding
  },
  mainHeading: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '42px', // Reduced from 56px
    lineHeight: '48px', // Reduced from 64px
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 8px 0',
  },
  accentText: {
    color: '#0D98BA',
  },
  subHeading: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 600,
    fontSize: '18px', // Reduced from 20px
    lineHeight: '24px', // Reduced from 30px
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '20px', // Reduced from 30px
  },
  imageContainer: {
    width: '100%',
    height: '300px', // Reduced from 400px
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
    padding: '15px', // Reduced from 20px
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '120px', // Reduced from 145px
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  hoveredCard: {
    backgroundColor: 'rgba(13, 152, 186, 0.25)',
    transform: 'translateY(-3px)',
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
    fontSize: '18px', // Reduced from 22px
    lineHeight: '24px', // Reduced from 28px
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: '0 0 8px 0',
  },
  cardDescription: {
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 500,
    fontSize: '15px', // Reduced from 18px
    lineHeight: '22px', // Reduced from 27px
    color: '#FFFFFF',
    margin: 0,
  },
  cardIcon: {
    position: 'absolute',
    right: '15px',
    bottom: '15px',
    width: '24px', // Reduced from 26px
    height: '24px', // Reduced from 26px
    zIndex: 1,
  },
  arrowImage: {
    width: '42px', // Reduced from 48px
    height: '40px', // Reduced from 46px
    objectFit: 'contain',
    transform: 'rotate(9.85deg)',
    transition: 'all 0.3s ease',
    filter: 'brightness(1) saturate(0)',
  },
  coloredArrow: {
    filter: 'brightness(1) saturate(1)',
    transform: 'rotate(9.85deg) scale(1.1)',
  }
}
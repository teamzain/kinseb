'use client';

// src/app/components/ServiceSection.tsx
import React from 'react';

interface ServiceItemProps {
  title: string;
  description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description }) => {
  return (
    <div className="service-item">
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
};

interface DesignExperienceSectionProps {
  ctaText?: string;
}

const DesignExperienceSection: React.FC<DesignExperienceSectionProps> = ({ 
  ctaText = "Explore Web Design Services" 
}) => {
  // Array of service items for easier management
  const serviceItems: ServiceItemProps[] = [
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
  ];

  return (
    <div style={styles.designContainer}>
      <div style={styles.designWordStack}>
        <span style={{...styles.designWord, color: '#0D98BA', top: '74px'}}>DESIGN</span>
        <span style={{...styles.designWord, ...styles.borderWhite, top: '104px'}}>DESIGN</span>
        <span style={{...styles.designWord,color:'white', top: '134px'}}>DESIGN</span>
        <span style={{...styles.designWord, border: '1px solid rgba(255, 255, 255, 0.3)', top: '164px'}}>DESIGN</span>
        <span style={{...styles.designWord, border: '1px solid rgba(255, 255, 255, 0.2)', top: '196px'}}>DESIGN</span>
        <span style={{...styles.designWord, border: '1px solid rgba(255, 255, 255, 0.1)', top: '226px'}}>DESIGN</span>
      </div>

      <div style={styles.contentSection}>
        <h2 style={styles.mainHeading}>Designing experiences for conversion and expansion</h2>
        <div style={styles.blueDivider}></div>
        
        <div style={styles.servicesGrid}>
          {serviceItems.map((item, index) => (
            <div key={index} style={styles.serviceItem}>
              <h3 style={styles.serviceTitle}>{item.title}</h3>
              <p style={styles.serviceDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button style={styles.ctaButton}>
        <span style={styles.buttonText}>{ctaText}</span>
      </button>
    </div>
  );
};

// Inline styles as JavaScript objects for App Router compatibility
const styles = {
  designContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '750px',
    background: 'linear-gradient(180deg, #04091D 6.93%, #0D98BA 402.13%)',
    padding: 0,
    overflow: 'hidden' as const,
    fontFamily: "'Poppins', 'Barlow', 'Lato', sans-serif",
  },
  designWordStack: {
    position: 'relative' as const,
    width: '258px',
    height: '300px',
    marginLeft: '74px',
    marginTop: '74px',
  },
  designWord: {
    position: 'absolute' as const,
    width: '258px',
    height: '98px',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '65px',
    lineHeight: '90px',
    letterSpacing: '-0.03em',
    color: 'transparent',
  },
  borderWhite: {
    border: '1px solid #FFFFFF',
  },
  contentSection: {
    position: 'absolute' as const,
    top: '74px',
    left: '377px',
    width: '983px',
    '@media (max-width: 1440px)': {
      width: 'calc(100% - 430px)',
    },
    '@media (max-width: 992px)': {
      position: 'relative' as const,
      top: '30px',
      left: '40px',
      width: 'calc(100% - 80px)',
    },
    '@media (max-width: 768px)': {
      left: '20px',
      width: 'calc(100% - 40px)',
    }
  },
  mainHeading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '56px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    marginBottom: '30px',
    '@media (max-width: 992px)': {
      fontSize: '42px',
      lineHeight: '48px',
    }
  },
  blueDivider: {
    width: '100%',
    height: '4px',
    background: '#0D98BA',
    borderRadius: '10px',
    marginBottom: '40px',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 315px)',
    gridTemplateRows: 'repeat(2, 200px)',
    gap: '15px',
    '@media (max-width: 1440px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
    },
    '@media (max-width: 992px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'auto',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  serviceItem: {
    background: 'rgba(13, 152, 186, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative' as const,
  },
  serviceTitle: {
    fontFamily: 'Poppins',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '64px',
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
    margin: 0,
    padding: 0,
  },
  serviceDescription: {
    fontFamily: 'Barlow',
    fontStyle: 'normal' as const,
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
    color: '#FFFFFF',
    marginTop: 0,
  },
  ctaButton: {
    position: 'absolute' as const,
    width: '238px',
    height: '45px',
    left: '74px',
    bottom: '50px',
    background: '#0D98BA',
    border: '2px solid #0D98BA',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 992px)': {
      left: '40px',
    },
    '@media (max-width: 768px)': {
      position: 'relative' as const,
      left: '20px',
      marginTop: '30px',
    }
  },
  buttonText: {
    fontFamily: 'Lato',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    textAlign: 'center' as const,
    color: '#04091D',
  }
};

export default DesignExperienceSection;
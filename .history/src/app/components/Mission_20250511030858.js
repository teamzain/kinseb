'use client';
import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation and state management
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Check device type based on screen size
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };
    
    // Initial check
    checkDeviceType();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const styles = {
    frame: {
      position: 'relative',
      width: '100%',
      minHeight: isMobile ? '1200px' : '800px',
      background: '#04091D',
      margin: '0 auto',
      overflow: 'hidden',
      padding: '0',
      color: 'white',
      fontFamily: '"Poppins", sans-serif',
    },
    
    title: {
      position: 'relative',
      width: '100%',
      maxWidth: '696px',
      margin: isMobile ? '40px auto 20px' : '85px auto 20px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: isMobile ? '32px' : '42px',
      lineHeight: '1.15',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    
    titleSpan: {
      color: '#3B7BCE',
      position: 'relative',
      display: 'inline-block',
      animation: 'highlight 3s ease-in-out infinite',
    },
    
    subtitle: {
      position: 'relative',
      width: '100%',
      maxWidth: isMobile ? '90%' : '792px',
      margin: '0 auto',
      marginBottom: '50px',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
      fontSize: isMobile ? '16px' : '18px',
      lineHeight: '1.6',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
    },
    
    // Connected horizontal lines
    horizontalLine: {
      position: 'absolute',
      width: '100%',
      height: '4px',
      top: isMobile ? 'auto' : '50%',
      left: 0,
      zIndex: 1,
      display: isMobile ? 'none' : 'flex',
    },
    
    // Section-specific horizontal line
    sectionLine: (color) => ({
      width: '100%',
      height: '4px',
      backgroundColor: color,
      position: 'relative',
      display: isMobile ? 'none' : 'block',
    }),
    
    // Sections container - using a grid layout for better control
    sectionsContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gridTemplateRows: isMobile ? 'repeat(4, auto)' : 'repeat(2, 1fr)',
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    
    // Section style
    section: (index) => ({
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      gridColumn: isMobile ? '1' : (index % 2 === 0 ? '1' : '2'),
      gridRow: isMobile ? `${index + 1}` : (index < 2 ? '1' : '2'),
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: `opacity 0.8s ease-out ${0.2 + (index * 0.2)}s, transform 0.8s ease-out ${0.2 + (index * 0.2)}s`,
      minHeight: isMobile ? 'auto' : '400px',
    }),
    
    // Platform icon containers
    iconContainer: (index) => ({
      width: isMobile ? '80px' : '170px',
      height: isMobile ? '80px' : '170px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: isMobile ? '0 20px 0 0' : '0',
      position: 'relative',
      zIndex: 3,
      order: isMobile ? 0 : (index < 2 ? 0 : (index % 2 === 0 ? 2 : 0)),
    }),
    
    // Content container
    contentContainer: (index) => ({
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-start' : 'flex-end'),
      width: '100%',
      textAlign: isMobile ? 'left' : (index % 2 === 0 ? 'left' : 'right'),
      padding: isMobile ? '0' : '20px',
    }),
    
    // Text container
    textContainer: (index) => ({
      width: isMobile ? 'calc(100% - 100px)' : '100%',
      order: isMobile ? 1 : (index < 2 ? 1 : (index % 2 === 0 ? 1 : 1)),
      textAlign: isMobile ? 'left' : (index % 2 === 0 ? 'left' : 'right'),
      padding: isMobile ? '0' : '0 20px',
    }),
    
    // Section heading
    heading: (index) => ({
      fontSize: isMobile ? '25px' : '28px',
      fontWeight: '600',
      fontFamily: 'Poppins, sans-serif',
      margin: '0 0 15px',
      textAlign: isMobile ? 'left' : (index % 2 === 0 ? 'left' : 'right'),
      color: 'white',
    }),
    
    // Section paragraph
    paragraph: (index) => ({
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: '1.5',
      fontFamily: 'Lato, sans-serif',
      margin: '0',
      textAlign: isMobile ? 'left' : (index % 2 === 0 ? 'left' : 'right'),
      color: 'white',
      opacity: '0.9',
    }),
  };

  // Animations keyframes
  const keyframes = `
    @keyframes highlight {
      0% {
        text-shadow: 0 0 5px rgba(59, 124, 206, 0.5);
      }
      50% {
        text-shadow: 0 0 20px rgba(59, 124, 206, 1);
      }
      100% {
        text-shadow: 0 0 5px rgba(59, 124, 206, 0.5);
      }
    }
  `;

  return (
    <div style={styles.frame}>
      {/* Title and subtitle with animations */}
      <h2 style={styles.title}>
        Web Development<br />
        Tailored For <span style={styles.titleSpan}>Clients</span> Needs
      </h2>
      <p style={styles.subtitle}>
        From popular platforms to custom builds — we develop solutions that fit your business perfectly.
      </p>
      
      {/* Main horizontal line (visible only on desktop) */}
      {!isMobile && (
        <div style={styles.horizontalLine}>
          <div style={{
            width: '50%',
            height: '100%',
            backgroundColor: '#3B7BCE',
          }}></div>
          <div style={{
            width: '50%',
            height: '100%',
            backgroundColor: '#F26322',
          }}></div>
        </div>
      )}
      
      {/* 2x2 Grid Layout */}
      <div style={styles.sectionsContainer}>
        {/* WordPress Section - Top Left */}
        <div style={styles.section(0)}>
          <div style={styles.contentContainer(0)}>
            {/* WordPress image and content */}
            <div style={styles.iconContainer(0)}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#3B7BCE',
              }}></div>
            </div>
            
            <div style={styles.textContainer(0)}>
              <h3 style={styles.heading(0)}>WordPress</h3>
              <p style={styles.paragraph(0)}>
                Flexible and easy-to-manage WordPress websites tailored to your goals.
              </p>
              
              {!isMobile && (
                <div style={{
                  ...styles.sectionLine('#3B7BCE'),
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                }}></div>
              )}
            </div>
          </div>
        </div>
        
        {/* Shopify Section - Top Right */}
        <div style={styles.section(1)}>
          <div style={styles.contentContainer(1)}>
            {/* Shopify image and content */}
            <div style={styles.iconContainer(1)}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#95BF47',
              }}></div>
            </div>
            
            <div style={styles.textContainer(1)}>
              <h3 style={styles.heading(1)}>Shopify</h3>
              <p style={styles.paragraph(1)}>
                Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
              </p>
              
              {!isMobile && (
                <div style={{
                  ...styles.sectionLine('#95BF47'),
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  backgroundColor: '#95BF47',
                }}></div>
              )}
            </div>
          </div>
        </div>
        
        {/* Point of Sale Section - Bottom Left */}
        <div style={styles.section(2)}>
          <div style={styles.contentContainer(2)}>
            {/* Point of Sale content and image (reversed order) */}
            <div style={styles.textContainer(2)}>
              <h3 style={styles.heading(2)}>Point Of Sale</h3>
              <p style={styles.paragraph(2)}>
                Powerful Magento solutions designed for high-performance online stores.
              </p>
              
              {!isMobile && (
                <div style={{
                  ...styles.sectionLine('#F26322'),
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: '#F26322',
                }}></div>
              )}
            </div>
            
            <div style={styles.iconContainer(2)}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#F26322',
              }}></div>
            </div>
          </div>
        </div>
        
        {/* Custom Section - Bottom Right */}
        <div style={styles.section(3)}>
          <div style={styles.contentContainer(3)}>
            {/* Custom content and image (reversed order) */}
            <div style={styles.textContainer(3)}>
              <h3 style={styles.heading(3)}>Custom</h3>
              <p style={styles.paragraph(3)}>
                Fully custom-built websites crafted from scratch to meet unique business needs.
              </p>
              
              {!isMobile && (
                <div style={{
                  ...styles.sectionLine('#A66DD4'),
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  backgroundColor: '#A66DD4',
                }}></div>
              )}
            </div>
            
            <div style={styles.iconContainer(3)}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#A66DD4',
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
};

export default WebDevelopmentComponent;
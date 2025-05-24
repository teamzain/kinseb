'use client';
import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation and state management
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Check device type based on screen size
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    // Initial check
    checkDeviceType();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Determine if mobile layout should be used
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  
  // Handle section click for mobile and tablet
  const handleSectionClick = (section) => {
    if (isMobile || isTablet) {
      if (activeSection === section) {
        // If already active, deactivate it
        setActiveSection(null);
      } else {
        // Activate the clicked section
        setActiveSection(section);
      }
    }
  };

  // This component is divided into two main rows with 2 columns each
  // First row: WordPress (left) & Shopify (right)
  // Second row: Point of Sale (left) & Custom (right)
  
  const styles = {
    frame: {
      position: 'relative',
      width: '100%',
      minHeight: isMobile ? '1200px' : isTablet ? '900px' : '800px',
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
      margin: isMobile ? '40px auto 20px' : isTablet ? '60px auto 20px' : '85px auto 20px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: isMobile ? '32px' : isTablet ? '44px' : '56px',
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
      maxWidth: isMobile ? '90%' : isTablet ? '80%' : '792px',
      margin: '0 auto 50px',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 600,
      fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
      lineHeight: '1.6',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
    },
    
    // Grid container for the 2x2 layout
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
    },
    
    // Each grid cell (50% width on larger screens, 100% on mobile)
    gridCell: {
      width: isMobile ? '100%' : '50%', 
      minHeight: isMobile ? '300px' : '350px',
      position: 'relative',
      padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    
    // Horizontal line styles (one for each quarter of the grid)
    hLineLeft: {
      position: 'absolute',
      width: '100%',
      height: '4px',
      left: '0',
      top: '50%',
      background: '#3B7BCE',
      display: isMobile ? 'none' : 'block',
      zIndex: 1,
    },
    
    hLineRight: {
      position: 'absolute',
      width: '100%',
      height: '4px',
      right: '0',
      top: '50%',
      background: '#F26322',
      display: isMobile ? 'none' : 'block',
      zIndex: 1,
    },
    
    // Shorter lines above text content
    textLine: (color) => ({
      width: '100%',
      maxWidth: '400px',
      height: '4px',
      background: color,
      margin: '15px 0',
      display: isMobile ? 'none' : 'block',
    }),
    
    // Circle styles for the icons
    circle: (color) => ({
      width: isMobile ? '80px' : isTablet ? '120px' : '180px',
      height: isMobile ? '80px' : isTablet ? '120px' : '180px',
      borderRadius: '50%',
      background: color,
      margin: isMobile ? '0 20px 0 0' : '0 auto',
    }),
    
    // Content container
    contentContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: isMobile ? 'center' : 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    },
    
    // Text container
    textContainer: {
      textAlign: isMobile ? 'left' : 'right',
      width: isMobile ? 'calc(100% - 100px)' : '100%',
      maxWidth: '400px',
      margin: isMobile ? '0' : '0 0 0 auto', // Right-aligned for top-left and bottom-left cells
    },
    
    // Text container for right cells
    textContainerRight: {
      textAlign: isMobile ? 'left' : 'left',
      width: isMobile ? 'calc(100% - 100px)' : '100%',
      maxWidth: '400px',
      margin: isMobile ? '0' : '0 auto 0 0', // Left-aligned for top-right and bottom-right cells
    },
    
    // Heading styles
    heading: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: isMobile ? '24px' : isTablet ? '26px' : '30px',
      lineHeight: '1.2',
      margin: '0 0 15px',
      color: '#FFFFFF',
    },
    
    // Paragraph styles
    paragraph: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
      fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
      lineHeight: '1.5',
      margin: '0',
      color: '#FFFFFF',
      opacity: 0.9,
    },
    
    // Vertical indicator bar for mobile
    verticalBar: (color) => ({
      width: '3px',
      height: '100%',
      position: 'absolute',
      left: '4px',
      top: '0',
      backgroundColor: color,
      display: isMobile ? 'block' : 'none',
      overflow: 'hidden',
      zIndex: 1,
    }),
    
    // Shimmer effect
    shimmer: {
      position: 'absolute',
      top: '-100%',
      left: 0,
      width: '100%',
      height: '200%',
      background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.4), transparent)',
      animation: 'verticalShimmer 3s infinite',
    },
  };

  // Animation keyframes
  const keyframes = `
    @keyframes verticalShimmer {
      0% {
        top: -100%;
      }
      100% {
        top: 100%;
      }
    }
    
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
      
      {/* Grid layout for the 2x2 presentation */}
      <div style={styles.grid}>
        {/* Top row horizontal lines that span both columns */}
        <div style={{
          position: 'absolute',
          width: '50%',
          height: '4px',
          left: '0',
          top: '25%',
          background: '#3B7BCE',
          zIndex: 1,
          display: isMobile ? 'none' : 'block',
        }}></div>
        <div style={{
          position: 'absolute',
          width: '50%',
          height: '4px',
          right: '0',
          top: '25%',
          background: '#95BF47',
          zIndex: 1,
          display: isMobile ? 'none' : 'block',
        }}></div>
        
        {/* Bottom row horizontal lines that span both columns */}
        <div style={{
          position: 'absolute',
          width: '50%',
          height: '4px',
          left: '0',
          top: '75%',
          background: '#F26322',
          zIndex: 1,
          display: isMobile ? 'none' : 'block',
        }}></div>
        <div style={{
          position: 'absolute',
          width: '50%',
          height: '4px',
          right: '0',
          top: '75%',
          background: '#A66DD4',
          zIndex: 1,
          display: isMobile ? 'none' : 'block',
        }}></div>
        
        {/* Cell 1: WordPress (Top Left) */}
        <div 
          style={{
            ...styles.gridCell, 
            transitionDelay: '0.1s',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('wordpress')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('wordpress')}
        >
          {/* Vertical bar for mobile */}
          {isMobile && (
            <div style={styles.verticalBar('#3B7BCE')}>
              <div style={styles.shimmer}></div>
            </div>
          )}
          
          <div style={styles.contentContainer}>
            {isMobile ? (
              <>
                <div style={styles.circle('#3B7BCE')}></div>
                <div style={styles.textContainer}>
                  <h3 style={styles.heading}>WordPress</h3>
                  <p style={styles.paragraph}>
                    Flexible and easy-to-manage WordPress websites tailored to your goals.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={styles.circle('#3B7BCE')}></div>
                <div style={{height: '50px'}}></div> {/* Spacer */}
                <div style={styles.textContainer}>
                  <h3 style={styles.heading}>WordPress</h3>
                  <p style={styles.paragraph}>
                    Flexible and easy-to-manage WordPress websites tailored to your goals.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Cell 2: Shopify (Top Right) */}
        <div 
          style={{
            ...styles.gridCell, 
            transitionDelay: '0.2s',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('shopify')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('shopify')}
        >
          {/* Vertical bar for mobile */}
          {isMobile && (
            <div style={styles.verticalBar('#95BF47')}>
              <div style={styles.shimmer}></div>
            </div>
          )}
          
          <div style={styles.contentContainer}>
            {isMobile ? (
              <>
                <div style={{...styles.circle('#95BF47')}}></div>
                <div style={styles.textContainerRight}>
                  <h3 style={styles.heading}>Shopify</h3>
                  <p style={styles.paragraph}>
                    Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={styles.textContainerRight}>
                  <h3 style={styles.heading}>Shopify</h3>
                  <p style={styles.paragraph}>
                    Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
                  </p>
                  <div style={styles.textLine('#95BF47')}></div>
                </div>
                <div style={{height: '50px'}}></div> {/* Spacer */}
                <div style={{...styles.circle('#95BF47'), marginLeft: 'auto', marginRight: 0}}></div>
              </>
            )}
          </div>
        </div>
        
        {/* Cell 3: Point of Sale (Bottom Left) */}
        <div 
          style={{
            ...styles.gridCell, 
            transitionDelay: '0.3s',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('pos')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('pos')}
        >
          {/* Vertical bar for mobile */}
          {isMobile && (
            <div style={styles.verticalBar('#F26322')}>
              <div style={styles.shimmer}></div>
            </div>
          )}
          
          <div style={styles.contentContainer}>
            {isMobile ? (
              <>
                <div style={styles.circle('#F26322')}></div>
                <div style={styles.textContainer}>
                  <h3 style={styles.heading}>Point Of Sale</h3>
                  <p style={styles.paragraph}>
                    Powerful Magento solutions designed for high-performance online stores.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={styles.textContainer}>
                  <h3 style={styles.heading}>Point Of Sale</h3>
                  <p style={styles.paragraph}>
                    Powerful Magento solutions designed for high-performance online stores.
                  </p>
                </div>
                <div style={{height: '50px'}}></div> {/* Spacer */}
                <div style={styles.circle('#F26322')}></div>
              </>
            )}
          </div>
        </div>
        
        {/* Cell 4: Custom (Bottom Right) */}
        <div 
          style={{
            ...styles.gridCell, 
            transitionDelay: '0.4s',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('custom')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('custom')}
        >
          {/* Vertical bar for mobile */}
          {isMobile && (
            <div style={styles.verticalBar('#A66DD4')}>
              <div style={styles.shimmer}></div>
            </div>
          )}
          
          <div style={styles.contentContainer}>
            {isMobile ? (
              <>
                <div style={styles.circle('#A66DD4')}></div>
                <div style={styles.textContainerRight}>
                  <h3 style={styles.heading}>Custom</h3>
                  <p style={styles.paragraph}>
                    Fully custom-built websites crafted from scratch to meet unique business needs.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{...styles.circle('#A66DD4'), marginLeft: 0, marginRight: 'auto'}}></div>
                <div style={{height: '50px'}}></div> {/* Spacer */}
                <div style={styles.textContainerRight}>
                  <h3 style={styles.heading}>Custom</h3>
                  <p style={styles.paragraph}>
                    Fully custom-built websites crafted from scratch to meet unique business needs.
                  </p>
                  <div style={styles.textLine('#A66DD4')}></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
};

export default WebDevelopmentComponent;
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

  const styles = {
    frame: {
      position: 'relative',
      width: '100%',
      minHeight: isMobile ? '1200px' : isTablet ? '900px' : '889px',
      background: '#04091D',
      margin: '0 auto',
      overflow: 'hidden',
      padding: '0',
      color: 'white',
      fontFamily: '"Poppins", sans-serif',
    },
    
    line1: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '0',
      top: '548px',
      border: '4px solid #3B7BCE',
      zIndex: 1,
      display: isMobile || isTablet ? 'none' : 'block',
    },
    
    line2: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '25%',
      top: '548px',
      border: '4px solid #95BF47',
      zIndex: 2,
      display: isMobile || isTablet ? 'none' : 'block',
    },
    
    line3: {
      position: 'absolute',
      width: '100%',
      height: '0px',
      left: '50%',
      top: '548px',
      border: '4px solid #F26322',
      zIndex: 3,
      display: isMobile || isTablet ? 'none' : 'block',
    },
    
    line4: {
      position: 'absolute',
      width: '25%',
      height: '0px',
      left: '75%',
      top: '548px',
      border: '4px solid #A66DD4',
      zIndex: 4,
      display: isMobile || isTablet ? 'none' : 'block',
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
      margin: '0 auto',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 600,
      fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
      lineHeight: '1.6',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      marginBottom: '50px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
    },

    // Sections container
    sectionsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      margin: '0 auto 20px',
      position: 'relative',
    },
    
    // Section style
    section: (section) => ({
      flex: '1',
      minWidth: isMobile ? '100%' : isTablet ? '50%' : '25%',
      maxWidth: isMobile ? '100%' : isTablet ? '50%' : '25%',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: isMobile ? 'flex-start' : 'center',
      textAlign: isMobile ? 'left' : 'center',
      padding: isMobile ? '20px 15px 90px' : isTablet ? '20px 10px 120px' : '20px 0 150px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: `opacity 0.8s ease-out ${0.2 + (section === 'wordpress' ? 0 : section === 'shopify' ? 0.2 : section === 'pos' ? 0.4 : 0.6)}s, 
                  transform 0.8s ease-out ${0.2 + (section === 'wordpress' ? 0 : section === 'shopify' ? 0.2 : section === 'pos' ? 0.4 : 0.6)}s, 
                  background-color 0.3s ease`,
      position: 'relative',
      backgroundColor: (hoveredSection === section || activeSection === section) ? 
        (section === 'wordpress' ? 'rgba(59, 124, 206, 0.15)' : 
         section === 'shopify' ? 'rgba(149, 191, 71, 0.15)' : 
         section === 'pos' ? 'rgba(242, 99, 34, 0.15)' : 
         'rgba(166, 109, 212, 0.15)') : 'transparent',
    }),
    
    // Vertical indicator bar for mobile and tablet
    verticalBar: (color) => ({
      width: '3px',
      height: '100%',
      position: 'absolute',
      left: '4px',
      top: '0',
      backgroundColor: color,
      overflow: 'hidden',
      zIndex: 1,
      display: isMobile || isTablet ? 'block' : 'none',
    }),
    
    // Shimmer effect for vertical bar
    verticalShimmer: {
      position: 'absolute',
      top: '-100%',
      left: 0,
      width: '100%',
      height: '130%',
      background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
      animation: 'verticalShimmer 2s infinite',
    },

    // Horizontal bar for desktop
    horizontalBar: (color) => ({
      width: '100%',
      height: '5px',
      backgroundColor: color,
      margin: '0 0 15px',
      position: 'relative',
      overflow: 'hidden',
      display: isMobile ? 'none' : 'block',
    }),
    
    // Shimmer effect for horizontal bar
    horizontalShimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
      animation: 'shimmer 2s infinite',
    },
    
    // Platform icon containers
    iconContainer: {
      width: isMobile ? '80px' : isTablet ? '110px' : '140px',
      height: isMobile ? '80px' : isTablet ? '110px' : '140px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isMobile ? '20px' : '0',
      marginBottom: isMobile ? '0' : '20px',
    },
    
    // Section heading style
    heading: {
      width: '100%',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: isMobile ? '25px' : isTablet ? '20px' : '26px',
      lineHeight: '150%',
      textAlign: isMobile ? 'left' : 'center',
      letterSpacing: '-0.006em',
      color: '#FFFFFF',
      margin: '0 0 10px',
    },
    
    // Section paragraph style
    paragraph: {
      width: isMobile ? '120%' : '100%',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
      fontSize: isMobile ? '14px' : isTablet ? '13px' : '18px',
      lineHeight: '150%',
      textAlign: isMobile ? 'left' : 'center',
      letterSpacing: '-0.006em',
      color: '#FFFFFF',
      opacity: 0.9,
      margin: isMobile ? '15px 0 0' : '10px 0 0',
    },
    
    // Button container
    buttonContainer: (section) => ({
      position: 'absolute',
      bottom: isMobile ? '30px' : isTablet ? '20px' : '40px',
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      opacity: (isMobile || isTablet || hoveredSection === section) ? 1 : 0,
      transform: (isMobile || isTablet || hoveredSection === section) ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      zIndex: 2,
    }),
    
    // Button style
    button: (color, section) => ({
      display: 'inline-block',
      marginTop: '15px',
      padding: isMobile ? '6px 16px' : isTablet ? '6px 14px' : '8px 20px',
      border: `2px solid ${color}`,
      borderRadius: '4px',
      backgroundColor: (activeSection === section && (isMobile || isTablet)) ? 
        'transparent' : 'transparent',
      background: (activeSection === section && (isMobile || isTablet)) ? 
        `linear-gradient(90deg, ${color}, rgba(255,255,255,0.2))` : 'transparent',
      color: '#FFFFFF',
      fontFamily: 'Poppins, sans-serif',
      fontSize: isMobile ? '14px' : isTablet ? '13px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background 0.3s ease, color 0.3s ease',
      whiteSpace: 'nowrap',
    }),
  };

  // Animations keyframes
  const keyframes = `
    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
    
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
      
      {/* Horizontal lines (desktop only) */}
      <div style={styles.line1}></div>
      <div style={styles.line2}></div>
      <div style={styles.line3}></div>
      <div style={styles.line4}></div>
      
      {/* Services sections */}
      <div style={styles.sectionsContainer}>
        {/* WordPress Section */}
        <div 
          style={styles.section('wordpress')}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('wordpress')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('wordpress')}
        >
          {/* Vertical indicator bar (mobile/tablet only) */}
          {(isMobile || isTablet) && (
            <div style={styles.verticalBar('#3B7BCE')}>
              <div style={styles.verticalShimmer}></div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            width: '100%',
          }}>
            {/* Icon container */}
            <div style={styles.iconContainer}>
              {/* Replace with your actual image */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#3B7BCE',
              }}></div>
            </div>
            
            <div style={{
              textAlign: isMobile ? 'left' : 'center',
              width: isMobile ? 'calc(100% - 100px)' : '100%',
            }}>
              {/* Horizontal bar (desktop only) */}
              {!isMobile && (
                <div style={styles.horizontalBar('#3B7BCE')}>
                  <div style={styles.horizontalShimmer}></div>
                </div>
              )}
              
              {/* Section content */}
              <h3 style={styles.heading}>WordPress</h3>
              <p style={styles.paragraph}>
                Flexible and easy-to-manage WordPress websites tailored to your goals.
              </p>
            </div>
          </div>
          
          {/* WordPress Button */}
          <div style={styles.buttonContainer('wordpress')}>
            <a 
              href="#" 
              style={styles.button('#3B7BCE', 'wordpress')}
              onMouseEnter={(e) => {
                if (!isMobile && !isTablet) {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #3B7BCE, rgba(255,255,255,0.2))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !isTablet && activeSection !== 'wordpress') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              WordPress Development <span style={{ marginLeft: '5px' }}>→</span>
            </a>
          </div>
        </div>

        {/* Shopify Section */}
        <div 
          style={styles.section('shopify')}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('shopify')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('shopify')}
        >
          {/* Vertical indicator bar (mobile/tablet only) */}
          {(isMobile || isTablet) && (
            <div style={styles.verticalBar('#95BF47')}>
              <div style={styles.verticalShimmer}></div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            width: '100%',
          }}>
            {/* Icon container */}
            <div style={styles.iconContainer}>
              {/* Replace with your actual image */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#95BF47',
              }}></div>
            </div>
            
            <div style={{
              textAlign: isMobile ? 'left' : 'center',
              width: isMobile ? 'calc(100% - 100px)' : '100%',
            }}>
              {/* Horizontal bar (desktop only) */}
              {!isMobile && (
                <div style={styles.horizontalBar('#95BF47')}>
                  <div style={styles.horizontalShimmer}></div>
                </div>
              )}
              
              {/* Section content */}
              <h3 style={styles.heading}>Shopify</h3>
              <p style={styles.paragraph}>
                Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
              </p>
            </div>
          </div>
          
          {/* Shopify Button */}
          <div style={styles.buttonContainer('shopify')}>
            <a 
              href="#" 
              style={styles.button('#95BF47', 'shopify')}
              onMouseEnter={(e) => {
                if (!isMobile && !isTablet) {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #95BF47, rgba(255,255,255,0.2))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !isTablet && activeSection !== 'shopify') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              Shopify Development <span style={{ marginLeft: '5px' }}>→</span>
            </a>
          </div>
        </div>

        {/* Point of Sale Section */}
        <div 
          style={styles.section('pos')}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('pos')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('pos')}
        >
          {/* Vertical indicator bar (mobile/tablet only) */}
          {(isMobile || isTablet) && (
            <div style={styles.verticalBar('#F26322')}>
              <div style={styles.verticalShimmer}></div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            width: '100%',
          }}>
            {/* Icon container */}
            <div style={styles.iconContainer}>
              {/* Replace with your actual image */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#F26322',
              }}></div>
            </div>
            
            <div style={{
              textAlign: isMobile ? 'left' : 'center',
              width: isMobile ? 'calc(100% - 100px)' : '100%',
            }}>
              {/* Horizontal bar (desktop only) */}
              {!isMobile && (
                <div style={styles.horizontalBar('#F26322')}>
                  <div style={styles.horizontalShimmer}></div>
                </div>
              )}
              
              {/* Section content */}
              <h3 style={styles.heading}>Point Of Sale</h3>
              <p style={styles.paragraph}>
                Powerful Magento solutions designed for high-performance online stores.
              </p>
            </div>
          </div>
          
          {/* Point of Sale Button */}
          <div style={styles.buttonContainer('pos')}>
            <a 
              href="#" 
              style={styles.button('#F26322', 'pos')}
              onMouseEnter={(e) => {
                if (!isMobile && !isTablet) {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #F26322, rgba(255,255,255,0.2))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !isTablet && activeSection !== 'pos') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              Point Of Sale Development <span style={{ marginLeft: '5px' }}>→</span>
            </a>
          </div>
        </div>

        {/* Custom Section */}
        <div 
          style={styles.section('custom')}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('custom')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('custom')}
        >
          {/* Vertical indicator bar (mobile/tablet only) */}
          {(isMobile || isTablet) && (
            <div style={styles.verticalBar('#A66DD4')}>
              <div style={styles.verticalShimmer}></div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            width: '100%',
          }}>
            {/* Icon container */}
            <div style={styles.iconContainer}>
              {/* Replace with your actual image */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#A66DD4',
              }}></div>
            </div>
            
            <div style={{
              textAlign: isMobile ? 'left' : 'center',
              width: isMobile ? 'calc(100% - 100px)' : '100%',
            }}>
              {/* Horizontal bar (desktop only) */}
              {!isMobile && (
                <div style={styles.horizontalBar('#A66DD4')}>
                  <div style={styles.horizontalShimmer}></div>
                </div>
              )}
              
              {/* Section content */}
              <h3 style={styles.heading}>Custom</h3>
              <p style={styles.paragraph}>
                Fully custom-built websites crafted from scratch to meet unique business needs.
              </p>
            </div>
          </div>
          
          {/* Custom Button */}
          <div style={styles.buttonContainer('custom')}>
            <a 
              href="#" 
              style={styles.button('#A66DD4', 'custom')}
              onMouseEnter={(e) => {
                if (!isMobile && !isTablet) {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #A66DD4, rgba(255,255,255,0.2))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !isTablet && activeSection !== 'custom') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              Custom Development <span style={{ marginLeft: '5px' }}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
};

export default WebDevelopmentComponent;
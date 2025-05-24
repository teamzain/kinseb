'use client';

import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'tablet', or 'mobile'
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  
  // Array of service data
  const services = [
    {
      key: 'wordpress',
      name: 'WordPress',
      title: 'WordPress',
      color: '#1e90ff',
      description: 'Flexible and easy-to-manage WordPress websites tailored to your goals.',
      imagePath: '/images/Wordpress.png',
      odd: true, // Used to determine layout pattern (true = image at top for desktop)
      transitionDelay: '0.2s'
    },
    {
      key: 'shopify',
      name: 'Shopify',
      title: 'Shopify',
      color: '#95d600',
      description: 'Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.',
      imagePath: '/images/shopify.png',
      odd: false, // Used to determine layout pattern (false = text at top for desktop)
      transitionDelay: '0.4s'
    },
    {
      key: 'pos',
      name: 'Point Of Sale',
      title: 'Point Of Sale',
      color: '#F26322',
      description: 'Powerful Magento solutions designed for high-performance online stores.',
      imagePath: '/images/Magento.png',
      odd: true, // Used to determine layout pattern (true = image at top for desktop)
      transitionDelay: '0.6s'
    },
    {
      key: 'custom',
      name: 'Custom',
      title: 'Custom',
      color: '#61dafb', // Using the color from the original component
      description: 'Fully custom-built websites crafted from scratch to meet unique business needs.',
      imagePath: '/images/image.png',
      odd: false, // Used to determine layout pattern (false = text at top for desktop)
      transitionDelay: '0.8s'
    }
  ];

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
  
  // Button component for sections
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

  // Button component for sections - updated for gradient backgrounds
  const SectionButton = ({ title, color, section }) => (
    <button style={{
      backgroundColor: !isMobile && !isTablet && activeSection === section ? color : 'transparent',
      background: (isMobile || isTablet) && activeSection === section ? 
        `linear-gradient(90deg, ${color}, rgba(255,255,255,0.2))` : 'transparent',
      border: `2px solid ${color}`,
      borderRadius: '4px',
      color: !isMobile && !isTablet && activeSection === section ? '#0b0f21' : 'white',
      padding: isTablet ? '6px 14px' : '8px 16px',
      cursor: 'pointer',
      fontSize: isTablet ? '13px' : '14px',
      fontWeight: '600',
      transition: 'background 0.3s ease, color 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 3,
      whiteSpace: 'nowrap',
    }}
    onClick={() => handleSectionClick(section)}
    onMouseEnter={(e) => {
      if (!isMobile && !isTablet) {
        e.currentTarget.style.background = `linear-gradient(90deg, ${color}, rgba(255,255,255,0.2))`;
      }
    }}
    onMouseLeave={(e) => {
      if (!isMobile && !isTablet && activeSection !== section) {
        e.currentTarget.style.background = 'transparent';
      }
    }}
    >
      {title} Development <span style={{ marginLeft: '5px' }}>→</span>
    </button>
  );

  // Styles object for reuse
  const styles = {
    container: {
      width: '100%',
      backgroundColor: '#0b0f21',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: isTablet ? '60px 0' : '80px 0',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
    header: {
      maxWidth: isTablet ? '900px' : '1200px',
      margin: '0 auto',
      padding: '0 10px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    },
    title: {
      fontSize: isMobile ? '32px' : isTablet ? '38px' : '42px',
      fontWeight: '600',
      margin: '20px 0 10px',
      lineHeight: '1.2',
    },
    subtitle: {
      fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
      fontWeight: '500',
      margin: '0 0 30px',
      lineHeight: '1.2',
    },
    highlightSpan: {
      color: '#0aacdc',
      position: 'relative',
      display: 'inline-block',
      animation: 'highlight 3s ease-in-out infinite'
    },
    description: {
      fontSize: isTablet ? '16px' : '18px',
      maxWidth: isTablet ? '700px' : '800px',
      margin: '0 auto 60px',
      lineHeight: '1.5',
    },
    servicesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '100%',
      margin: '0 auto 20px',
      gap: isMobile || isTablet ? '0' : '0',
      position: 'relative',
    },
    serviceSection: (service) => ({
      flex: '1',
      minWidth: isMobile ? '100%' : isTablet ? '50%' : '25%',
      maxWidth: isMobile ? '100%' : isTablet ? '50%' : '25%',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: 'center',
      textAlign: isMobile ? 'left' : 'center',
      marginTop: isMobile ? '0px' : isTablet ? service.odd ? '0' : '30px' : service.odd ? '0' : '1.25px',
      marginLeft: isMobile ? '0' : '0',
      padding: isMobile ? '20px 15px 90px' : isTablet ? '20px 10px 120px' : '20px 0 150px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: `opacity 0.8s ease-out ${service.transitionDelay}, transform 0.8s ease-out ${service.transitionDelay}, background-color 0.3s ease`,
      position: 'relative',
      backgroundColor: !isMobile && hoveredSection === service.key || 
        (isMobile && activeSection === service.key) || 
        (isTablet && activeSection === service.key) ? 
        `rgba(${service.color.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.15)` : 'transparent',
    }),
    verticalBar: (color) => ({
      width: '3px',
      height: '100%',
      position: 'absolute',
      left: '4px',
      top: '0',
      backgroundColor: color,
      overflow: 'hidden',
      zIndex: 1,
    }),
    verticalShimmer: {
      position: 'absolute',
      top: '-100%',
      left: 0,
      width: '100%',
      height: '130%',
      background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
      animation: 'verticalShimmer 2s infinite',
    },
    content: (isMobile, marginLeft) => ({
      width: isMobile ? '75%' : '100%',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: isMobile ? 'center' : 'center',
      marginLeft: isMobile ? marginLeft || '0' : '0',
      marginTop: isMobile ? '0' : '0',
    }),
    imageContainer: (isMobile, isTablet, service) => ({
      width: isMobile ? '80px' : isTablet ? '110px' : '140px',
      height: isMobile ? '80px' : isTablet ? '110px' : '140px',
      marginBottom: isMobile ? '0' : '20px',
      marginRight: isMobile ? '20px' : '0',
      marginTop: !isMobile && !service.odd ? 'auto' : '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      order: !isMobile && !service.odd ? 2 : 0,
      borderRadius: '50%',
    }),
    image: (isMobile, isTablet, topMargin) => ({
      width: isMobile ? '80px' : isTablet ? '110px' : '140px',
      height: isMobile ? '80px' : isTablet ? '110px' : '140px',
      marginTop: topMargin || '0',
      objectFit: 'contain',
      display: 'block',
    }),
    textContainer: (isMobile, service) => ({
      textAlign: isMobile ? 'left' : service.odd ? 'center' : 'center',
      width: isMobile ? 'calc(100% - 100px)' : '100%',
      order: !isMobile && !service.odd ? 1 : 0,
      marginTop: !isMobile && !service.odd ? '0' : service.odd ? '0' : '40px',
    }),
    horizontalBar: (color) => ({
      width: '100%',
      height: '5px',
      backgroundColor: color,
      margin: '0 0 15px',
      position: 'relative',
      overflow: 'hidden',
      order: !isMobile ? 2 : 0,
    }),
    horizontalShimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
      animation: 'shimmer 2s infinite',
    },
    heading: (isMobile, isTablet, topMargin) => ({
      fontSize: isMobile ? '25px' : isTablet ? '20px' : '22px',
      fontWeight: '600',
      margin: '0 0 10px',
      marginTop: topMargin || '0',
      color: 'white',
    }),
    paragraph: (isMobile, isTablet, topMargin, leftMargin) => ({
      fontSize: isMobile ? '14px' : isTablet ? '13px' : '14px',
      lineHeight: '1.5',
      margin: '0 auto',
      padding: '0',
      marginTop: topMargin || '0',
      marginLeft: leftMargin || '0',
      maxWidth: isMobile ? '120%' : isTablet ? '95%' : '90%',
      color: 'white',
      opacity: '0.9',
      whiteSpace: isMobile ? 'normal' : 'normal',
    }),
    buttonContainer: {
      position: 'absolute',
      bottom: isMobile ? '30px' : isTablet ? '20px' : '40px',
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      zIndex: 2,
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Web Development
        </h1>
        <h2 style={styles.subtitle}>
          Tailored For <span style={styles.highlightSpan}>Clients</span> Needs
        </h2>
        <p style={styles.description}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* Services Section - Responsive Layout */}
      <div style={styles.servicesContainer}>
        {/* Dynamically render all services */}
        {services.map((service, index) => (
          <div 
            key={service.key}
            style={styles.serviceSection(service)}
            onMouseEnter={() => !isMobile && !isTablet && setHoveredSection(service.key)}
            onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
            onClick={() => (isMobile || isTablet) && handleSectionClick(service.key)} 
          >
            {/* Vertical indicator bar for mobile/tablet */}
            {(isMobile || isTablet) && (
              <div style={styles.verticalBar(service.color)}>
                <div style={styles.verticalShimmer}></div>
              </div>
            )}
            
            {/* Content layout based on device type and odd/even pattern */}
            <div style={styles.content(isMobile, isMobile ? (index === 0 ? '-10px' : '45px') : '0')}>
              {/* Mobile layout is always the same */}
              {isMobile ? (
                <>
                  <div style={styles.imageContainer(isMobile, isTablet, service)}>
                    <img 
                      src={service.imagePath} 
                      alt={service.name} 
                      style={styles.image(
                        isMobile, 
                        isTablet, 
                        index === 0 ? '-40px' : 
                        index === 1 ? '-85px' : 
                        index === 2 ? '-60px' : 
                        '-80px'
                      )}
                    />
                  </div>
                  <div style={styles.textContainer(isMobile, service)}>
                    <h3 style={styles.heading(
                      isMobile, 
                      isTablet, 
                      index === 0 ? '20px' : 
                      index === 1 ? '-30px' : 
                      index === 2 ? '-10px' : 
                      '-20px'
                    )}>
                      {service.name}
                    </h3>
                    <p style={styles.paragraph(
                      isMobile, 
                      isTablet, 
                      index === 0 ? '15px' : 
                      index === 1 ? '25px' : 
                      index === 2 ? '25px' : 
                      '-70px',
                      index === 0 ? '-7px' : '2px'
                    )}>
                      {service.description}
                    </p>
                  </div>
                </>
              ) : (
                // Desktop/Tablet layout (varies based on odd/even)
                service.odd ? (
                  // For odd sections (WordPress, Point of Sale)
                  <>
                    <div style={styles.imageContainer(isMobile, isTablet, service)}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={styles.image(
                          isMobile, 
                          isTablet, 
                          index === 0 ? '39px' : '-5px'
                        )}
                      />
                    </div>
                    <div style={{
                      width: '100%', // Full width bar
                      height: '5px',
                      backgroundColor: service.color,
                      margin: '0 0 15px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={styles.horizontalShimmer}></div>
                    </div>
                    <div style={styles.textContainer(isMobile, service)}>
                      <h3 style={styles.heading(isMobile, isTablet, index === 2 ? '14px' : '0')}>
                        {service.name}
                      </h3>
                      <p style={styles.paragraph(isMobile, isTablet)}>
                        {service.description}
                      </p>
                    </div>
                  </>
                ) : (
                  // For even sections (Shopify, Custom)
                  <>
                    <p style={{
                      fontSize: isTablet ? '13px' : '14px',
                      lineHeight: '1.5',
                      margin: '0 auto 8px',
                      marginTop: index === 1 ? '21px' : '61px',
                      padding: '0 20px',
                      color: 'white',
                      opacity: '0.9',
                      textAlign: 'center',
                    }}>
                      {service.description}
                    </p>
                    <h3 style={styles.heading(isMobile, isTablet)}>
                      {service.name}
                    </h3>
                    <div style={{
                      width: '100%', // Full width bar
                      height: '5px',
                      backgroundColor: service.color,
                      margin: '0 0 1px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={styles.horizontalShimmer}></div>
                    </div>
                    <div style={{
                      ...styles.imageContainer(isMobile, isTablet, service),
                      marginTop: index === 3 ? '-11px' : '0px',
                    }}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={styles.image(isMobile, isTablet)}
                      />
                    </div>
                  </>
                )
              )}
            </div>
            
            {/* Section Button (visible on hover for desktop, always visible on mobile/tablet) */}
            {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === service.key)) && (
              <div style={styles.buttonContainer}>
                <SectionButton title={service.title} color={service.color} section={service.key} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animations keyframes in style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          @keyframes highlight {
            0% {
              text-shadow: 0 0 5px rgba(10, 172, 220, 0.5);
            }
            50% {
              text-shadow: 0 0 20px rgba(10, 172, 220, 1);
            }
            100% {
              text-shadow: 0 0 5px rgba(10, 172, 220, 0.5);
            }
          }
        `
      }} />
    </div>
  );
};

export default WebDevelopmentComponent;
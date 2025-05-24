'use client';

import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [hoveredSection, setHoveredSection] = useState(null);
  
  // Array of service data
  const services = [
    {
      key: 'wordpress',
      name: 'WordPress',
      description: 'Flexible and easy-to-manage WordPress websites tailored to your goals.',
      imagePath: '/images/Wordpress.png',
      color: '#3B7BCE',
    },
    {
      key: 'shopify',
      name: 'Shopify',
      description: 'Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.',
      imagePath: '/images/shopify.png',
      color: '#95BF47',
    },
    {
      key: 'pos',
      name: 'Point Of Sale',
      description: 'Powerful Magento solutions designed for high-performance online stores.',
      imagePath: '/images/Magento.png',
      color: '#F26322',
    },
    {
      key: 'custom',
      name: 'Custom',
      description: 'Fully custom-built websites crafted from scratch to meet unique business needs.',
      imagePath: '/images/custom.png',
      color: '#A66DD4',
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

  // Device detection
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  // Main container styles
  const containerStyle = {
    width: '100%',
    backgroundColor: '#04091D',
    color: 'white',
    fontFamily: '"Poppins", sans-serif',
    padding: '60px 0',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
  };

  // Header styles
  const headerStyle = {
    maxWidth: '1200px',
    margin: '0 auto 60px',
    padding: '0 20px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  };

  // Title styles
  const titleStyle = {
    fontSize: isMobile ? '32px' : '42px',
    fontWeight: '600',
    margin: '0 0 20px',
    lineHeight: '1.2',
  };

  // Subtitle styles
  const subtitleStyle = {
    fontSize: isMobile ? '24px' : '32px',
    fontWeight: '500',
    margin: '0 0 20px',
    lineHeight: '1.2',
  };

  // Description styles
  const descriptionStyle = {
    fontSize: isMobile ? '16px' : '18px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.5',
  };

  // Row container style for services
  const rowContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
  };

  // Animation keyframes for shimmer effect
  const keyframes = `
    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Web Development</h1>
        <h2 style={subtitleStyle}>
          Tailored For <span style={{ color: '#3B7BCE' }}>Clients</span> Needs
        </h2>
        <p style={descriptionStyle}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* Services Row */}
      <div style={rowContainerStyle}>
        {/* For mobile and tablet, maintain the existing layout */}
        {isMobile || isTablet ? (
          <>
            {services.map((service, index) => (
              <div key={service.key} style={{
                width: isMobile ? '100%' : '50%',
                padding: isMobile ? '20px' : '30px 15px 60px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.8s ease-out ${0.1 * (index + 1)}s, transform 0.8s ease-out ${0.1 * (index + 1)}s`,
                minHeight: isMobile ? 'auto' : '450px',
              }}>
                {isMobile ? (
                  // Mobile layout
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left' }}>
                    <img 
                      src={service.imagePath} 
                      alt={service.name} 
                      style={{ width: '80px', height: '80px', marginRight: '20px' }}
                    />
                    <div>
                      <h3 style={{ fontSize: '24px', margin: '0 0 10px' }}>{service.name}</h3>
                      <p style={{ fontSize: '14px', margin: '0', opacity: '0.8' }}>{service.description}</p>
                    </div>
                  </div>
                ) : (
                  // Tablet layout
                  <>
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                      <p style={{ fontSize: '16px', margin: '0 0 15px', opacity: '0.8' }}>{service.description}</p>
                    </div>
                    <div style={{
                      width: '80%',
                      height: '4px',
                      backgroundColor: service.color,
                      margin: '15px auto',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        animation: 'shimmer 2s infinite',
                      }}></div>
                    </div>
                    <h3 style={{ fontSize: '26px', margin: '15px 0' }}>{service.name}</h3>
                    <div style={{
                      marginTop: 'auto',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px 0',
                    }}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </>
        ) : (
          // Desktop layout with the single row design
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            minHeight: '500px',
          }}>
            {/* Top row with descriptions */}
            <div style={{ 
              display: 'flex', 
              width: '100%', 
              justifyContent: 'space-between',
              padding: '0 0 20px',
              position: 'relative',
            }}>
              {services.map((service, index) => (
                <div 
                  key={`top-${service.key}`} 
                  style={{
                    width: '25%',
                    padding: '0 20px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ 
                    fontSize: '16px', 
                    margin: '0 0 20px', 
                    opacity: '0.9',
                    lineHeight: '1.5',
                  }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Connected Horizontal Lines */}
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              position: 'relative',
              height: '4px',
            }}>
              {services.map((service, index) => (
                <div 
                  key={`line-${service.key}`} 
                  style={{
                    width: '25%',
                    height: '4px',
                    backgroundColor: service.color,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    animation: 'shimmer 2s infinite',
                  }}></div>
                </div>
              ))}
            </div>

            {/* Titles */}
            <div style={{ 
              display: 'flex', 
              width: '100%', 
              justifyContent: 'space-between',
              padding: '20px 0',
            }}>
              {services.map((service, index) => (
                <div 
                  key={`title-${service.key}`} 
                  style={{
                    width: '25%',
                    padding: '0 20px',
                    textAlign: 'center',
                  }}
                >
                  <h3 style={{ 
                    fontSize: '28px', 
                    margin: '0 0 20px', 
                    fontWeight: '600',
                  }}>
                    {service.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Icons */}
            <div style={{ 
              display: 'flex', 
              width: '100%', 
              justifyContent: 'space-between',
              padding: '0',
              marginTop: 'auto',
            }}>
              {services.map((service, index) => (
                <div 
                  key={`icon-${service.key}`} 
                  style={{
                    width: '25%',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img 
                    src={service.imagePath} 
                    alt={service.name} 
                    style={{ 
                      width: '180px', 
                      height: '180px', 
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
};

export default WebDevelopmentComponent;
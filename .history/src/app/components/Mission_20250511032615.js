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
      position: 'bottom-left'
    },
    {
      key: 'shopify',
      name: 'Shopify',
      description: 'Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.',
      imagePath: '/images/shopify.png',
      color: '#95BF47',
      position: 'top-right'
    },
    {
      key: 'pos',
      name: 'Point Of Sale',
      description: 'Powerful Magento solutions designed for high-performance online stores.',
      imagePath: '/images/Magento.png',
      color: '#F26322',
      position: 'bottom-right'
    },
    {
      key: 'custom',
      name: 'Custom',
      description: 'Fully custom-built websites crafted from scratch to meet unique business needs.',
      imagePath: '/images/custom.png',
      color: '#A66DD4',
      position: 'top-left'
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

  // Main grid container style
  const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
  };

  // Function to get service grid item style
  const getServiceStyle = (position) => {
    const baseStyle = {
      width: isMobile ? '100%' : '50%',
      padding: isMobile ? '20px' : '40px',
      position: 'relative',
      minHeight: isMobile ? 'auto' : '350px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    };

    // For non-mobile devices, set different transition delays
    if (!isMobile) {
      switch (position) {
        case 'top-left': 
          baseStyle.transition = 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s, background-color 0.3s ease';
          break;
        case 'top-right': 
          baseStyle.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s, background-color 0.3s ease';
          break;
        case 'bottom-left': 
          baseStyle.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s, background-color 0.3s ease';
          break;
        case 'bottom-right': 
          baseStyle.transition = 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s, background-color 0.3s ease';
          break;
      }
    }

    return baseStyle;
  };

  // Function to render service content based on position
  const renderServiceContent = (service) => {
    if (isMobile) {
      // Mobile layout is always the same (icon left, text right)
      return (
        <div style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left' }}>
          <img 
            src={service.imagePath} 
            alt={service.name} 
            style={{ 
              width: '80px', 
              height: '80px', 
              marginRight: '20px',
              objectFit: 'contain',
            }}
          />
          <div>
            <h3 style={{ fontSize: '24px', margin: '0 0 10px', fontWeight: '600' }}>
              {service.name}
            </h3>
            <p style={{ fontSize: '14px', margin: '0', opacity: '0.9', lineHeight: '1.5' }}>
              {service.description}
            </p>
          </div>
        </div>
      );
    }

    // Desktop/tablet layout (varies by position)
    if (service.position === 'top-left' || service.position === 'bottom-right') {
      // Image on top, text on bottom
      return (
        <>
          <img 
            src={service.imagePath} 
            alt={service.name} 
            style={{ 
              width: '150px', 
              height: '150px', 
              marginBottom: '20px',
              objectFit: 'contain',
            }}
          />
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: service.color,
            margin: '10px 0', 
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
          <h3 style={{ 
            fontSize: '26px', 
            margin: '10px 0', 
            fontWeight: '600',
            textAlign: service.position === 'top-left' ? 'right' : 'left',
            width: '100%',
          }}>
            {service.name}
          </h3>
          <p style={{ 
            fontSize: '16px', 
            margin: '0', 
            opacity: '0.9', 
            lineHeight: '1.5',
            textAlign: service.position === 'top-left' ? 'right' : 'left',
            width: '100%',
          }}>
            {service.description}
          </p>
        </>
      );
    } else {
      // Text on top, image on bottom
      return (
        <>
          <p style={{ 
            fontSize: '16px', 
            margin: '0 0 10px', 
            opacity: '0.9', 
            lineHeight: '1.5',
            textAlign: service.position === 'top-right' ? 'left' : 'right',
            width: '100%',
          }}>
            {service.description}
          </p>
          <h3 style={{ 
            fontSize: '26px', 
            margin: '0 0 10px', 
            fontWeight: '600',
            textAlign: service.position === 'top-right' ? 'left' : 'right',
            width: '100%',
          }}>
            {service.name}
          </h3>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: service.color,
            margin: '10px 0', 
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
          <img 
            src={service.imagePath} 
            alt={service.name} 
            style={{ 
              width: '150px', 
              height: '150px', 
              marginTop: '20px',
              objectFit: 'contain',
            }}
          />
        </>
      );
    }
  };
  
  // Horizontal line styles
  const horizontalLineStyles = {
    leftTop: {
      position: 'absolute',
      left: 0,
      top: '25%',
      width: '50%',
      height: '4px',
      background: services[0].color,
      zIndex: 1,
      display: isMobile ? 'none' : 'block',
    },
    rightTop: {
      position: 'absolute',
      right: 0,
      top: '25%',
      width: '50%',
      height: '4px',
      background: services[1].color,
      zIndex: 1,
      display: isMobile ? 'none' : 'block',
    },
    leftBottom: {
      position: 'absolute',
      left: 0,
      top: '75%',
      width: '50%',
      height: '4px',
      background: services[2].color,
      zIndex: 1,
      display: isMobile ? 'none' : 'block',
    },
    rightBottom: {
      position: 'absolute',
      right: 0,
      top: '75%',
      width: '50%',
      height: '4px',
      background: services[3].color,
      zIndex: 1,
      display: isMobile ? 'none' : 'block',
    },
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

      {/* Services Grid */}
      <div style={gridContainerStyle}>
        {/* Horizontal lines that span across rows */}
        <div style={horizontalLineStyles.leftTop}></div>
        <div style={horizontalLineStyles.rightTop}></div>
        <div style={horizontalLineStyles.leftBottom}></div>
        <div style={horizontalLineStyles.rightBottom}></div>

        {/* Reordering services to match the grid layout in the image */}
        {[
          services.find(s => s.key === 'wordpress'),  // Bottom Left
          services.find(s => s.key === 'shopify'),    // Top Right
          services.find(s => s.key === 'pos'),        // Bottom Right
          services.find(s => s.key === 'custom'),     // Top Left
        ].map((service, index) => (
          <div 
            key={service.key}
            style={getServiceStyle(service.position)}
            onMouseEnter={() => !isMobile && setHoveredSection(service.key)}
            onMouseLeave={() => !isMobile && setHoveredSection(null)}
          >
            {renderServiceContent(service)}
          </div>
        ))}
      </div>

      {/* Add animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
};

export default WebDevelopmentComponent;
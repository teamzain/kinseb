'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

const WebDevelopmentComponent = () => {
  // Animation and interaction states
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Refs for keyboard navigation
  const sectionRefs = useRef([]);
  
  // Array of service data
  const services = [
    {
      key: 'wordpress',
      name: 'WordPress',
      description: 'Flexible and easy-to-manage WordPress websites tailored to your goals.',
      imagePath: '/images/Wordpress.png',
      color: '#3B7BCE',
      isOdd: true  // First service is odd
    },
    {
      key: 'shopify',
      name: 'Shopify',
      description: 'Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.',
      imagePath: '/images/shopify.png',
      color: '#95BF47',
      isOdd: false  // Second service is even
    },
    {
      key: 'pos',
      name: 'Point Of Sale',
      description: 'Powerful Magento solutions designed for high-performance online stores.',
      imagePath: '/images/Magento.png',
      color: '#F26322',
      isOdd: true  // Third service is odd
    },
    {
      key: 'custom',
      name: 'Custom',
      description: 'Fully custom-built websites crafted from scratch to meet unique business needs.',
      imagePath: '/images/custom.png',
      color: '#A66DD4',
      isOdd: false  // Fourth service is even
    }
  ];

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveSection(services[index].key);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setActiveSection(null);
      e.preventDefault();
    } else if (e.key === 'Tab') {
      setIsFocused(true);
    }
  }, [services]);

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
    
    // Add listener for keyboard navigation
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setHoveredSection(null);
        setActiveSection(null);
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    }
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
    padding: isMobile ? '40px 0' : '60px 0',
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

  // Button styles with accessibility improvements
  const getButtonStyle = (color, isActive = false) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '10px 18px' : '12px 22px',
    borderRadius: '4px',
    border: `2px solid ${color}`,
    color: isActive ? '#04091D' : 'white',
    backgroundColor: isActive ? color : 'transparent',
    fontFamily: 'Poppins, sans-serif',
    fontSize: isMobile ? '15px' : '16px',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    position: 'relative',
    boxShadow: isFocused ? `0 0 0 3px rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.4)` : 'none',
  });

  // Row container style for services
  const rowContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
  };

  return (
    <div style={containerStyle} role="region" aria-label="Web Development Services">
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
        {/* Mobile Layout - Vertical Timeline */}
        {isMobile ? (
          <div style={{ width: '100%', position: 'relative' }}>
            {services.map((service, index) => {
              const showButton = true; // Always show button on mobile
              const isActive = activeSection === service.key;
              
              return (
                <div 
                  key={service.key} 
                  ref={el => sectionRefs.current[index] = el}
                  tabIndex="0"
                  role="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveSection(isActive ? null : service.key)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={{
                    width: '100%',
                    padding: '25px 20px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.8s ease-out ${0.1 * (index + 1)}s, transform 0.8s ease-out ${0.1 * (index + 1)}s`,
                    marginBottom: '15px',
                    backgroundColor: isActive ? `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.1)` : 'transparent',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    outline: isFocused ? `2px solid ${service.color}` : 'none',
                    outlineOffset: '2px',
                  }}
                >
                  {/* Vertical timeline indicator */}
                  <div style={{
                    width: '4px',
                    height: '100%',
                    position: 'absolute',
                    left: '10px',
                    top: '0',
                    backgroundColor: service.color,
                    overflow: 'hidden',
                    zIndex: 1,
                    borderRadius: '2px',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-100%',
                      left: 0,
                      width: '100%',
                      height: '130%',
                      background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
                      animation: 'verticalShimmer 2s infinite',
                    }}></div>
                  </div>

                  {/* Mobile content layout - centered */}
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '15px', 
                    paddingLeft: '15px',
                  }}>
                    <img 
                      src={service.imagePath} 
                      alt={`${service.name} icon`}
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        marginBottom: '15px',
                        transition: 'transform 0.3s ease',
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                    
                    <h3 style={{ 
                      fontSize: '26px', 
                      margin: '0 0 12px',
                      color: service.color,
                      transition: 'transform 0.3s ease',
                    }}>
                      {service.name}
                    </h3>
                    
                    <p style={{ 
                      fontSize: '16px', 
                      margin: '0 0 20px', 
                      opacity: '0.9',
                      lineHeight: '1.5',
                      maxWidth: '90%',
                      textAlign: 'center',
                    }}>
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Always visible button for mobile */}
                  {showButton && (
                    <div 
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        opacity: 1,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        transform: 'translateY(0)',
                      }}
                    >
                      <a 
                        href={`#${service.key}`}
                        style={getButtonStyle(service.color, isActive)}
                        aria-label={`Learn more about ${service.name} development`}
                        role="button"
                        tabIndex="0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSection(service.key);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveSection(service.key);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      >
                        {service.name} Development <span style={{ marginLeft: '5px', display: 'inline-block', transition: 'transform 0.2s ease' }}>→</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : isTablet ? (
          // Improved Tablet Layout with closer icons to timeline
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Row 1: First two services */}
            <div style={{
              display: 'flex',
              width: '100%',
              marginBottom: '80px',
              position: 'relative',
              minHeight: '420px',
            }}>
              {/* WordPress (left side) */}
              <div 
                tabIndex="0"
                role="button"
                aria-pressed={activeSection === services[0].key}
                ref={el => sectionRefs.current[0] = el}
                onClick={() => setActiveSection(activeSection === services[0].key ? null : services[0].key)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                onMouseEnter={() => setHoveredSection(services[0].key)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s, background-color 0.3s ease',
                  backgroundColor: (hoveredSection === services[0].key || activeSection === services[0].key) ? 
                    `rgba(${parseInt(services[0].color.slice(1, 3), 16)}, ${parseInt(services[0].color.slice(3, 5), 16)}, ${parseInt(services[0].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  outline: isFocused && (hoveredSection === services[0].key || activeSection === services[0].key) ? 
                    `2px solid ${services[0].color}` : 'none',
                  outlineOffset: '2px',
                }}
              >
                {/* Image - closer to the center line */}
                <div style={{
                  position: 'absolute',
                  top: '140px', // Closer to the center line
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                }}>
                  <img
                    src={services[0].imagePath}
                    alt={`${services[0].name} icon`}
                    style={{
                      width: '120px', // Larger icon
                      height: '120px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                      transform: (hoveredSection === services[0].key || activeSection === services[0].key) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
                
                {/* Text content for WordPress */}
                <div style={{
                  position: 'absolute',
                  top: '270px', // Below the center line
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0 0 15px',
                    textAlign: 'center',
                    color: services[0].color,
                  }}>
                    {services[0].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    margin: '0 0 20px',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[0].description}
                  </p>
                  
                  {/* Button for WordPress */}
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: (hoveredSection === services[0].key || activeSection === services[0].key) ? 1 : 0,
                    transform: (hoveredSection === services[0].key || activeSection === services[0].key) ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: (hoveredSection === services[0].key || activeSection === services[0].key) ? 'auto' : 'none',
                  }}>
                    <a 
                      href={`#${services[0].key}`}
                      style={getButtonStyle(services[0].color, activeSection === services[0].key)}
                      aria-label={`Learn more about ${services[0].name} development`}
                      role="button"
                      tabIndex={hoveredSection === services[0].key || activeSection === services[0].key ? "0" : "-1"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSection(services[0].key);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveSection(services[0].key);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    >
                      {services[0].name} Development <span style={{ marginLeft: '5px', display: 'inline-block', transition: 'transform 0.2s ease', transform: 'translateX(0)' }}>→</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Shopify (right side) */}
              <div 
                tabIndex="0"
                role="button"
                aria-pressed={activeSection === services[1].key}
                ref={el => sectionRefs.current[1] = el}
                onClick={() => setActiveSection(activeSection === services[1].key ? null : services[1].key)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                onMouseEnter={() => setHoveredSection(services[1].key)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s, background-color 0.3s ease',
                  backgroundColor: (hoveredSection === services[1].key || activeSection === services[1].key) ? 
                    `rgba(${parseInt(services[1].color.slice(1, 3), 16)}, ${parseInt(services[1].color.slice(3, 5), 16)}, ${parseInt(services[1].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  outline: isFocused && (hoveredSection === services[1].key || activeSection === services[1].key) ? 
                    `2px solid ${services[1].color}` : 'none',
                  outlineOffset: '2px',
                }}
              >
                {/* Text content for Shopify */}
                <div style={{
                  position: 'absolute',
                  top: '20px', // Above the center line
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0 0 15px',
                    textAlign: 'center',
                    color: services[1].color,
                  }}>
                    {services[1].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    margin: '0 0 20px',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[1].description}
                  </p>
                  
                  {/* Button for Shopify */}
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: (hoveredSection === services[1].key || activeSection === services[1].key) ? 1 : 0,
                    transform: (hoveredSection === services[1].key || activeSection === services[1].key) ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: (hoveredSection === services[1].key || activeSection === services[1].key) ? 'auto' : 'none',
                  }}>
                    <a 
                      href={`#${services[1].key}`}
                      style={getButtonStyle(services[1].color, activeSection === services[1].key)}
                      aria-label={`Learn more about ${services[1].name} development`}
                      role="button"
                      tabIndex={hoveredSection === services[1].key || activeSection === services[1].key ? "0" : "-1"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSection(services[1].key);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveSection(services[1].key);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    >
                      {services[1].name} Development <span style={{ marginLeft: '5px', display: 'inline-block', transition: 'transform 0.2s ease', transform: 'translateX(0)' }}>→</span>
                    </a>
                  </div>
                </div>
                
                {/* Image - closer to the center line */}
                <div style={{
                  position: 'absolute',
                  top: '140px', // Closer to the center line
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                }}>
                  <img
                    src={services[1].imagePath}
                    alt={`${services[1].name} icon`}
                    style={{
                      width: '120px', // Larger icon
                      height: '120px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                      transform: (hoveredSection === services[1].key || activeSection === services[1].key) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
              </div>
              
              {/* Horizontal line for row 1 - perfectly centered */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '200px', // Adjusted to match the new image positions
                width: '100%',
                height: '4px',
                display: 'flex',
                zIndex: 1,
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '50%',
                  height: '4px',
                  backgroundColor: services[0].color,
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
                <div style={{
                  width: '50%',
                  height: '4px',
                  backgroundColor: services[1].color,
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
              </div>
            </div>
            
            {/* Row 2: Second two services */}
            <div style={{
              display: 'flex',
              width: '100%',
              position: 'relative',
              minHeight: '420px',
            }}>
              {/* Point of Sale (left side) */}
              <div 
                tabIndex="0"
                role="button"
                aria-pressed={activeSection === services[2].key}
                ref={el => sectionRefs.current[2] = el}
                onClick={() => setActiveSection(activeSection === services[2].key ? null : services[2].key)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                onMouseEnter={() => setHoveredSection(services[2].key)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s, background-color 0.3s ease',
                  backgroundColor: (hoveredSection === services[2].key || activeSection === services[2].key) ? 
                    `rgba(${parseInt(services[2].color.slice(1, 3), 16)}, ${parseInt(services[2].color.slice(3, 5), 16)}, ${parseInt(services[2].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  outline: isFocused && (hoveredSection === services[2].key || activeSection === services[2].key) ? 
                    `2px solid ${services[2].color}` : 'none',
                  outlineOffset: '2px',
                }}
              >
                {/* Image - closer to the center line */}
                <div style={{
                  position: 'absolute',
                  top: '140px', // Closer to the center line
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                }}>
                  <img
                    src={services[2].imagePath}
                    alt={`${services[2].name} icon`}
                    style={{
                      width: '120px', // Larger icon
                      height: '120px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                      transform: (hoveredSection === services[2].key || activeSection === services[2].key) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
                
                {/* Text content for Point of Sale */}
                <div style={{
                  position: 'absolute',
                  top: '270px', // Below the center line
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0 0 15px',
                    textAlign: 'center',
                    color: services[2].color,
                  }}>
                    {services[2].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    margin: '0 0 20px',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[2].description}
                  </p>
                  
                  {/* Button for Point of Sale */}
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: (hoveredSection === services[2].key || activeSection === services[2].key) ? 1 : 0,
                    transform: (hoveredSection === services[2].key || activeSection === services[2].key) ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: (hoveredSection === services[2].key || activeSection === services[2].key) ? 'auto' : 'none',
                  }}>
                    <a 
                      href={`#${services[2].key}`}
                      style={getButtonStyle(services[2].color, activeSection === services[2].key)}
                      aria-label={`Learn more about ${services[2].name} development`}
                      role="button"
                      tabIndex={hoveredSection === services[2].key || activeSection === services[2].key ? "0" : "-1"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSection(services[2].key);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveSection(services[2].key);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    >
                      {services[2].name} Development <span style={{ marginLeft: '5px', display: 'inline-block', transition: 'transform 0.2s ease', transform: 'translateX(0)' }}>→</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Custom (right side) */}
              <div 
                tabIndex="0"
                role="button"
                aria-pressed={activeSection === services[3].key}
                ref={el => sectionRefs.current[3] = el}
                onClick={() => setActiveSection(activeSection === services[3].key ? null : services[3].key)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                onMouseEnter={() => setHoveredSection(services[3].key)}
                onMouseLeave={() => setHoveredSection(null)}
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s, background-color 0.3s ease',
                  backgroundColor: (hoveredSection === services[3].key || activeSection === services[3].key) ? 
                    `rgba(${parseInt(services[3].color.slice(1, 3), 16)}, ${parseInt(services[3].color.slice(3, 5), 16)}, ${parseInt(services[3].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  outline: isFocused && (hoveredSection === services[3].key || activeSection === services[3].key) ? 
                    `2px solid ${services[3].color}` : 'none',
                  outlineOffset: '2px',
                }}
              >
                {/* Text content for Custom */}
                <div style={{
                  position: 'absolute',
                  top: '20px', // Above the center line
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0 0 15px',
                    textAlign: 'center',
                    color: services[3].color,
                  }}>
                    {services[3].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    margin: '0 0 20px',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[3].description}
                  </p>
                  
                  {/* Button for Custom */}
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: (hoveredSection === services[3].key || activeSection === services[3].key) ? 1 : 0,
                    transform: (hoveredSection === services[3].key || activeSection === services[3].key) ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: (hoveredSection === services[3].key || activeSection === services[3].key) ? 'auto' : 'none',
                  }}>
                    <a 
                      href={`#${services[3].key}`}
                      style={getButtonStyle(services[3].color, activeSection === services[3].key)}
                      aria-label={`Learn more about ${services[3].name} development`}
                      role="button"
                      tabIndex={hoveredSection === services[3].key || activeSection === services[3].key ? "0" : "-1"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSection(services[3].key);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveSection(services[3].key);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    >
                      {services[3].name} Development <span style={{ marginLeft: '5px', display: 'inline-block', transition: 'transform 0.2s ease', transform: 'translateX(0)' }}>→</span>
                    </a>
                  </div>
                </div>
                
                {/* Image - closer to the center line */}
                <div style={{
                  position: 'absolute',
                  top: '140px', // Closer to the center line
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                }}>
                  <img
                    src={services[3].imagePath}
                    alt={`${services[3].name} icon`}
                    style={{
                      width: '120px', // Larger icon
                      height: '120px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                      transform: (hoveredSection === services[3].key || activeSection === services[3].key) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
              </div>
              
              {/* Horizontal line for row 2 - perfectly centered */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '200px', // Adjusted to match the new image positions
                width: '100%',
                height: '4px',
                display: 'flex',
                zIndex: 1,
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '50%',
                  height: '4px',
                  backgroundColor: services[2].color,
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
                <div style={{
                  width: '50%',
                  height: '4px',
                  backgroundColor: services[3].color,
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
              </div>
            </div>
          </div>
          ) : (
          // Improved Desktop layout
          <div style={{ 
            width: '100%',
            position: 'relative',
            minHeight: '480px', // Increased height for better button spacing
            display: 'flex',
          }}>
            {/* Services with different layouts for odd/even sections */}
            {services.map((service, index) => {
              const isHoveredOrActive = hoveredSection === service.key || activeSection === service.key;
              
              return (
                <div 
                  key={`service-${service.key}`}
                  tabIndex="0"
                  role="button"
                  aria-pressed={activeSection === service.key}
                  ref={el => sectionRefs.current[index] = el}
                  onClick={() => setActiveSection(activeSection === service.key ? null : service.key)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onMouseEnter={() => setHoveredSection(service.key)}
                  onMouseLeave={() => setHoveredSection(null)}
                  style={{
                    width: '25%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 15px',
                    position: 'relative',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.8s ease-out ${0.1 * (index + 1)}s, transform 0.8s ease-out ${0.1 * (index + 1)}s, background-color 0.3s ease`,
                    height: '480px', // Increased height to accommodate button better
                    backgroundColor: isHoveredOrActive ? 
                      `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.1)` : 
                      'transparent',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    outline: isFocused && isHoveredOrActive ? 
                      `2px solid ${service.color}` : 'none',
                    outlineOffset: '2px',
                  }}
                >
                  {/* For odd services: Image above, text below */}
                  {service.isOdd ? (
                    <>
                      {/* Image closer to the line for odd */}
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingBottom: '20px', // More space between image and horizontal line
                      }}>
                        <img 
                          src={service.imagePath} 
                          alt={`${service.name} icon`}
                          style={{ 
                            width: '140px', 
                            height: '140px', 
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease',
                            transform: isHoveredOrActive ? 'scale(1.1)' : 'scale(1)',
                          }}
                        />
                      </div>

                      {/* Text content closer to line for odd */}
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        paddingTop: '20px', // More space between text and horizontal line
                        textAlign: 'center',
                      }}>
                        <h3 style={{ 
                          fontSize: '26px', 
                          margin: '0 0 15px', 
                          fontWeight: '600',
                          color: service.color,
                          transition: 'transform 0.3s ease',
                        }}>
                          {service.name}
                        </h3>
                        <p style={{ 
                          fontSize: '16px', 
                          margin: '0 auto', 
                          opacity: '0.9',
                          lineHeight: '1.5',
                          maxWidth: '90%',
                        }}>
                          {service.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    // For even services: Text above, image below
                    <>
                      {/* Text closer to line for even */}
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        paddingBottom: '20px', // More space between text and horizontal line
                        textAlign: 'center',
                      }}>
                        <h3 style={{ 
                          fontSize: '26px', 
                          margin: '0 0 15px', 
                          fontWeight: '600',
                          color: service.color,
                          transition: 'transform 0.3s ease',
                        }}>
                          {service.name}
                        </h3>
                        <p style={{ 
                          fontSize: '16px', 
                          margin: '0 auto', 
                          opacity: '0.9',
                          lineHeight: '1.5',
                          maxWidth: '90%',
                        }}>
                          {service.description}
                        </p>
                      </div>

                      {/* Image closer to line for even */}
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingTop: '20px', // More space between image and horizontal line
                      }}>
                        <img 
                          src={service.imagePath} 
                          alt={`${service.name} icon`}
                          style={{ 
                            width: '140px', 
                            height: '140px', 
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease',
                            transform: isHoveredOrActive ? 'scale(1.1)' : 'scale(1)',
                          }}
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Button - improved with animation and accessibility */}
                  <div style={{
                    position: 'absolute',
                    bottom: '30px', // Positioned lower
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: isHoveredOrActive ? 1 : 0,
                    transform: isHoveredOrActive ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: isHoveredOrActive ? 'auto' : 'none',
                  }}>
                    <a 
                      href={`#${service.key}`}
                      style={getButtonStyle(service.color, activeSection === service.key)}
                      aria-label={`Learn more about ${service.name} development`}
                      role="button"
                      tabIndex={isHoveredOrActive ? "0" : "-1"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSection(service.key);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveSection(service.key);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    >
                      {service.name} Development <span style={{ 
                        marginLeft: '5px', 
                        display: 'inline-block', 
                        transition: 'transform 0.2s ease',
                        transform: isHoveredOrActive ? 'translateX(3px)' : 'translateX(0)',
                      }}>→</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Connected Horizontal Line that spans across all sections */}
            <div style={{ 
              position: 'absolute',
              left: 0,
              top: '50%',
              width: '100%',
              height: '4px',
              display: 'flex',
              zIndex: 1,
              transform: 'translateY(-50%)',
              borderRadius: '2px',
              overflow: 'hidden',
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
          </div>
        )}
      </div>

      {/* Add animation keyframes */}
      <style dangerouslySetInnerHTML={{ 
        __html: `
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes verticalShimmer {
            0% { top: -100%; }
            100% { top: 100%; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        ` 
      }} />
    </div>
  );
};

export default WebDevelopmentComponent;
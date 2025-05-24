'use client';

import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  
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
      imagePath: '/images/icon.png',
      color: '#A66DD4',
      isOdd: false  // Fourth service is even
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

  // Device detection helpers
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  // Handle card click for mobile/tablet (for touch devices)
  const handleCardClick = (key) => {
    if (!isMobile) {
      setActiveSection(activeSection === key ? null : key);
    }
  };

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

  // Button styles - UPDATED with gradient effect
  const getButtonStyle = (color, isActive = false) => ({
    backgroundColor: !isMobile && !isTablet && isActive ? color : 'transparent',
    background: (isMobile || isTablet) && isActive ? 
      `linear-gradient(90deg, ${color}, rgba(255,255,255,0.2))` : 'transparent',
    border: `2px solid ${color}`,
    borderRadius: '4px',
    color: !isMobile && !isTablet && isActive ? '#04091D' : 'white',
    padding: isTablet ? '6px 14px' : isMobile ? '8px 16px' : '10px 18px',
    cursor: 'pointer',
    fontSize: isTablet ? '13px' : '14px',
    fontWeight: '600',
    transition: 'background 0.3s ease, color 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 3,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    display: 'inline-block',
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
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <h1 style={{
          ...titleStyle,
          textAlign: isMobile ? 'left' : 'center',
        }}>Web Development</h1>
        <h2 style={{
          ...subtitleStyle,
          textAlign: isMobile ? 'left' : 'center',
        }}>
          Tailored For <span style={{ color: '#3B7BCE' }}>Clients</span> Needs
        </h2>
        <p style={{
          ...descriptionStyle,
          textAlign: isMobile ? 'left' : 'center',
          margin: isMobile ? '0' : '0 auto',
        }}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* Services Row */}
      <div style={rowContainerStyle}>
        {/* Mobile Layout */}
        {isMobile ? (
          <div style={{ 
            position: 'relative',
            width: '100%',
            padding: '0 15px',
          }}>
            {/* Horizontal colored lines that connect all services - similar to desktop/tablet */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '0',
              width: '6px',
              height: '100%',
              zIndex: 0,
              display: 'flex',
              flexDirection: 'column',
            }}>
              {services.map((service, index) => {
                const segmentHeight = `${100 / services.length}%`;
                return (
                  <div 
                    key={`line-${service.key}`} 
                    style={{
                      width: '6px',
                      height: segmentHeight,
                      backgroundColor: service.color,
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: index === 0 ? '3px 3px 0 0' : index === services.length - 1 ? '0 0 3px 3px' : '0',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-100%',
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
                      animation: `verticalShimmer ${2 + index * 0.5}s infinite`,
                      animationDelay: `${index * 0.2}s`,
                    }}></div>
                  </div>
                );
              })}
            </div>
            
            {services.map((service, index) => (
              <div 
                key={service.key} 
                style={{
                  width: '100%',
                  padding: '25px 20px 25px 40px', // Increased left padding for the horizontal connector
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  boxSizing: 'border-box',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.8s ease-out ${0.1 * (index + 1)}s, transform 0.8s ease-out ${0.1 * (index + 1)}s`,
                  marginBottom: index === services.length - 1 ? '0' : '30px', // No margin for last item
                  backgroundColor: `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.08)`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  height: `${100 / services.length - 3}%`, // Height for equal distribution
                }}
              >
                {/* Horizontal connector from vertical line to card */}
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  width: '20px',
                  height: '6px',
                  backgroundColor: service.color,
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                }}></div>

                {/* Mobile content layout */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '15px', 
                }}>
                  <img 
                    src={service.imagePath} 
                    alt={service.name} 
                    style={{ 
                      width: '90px', 
                      height: '90px', 
                      marginRight: '20px',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '24px', margin: '0 0 10px', fontWeight: '600' }}>{service.name}</h3>
                    <p style={{ fontSize: '15px', margin: '0', opacity: '0.9', lineHeight: '1.5' }}>{service.description}</p>
                  </div>
                </div>
                
                {/* Always visible button for mobile */}
                <div style={{ 
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'flex-start', 
                  marginTop: '15px',
                }}>
                  <a 
                    href="#" 
                    style={getButtonStyle(service.color, true)}
                    onMouseEnter={(e) => {
                      if (!isMobile && !isTablet) {
                        e.currentTarget.style.background = `linear-gradient(90deg, ${service.color}, rgba(255,255,255,0.2))`;
                        e.currentTarget.style.color = '#04091D';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile && !isTablet && hoveredSection !== service.key) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                  >
                    {service.name} Development <span style={{ marginLeft: '5px' }}>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : isTablet ? (
          // IMPROVED TABLET LAYOUT
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
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s',
                  cursor: 'pointer',
                  backgroundColor: activeSection === services[0].key ? 
                    `rgba(${parseInt(services[0].color.slice(1, 3), 16)}, ${parseInt(services[0].color.slice(3, 5), 16)}, ${parseInt(services[0].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  borderRadius: '8px 0 0 8px',
                  transition: 'background-color 0.3s ease, opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
                onClick={() => handleCardClick(services[0].key)}
              >
                {/* Top section (image for WordPress) - CLOSER TO CENTER LINE */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '140px',
                }}>
                  <img
                    src={services[0].imagePath}
                    alt={services[0].name}
                    style={{
                      width: '120px', // INCREASED SIZE
                      height: '120px', // INCREASED SIZE
                      objectFit: 'contain',
                      transform: 'translateY(15px)', // MOVE CLOSER TO LINE
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    }}
                  />
                </div>
                
                {/* Bottom section (text for WordPress) */}
                <div style={{
                  position: 'absolute',
                  top: '200px',
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
                  }}>
                    {services[0].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.5',
                    margin: '0 auto',
                    opacity: '0.9',
                    textAlign: 'center',
                    maxWidth: '90%',
                  }}>
                    {services[0].description}
                  </p>
                </div>

                {/* Button for WordPress (visible when active) */}
                {activeSection === services[0].key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.5s forwards',
                  }}>
                    <a 
                      href="#" 
                      style={getButtonStyle(services[0].color, true)}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[0].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[0].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                    >
                      {services[0].name} Development <span style={{ marginLeft: '5px' }}>→</span>
                    </a>
                  </div>
                )}
              </div>
              
              {/* Shopify (right side) */}
              <div 
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
                  cursor: 'pointer',
                  backgroundColor: activeSection === services[1].key ? 
                    `rgba(${parseInt(services[1].color.slice(1, 3), 16)}, ${parseInt(services[1].color.slice(3, 5), 16)}, ${parseInt(services[1].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  borderRadius: '0 8px 8px 0',
                  transition: 'background-color 0.3s ease, opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
                onClick={() => handleCardClick(services[1].key)}
              >
                {/* Top section (text for Shopify) */}
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.5',
                    margin: '0 auto 15px',
                    opacity: '0.9',
                    textAlign: 'center',
                    maxWidth: '90%',
                  }}>
                    {services[1].description}
                  </p>
                  
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0',
                    textAlign: 'center',
                  }}>
                    {services[1].name}
                  </h3>
                </div>
                
                {/* Bottom section (image for Shopify) - CLOSER TO CENTER LINE */}
                <div style={{
                  position: 'absolute',
                  top: '190px',
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '140px',
                }}>
                  <img
                    src={services[1].imagePath}
                    alt={services[1].name}
                    style={{
                      width: '120px', // INCREASED SIZE
                      height: '120px', // INCREASED SIZE
                      objectFit: 'contain',
                      transform: 'translateY(-15px)', // MOVE CLOSER TO LINE
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    }}
                  />
                </div>

                {/* Button for Shopify (visible when active) */}
                {activeSection === services[1].key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.5s forwards',
                  }}>
                    <a 
                      href="#" 
                      style={getButtonStyle(services[1].color, true)}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[1].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[1].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                    >
                      {services[1].name} Development <span style={{ marginLeft: '5px' }}>→</span>
                    </a>
                  </div>
                )}
              </div>
              
              {/* Horizontal line for row 1 */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '180px',
                width: '100%',
                height: '6px', // INCREASED THICKNESS
                display: 'flex',
                zIndex: 2,
              }}>
                <div style={{
                  width: '50%',
                  height: '6px',
                  backgroundColor: services[0].color,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '3px 0 0 3px',
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
                  height: '6px',
                  backgroundColor: services[1].color,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '0 3px 3px 0',
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
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
                  cursor: 'pointer',
                  backgroundColor: activeSection === services[2].key ? 
                    `rgba(${parseInt(services[2].color.slice(1, 3), 16)}, ${parseInt(services[2].color.slice(3, 5), 16)}, ${parseInt(services[2].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  borderRadius: '8px 0 0 8px',
                  transition: 'background-color 0.3s ease, opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
                onClick={() => handleCardClick(services[2].key)}
              >
                {/* Top section (image for Point of Sale) - CLOSER TO CENTER LINE */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '140px',
                }}>
                  <img
                    src={services[2].imagePath}
                    alt={services[2].name}
                    style={{
                      width: '120px', // INCREASED SIZE
                      height: '120px', // INCREASED SIZE
                      objectFit: 'contain',
                      transform: 'translateY(15px)', // MOVE CLOSER TO LINE
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    }}
                  />
                </div>
                
                {/* Bottom section (text for Point of Sale) */}
                <div style={{
                  position: 'absolute',
                  top: '200px',
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
                  }}>
                    {services[2].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.5',
                    margin: '0 auto',
                    opacity: '0.9',
                    textAlign: 'center',
                    maxWidth: '90%',
                  }}>
                    {services[2].description}
                  </p>
                </div>

                {/* Button for Point of Sale (visible when active) */}
                {activeSection === services[2].key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.5s forwards',
                  }}>
                    <a 
                      href="#" 
                      style={getButtonStyle(services[2].color, true)}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[2].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[2].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                    >
                      {services[2].name} Development <span style={{ marginLeft: '5px' }}>→</span>
                    </a>
                  </div>
                )}
              </div>
              
              {/* Custom (right side) */}
              <div 
                style={{
                  width: '50%',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
                  cursor: 'pointer',
                  backgroundColor: activeSection === services[3].key ? 
                    `rgba(${parseInt(services[3].color.slice(1, 3), 16)}, ${parseInt(services[3].color.slice(3, 5), 16)}, ${parseInt(services[3].color.slice(5, 7), 16)}, 0.1)` : 
                    'transparent',
                  borderRadius: '0 8px 8px 0',
                  transition: 'background-color 0.3s ease, opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
                onClick={() => handleCardClick(services[3].key)}
              >
                {/* Top section (text for Custom) */}
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.5',
                    margin: '0 auto 15px',
                    opacity: '0.9',
                    textAlign: 'center',
                    maxWidth: '90%',
                  }}>
                    {services[3].description}
                  </p>
                  
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0',
                    textAlign: 'center',
                  }}>
                    {services[3].name}
                  </h3>
                </div>
                
                {/* Bottom section (image for Custom) - CLOSER TO CENTER LINE */}
                <div style={{
                  position: 'absolute',
                  top: '190px',
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '140px',
                }}>
                  <img
                    src={services[3].imagePath}
                    alt={services[3].name}
                    style={{
                      width: '120px', // INCREASED SIZE
                      height: '120px', // INCREASED SIZE
                      objectFit: 'contain',
                      transform: 'translateY(-15px)', // MOVE CLOSER TO LINE
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    }}
                  />
                </div>

                {/* Button for Custom (visible when active) */}
                {activeSection === services[3].key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.5s forwards',
                  }}>
                    <a 
                      href="#" 
                      style={getButtonStyle(services[3].color, true)}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[3].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${services[3].color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                    >
                      {services[3].name} Development <span style={{ marginLeft: '5px' }}>→</span>
                    </a>
                  </div>
                )}
              </div>
              
              {/* Horizontal line for row 2 */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '180px',
                width: '100%',
                height: '6px', // INCREASED THICKNESS
                display: 'flex',
                zIndex: 2,
              }}>
                <div style={{
                  width: '50%',
                  height: '6px',
                  backgroundColor: services[2].color,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '3px 0 0 3px',
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
                  height: '6px',
                  backgroundColor: services[3].color,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '0 3px 3px 0',
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
          // IMPROVED DESKTOP LAYOUT
          <div style={{ 
            width: '100%',
            position: 'relative',
            minHeight: '500px', // INCREASED HEIGHT
            display: 'flex',
          }}>
            {/* Services with different layouts for odd/even sections */}
            {services.map((service, index) => (
              <div 
                key={`service-${service.key}`} 
                style={{
                  width: '25%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0 15px',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.8s ease-out ${0.1 * (index + 1)}s, transform 0.8s ease-out ${0.1 * (index + 1)}s, background-color 0.3s ease`,
                  height: '500px', // INCREASED HEIGHT
                  backgroundColor: hoveredSection === service.key ? 
                    `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.1)` : 'transparent',
                  borderRadius: '8px',
                }}
                onMouseEnter={() => setHoveredSection(service.key)}
                onMouseLeave={() => setHoveredSection(null)}
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
                      paddingBottom: '20px', // INCREASED PADDING
                    }}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={{ 
                          width: '160px', // INCREASED SIZE
                          height: '160px', // INCREASED SIZE
                          objectFit: 'contain',
                          transform: 'translateY(10px)', // MOVE CLOSER TO LINE
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Text content closer to line for odd */}
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      paddingTop: '20px', // INCREASED PADDING
                      textAlign: 'center',
                    }}>
                      <h3 style={{ 
                        fontSize: '26px', 
                        margin: '0 0 15px', 
                        fontWeight: '600',
                      }}>
                        {service.name}
                      </h3>
                      <p style={{ 
                        fontSize: '15px', 
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
                      paddingBottom: '20px', // INCREASED PADDING
                      textAlign: 'center',
                    }}>
                      <p style={{ 
                        fontSize: '15px', 
                        margin: '0 auto 15px', 
                        opacity: '0.9',
                        lineHeight: '1.5',
                        maxWidth: '90%',
                      }}>
                        {service.description}
                      </p>
                      <h3 style={{ 
                        fontSize: '26px', 
                        margin: '0', 
                        fontWeight: '600',
                      }}>
                        {service.name}
                      </h3>
                    </div>

                    {/* Image closer to line for even */}
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingTop: '20px', // INCREASED PADDING
                    }}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={{ 
                          width: '160px', // INCREASED SIZE
                          height: '160px', // INCREASED SIZE
                          objectFit: 'contain',
                          transform: 'translateY(-10px)', // MOVE CLOSER TO LINE
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>
                  </>
                )}
                
                {/* Button with gradient effect */}
                {hoveredSection === service.key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px', // MOVED LOWER
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    animation: 'fadeInUp 0.5s forwards',
                  }}>
                    <a 
                      href="#" 
                      style={getButtonStyle(service.color, false)}
                      onMouseEnter={(e) => {
                        if (!isMobile && !isTablet) {
                          e.currentTarget.style.background = `linear-gradient(90deg, ${service.color}, rgba(255,255,255,0.2))`;
                          e.currentTarget.style.color = '#04091D';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile && !isTablet && hoveredSection === service.key) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                    >
                      {service.name} Development <span style={{ marginLeft: '5px' }}>→</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Connected Horizontal Line that spans across all sections */}
            <div style={{ 
              position: 'absolute',
              left: 0,
              top: '50%',
              width: '100%',
              height: '6px', // INCREASED THICKNESS
              display: 'flex',
              zIndex: 1,
              transform: 'translateY(-50%)',
            }}>
              {services.map((service, index) => (
                <div 
                  key={`line-${service.key}`} 
                  style={{
                    width: '25%',
                    height: '6px', // INCREASED THICKNESS
                    backgroundColor: service.color,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: index === 0 ? '3px 0 0 3px' : index === services.length - 1 ? '0 3px 3px 0' : '0',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    animation: `shimmer ${2 + index * 0.5}s infinite`,
                    animationDelay: `${index * 0.2}s`,
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
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes verticalShimmer {
            0% { top: -100%; }
            100% { top: 200%; }
          }
          /* Add touch support style */
          @media (hover: none) {
            .touch-action {
              display: block !important;
            }
          }
        ` 
      }} />
    </div>
  );
};

export default WebDevelopmentComponent;
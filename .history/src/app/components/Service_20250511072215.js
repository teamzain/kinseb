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

  // Button styles
  const getButtonStyle = (color) => ({
    display: 'inline-block',
    padding: isMobile ? '8px 16px' : '10px 20px',
    borderRadius: '4px',
    border: `2px solid ${color}`,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Poppins, sans-serif',
    fontSize: isMobile ? '14px' : '15px',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  });

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
        {/* Mobile Layout */}
        {isMobile ? (
          <>
            {services.map((service, index) => (
              <div key={service.key} style={{
                width: '100%',
                padding: '20px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxSizing: 'border-box',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.8s ease-out ${0.1 * (index + 1)}s, transform 0.8s ease-out ${0.1 * (index + 1)}s`,
                marginBottom: '20px',
              }}>
                {/* Vertical indicator */}
                <div style={{
                  width: '3px',
                  height: '100%',
                  position: 'absolute',
                  left: '4px',
                  top: '0',
                  backgroundColor: service.color,
                  overflow: 'hidden',
                  zIndex: 1,
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
                    style={{ width: '80px', height: '80px', marginRight: '20px' }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '24px', margin: '0 0 10px' }}>{service.name}</h3>
                    <p style={{ fontSize: '14px', margin: '0', opacity: '0.8' }}>{service.description}</p>
                  </div>
                </div>
                
                {/* Always visible button for mobile */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '30px' }}>
                  <a href="#" style={getButtonStyle(service.color)}>
                    {service.name} Development <span style={{ marginLeft: '5px' }}>→</span>
                  </a>
                </div>
              </div>
            ))}
          </>
        ) : isTablet ? (
          // FIXED TABLET LAYOUT with no overlapping
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Row 1: First two services with strict height constraints */}
            <div style={{
              display: 'flex',
              width: '100%',
              marginBottom: '80px',
              position: 'relative',
              minHeight: '400px',
            }}>
              {/* WordPress (left side) */}
              <div style={{
                width: '50%',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s',
              }}>
                {/* Top section (image for WordPress) */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '120px',
                }}>
                  <img
                    src={services[0].imagePath}
                    alt={services[0].name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                
                {/* Bottom section (text for WordPress) */}
                <div style={{
                  position: 'absolute',
                  top: '220px', // Positioned well below the center line
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: '0 0 15px',
                    textAlign: 'center',
                  }}>
                    {services[0].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    margin: '0',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[0].description}
                  </p>
                </div>
              </div>
              
              {/* Shopify (right side) */}
              <div style={{
                width: '50%',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
              }}>
                {/* Top section (text for Shopify) */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    margin: '0 0 15px',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[1].description}
                  </p>
                  
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: '0',
                    textAlign: 'center',
                  }}>
                    {services[1].name}
                  </h3>
                </div>
                
                {/* Bottom section (image for Shopify) */}
                <div style={{
                  position: 'absolute',
                  top: '220px', // Positioned well below the center line
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '120px',
                }}>
                  <img
                    src={services[1].imagePath}
                    alt={services[1].name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
              
              {/* Horizontal line for row 1 - EXACTLY centered */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '180px', // Specific position to avoid overlapping
                width: '100%',
                height: '4px',
                display: 'flex',
                zIndex: 2, // Higher z-index to ensure it's visible
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
            
            {/* Row 2: Second two services with strict height constraints */}
            <div style={{
              display: 'flex',
              width: '100%',
              position: 'relative',
              minHeight: '400px',
            }}>
              {/* Point of Sale (left side) */}
              <div style={{
                width: '50%',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
              }}>
                {/* Top section (image for Point of Sale) */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '120px',
                }}>
                  <img
                    src={services[2].imagePath}
                    alt={services[2].name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                
                {/* Bottom section (text for Point of Sale) */}
                <div style={{
                  position: 'absolute',
                  top: '220px', // Positioned well below the center line
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: '0 0 15px',
                    textAlign: 'center',
                  }}>
                    {services[2].name}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    margin: '0',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[2].description}
                  </p>
                </div>
              </div>
              
              {/* Custom (right side) */}
              <div style={{
                width: '50%',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
              }}>
                {/* Top section (text for Custom) */}
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    margin: '0 0 15px',
                    opacity: '0.9',
                    textAlign: 'center',
                  }}>
                    {services[3].description}
                  </p>
                  
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: '0',
                    textAlign: 'center',
                  }}>
                    {services[3].name}
                  </h3>
                </div>
                
                {/* Bottom section (image for Custom) */}
                <div style={{
                  position: 'absolute',
                  top: '220px', // Positioned well below the center line
                  left: '0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '120px',
                }}>
                  <img
                    src={services[3].imagePath}
                    alt={services[3].name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
              
              {/* Horizontal line for row 2 - EXACTLY centered */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '180px', // Specific position to avoid overlapping
                width: '100%',
                height: '4px',
                display: 'flex',
                zIndex: 2, // Higher z-index to ensure it's visible
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
          // Desktop layout (unchanged)
          <div style={{ 
            width: '100%',
            position: 'relative',
            minHeight: '400px',
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
                  height: '450px', // Increased height to accommodate button
                  backgroundColor: hoveredSection === service.key ? `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.1)` : 'transparent',
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
                      paddingBottom: '15px',
                    }}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={{ 
                          width: '140px', 
                          height: '140px', 
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    {/* Text content closer to line for odd */}
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      paddingTop: '15px',
                      textAlign: 'center',
                    }}>
                      <h3 style={{ 
                        fontSize: '26px', 
                        margin: '0 0 10px', 
                        fontWeight: '600',
                      }}>
                        {service.name}
                      </h3>
                      <p style={{ 
                        fontSize: '15px', 
                        margin: '0', 
                        opacity: '0.9',
                        lineHeight: '1.4',
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
                      paddingBottom: '15px',
                      textAlign: 'center',
                    }}>
                      <p style={{ 
                        fontSize: '15px', 
                        margin: '0 0 10px', 
                        opacity: '0.9',
                        lineHeight: '1.4',
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
                      paddingTop: '15px',
                    }}>
                      <img 
                        src={service.imagePath} 
                        alt={service.name} 
                        style={{ 
                          width: '140px', 
                          height: '140px', 
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  </>
                )}
                
                {/* Button visible on hover */}
                {hoveredSection === service.key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: 1,
                    animation: 'fadeIn 0.3s ease-in',
                  }}>
                    <a 
                      href="#" 
                      style={{
                        ...getButtonStyle(service.color),
                        backgroundColor: hoveredSection === service.key ? service.color : 'transparent',
                        color: hoveredSection === service.key ? '#04091D' : 'white',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = service.color;
                        e.currentTarget.style.color = '#04091D';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = service.color;
                        e.currentTarget.style.color = '#04091D';
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
              height: '4px',
              display: 'flex',
              zIndex: 1,
              transform: 'translateY(-50%)',
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
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
      isLeft: true
    },
    {
      key: 'shopify',
      name: 'Shopify',
      description: 'Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.',
      imagePath: '/images/shopify.png',
      color: '#95BF47',
      isLeft: false
    },
    {
      key: 'pos',
      name: 'Point Of Sale',
      description: 'Powerful Magento solutions designed for high-performance online stores.',
      imagePath: '/images/Magento.png',
      color: '#F26322',
      isLeft: true
    },
    {
      key: 'custom',
      name: 'Custom',
      description: 'Fully custom-built websites crafted from scratch to meet unique business needs.',
      imagePath: '/images/custom.png',
      color: '#A66DD4',
      isLeft: false
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

  // Button component
  const Button = ({ service }) => (
    <a 
      href="#" 
      style={{
        display: 'inline-block',
        padding: isMobile ? '8px 16px' : '10px 20px',
        borderRadius: '4px',
        border: `2px solid ${service.color}`,
        color: 'white',
        backgroundColor: hoveredSection === service.key ? service.color : 'transparent',
        fontFamily: 'Poppins, sans-serif',
        fontSize: isMobile ? '14px' : '15px',
        fontWeight: '600',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.backgroundColor = service.color;
          e.currentTarget.style.color = '#04091D';
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile && hoveredSection !== service.key) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'white';
        }
      }}
    >
      {service.name} Development <span style={{ marginLeft: '5px' }}>→</span>
    </a>
  );

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#04091D',
      color: 'white',
      fontFamily: '"Poppins", sans-serif',
      padding: isMobile ? '40px 0' : '60px 0',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 60px',
        padding: '0 20px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '42px',
          fontWeight: '600',
          margin: '0 0 20px',
          lineHeight: '1.2',
        }}>
          Web Development
        </h1>
        <h2 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '500',
          margin: '0 0 20px',
          lineHeight: '1.2',
        }}>
          Tailored For <span style={{ color: '#3B7BCE' }}>Clients</span> Needs
        </h2>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.5',
        }}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* Mobile Layout */}
      {isMobile ? (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 15px',
        }}>
          {services.map((service) => (
            <div 
              key={service.key}
              style={{
                width: '100%',
                padding: '25px 15px',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                marginBottom: '20px',
                backgroundColor: hoveredSection === service.key ? `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.1)` : 'transparent',
              }}
              onTouchStart={() => setHoveredSection(service.key)}
              onTouchEnd={() => setHoveredSection(null)}
            >
              {/* Vertical indicator */}
              <div style={{
                width: '3px',
                height: '100%',
                position: 'absolute',
                left: '4px',
                top: '0',
                backgroundColor: service.color,
                overflow: 'hidden',
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

              {/* Better aligned mobile content */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '20px',
                paddingLeft: '20px',
                textAlign: 'left',
              }}>
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
                  <h3 style={{ 
                    fontSize: '24px', 
                    margin: '0 0 10px',
                    fontWeight: '600', 
                  }}>
                    {service.name}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    margin: '0 0 15px',
                    lineHeight: '1.5',
                    opacity: '0.9',
                  }}>
                    {service.description}
                  </p>
                  <Button service={service} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isTablet ? (
        // Tablet layout exactly like the image reference
        <div style={{ 
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
        }}>
          {/* Top Row: WordPress & Shopify */}
          <div style={{
            display: 'flex',
            width: '100%',
            marginBottom: '80px',
          }}>
            {/* Horizontal line for top row */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '160px', // Positioned between icons and text
              width: '100%',
              height: '4px',
              display: 'flex',
              zIndex: 1,
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

            {/* WordPress */}
            <div 
              style={{
                width: '50%',
                padding: '0 20px',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s',
                backgroundColor: hoveredSection === 'wordpress' ? 'rgba(59, 124, 206, 0.1)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSection('wordpress')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* WordPress Icon */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '40px',
              }}>
                <img 
                  src={services[0].imagePath} 
                  alt={services[0].name} 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    objectFit: 'contain',
                  }}
                />
              </div>
              
              {/* WordPress Text and Button */}
              <div style={{
                marginTop: '40px',
                padding: '0 20px',
              }}>
                <h3 style={{ 
                  fontSize: '28px', 
                  margin: '0 0 15px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  {services[0].name}
                </h3>
                <p style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.5',
                  margin: '0 0 20px',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  {services[0].description}
                </p>
                {hoveredSection === 'wordpress' && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button service={services[0]} />
                  </div>
                )}
              </div>
            </div>

            {/* Shopify */}
            <div 
              style={{
                width: '50%',
                padding: '0 20px',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
                backgroundColor: hoveredSection === 'shopify' ? 'rgba(149, 191, 71, 0.1)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSection('shopify')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Shopify Text */}
              <div style={{
                marginBottom: '40px',
                padding: '0 20px',
              }}>
                <p style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.5',
                  margin: '0 0 15px',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  {services[1].description}
                </p>
                <h3 style={{ 
                  fontSize: '28px', 
                  margin: '0',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  {services[1].name}
                </h3>
              </div>
              
              {/* Shopify Icon */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
              }}>
                <img 
                  src={services[1].imagePath} 
                  alt={services[1].name} 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    objectFit: 'contain',
                  }}
                />
              </div>
              
              {/* Shopify Button */}
              {hoveredSection === 'shopify' && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button service={services[1]} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Point of Sale & Custom */}
          <div style={{
            display: 'flex',
            width: '100%',
          }}>
            {/* Horizontal line for bottom row */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '480px', // Positioned for the second row
              width: '100%',
              height: '4px',
              display: 'flex',
              zIndex: 1,
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

            {/* Point of Sale */}
            <div 
              style={{
                width: '50%',
                padding: '0 20px',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
                backgroundColor: hoveredSection === 'pos' ? 'rgba(242, 99, 34, 0.1)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSection('pos')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* POS Icon */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '40px',
              }}>
                <img 
                  src={services[2].imagePath} 
                  alt={services[2].name} 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    objectFit: 'contain',
                  }}
                />
              </div>
              
              {/* POS Text and Button */}
              <div style={{
                marginTop: '40px',
                padding: '0 20px',
              }}>
                <h3 style={{ 
                  fontSize: '28px', 
                  margin: '0 0 15px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  {services[2].name}
                </h3>
                <p style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.5',
                  margin: '0 0 20px',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  {services[2].description}
                </p>
                {hoveredSection === 'pos' && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button service={services[2]} />
                  </div>
                )}
              </div>
            </div>

            {/* Custom */}
            <div 
              style={{
                width: '50%',
                padding: '0 20px',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
                backgroundColor: hoveredSection === 'custom' ? 'rgba(166, 109, 212, 0.1)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSection('custom')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Custom Text */}
              <div style={{
                marginBottom: '40px',
                padding: '0 20px',
              }}>
                <p style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.5',
                  margin: '0 0 15px',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  {services[3].description}
                </p>
                <h3 style={{ 
                  fontSize: '28px', 
                  margin: '0',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  {services[3].name}
                </h3>
              </div>
              
              {/* Custom Icon */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
              }}>
                <img 
                  src={services[3].imagePath} 
                  alt={services[3].name} 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    objectFit: 'contain',
                  }}
                />
              </div>
              
              {/* Custom Button */}
              {hoveredSection === 'custom' && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button service={services[3]} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Desktop layout with improved button positioning
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
        }}>
          {/* Connected Horizontal Line */}
          <div style={{ 
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '100%',
            height: '4px',
            display: 'flex',
            zIndex: 1,
          }}>
            {services.map((service) => (
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

          {/* Service Sections */}
          <div style={{
            display: 'flex',
            width: '100%',
          }}>
            {services.map((service) => (
              <div 
                key={service.key}
                style={{
                  width: '25%',
                  minHeight: '500px', // Increased height for button positioning
                  padding: '0 20px',
                  position: 'relative',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out, background-color 0.3s ease',
                  backgroundColor: hoveredSection === service.key ? `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.1)` : 'transparent',
                }}
                onMouseEnter={() => setHoveredSection(service.key)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {service.isLeft ? (
                  // Left side services (WordPress, Point of Sale)
                  <>
                    {/* Icon above line */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '180px',
                      marginBottom: '30px',
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
                    
                    {/* Text below line */}
                    <div style={{
                      marginTop: '30px',
                      textAlign: 'center',
                    }}>
                      <h3 style={{ 
                        fontSize: '28px', 
                        margin: '0 0 15px',
                        fontWeight: '600',
                      }}>
                        {service.name}
                      </h3>
                      <p style={{ 
                        fontSize: '15px', 
                        lineHeight: '1.5',
                        margin: '0',
                        opacity: '0.9',
                      }}>
                        {service.description}
                      </p>
                    </div>
                  </>
                ) : (
                  // Right side services (Shopify, Custom)
                  <>
                    {/* Text above line */}
                    <div style={{
                      marginBottom: '30px',
                      textAlign: 'center',
                      height: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                      <p style={{ 
                        fontSize: '15px', 
                        lineHeight: '1.5',
                        margin: '0 0 15px',
                        opacity: '0.9',
                      }}>
                        {service.description}
                      </p>
                      <h3 style={{ 
                        fontSize: '28px', 
                        margin: '0',
                        fontWeight: '600',
                      }}>
                        {service.name}
                      </h3>
                    </div>
                    
                    {/* Icon below line */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '30px',
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
                
                {/* Button positioned lower */}
                {hoveredSection === service.key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: 1,
                    animation: 'fadeIn 0.3s ease-in',
                  }}>
                    <Button service={service} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Animation keyframes */}
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
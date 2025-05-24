'use client';

import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'tablet', or 'mobile'
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

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#0b0f21',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: isTablet ? '60px 0' : '80px 0',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header Section */}
      <div style={{
        maxWidth: isTablet ? '900px' : '1200px',
        margin: '0 auto',
        padding: '0 10px', // Reduced horizontal padding
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : isTablet ? '38px' : '42px',
          fontWeight: '600',
          margin: '20px 0 10px',
          lineHeight: '1.2',
        }}>
          Web Development
        </h1>
        <h2 style={{
          fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
          fontWeight: '500',
          margin: '0 0 30px',
          lineHeight: '1.2',
        }}>
          Tailored For <span style={{ 
            color: '#0aacdc',
            position: 'relative',
            display: 'inline-block',
            animation: 'highlight 3s ease-in-out infinite'
          }}>Clients</span> Needs
        </h2>
        <p style={{
          fontSize: isTablet ? '16px' : '18px',
          maxWidth: isTablet ? '700px' : '800px',
          margin: '0 auto 60px',
          lineHeight: '1.5',
        }}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* Services Section - Responsive Layout */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%', // Full width container
        margin: '0 auto 20px',
        gap: isMobile ? '0' : '0', // Removed gap for equal division
        position: 'relative',
      }}>
        {/* Tablet Mode Connecting Lines - UPDATED */}
        {isTablet && (
          <>
            {/* TOP ROW CONNECTING LINE between WordPress and Shopify */}
            <div style={{
              position: 'absolute',
              top: '130px',
              left: '25%',
              width: '50%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'shimmer 3s infinite',
              }}></div>
            </div>
            
            {/* VERTICAL CONNECTING LINE - Center of the page connecting the two rows */}
            <div style={{
              position: 'absolute',
              top: '250px', // Positioned at the center of the component
              left: '50%',
              width: '3px',
              height: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'verticalShimmer 3s infinite',
              }}></div>
            </div>
            
            {/* BOTTOM ROW CONNECTING LINE between POS and Custom */}
            <div style={{
              position: 'absolute',
              top: '550px', // Positioned at the bottom of the component
              left: '25%',
              width: '50%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'shimmer 3s infinite',
              }}></div>
            </div>
            
            {/* Connection dots at each intersection */}
            <div style={{
              position: 'absolute',
              top: '129px',
              left: '50%',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              zIndex: 2,
              transform: 'translateX(-50%)',
            }}></div>
            <div style={{
              position: 'absolute',
              top: '549px',
              left: '50%',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              zIndex: 2,
              transform: 'translateX(-50%)',
            }}></div>
          </>
        )}

        {/* WordPress */}
        <div 
          style={{
            flex: '1',
            minWidth: isMobile ? '100%' : isTablet ? '50%' : '25%', // Tablet shows 2 services per row
            maxWidth: isMobile ? '100%' : isTablet ? '50%' : '25%', // Tablet shows 2 services per row
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: 'center',
            textAlign: isMobile ? 'left' : 'center',
            padding: isMobile ? '20px 15px 90px' : isTablet ? '20px 10px 120px' : '20px 0 150px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && hoveredSection === 'wordpress'|| 
            (isMobile && activeSection === 'wordpress') || 
            (isTablet && activeSection === 'wordpress') ? 
              'rgba(30, 144, 255, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('wordpress')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('wordpress')} 
        >
          {/* Connection indicators for tablet view */}
          {isTablet && (
            <div style={{
              position: 'absolute',
              top: '130px',
              right: '0',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#1e90ff',
              zIndex: 2,
            }}></div>
          )}
          
          {(isMobile || isTablet) && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0',
              backgroundColor: '#1e90ff',
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
          )}
          
          <div style={{
            width: isMobile ? '110%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            marginLeft: isMobile ? '-10px' : '0',
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '110px' : '140px',
              height: isMobile ? '80px' : isTablet ? '110px' : '140px',
              marginBottom: isMobile ? '0' : '20px',
              marginRight: isMobile ? '20px' : '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img 
                src="/images/Wordpress.png" 
                alt="WordPress" 
                style={{
                  width: isMobile ? '80px' : isTablet ? '110px' : '140px',
                  height: isMobile ? '80px' : isTablet ? '110px' : '140px',
                  marginTop: isMobile ? '-40px' : isTablet ? '0' : '39px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            
            <div style={{
              textAlign: isMobile ? 'left' : 'center',
            }}>
              {!isMobile && (
                <div style={{
                  width: '100%', // Full width bar
                  height: '5px',
                  backgroundColor: '#1e90ff',
                  margin: '0 0 15px',
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
              )}
              
              <h3 style={{
                fontSize: isMobile ? '25px' : isTablet ? '20px' : '22px',
                marginTop: isMobile ? '20px' : '0',
                marginLeft: isMobile ? '-10px' : '0',
                fontWeight: '600',
                margin: '0 0 10px',
                color: 'white',
              }}>
                WordPress
              </h3>
              <p style={{
                fontSize: isMobile ? '14px' : isTablet ? '13px' : '14px',
                lineHeight: '1.5',
                margin: '0 auto',
                padding: '0',
                marginTop: isMobile ? '15px' : '0',
                marginLeft: isMobile ? '-7px' : '0',
                maxWidth: isMobile ? '120%' : isTablet ? '95%' : '90%',
                color: 'white',
                opacity: '0.9',
                whiteSpace: isMobile ? 'normal' : 'normal',
              }}>
                Flexible and easy-to-manage WordPress websites tailored to your goals.
              </p>
            </div>
          </div>
          
          {/* WordPress Button (visible on hover for desktop, always visible on mobile/tablet) */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'wordpress')) && (
            <div style={{ 
              position: 'absolute',
              bottom: isMobile ? '30px' : isTablet ? '40px' : '40px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="WordPress" color="#1e90ff" section="wordpress" />
            </div>
          )}
        </div>

        {/* Shopify */}
        <div 
          style={{
            flex: '1',
            minWidth: isMobile ? '100%' : isTablet ? '50%' : '25%', // Tablet shows 2 services per row
            maxWidth: isMobile ? '100%' : isTablet ? '50%' : '25%', // Tablet shows 2 services per row
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: 'center',
            textAlign: isMobile ? 'left' : 'center',
            marginTop: isMobile ? '0px' : isTablet ? '0' : '1.25px',
            marginLeft: isMobile ? '0' : '0', // Removed negative margin
            padding: isMobile ? '25px 15px 90px ' : isTablet ? '20px 10px 120px' : '20px 0 60px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && !isTablet && hoveredSection === 'shopify' || 
            (isMobile && activeSection === 'shopify') ||
            (isTablet && activeSection === 'shopify') ? 
              'rgba(149, 214, 0, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('shopify')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('shopify')} 
        >
          {/* Connection indicator for tablet view */}
          {isTablet && (
            <div style={{
              position: 'absolute',
              top: '130px',
              left: '0',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#95d600',
              zIndex: 2,
            }}></div>
          )}
          
          {(isMobile || isTablet) && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0px',
              backgroundColor: '#95d600',
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
          )}
          
          <div style={{
            width: isMobile ? '75%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            marginLeft: isMobile ? '45px' : '0',
            marginTop: isMobile ? 'o' : isTablet ? '40px' : '40px',
          }}>
            {!isMobile ? (
              <>
                {/* Moved paragraph above title */}
                <p style={{
                  fontSize: isTablet ? '13px' : '14px',
                  lineHeight: '1.5',
                  margin: '0 auto 8px',
                  marginTop: '21px',
                  padding: '0 20px',
                  color: 'white',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
                </p>
                <h3 style={{
                  fontSize: isTablet ? '20px' : '22px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                  color: 'white',
                }}>
                  Shopify
                </h3>
                <div style={{
                  width: '100%', // Full width bar
                  height: '5px',
                  backgroundColor: '#95d600',
                  margin: '0 0 1px',
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
                  width: isTablet ? '110px' : '140px',
                  height: isTablet ? '110px' : '140px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '0px',
                  cursor: 'pointer',
                }}>
                  <img 
                    src="/images/shopify.png" 
                    alt="Shopify" 
                    style={{
                      width: isTablet ? '110px' : '140px',
                      height: isTablet ? '110px' : '140px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{
                  width: '100px',
                  height: '130px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '14px',
                  marginLeft: '-57px',
                  marginTop: '-85px'
                }}>
                  <img 
                    src="/images/shopify.png" 
                    alt="Shopify" 
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{
                  textAlign: 'left',
                }}>
                  <h3 style={{
                    fontSize: '25px',
                    fontWeight: '600',
                    margin: '0 0 10px',
                    marginTop: '-30px',
                    color: 'white',
                  }}>
                    Point Of Sale
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginTop: '25px',
                    padding: '0',
                    color: 'white',
                    width: '135%',
                    marginLeft: '2px',
                    opacity: '0.9',
                  }}>
                    Powerful POS solutions designed for seamless retail operations.
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* POS Button */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'pos')) && (
            <div style={{ 
              position: 'absolute',
              bottom: isMobile ? '30px' : isTablet ? '40px' : '40px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="Point Of Sale" color="#F26322" section="pos" />
            </div>
          )}
        </div>
        
        {/* Custom Development */}
        <div 
          style={{
            flex: '1',
            minWidth: isMobile ? '100%' : isTablet ? '50%' : '25%', // Tablet shows 2 services per row
            maxWidth: isMobile ? '100%' : isTablet ? '50%' : '25%', // Tablet shows 2 services per row
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: 'center',
            textAlign: isMobile ? 'left' : 'center',
            marginTop: isMobile ? '0px' : isTablet ? '30px' : '20px',
            marginLeft: isMobile ? '0' : '0', // Removed negative margin
            padding: isMobile ? '30px 15px 90px' : isTablet ? '20px 10px 120px' : '20px 0 60px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && !isTablet && hoveredSection === 'custom' || 
            (isMobile && activeSection === 'custom') ||
            (isTablet && activeSection === 'custom') ? 
              'rgba(205, 0, 116, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('custom')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('custom')} 
        >
          {/* Connection indicator for tablet view */}
          {isTablet && (
            <div style={{
              position: 'absolute',
              top: '550px',
              left: '0',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#cd0074',
              zIndex: 2,
            }}></div>
          )}
          
          {(isMobile || isTablet) && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0px',
              backgroundColor: '#cd0074',
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
          )}

          <div style={{
            width: isMobile ? '75%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
            marginLeft: isMobile ? '45px' : '0',
            marginTop: isMobile ? '0' : '0',
          }}>
            {!isMobile ? (
              <>
                <div style={{
                  width: isTablet ? '110px' : '140px',
                  height: isTablet ? '110px' : '140px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                }}>
                  <img 
                    src="/images/Javascript.png" 
                    alt="Custom Development" 
                    style={{
                      width: isTablet ? '110px' : '140px',
                      height: isTablet ? '110px' : '140px',
                      marginTop: '0px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{
                  width: '100%', // Full width bar
                  height: '5px',
                  backgroundColor: '#cd0074',
                  margin: '0 0 1px',
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
                  fontSize: isTablet ? '20px' : '22px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                  marginTop: '14px',
                  color: 'white',
                }}>
                  Custom Development
                </h3>
                <p style={{
                  fontSize: isTablet ? '13px' : '14px',
                  lineHeight: '1.5',
                  margin: '0 auto 15px',
                  padding: '0 20px',
                  color: 'white',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  Bespoke web applications built from scratch for unique business requirements.
                </p>
              </>
            ) : (
              <>
                <div style={{
                  width: '100px',
                  height: '130px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '14px',
                  marginLeft: '-57px',
                  marginTop: '-60px'
                }}>
                  <img 
                    src="/images/Javascript.png" 
                    alt="Custom Development" 
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{
                  textAlign: 'left',
                }}>
                  <h3 style={{
                    fontSize: '25px',
                    fontWeight: '600',
                    margin: '0 0 10px',
                    marginTop: '-30px',
                    color: 'white',
                  }}>
                    Custom Development
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginTop: '25px',
                    padding: '0',
                    color: 'white',
                    width: '135%',
                    marginLeft: '2px',
                    opacity: '0.9',
                  }}>
                    Bespoke web applications built from scratch for unique business requirements.
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Custom Development Button */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'custom')) && (
            <div style={{ 
              position: 'absolute',
              bottom: isMobile ? '30px' : isTablet ? '40px' : '40px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="Custom" color="#cd0074" section="custom" />
            </div>
          )}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        @keyframes verticalShimmer {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        
        @keyframes highlight {
          0%, 100% {
            text-shadow: 0 0 8px rgba(10, 172, 220, 0.6);
          }
          50% {
            text-shadow: 0 0 15px rgba(10, 172, 220, 0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default WebDevelopmentComponent;
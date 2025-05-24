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
      backgroundColor: '#04091D', // Updated to match your design
      color: 'white',
      fontFamily: '"Poppins", sans-serif',
      padding: isTablet ? '60px 0' : isMobile ? '40px 0' : '80px 0',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header Section */}
      <div style={{
        maxWidth: isTablet ? '900px' : '1200px',
        margin: '0 auto',
        padding: '0 20px', 
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
            color: '#3B7BCE',
            position: 'relative',
            display: 'inline-block',
            animation: 'highlight 3s ease-in-out infinite'
          }}>Clients</span> Needs
        </h2>
        <p style={{
          fontSize: isTablet ? '16px' : isMobile ? '15px' : '18px',
          maxWidth: isTablet ? '700px' : '800px',
          margin: '0 auto 60px',
          lineHeight: '1.5',
        }}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* 2x2 Grid Container - Responsive Layout */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Horizontal lines for Desktop/Tablet view */}
        {!isMobile && (
          <>
            {/* Top row lines */}
            <div style={{
              position: 'absolute',
              width: '50%',
              height: '4px',
              left: '0',
              top: isMobile ? '35%' : isTablet ? '30%' : '25%',
              background: '#3B7BCE',
              zIndex: 1,
            }}></div>
            <div style={{
              position: 'absolute',
              width: '50%',
              height: '4px',
              right: '0',
              top: isMobile ? '35%' : isTablet ? '30%' : '25%',
              background: '#95BF47',
              zIndex: 1,
            }}></div>
            
            {/* Bottom row lines */}
            <div style={{
              position: 'absolute',
              width: '50%',
              height: '4px',
              left: '0',
              top: isMobile ? '85%' : isTablet ? '80%' : '75%',
              background: '#F26322',
              zIndex: 1,
            }}></div>
            <div style={{
              position: 'absolute',
              width: '50%',
              height: '4px',
              right: '0',
              top: isMobile ? '85%' : isTablet ? '80%' : '75%',
              background: '#A66DD4',
              zIndex: 1,
            }}></div>
          </>
        )}

        {/* WordPress Section (Top Left) */}
        <div 
          style={{
            width: isMobile ? '100%' : '50%',
            minHeight: isMobile ? '240px' : isTablet ? '360px' : '400px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'flex-start',
            padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && hoveredSection === 'wordpress'|| 
              (isMobile && activeSection === 'wordpress') || 
              (isTablet && activeSection === 'wordpress') ? 
              'rgba(59, 124, 206, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('wordpress')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('wordpress')} 
        >
          {/* Vertical indicator for mobile */}
          {isMobile && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0',
              backgroundColor: '#3B7BCE',
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
          
          {/* Content layout based on screen size */}
          {isMobile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                marginRight: '20px',
                backgroundColor: '#3B7BCE',
                borderRadius: '50%',
                flexShrink: 0,
              }}></div>
              <div style={{
                textAlign: 'left',
                paddingLeft: '10px',
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 10px',
                }}>WordPress</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0',
                  opacity: 0.9,
                  maxWidth: '100%',
                }}>Flexible and easy-to-manage WordPress websites tailored to your goals.</p>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
              {/* Circle image at top */}
              <div style={{
                width: isTablet ? '140px' : '180px',
                height: isTablet ? '140px' : '180px',
                backgroundColor: '#3B7BCE',
                borderRadius: '50%',
                margin: isTablet ? '15px 0' : '20px 0',
                zIndex: 2,
              }}></div>
              
              {/* Text at bottom */}
              <div style={{
                textAlign: 'right',
                width: '100%',
                maxWidth: '350px',
                marginRight: '0',
                marginLeft: 'auto',
                marginTop: 'auto',
                paddingTop: '40px',
                zIndex: 2,
              }}>
                <h3 style={{
                  fontSize: isTablet ? '24px' : '28px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                }}>WordPress</h3>
                <p style={{
                  fontSize: isTablet ? '15px' : '16px',
                  lineHeight: '1.5',
                  margin: '0',
                  opacity: 0.9,
                }}>Flexible and easy-to-manage WordPress websites tailored to your goals.</p>
              </div>
            </div>
          )}

          {/* WordPress Button (visible on hover for desktop, always visible on mobile/tablet) */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'wordpress')) && (
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'center',
              paddingLeft: isMobile ? '20px' : '0',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="WordPress" color="#3B7BCE" section="wordpress" />
            </div>
          )}
        </div>

        {/* Shopify Section (Top Right) */}
        <div 
          style={{
            width: isMobile ? '100%' : '50%',
            minHeight: isMobile ? '240px' : isTablet ? '360px' : '400px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'flex-start',
            padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && hoveredSection === 'shopify'|| 
              (isMobile && activeSection === 'shopify') || 
              (isTablet && activeSection === 'shopify') ? 
              'rgba(149, 191, 71, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('shopify')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('shopify')} 
        >
          {/* Vertical indicator for mobile */}
          {isMobile && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0',
              backgroundColor: '#95BF47',
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
          
          {/* Content layout based on screen size */}
          {isMobile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                marginRight: '20px',
                backgroundColor: '#95BF47',
                borderRadius: '50%',
                flexShrink: 0,
              }}></div>
              <div style={{
                textAlign: 'left',
                paddingLeft: '10px',
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 10px',
                }}>Shopify</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0',
                  opacity: 0.9,
                  maxWidth: '100%',
                }}>Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.</p>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
              {/* Text at top */}
              <div style={{
                textAlign: 'left',
                width: '100%',
                maxWidth: '350px',
                marginLeft: '0',
                marginRight: 'auto',
                zIndex: 2,
              }}>
                <h3 style={{
                  fontSize: isTablet ? '24px' : '28px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                }}>Shopify</h3>
                <p style={{
                  fontSize: isTablet ? '15px' : '16px',
                  lineHeight: '1.5',
                  margin: '0 0 15px',
                  opacity: 0.9,
                }}>Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.</p>
                
                {/* Green line under text */}
                <div style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#95BF47',
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
          )}

          {/* Custom Button */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'custom')) && (
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'center',
              paddingLeft: isMobile ? '20px' : '0',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="Custom" color="#A66DD4" section="custom" />
            </div>
          )}
        </div>
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
              text-shadow: 0 0 5px rgba(59, 124, 206, 0.5);
            }
            50% {
              text-shadow: 0 0 20px rgba(59, 124, 206, 1);
            }
            100% {
              text-shadow: 0 0 5px rgba(59, 124, 206, 0.5);
            }
          }
        `
      }} />
    </div>
  );
};

export default WebDevelopmentComponent; rgba(255,255,255,0.8), transparent)',
                    animation: 'shimmer 2s infinite',
                  }}></div>
                </div>
              </div>
              
              {/* Circle image at bottom */}
              <div style={{
                width: isTablet ? '140px' : '180px',
                height: isTablet ? '140px' : '180px',
                backgroundColor: '#95BF47',
                borderRadius: '50%',
                margin: 'auto 0 0 auto',
                marginTop: 'auto',
                zIndex: 2,
              }}></div>
            </div>
          )}

          {/* Shopify Button */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'shopify')) && (
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'center',
              paddingLeft: isMobile ? '20px' : '0',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="Shopify" color="#95BF47" section="shopify" />
            </div>
          )}
        </div>

        {/* Point of Sale Section (Bottom Left) */}
        <div 
          style={{
            width: isMobile ? '100%' : '50%',
            minHeight: isMobile ? '240px' : isTablet ? '360px' : '400px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'flex-start',
            padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && hoveredSection === 'pos'|| 
              (isMobile && activeSection === 'pos') || 
              (isTablet && activeSection === 'pos') ? 
              'rgba(242, 99, 34, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('pos')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('pos')} 
        >
          {/* Vertical indicator for mobile */}
          {isMobile && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0',
              backgroundColor: '#F26322',
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
          
          {/* Content layout based on screen size */}
          {isMobile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                marginRight: '20px',
                backgroundColor: '#F26322',
                borderRadius: '50%',
                flexShrink: 0,
              }}></div>
              <div style={{
                textAlign: 'left',
                paddingLeft: '10px',
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 10px',
                }}>Point Of Sale</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0',
                  opacity: 0.9,
                  maxWidth: '100%',
                }}>Powerful Magento solutions designed for high-performance online stores.</p>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
              {/* Text at top */}
              <div style={{
                textAlign: 'right',
                width: '100%',
                maxWidth: '350px',
                marginRight: '0',
                marginLeft: 'auto',
                zIndex: 2,
              }}>
                <h3 style={{
                  fontSize: isTablet ? '24px' : '28px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                }}>Point Of Sale</h3>
                <p style={{
                  fontSize: isTablet ? '15px' : '16px',
                  lineHeight: '1.5',
                  margin: '0',
                  opacity: 0.9,
                }}>Powerful Magento solutions designed for high-performance online stores.</p>
              </div>
              
              {/* Circle image at bottom */}
              <div style={{
                width: isTablet ? '140px' : '180px',
                height: isTablet ? '140px' : '180px',
                backgroundColor: '#F26322',
                borderRadius: '50%',
                margin: 'auto 0 0 0',
                marginTop: 'auto',
                zIndex: 2,
              }}></div>
            </div>
          )}

          {/* Point of Sale Button */}
          {(isMobile || isTablet || (!isMobile && !isTablet && hoveredSection === 'pos')) && (
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'center',
              paddingLeft: isMobile ? '20px' : '0',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              zIndex: 2 
            }}>
              <SectionButton title="Point Of Sale" color="#F26322" section="pos" />
            </div>
          )}
        </div>

        {/* Custom Section (Bottom Right) */}
        <div 
          style={{
            width: isMobile ? '100%' : '50%',
            minHeight: isMobile ? '240px' : isTablet ? '360px' : '400px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'flex-start',
            padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s, background-color 0.3s ease',
            position: 'relative',
            backgroundColor: !isMobile && hoveredSection === 'custom'|| 
              (isMobile && activeSection === 'custom') || 
              (isTablet && activeSection === 'custom') ? 
              'rgba(166, 109, 212, 0.15)' : 'transparent',
          }}
          onMouseEnter={() => !isMobile && !isTablet && setHoveredSection('custom')}
          onMouseLeave={() => !isMobile && !isTablet && setHoveredSection(null)}
          onClick={() => (isMobile || isTablet) && handleSectionClick('custom')} 
        >
          {/* Vertical indicator for mobile */}
          {isMobile && (
            <div style={{
              width: '3px',
              height: '100%',
              position: 'absolute',
              left: '4px',
              top: '0',
              backgroundColor: '#A66DD4',
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
          
          {/* Content layout based on screen size */}
          {isMobile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                marginRight: '20px',
                backgroundColor: '#A66DD4',
                borderRadius: '50%',
                flexShrink: 0,
              }}></div>
              <div style={{
                textAlign: 'left',
                paddingLeft: '10px',
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 10px',
                }}>Custom</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0',
                  opacity: 0.9,
                  maxWidth: '100%',
                }}>Fully custom-built websites crafted from scratch to meet unique business needs.</p>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
              {/* Circle image at top */}
              <div style={{
                width: isTablet ? '140px' : '180px',
                height: isTablet ? '140px' : '180px',
                backgroundColor: '#A66DD4',
                borderRadius: '50%',
                margin: isTablet ? '15px auto 0 0' : '20px auto 0 0',
                zIndex: 2,
              }}></div>
              
              {/* Text at bottom */}
              <div style={{
                textAlign: 'left',
                width: '100%',
                maxWidth: '350px',
                marginLeft: '0',
                marginRight: 'auto',
                marginTop: 'auto',
                paddingTop: '40px',
                zIndex: 2,
              }}>
                <h3 style={{
                  fontSize: isTablet ? '24px' : '28px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                }}>Custom</h3>
                <p style={{
                  fontSize: isTablet ? '15px' : '16px',
                  lineHeight: '1.5',
                  margin: '0 0 15px',
                  opacity: 0.9,
                }}>Fully custom-built websites crafted from scratch to meet unique business needs.</p>
                
                {/* Purple line under text */}
                <div style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#A66DD4',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent,
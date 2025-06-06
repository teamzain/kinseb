'use client';

import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#0b0f21',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 0',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Header Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '42px',
          fontWeight: '600',
          margin: '20px 0 10px',
          lineHeight: '1.2',
        }}>
          Web Development
        </h1>
        <h2 style={{
          fontSize: isMobile ? '28px' : '36px',
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
          fontSize: '18px',
          maxWidth: '800px',
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
        maxWidth: '1200px',
        margin: '0 auto 20px',
        gap: isMobile ? '30px' : '20px',
      }}>
        {/* WordPress */}
        <div style={{
          flex: '1',
          minWidth: isMobile ? '100%' : '300px',
          maxWidth: isMobile ? '100%' : '300px',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          textAlign: isMobile ? 'left' : 'center',
          padding: isMobile ? '0 15px' : '0',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}>
          {isMobile && (
            <div style={{
              width: '5px',
              height: '100px',
              position: 'relative',
              marginRight: '15px',
              backgroundColor: '#1e90ff',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'verticalShimmer 2s infinite',
              }}></div>
            </div>
          )}
          
          <div style={{
            width: isMobile ? '70%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
          }}>
            <div style={{
              width: isMobile ? '80px' : '100px',
              height: isMobile ? '8px' : '100px',
              marginBottom: isMobile ? '0' : '20px',
              marginRight: isMobile ? '15px' : '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img 
                src="/images/Wordpress.png" 
                alt="WordPress" 
                style={{
                  width: isMobile ? '80px' : '130px',
                  height: isMobile ? '80px' : '130px',
                  marginTop: isMobile ? '0' : '11px',
                  objectFit: 'contain',
                }}
              />
            </div>
            
            <div style={{
              textAlign: isMobile ? 'left' : 'center',
            }}>
              {!isMobile && (
                <div style={{
                  width: '100%',
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
                fontSize: isMobile ? '18px' : '22px',
                fontWeight: '600',
                margin: '0 0 10px',
                color: 'white',
              }}>
                WordPress
              </h3>
              <p style={{
                fontSize: isMobile ? '13px' : '14px',
                lineHeight: '1.5',
                margin: '0 auto',
                padding: '0',
                color: 'white',
                opacity: '0.9',
              }}>
                Flexible and easy-to-manage WordPress websites tailored to your goals.
              </p>
            </div>
          </div>
        </div>

        {/* Shopify */}
        <div style={{
          flex: '1',
          minWidth: isMobile ? '100%' : '300px',
          maxWidth: isMobile ? '100%' : '300px',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          textAlign: isMobile ? 'left' : 'center',
          marginTop: isMobile ? '0' : '1.25px',
          marginLeft: isMobile ? '0' : '-20px',
          padding: isMobile ? '0 15px' : '0',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
        }}>
          {isMobile && (
            <div style={{
              width: '5px',
              height: '80px',
              position: 'relative',
              marginRight: '15px',
              backgroundColor: '#95d600',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'verticalShimmer 2s infinite',
              }}></div>
            </div>
          )}
          
          <div style={{
            width: isMobile ? '70%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
          }}>
            {!isMobile ? (
              <>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                  color: 'white',
                }}>
                  Shopify
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0 auto 8px',
                  padding: '0 20px',
                  color: 'white',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
                </p>
                <div style={{
                  width: '100%',
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
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '8px',
                  cursor: 'pointer',
                }}>
                  <img 
                    src="/images/shopify.png" 
                    alt="Shopify" 
                    style={{
                      width: '130px',
                      height: '130px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '15px',
                }}>
                  <img 
                    src="/images/shopify.png" 
                    alt="Shopify" 
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{
                  textAlign: 'left',
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: '0 0 10px',
                    color: 'white',
                  }}>
                    Shopify
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.5',
                    margin: '0',
                    padding: '0',
                    color: 'white',
                    opacity: '0.9',
                  }}>
                    Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Magento */}
        <div style={{
          flex: '1',
          minWidth: isMobile ? '100%' : '300px',
          maxWidth: isMobile ? '100%' : '300px',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          textAlign: isMobile ? 'left' : 'center',
          marginTop: isMobile ? '0' : '20px',
          marginLeft: isMobile ? '0' : '-20px',
          padding: isMobile ? '0 15px' : '0',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
        }}>
          {isMobile && (
            <div style={{
              width: '5px',
              height: '80px',
              position: 'relative',
              marginRight: '15px',
              backgroundColor: '#F26322',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'verticalShimmer 2s infinite',
              }}></div>
            </div>
          )}
          
          <div style={{
            width: isMobile ? '70%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
          }}>
            {!isMobile ? (
              <>
                <div style={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                }}>
                  <img 
                    src="/images/Magento.png" 
                    alt="Magento" 
                    style={{
                      width: '130px',
                      height: '130px',
                      marginTop: '-30px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{
                  width: '100%',
                  height: '5px',
                  backgroundColor: '#F26322',
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
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                  color: 'white',
                }}>
                  Magento
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0 auto 15px',
                  padding: '0 20px',
                  color: 'white',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  Powerful Magento solutions designed for high-performance online stores.
                </p>
              </>
            ) : (
              <>
                <div style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '15px',
                }}>
                  <img 
                    src="/images/Magento.png" 
                    alt="Magento" 
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{
                  textAlign: 'left',
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: '0 0 10px',
                    color: 'white',
                  }}>
                    Magento
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.5',
                    margin: '0',
                    padding: '0',
                    color: 'white',
                    opacity: '0.9',
                  }}>
                    Powerful Magento solutions designed for high-performance online stores.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Custom */}
        <div style={{
          flex: '1',
          minWidth: isMobile ? '100%' : '300px',
          maxWidth: isMobile ? '100%' : '300px',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          textAlign: isMobile ? 'left' : 'center',
          marginTop: isMobile ? '0' : '1.25px',
          marginLeft: isMobile ? '0' : '-20px',
          padding: isMobile ? '0 15px' : '0',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
        }}>
          {isMobile && (
            <div style={{
              width: '5px',
              height: '80px',
              position: 'relative',
              marginRight: '15px',
              backgroundColor: '#61dafb',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'verticalShimmer 2s infinite',
              }}></div>
            </div>
          )}
          
          <div style={{
            width: isMobile ? '70%' : '100%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'center' : 'center',
          }}>
            {!isMobile ? (
              <>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 15px',
                  color: 'white',
                }}>
                  Custom
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0 auto 8px',
                  padding: '0 20px',
                  color: 'white',
                  opacity: '0.9',
                  textAlign: 'center',
                }}>
                  Fully custom-built websites crafted from scratch to meet unique business <br></br>needs.
                </p>
                <div style={{
                  width: '100%',
                  height: '5px',
                  backgroundColor: '#61dafb',
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
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                }}>
                  <img 
                    src="/images/image.png" 
                    alt="Custom Development" 
                    style={{
                      width: '130px',
                      height: '130px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '15px',
                }}>
                  <img 
                    src="/images/image.png" 
                    alt="Custom Development" 
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{
                  textAlign: 'left',
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: '0 0 10px',
                    color: 'white',
                  }}>
                    Custom
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.5',
                    margin: '0',
                    padding: '0',
                    color: 'white',
                    opacity: '0.9',
                  }}>
                    Fully custom-built websites crafted from scratch to meet unique business needs.
                  </p>
                </div>
              </>
            )}
          </div>
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
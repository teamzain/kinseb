'use client';
import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div style={{
      width: '100%',
      background: '#04091D',
      padding: '40px 0',
      color: 'white',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        margin: '0 auto 40px',
        padding: '0 20px',
      }}>
        <h1 style={{
          fontSize: isMobile ? '32px' : '42px',
          fontWeight: '600',
          marginBottom: '10px',
          fontFamily: 'Poppins, sans-serif',
        }}>
          Web Development<br />
          Tailored For <span style={{ color: '#3B7BCE' }}>Clients</span> Needs
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          maxWidth: '800px',
          margin: '0 auto',
          fontFamily: 'Lato, sans-serif',
        }}>
          From popular platforms to custom builds — we develop solutions that fit your business perfectly.
        </p>
      </div>

      {/* Main content in grid layout */}
      {isMobile ? (
        /* Mobile Layout */
        <div style={{ padding: '0 20px' }}>
          {/* WordPress */}
          <div style={{
            display: 'flex',
            marginBottom: '50px',
            alignItems: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#3B7BCE',
              marginRight: '20px',
              flexShrink: 0,
            }}></div>
            <div>
              <h3 style={{
                fontSize: '24px',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif',
              }}>WordPress</h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                fontFamily: 'Lato, sans-serif',
              }}>Flexible and easy-to-manage WordPress websites tailored to your goals.</p>
            </div>
          </div>

          {/* Shopify */}
          <div style={{
            display: 'flex',
            marginBottom: '50px',
            alignItems: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#95BF47',
              marginRight: '20px',
              flexShrink: 0,
            }}></div>
            <div>
              <h3 style={{
                fontSize: '24px',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif',
              }}>Shopify</h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                fontFamily: 'Lato, sans-serif',
              }}>Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.</p>
            </div>
          </div>

          {/* Point of Sale */}
          <div style={{
            display: 'flex',
            marginBottom: '50px',
            alignItems: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#F26322',
              marginRight: '20px',
              flexShrink: 0,
            }}></div>
            <div>
              <h3 style={{
                fontSize: '24px',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif',
              }}>Point Of Sale</h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                fontFamily: 'Lato, sans-serif',
              }}>Powerful Magento solutions designed for high-performance online stores.</p>
            </div>
          </div>

          {/* Custom */}
          <div style={{
            display: 'flex',
            marginBottom: '50px',
            alignItems: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#A66DD4',
              marginRight: '20px',
              flexShrink: 0,
            }}></div>
            <div>
              <h3 style={{
                fontSize: '24px',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif',
              }}>Custom</h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                fontFamily: 'Lato, sans-serif',
              }}>Fully custom-built websites crafted from scratch to meet unique business needs.</p>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div style={{
          position: 'relative',
          paddingTop: '20px',
        }}>
          {/* Horizontal connecting line */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '4px',
            top: '50%',
            left: 0,
            zIndex: 1,
          }}>
            <div style={{
              width: '50%',
              height: '100%',
              backgroundColor: '#3B7BCE',
              float: 'left',
            }}></div>
            <div style={{
              width: '50%',
              height: '100%',
              backgroundColor: '#F26322',
              float: 'left',
            }}></div>
          </div>

          {/* Grid container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* WordPress - Top Left */}
            <div style={{
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative',
            }}>
              <div style={{
                width: '170px',
                height: '170px',
                borderRadius: '50%',
                backgroundColor: '#3B7BCE',
                margin: '0 0 40px',
              }}></div>
              
              <h3 style={{
                fontSize: '28px',
                marginBottom: '15px',
                textAlign: 'left',
                fontFamily: 'Poppins, sans-serif',
              }}>WordPress</h3>
              
              <p style={{
                fontSize: '16px',
                textAlign: 'left',
                marginBottom: '20px',
                fontFamily: 'Lato, sans-serif',
              }}>Flexible and easy-to-manage WordPress websites tailored to your goals.</p>
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: '#3B7BCE',
              }}></div>
            </div>

            {/* Shopify - Top Right */}
            <div style={{
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'relative',
            }}>
              <div style={{
                width: '170px',
                height: '170px',
                borderRadius: '50%',
                backgroundColor: '#95BF47',
                margin: '0 0 40px',
              }}></div>
              
              <h3 style={{
                fontSize: '28px',
                marginBottom: '15px',
                textAlign: 'right',
                fontFamily: 'Poppins, sans-serif',
              }}>Shopify</h3>
              
              <p style={{
                fontSize: '16px',
                textAlign: 'right',
                marginBottom: '20px',
                fontFamily: 'Lato, sans-serif',
              }}>Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.</p>
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                height: '4px',
                backgroundColor: '#95BF47',
              }}></div>
            </div>

            {/* Point of Sale - Bottom Left */}
            <div style={{
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: '#F26322',
              }}></div>
              
              <h3 style={{
                fontSize: '28px',
                marginBottom: '15px',
                marginTop: '20px',
                textAlign: 'left',
                fontFamily: 'Poppins, sans-serif',
              }}>Point Of Sale</h3>
              
              <p style={{
                fontSize: '16px',
                textAlign: 'left',
                marginBottom: '40px',
                fontFamily: 'Lato, sans-serif',
              }}>Powerful Magento solutions designed for high-performance online stores.</p>
              
              <div style={{
                width: '170px',
                height: '170px',
                borderRadius: '50%',
                backgroundColor: '#F26322',
              }}></div>
            </div>

            {/* Custom - Bottom Right */}
            <div style={{
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '4px',
                backgroundColor: '#A66DD4',
              }}></div>
              
              <h3 style={{
                fontSize: '28px',
                marginBottom: '15px',
                marginTop: '20px',
                textAlign: 'right',
                fontFamily: 'Poppins, sans-serif',
              }}>Custom</h3>
              
              <p style={{
                fontSize: '16px',
                textAlign: 'right',
                marginBottom: '40px',
                fontFamily: 'Lato, sans-serif',
              }}>Fully custom-built websites crafted from scratch to meet unique business needs.</p>
              
              <div style={{
                width: '170px',
                height: '170px',
                borderRadius: '50%',
                backgroundColor: '#A66DD4',
              }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebDevelopmentComponent;
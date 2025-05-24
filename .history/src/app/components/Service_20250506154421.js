'use client';

import React, { useEffect, useState } from 'react';

const WebDevelopmentComponent = () => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#0b0f21',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 0',
      overflow: 'hidden',
    }}>
      {/* Header Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '600',
          margin: '20px 0 10px',
          lineHeight: '1.2',
        }}>
          Web Development
        </h1>
        <h2 style={{
          fontSize: '36px',
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

      {/* Services Section - Mobile-Friendly Layout */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        {/* WordPress */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}>
          {/* Left side - Logo with vertical line */}
          <div style={{
            position: 'relative',
            minWidth: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '-20px',
              bottom: '-100px',
              width: '5px',
              backgroundColor: '#1e90ff',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmerVertical 3s infinite',
              }}></div>
            </div>
            {/* Logo */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#0b0f21',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              marginRight: '10px',
            }}>
              <img 
                src="/images/Wordpress.png" 
                alt="WordPress" 
                style={{
                  width: '55px',
                  height: '55px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          {/* Right side - Content */}
          <div style={{
            paddingLeft: '20px',
            flex: 1,
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 10px',
              color: 'white',
            }}>
              WordPress
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              color: 'white',
              opacity: '0.9',
            }}>
              Flexible and easy-to-manage WordPress websites tailored to your goals.
            </p>
          </div>
        </div>

        {/* Shopify */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
        }}>
          {/* Left side - Logo with vertical line */}
          <div style={{
            position: 'relative',
            minWidth: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '-20px',
              bottom: '-100px',
              width: '5px',
              backgroundColor: '#95d600',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmerVertical 3s infinite',
              }}></div>
            </div>
            {/* Logo */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#0b0f21',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              marginRight: '10px',
            }}>
              <img 
                src="/images/shopify.png" 
                alt="Shopify" 
                style={{
                  width: '55px',
                  height: '55px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          {/* Right side - Content */}
          <div style={{
            paddingLeft: '20px',
            flex: 1,
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 10px',
              color: 'white',
            }}>
              Shopify
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              color: 'white',
              opacity: '0.9',
            }}>
              Scalable, user-friendly Shopify stores built for seamless eCommerce experiences.
            </p>
          </div>
        </div>

        {/* Magento */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
        }}>
          {/* Left side - Logo with vertical line */}
          <div style={{
            position: 'relative',
            minWidth: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '-20px',
              bottom: '-100px',
              width: '5px',
              backgroundColor: '#F26322',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmerVertical 3s infinite',
              }}></div>
            </div>
            {/* Logo */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#0b0f21',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              marginRight: '10px',
            }}>
              <img 
                src="/images/Magento.png" 
                alt="Magento" 
                style={{
                  width: '55px',
                  height: '55px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          {/* Right side - Content */}
          <div style={{
            paddingLeft: '20px',
            flex: 1,
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 10px',
              color: 'white',
            }}>
              Magento
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              color: 'white',
              opacity: '0.9',
            }}>
              Powerful Magento solutions designed for high-performance online stores.
            </p>
          </div>
        </div>

        {/* Custom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
        }}>
          {/* Left side - Logo with vertical line */}
          <div style={{
            position: 'relative',
            minWidth: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '-20px',
              bottom: '-20px',
              width: '5px',
              backgroundColor: '#61dafb',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmerVertical 3s infinite',
              }}></div>
            </div>
            {/* Logo */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#0b0f21',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              marginRight: '10px',
            }}>
              <img 
                src="/images/image.png" 
                alt="Custom Development" 
                style={{
                  width: '55px',
                  height: '55px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          {/* Right side - Content */}
          <div style={{
            paddingLeft: '20px',
            flex: 1,
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              margin: '0 0 10px',
              color: 'white',
            }}>
              Custom
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              color: 'white',
              opacity: '0.9',
            }}>
              Fully custom-built websites crafted from scratch to meet unique business needs.
            </p>
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
          
          @keyframes shimmerVertical {
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

          @media (max-width: 600px) {
            h1 {
              font-size: 32px !important;
            }
            h2 {
              font-size: 26px !important;
            }
            p {
              font-size: 14px !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default WebDevelopmentComponent;
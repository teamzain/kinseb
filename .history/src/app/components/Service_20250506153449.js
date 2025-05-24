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

      {/* First Row - WordPress, Shopify, Custom */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto 20px',
        gap: '20px',
      }}>
        {/* WordPress */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            marginBottom: '20px',
        
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          
          }}
        
          >
            <img 
              src="/images/Wordpress.png" 
              alt="WordPress" 
              style={{
                width: '130px',
                height: '130px',
                marginTop:'11px',
                objectFit: 'contain',
              }}
            />
          </div>
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
          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '0 0 15px',
            color: 'white',
          }}>
            WordPress
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 auto',
            padding: '0 10px',
            color: 'white',
            opacity: '0.9',
          }}>
            Flexible and easy-to-manage WordPress websites tailored to your goals.
          </p>
        </div>

        {/* Shopify */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '300px',
          display: 'flex',
          marginTop:'1.25px',
          marginLeft:'-20px',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
        }}>
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
            margin: '0 auto 150px',
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
marginTop:'8px',
        
            cursor: 'pointer',
         
          }}
         
    
          >
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
        </div>
        
        {/* Custom Development */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '300px',
          display: 'flex',
          marginTop:'20px',
          marginLeft:'-20px',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
        }}>
         <div style={{
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
          
        
          }}
       
          >
            <img 
              src="/images/Magento.png" 
              alt="Custom Development" 
              style={{
                width: '1300px',
                height: '130px',
                marginTop:'-30px',
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
        </div>
        
        {/* React/Node.js */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '300px',
          display: 'flex',
          marginTop:'1.25px',
          marginLeft:'-20px',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
        }}>
    
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
            margin: '0 auto 15px',
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
          
          }}
          
          >
            <img 
              src="/images/image.png" 
              alt="React Node.js" 
              style={{
                width: '130px',
                height: '130px',
                objectFit: 'contain',
              }}
            />
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
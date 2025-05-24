// components/Banner.js
import React from 'react';
import Head from 'next/head';

const Banner = () => {
  // Media query hook for responsive design
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = React.useState(false);
  
    React.useEffect(() => {
      const updateTarget = () => {
        if (window.innerWidth < width) {
          setTargetReached(true);
        } else {
          setTargetReached(false);
        }
      };
      
      updateTarget();
      window.addEventListener('resize', updateTarget);
      
      return () => {
        window.removeEventListener('resize', updateTarget);
      };
    }, [width]);
  
    return targetReached;
  };

  const isMobile = typeof window !== 'undefined' ? useMediaQuery(768) : false;
  const isTablet = typeof window !== 'undefined' ? useMediaQuery(1024) : false;
  
  return (
    <>
      <Head>
        {/* Meta tags for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Font import */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
        position: 'relative',
        width: '100%',
        padding: isMobile ? '40px 15px' : isTablet ? '50px 20px' : '60px 20px',
        background: 'linear-gradient(90deg, rgba(7,19,43,0.95) 0%, rgba(43,13,66,0.95) 100%)',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: "'Poppins', sans-serif",
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage: "url('/banner-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}>
        </div>
        
        {/* Content Container */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#4ecdc4',
            marginBottom: '10px',
            fontWeight: '500',
          }}>
            Seasoned Professionals. Proven Results.
          </p>
          
          {/* Main Heading */}
          <h1 style={{
            fontSize: isMobile ? '28px' : isTablet ? '36px' : '42px',
            fontWeight: '700',
            marginBottom: isMobile ? '30px' : '40px',
            lineHeight: '1.2',
          }}>
            Your Trusted <span style={{ color: '#4ecdc4' }}>Project</span> Partners
          </h1>
          
          {/* Stats Section */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: isMobile ? '40px' : '30px',
            marginBottom: '40px',
          }}>
            {/* Stat Item 1 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: isMobile ? '100%' : '200px',
              flex: '1',
            }}>
              <div style={{
                marginBottom: '15px',
                height: '60px',
                width: '60px',
              }}>
                <svg viewBox="0 0 24 24" fill="#4ecdc4" width="100%" height="100%">
                  <path d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '24px',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                Proven
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#e0e0e0',
                lineHeight: '1.4',
              }}>
                Established Track Record
              </p>
            </div>
            
            {/* Stat Item 2 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: isMobile ? '100%' : '200px',
              flex: '1',
            }}>
              <div style={{
                marginBottom: '15px',
                height: '60px',
                width: '60px',
              }}>
                <svg viewBox="0 0 24 24" fill="#4ecdc4" width="100%" height="100%">
                  <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M12,3C12.55,3 13,3.45 13,4C13,4.55 12.55,5 12,5C11.45,5 11,4.55 11,4C11,3.45 11.45,3 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '24px',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                70+
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#e0e0e0',
                lineHeight: '1.4',
              }}>
                Projects Delivered
              </p>
            </div>
            
            {/* Stat Item 3 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: isMobile ? '100%' : '200px',
              flex: '1',
            }}>
              <div style={{
                marginBottom: '15px',
                height: '60px',
                width: '60px',
              }}>
                <svg viewBox="0 0 24 24" fill="#4ecdc4" width="100%" height="100%">
                  <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: isMobile ? '22px' : '24px',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                Trusted
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#e0e0e0',
                lineHeight: '1.4',
              }}>
                Partner Network
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <button style={{
            backgroundColor: '#4ecdc4',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: isMobile ? '10px 20px' : '12px 24px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#3dbdb5';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#4ecdc4';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            View Work Or Request
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
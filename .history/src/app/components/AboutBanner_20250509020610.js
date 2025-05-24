'use client';
import React from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Initialize Next.js fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

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
    <div className={`${poppins.variable} ${lato.variable}`} style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? '780px' : isTablet ? '680px' : '560px',
      boxSizing: 'border-box',
      background: 'linear-gradient(90deg, rgba(7,19,43,0.95) 0%, rgba(43,13,66,0.95) 100%)',
      overflow: 'hidden',
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}>
        <Image
          src="/banner-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Content Container - Responsive */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '30px 20px' : '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Subtitle */}
        <div style={{
          width: '100%',
          fontFamily: 'var(--font-poppins)',
          fontWeight: '500',
          fontSize: isMobile ? '16px' : '16px',
          lineHeight: '1.5',
          textAlign: 'center',
          color: '#4ecdc4',
          marginBottom: '10px',
        }}>
          Seasoned Professionals, Proven Results.
        </div>
        
        {/* Main Heading */}
        <h1 style={{
          width: '100%',
          fontFamily: 'var(--font-poppins)',
          fontWeight: '700',
          fontSize: isMobile ? '32px' : isTablet ? '42px' : '52px',
          lineHeight: '1.2',
          textAlign: 'center',
          color: '#FFFFFF',
          margin: '0 0 40px 0',
        }}>
          Your Trusted <span style={{ color: '#4ecdc4' }}>Project</span> Partners
        </h1>
        
        {/* Stats Section */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: isMobile ? '40px' : '30px',
          marginBottom: '40px',
        }}>
          {/* Stat Item 1 - Proven */}
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
              position: 'relative',
            }}>
              <svg viewBox="0 0 24 24" fill="#4ecdc4" width="100%" height="100%">
                <path d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: '700',
              fontSize: isMobile ? '24px' : '24px',
              lineHeight: '1.2',
              textAlign: 'center',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
            }}>
              Proven
            </h3>
            <p style={{
              fontFamily: 'var(--font-lato)',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '1.4',
              textAlign: 'center',
              color: '#e0e0e0',
              margin: '0',
            }}>
              Established Record
            </p>
          </div>
          
          {/* Stat Item 2 - 70+ */}
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
              position: 'relative',
            }}>
              <svg viewBox="0 0 24 24" fill="#4ecdc4" width="100%" height="100%">
                <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M12,3C12.55,3 13,3.45 13,4C13,4.55 12.55,5 12,5C11.45,5 11,4.55 11,4C11,3.45 11.45,3 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: '700',
              fontSize: isMobile ? '24px' : '24px',
              lineHeight: '1.2',
              textAlign: 'center',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
            }}>
              70+
            </h3>
            <p style={{
              fontFamily: 'var(--font-lato)',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '1.4',
              textAlign: 'center',
              color: '#e0e0e0',
              margin: '0',
            }}>
              Projects Delivered
            </p>
          </div>
          
          {/* Stat Item 3 - Trusted */}
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
              position: 'relative',
            }}>
              <svg viewBox="0 0 24 24" fill="#4ecdc4" width="100%" height="100%">
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: '700',
              fontSize: isMobile ? '24px' : '24px',
              lineHeight: '1.2',
              textAlign: 'center',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
            }}>
              Trusted
            </h3>
            <p style={{
              fontFamily: 'var(--font-lato)',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '1.4',
              textAlign: 'center',
              color: '#e0e0e0',
              margin: '0',
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
          Speak With Our Experts
        </button>
      </div>
    </div>
  );
};

export default Banner;
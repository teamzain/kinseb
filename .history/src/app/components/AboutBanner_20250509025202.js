'use client';
import React, { useEffect, useState, useRef } from 'react';
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
  // Ref for the banner element
  const bannerRef = useRef(null);
  // State to track if banner is visible
  const [isVisible, setIsVisible] = useState(false);
  
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
  
  // Setting up Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the banner enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );
    
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    
    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);
  
  // Animation styles based on visibility
  const getAnimationStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
  });
  
  return (
    <div ref={bannerRef} className={`${poppins.variable} ${lato.variable}`} style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? '100vh' : isTablet ? '700px' : '730px',
      boxSizing: 'border-box',
      background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -188.54%, rgba(1, 3, 10, 0.5) -0.99%, rgba(1, 3, 9, 0.5) 2.8%, #04091D 100%)',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
          src="/images/about-bg.jpg"
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
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '40px 20px' : isTablet ? '60px 40px' : '80px 60px',
      }}>
        {/* Subtitle */}
        <div style={{
          width: isMobile ? '90%' : isTablet ? '80%' : '507px',
          position: isMobile ? 'relative' : 'absolute',
          left: isMobile ? '5%' : isTablet ? '10%' : '458px',
          top: isMobile ? '50px' : isTablet ? '70px' : '108px',
          marginBottom: isMobile ? '20px' : '0',
          fontFamily: 'var(--font-poppins)',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: isMobile ? '18px' : isTablet ? '22px' : '25px',
          lineHeight: isMobile ? '28px' : isTablet ? '32px' : '38px',
          textAlign: 'center',
          color: '#0D94BB',
          whiteSpace: 'nowrap',
          ...getAnimationStyle(0.2),
        }}>
          Seasoned Professionals, Proven Results.
        </div>
        
        {/* Main Heading */}
        <h1 style={{
          width: isMobile ? '100%' : isTablet ? '90%' : '1249px',
          position: isMobile ? 'relative' : 'absolute',
          left: isMobile ? '0' : isTablet ? '5%' : '81px',
          top: isMobile ? '20px' : isTablet ? '120px' : '146px',
          marginTop: isMobile ? '20px' : '0',
          fontFamily: 'var(--font-poppins)',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: isMobile ? '32px' : isTablet ? '48px' : '65px',
          lineHeight: isMobile ? '42px' : isTablet ? '72px' : '98px',
          textAlign: 'center',
          color: '#FFFFFF',
          ...getAnimationStyle(0.4),
        }}>
          Your Trusted <span style={{ color: '#0D94BB' }}>Project</span> Partners
        </h1>
        
        {/* Stats Section */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: isMobile ? '80px' : isTablet ? '200px' : '250px',
          gap: isMobile ? '60px' : '20px',
        }}>
          {/* Stat Item 1 - Proven */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            ...getAnimationStyle(0.6),
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              height: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              marginBottom: '20px',
              position: 'relative',
            }}>
              <Image
                src="/images/about2.svg"
                alt="Proven"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-poppins)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: isMobile ? '30px' : isTablet ? '38px' : '45px',
              lineHeight: isMobile ? '42px' : isTablet ? '54px' : '64px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 10px 0',
            }}>
              Proven
            </h3>
            <p style={{
              fontFamily: 'var(--font-lato)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: isMobile ? '18px' : isTablet ? '22px' : '25px',
              lineHeight: isMobile ? '24px' : isTablet ? '26px' : '30px',
              textAlign: 'center',
              color: '#FFFFFF',
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
            flex: 1,
            ...getAnimationStyle(0.8),
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '90px' : '93.26px',
              height: isMobile ? '80px' : isTablet ? '90px' : '93.26px',
              marginBottom: '20px',
              position: 'relative',
            }}>
              <Image
                src="/images/about1.svg"
                alt="Projects"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-poppins)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: isMobile ? '30px' : isTablet ? '38px' : '45px',
              lineHeight: isMobile ? '42px' : isTablet ? '54px' : '64px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 10px 0',
            }}>
              70+
            </h3>
            <p style={{
              fontFamily: 'var(--font-lato)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: isMobile ? '18px' : isTablet ? '22px' : '25px',
              lineHeight: isMobile ? '24px' : isTablet ? '26px' : '30px',
              textAlign: 'center',
              color: '#FFFFFF',
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
            flex: 1,
            ...getAnimationStyle(1.0),
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              height: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              marginBottom: '20px',
              position: 'relative',
            }}>
              <Image
                src="/images/about3.svg"
                alt="Trusted"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-poppins)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: isMobile ? '30px' : isTablet ? '38px' : '45px',
              lineHeight: isMobile ? '42px' : isTablet ? '54px' : '64px',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 10px 0',
            }}>
              Trusted
            </h3>
            <p style={{
              fontFamily: 'var(--font-lato)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: isMobile ? '18px' : isTablet ? '22px' : '25px',
              lineHeight: isMobile ? '24px' : isTablet ? '26px' : '30px',
              textAlign: 'center',
              color: '#FFFFFF',
              margin: '0',
            }}>
              Partner Network
            </p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '60px' : isTablet ? '70px' : '80px',
          ...getAnimationStyle(1.2),
        }}>
          <button style={{
            width: isMobile ? '180px' : isTablet ? '200px' : '207px',
            height: isMobile ? '40px' : isTablet ? '42px' : '45px',
            background: '#0D98BA',
            border: '2px solid #0D98BA',
            borderRadius: '6px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#0A7A94';
            e.currentTarget.style.borderColor = '#0A7A94';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#0D98BA';
            e.currentTarget.style.borderColor = '#0D98BA';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{
              fontFamily: 'var(--font-lato)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
              color: '#04091D',
            }}>
              View Work Or Request
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
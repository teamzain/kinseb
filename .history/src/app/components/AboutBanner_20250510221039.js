'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Poppins, Lato } from 'next/font/google';
import Image from 'next/image';

// Initialize Next.js fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
  
  // State for counter animations
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  // States for counters to be animated
  const targetCount1 = 100; // Proven (percentage)
  const targetCount2 = 70; // Projects delivered
  const targetCount3 = 50; // Trusted partners
  
  // Custom hook for responsive design
  const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return {
      isMobile: windowSize.width < 768,
      isTablet: windowSize.width >= 768 && windowSize.width < 1024,
      isDesktop: windowSize.width >= 1024,
      width: windowSize.width,
      height: windowSize.height
    };
  };

  const { isMobile, isTablet, isDesktop, width } = useResponsive();
  
  // Setting up Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the banner enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Start counter animations when visible
          if (count1 === 0 && count2 === 0 && count3 === 0) {
            const duration = 2000; // 2 seconds for counter animation
            const framesPerSecond = 60;
            const totalFrames = duration / 1000 * framesPerSecond;
            
            let frame = 0;
            const counterInterval = setInterval(() => {
              frame++;
              const progress = frame / totalFrames;
              
              // Easing function for smoother animation (ease-out)
              const easeOutProgress = 1 - Math.pow(1 - progress, 3);
              
              if (frame <= totalFrames) {
                setCount1(Math.floor(easeOutProgress * targetCount1));
                setCount2(Math.floor(easeOutProgress * targetCount2));
                setCount3(Math.floor(easeOutProgress * targetCount3));
              } else {
                setCount1(targetCount1);
                setCount2(targetCount2);
                setCount3(targetCount3);
                clearInterval(counterInterval);
              }
            }, 1000 / framesPerSecond);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Trigger when at least 20% of the element is visible
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
  }, [count1, count2, count3]);
  
  // Animation styles based on visibility
  const getAnimationStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
  });
  
  // Dynamic styles for subtitle to fix positioning issue
  const getSubtitleStyles = () => {
    // Base styles
    const styles = {
      fontFamily: 'var(--font-poppins)',
      fontStyle: 'normal',
      fontWeight: '600',
      color: '#0D94BB',
      textAlign: 'center',
      ...getAnimationStyle(0.2),
    };
    
    // Responsive adjustments
    if (isMobile) {
      return {
        ...styles,
        position: 'relative',
        width: '100%',
        left: 0,
        top: 0,
        marginBottom: '10px',
        fontSize: '18px',
        lineHeight: '28px',
        padding: '0 10px',
      };
    } else if (isTablet) {
      return {
        ...styles,
        position: 'relative',
        width: '100%',
        left: 0,
        top: 0,
        marginBottom: '15px',
        fontSize: '22px',
        lineHeight: '32px',
      };
    } else {
      return {
        ...styles,
        position: 'relative',
        width: '100%',
        left: 0,
        top: 0, 
        marginBottom: '20px',
        fontSize: '25px',
        lineHeight: '38px',
      };
    }
  };
  
  return (
    <div 
      ref={bannerRef} 
      className={`${poppins.variable} ${lato.variable} banner-container`} 
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? 'auto' : isTablet ? '700px' : '730px',
        minHeight: isMobile ? '100vh' : 'auto',
        boxSizing: 'border-box',
        background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -188.54%, rgba(1, 3, 10, 0.5) -0.99%, rgba(1, 3, 9, 0.5) 2.8%, #04091D 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        paddingBottom: isMobile ? '40px' : '0',
      }}
    >
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
          fill
          style={{ objectFit: 'cover' }}
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Header Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: isMobile ? '20px' : isTablet ? '30px' : '40px',
          width: '100%',
        }}>
          {/* Subtitle */}
          <div style={getSubtitleStyles()}>
            Seasoned Professionals, Proven Results
          </div>
          
          {/* Main Heading */}
          <h1 style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : isTablet ? '90%' : '1200px',
            fontFamily: 'var(--font-poppins)',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '32px' : isTablet ? '48px' : '65px',
            lineHeight: isMobile ? '42px' : isTablet ? '58px' : '78px',
            textAlign: 'center',
            color: '#FFFFFF',
            margin: isMobile ? '0 0 30px 0' : '0 0 40px 0',
            ...getAnimationStyle(0.4),
          }}>
            Your Trusted <span style={{ color: '#0D94BB' }}>Project</span> Partners
          </h1>
        </div>
        
        {/* Stats Section */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: isMobile ? '40px' : isTablet ? '100px' : '120px',
          gap: isMobile ? '50px' : '20px',
        }}>
          {/* Stat Item 1 - Proven */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            ...getAnimationStyle(0.6),
          }}>
            <div 
              className="icon-container"
              style={{
                width: isMobile ? '80px' : isTablet ? '90px' : '104px',
                height: isMobile ? '80px' : isTablet ? '90px' : '104px',
                marginBottom: '20px',
                position: 'relative',
                transition: 'transform 0.5s ease',
                animation: isVisible ? 'pulse 2s infinite ease-in-out' : 'none',
              }}
            >
              <Image
                src="/images/about2.svg"
                alt="Proven"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
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
              <span>{count1}</span>
              <span>%</span>
            </div>
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
              Proven Success Rate
            </p>
          </div>
          
          {/* Stat Item 2 - Projects */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            ...getAnimationStyle(0.8),
          }}>
            <div 
              className="icon-container"
              style={{
                width: isMobile ? '80px' : isTablet ? '90px' : '93px',
                height: isMobile ? '80px' : isTablet ? '90px' : '93px',
                marginBottom: '20px',
                position: 'relative',
                transition: 'transform 0.5s ease',
                animation: isVisible ? 'pulse 2s infinite ease-in-out' : 'none',
                animationDelay: '0.3s',
              }}
            >
              <Image
                src="/images/about1.svg"
                alt="Projects"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{
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
              {count2}+
            </div>
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
            <div 
              className="icon-container"
              style={{
                width: isMobile ? '80px' : isTablet ? '90px' : '104px',
                height: isMobile ? '80px' : isTablet ? '90px' : '104px',
                marginBottom: '20px',
                position: 'relative',
                transition: 'transform 0.5s ease',
                animation: isVisible ? 'pulse 2s infinite ease-in-out' : 'none',
                animationDelay: '0.6s',
              }}
            >
              <Image
                src="/images/about3.svg"
                alt="Trusted"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{
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
              {count3}+
            </div>
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
          marginTop: isMobile ? '50px' : isTablet ? '60px' : '70px',
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
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .icon-container:hover {
          transform: scale(1.1);
        }
        
        @media (max-width: 767px) {
          .banner-container {
            padding-bottom: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
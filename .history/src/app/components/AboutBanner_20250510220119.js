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
  
  // States for counter animation
  const [projectCount, setProjectCount] = useState(0);
  const targetProjectCount = 70;
  
  // Function to handle counter animation
  const animateCounter = (current, target, setter, duration = 2000) => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateCounter = () => {
      const now = Date.now();
      const remaining = Math.max(endTime - now, 0);
      const progress = 1 - remaining / duration; // 0 to 1
      
      // Use easeOutCubic for smoother animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const value = Math.floor(easeProgress * target);
      setter(value);
      
      if (now < endTime) {
        requestAnimationFrame(updateCounter);
      } else {
        setter(target);
      }
    };
    
    updateCounter();
  };
  
  // Breakpoint states for responsive design
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);
  
  // Update breakpoints
  useEffect(() => {
    const updateBreakpoints = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsSmallDesktop(window.innerWidth >= 1024 && window.innerWidth < 1280);
    };
    
    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    
    return () => {
      window.removeEventListener('resize', updateBreakpoints);
    };
  }, []);
  
  // Setting up Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the banner enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Start counter animation
          animateCounter(0, targetProjectCount, setProjectCount);
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
  
  // Animation styles based on visibility with enhanced parameters
  const getAnimationStyle = (delay = 0, direction = 'up') => {
    let initialTransform;
    
    switch (direction) {
      case 'up':
        initialTransform = 'translateY(40px)';
        break;
      case 'down':
        initialTransform = 'translateY(-40px)';
        break;
      case 'left':
        initialTransform = 'translateX(40px)';
        break;
      case 'right':
        initialTransform = 'translateX(-40px)';
        break;
      case 'scale':
        initialTransform = 'scale(0.8)';
        break;
      default:
        initialTransform = 'translateY(40px)';
    }
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0) scale(1)' : initialTransform,
      transition: `opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
    };
  };
  
  // Stat item animation style with pulse effect
  const getStatItemStyle = (delay) => {
    return {
      animation: isVisible ? `pulseEffect 2s cubic-bezier(0.4, 0, 0.6, 1) ${delay}s` : 'none',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
    };
  };
  
  return (
    <div ref={bannerRef} className={`${poppins.variable} ${lato.variable} banner-container`} style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? '125vh' : isTablet ? '700px' : '730px',
      boxSizing: 'border-box',
      background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) -188.54%, rgba(1, 3, 10, 0.5) -0.99%, rgba(1, 3, 9, 0.5) 2.8%, #04091D 100%)',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
    }}>
      {/* Background Image with Parallax Effect */}
      <div className="banner-background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        transform: isVisible ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 10s ease-out',
      }}>
        <Image
          src="/images/about-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="banner-bg-image"
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(4, 9, 29, 0.6) 0%, rgba(4, 9, 29, 0.8) 100%)',
          zIndex: 1,
        }}></div>
      </div>
      
      {/* Content Container - Responsive */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '40px 20px' : isTablet ? '60px 40px' : isSmallDesktop ? '70px 50px' : '80px 60px',
      }}>
        {/* Subtitle */}
        <div style={{
          width: isMobile ? '90%' : isTablet ? '80%' : '507px',
          position: isMobile ? 'relative' : 'absolute',
          left: isMobile ? '5%' : isTablet ? '10%' : '50%',
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
          transform: isVisible ? 'translateX(-50%)' : 'translateX(-50%)',
          ...getAnimationStyle(0.2, 'down'),
        }}>
          Seasoned Professionals, Proven Results
        </div>
        
        {/* Main Heading */}
        <h1 style={{
          width: isMobile ? '100%' : isTablet ? '90%' : '100%',
          position: isMobile ? 'relative' : 'absolute',
          left: isMobile ? '0' : '50%',
          top: isMobile ? '30px' : isTablet ? '120px' : '146px',
          marginTop: isMobile ? '20px' : '0',
          fontFamily: 'var(--font-poppins)',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: isMobile ? '32px' : isTablet ? '48px' : isSmallDesktop ? '58px' : '65px',
          lineHeight: isMobile ? '42px' : isTablet ? '72px' : '98px',
          textAlign: 'center',
          color: '#FFFFFF',
          transform: isVisible ? 'translateX(-50%)' : 'translateX(-50%)',
          ...getAnimationStyle(0.4, 'up'),
        }}>
          Your Trusted <span style={{ 
            color: '#0D94BB',
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
            paddingBottom: '5px',
          }}>
            Project
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: isVisible ? '100%' : '0%',
              height: '3px',
              background: '#0D94BB',
              transition: 'width 1.2s ease-in-out 0.8s',
            }}></span>
          </span> Partners
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
          <div className="stat-item" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            ...getStatItemStyle(0.6),
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              height: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              marginBottom: '20px',
              position: 'relative',
              animation: isVisible ? 'spin 15s linear infinite' : 'none',
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
              position: 'relative',
              padding: '0 10px 5px',
            }}>
              Established Record
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '2px',
                width: isVisible ? '70%' : '0%',
                background: 'linear-gradient(to right, transparent, #0D94BB, transparent)',
                transition: 'width 1s ease-in-out 1s',
              }}></span>
            </p>
          </div>
          
          {/* Stat Item 2 - Counter Animation */}
          <div className="stat-item" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            ...getStatItemStyle(0.8),
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '90px' : '93.26px',
              height: isMobile ? '80px' : isTablet ? '90px' : '93.26px',
              marginBottom: '20px',
              position: 'relative',
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
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
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{
                display: 'inline-block',
                minWidth: isMobile ? '50px' : '60px',
                textAlign: 'center',
              }}>
                {projectCount}
              </span>
              <span style={{
                display: 'inline-block',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.5s ease 2s, transform 0.5s ease 2s',
              }}>+</span>
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
              position: 'relative',
              padding: '0 10px 5px',
            }}>
              Projects Delivered
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '2px',
                width: isVisible ? '70%' : '0%',
                background: 'linear-gradient(to right, transparent, #0D94BB, transparent)',
                transition: 'width 1s ease-in-out 1.2s',
              }}></span>
            </p>
          </div>
          
          {/* Stat Item 3 - Trusted */}
          <div className="stat-item" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            ...getStatItemStyle(1.0),
          }}>
            <div style={{
              width: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              height: isMobile ? '80px' : isTablet ? '90px' : '103.98px',
              marginBottom: '20px',
              position: 'relative',
              animation: isVisible ? 'pulse 3s infinite' : 'none',
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
              position: 'relative',
              padding: '0 10px 5px',
            }}>
              Partner Network
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '2px',
                width: isVisible ? '70%' : '0%',
                background: 'linear-gradient(to right, transparent, #0D94BB, transparent)',
                transition: 'width 1s ease-in-out 1.4s',
              }}></span>
            </p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '60px' : isTablet ? '70px' : '80px',
          ...getAnimationStyle(1.2, 'up'),
        }}>
          <button className="cta-button" style={{
            width: isMobile ? '180px' : isTablet ? '200px' : '220px',
            height: isMobile ? '40px' : isTablet ? '42px' : '50px',
            background: 'linear-gradient(90deg, #0D98BA 0%, #0D94BB 100%)',
            border: '2px solid #0D98BA',
            borderRadius: '6px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(13, 148, 187, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(13, 148, 187, 0.2)';
          }}>
            {/* Button background shine effect */}
            <div className="btn-shine" style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: isVisible ? 'shine 3s infinite' : 'none',
            }}></div>
            
            <span style={{
              fontFamily: 'var(--font-lato)',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
              color: '#FFFFFF',
              position: 'relative',
              zIndex: 2,
              letterSpacing: '0.5px',
            }}>
              View Work Or Request
            </span>
          </button>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulseEffect {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        
        .banner-container {
          transition: height 0.5s ease;
        }
        
        .banner-bg-image {
          transition: transform 1.5s ease-out;
        }
        
        .banner-container:hover .banner-bg-image {
          transform: scale(1.02);
        }
        
        .cta-button {
          box-shadow: 0 5px 15px rgba(13, 148, 187, 0.2);
        }
        
        @media (max-width: 480px) {
          .banner-container {
            height: auto !important;
            min-height: 100vh;
            padding-bottom: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const TrustSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  const tabs = [
    {
      id: 0,
      title: "Custom\nWeb Design",
      heading: "Unique designs tailored to your brand's identity",
      description: "We handcraft every website to reflect your vision and values — no templates, no shortcuts. A custom experience that enhances brand recognition and drives real results.",
      features: [
        "100% custom, no cookie-cutter layouts",
        "Designed for conversion & engagement",
        "Strengthens your brand's digital identity"
      ],
      image: "/images/about-3.png",
      imageAlt: "Custom Web Design Mockups"
    },
    {
      id: 1,
      title: "Responsive\nWeb Design",
      heading: "Seamless experiences across all devices",
      description: "Your website will look and function flawlessly on every screen size. We build with a mobile-first approach that ensures perfect performance from smartphones to desktops.",
      features: [
        "Automatically adapts to any screen size",
        "Fast loading on mobile devices",
        "Touch-optimized navigation and buttons"
      ],
      image: "/responsive-mockups.png",
      imageAlt: "Responsive Web Design Mockups"
    },
    {
      id: 2,
      title: "Website\nRedesign",
      heading: "Transform your outdated site into a modern masterpiece",
      description: "Breathe new life into your online presence with our complete redesign services. We'll preserve what works while upgrading everything else to meet today's standards and expectations.",
      features: [
        "Preserves your brand while modernizing design",
        "Improves user experience and engagement",
        "Implements latest web technologies"
      ],
      image: "/redesign-mockups.png",
      imageAlt: "Website Redesign Mockups"
    },
    {
      id: 3,
      title: "Search Engine\nOptimization",
      heading: "Climb search rankings with data-driven SEO",
      description: "Get found by the right people at the right time. Our SEO strategies are built into every site we create, ensuring your business gains visibility in an increasingly competitive digital landscape.",
      features: [
        "Technical SEO best practices built-in",
        "Keyword research and on-page optimization",
        "Improved site structure and performance"
      ],
      image: "/seo-mockups.png",
      imageAlt: "SEO Mockups"
    },
    {
      id: 4,
      title: "eCommerce\nStorefronts",
      heading: "Sell more with conversion-focused online stores",
      description: "Turn browsers into buyers with our custom eCommerce solutions. We create intuitive shopping experiences that make purchasing effortless and keep customers coming back.",
      features: [
        "Streamlined checkout process",
        "Product showcases that drive sales",
        "Secure payment processing integration"
      ],
      image: "/ecommerce-mockups.png",
      imageAlt: "eCommerce Storefronts Mockups"
    }
  ];

  // Calculate the position for the sliding indicator
  const getIndicatorPosition = () => {
    return `${activeTab * (100 / tabs.length)}%`;
  };

  // Enhanced animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smoother motion
        staggerChildren: 0.15
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Pointer triangle for active tab
  const PointerTriangle = () => (
    <svg 
      width="18" 
      height="10" 
      viewBox="0 0 18 10" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2
      }}
    >
      <path 
        d="M9 10L0.339746 0L17.6603 0L9 10Z" 
        fill="#0D98BA" 
      />
    </svg>
  );

  // Determine if content should be reversed based on tab id
  const isContentReversed = activeTab % 2 !== 0;

  return (
    <>
      <Head>
        {/* Import Poppins and Lato fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Lato:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '900px' : '700px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Main Heading - Now centered */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: isMobile ? '20px' : '40px',
            padding: '0 20px',
            boxSizing: 'border-box'
          }}
        >
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            lineHeight: isMobile ? '40px' : isTablet ? '48px' : '56px',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0',
          }}>
            Why Clients <span style={{ color: '#0D98BA' }}>Trust</span>
          </h2>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            lineHeight: isMobile ? '40px' : isTablet ? '48px' : '56px',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginTop: '5px',
            marginBottom: '0',
          }}>
            Kinseb Web Development
          </h2>
        </motion.div>

        {/* Navigation Tabs with Sliding Indicator */}
        <div style={{
          position: 'absolute',
          width: '100%',
          maxWidth: isMobile ? '95%' : '1100px',
          left: '50%',
          top: isMobile ? '120px' : '180px',
          transform: 'translateX(-50%)',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          {/* Tab Container */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '20px',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            {/* Sliding Indicator - Moves based on active tab */}
            <motion.div 
              initial={false}
              animate={{
                left: isMobile ? `${(activeTab % 3) * 33.33}%` : getIndicatorPosition(),
                top: isMobile && activeTab >= 3 ? '70px' : '0px'
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              style={{
                position: 'absolute',
                width: isMobile ? '33.33%' : `${100 / tabs.length}%`,
                height: '70px',
                background: 'rgba(13, 152, 186, 0.15)',
                borderRadius: '10px 10px 0px 0px',
                bottom: 0,
                zIndex: 0
              }}
            />
            
            {/* Tabs */}
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: 'relative',
                  width: isMobile ? (tab.id >= 3 ? '50%' : '33.33%') : `${95 / tabs.length}%`,
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                  margin: '0 1%',
                  marginTop: isMobile && tab.id >= 3 ? '10px' : '0'
                }}
              >
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  fontSize: isMobile ? '16px' : '20px',
                  lineHeight: isMobile ? '22px' : '26px',
                  textAlign: 'center',
                  letterSpacing: '-0.03em',
                  color: tab.id === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                  margin: '0',
                  transition: 'color 0.3s ease'
                }}>
                  {tab.title.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index === 0 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                
                {/* Active tab pointer */}
                {tab.id === activeTab && <PointerTriangle />}
              </div>
            ))}
          </div>
        </div>

        {/* Blue Line */}
        <div style={{
          position: 'absolute',
          width: isMobile ? '95%' : '1100px',
          height: '4px',
          left: '50%',
          top: isMobile ? (activeTab >= 3 ? '270px' : '190px') : '250px',
          transform: 'translateX(-50%)',
          background: '#0D98BA',
          borderRadius: '10px',
          zIndex: 1
        }}></div>

        {/* Content Container - Now with conditional ordering */}
        <div style={{
          position: 'absolute',
          width: '100%',
          maxWidth: isMobile ? '95%' : '1100px',
          top: isMobile ? (activeTab >= 3 ? '290px' : '210px') : '280px',
          left: '50%',
          transform: 'translateX(-50%)',
          boxSizing: 'border-box',
          padding: '0 20px'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeTab}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: isMobile ? 'column' : isContentReversed ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '30px' : '40px'
              }}
            >
              {/* Text Content */}
              <motion.div 
                variants={contentVariants}
                style={{
                  flex: '1',
                  width: isMobile ? '100%' : '48%'
                }}
              >
                {/* Title */}
                <motion.h3 
                  variants={contentVariants}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: isMobile ? '20px' : '24px',
                    lineHeight: isMobile ? '26px' : '30px',
                    color: '#0D98BA',
                    margin: '0 0 15px 0'
                  }}
                >
                  {tabs[activeTab].heading}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  variants={contentVariants}
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: '500',
                    fontSize: isMobile ? '15px' : '16px',
                    lineHeight: isMobile ? '22px' : '24px',
                    letterSpacing: '-0.01em',
                    color: '#FFFFFF',
                    marginBottom: '24px'
                  }}
                >
                  {tabs[activeTab].description}
                </motion.p>

                {/* Features List */}
                <motion.div 
                  variants={contentVariants}
                  style={{
                    marginTop: '20px'
                  }}
                >
                  {tabs[activeTab].features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={featureVariants}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: index < tabs[activeTab].features.length - 1 ? '12px' : '0'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '12px',
                        background: 'rgba(13, 152, 186, 0.15)',
                        borderRadius: '50%'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                        </svg>
                      </div>
                      <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '500',
                        fontSize: isMobile ? '14px' : '16px',
                        lineHeight: isMobile ? '20px' : '22px',
                        letterSpacing: '-0.01em',
                        color: '#FFFFFF',
                        margin: '0'
                      }}>
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image Content */}
              <motion.div
                variants={imageVariants} 
                style={{
                  flex: '1',
                  width: isMobile ? '100%' : '48%',
                  height: isMobile ? '200px' : '350px',
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Image 
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].imageAlt}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                
                {/* Subtle overlay gradient for better text contrast if needed */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(4, 9, 29, 0.6), transparent)',
                  pointerEvents: 'none'
                }}/>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default TrustSection;
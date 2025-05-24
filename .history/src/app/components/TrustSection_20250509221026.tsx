'use client';
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Poppins, Lato } from 'next/font/google';

// Configure the fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], // Lato only supports 100, 300, 400, 700, 900
  display: 'swap',
});

const TrustSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
  
  // Scroll to center the active tab on mobile when active tab changes
  useEffect(() => {
    if (windowWidth < 768 && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const tabElements = Array.from(container.querySelectorAll<HTMLDivElement>('.tab-item'));
      
      if (tabElements[activeTab]) {
        const tabElement = tabElements[activeTab];
        const containerWidth = container.offsetWidth;
        const tabWidth = tabElement.offsetWidth;
        const tabPosition = tabElement.offsetLeft;
        
        // Center the active tab in the container
        container.scrollTo({
          left: tabPosition - (containerWidth / 2) + (tabWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab, windowWidth]);
  
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

  // Get the correct position and width for mobile indicator
  const getMobileIndicatorStyles = () => {
    if (isMobile && tabRefs.current[activeTab]) {
      const activeTabElement = tabRefs.current[activeTab];
      if (activeTabElement) {
        return {
          left: `${activeTabElement.offsetLeft}px`,
          width: `${activeTabElement.offsetWidth}px`
        };
      }
    }
    return {
      left: `${(activeTab * 160) + 8}px`,
      width: '160px'
    };
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

  // Determine if content should be reversed based on tab id
  const isContentReversed = activeTab % 2 !== 0;
  
  // Set up refs array when tabs change
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  return (
    <>
      <Head>
        {/* Import Poppins and Lato fonts - For non-Next.js font usage */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '1020px' : '700px', // Increased height for mobile to accommodate gap
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Main Heading - Now consistently displayed in two lines on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: isMobile ? '30px' : '40px',
            padding: '0 20px',
            marginBottom: '0',
            boxSizing: 'border-box',
            zIndex: 5 // Ensure heading is above other elements
          }}
        >
          <h2 className={poppins.className} style={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '30px' : '48px',
            lineHeight: isMobile ? '46px' : '56px',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0',
          }}>
            Why Clients <span style={{ color: '#0D98BA' }}>Trust</span>
          </h2>
          <h2 className={poppins.className} style={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '30px' : '48px', // Increased size for consistency on mobile
            lineHeight: isMobile ? '46px' : '56px',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginTop: '2px',
            marginBottom: '0',
            display: 'block',
            whiteSpace: 'nowrap', // Prevent text wrapping to third line
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
          top: isMobile ? '140px' : '180px',
          transform: 'translateX(-50%)',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          {/* Tab Container */}
          {isMobile ? (
            // Mobile: Scrollable tabs
            <div 
              ref={tabsContainerRef}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                position: 'relative',
                marginBottom: '20px',
                overflowX: 'auto',
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '5px'
              }}
              className="hide-scrollbar"
            >
              {/* Sliding Indicator for Mobile */}
              <motion.div 
                initial={false}
                animate={getMobileIndicatorStyles()}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                style={{
                  position: 'absolute',
                  height: '70px',
                  background: 'rgba(13, 152, 186, 0.15)',
                  borderRadius: '10px 10px 0px 0px',
                  bottom: 0,
                  zIndex: 0
                }}
              />
              
              {/* Mobile Tabs */}
              {tabs.map((tab, index) => (
                <div 
                  key={tab.id}
                  ref={(el: HTMLDivElement | null) => { tabRefs.current[index] = el }}
                  onClick={() => setActiveTab(tab.id)}
                  className="tab-item"
                  style={{
                    position: 'relative',
                    width: '160px',
                    minWidth: '160px',
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 1,
                    margin: '0 8px',
                    borderRadius: '10px 10px 0px 0px',
                    flexShrink: 0
                  }}
                >
                  <h3 className={poppins.className} style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    letterSpacing: '-0.03em',
                    color: tab.id === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                    margin: '0',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'pre-line'
                  }}>
                    {tab.title}
                  </h3>
                  
                  {tab.id === activeTab && (
                    <svg 
                      width="18" 
                      height="10" 
                      viewBox="0 0 18 10" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        bottom: '-10px',
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
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Desktop: Regular tabs
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              marginBottom: '20px'
            }}>
              {/* Sliding Indicator for Desktop */}
              <motion.div 
                initial={false}
                animate={{
                  left: getIndicatorPosition()
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                style={{
                  position: 'absolute',
                  width: `${100 / tabs.length}%`,
                  height: '70px',
                  background: 'rgba(13, 152, 186, 0.15)',
                  borderRadius: '10px 10px 0px 0px',
                  bottom: 0,
                  zIndex: 0
                }}
              />
              
              {/* Desktop Tabs */}
              {tabs.map((tab, index) => (
                <div 
                  key={tab.id}
                  ref={(el: HTMLDivElement | null) => { tabRefs.current[index] = el }}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    position: 'relative',
                    width: `${95 / tabs.length}%`,
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 1,
                    margin: '0 1%'
                  }}
                >
                  <h3 className={poppins.className} style={{
                    fontWeight: '500',
                    fontSize: '20px',
                    lineHeight: '26px',
                    textAlign: 'center',
                    letterSpacing: '-0.03em',
                    color: tab.id === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                    margin: '0',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'pre-line'
                  }}>
                    {tab.title}
                  </h3>
                  
                  {tab.id === activeTab && (
                    <svg 
                      width="18" 
                      height="10" 
                      viewBox="0 0 18 10" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        bottom: '-15px',
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blue Line */}
        <div style={{
          position: 'absolute',
          width: isMobile ? '95%' : '1100px',
          height: '4px',
          left: '50%',
          top: isMobile ? '210px' : '250px',
          transform: 'translateX(-50%)',
          background: '#0D98BA',
          borderRadius: '10px',
          zIndex: 1
        }}></div>

        {/* Content Container */}
        <div style={{
          position: 'absolute',
          width: '100%',
          maxWidth: isMobile ? '95%' : '1100px',
          top: isMobile ? '230px' : '280px',
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
                  flex: isMobile ? 'unset' : '1',
                  width: '100%',
                  order: isMobile ? 1 : 'unset'
                }}
              >
                {/* Title */}
                <motion.h3 
                  variants={contentVariants}
                  className={poppins.className}
                  style={{
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
                  className={lato.className}
                  style={{
                    fontWeight: '400',
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
                      }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                        </svg>
                      </div>
                      <p className={lato.className} style={{
                        fontWeight: '400',
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
                  flex: isMobile ? 'unset' : '1',
                  width: '100%',
                  height: isMobile ? '200px' : '350px',
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  order: isMobile ? 2 : 'unset',
                  marginBottom: isMobile ? '40px' : '0' // Added gap after the image on mobile
                }}
              >
                <Image 
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].imageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                
                {/* Subtle overlay gradient for better text contrast if needed */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '40%',
                  pointerEvents: 'none'
                }}/>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Add global style for hiding scrollbar */}
        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default TrustSection;
'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const TrustSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
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
      image: "/website-mockups.png",
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
    return `${activeTab * 20}%`;
  };

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Head>
        {/* Import Poppins and Lato fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Lato:wght@600&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
        position: 'relative',
        width: '100%',
        height: '700px', // Reduced height to fit above the fold
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Main Heading - Now centered */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            width: '100%',
            left: '-10%',
            top: '40px', // Moved up to fit in viewport
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '48px', // Slightly reduced for better spacing
            lineHeight: '56px',
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
            fontSize: '48px', // Slightly reduced for better spacing
            lineHeight: '56px',
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
          maxWidth: '1100px',
          left: '50%',
          top: '180px',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          {/* Tab Container */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '20px'
          }}>
            {/* Sliding Indicator - Moves based on active tab */}
            <motion.div 
              initial={false}
              animate={{
                left: getIndicatorPosition(),
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              style={{
                position: 'absolute',
                width: '20%',
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
                  width: '19%',
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 1
                }}
              >
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  fontSize: '20px',
                  lineHeight: '26px',
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
              </div>
            ))}
          </div>
        </div>

        {/* Blue Line */}
        <div style={{
          position: 'absolute',
          width: '1100px',
          height: '4px',
          left: '50%',
          top: '250px',
          transform: 'translateX(-50%)',
          background: '#0D98BA',
          borderRadius: '10px'
        }}></div>

        {/* Content Container - Cleaner layout */}
        <div style={{
          position: 'absolute',
          width: '100%',
          maxWidth: '1100px',
          top: '280px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
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
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '40px'
              }}
            >
              {/* Left Content */}
              <motion.div 
                variants={contentVariants}
                style={{
                  flex: '1'
                }}
              >
                {/* Title */}
                <motion.h3 
                  variants={contentVariants}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: '24px',
                    lineHeight: '30px',
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
                    fontSize: '16px',
                    lineHeight: '24px',
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
                        marginRight: '12px'
                      }}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                        </svg>
                      </div>
                      <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '22px',
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

              {/* Right Content - Website Mockups */}
              <motion.div
                variants={imageVariants} 
                style={{
                  flex: '1',
                  aspectRatio: '16/9',
                  maxHeight: '350px',
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                <Image 
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].imageAlt}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default TrustSection;
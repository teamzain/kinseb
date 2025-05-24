'use client';
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Poppins, Lato } from 'next/font/google';
import { services, ServiceData } from '@/app/components/serviceData'; // Adjust import path as needed

// Configure the fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

interface TrustSectionProps {
  category?: 'design' | 'development' | 'seo';
  title?: string;
  subtitle?: string;
  enableServiceLinks?: boolean; // New prop to enable/disable service links
}

interface TabData {
  id: number;
  serviceId: string; // Add serviceId for linking
  title: string;
  heading: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  structuredData: {
    "@type": string;
    "name": string;
    "description": string;
    "provider": {
      "@type": string;
      "name": string;
    };
  };
}

const TrustSection: React.FC<TrustSectionProps> = ({ 
  category = 'design',
  title,
  subtitle,
  enableServiceLinks = true // Default to true
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter services based on category
  const getFilteredServices = (): ServiceData[] => {
    switch (category) {
      case 'design':
        return services.filter(service => 
          service.id.includes('design') || 
          service.id === 'branding' ||
          service.id === 'ui-ux-design'
        );
      case 'development':
        return services.filter(service => 
          service.id.includes('development') || 
          service.id.includes('webapp') ||
          service.id.includes('ecommerce-development') ||
          service.id.includes('shopify') ||
          service.id.includes('wordpress') ||
          service.id.includes('pos') ||
          service.id.includes('backend') ||
          service.id.includes('custom-software')
        );
      case 'seo':
        return services.filter(service => 
          service.id.includes('seo') || 
          service.id.includes('content-strategy') ||
          service.id.includes('keyword')
        );
      default:
        return services.slice(0, 5); // Fallback to first 5 services
    }
  };

  // Convert ServiceData to TabData format
  const convertToTabData = (serviceData: ServiceData[], category: string): TabData[] => {
    return serviceData.slice(0, 5).map((service, index) => ({
      id: index,
      serviceId: service.id, // Store the service ID for linking
      title: service.title.replace(' Services', '').replace(/\s+/g, '\n'),
      heading: service.description,
      description: service.longDescription,
      features: service.features.slice(0, 3), // Take first 3 features
      image: service.image,
      imageAlt: `${service.title} mockups and examples`,
      structuredData: {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "Kinseb Web Development"
        }
      }
    }));
  };

  // Get dynamic tabs based on category
  const tabs = convertToTabData(getFilteredServices(), category);

  // Dynamic titles based on category
  const getDefaultTitle = () => {
    switch (category) {
      case 'design':
        return 'Why Clients Trust';
      case 'development':
        return 'Why Clients Choose';
      case 'seo':
        return 'Why Clients Rely On';
      default:
        return 'Why Clients Trust';
    }
  };

  const getDefaultSubtitle = () => {
    switch (category) {
      case 'design':
        return 'Kinseb Design Services';
      case 'development':
        return 'Kinseb Development Solutions';
      case 'seo':
        return 'Kinseb SEO Expertise';
      default:
        return 'Kinseb Web Development';
    }
  };

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
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
        
        container.scrollTo({
          left: tabPosition - (containerWidth / 2) + (tabWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab, windowWidth]);
  
  // Hide scroll hint after user interaction
  useEffect(() => {
    if (windowWidth < 768) {
      if (activeTab !== 0) {
        setShowScrollHint(false);
      }
      
      const handleScroll = () => {
        if (showScrollHint) {
          setShowScrollHint(false);
        }
      };
      
      const container = tabsContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }
  }, [activeTab, showScrollHint, windowWidth]);
  
  // Automatically hide scroll hint after 5 seconds
  useEffect(() => {
    if (windowWidth < 768 && showScrollHint) {
      const timer = setTimeout(() => {
        setShowScrollHint(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showScrollHint, windowWidth]);
  
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

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
        ease: [0.25, 0.1, 0.25, 1.0],
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

  const scrollHintVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: [0.4, 0.9, 0.4], 
      x: [0, 10, 0],
      transition: { 
        opacity: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        },
        x: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }
      }
    }
  };

  // Determine if content should be reversed based on tab id
  const isContentReversed = activeTab % 2 !== 0;
  
  // Set up refs array when tabs change
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  // Generate structured data for JSON-LD
  const generateStructuredData = () => {
    const servicesData = tabs.map(tab => tab.structuredData);
    
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kinseb Web Development",
      "url": "https://www.kinseb.com/",
      "logo": "https://www.kinseb.com/logo.png",
      "description": `Professional ${category} services including ${tabs.map(t => t.structuredData.name.toLowerCase()).join(', ')}.`,
      "sameAs": [
        "https://www.facebook.com/kinsebweb",
        "https://www.linkedin.com/company/kinseb",
        "https://twitter.com/kinsebweb"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${category.charAt(0).toUpperCase() + category.slice(1)} Services`,
        "itemListElement": servicesData
      }
    };
    
    return JSON.stringify(organizationData);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        
        <title>{`Professional ${category.charAt(0).toUpperCase() + category.slice(1)} Services | Kinseb Web Development`}</title>
        <meta name="description" content={`Kinseb Web Development offers professional ${category} services that clients trust. ${tabs.map(t => t.structuredData.name).join(', ')} and more.`} />
        <meta name="keywords" content={`${category}, ${tabs.map(t => t.structuredData.name.toLowerCase()).join(', ')}, web development`} />
        
        <meta property="og:title" content={`Professional ${category.charAt(0).toUpperCase() + category.slice(1)} Services | Kinseb Web Development`} />
        <meta property="og:description" content={`Professional ${category} services that clients trust. Transform your online presence today.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.kinseb.com/services/${category}`} />
        <meta property="og:image" content="https://www.kinseb.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Professional ${category.charAt(0).toUpperCase() + category.slice(1)} Services | Kinseb`} />
        <meta name="twitter:description" content={`Professional ${category} services that clients trust.`} />
        <meta name="twitter:image" content="https://www.kinseb.com/twitter-card.jpg" />
        
        <link rel="canonical" href={`https://www.kinseb.com/services/${category}`} />
        
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
      </Head>
      
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? '950px' : '750px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Main Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: isMobile ? '30px' : '40px',
            padding: '0 12px',
            marginBottom: '0',
            boxSizing: 'border-box',
            zIndex: 5,
            maxWidth: '100%'
          }}
        >
          <h1 className={poppins.className} style={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '28px' : '48px',
            lineHeight: isMobile ? '38px' : '56px',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0',
          }}>
            {title || getDefaultTitle()} <span style={{ color: '#0D98BA' }}>Trust</span>
          </h1>
          <h2 className={poppins.className} style={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: isMobile ? '25px' : '48px',
            lineHeight: isMobile ? '36px' : '56px',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginTop: '4px',
            marginBottom: '16px',
            display: 'block',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            padding: '0 10px',
          }}>
            {subtitle || getDefaultSubtitle()}
          </h2>
        </motion.div>

        {/* Navigation Tabs with Sliding Indicator */}
        <div style={{
          position: 'absolute',
          width: '100%',
          maxWidth: isMobile ? '95%' : '1100px',
          left: '50%',
          top: isMobile ? '165px' : '220px',
          transform: 'translateX(-50%)',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          {/* Tab Container */}
          {isMobile ? (
            // Mobile: Scrollable tabs with scroll hint
            <div style={{ position: 'relative' }}>
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
                  paddingBottom: '5px',
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
                    height: '74px',
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
                      height: '74px',
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
                          bottom: '60px',
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
                
              {/* Forward-only scroll hint for mobile */}
              {showScrollHint && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  top: '25px',
                  pointerEvents: 'none',
                  zIndex: 3
                }}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={scrollHintVariants}
                    style={{
                      position: 'absolute',
                      right: '0',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(13, 152, 186, 0.8)',
                      padding: '4px 8px',
                      borderRadius: '8px 0 0 8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              )}
                
              {/* Subtle gradient overlays to indicate more content */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '20px',
                background: 'linear-gradient(90deg, rgba(4, 9, 29, 0.8) 0%, rgba(4, 9, 29, 0) 100%)',
                pointerEvents: 'none',
                zIndex: 2
              }}></div>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: '20px',
                background: 'linear-gradient(270deg, rgba(4, 9, 29, 0.8) 0%, rgba(4, 9, 29, 0) 100%)',
                pointerEvents: 'none',
                zIndex: 2
              }}></div>
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
          top: isMobile ? '238px' : '290px',
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
          top: isMobile ? '262px' : '320px',
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
                gap: isMobile ? '36px' : '40px'
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
                    fontSize: isMobile ? '22px' : '24px',
                    lineHeight: isMobile ? '28px' : '30px',
                    color: '#0D98BA',
                    margin: '0 0 18px 0'
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
                    fontSize: isMobile ? '16px' : '16px',
                    lineHeight: isMobile ? '26px' : '24px',
                    letterSpacing: '-0.01em',
                    color: '#FFFFFF',
                    marginBottom: '28px',
                    paddingRight: isMobile ? '0' : '10px'
                  }}
                >
                  {tabs[activeTab].description}
                </motion.p>

                {/* Features List */}
                <motion.div 
                  variants={contentVariants}
                  style={{
                    marginTop: '24px'
                  }}
                >
                  {tabs[activeTab].features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={featureVariants}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: index < tabs[activeTab].features.length - 1 ? '16px' : '0'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: '14px',
                        marginTop: '2px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                        </svg>
                      </div>
                      <p className={lato.className} style={{
                        fontWeight: '400',
                        fontSize: isMobile ? '15px' : '16px',
                        lineHeight: isMobile ? '22px' : '22px',
                        letterSpacing: '-0.01em',
                        color: '#FFFFFF',
                        margin: '0'
                      }}>
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Learn More Button - Always show for every service */}
                <motion.div
                  variants={contentVariants}
                  style={{
                    marginTop: '32px'
                  }}
                >
                  <Link 
                    href={`/services/${tabs[activeTab].serviceId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 8px 25px rgba(13, 152, 186, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        duration: 0.2,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }}
                      className={poppins.className}
                      style={{
                        background: 'linear-gradient(135deg, #0D98BA 0%, #0A7A94 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: isMobile ? '14px 28px' : '16px 32px',
                        fontWeight: '600',
                        fontSize: isMobile ? '14px' : '16px',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 15px rgba(13, 152, 186, 0.2)',
                        width: 'fit-content'
                      }}
                    >
                      Learn More
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image Content - Always clickable */}
              <motion.div
                variants={imageVariants} 
                style={{
                  flex: isMobile ? 'unset' : '1',
                  width: '100%',
                  height: isMobile ? '240px' : '350px',
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  order: isMobile ? 0 : 'unset',
                  marginBottom: isMobile ? '6px' : '0',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = `/services/${tabs[activeTab].serviceId}`;
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Image 
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].imageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                
                {/* Clickable overlay for better UX - Always visible */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(13, 152, 186, 0)',
                  transition: 'background 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(13, 152, 186, 0.1)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(13, 152, 186, 0)';
                  e.currentTarget.style.opacity = '0';
                }}
                >
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M7 17L17 7M17 7H7M17 7V17" 
                        stroke="#0D98BA" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                
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
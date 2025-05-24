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
  enableServiceLinks?: boolean;
}

interface TabData {
  id: number;
  serviceId: string;
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
  enableServiceLinks = true
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
        return services.slice(0, 5);
    }
  };

  // Function to format tab title for better display
  const formatTabTitle = (title: string): string => {
    const cleanTitle = title.replace(' Services', '').trim();
    const words = cleanTitle.split(' ');
    
    if (words.length <= 2) {
      // 1-2 words: show in one line
      return words.join(' ');
    } else if (words.length === 3) {
      // 3 words: show in one line if short enough, otherwise split
      const totalLength = cleanTitle.length;
      if (totalLength <= 20) {
        return words.join(' ');
      } else {
        return `${words[0]} ${words[1]}\n${words[2]}`;
      }
    } else {
      // 4+ words: split intelligently
      const midPoint = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, midPoint).join(' ');
      const secondLine = words.slice(midPoint).join(' ');
      return `${firstLine}\n${secondLine}`;
    }
  };

  // Convert ServiceData to TabData format
  const convertToTabData = (serviceData: ServiceData[], category: string): TabData[] => {
    return serviceData.slice(0, 5).map((service, index) => ({
      id: index,
      serviceId: service.id,
      title: formatTabTitle(service.title),
      heading: service.description,
      description: service.longDescription,
      features: service.features.slice(0, 3),
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

  // Enhanced responsive breakpoints
  const getBreakpoint = () => {
    if (windowWidth < 480) return 'xs';
    if (windowWidth < 768) return 'sm';
    if (windowWidth < 1024) return 'md';
    if (windowWidth < 1280) return 'lg';
    return 'xl';
  };

  const breakpoint = getBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';

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
    if (isMobile && tabsContainerRef.current) {
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
  }, [activeTab, isMobile]);
  
  // Hide scroll hint after user interaction
  useEffect(() => {
    if (isMobile) {
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
  }, [activeTab, showScrollHint, isMobile]);
  
  // Automatically hide scroll hint after 5 seconds
  useEffect(() => {
    if (isMobile && showScrollHint) {
      const timer = setTimeout(() => {
        setShowScrollHint(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showScrollHint, isMobile]);

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
    
    // Dynamic tab width based on screen size
    const tabWidth = breakpoint === 'xs' ? 140 : 160;
    const tabSpacing = 8;
    
    return {
      left: `${(activeTab * (tabWidth + tabSpacing * 2)) + tabSpacing}px`,
      width: `${tabWidth}px`
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

  // Responsive sizing functions
  const getContainerHeight = () => {
    switch (breakpoint) {
      case 'xs': return '1000px';
      case 'sm': return '950px';
      case 'md': return '850px';
      case 'lg': return '800px';
      default: return '800px';
    }
  };

  const getHeadingTop = () => {
    switch (breakpoint) {
      case 'xs': return '20px';
      case 'sm': return '30px';
      case 'md': return '35px';
      default: return '40px';
    }
  };

  const getTabsTop = () => {
    switch (breakpoint) {
      case 'xs': return '140px';
      case 'sm': return '165px';
      case 'md': return '200px';
      default: return '220px';
    }
  };

  const getContentTop = () => {
    switch (breakpoint) {
      case 'xs': return '240px';
      case 'sm': return '262px';
      case 'md': return '300px';
      default: return '320px';
    }
  };

  const getImageHeight = () => {
    switch (breakpoint) {
      case 'xs': return '200px';
      case 'sm': return '240px';
      case 'md': return '300px';
      case 'lg': return '350px';
      default: return '4000px';
    }
  };

  const getTabWidth = () => {
    return breakpoint === 'xs' ? '140px' : '160px';
  };

  const getFontSizes = () => {
    return {
      mainTitle: {
        xs: '24px',
        sm: '28px',
        md: '36px',
        lg: '44px',
        xl: '48px'
      }[breakpoint],
      subtitle: {
        xs: '21px',
        sm: '25px',
        md: '32px',
        lg: '44px',
        xl: '48px'
      }[breakpoint],
      tabTitle: {
        xs: '14px',
        sm: '16px',
        md: '18px',
        lg: '20px',
        xl: '20px'
      }[breakpoint],
      contentTitle: {
        xs: '20px',
        sm: '22px',
        md: '23px',
        lg: '24px',
        xl: '24px'
      }[breakpoint],
      description: {
        xs: '15px',
        sm: '16px',
        md: '16px',
        lg: '16px',
        xl: '16px'
      }[breakpoint],
      feature: {
        xs: '14px',
        sm: '15px',
        md: '15px',
        lg: '16px',
        xl: '16px'
      }[breakpoint]
    };
  };

  const fonts = getFontSizes();

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
        minHeight: getContainerHeight(),
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
            top: getHeadingTop(),
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
            fontSize: fonts.mainTitle,
            lineHeight: `calc(${fonts.mainTitle} + 8px)`,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: '0',
          }}>
            {title || getDefaultTitle()} <span style={{ color: '#0D98BA' }}>Trust</span>
          </h1>
          <h2 className={poppins.className} style={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: fonts.subtitle,
            lineHeight: `calc(${fonts.subtitle} + 8px)`,
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
          top: getTabsTop(),
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
                {tabs.map((tab, index) => {
                  const tabWidth = getTabWidth();
                  return (
                    <div 
                      key={tab.id}
                      ref={(el: HTMLDivElement | null) => { tabRefs.current[index] = el }}
                      onClick={() => setActiveTab(tab.id)}
                      className="tab-item"
                      style={{
                        position: 'relative',
                        width: tabWidth,
                        minWidth: tabWidth,
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
                        fontSize: fonts.tabTitle,
                        lineHeight: `calc(${fonts.tabTitle} + 6px)`,
                        textAlign: 'center',
                        letterSpacing: '-0.03em',
                        color: tab.id === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                        margin: '0',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'pre-line',
                        padding: '0 4px'
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
                  );
                })}
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
                    fontSize: fonts.tabTitle,
                    lineHeight: `calc(${fonts.tabTitle} + 6px)`,
                    textAlign: 'center',
                    letterSpacing: '-0.03em',
                    color: tab.id === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                    margin: '0',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'pre-line',
                    padding: '0 8px'
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
          top: `calc(${getTabsTop()} + 78px)`,
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
          top: getContentTop(),
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
                gap: isMobile ? '36px' : isTablet ? '30px' : '40px'
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
                    fontSize: fonts.contentTitle,
                    lineHeight: `calc(${fonts.contentTitle} + 6px)`,
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
                    fontSize: fonts.description,
                    lineHeight: `calc(${fonts.description} + ${breakpoint === 'xs' ? '11px' : '8px'})`,
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
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.6 13.5L5 9.9L6.4 8.5L8.6 10.7L13.6 5.7L15 7.1L8.6 13.5Z" fill="#0D98BA"/>
                        </svg>
                      </div>
                      <p className={lato.className} style={{
                        fontWeight: '400',
                        fontSize: fonts.feature,
                        lineHeight: `calc(${fonts.feature} + 7px)`,
                        letterSpacing: '-0.01em',
                        color: '#FFFFFF',
                        margin: '0',
                        flex: 1
                      }}>
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Learn More Button */}
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
                        padding: isMobile ? 
                          (breakpoint === 'xs' ? '12px 24px' : '14px 28px') : 
                          '16px 32px',
                        fontWeight: '600',
                        fontSize: isMobile ? 
                          (breakpoint === 'xs' ? '13px' : '14px') : 
                          '16px',
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
                        width={isMobile ? '14' : '16'} 
                        height={isMobile ? '14' : '16'} 
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

              {/* Image Content - Enhanced for better fitting */}
              <motion.div
                variants={imageVariants} 
                style={{
                  flex: isMobile ? 'unset' : '1',
                  width: '100%',
                  height: getImageHeight(),
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  order: isMobile ? 0 : 'unset',
                  marginBottom: isMobile ? '6px' : '0',
                  cursor: 'pointer',
            // Fallback background
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
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
                {/* Enhanced Image with better fitting */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 152, 186, 0.05) 0%, rgba(13, 152, 186, 0.1) 100%)'
                }}>
                  <Image 
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].imageAlt}
                    fill
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.3s ease'
                    }}
                    sizes={`(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw`}
                    priority
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyDzRQhgWVsIzNmb5qJ//Z"
                  />
                  
                  {/* Image Loading State */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    color: '#0D98BA',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Loading...
                  </div>
                </div>
                
                {/* Enhanced Clickable overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(13, 152, 186, 0)',
                  transition: 'all 0.3s ease',
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
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '50%',
                    width: isMobile ? '50px' : '60px',
                    height: isMobile ? '50px' : '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <svg 
                      width={isMobile ? "20" : "24"} 
                      height={isMobile ? "20" : "24"} 
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
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Add global style for hiding scrollbar and image optimization */}
        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* Image optimization styles */
          img[data-nimg="fill"] {
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          
          /* Responsive image container hover effects */
          .image-container:hover img[data-nimg="fill"] {
            transform: scale(1.05);
          }
          
          /* Better text wrapping for small screens */
          @media (max-width: 480px) {
            h1, h2, h3 {
              word-wrap: break-word;
              hyphens: auto;
            }
          }
          
          /* Smooth scrolling for tab container */
          .hide-scrollbar {
            scroll-behavior: smooth;
          }
          
          /* Enhanced focus states for accessibility */
          button:focus-visible,
          .tab-item:focus-visible {
            outline: 2px solid #0D98BA;
            outline-offset: 2px;
          }
        `}</style>
      </div>
    </>
  );
};

export default TrustSection;
'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Service {
  id: string;
  title: string;
  heading: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

interface TrustData {
  trustSection: {
    header: {
      title: string;
      brandName: string;
    };
    services: Service[];
  };
}

interface TrustSectionProps {
  excludeServiceId?: number; // Optional prop to exclude a specific service ID
}

const TrustSection: React.FC<TrustSectionProps> = ({ excludeServiceId }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);
  const [trustData, setTrustData] = useState<TrustData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Load JSON data
  useEffect(() => {
    const loadTrustData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from public directory (Next.js/React standard)
        let response = await fetch('/data/trustsection.json');
        
        // If that fails, try alternative paths
        if (!response.ok) {
          response = await fetch('./data/trustsection.json');
        }
        
        if (!response.ok) {
          response = await fetch('');
        }
        
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
        }
        
        const data: TrustData = await response.json();
        if (!data.trustSection || !data.trustSection.services || data.trustSection.services.length === 0) {
          throw new Error('Invalid data structure in JSON file');
        }
        
        setTrustData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading trust data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
        setLoading(false);
      }
    };
    
    loadTrustData();
  }, []);
  
  // Filter services whenever trustData or excludeServiceId changes
  useEffect(() => {
    if (trustData?.trustSection?.services) {
      let filtered: Service[] = [];
      
      if (excludeServiceId !== undefined) {
        // Check if the excludeServiceId exists in the services
        const serviceExists = trustData.trustSection.services.some(service => service.id === excludeServiceId);
        
        if (serviceExists) {
          // Exclude the specific service and show all others
          filtered = trustData.trustSection.services.filter(service => service.id !== excludeServiceId);
        } else {
          // If the ID doesn't match any service, show first 5 services
          filtered = trustData.trustSection.services.slice(0, 5);
        }
      } else {
        // If no excludeServiceId is provided, show first 5 services
        filtered = trustData.trustSection.services.slice(0, 5);
      }
      
      setFilteredServices(filtered);
      
      // Reset activeTab if current selection is out of bounds
      if (filtered.length > 0 && activeTab >= filtered.length) {
        setActiveTab(0);
      }
    }
  }, [trustData, excludeServiceId, activeTab]);
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Scroll to center the active tab on mobile when active tab changes
  useEffect(() => {
    if (windowWidth < 768 && tabsContainerRef.current && filteredServices.length > 0) {
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
  }, [activeTab, windowWidth, filteredServices]);
  
  // Hide scroll hint after user interaction
  useEffect(() => {
    if (windowWidth < 768) {
      // Hide hint when tab changes (user engaged with tabs)
      if (activeTab !== 0) {
        setShowScrollHint(false);
      }
      
      // Hide hint when user scrolls manually
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

  // Handle See Service button click
  const handleSeeService = (serviceId: number) => {
    // Navigate to service detail page
    if (typeof window !== 'undefined') {
      window.location.href = `/services/${serviceId}`;
    }
  };
  
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
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

  // Calculate the position for the sliding indicator
  const getIndicatorPosition = () => {
    return `${activeTab * (100 / filteredServices.length)}%`;
  };

  // Determine if content should be reversed based on tab id
  const isContentReversed = activeTab % 2 !== 0;
  
  // Set up refs array when filtered services change
  useEffect(() => {
    if (filteredServices.length > 0) {
      tabRefs.current = tabRefs.current.slice(0, filteredServices.length);
    }
  }, [filteredServices]);

  // Early return if no services after filtering
  if (!loading && !error && filteredServices.length === 0) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '200px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          color: '#FFFFFF', 
          fontSize: '18px',
          textAlign: 'center'
        }}>
          No services available to display
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          color: '#FF6B6B', 
          fontSize: '18px', 
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          ⚠️ Error Loading Data
        </div>
        <div style={{ 
          color: '#FFFFFF', 
          fontSize: '14px',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          {error}
        </div>
        <div style={{ 
          color: '#FFFFFF', 
          fontSize: '12px', 
          marginTop: '10px',
          textAlign: 'center',
          opacity: 0.7
        }}>
          Make sure trustsection.json is in your public/data/ folder
        </div>
      </div>
    );
  }

  // Loading state
  if (loading || !trustData) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          color: '#FFFFFF', 
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #0D98BA',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading Trust Section...
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const currentService = filteredServices[activeTab];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: isMobile ? '1000px' : '740px',
      background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
      padding: '0',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Main Heading */}
      <div style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        top: isMobile ? '30px' : '40px',
        padding: '0 12px',
        marginBottom: '0',
        boxSizing: 'border-box',
        zIndex: 5,
        maxWidth: '100%'
      }}>
        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          fontSize: isMobile ? '28px' : '48px',
          lineHeight: isMobile ? '38px' : '56px',
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          margin: '0',
        }}>
          {trustData.trustSection.header.title} <span style={{ color: '#0D98BA' }}>Trust</span>
        </h1>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
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
          {trustData.trustSection.header.brandName}
        </h2>
      </div>

      {/* Navigation Tabs */}
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
        {isMobile ? (
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
              <div 
                style={{
                  position: 'absolute',
                  height: '74px',
                  background: 'rgba(13, 152, 186, 0.15)',
                  borderRadius: '10px 10px 0px 0px',
                  bottom: 0,
                  zIndex: 0,
                  left: getMobileIndicatorStyles().left,
                  width: getMobileIndicatorStyles().width,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              {/* Mobile Tabs */}
              {filteredServices.map((service, index) => (
                <div 
                  key={service.id}
                  ref={(el: HTMLDivElement | null) => { tabRefs.current[index] = el; }}
                  onClick={() => setActiveTab(index)}
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
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    letterSpacing: '-0.03em',
                    color: index === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                    margin: '0',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'pre-line'
                  }}>
                    {service.title}
                  </h3>
                  
                  {index === activeTab && (
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
              
            {/* Forward scroll hint for mobile */}
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
                <div style={{
                  position: 'absolute',
                  right: '0',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(13, 152, 186, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '8px 0 0 8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}
              
            {/* Gradient overlays */}
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
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '20px'
          }}>
            {/* Sliding Indicator for Desktop */}
            <div 
              style={{
                position: 'absolute',
                width: `${100 / filteredServices.length}%`,
                height: '70px',
                background: 'rgba(13, 152, 186, 0.15)',
                borderRadius: '10px 10px 0px 0px',
                bottom: 0,
                zIndex: 0,
                left: getIndicatorPosition(),
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
            
            {/* Desktop Tabs */}
            {filteredServices.map((service, index) => (
              <div 
                key={service.id}
                ref={(el: HTMLDivElement | null) => { tabRefs.current[index] = el; }}
                onClick={() => setActiveTab(index)}
                style={{
                  position: 'relative',
                  width: `${95 / filteredServices.length}%`,
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                  margin: '0 1%'
                }}
              >
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  fontSize: '20px',
                  lineHeight: '26px',
                  textAlign: 'center',
                  letterSpacing: '-0.03em',
                  color: index === activeTab ? '#0D98BA' : 'rgba(255, 255, 255, 0.7)',
                  margin: '0',
                  transition: 'color 0.3s ease',
                  whiteSpace: 'pre-line'
                }}>
                  {service.title}
                </h3>
                
                {index === activeTab && (
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
        {currentService && (
          <div
            key={`content-${activeTab}`}
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: isMobile ? 'column' : isContentReversed ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: isMobile ? '36px' : '40px',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.5s ease-in-out'
            }}
          >
            {/* Text Content */}
            <div style={{
              flex: isMobile ? 'unset' : '1',
              width: '100%',
              order: isMobile ? 1 : 'unset'
            }}>
              {/* Title */}
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: isMobile ? '22px' : '24px',
                lineHeight: isMobile ? '28px' : '30px',
                color: '#0D98BA',
                margin: '0 0 18px 0'
              }}>
                {currentService.heading}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: '400',
                fontSize: isMobile ? '16px' : '16px',
                lineHeight: isMobile ? '26px' : '24px',
                letterSpacing: '-0.01em',
                color: '#FFFFFF',
                marginBottom: '28px',
                paddingRight: isMobile ? '0' : '10px'
              }}>
                {currentService.description}
              </p>

              {/* Features List */}
              <div style={{
                marginTop: '24px',
                marginBottom: '24px'
              }}>
                {currentService.features.map((feature, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: index < currentService.features.length - 1 ? '16px' : '0',
                      opacity: 1,
                      transform: 'translateX(0)',
                      transition: `all 0.5s ease-in-out ${index * 0.1}s`
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
                    <p style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: '400',
                      fontSize: isMobile ? '15px' : '16px',
                      lineHeight: isMobile ? '22px' : '22px',
                      letterSpacing: '-0.01em',
                      color: '#FFFFFF',
                      margin: '0'
                    }}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* See Service Button */}
              <div style={{
                marginTop: '32px'
              }}>
                <button
                  onClick={() => handleSeeService(currentService.id)}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: isMobile ? '14px' : '16px',
                    lineHeight: '20px',
                    color: '#FFFFFF',
                    backgroundColor: '#0D98BA',
                    
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(13, 152, 186, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0B7FA1';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 152, 186, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0D98BA';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 152, 186, 0.3)';
                  }}
                >
                  See Service
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div style={{
              flex: isMobile ? 'unset' : '1',
              width: '100%',
              height: isMobile ? '240px' : '350px',
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              order: isMobile ? 0 : 'unset',
              marginBottom: isMobile ? '6px' : '0',
              backgroundColor: '#1a1a2e' // Fallback background
            }}>
              <img 
                src={currentService.image}
                alt={currentService.imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease-in-out'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              
              {/* Fallback for missing images */}
              <div 
                className="image-fallback"
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#2a2a3e',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#0D98BA',
                  fontSize: '18px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {currentService.title}
              </div>
              
              {/* Subtle overlay gradient */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%',
                pointerEvents: 'none'
              }}/>
            </div>
          </div>
        )}
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: translateX(0);
          }
          50% {
            opacity: 0.9;
            transform: translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default TrustSection;
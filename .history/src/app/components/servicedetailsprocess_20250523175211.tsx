'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
}

interface ProcessHeader {
  title: string;
  subtitle: string;
}

interface ServiceData {
  id: number;
  title: string;
  processSteps: ProcessStep[];
  processHeader: ProcessHeader;
}

interface WebDesignProcessProps {
  serviceId?: number;
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const WebDesignProcess: React.FC<WebDesignProcessProps> = ({ serviceId }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number | null>(null);
  
  // Get the current service ID from the URL params
  const params = useParams();
  const currentServiceId = useMemo(() => {
    return serviceId || (params?.id ? Number(params.id) : 1);
  }, [serviceId, params?.id]);
  
  // Duration for each step in milliseconds
  const STEP_DURATION = 3000;
  const LAST_STEP_DISPLAY_DURATION = 1000;

  // Load service data from JSON file
  useEffect(() => {
    const loadServiceData = async () => {
      try {
        setLoading(true);
        // Use relative path for public folder
        const response = await fetch('/data/services.json');
        if (!response.ok) {
          throw new Error('Failed to load services data');
        }
        const data = await response.json();
        
        const service = data.services.find((s: ServiceData) => s.id === currentServiceId);
        if (!service) {
          throw new Error(`Service with ID ${currentServiceId} not found`);
        }
        
        setServiceData(service);
        setError(null);
      } catch (err) {
        console.error('Error loading service data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadServiceData();
  }, [currentServiceId]);

  const processSteps: ProcessStep[] = serviceData?.processSteps || [];
  const TOTAL_DURATION = STEP_DURATION * processSteps.length;

  // Calculate which steps to show based on device
  const getVisibleSteps = useCallback(() => {
    const visibleSteps: { step: ProcessStep; index: number }[] = [];
    
    if (deviceType === 'mobile') {
      if (processSteps[currentIndex]) {
        visibleSteps.push({
          step: processSteps[currentIndex],
          index: currentIndex
        });
      }
    } else {
      if (currentIndex === 0) {
        if (processSteps[0]) {
          visibleSteps.push({
            step: processSteps[0],
            index: 0
          });
        }
        
        if (processSteps[1]) {
          visibleSteps.push({
            step: processSteps[1],
            index: 1
          });
        }
      } 
      else if (currentIndex === processSteps.length - 1 || currentIndex === processSteps.length - 2) {
        if (processSteps[processSteps.length - 2]) {
          visibleSteps.push({
            step: processSteps[processSteps.length - 2],
            index: processSteps.length - 2
          });
        }
        
        if (processSteps[processSteps.length - 1]) {
          visibleSteps.push({
            step: processSteps[processSteps.length - 1],
            index: processSteps.length - 1
          });
        }
      }
      else {
        if (processSteps[currentIndex]) {
          visibleSteps.push({
            step: processSteps[currentIndex],
            index: currentIndex
          });
        }
        
        if (currentIndex + 1 < processSteps.length && processSteps[currentIndex + 1]) {
          visibleSteps.push({
            step: processSteps[currentIndex + 1],
            index: currentIndex + 1
          });
        }
      }
    }
    
    return visibleSteps;
  }, [deviceType, currentIndex, processSteps]);

  // Check device type
  const checkDeviceType = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType('mobile');
    } else if (width >= 768 && width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  // Handle auto-scrolling animation
  const animateAutoScroll = useCallback((timestamp: number): void => {
    if (processSteps.length === 0) return;

    if (isHovered) {
      if (!pausedTimeRef.current) {
        pausedTimeRef.current = timestamp;
      }
      const frame = requestAnimationFrame(animateAutoScroll);
      setAnimationFrame(frame);
      return;
    } else if (pausedTimeRef.current) {
      if (animationStartTimeRef.current) {
        const pauseDuration = timestamp - pausedTimeRef.current;
        animationStartTimeRef.current += pauseDuration;
      }
      pausedTimeRef.current = null;
    }
    
    if (!animationStartTimeRef.current) {
      animationStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - (animationStartTimeRef.current || timestamp);
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    
    const stepIndex = Math.min(
      Math.floor(progress * processSteps.length),
      processSteps.length - 1
    );
    
    if (stepIndex === processSteps.length - 1) {
      if (!lastStepTimeRef.current) {
        lastStepTimeRef.current = timestamp;
        setCurrentIndex(processSteps.length - 1);
      } 
      else if (timestamp - lastStepTimeRef.current >= LAST_STEP_DISPLAY_DURATION) {
        animationStartTimeRef.current = timestamp;
        setCurrentIndex(0);
        lastStepTimeRef.current = null;
      }
    } else {
      lastStepTimeRef.current = null;
      
      if (stepIndex !== currentIndex) {
        setCurrentIndex(stepIndex);
      }
    }
    
    // Update progress bar
    const stepProgress = (progress * processSteps.length) % 1;
    let progressPct: number;
    
    if (deviceType === 'mobile') {
      const baseProgress = (stepIndex / (processSteps.length - 1)) * 100;
      const stepWidth = 100 / (processSteps.length - 1);
      progressPct = baseProgress + (stepProgress * stepWidth);
    } else {
      if (stepIndex === processSteps.length - 1) {
        progressPct = 100;
      } else {
        progressPct = 50 + (stepProgress * 50);
      }
    }
    
    const progressBar = document.querySelector('.progress-fill') as HTMLElement | null;
    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
    }
    
    const frame = requestAnimationFrame(animateAutoScroll);
    setAnimationFrame(frame);
  }, [processSteps.length, TOTAL_DURATION, isHovered, currentIndex, deviceType]);

  // Handle mouse events for specific elements
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    checkDeviceType();
    
    window.addEventListener('resize', checkDeviceType);
    
    if (processSteps.length > 0) {
      const frame = requestAnimationFrame(animateAutoScroll);
      setAnimationFrame(frame);
    }
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [checkDeviceType, animateAutoScroll, processSteps.length, animationFrame]);
  
  // Generate dot indicators
  const renderDotIndicators = () => {
    if (deviceType !== 'mobile') {
      return (
        <React.Fragment>
          <div
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#3DB4D0',
              top: '-5px',
              left: '0%',
              transform: 'translateX(0)',
              boxShadow: '0 0 10px rgba(61, 180, 208, 0.8)',
              zIndex: 2,
              margin: '0 20px',
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#3DB4D0',
              top: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(61, 180, 208, 0.8)',
              zIndex: 2,
              margin: '0 20px',
            }}
          />
        </React.Fragment>
      );
    }
    
    return processSteps.map((step: ProcessStep, index: number) => {
      const position = (index / (processSteps.length - 1)) * 100;
      
      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: index === currentIndex ? '14px' : '10px',
            height: index === currentIndex ? '14px' : '10px',
            borderRadius: '50%',
            backgroundColor: index <= currentIndex ? '#3DB4D0' : 'rgba(255, 255, 255, 0.4)',
            top: '-5px',
            left: `${position}%`,
            transform: 'translateX(-50%)',
            boxShadow: index === currentIndex ? '0 0 10px rgba(61, 180, 208, 0.8)' : 'none',
            zIndex: 2,
            transition: 'width 0.3s, height 0.3s, background-color 0.3s',
          }}
        />
      );
    });
  };

  // Get appropriate styles based on device type
  const getResponsiveStyles = () => {
    const baseStyles = {
      container: {
        height: 'auto',
        minHeight: '100vh',
        padding: '20px 0 40px'
      },
      header: {
        marginBottom: '10px'
      },
      headerTitle: {
        fontSize: '2.25rem',
        lineHeight: '1.2'
      },
      headerDesc: {
        fontSize: '1.125rem'
      },
      content: {
        marginTop: '0'
      },
      stepContainer: {
        flexDirection: 'column' as 'column',
        width: '100%',
        padding: '0 10px',
        marginBottom: '10px'
      },
      imageContainer: {
        width: '100%',
        display: 'flex' as 'flex',
        justifyContent: 'center' as 'center',
        marginBottom: '15px'
      },
      image: {
        width: '100%',
        maxWidth: '180px',
        height: 'auto' as 'auto',
        display: 'block' as 'block',
        marginTop: '0'
      },
      numberContainer: {
        paddingTop: '0',
        width: '100%',
      },
      number: {
        fontSize: '3rem',
        marginBottom: '4px',
        textAlign: 'left' as 'left'
      },
      title: {
        fontSize: '1.4rem',
        minHeight: '2rem',
        textAlign: 'left' as 'left'
      },
      description: {
        fontSize: '0.95rem',
        lineHeight: '1.4',
        marginTop: '7px',
        textAlign: 'left' as 'left'
      },
      bulletPoint: {
        fontSize: '0.95rem',
        marginBottom: '10px',
        paddingLeft: '20px'
      },
      progressContainer: {
        marginTop: '0',
        marginBottom: '5px'
      },
      progressLine: {
        margin: '0 15px'
      }
    };

    if (deviceType === 'tablet') {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          height: 'auto',
          padding: '40px 0 50px'
        },
        header: {
          marginBottom: '20px'
        },
        headerTitle: {
          fontSize: '2.5rem',
          lineHeight: '1.15'
        },
        content: {
          marginTop: '10px'
        },
        stepContainer: {
          ...baseStyles.stepContainer,
          flexDirection: 'row' as 'row',
          width: '50%',
          padding: '0 15px',
          marginBottom: '5px'
        },
        imageContainer: {
          ...baseStyles.imageContainer,
          width: 'auto',
          marginBottom: '0',
          justifyContent: 'flex-end' as 'flex-end'
        },
        image: {
          ...baseStyles.image,
          maxWidth: '150px',
          marginTop: '90px'
        },
        numberContainer: {
          ...baseStyles.numberContainer,
          paddingTop: '100px',
          textAlign: 'left' as 'left'
        },
        number: {
          ...baseStyles.number,
          fontSize: '3.5rem',
          marginBottom: '6px',
          textAlign: 'left' as 'left'
        },
        title: {
          ...baseStyles.title,
          fontSize: '1.6rem',
          minHeight: '3rem',
          textAlign: 'left' as 'left'
        },
        description: {
          ...baseStyles.description,
          fontSize: '1rem',
          lineHeight: '1.45',
          marginTop: '7px'
        },
        bulletPoint: {
          ...baseStyles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '9px',
          paddingLeft: '20px'
        },
        progressContainer: {
          ...baseStyles.progressContainer,
          marginTop: '-40px',
          marginBottom: '8px'
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    if (deviceType === 'desktop') {
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          height: '100vh',
          padding: '60px 0'
        },
        header: {
          marginBottom: '-100px'
        },
        headerTitle: {
          fontSize: '3rem',
          lineHeight: '1.1'
        },
        content: {
          marginTop: '10px'
        },
        stepContainer: {
          ...baseStyles.stepContainer,
          flexDirection: 'row' as 'row',
          width: '50%',
          padding: '0 20px',
          marginBottom: '0'
        },
        imageContainer: {
          ...baseStyles.imageContainer,
          width: 'auto',
          marginBottom: '0',
        },
        image: {
          ...baseStyles.image,
          width: '220px',
          maxWidth: '220px',
          marginTop: '100px'
        },
        numberContainer: {
          ...baseStyles.numberContainer,
          paddingTop: '140px',
          textAlign: 'left' as 'left'
        },
        number: {
          ...baseStyles.number,
          fontSize: '4rem',
          marginBottom: '8px',
          textAlign: 'left' as 'left'
        },
        title: {
          ...baseStyles.title,
          fontSize: '1.8rem',
          minHeight: '4rem',
          textAlign: 'left' as 'left'
        },
        description: {
          ...baseStyles.description,
          fontSize: '1rem',
          lineHeight: '1.5',
          marginTop: '30px'
        },
        bulletPoint: {
          ...baseStyles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '8px',
          paddingLeft: '10px'
        },
        progressContainer: {
          ...baseStyles.progressContainer,
          marginTop: '-60px',
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    return baseStyles;
  };

  const styles = getResponsiveStyles();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a2942',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading process steps...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a2942',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '10px' }}>Error Loading Process</h2>
        <p style={{ marginBottom: '20px' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#3DB4D0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!serviceData || !processSteps.length) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a2942',
        color: 'white'
      }}>
        No process steps found for this service
      </div>
    );
  }

  return (
    <div 
      className="design-process-section"
      style={{
        position: 'relative',
        width: '100%',
        height: deviceType === 'mobile' ? 'auto' : deviceType === 'tablet' ? 'auto' : '85vh',
      }}
    >
      <div 
        ref={containerRef}
        className="design-process-container"
        style={{
          width: '100%',
          height: styles.container.height,
          minHeight: styles.container.minHeight,
          background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #0a2942',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          padding: styles.container.padding,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header section */}
          <div 
            ref={headerRef}
            className="transition-all duration-300"
            style={{
              marginBottom: styles.header.marginBottom,
              textAlign: 'center',
            }}
          >
            <h1 
              className="font-bold mb-2"
              style={{
                fontSize: styles.headerTitle.fontSize,
                lineHeight: styles.headerTitle.lineHeight,
                textAlign: 'center',
                width: '100%'
              }}
            >
              {(serviceData.processHeader?.title || 'Our Design Process').replace(/Process$/, '')} <span style={{ color: '#3DB4D0' }}>Process</span>
            </h1>
            <p className="max-w-3xl mx-auto"
               style={{
                 fontSize: styles.headerDesc.fontSize,
                 textAlign: 'center',
                 width: '100%'
               }}
            >
              {serviceData.processHeader?.subtitle || 'From research to results — here\'s how we deliver exceptional results.'}
            </p>
          </div>
          
          {/* Main content wrapper */}
          <div 
            ref={contentRef}
            style={{
              marginTop: styles.content.marginTop,
            }}
          >
            {/* Content sections */}
            <div className="mb-2 mt-0">
              <div style={{ 
                display: 'flex',
                flexDirection: deviceType === 'mobile' ? 'column' : 'row',
                transition: 'all 0.5s ease'
              }}>
                {getVisibleSteps().map(({ step, index }, position) => (
                  <div 
                    key={index}
                    style={{
                      width: styles.stepContainer.width,
                      padding: styles.stepContainer.padding,
                      flexShrink: 0,
                      marginBottom: styles.stepContainer.marginBottom,
                      animation: `fade-in 0.5s ease-in-out`,
                    }}
                    className="content-step"
                  >
                    {/* For mobile: Image first */}
                    {deviceType === 'mobile' && (
                      <div 
                        style={{
                          width: styles.imageContainer.width,
                          display: styles.imageContainer.display,
                          justifyContent: styles.imageContainer.justifyContent,
                          marginBottom: styles.imageContainer.marginBottom,
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={step.image}
                          alt={`${step.title} illustration`}
                          style={{
                            width: styles.image.width,
                            maxWidth: styles.image.maxWidth,
                            height: styles.image.height,
                            display: styles.image.display,
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Number and Title */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      flexDirection: 'row'
                    }}>
                      {/* Left side: Number and Title */}
                      <div 
                        style={{ 
                          flex: '1', 
                          paddingTop: styles.numberContainer.paddingTop,
                          width: styles.numberContainer.width,
                        }}
                      >
                        {/* Number */}
                        <div
                          style={{
                            fontSize: styles.number.fontSize,
                            fontWeight: 'bold',
                            color: '#3DB4D0',
                            lineHeight: '1',
                            marginBottom: styles.number.marginBottom,
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {step.number}
                        </div>
                        
                        {/* Title */}
                        <h2
                          style={{
                            fontSize: styles.title.fontSize,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            maxWidth: '100%',
                            minHeight: styles.title.minHeight,
                            lineHeight: '1.2',
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {step.title}
                        </h2>
                      </div>
                      
                      {/* Right side: Image (only show on tablet and desktop) */}
                      {deviceType !== 'mobile' && (
                        <div 
                          style={{
                            marginLeft: '0px',
                            alignSelf: 'flex-start',
                            marginTop: '0',
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={step.image}
                            alt={`${step.title} illustration`}
                            style={{
                              marginTop: styles.image.marginTop,
                              width: deviceType === 'tablet' ? styles.image.maxWidth : styles.image.width,
                              maxWidth: styles.image.maxWidth,
                              height: 'auto',
                              display: 'block',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress line with dots */}
            <div style={{ 
              marginTop: styles.progressContainer.marginTop, 
              marginBottom: styles.progressContainer.marginBottom,
            }}>
              <div 
                style={{
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  borderRadius: '2px',
                  margin: styles.progressLine.margin,
                }}
              >
                <div
                  className="progress-fill"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: '#3DB4D0',
                    width: currentIndex === processSteps.length - 1 ? '100%' : 
                           deviceType === 'mobile' ? `${(currentIndex / (processSteps.length - 1)) * 100}%` : '50%',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px rgba(61, 180, 208, 0.7)',
                    transition: 'width 0.3s ease-out',
                  }}
                ></div>
                
                {renderDotIndicators()}
              </div>
            </div>
            
            {/* Description and bullet points */}
            <div className="mt-2">
              <div style={{ 
                display: 'flex',
                flexDirection: deviceType === 'mobile' ? 'column' : 'row'
              }}>
                {getVisibleSteps().map(({ step, index }, position) => (
                  <div 
                    key={index}
                    style={{
                      width: styles.stepContainer.width,
                      padding: styles.stepContainer.padding,
                      flexShrink: 0,
                      marginBottom: deviceType === 'mobile' ? '20px' : deviceType === 'tablet' ? '10px' : '0',
                      animation: `fade-in 0.5s ease-in-out`,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: deviceType === 'mobile' ? '100%' : '90%',
                        overflowWrap: 'break-word',
                        height: '100%',
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <p 
                        className="text-base mb-3"
                        style={{
                          fontSize: styles.description.fontSize,
                          lineHeight: styles.description.lineHeight,
                          marginTop: styles.description.marginTop,
                          textAlign: 'left'
                        }}
                      >
                        {step.description}
                      </p>
                      
                      <ul className={`bullet-list ${deviceType === 'mobile' ? 'mobile-bullets' : ''}`}>
                        {step.bulletPoints?.map((point: string, pointIndex: number) => (
                          <li
                            key={pointIndex}
                            style={{
                              fontSize: styles.bulletPoint.fontSize,
                              marginBottom: styles.bulletPoint.marginBottom,
                              paddingLeft: styles.bulletPoint.paddingLeft,
                              position: 'relative',
                              textAlign: 'left'
                            }}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS for animations and bullet styling */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .bullet-list {
            list-style-type: disc;
            padding-left: 8px;
            margin-top: 10px;
            margin-left: 17px;
            margin-bottom: 15px;
          }
          
          .bullet-list li {
            margin-left: -10px;
            padding-left: -3;
            margin-bottom: 6px;
          }
          
          .mobile-bullets {
            list-style-type: disc;
            padding-left: 0;
            text-align: left;
            margin-top: 10px;
            margin-left: 0;
            margin-bottom: 15px;
          }

          .mobile-bullets li {
            padding-left: 0;
            margin-left: 15px;
            margin-bottom: 8px;
          }
          .mobile-bullets li:before {
            display: inline-block;
            width: 0.5em;
            margin-right: 0.2em;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WebDesignProcess;
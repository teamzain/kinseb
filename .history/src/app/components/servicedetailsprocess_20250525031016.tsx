'use client';
import React, { useState, useEffect, useRef } from 'react';

// Define types for the service data structure
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
  alt?: string;
}

interface ProcessHeader {
  title: string;
  subtitle: string;
}

interface ServiceData {
  id: string;
  processSteps: ProcessStep[];
  processHeader: ProcessHeader;
}

interface WebDesignProcessProps {
  serviceId: string;
}

// Services data - you would typically import this from your data file
const servicesData: ServiceData[] = [
  {
    "id": "web-design",
    "processHeader": {
      "title": "Our Website Design Process",
      "subtitle": "From research to results — here's how we turn ideas into impactful websites."
    },
    "processSteps": [
      {
        "number": "01",
        "title": "Discovery & Research",
        "description": "We begin by understanding your business goals, target audience, and technical requirements to create a strategic foundation for your website.",
        "bulletPoints": [
          "Conduct stakeholder interviews and requirement gathering",
          "Research your target audience and user personas",
          "Analyze competitors and market trends",
          "Define project scope and success metrics"
        ],
        "image": "/images/processa12 1.png",
        "alt": "Discovery and Research process illustration showing business analysis and planning"
      },
      {
        "number": "02",
        "title": "Strategy & Structure",
        "description": "We utilize proven techniques to map your content, meet user intentions and create an engaging user experience. By outlining your site's structure, we ensure seamless user journeys to key conversion points.",
        "bulletPoints": [
          "Develop a base-level user flow & sitemap",
          "Utilize wireframing to create a seamless conversion funnel",
          "Add on-brand, consistent messaging to your structure"
        ],
        "image": "/images/step3.png",
        "alt": "Strategy and Structure process showing website wireframing and user flow mapping"
      },
      {
        "number": "03",
        "title": "Creative Design",
        "description": "This stage is where we take your site come to life. Our award-winning designers implement your unique branding elements to your custom web design.",
        "bulletPoints": [
          "Thoughtfully place design features to guide the user journey",
          "Utilize interactive videos & animations",
          "Create custom, branded illustrations",
          "Ensure accessibility & search engine optimization"
        ],
        "image": "/images/processa12 1.png",
        "alt": "Creative Design process showing custom web design and branding elements"
      },
      {
        "number": "04",
        "title": "Responsive Development",
        "description": "A responsive website is fast, accessible and easy to navigate. It automatically scales to various screen sizes and devices, driving user experience and climbing search engine rankings.",
        "bulletPoints": [
          "Transform your wireframes into a flexible UI",
          "Implement responsive design across all devices",
          "Optimize for speed and performance"
        ],
        "image": "/images/step4.png",
        "alt": "Responsive Development illustration showing mobile-first web development"
      },
      {
        "number": "05",
        "title": "Quality Assurance",
        "description": "All projects focus on delivering measurable results and professional outcomes. By following a strict quality assurance protocol, we guarantee a high-quality digital experience for your brand.",
        "bulletPoints": [
          "Actively involve our clients throughout every project",
          "Meticulously test all designs to catch errors",
          "Use tried and tested tools to ensure quality before launch"
        ],
        "image": "/images/step5.png",
        "alt": "Quality Assurance process showing comprehensive website testing and validation"
      },
      {
        "number": "06",
        "title": "Launch & Optimization",
        "description": "We launch your website with comprehensive optimization and provide ongoing support to ensure continued success and performance.",
        "bulletPoints": [
          "Deploy website to production environment",
          "Implement analytics and tracking",
          "Provide training and documentation",
          "Monitor performance and make adjustments"
        ],
        "image": "/images/step6.png",
        "alt": "Launch and Optimization illustration showing website deployment and optimization"
      }
    ]
  }
  // Add more services here as needed
];

const WebDesignProcess: React.FC<WebDesignProcessProps> = ({ serviceId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deviceType, setDeviceType] = useState('desktop');
  const [isHovered, setIsHovered] = useState(false);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number | null>(null);
  
  // Get service data based on serviceId
  const serviceData = servicesData.find(service => service.id === serviceId);
  
  // Fallback to default data if service not found
  const processSteps = serviceData?.processSteps || [];
  const processHeader = serviceData?.processHeader || {
    title: "Our Process",
    subtitle: "From research to results — here's how we turn ideas into impactful solutions."
  };
  
  // Early return if no process steps found
  if (!processSteps.length) {
    return (
      <div className="design-process-section" style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2>Process information not available for this service.</h2>
      </div>
    );
  }
  
  // Duration for each step in milliseconds
  const STEP_DURATION = 3000; 
  // Total animation duration
  const TOTAL_DURATION = STEP_DURATION * processSteps.length;
  // Time to show last step before resetting
  const LAST_STEP_DISPLAY_DURATION = 1000;

  // Calculate which steps to show based on device
  const getVisibleSteps = () => {
    const visibleSteps = [];
    
    if (deviceType === 'mobile') {
      // On mobile, show only the current step
      visibleSteps.push({
        step: processSteps[currentIndex],
        index: currentIndex
      });
    } else {
      // For tablet and desktop, show two steps at a time
      // For the first index, show steps 1 and 2
      if (currentIndex === 0) {
        visibleSteps.push({
          step: processSteps[0],
          index: 0
        });
        
        if (processSteps[1]) {
          visibleSteps.push({
            step: processSteps[1],
            index: 1
          });
        }
      } 
      // For the last step, always show steps n-1 and n together
      else if (currentIndex === processSteps.length - 1 || currentIndex === processSteps.length - 2) {
        if (processSteps[processSteps.length - 2]) {
          visibleSteps.push({
            step: processSteps[processSteps.length - 2],
            index: processSteps.length - 2
          });
        }
        
        visibleSteps.push({
          step: processSteps[processSteps.length - 1],
          index: processSteps.length - 1
        });
      }
      else {
        // For all other cases, show current and next step
        visibleSteps.push({
          step: processSteps[currentIndex],
          index: currentIndex
        });
        
        // Add the next step if available
        if (currentIndex + 1 < processSteps.length) {
          visibleSteps.push({
            step: processSteps[currentIndex + 1],
            index: currentIndex + 1
          });
        }
      }
    }
    
    return visibleSteps;
  };

  // Check device type
  const checkDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType('mobile');
    } else if (width >= 768 && width < 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  };

  // Handle auto-scrolling animation
  const animateAutoScroll = (timestamp: number): void => {
    // If we're hovering, pause the animation by storing the current timestamp
    if (isHovered) {
      if (!pausedTimeRef.current) {
        pausedTimeRef.current = timestamp;
      }
      // Keep the animation frame going but don't update anything
      const frame = requestAnimationFrame(animateAutoScroll);
      setAnimationFrame(frame);
      return;
    } else if (pausedTimeRef.current) {
      // Resume animation by adjusting the start time to account for the pause duration
      if (animationStartTimeRef.current) {
        const pauseDuration = timestamp - pausedTimeRef.current;
        animationStartTimeRef.current += pauseDuration;
      }
      pausedTimeRef.current = null;
    }
    
    // Initialize animation start time if needed
    if (!animationStartTimeRef.current) {
      animationStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - (animationStartTimeRef.current || timestamp);
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    
    // Calculate which step we should be on based on progress
    const stepIndex = Math.min(
      Math.floor(progress * processSteps.length),
      processSteps.length - 1
    );
    
    // When we reach the last step
    if (stepIndex === processSteps.length - 1) {
      // If we haven't recorded the time when we reached the last step yet
      if (!lastStepTimeRef.current) {
        lastStepTimeRef.current = timestamp;
        setCurrentIndex(processSteps.length - 1);
      } 
      // If we've been on the last step for the display duration
      else if (timestamp - lastStepTimeRef.current >= LAST_STEP_DISPLAY_DURATION) {
        // Reset animation to start from step 1
        animationStartTimeRef.current = timestamp;
        setCurrentIndex(0);
        lastStepTimeRef.current = null;
      }
    } else {
      // Reset the last step time reference when not on the last step
      lastStepTimeRef.current = null;
      
      // Only update the index if it's changed
      if (stepIndex !== currentIndex) {
        setCurrentIndex(stepIndex);
      }
    }
    
    // Update progress bar
    const stepProgress = (progress * processSteps.length) % 1;
    let progressPct;
    
    if (deviceType === 'mobile') {
      const baseProgress = (stepIndex / (processSteps.length - 1)) * 100;
      const stepWidth = 100 / (processSteps.length - 1);
      progressPct = baseProgress + (stepProgress * stepWidth);
    } else {
      // For tablet and desktop view, ensure the progress bar goes fully to 100% when on step 6
      if (stepIndex === processSteps.length - 1) {
        progressPct = 100; // Force to 100% on the last step
      } else {
        progressPct = deviceType === 'mobile' ? 
          ((stepIndex + stepProgress) / (processSteps.length - 1)) * 100 : 
          50 + (stepProgress * 50); // 50-100% range for tablet and desktop
      }
    }
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-fill') as HTMLElement | null;
    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
    }
    
    // Continue animation
    const frame = requestAnimationFrame(animateAutoScroll);
    setAnimationFrame(frame);
  };

  // Handle mouse events for specific elements
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Initial check for device type
    checkDeviceType();
    
    // Add event listener for resizing
    window.addEventListener('resize', checkDeviceType);
    
    // Start auto-scrolling animation
    const frame = requestAnimationFrame(animateAutoScroll);
    setAnimationFrame(frame);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [deviceType, isHovered, processSteps.length]);
  
  // Generate dot indicators
  const renderDotIndicators = () => {
    if (deviceType !== 'mobile') {
      // For tablet and desktop, just show the two dots as before
      return (
        <>
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
            aria-hidden="true"
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
            aria-hidden="true"
          />
        </>
      );
    }
    
    // On mobile, generate a dot for each step
    return processSteps.map((step, index) => {
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
          aria-hidden="true"
        />
      );
    });
  };

  // Get appropriate styles based on device type
  const getResponsiveStyles = () => {
    // Base styles for mobile first
    const styles = {
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
        flexDirection: 'column',
        width: '100%',
        padding: '0 10px',
        marginBottom: '10px'
      },
      imageContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px'
      },
      image: {
        width: '100%',
        maxWidth: '180px',
        height: 'auto',
        display: 'block',
        marginTop: '0'
      },
      numberContainer: {
        paddingTop: '0',
        width: '100%',
      },
      number: {
        fontSize: '3rem',
        marginBottom: '4px',
        textAlign: 'left'
      },
      title: {
        fontSize: '1.4rem',
        minHeight: '2rem',
        textAlign: 'left'
      },
      description: {
        fontSize: '0.95rem',
        lineHeight: '1.4',
        marginTop: '7px',
        textAlign: 'left'
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

    // Override for tablet
    if (deviceType === 'tablet') {
      return {
        ...styles,
        container: {
          ...styles.container,
          height: 'auto',
          padding: '40px 0 50px'
        },
        header: {
          marginBottom: '0px'
        },
        headerTitle: {
          fontSize: '2.5rem',
          lineHeight: '1.15'
        },
        content: {
          marginTop: '20px'
        },
        stepContainer: {
          ...styles.stepContainer,
          flexDirection: 'row',
          width: '50%',
          padding: '0 15px',
          marginBottom: '5px'
        },
        imageContainer: {
          ...styles.imageContainer,
          width: 'auto',
          marginBottom: '0',
          justifyContent: 'flex-end'
        },
        image: {
          ...styles.image,
          maxWidth: '150px',
          marginTop: '20px'
        },
        numberContainer: {
          ...styles.numberContainer,
          paddingTop: '100px',
          textAlign: 'left'
        },
        number: {
          ...styles.number,
          fontSize: '3.5rem',
          marginBottom: '6px',
          textAlign: 'left'
        },
        title: {
          ...styles.title,
          fontSize: '1.6rem',
          minHeight: '3rem',
          textAlign: 'left'
        },
        description: {
          ...styles.description,
          fontSize: '1rem',
          lineHeight: '1.45',
          marginTop: '7px'
        },
        bulletPoint: {
          ...styles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '9px',
          paddingLeft: '20px'
        },
        progressContainer: {
          ...styles.progressContainer,
          marginTop: '0px',
          marginBottom: '8px'
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    // Override for desktop
    if (deviceType === 'desktop') {
      return {
        ...styles,
        container: {
          ...styles.container,
          height: '100vh',
          padding: '60px 0'
        },
        header: {
          marginBottom: '0px'
        },
        headerTitle: {
          fontSize: '3rem',
          lineHeight: '1.1'
        },
        content: {
          marginTop: '10px'
        },
        stepContainer: {
          ...styles.stepContainer,
          flexDirection: 'row',
          width: '50%',
          padding: '0 20px',
          marginBottom: '0'
        },
        imageContainer: {
          ...styles.imageContainer,
          width: 'auto',
          marginBottom: '0',
        },
        image: {
          ...styles.image,
          width: '220px',
          maxWidth: '220px',
          marginTop: '40px'
        },
        numberContainer: {
          ...styles.numberContainer,
          paddingTop: '140px',
          textAlign: 'left'
        },
        number: {
          ...styles.number,
          fontSize: '4rem',
          marginBottom: '8px',
          textAlign: 'left'
        },
        title: {
          ...styles.title,
          fontSize: '1.8rem',
          minHeight: '4rem',
          textAlign: 'left',
        },
        description: {
          ...styles.description,
          fontSize: '1rem',
          lineHeight: '1.5',
          marginTop: '20px'
        },
        bulletPoint: {
          ...styles.bulletPoint,
          fontSize: '1rem',
          marginBottom: '8px',
          paddingLeft: '10px'
        },
        progressContainer: {
          ...styles.progressContainer,
          marginTop: '-10px',
        },
        progressLine: {
          margin: '0'
        }
      };
    }

    return styles;
  };

  const styles = getResponsiveStyles();

  return (
    <section 
      className="design-process-section"
      style={{
        position: 'relative',
        width: '100%',
        height: deviceType === 'mobile' ? 'auto' : deviceType === 'tablet' ? 'auto' : '85vh',
      }}
      aria-labelledby="web-design-process-heading"
      itemScope
      itemType="https://schema.org/Service"
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
          {/* Header section - dynamically loaded */}
          <header 
            ref={headerRef}
            className="transition-all duration-300"
            style={{
              marginBottom: styles.header.marginBottom,
              textAlign: 'center',
            }}
          >
            <h1 
              id="web-design-process-heading"
              className="font-bold mb-2"
              style={{
                fontSize: styles.headerTitle.fontSize,
                lineHeight: styles.headerTitle.lineHeight,
                textAlign: 'center',
                width: '100%'
              }}
              itemProp="name"
            >
              {processHeader.title}
            </h1>
            <p className="max-w-3xl mx-auto"
               style={{
                 fontSize: styles.headerDesc.fontSize,
                 textAlign: 'center',
                 width: '100%'
               }}
               itemProp="description"
            >
              {processHeader.subtitle}
            </p>
          </header>
          
          {/* Main content wrapper */}
          <main 
            ref={contentRef}
            style={{
              marginTop: styles.content.marginTop,
            }}
            role="main"
          >
            {/* Content sections - responsive for all device sizes */}
            <div className="mb-2 mt-0">
              <div style={{ 
                display: 'flex',
                flexDirection: deviceType === 'mobile' ? 'column' : 'row',
                transition: 'all 0.5s ease'
              }}>
                {getVisibleSteps().map(({ step, index }, position) => (
                  <article 
                    key={index}
                    style={{
                      width: styles.stepContainer.width,
                      padding: styles.stepContainer.padding,
                      flexShrink: 0,
                      marginBottom: styles.stepContainer.marginBottom,
                      animation: `fade-in 0.5s ease-in-out`,
                    }}
                    className="content-step"
                    itemScope
                    itemType="https://schema.org/Step"
                    aria-labelledby={`step-${index + 1}-title`}
                  >
                    {/* For mobile: Image first (moved to top) */}
                    {deviceType === 'mobile' && (
                      <figure 
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
                          alt={step.alt || `${step.title} process illustration`}
                          style={{
                            width: styles.image.width,
                            maxWidth: styles.image.maxWidth,
                            height: styles.image.height,
                            display: styles.image.display,
                          }}
                          loading="lazy"
                          itemProp="image"
                        />
                      </figure>
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
                          aria-label={`Step ${step.number}`}
                          itemProp="position"
                        >
                          {step.number}
                        </div>
                        
                        {/* Title */}
                        <h2
                          id={`step-${index + 1}-title`}
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
                          itemProp="name"
                        >
                          {step.title}
                        </h2>
                      </div>
                      
                      {/* Right side: Image (only show on tablet and desktop) */}
                      {deviceType !== 'mobile' && (
                        <figure 
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
                            alt={step.alt || `${step.title} process illustration`}
                            style={{
                              marginTop: deviceType === 'mobile' ? '0' : styles.image.marginTop,
                              width: deviceType === 'tablet' ? styles.image.maxWidth : styles.image.width,
                              maxWidth: styles.image.maxWidth,
                              height: 'auto',
                              display: 'block',
                            }}
                            loading="lazy"
                            itemProp="image"
                          />
                        </figure>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            
            {/* Progress line with dots - responsive for all device sizes */}
            <div 
              style={{ 
                marginTop: styles.progressContainer.marginTop, 
                marginBottom: styles.progressContainer.marginBottom,
              }}
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={processSteps.length}
              aria-label={`Process step ${currentIndex + 1} of ${processSteps.length}`}
            >
              {/* The progress line itself */}
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
                
                {/* Dots - dynamic based on device type */}
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
                      {/* Description */}
                      <p
                        style={{
                          fontSize: styles.description.fontSize,
                          lineHeight: styles.description.lineHeight,
                          color: 'rgba(255, 255, 255, 0.9)',
                          marginTop: styles.description.marginTop,
                          marginBottom: '12px',
                          textAlign: styles.description.textAlign,
                        }}
                        itemProp="description"
                      >
                        {step.description}
                      </p>
                      
                      {/* Bullet points */}
                      <ul 
                        style={{ 
                          listStyle: 'none', 
                          padding: '0', 
                          margin: '0' 
                        }}
                        itemProp="additionalProperty"
                        itemScope
                        itemType="https://schema.org/PropertyValue"
                      >
                        {step.bulletPoints.map((point, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            style={{
                              fontSize: styles.bulletPoint.fontSize,
                              color: 'rgba(255, 255, 255, 0.8)',
                              marginBottom: styles.bulletPoint.marginBottom,
                              paddingLeft: styles.bulletPoint.paddingLeft,
                              position: 'relative',
                              lineHeight: '1.4',
                            }}
                            itemProp="value"
                          >
                            <span
                              style={{
                                position: 'absolute',
                                left: '0',
                                top: '0.2em',
                                width: '6px',
                                height: '6px',
                                backgroundColor: '#3DB4D0',
                                borderRadius: '50%',
                              }}
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .content-step {
          transition: all 0.3s ease;
        }
        
        .content-step:hover {
          transform: translateY(-2px);
        }
        
        .progress-fill {
          transition: width 0.3s ease-out;
        }
        
        /* Responsive adjustments */
        @media (max-width: 767px) {
          .design-process-container {
            padding: 20px 0 40px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .design-process-container {
            padding: 40px 0 50px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .design-process-container {
            padding: 60px 0 !important;
            height: 100vh !important;
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .content-step,
          .progress-fill {
            transition: none;
          }
          
          @keyframes fade-in {
            from, to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
        
        /* Focus styles for keyboard navigation */
        .content-step:focus-within {
          outline: 2px solid #3DB4D0;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default WebDesignProcess;
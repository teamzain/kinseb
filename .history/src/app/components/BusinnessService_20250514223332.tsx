'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


import Link from 'next/link';
const servicePageMap: { [key: string]: string } = {
  "Conversion-Focused Design": "/web-design",
  "Industry-Specific Solutions": "/industry-solutions",
  "Responsive Across Devices": "/responsive-design",
  "SEO-First Foundation": "/seo-services",
  // Add more mappings for other services as needed
};
// Define TypeScript interfaces for props
interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
  animationDelay: number;
  isVisible: boolean;
}

interface ServiceItem {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
}

// Service Card Component
const ServiceCard = ({ iconSrc, title, description, hoverImage, animationDelay, isVisible }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
   const destinationPage = servicePageMap[title] || "/services";
  <Link href={destinationPage} passHref>
  return (
   
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 calc(25% - 24px)', // Increased spacing between cards
        height: '389px',
        background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.5s ease, opacity 0.8s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        cursor: 'pointer',
        marginRight: '24px', // Increased space between cards
        position: 'relative',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      {/* Background image (always present, opacity changes on hover) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 0,
      }}>
        <Image
          src={hoverImage}
          alt={`${title} background`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Content with icon, title, description (hidden on hover) */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isHovered ? 0 : 1, // Hide content on hover
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
        }}>
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
            }}
          />
        </div>
        
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
        }}>
          {description}
        </p>
        
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: isHovered ? '700' : '400', // Bold the arrow on hover
          marginTop: 'auto',
          textAlign: 'right',
          transition: 'font-weight 0.3s ease',
        }}>
          →
        </div>
      </div>
      
      {/* Overlay that fades in instead of sliding from the top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background
        opacity: isHovered ? 1 : 0, // Fade in/out instead of sliding
        transition: 'opacity 0.3s ease', // Animate opacity only
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
        }}>
          {description}
        </p>
        
        {/* Arrow positioned in the bottom right corner with bold weight on hover */}
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: '700', // Always bold in overlay
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}>
          ↘
        </div>
      </div>
    </div>
      
  );
  </Link>
};

// Mobile Service Card Component
const MobileServiceCard = ({ service, index, isActive, showHover, isVisible }: 
  { service: ServiceItem, index: number, isActive: boolean, showHover: boolean, isVisible: boolean }) => {
  const isHovered = isActive && showHover;
    const destinationPage = servicePageMap[title] || "/services";
  return (
     <Link href={destinationPage} passHref>
    <div 
      style={{
        flex: '0 0 100%', // Take full width in mobile
        height: '389px',
        background: 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.5s ease, opacity 0.8s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        position: 'relative',
        width: '100%',
        marginRight: '20px', // Space between cards in the carousel
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 0,
      }}>
        <Image
          src={service.hoverImage}
          alt={`${service.title} background`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Content - hidden on hover */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isHovered ? 0 : 1, // Hide on hover
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
        }}>
          <Image
            src={service.iconSrc}
            alt={`${service.title} icon`}
            width={48}
            height={48}
            style={{
              filter: 'invert(58%) sepia(69%) saturate(456%) hue-rotate(152deg) brightness(87%) contrast(86%)',
            }}
          />
        </div>
        
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
        }}>
          {service.description}
        </p>
        
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: isHovered ? '700' : '400', // Bold the arrow on hover
          marginTop: 'auto',
          textAlign: 'right',
          transition: 'font-weight 0.3s ease',
        }}>
          →
        </div>
      </div>
      
      {/* Overlay with fade effect instead of sliding */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background
        opacity: isHovered ? 1 : 0, // Fade in/out instead of sliding
        transition: 'opacity 0.3s ease', // Animate opacity only
        zIndex: 2,
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          {service.title}
        </h3>
        
        <p style={{
          color: 'white',
          fontSize: '16px',
          lineHeight: '1.5',
          textAlign: 'center',
        }}>
          {service.description}
        </p>
        
        {/* Arrow positioned in the bottom right corner with bold weight */}
        <div style={{
          color: '#36b2c8',
          fontSize: '24px',
          fontWeight: '700', // Always bold in overlay
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}>
          ↘
        </div>
      </div>
    </div>
    </Link>
  );
};

// Main Business Services Component
export default function BusinessServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4); // Default to 4 cards for desktop
  const [totalWidth, setTotalWidth] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [leftButtonHovered, setLeftButtonHovered] = useState(false);
  const [rightButtonHovered, setRightButtonHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  
  // Set up Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          // Delay cards animation to start after header animation
          setTimeout(() => {
            setIsVisible(true);
          }, 300);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Calculate container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (servicesRef.current) {
        setTotalWidth(servicesRef.current.clientWidth);
      }
      
      // Check if mobile view based on screen width
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCards(mobile ? 1 : 4); // Show 4 cards on desktop
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Effect to start the 3-second timer when currentMobileIndex changes
  useEffect(() => {
    if (!isMobile) return;
    
    // Clear any existing hover and timer
    setShowHover(false);
    if (hoverTimer) clearTimeout(hoverTimer);
    
    // Start a new 3-second timer
    const timer = setTimeout(() => {
      setShowHover(true);
    }, 3000);
    
    setHoverTimer(timer);
    
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [currentMobileIndex, isMobile]);
  
  // Auto-scroll to current mobile index when it changes
  useEffect(() => {
    if (isMobile && servicesRef.current) {
      servicesRef.current.scrollTo({
        left: currentMobileIndex * totalWidth, // Full width of container
        behavior: 'smooth'
      });
    }
  }, [currentMobileIndex, isMobile, totalWidth]);
  
  // Services data
  const services: ServiceItem[] = [
    {
      iconSrc: "/images/Vector.png",
      title: "Conversion-Focused Design",
      description: "Custom web design solutions fully optimized to drive more sales and leads.",
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Industry-Specific Solutions",
      description: "Designs tailored to your unique industry with B2B, services, and ecommerce best practices.",
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Responsive Across Devices",
      description: "Responsive design that functions flawlessly across all devices and screen sizes.",
      hoverImage: "/images/1.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: "SEO-First Foundation",
      description: "Built with SEO best practices, laying the foundation to help your website rank higher.",
      hoverImage: "/images/2.jpg",
    },
    {
      iconSrc: "/images/Vector.png",
      title: "Conversion-Focused Design",
      description: "Custom web design solutions fully optimized to drive more sales and leads.",
      hoverImage: "/images/4.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Industry-Specific Solutions",
      description: "Designs tailored to your unique industry with B2B, services, and ecommerce best practices.",
      hoverImage: "/images/3.jpg",
    },
    {
      iconSrc: "/images/monitor.png",
      title: "Responsive Across Devices",
      description: "Responsive design that functions flawlessly across all devices and screen sizes.",
      hoverImage: "/images/1.jpg",
    },
    {
      iconSrc: "/images/search.png",
      title: "SEO-First Foundation",
      description: "Built with SEO best practices, laying the foundation to help your website rank higher.",
      hoverImage: "/images/2.jpg",
    },
  ];
  
  // Calculate max scroll position based on total cards
  const maxScrollIndex = Math.max(0, services.length - visibleCards);
  const cardSetIndex = Math.min(Math.floor(scrollPosition / (totalWidth / visibleCards)), maxScrollIndex);
  
  // Scroll controls with circular navigation
  const scrollLeft = () => {
    if (servicesRef.current) {
      if (isMobile) {
        setCurrentMobileIndex((prev) => 
          prev <= 0 ? services.length - 1 : prev - 1
        );
      } else {
        // Circular navigation - go to the end if at the beginning
        if (cardSetIndex <= 0) {
          const newIndex = maxScrollIndex;
          setScrollPosition((newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth));
          servicesRef.current.scrollTo({
            left: (newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth),
            behavior: 'smooth'
          });
        } else {
          const newIndex = cardSetIndex - 1;
          setScrollPosition((newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth));
          servicesRef.current.scrollTo({
            left: (newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth),
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
  const scrollRight = () => {
    if (servicesRef.current) {
      if (isMobile) {
        setCurrentMobileIndex((prev) => 
          prev >= services.length - 1 ? 0 : prev + 1
        );
      } else {
        // Circular navigation - go to the beginning if at the end
        if (cardSetIndex >= maxScrollIndex) {
          const newIndex = 0;
          setScrollPosition(0);
          servicesRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          const newIndex = cardSetIndex + 1;
          setScrollPosition((newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth));
          servicesRef.current.scrollTo({
            left: (newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth),
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
  // For responsive styling
  const containerStyle = {
    backgroundColor: '#0b1a27',
    padding: '80px 0', // Removed side padding to maximize space
    width: '100%',
    fontFamily: 'Arial, sans-serif',
  };
  
  const contentStyle = {
    maxWidth: '1280px', // Slightly wider to accommodate 4 cards
    margin: '0 auto',
    padding: '0 24px', // Add padding to prevent cards from touching the edge
  };
  
  const headerStyle = {
    position: 'relative' as const, // Type assertion to fix TypeScript error
    marginBottom: '40px',
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  };
  
  const titleStyle = {
    color: 'white',
    fontSize: isMobile ? '32px' : '42px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
  };
  
  const subtitleStyle = {
    color: '#d1d5db',
    fontSize: isMobile ? '16px' : '18px',
  };
  
  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
    padding: '0 0',
    overflow: 'hidden', // Hide any overflow
  } as const;
  
  const carouselStyle = {
    display: 'flex',
    scrollBehavior: 'smooth',
    width: '100%',
    position: 'relative',
  } as const;
  
  // Button style (base only - actual hover effect is applied inline)
  const buttonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '28px',      // Increased font size
    fontWeight: '700',     // Bold text
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '0 5px',
    transition: 'all 0.3s ease',  // Smooth transition for hover effects
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
    transitionDelay: '0.3s',
  } as const;
  
  // Navigation container style based on mobile or desktop
  const navigationContainerStyle = {
    position: isMobile ? 'relative' : 'absolute' as const,
    top: isMobile ? 'auto' : '55px',
    right: isMobile ? 'auto' : '20px',
    display: 'flex',
    zIndex: 10,
    justifyContent: isMobile ? 'center' : 'flex-end',
    marginTop: isMobile ? '30px' : '0', // Add space above the buttons in mobile view
  } as const;
  
  return (
    <div style={containerStyle} ref={sectionRef}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique
          </h2>
          <p style={subtitleStyle}>
            That's Why We Provide Custom Solutions Tailored To Your Needs
          </p>
          
          {/* Navigation buttons - only shown here for desktop */}
          {!isMobile && (
            <div style={navigationContainerStyle}>
              <button 
                onClick={scrollLeft} 
                style={{
                  ...buttonStyle,
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                }}
                aria-label="Previous services"
                onMouseEnter={() => setLeftButtonHovered(true)}
                onMouseLeave={() => setLeftButtonHovered(false)}
              >
                &lt;
              </button>
              
              <button 
                onClick={scrollRight} 
                style={{
                  ...buttonStyle,
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                }}
                aria-label="Next services"
                onMouseEnter={() => setRightButtonHovered(true)}
                onMouseLeave={() => setRightButtonHovered(false)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
        
        <div style={carouselContainerStyle}>
          {/* Card container with horizontal scrolling */}
          <div 
            ref={servicesRef} 
            style={{
              ...carouselStyle,
              overflow: 'hidden', // Hide scrollbars completely
              scrollSnapType: isMobile ? 'x mandatory' : 'none', // Add snap for mobile
            }}
            onScroll={(e) => !isMobile && setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {isMobile ? (
              // Mobile view - one card at a time with snap points
              services.map((service, index) => (
                <div 
                  key={index} 
                  style={{ 
                    flex: '0 0 100%', // Take full width
                    scrollSnapAlign: 'center', // Center snap point
                    padding: '0 0', // No horizontal padding to prevent peeking
                  }}
                >
                  <MobileServiceCard 
                    service={service} 
                    index={index} 
                    isActive={index === currentMobileIndex}
                    showHover={showHover}
                    isVisible={isVisible}
                  />
                </div>
              ))
            ) : (
              // Desktop view - multiple cards with staggered animation
              services.slice(0, services.length).map((service, index) => (
                <ServiceCard 
                  key={index} 
                  {...service} 
                  animationDelay={index % 4 * 150} // Stagger animation by 150ms
                  isVisible={isVisible}
                />
              ))
            )}
          </div>
          
          {/* Mobile navigation buttons - positioned below the card */}
          {isMobile && (
            <div style={navigationContainerStyle}>
              <button 
                onClick={scrollLeft}
                style={{
                  ...buttonStyle,
                  background: leftButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                }}
                aria-label="Previous services"
                onMouseEnter={() => setLeftButtonHovered(true)}
                onMouseLeave={() => setLeftButtonHovered(false)}
              >
                &lt;
              </button>
              
              <button 
                onClick={scrollRight}
                style={{
                  ...buttonStyle,
                  background: rightButtonHovered
                    ? 'linear-gradient(180deg, rgba(13, 152, 186, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), #16161E'
                    : 'linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E',
                }}
                aria-label="Next services"
                onMouseEnter={() => setRightButtonHovered(true)}
                onMouseLeave={() => setRightButtonHovered(false)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
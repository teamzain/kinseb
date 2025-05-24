'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Define TypeScript interfaces for props
interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
}

interface ServiceItem {
  iconSrc: string;
  title: string;
  description: string;
  hoverImage: string;
}

// Service Card Component
const ServiceCard = ({ iconSrc, title, description, hoverImage }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 100%', // Will be adjusted based on screen size in parent
        height: '389px',
        background: `linear-gradient(180deg, rgba(13, 152, 186, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), #16161E`,
        border: '1px solid #0D98BA',
        borderRadius: '10px',
        padding: '30px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        cursor: 'pointer',
        marginRight: '20px', // Space between cards
        position: 'relative',
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
      
      {/* Content with icon, title, description (icon hidden on hover) */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          marginBottom: '20px',
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease',
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
          marginTop: 'auto',
          textAlign: 'right',
          transform: isHovered ? 'translate(10px, 10px)' : 'none',
          transition: 'transform 0.3s ease',
        }}>
          →
        </div>
      </div>
      
      {/* Overlay that shows on hover */}
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
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
      </div>
    </div>
  );
};

// Main Business Services Component
export default function BusinessServices() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoHoverIndex, setAutoHoverIndex] = useState<number | null>(null);
  
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

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up auto hover effect for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setAutoHoverIndex(activeIndex);
      
      // Remove hover effect after 2 seconds
      setTimeout(() => {
        setAutoHoverIndex(null);
      }, 2000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isMobile, activeIndex]);

  // Calculate visible cards based on screen size
  const visibleCards = isMobile ? 1 : 3;
  const maxScrollIndex = Math.max(0, services.length - visibleCards);

  // Scroll controls
  const scrollLeft = () => {
    if (isMobile) {
      // For mobile, just change active index
      setActiveIndex(prev => Math.max(0, prev - 1));
      return;
    }
    
    if (servicesRef.current) {
      const newIndex = Math.max(0, Math.floor(scrollPosition / (servicesRef.current.clientWidth / visibleCards)) - 1);
      const newPosition = (newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth);
      servicesRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (isMobile) {
      // For mobile, just change active index
      setActiveIndex(prev => Math.min(services.length - 1, prev + 1));
      return;
    }
    
    if (servicesRef.current) {
      const newIndex = Math.min(maxScrollIndex, Math.floor(scrollPosition / (servicesRef.current.clientWidth / visibleCards)) + 1);
      const newPosition = (newIndex / maxScrollIndex) * (servicesRef.current.scrollWidth - servicesRef.current.clientWidth);
      servicesRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  // Update scroll position on mobile when activeIndex changes
  useEffect(() => {
    if (isMobile && servicesRef.current) {
      const cardWidth = servicesRef.current.clientWidth;
      servicesRef.current.scrollTo({
        left: activeIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);

  // For responsive styling
  const containerStyle = {
    backgroundColor: '#0b1a27',
    padding: '80px 16px',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
  };

  const headerStyle = {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleContainerStyle = {
    flex: '1',
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

  const navigationStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const navButtonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(54, 178, 200, 0.1)',
    color: 'white',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(54, 178, 200, 0.5)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const carouselContainerStyle = {
    position: 'relative' as const,
    width: '100%',
  };

  const carouselStyle = {
    display: 'flex',
    overflow: 'hidden',
    scrollBehavior: 'smooth' as const,
    width: '100%',
    position: 'relative' as const,
  };

  // Render the mobile or desktop version
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <h2 style={titleStyle}>
              Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique
            </h2>
            <p style={subtitleStyle}>
              That's Why We Provide Custom Solutions Tailored To Your Needs
            </p>
          </div>
          
          {/* Navigation buttons in header */}
          <div style={navigationStyle}>
            <button 
              onClick={scrollLeft} 
              style={navButtonStyle}
              aria-label="Previous services"
              disabled={isMobile ? activeIndex <= 0 : scrollPosition <= 0}
            >
              ←
            </button>
            <button 
              onClick={scrollRight} 
              style={navButtonStyle}
              aria-label="Next services"
              disabled={isMobile ? activeIndex >= services.length - 1 : scrollPosition >= (servicesRef.current?.scrollWidth || 0) - (servicesRef.current?.clientWidth || 0) - 10}
            >
              →
            </button>
          </div>
        </div>

        <div style={carouselContainerStyle}>
          {/* Card container with horizontal scrolling */}
          <div 
            ref={servicesRef} 
            style={{
              ...carouselStyle,
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
            }}
            onScroll={(e) => {
              setScrollPosition(e.currentTarget.scrollLeft);
              if (isMobile) {
                const index = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
                setActiveIndex(index);
              }
            }}
          >
            {services.map((service, index) => (
              <div 
                key={index}
                style={{
                  flex: `0 0 ${isMobile ? '100%' : 'calc(33.333% - 20px)'}`,
                  scrollSnapAlign: isMobile ? 'start' : 'none',
                  scrollSnapStop: isMobile ? 'always' : 'normal',
                }}
              >
                <ServiceCard 
                  {...service} 
                  // Force hover effect for active mobile card based on timer
                  {...(isMobile && autoHoverIndex === index && { 
                    onMouseEnter: () => {}, 
                    onMouseLeave: () => {}
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
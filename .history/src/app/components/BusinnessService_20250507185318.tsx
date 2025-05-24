'use client';
import { useState, useRef } from 'react';
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
        flex: '0 0 300px', // Fixed width for cards in the row
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
      
      {/* Content that shows by default */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        opacity: isHovered ? 0 : 1,
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
          alignSelf: 'flex-end',
          fontFamily: 'Arial',
          textAlign: 'right',
        }}>
          →
        </div>
      </div>
      
      {/* Text that shows on hover */}
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

  // Scroll controls
  const scrollLeft = () => {
    if (servicesRef.current) {
      const scrollAmount = 320; // Card width + margin
      const newPosition = Math.max(scrollPosition - scrollAmount, 0);
      servicesRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (servicesRef.current) {
      const scrollAmount = 320; // Card width + margin
      const maxScroll = servicesRef.current.scrollWidth - servicesRef.current.clientWidth;
      const newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
      servicesRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

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
  };

  const headerStyle = {
    marginBottom: '60px',
  };

  const titleStyle = {
    color: 'white',
    fontSize: '42px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
  };

  const subtitleStyle = {
    color: '#d1d5db',
    fontSize: '18px',
  };

  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
  } as const;

  const carouselStyle = {
    display: 'flex',
    overflow: 'hidden',
    scrollBehavior: 'smooth',
    width: '100%',
    position: 'relative',
  } as const;

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(54, 178, 200, 0.8)',
    color: 'white',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  } as const;

  const leftButtonStyle = {
    ...buttonStyle,
    left: '-25px',
  };

  const rightButtonStyle = {
    ...buttonStyle,
    right: '-25px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique
          </h2>
          <p style={subtitleStyle}>
            That's Why We Provide Custom Solutions Tailored To Your Needs
          </p>
        </div>

        <div style={carouselContainerStyle}>
          {/* Left navigation button */}
          <button 
            onClick={scrollLeft} 
            style={leftButtonStyle}
            aria-label="Previous services"
          >
            ←
          </button>

          {/* Card container with horizontal scrolling */}
          <div 
            ref={servicesRef} 
            style={carouselStyle}
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Right navigation button */}
          <button 
            onClick={scrollRight} 
            style={rightButtonStyle}
            aria-label="Next services"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
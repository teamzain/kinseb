'use client';
/// BusinessServices.tsx
import { useState, useEffect, useCallback, CSSProperties } from 'react';
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
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
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
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isHovered ? 1 : 0,
        zIndex: 0,
        transition: 'opacity 0.3s ease',
      }}>
        <Image
          src={hoverImage}
          alt={`${title} background`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      <div style={{
        position: 'relative',
        width: '48px',
        height: '48px',
        marginBottom: '20px',
        zIndex: 1,
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
      
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '15px',
          opacity: isHovered ? 1 : 1,
          transition: 'opacity 0.3s ease',
        }}>
          {title}
        </h3>
        
        <p style={{
          color: isHovered ? 'white' : '#9ca3af',
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px',
          opacity: 1,
          transition: 'color 0.3s ease',
          position: 'relative',
          zIndex: 2,
        }}>
          {description}
        </p>
      </div>
      
      <div style={{
        color: '#36b2c8',
        fontSize: '24px',
        alignSelf: 'flex-end',
        position: 'relative',
        zIndex: 1,
        fontFamily: 'Arial',
        opacity: isHovered ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        →
      </div>
    </div>
  );
};

// Arrow Button Component
interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute' as const,
        top: '50%',
        transform: 'translateY(-50%)',
        ...(direction === 'left' ? { left: '-50px' } : { right: '-50px' }),
        zIndex: 10,
        background: 'rgba(13, 152, 186, 0.8)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(13, 152, 186, 1)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(13, 152, 186, 0.8)'}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  );
};

// Main Business Services Component
export default function BusinessServices() {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;
  const maxIndex = Math.ceil(services.length / cardsToShow) - 1;

  // Function to navigate to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  // Function to navigate to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // For responsive styling - we need to use a different approach for media queries with inline styles
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#0b1a27',
    padding: '80px 16px',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '60px',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '42px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#d1d5db',
    fontSize: '18px',
  };

  // Style for carousel container
  const carouselContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };

  // Style for carousel track
  const carouselTrackStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cardsToShow}, 1fr)`,
    gap: '30px',
    transition: 'transform 0.5s ease-in-out',
  };

  // Get the current displayed cards
  const displayedCards = services.slice(
    currentIndex * cardsToShow, 
    Math.min((currentIndex * cardsToShow) + cardsToShow, services.length)
  );

  // Fill remaining slots if not enough cards for the last page
  while (displayedCards.length < cardsToShow) {
    displayedCards.push(services[displayedCards.length % services.length]);
  }

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
          <ArrowButton direction="left" onClick={prevSlide} />
          
          <div style={carouselTrackStyle}>
            {displayedCards.map((service, index) => (
              <ServiceCard key={`${currentIndex}-${index}`} {...service} />
            ))}
          </div>
          
          <ArrowButton direction="right" onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
}
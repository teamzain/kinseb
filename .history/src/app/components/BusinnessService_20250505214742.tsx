'use client';
/// BusinessServices.tsx
import { useState } from 'react';
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
        width: '100%', // Changed from fixed width to percentage for responsive layout
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
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
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
      )}
      
      <div style={{
        position: 'relative',
        width: '48px',
        height: '48px',
        marginBottom: '20px',
        zIndex: 1,
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
        position: 'relative',
        zIndex: 1,
      }}>
        {title}
      </h3>
      
      <p style={{
        color: '#9ca3af',
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
      }}>
        {description}
      </p>
      
      <div style={{
        color: '#36b2c8',
        fontSize: '24px',
        alignSelf: 'flex-end',
        position: 'relative',
        zIndex: 1,
        fontFamily: 'Arial',
      }}>
        →
      </div>
    </div>
  );
};

// Main Business Services Component
export default function BusinessServices() {
  const services: ServiceItem[] = [
    {
      iconSrc: "/images/Vector.png",
      title: "Conversion-Focused Design",
      description: "Custom web design solutions fully optimized to drive more sales and leads.",
      hoverImage: "/images/conversion.jpg",
    },
    {
      iconSrc: "/images/briefcase.png",
      title: "Industry-Specific Solutions",
      description: "Designs tailored to your unique industry with B2B, services, and ecommerce best practices.",
      hoverImage: "/images/industry.jpg",
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

  // For responsive styling - we need to use a different approach for media queries with inline styles
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

  // Create grid style with equal spacing
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px', // Increased gap for more equal spacing
    width: '100%',
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

        {/* Using inline styles for the grid instead of Tailwind classes */}
        <div style={gridStyle}>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
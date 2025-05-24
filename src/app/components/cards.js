// ServiceCard.js

'use client';
import { useState } from 'react';
import Image from 'next/image';

const ServiceCard = ({ icon, title, description, hoverImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  
  return (
    <div 
      className="service-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: '#0d2635',
        borderRadius: '8px',
        padding: '30px',
        minHeight: '220px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      {isHovered && (
        <div className="hover-image" style={{
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
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      
      <div className="icon" style={{
        color: '#36b2c8',
        fontSize: '48px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
      }}>
        {icon}
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
      
      <div className="arrow" style={{
        color: '#36b2c8',
        fontSize: '24px',
        alignSelf: 'flex-end',
        position: 'relative',
        zIndex: 1,
      }}>
        →
      </div>
    </div>
  );
};

// BusinessServices.js
import { FiTarget, FiBriefcase, FiMonitor, FiSearch } from 'react-icons/fi';

export default function BusinessServices() {
  const services = [
    {
      icon: <FiTarget />,
      title: "Conversion-Focused Design",
      description: "Custom web design solutions fully optimized to drive more sales and leads.",
      hoverImage: "/images/conversion.jpg",
    },
    {
      icon: <FiBriefcase />,
      title: "Industry-Specific Solutions",
      description: "Designs tailored to your unique industry with B2B, services, and ecommerce best practices.",
      hoverImage: "/images/industry.jpg",
    },
    {
      icon: <FiMonitor />,
      title: "Responsive Across Devices",
      description: "Responsive design that functions flawlessly across all devices and screen sizes.",
      hoverImage: "/images/responsive.jpg",
    },
    {
      icon: <FiSearch />,
      title: "SEO-First Foundation",
      description: "Built with SEO best practices, laying the foundation to help your website rank higher.",
      hoverImage: "/images/seo.jpg",
    },
  ];

  return (
    <div style={{
      backgroundColor: '#0b1a27',
      padding: '80px 16px',
      width: '100%',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          marginBottom: '60px',
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '42px',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '16px',
          }}>
            Your <span style={{ color: '#36b2c8' }}>Business</span> Is Unique
          </h2>
          <p style={{
            color: '#d1d5db',
            fontSize: '18px',
          }}>
            That's Why We Provide Custom Solutions Tailored To Your Needs
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

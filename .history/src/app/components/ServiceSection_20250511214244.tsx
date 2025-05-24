// DesignExperienceSection.tsx
import React from 'react';

interface ServiceItemProps {
  title: string;
  description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description }) => {
  return (
    <div className="service-item">
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
};

interface DesignExperienceSectionProps {
  ctaText?: string;
}

const DesignExperienceSection: React.FC<DesignExperienceSectionProps> = ({ 
  ctaText = "Explore Web Design Services" 
}) => {
  // Array of service items for easier management
  const serviceItems: ServiceItemProps[] = [
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
    { title: "Reliable Support", description: "Ongoing help whenever you need updates or fixes." },
  ];

  return (
    <div className="design-container">
      <div className="design-word-stack">
        <span className="design-word" style={{ color: '#0D98BA', top: '74px' }}>DESIGN</span>
        <span className="design-word border-white" style={{ top: '104px' }}>DESIGN</span>
        <span className="design-word border-half" style={{ top: '134px', borderColor: 'rgba(255, 255, 255, 0.5)' }}>DESIGN</span>
        <span className="design-word border-third" style={{ top: '164px', borderColor: 'rgba(255, 255, 255, 0.3)' }}>DESIGN</span>
        <span className="design-word border-quarter" style={{ top: '196px', borderColor: 'rgba(255, 255, 255, 0.2)' }}>DESIGN</span>
        <span className="design-word border-tenth" style={{ top: '226px', borderColor: 'rgba(255, 255, 255, 0.1)' }}>DESIGN</span>
      </div>

      <div className="content-section">
        <h2 className="main-heading">Designing experiences for conversion and expansion</h2>
        <div className="blue-divider"></div>
        
        <div className="services-grid">
          {serviceItems.map((item, index) => (
            <ServiceItem 
              key={index} 
              title={item.title} 
              description={item.description} 
            />
          ))}
        </div>
      </div>

      <button className="cta-button">
        <span className="button-text">{ctaText}</span>
      </button>

      <style jsx>{`
        .design-container {
          position: relative;
          width: 100%;
          height: 750px;
          background: linear-gradient(180deg, #04091D 6.93%, #0D98BA 402.13%);
          padding: 0;
          overflow: hidden;
          font-family: 'Poppins', 'Barlow', 'Lato', sans-serif;
        }

        .design-word-stack {
          position: relative;
          width: 258px;
          height: 300px;
          margin-left: 74px;
          margin-top: 74px;
        }

        .design-word {
          position: absolute;
          width: 258px;
          height: 98px;
          font-style: normal;
          font-weight: 600;
          font-size: 65px;
          line-height: 90px;
          letter-spacing: -0.03em;
          color: transparent;
        }

        .border-white {
          border: 1px solid #FFFFFF;
        }

        .border-half {
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .border-third {
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .border-quarter {
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .border-tenth {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .content-section {
          position: absolute;
          top: 74px;
          left: 377px;
          width: 983px;
        }

        .main-heading {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 56px;
          line-height: 64px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin-bottom: 30px;
        }

        .blue-divider {
          width: 100%;
          height: 4px;
          background: #0D98BA;
          border-radius: 10px;
          margin-bottom: 40px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 315px);
          grid-template-rows: repeat(2, 200px);
          gap: 15px;
        }

        .service-item {
          background: rgba(13, 152, 186, 0.1);
          border-radius: 10px;
          padding: 20px;
          position: relative;
        }

        .service-title {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 22px;
          line-height: 64px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0;
          padding: 0;
        }

        .service-description {
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 150%;
          color: #FFFFFF;
          margin-top: 0;
        }

        .cta-button {
          position: absolute;
          width: 238px;
          height: 45px;
          left: 74px;
          bottom: 50px;
          background: #0D98BA;
          border: 2px solid #0D98BA;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-text {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          color: #04091D;
        }

        @media (max-width: 1440px) {
          .content-section {
            width: calc(100% - 430px);
          }
          
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 992px) {
          .design-container {
            height: auto;
            padding-bottom: 100px;
          }
          
          .design-word-stack {
            margin-left: 40px;
          }
          
          .content-section {
            position: relative;
            top: 30px;
            left: 40px;
            width: calc(100% - 80px);
          }
          
          .main-heading {
            font-size: 42px;
            line-height: 48px;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }
          
          .cta-button {
            left: 40px;
          }
        }

        @media (max-width: 768px) {
          .design-word-stack {
            display: none;
          }
          
          .content-section {
            left: 20px;
            width: calc(100% - 40px);
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-button {
            position: relative;
            left: 20px;
            margin-top: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default DesignExperienceSection;
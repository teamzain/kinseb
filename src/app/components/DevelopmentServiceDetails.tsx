'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DevelopmentServiceData, getDevelopmentServiceById } from './developmentServiceData';
import { Poppins, Barlow, Lato } from 'next/font/google';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-barlow'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato'
});

// Props interface with explicitly defined serviceId type
interface DevelopmentServiceDetailsProps {
  serviceId: string;
}

const DevelopmentServiceDetails: React.FC<DevelopmentServiceDetailsProps> = ({ serviceId }) => {
  const router = useRouter();
  const [service, setService] = useState<DevelopmentServiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        // Convert string id to number
        const numericId = parseInt(serviceId, 10);
        
        // Validate that we have a valid number
        if (isNaN(numericId)) {
          setError('Invalid service ID');
          setLoading(false);
          return;
        }
        
        const serviceData = await getDevelopmentServiceById(numericId);
        if (serviceData) {
          setService(serviceData);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        setError('Failed to load service details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [serviceId]);

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={`${poppins.variable} ${barlow.variable} ${lato.variable} loading-container`}>
        <div className="loading-spinner"></div>
        <p>Loading service details...</p>
        
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            background-color: #04091D;
            color: #FFFFFF;
            text-align: center;
            padding: 20px;
          }
          
          .loading-spinner {
            border: 4px solid rgba(13, 152, 186, 0.3);
            border-top: 4px solid #0D98BA;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className={`${poppins.variable} ${barlow.variable} ${lato.variable} error-container`}>
        <h2>Error</h2>
        <p>{error || 'Service not found'}</p>
        <button onClick={handleBackClick} className="back-button">
          Back to Development Services
        </button>
        
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            background-color: #04091D;
            color: #FFFFFF;
            text-align: center;
            padding: 20px;
          }
          
          .back-button {
            background: transparent;
            border: 2px solid #0D98BA;
            color: #0D98BA;
            font-family: var(--font-lato);
            font-size: 16px;
            font-weight: 600;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          
          .back-button:hover {
            background-color: #0D98BA;
            color: #04091D;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`${poppins.variable} ${barlow.variable} ${lato.variable} service-details-container`}>
      <div className="service-details-content">
        <button onClick={handleBackClick} className="back-button">
          ← Back to Development Services
        </button>
        
        <div className="service-header">
          <h1 className="service-title">{service.title}</h1>
          <div className="service-meta">
            <div className="meta-item">
              <span className="meta-label">Price Range:</span>
              <span className="meta-value">{service.price}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Timeline:</span>
              <span className="meta-value">{service.duration}</span>
            </div>
          </div>
        </div>

        <div className="service-description">
          <p>{service.longDescription}</p>
        </div>

        <div className="two-columns">
          <div className="service-technologies">
            <h2>Technologies We Use</h2>
            <ul>
              {service.technologiesUsed.map((tech, index) => (
                <li key={`tech-${index}`}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="service-features">
            <h2>Key Features</h2>
            <ul>
              {service.keyFeatures.map((feature, index) => (
                <li key={`feature-${index}`}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button">
            Request a Consultation
          </button>
        </div>
      </div>

      <style jsx>{`
        .service-details-container {
          background-color: #04091D;
          color: #FFFFFF;
          min-height: 100vh;
          padding: 40px 20px;
        }

        .service-details-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px;
          background: rgba(13, 152, 186, 0.05);
          border-radius: 12px;
        }

        .back-button {
          background: transparent;
          border: none;
          color: #0D98BA;
          font-family: var(--font-lato);
          font-size: 16px;
          font-weight: 600;
          padding: 8px 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          margin-bottom: 30px;
          transition: transform 0.2s ease;
        }

        .back-button:hover {
          transform: translateX(-5px);
        }

        .service-header {
          margin-bottom: 40px;
          border-bottom: 2px solid rgba(13, 152, 186, 0.3);
          padding-bottom: 20px;
        }

        .service-title {
          font-family: var(--font-poppins);
          font-weight: 700;
          font-size: 42px;
          margin-bottom: 20px;
          color: #0D98BA;
        }

        .service-meta {
          display: flex;
          gap: 40px;
          margin-bottom: 20px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-family: var(--font-barlow);
          font-size: 16px;
          color: #0D98BA;
          margin-bottom: 5px;
        }

        .meta-value {
          font-family: var(--font-poppins);
          font-size: 20px;
          font-weight: 600;
        }

        .service-description {
          margin-bottom: 40px;
          font-family: var(--font-barlow);
          font-size: 18px;
          line-height: 1.6;
        }

        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        h2 {
          font-family: var(--font-poppins);
          font-weight: 600;
          font-size: 24px;
          color: #0D98BA;
          margin-bottom: 20px;
        }

        ul {
          padding-left: 20px;
          margin-bottom: 20px;
        }

        li {
          font-family: var(--font-barlow);
          font-size: 16px;
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .cta-section {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .cta-button {
          width: 240px;
          height: 52px;
          background: #0D98BA;
          border: 2px solid #0D98BA;
          border-radius: 6px;
          font-family: var(--font-lato);
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          color: #04091D;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          background-color: #04091D;
          color: #0D98BA;
          transform: translateY(-2px);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .service-details-content {
            padding: 20px;
          }

          .service-title {
            font-size: 32px;
          }

          .two-columns {
            grid-template-columns: 1fr;
          }

          .service-meta {
            flex-direction: column;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .service-title {
            font-size: 28px;
          }
          
          .meta-value {
            font-size: 18px;
          }
          
          .service-description {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default DevelopmentServiceDetails;
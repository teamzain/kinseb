'use client';
import React from 'react';
import ServiceDetailBanner from '@/app/components/ServiceDetailBanner';
import FeaturedWorkShowcase from '@/app/components/ServiceDetailFeature';
import ServiceFAQ from '@/app/components/ServiceFAQ';
import HeroSection from '@/app/components/ServiceContact';
import { getServiceById, getNumericServiceId } from '@/app/components/serviceData';
import { showcaseBackground, monitorFrameImage } from '@/app/components/featuredWorkData';
import WebDesignProcess from '@/app/components/servicedetailsprocess';
import Newsletter from '@/app/components/Newsletter';
import TrustSection from '@/app/components/servicedetailstrust';
import LandingPage from '@/app/components/ContactForm';
import ProjectCTA from '@/app/components/CTA2';
import ContactForm2 from '@/app/components/ContactForm2';
import StatsSection from '@/app/components/stats';
import ServiceLoader from '@/app/components/ServiceLoader'; // Import the new loader

// Helper function to determine category based on service ID
const getCategoryFromService = (serviceId: string): 'design' | 'development' | 'seo' => {
  if (serviceId.includes('design') || 
      serviceId === 'branding' || 
      serviceId === 'ui-ux-design' || 
      serviceId.includes('branding') ||
      serviceId.includes('mobile-app-design') ||
      serviceId.includes('web-app-design')) {
    return 'design';
  }
  
  if (serviceId.includes('development') || 
      serviceId.includes('webapp') || 
      serviceId.includes('ecommerce-development') || 
      serviceId.includes('shopify') || 
      serviceId.includes('wordpress') || 
      serviceId.includes('pos') || 
      serviceId.includes('backend') || 
      serviceId.includes('custom-software') ||
      serviceId.includes('custom-web') ||
      serviceId.includes('website-development')) {
    return 'development';
  }
  
  if (serviceId.includes('seo') || 
      serviceId.includes('content-strategy') || 
      serviceId.includes('keyword') ||
      serviceId.includes('local-seo') ||
      serviceId.includes('technical-seo') ||
      serviceId.includes('on-page') ||
      serviceId.includes('off-page') ||
      serviceId.includes('ecommerce-seo')) {
    return 'seo';
  }
  
  return 'design'; // fallback to design category
};

// Helper function to get category-specific titles
const getCategoryTitles = (category: 'design' | 'development' | 'seo', serviceName: string) => {
  switch (category) {
    case 'design':
      return {
        title: 'Related Design',
        subtitle: 'Services You Might Need'
      };
    case 'development':
      return {
        title: 'Other Development',
        subtitle: 'Solutions We Offer'
      };
    case 'seo':
      return {
        title: 'Complete SEO',
        subtitle: 'Service Portfolio'
      };
    default:
      return {
        title: 'Related',
        subtitle: 'Services'
      };
  }
};

interface ServicePageProps {
  params: Promise<{ id: string }>; // Next.js 15+ async params
}

const ServicePage: React.FC<ServicePageProps> = ({ params }) => {
  const [service, setService] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);

  // Resolve async params
  React.useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setResolvedParams(resolvedParams);
      } catch (error) {
        console.error('Error resolving params:', error);
        setError('Failed to load page parameters');
      }
    };

    resolveParams();
  }, [params]);

  // Fetch service data when params are resolved
  React.useEffect(() => {
    const fetchService = async () => {
      if (!resolvedParams?.id) return;

      try {
        setLoading(true);
        setError(null);
        
        // Fetch service data using string ID
        const serviceData = await getServiceById(resolvedParams.id);
        
        if (!serviceData) {
          setError('Service not found');
          return;
        }
        
        setService(serviceData);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to load service data');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [resolvedParams]);

  // Loading state - Use the professional loader
  if (loading || !resolvedParams) {
    return (
      <ServiceLoader 
        message={!resolvedParams ? 'Initializing service...' : 'Loading service details...'}
        type="service"
      />
    );
  }

  // Error state - Professional error loader
  if (error || !service) {
    return (
      <>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #04091D 0%, #0F1A2E 25%, #1B2A45 50%, #0D98BA 100%);
            color: #FFFFFF;
            text-align: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }

          .error-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, rgba(255, 59, 59, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(13, 152, 186, 0.05) 0%, transparent 50%);
            animation: errorPulse 3s ease-in-out infinite;
          }

          .error-content {
            position: relative;
            z-index: 2;
            max-width: 600px;
            width: 100%;
          }

          .error-icon {
            font-size: 4rem;
            color: #0D98BA;
            margin-bottom: 1rem;
            display: block;
            animation: bounce 2s ease-in-out infinite;
          }

          .error-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #0D98BA;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .error-subtitle {
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 1rem;
            opacity: 0.9;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .error-description {
            font-size: 1rem;
            margin-bottom: 2rem;
            opacity: 0.7;
            line-height: 1.6;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .error-button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #0D98BA 0%, #0A7A94 100%);
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(13, 152, 186, 0.3);
            border: none;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .error-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(13, 152, 186, 0.4);
            background: linear-gradient(135deg, #0A7A94 0%, #087A94 100%);
          }

          @keyframes errorPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }

          @media (max-width: 768px) {
            .error-title { font-size: 2.5rem; }
            .error-subtitle { font-size: 1.25rem; }
            .error-container { padding: 16px; }
          }

          @media (max-width: 480px) {
            .error-title { font-size: 2rem; }
            .error-subtitle { font-size: 1.125rem; }
            .error-icon { font-size: 3rem; }
          }
        `}</style>
        
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h1 className="error-title">
              {error?.includes('not found') ? '404' : 'Oops!'}
            </h1>
            <h2 className="error-subtitle">
              {error?.includes('not found') ? 'Service Not Found' : 'Something Went Wrong'}
            </h2>
            <p className="error-description">
              {error || 'The service you\'re looking for doesn\'t exist or has been moved. Don\'t worry, we\'ll help you find what you need.'}
            </p>
            <a href="/services" className="error-button">
              View All Services
            </a>
          </div>
        </div>
      </>
    );
  }

  // Prepare data for the banner
  const bannerData = {
    title: service.title,
    description: service.description,
    image: service.bannerImage || service.image, // Fallback to regular image if no banner
    features: service.features || []
  };

  // Get numeric ID for backward compatibility with existing components
  const numericServiceId = getNumericServiceId(resolvedParams.id);
  
  // Determine service category for dynamic trust section
  const serviceCategory = getCategoryFromService(resolvedParams.id);
  const categoryTitles = getCategoryTitles(serviceCategory, service.title);

  return (
    <>
      {/* Global CSS Reset for TrustSection - Prevents navbar conflicts */}
      <style jsx global>{`
        /* Create isolated environment for trust section */
        .trust-section-isolation {
          /* Reset all inherited styles */
          all: initial;
          /* Restore essential properties */
          display: block;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          /* Set proper font stack */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          /* Create stacking context */
          z-index: 0;
          isolation: isolate;
          /* Prevent layout issues */
          contain: layout style paint;
        }

        /* Reset everything inside trust section */
        .trust-section-isolation * {
          box-sizing: border-box;
        }

        /* Override any navbar global resets within trust section */
        .trust-section-isolation *:not(.navbar):not(.navbar *):not(.menu-side):not(.menu-side *):not(.service-slider):not(.service-slider *) {
          /* Restore normal behavior */
          margin: unset;
          padding: unset;
        }

        /* Ensure no navbar z-index conflicts */
        .trust-section-isolation {
          position: relative;
          z-index: 1;
        }

        /* Mobile specific fixes */
        @media (max-width: 768px) {
          .trust-section-isolation {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            overflow-x: hidden;
          }
        }

        /* Performance optimizations */
        .trust-section-isolation {
          will-change: auto;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Prevent font inheritance conflicts */
        .trust-section-isolation {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      <div>
        {/* Service Banner */}
        <ServiceDetailBanner service={bannerData} />
        <ContactForm2 serviceId={resolvedParams.id} />
        <StatsSection />
    
        <FeaturedWorkShowcase 
          serviceId={numericServiceId} // Pass numeric ID for backward compatibility
          backgroundImage={showcaseBackground}
          monitorImage={monitorFrameImage}
        />
        
        {/* Service Process Section */}
        <WebDesignProcess serviceId={resolvedParams.id} />

        {/* Service Contact Section */}
        <HeroSection />
        
        {/* Trust Section - Isolated from navbar conflicts */}
        <div className="trust-section-isolation">
          <TrustSection 
            category={serviceCategory}
            title={categoryTitles.title}
            subtitle={categoryTitles.subtitle}
            enableServiceLinks={true}
          />
        </div>

        <Newsletter /> 
        <ServiceFAQ serviceId={numericServiceId} /> 
        <ProjectCTA />
        <LandingPage />
      </div>
    </>
  );
};

export default ServicePage;
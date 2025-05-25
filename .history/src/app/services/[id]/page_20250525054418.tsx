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

  // Loading state (while resolving params or fetching service)
  if (loading || !resolvedParams) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        color: '#FFFFFF',
        fontSize: '18px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #0D98BA',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          {!resolvedParams ? 'Initializing...' : 'Loading service details...'}
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !service) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #04091D 39.13%, #0D98BA 263.77%)',
        color: '#FFFFFF',
        fontSize: '18px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          maxWidth: '600px'
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            marginBottom: '20px',
            color: '#0D98BA'
          }}>
            404
          </h1>
          <h2 style={{ 
            fontSize: '24px', 
            marginBottom: '20px' 
          }}>
            Service Not Found
          </h2>
          <p style={{ 
            marginBottom: '30px',
            opacity: 0.8,
            lineHeight: '1.6'
          }}>
            {error || 'The service you\'re looking for doesn\'t exist or has been moved.'}
          </p>
          <a 
            href="/services" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#0D98BA',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#0A7A94'}
            onMouseOut={(e) => e.currentTarget.style.background = '#0D98BA'}
          >
            View All Services
          </a>
        </div>
      </div>
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
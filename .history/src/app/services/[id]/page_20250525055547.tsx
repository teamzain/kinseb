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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #04091D 0%, #0D1B2A 50%, #0D98BA 100%)',
          backgroundSize: '400% 400%',
          color: '#FFFFFF',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
          textAlign: 'center',
          padding: '2rem',
          zIndex: 9999,
          overflow: 'hidden'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes gradientMove {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            
            .loading-container-inline {
              animation: gradientMove 6s ease infinite !important;
            }
            
            .inline-spinner {
              width: 60px;
              height: 60px;
              border: 3px solid rgba(13, 152, 186, 0.2);
              border-top: 3px solid #0D98BA;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 2rem;
              position: relative;
            }
            
            .inline-spinner::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 8px;
              height: 8px;
              background: #0D98BA;
              border-radius: 50%;
              animation: pulse 1.5s ease-in-out infinite;
            }
            
            @media (max-width: 640px) {
              .inline-spinner {
                width: 50px !important;
                height: 50px !important;
              }
            }
          `
        }} />
        
        <div className="loading-container-inline" style={{ position: 'relative', zIndex: 1, animation: 'fadeIn 0.8s ease-out', maxWidth: '400px', width: '100%' }}>
          <div className="inline-spinner"></div>
          
          <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.025em', animation: 'pulse 2s ease-in-out infinite' }}>
            {!resolvedParams ? 'Initializing' : 'Loading service details'}
            <span style={{ display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }}>...</span>
          </div>
          
          <div style={{ fontSize: '0.875rem', opacity: 0.8, fontWeight: 400, lineHeight: 1.6 }}>
            {!resolvedParams 
              ? 'Setting up your experience' 
              : 'Please wait while we prepare your content'
            }
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !service) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #04091D 0%, #1A1A2E 50%, #16213E 100%)',
          color: '#FFFFFF',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
          textAlign: 'center',
          padding: '2rem',
          zIndex: 9999,
          overflow: 'hidden'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .error-content-inline {
              animation: fadeInUp 0.8s ease-out !important;
            }
            
            .error-button-primary {
              background: linear-gradient(135deg, #0D98BA 0%, #48CAE4 100%) !important;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              box-shadow: 0 4px 14px 0 rgba(13, 152, 186, 0.3) !important;
            }
            
            .error-button-primary:hover {
              background: linear-gradient(135deg, #0A7A94 0%, #29B6D1 100%) !important;
              transform: translateY(-2px) !important;
              box-shadow: 0 8px 25px 0 rgba(13, 152, 186, 0.4) !important;
            }
          `
        }} />
        
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 127, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div className="error-content-inline" style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '600px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '6rem',
            fontWeight: 800,
            color: '#DC267F',
            marginBottom: '1rem',
            textShadow: '0 0 20px rgba(220, 38, 127, 0.3)',
            lineHeight: 1
          }}>
            404
          </div>
          
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#FFFFFF'
          }}>
            Service Not Found
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            opacity: 0.8,
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            fontWeight: 400
          }}>
            {error || 'The service you\'re looking for doesn\'t exist or has been moved. Please check the URL or browse our available services.'}
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <a 
              href="/services" 
              className="error-button-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.875rem 2rem',
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: '200px'
              }}
            >
              View All Services
            </a>
            
            <a 
              href="/" 
              style={{
                color: '#0D98BA',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem',
                opacity: 0.8
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Back to Home
            </a>
          </div>
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
      {/* Global CSS Reset for Professional Layout */}
      <style jsx global>{`
        /* Professional layout improvements */
        .service-page-container {
          min-height: 100vh;
          background: #FFFFFF;
          position: relative;
          overflow-x: hidden;
        }
        
        /* Enhanced Trust Section Isolation */
        .trust-section-isolation {
          all: initial;
          display: block;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          z-index: 0;
          isolation: isolate;
          contain: layout style paint;
          background: #FFFFFF;
        }

        .trust-section-isolation * {
          box-sizing: border-box;
        }

        .trust-section-isolation *:not(.navbar):not(.navbar *):not(.menu-side):not(.menu-side *):not(.service-slider):not(.service-slider *) {
          margin: unset;
          padding: unset;
        }

        .trust-section-isolation {
          position: relative;
          z-index: 1;
        }

        /* Enhanced Mobile Responsiveness */
        @media (max-width: 640px) {
          .trust-section-isolation {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            overflow-x: hidden;
          }
          
          .service-page-container {
            padding: 0;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .service-page-container {
            padding: 0;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 1025px) {
          .service-page-container {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        /* Performance optimizations */
        .trust-section-isolation {
          will-change: auto;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Enhanced font rendering */
        .trust-section-isolation {
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Section spacing improvements */
        .service-section {
          position: relative;
          z-index: 1;
        }

        .service-section:not(:last-child) {
          margin-bottom: 0;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Focus improvements for accessibility */
        *:focus {
          outline: 2px solid #0D98BA;
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .service-page-container {
            background: #FFFFFF;
            color: #000000;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>

      <div className="service-page-container">
        {/* Service Banner */}
        <section className="service-section">
          <ServiceDetailBanner service={bannerData} />
        </section>

        {/* Contact Form */}
        <section className="service-section">
          <ContactForm2 serviceId={resolvedParams.id} />
        </section>

        {/* Stats Section */}
        <section className="service-section">
          <StatsSection />
        </section>
    
        {/* Featured Work Showcase */}
        <section className="service-section">
          <FeaturedWorkShowcase 
            serviceId={numericServiceId}
            backgroundImage={showcaseBackground}
            monitorImage={monitorFrameImage}
          />
        </section>
        
        {/* Service Process Section */}
        <section className="service-section">
          <WebDesignProcess serviceId={resolvedParams.id} />
        </section>

        {/* Service Contact Section */}
        <section className="service-section">
          <HeroSection />
        </section>
        
        {/* Trust Section - Professionally Isolated */}
        <section className="service-section">
          <div className="trust-section-isolation">
            <TrustSection 
              category={serviceCategory}
              title={categoryTitles.title}
              subtitle={categoryTitles.subtitle}
              enableServiceLinks={true}
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="service-section">
          <Newsletter />
        </section>

        {/* FAQ Section */}
        <section className="service-section">
          <ServiceFAQ serviceId={numericServiceId} />
        </section>

        {/* CTA Section */}
        <section className="service-section">
          <ProjectCTA />
        </section>

        {/* Landing Page Form */}
        <section className="service-section">
          <LandingPage />
        </section>
      </div>
    </>
  );
};

export default ServicePage;
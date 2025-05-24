'use client';

import React from 'react';
import ServiceDetailBanner from '@/app/components/ServiceDetailBanner';
import FeaturedWorkShowcase from '@/app/components/ServiceDetailFeature';
import ServiceFAQ from '@/app/components/ServiceFAQ';
import HeroSection from '@/app/components/ServiceContact';
import { getServiceById } from '@/app/components/serviceData';
import { showcaseBackground, monitorFrameImage } from '@/app/components/featuredWorkData';
import WebDesignProcess from'@/app/components/process';
import Newsletter from '@/app/components/Newsletter';
import TrustSection from '@/app/components/TrustSection';
import LandingPage from '@/app/components/ContactForm';
import ProjectCTA from '@/app/components/CTA2';
const ServicePage = ({ params }: { params: { id: string } }) => {
  const [service, setService] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchService = async () => {
      try {
        const id = parseInt(params.id, 10);
        const serviceData = await getServiceById(id);
        setService(serviceData);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  // Prepare data for the banner
  const bannerData = {
    title: service.title,
    description: service.description,
    image: service.bannerImage,
    features: service.features
  };

  // Get the numeric service ID
  const serviceId = parseInt(params.id, 10);

  return (
    <div>
      {/* Service Banner */}
      <ServiceDetailBanner service={bannerData} />
      
      {/* Featured Work Showcase */}
      <FeaturedWorkShowcase 
        serviceId={serviceId}
        backgroundImage={showcaseBackground}
        monitorImage={monitorFrameImage}
      />
      <WebDesignProcess />
      {/* Service FAQ Section */}
  
      <HeroSection />
      <TrustSection/>
   <Newsletter />
       <ServiceFAQ serviceId={serviceId} />
       <ProjectCTA />
    </div>
  );
};

export default ServicePage;
'use client';

import React from 'react';
import ServiceDetailBanner from '@/app/components/ServiceDetailBanner';
import FeaturedWorkShowcase from '@/app/components/FeaturedWorkShowcase';
import { getServiceById } from '@/app/components/serviceData';
import { featuredProjects, showcaseBackground } from '@/app/components/featuredWorkData';

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

  return (
    <div>
      {/* Service Banner */}
      <ServiceDetailBanner service={bannerData} />
      
      {/* Featured Work Showcase */}
      <FeaturedWorkShowcase 
        projects={featuredProjects} 
        backgroundImage={showcaseBackground} 
      />
      
      {/* Rest of your service page content */}
      {/* ... */}
    </div>
  );
};

export default ServicePage;
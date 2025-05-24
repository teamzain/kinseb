// Import only essential components for initial render

import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';

// Dynamically import non-critical components
const  WebDevelopmentServicesSection= dynamic(() => import('../components/ServiceBanner'));
const  Newsletter= dynamic(() => import('../components/Newsletter'));

const  ContactSection= dynamic(() => import('../components/ContactForm'));
const  SEOSection= dynamic(() => import('../components/SEO'));
const  WebDesignSection= dynamic(() => import('../components/WebDesign'));
const  ServiceSection= dynamic(() => import('../components/ServiceSection'));
const     WebDevelopmentSection= dynamic(() => import('../components/WebDevelopment'));
const  WhatMattersComponent= dynamic(() => import('../components/WhatMatter'));

const     DevelopmentService= dynamic(() => import('../components/DevelopmentService'));
const     SEOService= dynamic(() => import('../components/SEOService'));
const TestimonialSlider = dynamic(() => import('../components/testimonial'));
const WebsiteMaintenanceSection= dynamic(() => import('../components/WebsiteMaintainance'));
export default function services() {
  return (
    <PageWithTransition>
      <main>
        {/* done */}
     <WebDevelopmentServicesSection /> 
    
     <WhatMattersComponent />
     {/* done */}
     <WebDesignSection />
    
     <ServiceSection />
      <WebDevelopmentSection />
      <DevelopmentService />
     <SEOSection />
     <SEOService />
     <WebsiteMaintenanceSection />
     <TestimonialSlider/>
     <Newsletter />
     
             <ContactSection />
             
             
      </main>
    </PageWithTransition>
  );
}
// Import only essential components for initial render

import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';

// Dynamically import non-critical components
const  WebDevelopmentServicesSection= dynamic(() => import('../components/ServiceBanner'));
const  Newsletter= dynamic(() => import('../components/Newsletter'));
const  WebSolutions= dynamic(() => import('../components/Services'));
const  ContactSection= dynamic(() => import('../components/ContactForm'));
const  WebDesignSection= dynamic(() => import('../components/WebDesign'));
export default function services() {
  return (
    <PageWithTransition>
      <main>
     <WebDevelopmentServicesSection />
     <WebDesignSection />
     <Newsletter />
        <WebSolutions />
             <ContactSection />
             
      </main>
    </PageWithTransition>
  );
}
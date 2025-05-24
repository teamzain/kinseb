// Import only essential components for initial render

import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';

// Dynamically import non-critical components
const  WebDevelopmentServicesSection= dynamic(() => import('../components/ServiceBanner'));


export default function Home() {
  return (
    <PageWithTransition>
      <main>
     <WebDevelopmentServicesSection />
      </main>
    </PageWithTransition>
  );
}
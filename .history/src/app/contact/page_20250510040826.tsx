// Import only essential components for initial render

import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';

// Dynamically import non-critical components
const ContactPage = dynamic(() => import('../components/ContactPage'));


export default function Home() {
  return (
    <PageWithTransition>
      <main>
        {/* Critical component loaded immediately */}
        <ContactPage />
 
      </main>
    </PageWithTransition>
  );
}
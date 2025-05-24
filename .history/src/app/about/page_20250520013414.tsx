// Import only essential components for initial render
import Banner from '../components/AboutBanner';
import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';
import Mission from '../components/Mission';

// Dynamically import non-critical components
const TrustSection = dynamic(() => import('../components/TrustSection'));
const ProjectCTA = dynamic(() => import('../components/CTA2'));
const ContactSection = dynamic(() => import('../components/ContactForm'));
const WebSolutions = dynamic(() => import('../components/Services'));

export default function About() {
  return (
    
    
    <PageWithTransition>
      <main>
        {/* Critical component loaded immediately */}
        <Banner />
        <Mission />
        
        {/* Non-critical components loaded after page is visible */}
        <TrustSection />
        <ProjectCTA />
        <WebSolutions />
        <ContactSection />
      </main>
    </PageWithTransition>
  );
}

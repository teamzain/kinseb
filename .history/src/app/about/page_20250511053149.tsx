// Import only essential components for initial render
import Banner from '../components/AboutBanner'
import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';
import Mission from '../components/Mission';
import TrustSection from '../components/TrustSection';
import ProjectCTA from '../components/CTA2';
import ContactSection from '../components/ContactForm';
import WebSolutions from '../components/Services';

export default function about() {
  return (
    <PageWithTransition>
      <main>
        {/* Critical component loaded immediately */}
        <Banner />
        <Mission />
        <TrustSection />
        <ProjectCTA />
        {/* <WebSolutions /> */}
        <ContactSection />
        {/* Non-critical components loaded after page is visible */}
     
      </main>
    </PageWithTransition>
  );
}
// Import only essential components for initial render
import HeroSection from '../components/HeroSection';
import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';



export default function about() {
  return (
    <PageWithTransition>
      <main>
        {/* Critical component loaded immediately */}
        <HeroSection />
        
        {/* Non-critical components loaded after page is visible */}
     
      </main>
    </PageWithTransition>
  );
}
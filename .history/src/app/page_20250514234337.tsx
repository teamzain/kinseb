// Import only essential components for initial render
import HeroSection from './components/HeroSection';
import dynamic from 'next/dynamic';
import PageWithTransition from './components/PageWithTransition';
import HeroSectioncta from './components/CTA';
// Dynamically import non-critical components
const TechStackMarquee = dynamic(() => import('./components/Marquee'));
const BusinessServices = dynamic(() => import('./components/BusinnessService'));
const StatsSection = dynamic(() => import('./components/stats'));
const KinsebWebDevelopment = dynamic(() => import('./components/whyus'));
const TestimonialSlider = dynamic(() => import('./components/testimonial'));
const Service= dynamic(() => import('./components/Service'));
const Process= dynamic(() => import('./components/process'));


export default function Home() {
  return (
    <PageWithTransition>
      <main>
        {/* Critical component loaded immediately */}
        <HeroSection />
        
        
        {/* Non-critical components loaded after page is visible */}
        <TechStackMarquee />
        <BusinessServices />
        <StatsSection />
        <KinsebWebDevelopment />
        <Service />
        <TestimonialSlider />
        <HeroSectioncta/>
              </main>
    </PageWithTransition>
  );
}
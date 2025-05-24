// Import only essential components for initial render
import HeroSection from './components/HeroSection';
import dynamic from 'next/dynamic';

// Dynamically import non-critical components
const TechStackMarquee = dynamic(() => import('./components/Marquee'), { ssr: false });
const BusinessServices = dynamic(() => import('./components/BusinnessService'), { ssr: false });
const StatsSection = dynamic(() => import('./components/stats'), { ssr: false });
const KinsebWebDevelopment = dynamic(() => import('./components/whyus'), { ssr: false });
const TestimonialSlider = dynamic(() => import('./components/testimonial'), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* Critical component loaded immediately */}
      <HeroSection />
      
      {/* Non-critical components loaded after page is visible */}
      <TechStackMarquee />
      <BusinessServices />
      <StatsSection />
      <KinsebWebDevelopment />
      <TestimonialSlider />
    </main>
  );
}
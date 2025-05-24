// Import components used in the Home page
import HeroSection from './components/HeroSection';
import TechStackMarquee from './components/Marquee';
import BusinessServices from './components/BusinnessService';
import StatsSection from './components/stats';
import KinsebWebDevelopment from './components/whyus';
import TestimonialSlider from './components/testimonial';
import PageWithTransition from './components/PageWithTransition'
export default function Home() {
  return (
    <PageWithTransition />
    <main>
      {/* Optional: Uncomment and add components you want to display */}
      <HeroSection />
      <TechStackMarquee />
      <BusinessServices />
      <StatsSection />
      <KinsebWebDevelopment />
      <TestimonialSlider />
    </main>
  );
}

// Import components used in the Home page
import BusinessServices from './components/BusinnessService';
import StatsSection from './components/stats';
import KinsebWebDevelopment from './components/whyus';
import TestimonialSlider from './components/testimonial';

export default function Home() {
  return (
    <main>
      {/* Optional: Uncomment and add components you want to display */}
      {/* <HeroSection /> */}
      {/* <TechStackMarquee /> */}
      <BusinessServices />
      <StatsSection />
      <KinsebWebDevelopment />
      <TestimonialSlider />
    </main>
  );
}

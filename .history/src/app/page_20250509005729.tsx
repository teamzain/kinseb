import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import dynamic from 'next/dynamic';
import PageWithTransition from './components/PageWithTransition';

// Only load immediately visible components
// Use lightweight loading fallbacks for better perceived performance
const TechStackMarquee = dynamic(() => import('./components/Marquee'), {
  loading: () => <div className="marquee-placeholder" aria-hidden="true" />,
  ssr: false // Client-side only to speed up initial HTML generation
});

// Lazy load everything below the fold with lower priority
const BusinessServices = dynamic(() => import('./components/BusinnessService'), {
  loading: () => <div className="services-placeholder" aria-hidden="true" />
});

// Components further down the page have even lower priority
const StatsSection = dynamic(() => import('./components/stats'), { ssr: false });
const KinsebWebDevelopment = dynamic(() => import('./components/whyus'), { ssr: false });
const TestimonialSlider = dynamic(() => import('./components/testimonial'), { ssr: false });

export default function Home() {
  return (
    <PageWithTransition>
      {/* Critical component loaded immediately */}
      <HeroSection />
      
      {/* Second most important component */}
      <TechStackMarquee />
      
      {/* Components below the fold wrapped in Suspense boundaries */}
      <Suspense fallback={<div className="services-placeholder" />}>
        <BusinessServices />
      </Suspense>
      
      <Suspense fallback={<div className="stats-placeholder" />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<div className="whyus-placeholder" />}>
        <KinsebWebDevelopment />
      </Suspense>
      
      <Suspense fallback={<div className="testimonials-placeholder" />}>
        <TestimonialSlider />
      </Suspense>
    </PageWithTransition>
  );
}
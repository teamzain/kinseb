'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PageWithTransition from './PageWithTransition';

// In a client component, we can safely use ssr: false
const TechStackMarquee = dynamic(() => import('./Marquee'), {
  loading: () => <div className="marquee-placeholder" aria-hidden="true" />,
  ssr: false 
});

// Lazy load everything below the fold with lower priority
const BusinessServices = dynamic(() => import('./BusinnessService'), {
  loading: () => <div className="services-placeholder" aria-hidden="true" />
});

// Components further down the page with lower priority
const StatsSection = dynamic(() => import('./stats'), { 
  ssr: false 
});

const KinsebWebDevelopment = dynamic(() => import('./whyus'), { 
  ssr: false 
});

const TestimonialSlider = dynamic(() => import('./testimonial'), { 
  ssr: false 
});

export default function HomeContent() {
  return (
    <PageWithTransition>
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
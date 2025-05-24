'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false });
const TechStackMarquee = dynamic(() => import('./components/Marquee'), { ssr: false });
const BusinessServices = dynamic(() => import('./components/BusinnessService'), { ssr: false });
const StatsSection = dynamic(() => import('./components/stats'), { ssr: false });
const TestimonialSlider = dynamic(() => import('./components/testimonial'), { ssr: false });
const KinsebWebDevelopment = dynamic(() => import('./components/whyus'), { ssr: false });
// const LoadingScreen = dynamic(() => import('./loading'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Kinseb Web Development | Websites That Drive Growth</title>
        <meta name="description" content="We build responsive, SEO-optimized websites for businesses of all sizes" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main>
        {/* {isLoading ? <LoadingScreen /> : ( */}
          <>
            <HeroSection />
            <TechStackMarquee />
            <BusinessServices />
            <StatsSection />
            <KinsebWebDevelopment />
            <TestimonialSlider />
          </>
        {/* )} */}
      </main>
    </>
  );
}

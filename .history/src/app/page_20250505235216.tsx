// page.tsx

import { useEffect, useState } from 'react';
import Head from 'next/head';
import LoadingScreen from './loading';
import HeroSection from './components/HeroSection';
import Navbar from './components/navbar';
import TechStackMarquee from './components/Marquee';
import BusinessServices from './components/BusinnessService';
import StatsSection from './components/stats';
import TestimonialSlider from './components/testimonial';
import WebDesignProcessSlider from './components/process';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>Kinseb Web Development | Websites That Drive Growth</title>
        <meta name="description" content="We build responsive, SEO-optimized websites for businesses of all sizes" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      
      <main>
        {/* <Navbar /> */}
        <HeroSection />
        <TechStackMarquee />
        <BusinessServices />  
        <StatsSection />
        <TestimonialSlider />
        <WebDesignProcessSlider />
      </main>
    </>
  );
}

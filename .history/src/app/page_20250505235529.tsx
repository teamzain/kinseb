'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import LoadingScreen from '../Loading'; // Update path as needed
import HeroSection from './components/HeroSection';
import Navbar from './components/navbar';
import TechStackMarquee from './components/Marquee';
import BusinessServices from './components/BusinnessService';
import StatsSection from './components/stats';
import TestimonialSlider from './components/testimonial';
import WebDesignProcessSlider from './components/process';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
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
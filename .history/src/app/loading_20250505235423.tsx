// First, rename your loading.tsx to LoadingScreen.tsx
// components/LoadingScreen.tsx
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <Loader2 className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform text-primary animate-spin sm:h-10 sm:w-10" />
                </div>
                <p className="mt-4 text-base font-medium text-primary sm:text-lg">
                    Loading
                    <span className="inline-flex animate-pulse">
                        <span className="mx-[1px]">.</span>
                        <span className="mx-[1px] animate-delay-200">.</span>
                        <span className="mx-[1px] animate-delay-400">.</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;

// Then update your page.tsx file
// page.tsx
'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import LoadingScreen from '../components/LoadingScreen'; // Update path as needed
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

// If you're using Next.js 13+ app router, you may also need a loading.tsx file
// for built-in Suspense:
// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <p className="mt-4 text-base font-medium text-primary">Loading...</p>
      </div>
    </div>
  );
}
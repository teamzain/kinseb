// DO NOT use 'use client' here
import Head from 'next/head';
import HeroSection from './components/HeroSection';
import Navbar from './components/navbar';
import TechStackMarquee from './components/Marquee';
import BusinessServices from './components/BusinnessService';
import StatsSection from './components/stats';
import TestimonialSlider from './components/testimonial';
import KinsebWebDevelopment from './components/whyus';
// import WebDevelopmentComponent from './components/Service';
// import WebDesignProcessSlider from './components/process';
// import HeroSections from './components/CTA';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kinseb Web Development | Websites That Drive Growth</title>
        <meta name="description" content="We build responsive, SEO-optimized websites for businesses of all sizes" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main>
        {/* <HeroSection /> */}
        <TechStackMarquee />
        <BusinessServices />
        <StatsSection />
        <KinsebWebDevelopment />
        <TestimonialSlider />
        {/* <WebDevelopmentComponent />
        <WebDesignProcessSlider />
        <HeroSections /> */}
      </main>
    </>
  );
}

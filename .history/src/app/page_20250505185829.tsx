// pages/index.js
import Head from 'next/head'
import HeroSection from './components/HeroSection'
import Navbar from './components/navbar'
import TechStackMarquee from './components/Marquee'
import BusinessServices from './components/BusinnessService'
import { Suspense } from 'react'
export default function Home() {
  return (
    <>
      <Head>
        <title>Kinseb Web Development | Websites That Drive Growth</title>
        <meta name="description" content="We build responsive, SEO-optimized websites for businesses of all sizes" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      
      <main>
{/* <Navbar /> */}

      {/* <Suspense><HeroSection /></Suspense>
      <Suspense><TechStackMarquee /></Suspense>
      <Suspense>  <BusinessServices /> </Suspense> */}
        
     
        {/* Other sections of your landing page would go here */}
      </main>
    </>
  )
}
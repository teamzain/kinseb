// pages/index.js
import Head from 'next/head'
import HeroSection from './components/HeroSection'
import Navbar from './components/navbar'
import TechStackMarquee from './components/Marquee'
import BusinessServices from './components/BusinnessService'
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
        {/* <HeroSection />
        <TechStackMarquee />
       <BusinessServices />  */}
        {/* Other sections of your landing page would go here */}
      </main>
    </>
  )
}
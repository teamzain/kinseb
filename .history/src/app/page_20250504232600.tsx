// pages/index.js
import Head from 'next/head'
import HeroSection from './components/HeroSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Web Development | Websites That Drive Growth</title>
        <meta name="description" content="We build responsive, SEO-optimized websites for businesses of all sizes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <HeroSection />
        {/* Other sections of your landing page would go here */}
      </main>
    </>
  )
}
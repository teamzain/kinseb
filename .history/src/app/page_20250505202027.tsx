import HeroSection from './components/HeroSection';
// import Navbar from './components/navbar';
import TechStackMarquee from './components/Marquee';
import BusinessServices from './components/BusinnessService';

export default async function Home() {
  // Simulate delay to test loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main>
      {/* <Navbar /> */}
      <HeroSection />
      {/* <TechStackMarquee /> */}
      {/* <BusinessServices /> */}
    </main>
  );
}

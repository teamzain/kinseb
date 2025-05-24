// This is a Server Component (the default in App Router)
// Server components should NOT use ssr: false

import HeroSection from './components/HeroSection';
import HomeContent from './components/HomeContent';

export default function Home() {
  return (
    <>
      {/* Critical component loaded immediately in the server component */}
      <HeroSection />
      
      {/* All other components moved to a client component */}
      <HomeContent />
    </>
  );
}
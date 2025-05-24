// Import only essential components for initial render
import Banner from '../components/AboutBanner'
import dynamic from 'next/dynamic';
import PageWithTransition from '../components/PageWithTransition';
import Mission from '../components/Mission';


export default function about() {
  return (
    <PageWithTransition>
      <main>
        {/* Critical component loaded immediately */}
        <Banner />
        <Mission />
        {/* Non-critical components loaded after page is visible */}
     
      </main>
    </PageWithTransition>
  );
}
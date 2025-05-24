// 'use client' directive tells Next.js to treat this as a client-side component
'use client';

import { useEffect, useState } from 'react';
import Footer from './components/footer';
import Loader from './components/Loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kinseb Web Development | Websites That Drive Growth',
  description: 'We build responsive, SEO-optimized websites for businesses of all sizes',
  icons: {
    icon: '/images/logo.svg', // Set favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 500ms (you can adjust based on your needs)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load Inter font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif' }}>
        {loading && <Loader />} {/* Show loader while the page is loading */}
        {children} {/* Render the rest of the page */}
        <Footer />
      </body>
    </html>
  );
}

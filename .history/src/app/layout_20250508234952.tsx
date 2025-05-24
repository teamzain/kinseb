import { Metadata } from 'next';
import './global.css';
import Footer from './components/footer';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';

// Define metadata for the page
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
    // Set loading to false after everything is loaded
    const timer = setTimeout(() => setLoading(false), 500); // Adjust the time based on your needs
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Preconnect for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load the Inter font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif' }}>
        {loading && <Loader />} {/* Show loader while loading */}
        {children}
        <Footer />
      </body>
    </html>
  );
}

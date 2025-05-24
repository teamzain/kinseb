import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Impo only critical styles
import './transition.css';

// Optimize font loading - load only latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  variable: '--font-inter',
});

// Dynamically load components for performance
const Navbar = dynamic(() => import('./components/navbar'), { 
  loading: () => <div className="nav-placeholder" aria-hidden="true" /> 
});

// Client-side wrapper (handles components that need ssr: false)
const ClientWrapper = dynamic(() => import('./components/ClientWrapper'));

export const metadata: Metadata = {
  title: 'Kinseb Web Development | Websites That Drive Growth',
  description: 'We build responsive, SEO-optimized websites for businesses of all sizes',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preload critical assets with priority */}
        <link rel="preload" href="/images/logo.svg" as="image" fetchPriority="high" />
        
        {/* Add this to speed up image loading */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Deferred non-critical CSS - loaded with media="print" first */}
        <link 
          rel="stylesheet" 
          href="/styles/non-critical.css" 
          media="print" 
        />
      </head>
      <body style={{ margin: 0 }}>
        <Navbar />
        <ClientWrapper>
          <main>{children}</main>
        </ClientWrapper>
        
        {/* Handle deferred CSS loading with Next.js Script component */}
        <Script id="load-non-critical-css" strategy="afterInteractive">
          {`
            (function() {
              var nonCriticalCss = document.querySelector('link[href="/styles/non-critical.css"]');
              if (nonCriticalCss) {
                nonCriticalCss.media = 'all';
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

// Import only critical styles
import './styles/transition.css'; // Create this minimal CSS file with only essential styles

// Optimize font loading - load only latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'], // Add fallbacks
  variable: '--font-inter', // Use CSS variable for the font
});

// Dynamically load components with priority and loading indicators
const Navbar = dynamic(() => import('./components/navbar'), { 
  loading: () => <div className="nav-placeholder" aria-hidden="true" /> 
});

// Load footer with low priority since it's below the fold
const Footer = dynamic(() => import('./components/footer'), { 
  loading: () => <div className="footer-placeholder" aria-hidden="true" />,
  ssr: false // Footer can be client-side only as it's below fold
});

// Define metadata with key performance attributes
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
      </head>
      <body style={{ margin: 0 }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
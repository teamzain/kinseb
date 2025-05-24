import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

// Import styles
import './loading.css';

// Use next/font for optimized font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensure text remains visible during font load
});

// Dynamically load components that aren't needed for initial render
const Navbar = dynamic(() => import('./components/navbar'));
const Footer = dynamic(() => import('./components/footer'));

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Kinseb Web Development | Websites That Drive Growth',
  description: 'We build responsive, SEO-optimized websites for businesses of all sizes',
  icons: {
    icon: '/images/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/logo.svg" as="image" />
      </head>
      <body style={{ margin: 0 }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
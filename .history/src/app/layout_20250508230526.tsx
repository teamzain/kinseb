import type { Metadata } from 'next';
import Navbar from './components/navbar';
import Footer from './components/footer';

export const metadata: Metadata = {
  title: 'Kinseb Web Development',
  description: 'We build responsive, SEO-optimized websites for businesses of all sizes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can preload fonts or global CSS here if needed */}
      </head>
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

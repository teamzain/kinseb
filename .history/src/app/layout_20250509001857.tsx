import { Metadata } from 'next';
import './loading.css'; // Import the loading styles
import './button-fixes.css'; // Import the button fixes CSS
import Footer from './components/footer';
import Navbar from './components/navbar';

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
        {/* You can add other meta tags or links here */}
      </head>
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif' }}>
        {/* Navbar component */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
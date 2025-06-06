import { Metadata } from 'next';
import './loading.css'; // Import the loading styles
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
        
        {/* Add global CSS fixes to protect round buttons */}
        <style jsx global>{`
          /* Global CSS Fix for Round Buttons */
          /* This prevents hero section styles from breaking round buttons */
          
          /* Standard round button protection class */
          .menu-close,
          [class*="close"],  /* Target any element with 'close' in its class */
          button[class*="close"],
          .navbar .menu-close,
          .menu-side .menu-close,
          .close-icon,
          .circle-button,
          .round-button,
          .icon-button,
          [class*="circle"],  /* Target any element with 'circle' in its class */
          [class*="round"] {  /* Target any element with 'round' in its class */
            border-radius: 50% !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            /* Preserve width/height ratio */
            aspect-ratio: 1 / 1 !important;
            position: relative !important;
            /* Stop transform effects from other components */
            transform: none !important;
          }
          
          /* Specific fix for the menu close button */
          .menu-close {
            width: 36px !important;
            height: 36px !important;
            background-color: #091135 !important;
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* Fix for button SVGs or icons */
          .menu-close svg,
          .round-button svg,
          [class*="close"] svg,
          .circle-button svg,
          .icon-button svg,
          .close-icon svg,
          [class*="circle"] svg,
          [class*="round"] svg {
            width: 18px !important;
            height: 18px !important;
            position: static !important;
            margin: 0 auto !important;
            display: block !important;
            transform: none !important;
          }
          
          /* Prevent hover transformations from the hero section */
          .menu-close:hover,
          .round-button:hover,
          [class*="close"]:hover,
          .circle-button:hover,
          .icon-button:hover,
          .close-icon:hover,
          [class*="circle"]:hover,
          [class*="round"]:hover {
            transform: none !important;
            /* Optional: Set your own hover effect that won't conflict */
            opacity: 0.9 !important;
          }
          
          /* Media queries to ensure consistent sizing on mobile */
          @media (max-width: 768px) {
            .menu-close {
              width: 36px !important;
              height: 36px !important;
            }
          }
          
          @media (max-width: 480px) {
            .menu-close {
              width: 36px !important;
              height: 36px !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
'use client';

import { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StyleLoader from './StyleLoader';

// Client components can use ssr: false
const Footer = dynamic(() => import('./footer'), { 
  loading: () => <div className="footer-placeholder" aria-hidden="true" />,
  ssr: false 
});

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  // Optimize page load time on client side
  useEffect(() => {
    // Add a performance mark to track when components are mounted
    if (typeof performance !== 'undefined') {
      performance.mark('client-wrapper-mounted');
    }
    
    // Prefetch important links on the page
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.includes('#')) {
            const prefetcher = document.createElement('link');
            prefetcher.rel = 'prefetch';
            prefetcher.href = href;
            document.head.appendChild(prefetcher);
          }
        });
      });
    }
  }, []);

  return (
    <>
      {/* Handle non-critical CSS loading properly on the client side */}
      <StyleLoader href="/styles/non-critical.css" id="non-critical-styles" />
      
      {children}
      <Footer />
    </>
  );
}
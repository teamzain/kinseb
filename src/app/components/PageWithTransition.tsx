'use client';

import { useState, useEffect, ReactNode } from 'react';

interface PageWithTransitionProps {
  children: ReactNode;
}

export default function PageWithTransition({ children }: PageWithTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded immediately - no delay
    setIsLoaded(true);
    
    // Prefetch critical assets
    if (typeof window !== 'undefined') {
      const links = document.querySelectorAll('a[href]');
      links.forEach(link => {
        if (link instanceof HTMLAnchorElement && link.href.startsWith(window.location.origin)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = link.href;
          document.head.appendChild(prefetchLink);
        }
      });
    }
  }, []);

  return (
    <div 
      className={`page-content ${isLoaded ? 'content-loaded' : 'content-loading'}`}
      style={{ 
        transition: 'opacity 150ms ease-in', // Faster transition
        opacity: isLoaded ? 1 : 0
      }}
    >
      <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
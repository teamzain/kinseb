'use client';

import { useEffect } from 'react';
import { optimizeImages } from '../script/image-optimizer'

export default function ClientScripts() {
  useEffect(() => {
    // Run image optimization
    optimizeImages();
    
    // Add interaction observer for prefetching
    const prefetchOnHover = () => {
      const links = document.querySelectorAll('a[href]');
      
      links.forEach(link => {
        if (link instanceof HTMLAnchorElement && 
            link.href.startsWith(window.location.origin) && 
            !link.dataset.prefetched) {
          
          link.addEventListener('mouseenter', () => {
            // Mark as prefetched to avoid duplicate requests
            link.dataset.prefetched = 'true';
            
            // Preload the page
            const prefetcher = document.createElement('link');
            prefetcher.rel = 'prefetch';
            prefetcher.href = link.href;
            document.head.appendChild(prefetcher);
          }, { once: true });
        }
      });
    };
    
    // Run now and after content updates
    prefetchOnHover();
    
    // Remove unused event listeners to prevent memory leaks
    return () => {
      // Clean up code here if needed
    };
  }, []);
  
  return null; // This component doesn't render anything
}
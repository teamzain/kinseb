'use client';

import { useEffect } from 'react';

interface StyleLoaderProps {
  href: string;
  id?: string;
}

// Client component to handle dynamic loading of CSS files
export default function StyleLoader({ href, id }: StyleLoaderProps) {
  useEffect(() => {
    // Check if the stylesheet is already loaded
    const existingLink = document.querySelector(`link[href="${href}"]`);
    
    if (existingLink) {
      // If it exists and has print media, switch to all
      if (existingLink.getAttribute('media') === 'print') {
        existingLink.setAttribute('media', 'all');
      }
      return;
    }
    
    // If not found, create and append it
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.id = id;
    
    // Add load event listener
    link.addEventListener('load', () => {
      // Optional: trigger any actions after load
      console.log(`Stylesheet ${href} loaded`);
    });
    
    // Add error handling
    link.addEventListener('error', (error) => {
      console.error(`Error loading stylesheet ${href}:`, error);
    });
    
    // Append to head
    document.head.appendChild(link);
    
    // Cleanup function
    return () => {
      // Optional: remove the stylesheet when component unmounts
      // Usually you'd want to keep it, but this gives you the option
      // document.head.removeChild(link);
    };
  }, [href, id]);
  
  // This component doesn't render anything
  return null;
}
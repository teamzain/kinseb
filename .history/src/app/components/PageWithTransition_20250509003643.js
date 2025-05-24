"use client";

import { useState, useEffect } from 'react';

export default function PageWithTransition({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Show content with minimal delay
    // Using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    
    // Alternative approach with minimal timeout if needed
    // const timer = setTimeout(() => setIsLoaded(true), 100);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-content ${isLoaded ? 'content-loaded' : 'content-loading'}`}>
      {!isLoaded && (
        <div className="skeleton-loader">
          <div className="skeleton-header"></div>
          <div className="skeleton-line"></div>
        </div>
      )}
      <div className={isLoaded ? 'visible' : 'hidden'}>
        {children}
      </div>
    </div>
  );
}
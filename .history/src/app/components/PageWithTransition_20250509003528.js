"use client";

import { useState, useEffect } from 'react';

export default function PageWithTransition({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // First, scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll without animation
    });
    
    // Then add a slight delay before showing content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400); // Slightly increased delay to ensure scroll completes
    
    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-content ${isLoaded ? 'content-loaded' : 'content-loading'}`}>
      {!isLoaded && (
        <div className="skeleton-loader">
          {/* You can customize your skeleton UI here */}
          <div className="skeleton-header"></div>
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      )}
      <div className={isLoaded ? 'visible' : 'hidden'}>
        {children}
      </div>
    </div>
  );
}
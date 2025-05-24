'use client';

import { useState, useEffect, ReactNode } from 'react';

interface PageWithTransitionProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
  transitionDuration?: number;
}

export default function PageWithTransition({ 
  children, 
  loadingComponent = <DefaultSkeletonLoader />,
  transitionDuration = 300
}: PageWithTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Short timeout to ensure all client-side components have been hydrated
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`page-content ${isLoaded ? 'content-loaded' : 'content-loading'}`}
      style={{ 
        transition: `opacity ${transitionDuration}ms ease-in`,
        opacity: isLoaded ? 1 : 0
      }}
    >
      {!isLoaded && (
        <div className="skeleton-container">
          {loadingComponent}
        </div>
      )}
      <div 
        className={isLoaded ? 'visible' : 'hidden'}
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </div>
  );
}

// Default skeleton loader component
function DefaultSkeletonLoader() {
  return (
    <div className="default-skeleton">
      <div className="skeleton-header"></div>
      <div className="skeleton-content">
        <div className="skeleton-block"></div>
        <div className="skeleton-block"></div>
        <div className="skeleton-block"></div>
      </div>
    </div>
  );
}
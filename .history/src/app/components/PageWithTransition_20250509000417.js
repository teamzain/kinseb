import { useState, useEffect } from 'react'

export default function PageWithTransition({ children }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a slight delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    // Clean up the timer
    return () => clearTimeout(timer)
  }, [])

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
  )
}
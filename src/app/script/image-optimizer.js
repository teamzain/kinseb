'use client';

// Optimize image loading
export function optimizeImages() {
  if (typeof window === 'undefined') return;

  // Lazy load all images below the fold
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  // Use Intersection Observer for better lazy loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Replace src placeholder with actual src
          if (img.dataset.src) {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
          }
          
          // Stop observing once loaded
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading 200px before image comes into view
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
}

// Run optimization as soon as possible
if (typeof window !== 'undefined') {
  // Run immediately if DOM is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(optimizeImages, 1);
  } else {
    // Otherwise wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', optimizeImages);
  }
  
  // Also optimize any images added later
  let lastKnownScrollPosition = 0;
  let ticking = false;
  
  function onScroll() {
    lastKnownScrollPosition = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        optimizeImages();
        ticking = false;
      });
      
      ticking = true;
    }
  }
  
  // Throttled scroll event
  window.addEventListener('scroll', onScroll, { passive: true });
}
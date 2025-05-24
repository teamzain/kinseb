
'use client';
import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Poppins, Barlow } from 'next/font/google';
// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-poppins',
});

const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-barlow',
});'use client';
// Helper utilities for maintainable styling
const mediaQueries = {
  sm: '@media (max-width: 640px)',
  md: '@media (max-width: 768px)',
  lg: '@media (max-width: 1024px)',
  xl: '@media (max-width: 1280px)',
  touch: '@media (pointer: coarse)'
};

// Reusable spacing units for consistency
const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem'
};

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
  const newsletterRef = useRef<HTMLDivElement>(null);

  // Improved Intersection Observer with debounce and resize handling
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    let scrollMonitor: NodeJS.Timeout;
    let resizeTimeout: NodeJS.Timeout;
    
    // Centralized visibility handling to reduce code duplication
    const updateVisibility = (isInView: boolean, delay: number = 150) => {
      clearTimeout(debounceTimer);
      
      if (isInView) {
        if (!hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        debounceTimer = setTimeout(() => {
          setIsVisible(true);
        }, delay);
      } else if (hasBeenVisible) {
        debounceTimer = setTimeout(() => {
          setIsVisible(false);
        }, delay);
      }
    };
    
    // Primary method: Intersection Observer
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      updateVisibility(entry.isIntersecting, entry.isIntersecting ? 150 : 300);
    };
    
    // Backup method: Scroll listener for fast scrolls
    const handleScroll = () => {
      if (!newsletterRef.current) return;
      
      clearTimeout(scrollMonitor);
      
      scrollMonitor = setTimeout(() => {
        const rect = newsletterRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const isInView = 
          rect.top < window.innerHeight - 100 && 
          rect.bottom > 100;
          
        updateVisibility(isInView);
      }, 50); // Short timeout for performance
    };
    
    // Handle window resize to recalculate positions
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      
      // Debounce resize events
      resizeTimeout = setTimeout(() => {
        // Force recalculation of visibility on resize
        if (newsletterRef.current) {
          const rect = newsletterRef.current.getBoundingClientRect();
          const isInView = 
            rect.top < window.innerHeight - 100 && 
            rect.bottom > 100;
            
          updateVisibility(isInView, 0); // No delay on resize
        }
      }, 200);
    };
    
    // Add scroll listener for additional detection reliability
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (newsletterRef.current) {
      observer.observe(newsletterRef.current);
    }

    return () => {
      if (newsletterRef.current) {
        observer.unobserve(newsletterRef.current);
        clearTimeout(debounceTimer);
        clearTimeout(scrollMonitor);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasBeenVisible]);

  // Form validation with error handling
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Handle form submission logic here
      console.log('Email submitted:', email);
      
      // Show success message
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setError('Failed to subscribe. Please try again.');
      console.error('Submission error:', error);
    }
  };

  // Handle form input changes and clear errors
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    // Clear error when user starts typing again
    if (error) setError('');
  };

  // Focus handling for improved accessibility
  const handleInputFocus = () => {
    // Add a class to the parent component for styling opportunities
    if (newsletterRef.current) {
      newsletterRef.current.classList.add('form-focused');
    }
  };

  const handleInputBlur = () => {
    if (newsletterRef.current) {
      newsletterRef.current.classList.remove('form-focused');
    }
  };

  // Determine button state and label
  const getButtonState = () => {
    if (isSubmitting) return { text: 'Sending...', class: 'submitting' };
    if (isSubmitted) return { text: 'Subscribed!', class: 'submitted' };
    return { text: 'Subscribe', class: '' };
  };
  
  const buttonState = getButtonState();

  return (
    <div 
      ref={newsletterRef}
      className={`
        ${poppins.variable} 
        ${barlow.variable} 
        newsletter-section 
        ${isVisible ? 'visible' : ''}
        ${hasBeenVisible ? 'has-been-visible' : ''}
      `}
      aria-labelledby="newsletter-heading"
    >
      {/* Background image and overlay with improved accessibility */}
      <div 
        className="background-wrapper" 
        aria-hidden="true"
      >
        <div className="overlay"></div>
      </div>
      
      {/* Content container */}
      <div className="content-container">
        <div className="text-content">
          {/* Main heading */}
          <h2 id="newsletter-heading" className="main-heading">
            Stay in the <span className="highlight">Loop</span>
          </h2>

          {/* Subheading */}
          <p className="sub-heading">
            Get exclusive insights, updates, and early access to our services.
          </p>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-container">
            <form onSubmit={handleSubmit} noValidate aria-label="Newsletter subscription form">
              <div className="input-group">
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className={`email-input ${error ? 'has-error' : ''}`}
                  aria-describedby={error ? "email-error" : undefined}
                  aria-invalid={error ? "true" : "false"}
                />
                
                <button
                  type="submit"
                  className={`submit-button ${buttonState.class}`}
                  disabled={isSubmitting}
                  aria-live="polite"
                >
                  <span className="button-text">{buttonState.text}</span>
                </button>
              </div>
              
              {/* Error message with aria support */}
              {error && (
                <div id="email-error" className="error-message" aria-live="assertive">
                  {error}
                </div>
              )}
              
              {/* Success message */}
              {isSubmitted && (
                <div className="success-message" aria-live="polite">
                  Thank you for subscribing!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Base styles using design tokens for consistency */
        .newsletter-section {
          position: relative;
          width: 100%;
          padding: clamp(${spacing.lg}, 8vh, ${spacing.xxl}) 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), 
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        
        .newsletter-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .newsletter-section.form-focused .form-container {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        
        /* Re-enable animations only when component has been visible before */
        .newsletter-section:not(.has-been-visible) {
          transition: none;
        }
        
        /* Background styles */
        .background-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }
        
        .background-wrapper::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url('/images/news.jpg');
          background-size: cover;
          background-position: center;
          z-index: -1;
          transition: transform 1s ease;
          /* Prevent image overflow with subtle scale */
          transform: scale(1.05);
          will-change: transform;
        }
        
        .newsletter-section.visible .background-wrapper::before {
          transform: scale(1);
        }
        
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(
            to bottom right,
            rgba(2, 6, 23, 0.95), 
            rgba(4, 9, 29, 0.85),
            rgba(10, 15, 30, 0.8)
          ); /* Improved gradient overlay for better contrast */
          z-index: 2;
        }
        
        /* Layout styles with dynamic spacing */
        .content-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: ${spacing.lg};
          z-index: 3;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: ${spacing.xl};
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }
        
        .text-content {
          flex: 1 1 500px;
          max-width: 100%;
          opacity: 0;
          transform: translateY(20px);
          animation: none;
        }
        
        .newsletter-section.visible .text-content {
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.3s;
        }
        
        .form-section {
          flex: 1 1 420px;
          max-width: 100%;
          opacity: 0;
          transform: translateY(20px);
          animation: none;
        }
        
        .newsletter-section.visible .form-section {
          animation: fadeInUp 0.8s forwards;
          animation-delay: 0.6s;
        }
        
        /* Typography */
        .main-heading {
          font-family: var(--font-poppins);
          font-weight: 600;
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0 0 1rem 0;
          letter-spacing: -0.01em;
          white-space: nowrap; /* Prevent awkward line breaks in "Stay in the Loop" */
        }
        
        .sub-heading {
          font-family: var(--font-poppins);
          font-weight: 500;
          font-size: clamp(1rem, 2vw, 1.375rem);
          line-height: 1.5;
          color: #F0F0F0;
          margin: 1rem 0 0 0;
          max-width: 600px;
        }
        
        .highlight {
          color: #0D98BA;
          position: relative;
          display: inline-block;
        }
        
        .highlight::after {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: 2px;
          left: 0;
          background-color: #0D98BA;
          animation: lineWidth 1s forwards;
          animation-delay: 1s;
        }
        
        /* Form styles with improved transitions and focus states */
        .form-container {
          width: 100%;
          max-width: 450px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .input-group {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 0.75rem;
          padding: clamp(${spacing.xs}, 2%, ${spacing.sm});
          gap: ${spacing.xs};
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .input-group:focus-within {
          border-color: #0D98BA;
          box-shadow: 0 0 0 2px rgba(13, 152, 186, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .email-input {
          flex: 1;
          min-width: 0; /* Fix for flexbox overflow */
          padding: ${spacing.sm} ${spacing.md};
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-barlow);
          font-weight: 400;
          font-size: 1rem;
          color: #FFFFFF;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        .email-input:focus {
          background-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }
        
        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .email-input.has-error {
          border: 1px solid #f87171;
        }
        
        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          padding: ${spacing.sm} ${spacing.lg};
          background: linear-gradient(135deg, #0D98BA, #0A7F9A);
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease, background-position 0.5s ease, transform 0.2s ease;
          background-size: 200% 200%;
          background-position: 0% 0%;
          font-family: var(--font-barlow);
          font-weight: 500;
          font-size: 1rem;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .submit-button:hover:not(:disabled) {
          background-position: 100% 100%;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(13, 152, 186, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .submit-button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(13, 152, 186, 0.2);
          transition: all 0.1s ease;
        }
        
        .submit-button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(13, 152, 186, 0.2);
        }
        
        /* Submit button states with enhanced micro-interactions */
        .submit-button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0D98BA;
          transform: translateY(-2px);
        }
        
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #4B5563;
          box-shadow: none;
          transform: none;
        }
        
        .submit-button.submitting {
          background: linear-gradient(135deg, #4B5563, #6B7280);
          pointer-events: none;
        }
        
        .submit-button.submitting::after {
          content: '';
          position: absolute;
          width: 30%;
          height: 3px;
          bottom: 0;
          left: 0;
          background: rgba(255,255,255,0.5);
          animation: loading 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .submit-button.submitted {
          background: linear-gradient(135deg, #059669, #10B981);
          pointer-events: none;
        }
        
        .submit-button.submitted::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.15);
          transform: scale(0);
          top: calc(50% - 10px);
          left: calc(50% - 10px);
          animation: pulse 0.6s ease-out;
        }
        
        .button-text {
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        
        .error-message {
          color: #f87171;
          font-family: var(--font-barlow);
          font-size: 0.875rem;
          margin-top: ${spacing.xs};
          padding-left: ${spacing.sm};
          display: flex;
          align-items: center;
          animation: fadeIn 0.3s ease-out;
        }
        
        .error-message::before {
          content: '⚠️';
          margin-right: ${spacing.xs};
          font-size: 0.75rem;
        }
        
        .success-message {
          color: #10B981;
          font-family: var(--font-barlow);
          font-size: 0.875rem;
          margin-top: ${spacing.xs};
          padding-left: ${spacing.sm};
          display: flex;
          align-items: center;
          animation: fadeIn 0.3s ease-out;
        }
        
        .success-message::before {
          content: '✓';
          margin-right: ${spacing.xs};
          font-weight: bold;
        }font-size: 0.875rem;
          margin-top: 0.5rem;
          padding-left: 1rem;
        }
        
        .success-message {
          color: #10B981;
          font-family: var(--font-barlow);
          font-size: 0.875rem;
          margin-top: 0.5rem;
          padding-left: 1rem;
        }
        
        /* Enhanced animations with improved timing */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          20% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes lineWidth {
          0% {
            width: 0;
          }
          30% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          70% {
            transform: scale(3);
            opacity: 0.2;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Touch-friendly improvements */
        @media (pointer: coarse) {
          .submit-button {
            min-height: 50px; /* Larger touch target size */
            padding: 1rem 1.5rem;
          }
          
          .email-input {
            min-height: 50px;
            padding: 1rem 1.25rem;
          }
          
          .input-group {
            gap: 0.75rem; /* More spacing for touch targets */
            padding: 0.75rem;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .newsletter-section {
            padding: 4rem 0;
          }
          
          .content-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2.5rem;
          }
          
          .text-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .sub-heading {
            margin-left: auto;
            margin-right: auto;
          }
          
          .form-section {
            width: 100%;
            max-width: 100%;
            display: flex;
            justify-content: center;
          }
          
          .form-container {
            max-width: 100%;
            width: 100%;
          }
          
          /* Keep inputs horizontal until very small screens */
          .input-group {
            flex-direction: row;
          }
          
          .email-input {
            font-size: 1rem;
          }
          
          .submit-button {
            min-width: 120px;
            width: auto;
            justify-content: center;
            white-space: nowrap;
          }
        }
        
        /* Very small screens - stack inputs */
        @media (max-width: 480px) {
          .input-group {
            flex-direction: column;
          }
          
          .submit-button {
            width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .newsletter-section {
            padding: 3rem 0;
          }
          
          .content-container {
            padding: 1.5rem;
          }
          
          .main-heading {
            font-size: 1.75rem;
          }
          
          .sub-heading {
            font-size: 1rem;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .newsletter-section,
          .highlight::after,
          .submit-button,
          .email-input,
          .background-wrapper::before {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
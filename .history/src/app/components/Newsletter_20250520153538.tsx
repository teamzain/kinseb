'use client';

import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Poppins, Barlow } from 'next/font/google';
import Head from 'next/head';

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
});

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
  const newsletterRef = useRef<HTMLDivElement>(null);

  // SEO metadata
  const seoTitle = "Subscribe to Our Newsletter";
  const seoDescription = "Get exclusive insights, updates, and early access to our services. Stay in the loop with our latest offers and news.";

  // Improved Intersection Observer implementation with debounce
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    let scrollMonitor: NodeJS.Timeout;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      clearTimeout(debounceTimer);
      
      if (entry.isIntersecting) {
        // Set a flag to track if component has ever been visible
        if (!hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // Short delay to ensure smooth animation
        debounceTimer = setTimeout(() => {
          setIsVisible(true);
        }, 150);
      } else if (hasBeenVisible) {
        // Only hide if we've been visible before and are now off-screen by a significant amount
        if (entry.intersectionRatio < 0.1) {
          // Add a slightly longer delay before hiding to prevent flickering
          debounceTimer = setTimeout(() => {
            setIsVisible(false);
          }, 300);
        }
      }
    };
    
    // Enhance scroll detection with multiple techniques
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.05, 0.1, 0.2, 0.5], // More granular thresholds for smoother transitions
      rootMargin: '0px 0px -70px 0px' // Adjust trigger point (negative means it triggers earlier)
    });
    
    // Additional scroll listener for backup detection on fast scrolls
    const handleScroll = () => {
      clearTimeout(scrollMonitor);
      
      if (newsletterRef.current) {
        const rect = newsletterRef.current.getBoundingClientRect();
        const isVisible = 
          rect.top < window.innerHeight - 100 && 
          rect.bottom > 100;
          
        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
          scrollMonitor = setTimeout(() => setIsVisible(true), 150);
        }
      }
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

  // Form validation function
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    // Validate email
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    // Clear error when user starts typing again
    if (error) setError('');
  };

  // Determine button state and label
  const getButtonState = () => {
    if (isSubmitting) return { text: 'Sending...', class: 'submitting' };
    if (isSubmitted) return { text: 'Subscribed!', class: 'submitted' };
    return { text: 'Subscribe', class: '' };
  };
  
  const buttonState = getButtonState();

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta name="robots" content="index, follow" />
      </Head>

      <section 
        ref={newsletterRef}
        className={`
          ${poppins.variable} 
          ${barlow.variable} 
          newsletter-section 
          ${isVisible ? 'visible' : ''}
          ${hasBeenVisible ? 'has-been-visible' : ''}
        `}
        aria-labelledby="newsletter-heading"
        itemScope
        itemType="https://schema.org/NewsletterIssue"
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
            <h2 id="newsletter-heading" className="main-heading" itemProp="headline">
              Stay in the <span className="highlight">Loop</span>
            </h2>

            {/* Subheading */}
            <p className="sub-heading" itemProp="description">
              Get exclusive insights, updates, and early access to our services.
            </p>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <div className="form-container">
              <form 
                onSubmit={handleSubmit} 
                noValidate 
                aria-label="Newsletter subscription form"
                itemProp="potentialAction" 
                itemScope 
                itemType="https://schema.org/SubscribeAction"
              >
                <meta itemProp="target" content={typeof window !== 'undefined' ? window.location.href : ''} />
                <div className="input-group">
                  <label htmlFor="email-input" className="sr-only">Email address</label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={handleChange}
                    required
                    className={`email-input ${error ? 'has-error' : ''}`}
                    aria-describedby={error ? "email-error" : undefined}
                    aria-invalid={error ? "true" : "false"}
                    name="email"
                    itemProp="email"
                    autoComplete="email"
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
          /* Base styles */
          .newsletter-section {
            position: relative;
            width: 100%;
            padding: clamp(3rem, 8vh, 5rem) 0;
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
              rgba(4, 9, 29, 0.94), 
              rgba(4, 9, 29, 0.85)
            ); /* Improved overlay for better contrast */
            z-index: 2;
          }
          
          /* Layout styles */
          .content-container {
            position: relative;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            z-index: 3;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
           
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
          
          /* Form styles */
          .form-container {
            width: 100%;
            max-width: 450px;
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
            padding: clamp(0.5rem, 2%, 0.75rem);
            gap: 0.5rem;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          
          .input-group:focus-within {
            border-color: #0D98BA;
            box-shadow: 0 0 0 2px rgba(13, 152, 186, 0.2);
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
            padding: 0.875rem 1.25rem;
            background: transparent;
            border: none;
            outline: none;
            font-family: var(--font-barlow);
            font-weight: 400;
            font-size: 1rem;
            color: #FFFFFF;
            border-radius: 0.5rem;
            transition: background-color 0.2s ease;
          }
          
          .email-input:focus {
            background-color: rgba(255, 255, 255, 0.03);
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
            padding: 0.875rem 1.5rem;
            background: linear-gradient(135deg, #0D98BA, #0A7F9A);
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease, background-position 0.5s ease;
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
          }
          
          .submit-button:focus-visible {
            outline: 2px solid #0D98BA;
            outline-offset: 2px;
          }
          
          .submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .submit-button.submitting {
            background: #6B7280;
          }
          
          .submit-button.submitting::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            bottom: 0;
            left: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
            animation: loading 1.5s infinite;
          }
          
          .submit-button.submitted {
            background: #10B981;
          }
          
          .button-text {
            white-space: nowrap;
            transition: all 0.3s ease;
          }
          
          .error-message {
            color: #f87171;
            font-family: var(--font-barlow);
            font-size: 0.875rem;
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
          
          /* Animations */
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
              transform: translateX(100%);
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
              padding: 1rem 0; /* Reduced padding on mobile */
            }
            
            .content-container {
              flex-direction: column;
              align-items: center;
              text-align: center;
               /* Reduced gap between elements on mobile */
              padding: 0rem;
            }
            
            .text-content {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              /* Reduce space between text and form */
            }
            
            .sub-heading {
              margin-left: auto;
              margin-right: auto;
              /* Reduce space after subheading */
            }
            
            .form-section {
              width: 100%;
              max-width: 100%;
              display: flex;
              justify-content: center;
              margin-top: 0; /* Remove default margin */
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
            .newsletter-section {
               /* Further reduced section height */
            }
            
            .content-container {
              // gap: 1rem; /* Further reduced gap */
              // padding: 1rem;
            }
            
            .input-group {
              flex-direction: column;
            }
            
            .submit-button {
              width: 100%;
            }
          }
          
          @media (max-width: 640px) {
            .newsletter-section {
              // padding: 2.5rem 0; /* Reduced section height */
            }
            
            .content-container {
              // padding: 1.25rem;
            }
            
            .main-heading {
              font-size: 1.75rem;
            }
            
            .sub-heading {
              font-size: 1rem;
              margin-bottom: 0.75rem; /* Reduced spacing */
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
      </section>
    </>
  );
};

export default Newsletter;
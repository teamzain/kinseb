// loading.tsx - Professional loading component with immediate CSS application
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #04091D 0%, #0D1B2A 50%, #0D98BA 100%)',
        color: '#FFFFFF',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .loading-overlay {
            background-size: 400% 400% !important;
            animation: gradientShift 8s ease-in-out infinite !important;
          }
          
          .loading-bg-pattern::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 80%, rgba(13, 152, 186, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(13, 152, 186, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .loading-content-wrapper {
            position: relative;
            z-index: 1;
            animation: fadeIn 0.8s ease-out;
            text-align: center;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
          }
          
          .spinner-container {
            position: relative;
            margin-bottom: 2rem;
          }
          
          .main-spinner {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(13, 152, 186, 0.2);
            border-top: 3px solid #0D98BA;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
            position: relative;
          }
          
          .spinner-dot::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            background: #0D98BA;
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite;
          }
          
          .loading-text-primary {
            font-size: 1.125rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            animation: pulse 2s ease-in-out infinite;
            letter-spacing: 0.025em;
          }
          
          .loading-text-secondary {
            font-size: 0.875rem;
            opacity: 0.7;
            font-weight: 300;
            line-height: 1.5;
          }
          
          .loading-dots {
            display: inline-block;
            animation: pulse 1.5s ease-in-out infinite;
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .loading-content-wrapper {
              padding: 1.5rem !important;
            }
            
            .main-spinner {
              width: 50px !important;
              height: 50px !important;
            }
            
            .loading-text-primary {
              font-size: 1rem !important;
            }
            
            .loading-text-secondary {
              font-size: 0.8rem !important;
            }
          }
          
          /* Tablet optimizations */
          @media (min-width: 641px) and (max-width: 1024px) {
            .main-spinner {
              width: 55px !important;
              height: 55px !important;
            }
          }
          
          /* Desktop optimizations */
          @media (min-width: 1025px) {
            .main-spinner {
              width: 60px !important;
              height: 60px !important;
            }
            
            .loading-text-primary {
              font-size: 1.25rem !important;
            }
            
            .loading-text-secondary {
              font-size: 0.9rem !important;
            }
          }
          
          /* Reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .main-spinner {
              animation: none !important;
              border: 3px solid #0D98BA !important;
            }
            
            .loading-overlay {
              animation: none !important;
            }
            
            .loading-text-primary, .loading-dots {
              animation: none !important;
            }
          }
        `
      }} />
      
      {/* Background pattern */}
      <div 
        className="loading-bg-pattern"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Main content */}
      <div className="loading-content-wrapper">
        <div className="spinner-container">
          <div className="main-spinner spinner-dot"></div>
        </div>
        
        <div className="loading-text-primary">
          Loading service details<span className="loading-dots">...</span>
        </div>
        
        <div className="loading-text-secondary">
          Please wait while we prepare your content
        </div>
      </div>
    </div>
  );
}
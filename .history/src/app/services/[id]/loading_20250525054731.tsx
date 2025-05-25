// loading.tsx - Professional loading component for all screen sizes
import React from 'react';

export default function Loading() {
  return (
    <>
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
          
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(180deg, #04091D 0%, #0D1B2A 50%, #0D98BA 100%);
            background-size: 400% 400%;
            animation: gradientShift 8s ease-in-out infinite;
            color: #FFFFFF;
            text-align: center;
            padding: 2rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            position: relative;
            overflow: hidden;
          }
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .loading-container::before {
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
          
          .loading-content {
            position: relative;
            z-index: 1;
            animation: fadeIn 0.8s ease-out;
            max-width: 400px;
            width: 100%;
          }
          
          .spinner-container {
            position: relative;
            margin-bottom: 2rem;
          }
          
          .spinner {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(13, 152, 186, 0.2);
            border-top: 3px solid #0D98BA;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
            position: relative;
          }
          
          .spinner::after {
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
          
          .loading-text {
            font-size: 1.125rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            animation: pulse 2s ease-in-out infinite;
            letter-spacing: 0.025em;
          }
          
          .loading-subtext {
            font-size: 0.875rem;
            opacity: 0.7;
            font-weight: 300;
            line-height: 1.5;
          }
          
          .dots {
            display: inline-block;
            animation: pulse 1.5s ease-in-out infinite;
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .loading-container {
              padding: 1.5rem;
              min-height: 100vh;
            }
            
            .spinner {
              width: 50px;
              height: 50px;
            }
            
            .loading-text {
              font-size: 1rem;
            }
            
            .loading-subtext {
              font-size: 0.8rem;
            }
          }
          
          /* Tablet optimizations */
          @media (min-width: 641px) and (max-width: 1024px) {
            .loading-container {
              padding: 2rem;
            }
            
            .spinner {
              width: 55px;
              height: 55px;
            }
          }
          
          /* Desktop optimizations */
          @media (min-width: 1025px) {
            .loading-container {
              padding: 3rem;
            }
            
            .spinner {
              width: 60px;
              height: 60px;
            }
            
            .loading-text {
              font-size: 1.25rem;
            }
            
            .loading-subtext {
              font-size: 0.9rem;
            }
          }
          
          /* High DPI displays */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .spinner {
              border-width: 2px;
            }
            
            .spinner::after {
              width: 6px;
              height: 6px;
            }
          }
          
          /* Reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .spinner {
              animation: none;
              border: 3px solid #0D98BA;
            }
            
            .loading-container {
              animation: none;
              background: linear-gradient(180deg, #04091D 0%, #0D1B2A 50%, #0D98BA 100%);
            }
            
            .loading-text, .dots {
              animation: none;
            }
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .loading-container {
              background: linear-gradient(180deg, #000000 0%, #04091D 50%, #0D98BA 100%);
            }
          }
        `
      }} />
      
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          
          <div className="loading-text">
            Loading service details<span className="dots">...</span>
          </div>
          
          <div className="loading-subtext">
            Please wait while we prepare your content
          </div>
        </div>
      </div>
    </>
  );
}
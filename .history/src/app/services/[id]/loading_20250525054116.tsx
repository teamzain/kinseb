'use client';

import React from 'react';

interface LoadingProps {
  message?: string;
  type?: 'default' | 'service' | 'error';
}

const ServiceLoader: React.FC<LoadingProps> = ({ 
  message = 'Loading service details...', 
  type = 'default' 
}) => {
  return (
    <>
      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #04091D 0%, #0F1A2E 25%, #1B2A45 50%, #0D98BA 100%);
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .loader-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(13, 152, 186, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(13, 152, 186, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          animation: backgroundPulse 4s ease-in-out infinite;
        }

        .loader-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        .spinner-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .spinner-outer {
          width: 80px;
          height: 80px;
          border: 3px solid rgba(13, 152, 186, 0.2);
          border-radius: 50%;
          position: relative;
          animation: rotate 2s linear infinite;
        }

        .spinner-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border: 3px solid transparent;
          border-top: 3px solid #0D98BA;
          border-right: 3px solid rgba(13, 152, 186, 0.6);
          border-radius: 50%;
          animation: rotate 1s linear infinite reverse;
        }

        .spinner-center {
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
          color: #FFFFFF;
          margin: 0;
          font-size: 1.125rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          opacity: 0.9;
          animation: textFade 2s ease-in-out infinite;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .loading-subtitle {
          color: rgba(255, 255, 255, 0.6);
          margin: 0.5rem 0 0 0;
          font-size: 0.875rem;
          font-weight: 400;
          animation: subtitleFade 3s ease-in-out infinite;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .progress-bar {
          width: 200px;
          height: 2px;
          background: rgba(13, 152, 186, 0.2);
          border-radius: 1px;
          margin-top: 1.5rem;
          overflow: hidden;
          position: relative;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #0D98BA, transparent);
          animation: progressSlide 2s ease-in-out infinite;
        }

        .floating-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(13, 152, 186, 0.3);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .dot:nth-child(1) { left: 10%; animation-delay: 0s; }
        .dot:nth-child(2) { left: 20%; animation-delay: 1s; }
        .dot:nth-child(3) { left: 30%; animation-delay: 2s; }
        .dot:nth-child(4) { left: 40%; animation-delay: 3s; }
        .dot:nth-child(5) { left: 50%; animation-delay: 4s; }
        .dot:nth-child(6) { left: 60%; animation-delay: 5s; }
        .dot:nth-child(7) { left: 70%; animation-delay: 0.5s; }
        .dot:nth-child(8) { left: 80%; animation-delay: 1.5s; }
        .dot:nth-child(9) { left: 90%; animation-delay: 2.5s; }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.7;
          }
        }

        @keyframes textFade {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.6; }
        }

        @keyframes subtitleFade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }

        @keyframes progressSlide {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        @keyframes backgroundPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-10vh) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20vh) scale(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .loader-container {
            padding: 16px;
            min-height: 100vh;
          }

          .spinner-outer {
            width: 60px;
            height: 60px;
          }

          .spinner-inner {
            width: 45px;
            height: 45px;
          }

          .loading-text {
            font-size: 1rem;
          }

          .loading-subtitle {
            font-size: 0.8125rem;
          }

          .progress-bar {
            width: 160px;
          }
        }

        @media (max-width: 480px) {
          .spinner-outer {
            width: 50px;
            height: 50px;
          }

          .spinner-inner {
            width: 38px;
            height: 38px;
          }

          .loading-text {
            font-size: 0.9375rem;
          }

          .progress-bar {
            width: 140px;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
          .spinner-center {
            box-shadow: 0 0 0 0.5px rgba(13, 152, 186, 0.3);
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .spinner-outer,
          .spinner-inner,
          .spinner-center,
          .progress-bar::after,
          .dot,
          .loading-text,
          .loading-subtitle {
            animation-duration: 3s;
            animation-iteration-count: infinite;
          }
          
          .backgroundPulse {
            animation: none;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .loader-container {
            background: linear-gradient(135deg, #02050F 0%, #0A1220 25%, #15253D 50%, #0A7A94 100%);
          }
        }

        /* Print styles */
        @media print {
          .loader-container {
            display: none;
          }
        }
      `}</style>

      <div className="loader-container">
        <div className="floating-dots">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
        
        <div className="loader-content">
          <div className="spinner-container">
            <div className="spinner-outer">
              <div className="spinner-inner"></div>
              <div className="spinner-center"></div>
            </div>
          </div>
          
          <h2 className="loading-text">{message}</h2>
          <p className="loading-subtitle">
            {type === 'service' ? 'Preparing your experience...' : 
             type === 'error' ? 'Please wait while we resolve this...' : 
             'This won\'t take long'}
          </p>
          
          <div className="progress-bar"></div>
        </div>
      </div>
    </>
  );
};

export default ServiceLoader;
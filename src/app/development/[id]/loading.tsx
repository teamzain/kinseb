'use client';

import React from 'react';
import { Poppins, Barlow, Lato } from 'next/font/google';

// Font configurations
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-barlow'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato'
});

export default function Loading() {
  return (
    <div className={`${poppins.variable} ${barlow.variable} ${lato.variable} loading-container`}>
      <div className="loading-spinner"></div>
      <p>Loading development service details...</p>
      
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          background-color: #04091D;
          color: #FFFFFF;
          text-align: center;
          padding: 20px;
        }

        .loading-spinner {
          border: 4px solid rgba(13, 152, 186, 0.3);
          border-top: 4px solid #0D98BA;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
// This is a server component - no 'use client' directive
import React from 'react';

// Define styles as objects
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  backgroundColor: '#04091D',
  color: '#FFFFFF',
  textAlign: 'center',
  padding: '20px',
} as const;

const spinnerStyle = {
  border: '4px solid rgba(13, 152, 186, 0.3)',
  borderTop: '4px solid #0D98BA',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  marginBottom: '20px',
} as const;

// For the animation, we'll need to include a <style> tag
export default function Loading() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
      <div style={containerStyle}>
   
      </div>
    </>
  );
}
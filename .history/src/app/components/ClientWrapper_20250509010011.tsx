'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Client components can use ssr: false
const Footer = dynamic(() => import('./footer'), { 
  loading: () => <div className="footer-placeholder" aria-hidden="true" />,
  ssr: false 
});

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
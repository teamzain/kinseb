'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
  // State to track if we're in the browser
  const [isMounted, setIsMounted] = useState(false);

  // Effect runs only on the client after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until after client-side hydration
  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
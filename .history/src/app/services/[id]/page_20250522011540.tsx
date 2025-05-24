'use client';

import React from 'react';
import ServiceDetails from '../../components/ServiceDetails';
import { useParams } from 'next/navigation';

export default function ServicePage() {
  const params = useParams();
  
  // Explicitly type and extract the id parameter
  const id = params?.id;
  
  // TypeScript might be complaining because params.id could be undefined or an array
  // So we need to verify it's a valid value before passing it
  if (!id || typeof id !== 'string') {
    return <div>Invalid service ID</div>;
  }
  
  return <ServiceDetails serviceId={id} />;
}
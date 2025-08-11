"use client";

import { useEffect, useState } from 'react';

interface SupascribeEmbedProps {
  variant?: 'default' | 'hero';
}

export function SupascribeEmbed({ variant = 'default' }: SupascribeEmbedProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Re-initialize Supascribe when component mounts
    const script = document.createElement('script');
    script.src = 'https://js.supascribe.com/v1/loader/MN3VrYhDV5ezBuDgefrlnWWAbfD2.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  if (!isClient) {
    return (
      <div className={`w-full ${variant === 'hero' ? 'max-w-lg' : ''}`}>
        <div className="w-full h-12 bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  return (
    <div className={`w-full ${variant === 'hero' ? 'max-w-lg' : ''}`}>
      <div 
        data-supascribe-embed-id="991042503307" 
        data-supascribe-subscribe
        className="w-full"
      />
    </div>
  );
}

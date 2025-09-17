'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while loading this page. Please try again.
        </p>
        <div className="space-y-3">
          <Button onClick={reset} className="w-full">
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
            className="w-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Something went wrong!
              </h1>
              <p className="text-gray-600 text-lg mb-2">
                We encountered an unexpected error.
              </p>
              <p className="text-gray-500">
                Don't worry, our team has been notified and we're working on it.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={reset} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link href="/">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  Error Details (Development):
                </h3>
                <pre className="text-xs text-red-700 overflow-auto">
                  {error.message}
                </pre>
              </div>
            )}

            {/* Contact Support */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Still having issues?</p>
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 transition-colors text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

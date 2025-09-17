'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link href="/products">
                <Search className="w-4 h-4" />
                Browse Products
              </Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/products"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

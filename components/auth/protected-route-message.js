'use client';

import { ShieldCheck, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProtectedRouteMessage({
  title = 'Authentication Required',
  message = 'Please sign in to access this page.',
  callbackUrl = '/',
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <ShieldCheck className="mx-auto h-16 w-16 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link
              href={`/auth/signin?callbackUrl=${encodeURIComponent(
                callbackUrl
              )}`}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

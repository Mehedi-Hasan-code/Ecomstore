'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import CartIcon from '@/components/cart/cart-icon';
import CartDrawer from '@/components/cart/cart-drawer';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">EcomStore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Cart
            </Link>

            {/* Show Dashboard only for authenticated users */}
            {session && (
              <>
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <CartIcon onClick={() => setIsCartOpen(true)} />

            {/* Authentication buttons */}
            {status === 'loading' ? (
              <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-2">
            <CartIcon onClick={() => setIsCartOpen(true)} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Contact
              </Link>
              <Link
                href="/cart"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
              >
                Cart
              </Link>

              {session && (
                <>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-primary"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              <div className="px-3 py-2 space-y-2">
                {session ? (
                  <>
                    <p className="text-sm text-gray-600 mb-2">
                      Welcome, {session.user?.name || session.user?.email}
                    </p>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full mb-2">
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}

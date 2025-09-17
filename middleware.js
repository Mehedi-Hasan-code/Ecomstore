import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;

    // Redirect /admin to /dashboard
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public routes
        if (
          pathname.startsWith('/auth') ||
          pathname === '/' ||
          pathname.startsWith('/products') ||
          pathname.startsWith('/about') ||
          pathname.startsWith('/contact') ||
          pathname.startsWith('/api/products') ||
          pathname.startsWith('/api/auth')
        ) {
          return true;
        }

        // Require authentication for protected routes
        if (
          pathname.startsWith('/dashboard') ||
          pathname.startsWith('/cart') ||
          pathname.startsWith('/checkout') ||
          pathname.startsWith('/profile')
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes that don't need auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|api/products|_next/static|_next/image|favicon.ico).*)',
  ],
};

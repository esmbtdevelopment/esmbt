import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'tr'],
    defaultLocale: 'en'
});

export default function middleware(request) {
    const { pathname } = request.nextUrl;

    // Skip middleware for API routes
    if (pathname.startsWith('/api')) {
        console.log('[Middleware] API route, skipping middleware');
        return NextResponse.next();
    }

    // Admin routes protection with cookie-based auth
    if (pathname.startsWith('/admin')) {
        console.log('[Middleware] Admin route accessed:', pathname);

        // Allow login page without authentication
        if (pathname === '/admin/login') {
            console.log('[Middleware] Login page, allowing access');
            return NextResponse.next();
        }

        // Check for Firebase auth cookie
        const authToken = request.cookies.get('firebaseAuthToken');
        console.log('[Middleware] Auth token present:', !!authToken);

        // If no auth cookie found, redirect to login
        if (!authToken) {
            console.log('[Middleware] No auth token, redirecting to login');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Allow authenticated users to access admin routes
        console.log('[Middleware] Auth token found, allowing access');
        return NextResponse.next();
    }

    // Apply next-intl middleware for all other routes
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/',
        '/(tr|en)/:path*',
        '/admin/:path*',
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};

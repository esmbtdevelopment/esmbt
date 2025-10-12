import { NextResponse } from 'next/server';

// This endpoint receives the Firebase ID token from the client
// and sets it as a secure HTTP-only cookie
export async function POST(request) {
    console.log('[API] Login endpoint called');

    try {
        const body = await request.json();
        console.log('[API] Request body received');

        const { idToken } = body;

        if (!idToken) {
            console.log('[API] No ID token provided');
            return NextResponse.json(
                { error: 'ID token is required' },
                { status: 400 }
            );
        }

        console.log('[API] ID token received (length:', idToken.length, '), setting cookie...');

        // Create the response with the cookie
        const response = NextResponse.json(
            { success: true, message: 'Session cookie set' },
            { status: 200 }
        );

        // Set the cookie on the response
        response.cookies.set('firebaseAuthToken', idToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        console.log('[API] Cookie set successfully on response');
        return response;

    } catch (error) {
        console.error('[API] Error in login endpoint:', error);
        console.error('[API] Error stack:', error.stack);
        return NextResponse.json(
            { error: 'Failed to set session cookie', details: error.message },
            { status: 500 }
        );
    }
}


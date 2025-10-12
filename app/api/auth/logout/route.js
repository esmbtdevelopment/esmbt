import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const cookieStore = await cookies();

        // Delete the auth cookie
        cookieStore.delete('firebaseAuthToken');

        return NextResponse.json(
            { success: true, message: 'Session cookie cleared' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error clearing session cookie:', error);
        return NextResponse.json(
            { error: 'Failed to clear session cookie' },
            { status: 500 }
        );
    }
}


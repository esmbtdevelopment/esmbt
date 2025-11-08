import { NextResponse } from 'next/server';

// Translations are file-based now; API is temporarily disabled.
export async function GET() {
    return NextResponse.json(
        { success: false, error: 'Translations are file-based now. API disabled.' },
        { status: 503 }
    );
}

export async function POST() {
    return NextResponse.json(
        { success: false, error: 'Translations are file-based now. API disabled.' },
        { status: 503 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { success: false, error: 'Translations are file-based now. API disabled.' },
        { status: 503 }
    );
}


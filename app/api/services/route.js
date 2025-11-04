import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// TODO: Implement services firestore functions
// import {
//     getAllServices,
//     saveService,
//     reorderServices,
//     toggleServiceStatus
// } from '@/lib/services/firestore';

// GET - Fetch all services
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'en';
        const status = searchParams.get('status') || 'all';

        // TODO: Implement proper services fetching from Firestore
        // const services = await getAllServices(locale, status);

        return NextResponse.json({
            success: true,
            services: [],
            count: 0,
            message: 'Services API not fully implemented'
        });
    } catch (error) {
        console.error('[API] Error fetching services:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST - Create or update a service
export async function POST(request) {
    try {
        const serviceData = await request.json();

        // TODO: Implement services save functionality
        return NextResponse.json({
            success: false,
            error: 'Services POST API not fully implemented'
        }, { status: 501 });
    } catch (error) {
        console.error('[API] Error saving service:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save service' },
            { status: 500 }
        );
    }
}

// PUT - Reorder services or toggle status
export async function PUT(request) {
    try {
        const { action, serviceIds, serviceId, status } = await request.json();

        // TODO: Implement services update functionality
        return NextResponse.json({
            success: false,
            error: 'Services PUT API not fully implemented'
        }, { status: 501 });
    } catch (error) {
        console.error('[API] Error in PUT request:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}


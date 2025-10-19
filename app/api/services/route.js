import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import {
    getAllServices,
    saveService,
    reorderServices,
    toggleServiceStatus
} from '@/lib/services/firestore';

// GET - Fetch all services
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'en';
        const status = searchParams.get('status') || 'all';

        const services = await getAllServices(locale, status);

        return NextResponse.json({
            success: true,
            services,
            count: services.length
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

        // Basic validation
        if (!serviceData.slug || !serviceData.title) {
            return NextResponse.json(
                { success: false, error: 'Slug and title are required' },
                { status: 400 }
            );
        }

        // Get user ID from auth session (TODO: implement proper auth)
        const userId = 'admin';

        // Save to Firestore
        const result = await saveService(serviceData, userId);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('services');

        console.log(`[API] Successfully saved service: ${result.id}`);

        return NextResponse.json({
            success: true,
            message: 'Service saved successfully',
            id: result.id
        });
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

        if (action === 'reorder') {
            if (!Array.isArray(serviceIds)) {
                return NextResponse.json(
                    { success: false, error: 'serviceIds must be an array' },
                    { status: 400 }
                );
            }

            const result = await reorderServices(serviceIds);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('services');

            return NextResponse.json({
                success: true,
                message: 'Services reordered successfully'
            });
        } else if (action === 'toggle-status') {
            if (!serviceId || !status) {
                return NextResponse.json(
                    { success: false, error: 'serviceId and status are required' },
                    { status: 400 }
                );
            }

            const result = await toggleServiceStatus(serviceId, status);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('services');

            return NextResponse.json({
                success: true,
                message: 'Service status updated successfully'
            });
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid action' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('[API] Error in PUT request:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}


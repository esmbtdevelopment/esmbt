import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getServiceById, saveService, deleteService } from '@/lib/services/firestore';

// GET - Fetch a single service by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const service = await getServiceById(id);

        if (!service) {
            return NextResponse.json(
                { success: false, error: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            service
        });
    } catch (error) {
        console.error('[API] Error fetching service:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch service' },
            { status: 500 }
        );
    }
}

// PUT - Update a specific service
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const serviceData = await request.json();

        // Ensure the ID matches
        serviceData.id = id;

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

        console.log(`[API] Successfully updated service: ${id}`);

        return NextResponse.json({
            success: true,
            message: 'Service updated successfully',
            id: result.id
        });
    } catch (error) {
        console.error('[API] Error updating service:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a service
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const result = await deleteService(id);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('services');

        console.log(`[API] Successfully deleted service: ${id}`);

        return NextResponse.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        console.error('[API] Error deleting service:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}


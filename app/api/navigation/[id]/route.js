import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getNavItemById, saveNavItem, deleteNavItem } from '@/lib/navigation/firestore';

// GET - Fetch a single navigation item by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const navItem = await getNavItemById(id);

        if (!navItem) {
            return NextResponse.json(
                { success: false, error: 'Navigation item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            navItem
        });
    } catch (error) {
        console.error('[API] Error fetching navigation item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch navigation item' },
            { status: 500 }
        );
    }
}

// PUT - Update a specific navigation item
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const navData = await request.json();

        // Ensure the ID matches
        navData.id = id;

        // Get user ID from auth session (TODO: implement proper auth)
        const userId = 'admin';

        // Save to Firestore
        const result = await saveNavItem(navData, userId);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('navigation');

        console.log(`[API] Successfully updated navigation item: ${id}`);

        return NextResponse.json({
            success: true,
            message: 'Navigation item updated successfully',
            id: result.id
        });
    } catch (error) {
        console.error('[API] Error updating navigation item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update navigation item' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a navigation item
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const result = await deleteNavItem(id);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('navigation');

        console.log(`[API] Successfully deleted navigation item: ${id}`);

        return NextResponse.json({
            success: true,
            message: 'Navigation item deleted successfully'
        });
    } catch (error) {
        console.error('[API] Error deleting navigation item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete navigation item' },
            { status: 500 }
        );
    }
}


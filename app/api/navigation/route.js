import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import {
    getAllNavigation,
    getNavigationStructure,
    saveNavItem,
    reorderNavItems,
    toggleNavItemStatus,
    addNavChild,
    updateNavChild,
    removeNavChild,
} from '@/lib/navigation/firestore';

// GET - Fetch navigation structure
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'en';
        const section = searchParams.get('section') || 'main';
        const admin = searchParams.get('admin') === 'true';

        const navigation = admin
            ? await getAllNavigation(locale)
            : await getNavigationStructure(locale, section);

        return NextResponse.json({
            success: true,
            navigation,
            count: navigation.length
        });
    } catch (error) {
        console.error('[API] Error fetching navigation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch navigation' },
            { status: 500 }
        );
    }
}

// POST - Create or update a navigation item
export async function POST(request) {
    try {
        const { action, ...data } = await request.json();

        // Get user ID from auth session (TODO: implement proper auth)
        const userId = 'admin';

        if (action === 'add-child') {
            // Add a child to a parent navigation item
            const { parentId, childData } = data;

            if (!parentId || !childData) {
                return NextResponse.json(
                    { success: false, error: 'parentId and childData are required' },
                    { status: 400 }
                );
            }

            const result = await addNavChild(parentId, childData);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('navigation');

            return NextResponse.json({
                success: true,
                message: 'Child navigation item added successfully',
                id: result.id
            });
        } else {
            // Create or update a navigation item
            const navData = data;

            // Basic validation
            if (!navData.label) {
                return NextResponse.json(
                    { success: false, error: 'Label is required' },
                    { status: 400 }
                );
            }

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

            console.log(`[API] Successfully saved navigation item: ${result.id}`);

            return NextResponse.json({
                success: true,
                message: 'Navigation item saved successfully',
                id: result.id
            });
        }
    } catch (error) {
        console.error('[API] Error saving navigation item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save navigation item' },
            { status: 500 }
        );
    }
}

// PUT - Update navigation (reorder, toggle status, update child, remove child)
export async function PUT(request) {
    try {
        const { action, ...data } = await request.json();

        if (action === 'reorder') {
            const { navIds, parentId } = data;

            if (!Array.isArray(navIds)) {
                return NextResponse.json(
                    { success: false, error: 'navIds must be an array' },
                    { status: 400 }
                );
            }

            const result = await reorderNavItems(navIds, parentId || null);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('navigation');

            return NextResponse.json({
                success: true,
                message: 'Navigation items reordered successfully'
            });
        } else if (action === 'toggle-status') {
            const { navId, status } = data;

            if (!navId || !status) {
                return NextResponse.json(
                    { success: false, error: 'navId and status are required' },
                    { status: 400 }
                );
            }

            const result = await toggleNavItemStatus(navId, status);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('navigation');

            return NextResponse.json({
                success: true,
                message: 'Navigation item status updated successfully'
            });
        } else if (action === 'update-child') {
            const { parentId, childId, childData } = data;

            if (!parentId || !childId || !childData) {
                return NextResponse.json(
                    { success: false, error: 'parentId, childId, and childData are required' },
                    { status: 400 }
                );
            }

            const result = await updateNavChild(parentId, childId, childData);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('navigation');

            return NextResponse.json({
                success: true,
                message: 'Child navigation item updated successfully'
            });
        } else if (action === 'remove-child') {
            const { parentId, childId } = data;

            if (!parentId || !childId) {
                return NextResponse.json(
                    { success: false, error: 'parentId and childId are required' },
                    { status: 400 }
                );
            }

            const result = await removeNavChild(parentId, childId);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('navigation');

            return NextResponse.json({
                success: true,
                message: 'Child navigation item removed successfully'
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


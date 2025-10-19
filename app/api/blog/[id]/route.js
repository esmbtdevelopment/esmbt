import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import {
    getBlogPostById,
    saveBlogPost,
    deleteBlogPost,
    toggleBlogPostStatus,
} from '@/lib/blog/firestore';

// GET - Fetch a single blog post by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const post = await getBlogPostById(id);

        if (!post) {
            return NextResponse.json(
                { success: false, error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            post,
        });
    } catch (error) {
        console.error('[API] Error fetching blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blog post' },
            { status: 500 }
        );
    }
}

// POST - Update an existing blog post
export async function POST(request, { params }) {
    try {
        const { id } = params;
        const postData = await request.json();

        // Add the ID to the data
        postData.id = id;

        // Get user ID from auth session (TODO: implement proper auth)
        const userId = 'admin';

        // Save to Firestore
        const result = await saveBlogPost(postData, userId);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('blog');

        console.log(`[API] Successfully updated blog post: ${id}`);

        return NextResponse.json({
            success: true,
            message: 'Blog post updated successfully',
            id: result.id,
        });
    } catch (error) {
        console.error('[API] Error updating blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a blog post
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const result = await deleteBlogPost(id);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        // Invalidate Next.js cache
        revalidateTag('blog');

        console.log(`[API] Successfully deleted blog post: ${id}`);

        return NextResponse.json({
            success: true,
            message: 'Blog post deleted successfully',
        });
    } catch (error) {
        console.error('[API] Error deleting blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}

// PUT - Toggle blog post status or other updates
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { action, status } = await request.json();

        if (action === 'toggle-status') {
            if (!status) {
                return NextResponse.json(
                    { success: false, error: 'Status is required' },
                    { status: 400 }
                );
            }

            const result = await toggleBlogPostStatus(id, status);

            if (!result.success) {
                return NextResponse.json(
                    { success: false, error: result.error },
                    { status: 500 }
                );
            }

            // Invalidate cache
            revalidateTag('blog');

            return NextResponse.json({
                success: true,
                message: 'Blog post status updated successfully',
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        console.error('[API] Error in PUT request:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}


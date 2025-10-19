import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import {
    getAllBlogPosts,
    saveBlogPost,
    getBlogCategories,
    getBlogTags,
} from '@/lib/blog/firestore';

// GET - Fetch all blog posts
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'en';
        const status = searchParams.get('status') || 'all';
        const category = searchParams.get('category') || null;
        const limitCount = parseInt(searchParams.get('limit') || '100');
        const action = searchParams.get('action');

        console.log('[API Blog GET]', { locale, status, category, action });

        // Handle special actions
        if (action === 'categories') {
            const categories = await getBlogCategories(locale);
            return NextResponse.json({
                success: true,
                categories,
            });
        }

        if (action === 'tags') {
            const tags = await getBlogTags(locale);
            return NextResponse.json({
                success: true,
                tags,
            });
        }

        // Fetch posts
        const posts = await getAllBlogPosts(locale, status, limitCount, category);

        console.log('[API Blog GET] Fetched posts:', posts.length, 'Status breakdown:', {
            published: posts.filter(p => p.status === 'published').length,
            draft: posts.filter(p => p.status === 'draft').length,
        });

        return NextResponse.json({
            success: true,
            posts,
            count: posts.length,
        });
    } catch (error) {
        console.error('[API] Error fetching blog posts:', error);
        console.error('[API] Error message:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blog posts', details: error.message },
            { status: 500 }
        );
    }
}

// POST - Create or update a blog post
export async function POST(request) {
    try {
        const postData = await request.json();

        // Basic validation
        if (!postData.slug || !postData.title) {
            return NextResponse.json(
                { success: false, error: 'Slug and title are required' },
                { status: 400 }
            );
        }

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

        console.log(`[API] Successfully saved blog post: ${result.id}`);

        return NextResponse.json({
            success: true,
            message: 'Blog post saved successfully',
            id: result.id,
        });
    } catch (error) {
        console.error('[API] Error saving blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save blog post' },
            { status: 500 }
        );
    }
}


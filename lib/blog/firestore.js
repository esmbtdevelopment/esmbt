import { db } from '@/lib/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    Timestamp,
} from 'firebase/firestore';

const BLOG_COLLECTION = 'blog_posts';

/**
 * Get all blog posts for a specific locale
 * @param {string} locale - The locale (e.g., 'en', 'tr')
 * @param {string} status - Filter by status ('all', 'published', 'draft')
 * @param {number} limitCount - Number of posts to fetch
 * @param {string} category - Filter by category (optional)
 * @returns {Promise<Array>} - Array of blog post objects
 */
export async function getAllBlogPosts(locale = 'en', status = 'all', limitCount = 100, category = null) {
    try {
        const postsRef = collection(db, BLOG_COLLECTION);

        console.log('[Firestore] Query params:', { locale, status, category, limitCount });

        // Build query constraints in the correct order
        let constraints = [
            where('locale', '==', locale),
            where('deleted', '==', false)
        ];

        // Add status filter if not 'all'
        if (status !== 'all') {
            constraints.push(where('status', '==', status));
            console.log('[Firestore] Added status filter:', status);
        }

        // Add category filter if provided
        if (category) {
            constraints.push(where('category', '==', category));
            console.log('[Firestore] Added category filter:', category);
        }

        // Add ordering - only for published (to use existing index)
        if (status === 'published') {
            constraints.push(orderBy('publishedAt', 'desc'));
            console.log('[Firestore] Ordering by publishedAt (using Firestore index)');
        } else {
            // For draft/all status, fetch without ordering and sort client-side (no index needed)
            console.log('[Firestore] Will sort client-side (no index required)');
        }

        // Add limit
        constraints.push(limit(limitCount));

        const q = query(postsRef, ...constraints);
        const snapshot = await getDocs(q);
        const posts = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() || null,
                updatedAt: data.updatedAt?.toDate?.() || null,
                publishedAt: data.publishedAt?.toDate?.() || null,
            });
            console.log('[Firestore] Post:', doc.id, 'Status:', data.status);
        });

        // Sort client-side if status is not 'published' (to avoid needing complex indexes)
        if (status !== 'published') {
            posts.sort((a, b) => {
                const timeA = a.createdAt ? a.createdAt.getTime() : 0;
                const timeB = b.createdAt ? b.createdAt.getTime() : 0;
                return timeB - timeA; // Descending order (newest first)
            });
            console.log('[Firestore] Sorted posts client-side by createdAt');
        }

        console.log('[Firestore] Total posts fetched:', posts.length);
        return posts;
    } catch (error) {
        console.error('[Firestore] Error fetching blog posts:', error);
        console.error('[Firestore] Error details:', error.message);
        throw new Error('Failed to fetch blog posts: ' + error.message);
    }
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The post slug
 * @param {string} locale - The locale
 * @returns {Promise<Object|null>} - Blog post object or null
 */
export async function getBlogPostBySlug(slug, locale = 'en') {
    try {
        const postsRef = collection(db, BLOG_COLLECTION);
        const q = query(
            postsRef,
            where('slug', '==', slug),
            where('locale', '==', locale),
            where('deleted', '==', false)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || null,
            updatedAt: doc.data().updatedAt?.toDate?.() || null,
            publishedAt: doc.data().publishedAt?.toDate?.() || null,
        };
    } catch (error) {
        console.error('[Firestore] Error fetching blog post by slug:', error);
        throw new Error('Failed to fetch blog post');
    }
}

/**
 * Get a single blog post by ID
 * @param {string} id - The post ID
 * @returns {Promise<Object|null>} - Blog post object or null
 */
export async function getBlogPostById(id) {
    try {
        const docRef = doc(db, BLOG_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        return {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate?.() || null,
            updatedAt: docSnap.data().updatedAt?.toDate?.() || null,
            publishedAt: docSnap.data().publishedAt?.toDate?.() || null,
        };
    } catch (error) {
        console.error('[Firestore] Error fetching blog post by ID:', error);
        throw new Error('Failed to fetch blog post');
    }
}

/**
 * Save a blog post (create or update)
 * @param {Object} postData - The blog post data
 * @param {string} userId - The user making the change
 * @returns {Promise<Object>} - { success: boolean, id: string }
 */
export async function saveBlogPost(postData, userId = 'admin') {
    try {
        const now = Timestamp.now();
        const isNew = !postData.id;

        // Generate ID from slug if new
        const postId = postData.id || `${postData.locale}-${postData.slug}-${Date.now()}`;

        if (!postId) {
            throw new Error('Blog post must have an ID or slug');
        }

        const docRef = doc(db, BLOG_COLLECTION, postId);

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = postData.content ? postData.content.split(/\s+/).length : 0;
        const readingTime = Math.ceil(wordCount / 200);

        // Prepare data
        const data = {
            ...postData,
            updatedAt: now,
            modifiedBy: userId,
            deleted: false,
            readingTime,
            wordCount,
        };

        if (isNew) {
            data.createdAt = now;
            data.publishedAt = postData.status === 'published' ? now : null;
        } else {
            // Remove fields that shouldn't be updated
            delete data.id;
            delete data.createdAt;

            // Update publishedAt only if status changes to published
            if (postData.status === 'published' && !postData.publishedAt) {
                data.publishedAt = now;
            }
        }

        // Save to Firestore
        if (isNew) {
            await setDoc(docRef, data);
        } else {
            await updateDoc(docRef, data);
        }

        console.log(`[Firestore] Blog post ${isNew ? 'created' : 'updated'}: ${postId}`);

        return {
            success: true,
            id: postId,
        };
    } catch (error) {
        console.error('[Firestore] Error saving blog post:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Delete a blog post (soft delete)
 * @param {string} id - The post ID
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function deleteBlogPost(id) {
    try {
        const docRef = doc(db, BLOG_COLLECTION, id);

        await updateDoc(docRef, {
            deleted: true,
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Blog post deleted: ${id}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error deleting blog post:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Toggle blog post status (publish/unpublish)
 * @param {string} id - The post ID
 * @param {string} status - New status ('published' or 'draft')
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function toggleBlogPostStatus(id, status) {
    try {
        const docRef = doc(db, BLOG_COLLECTION, id);
        const updateData = {
            status,
            updatedAt: Timestamp.now(),
        };

        // Set publishedAt when publishing for the first time
        if (status === 'published') {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && !docSnap.data().publishedAt) {
                updateData.publishedAt = Timestamp.now();
            }
        }

        await updateDoc(docRef, updateData);

        console.log(`[Firestore] Blog post status updated: ${id} -> ${status}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error toggling blog post status:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Get blog posts by tag
 * @param {string} tag - The tag to filter by
 * @param {string} locale - The locale
 * @param {number} limitCount - Number of posts to fetch
 * @returns {Promise<Array>} - Array of blog post objects
 */
export async function getBlogPostsByTag(tag, locale = 'en', limitCount = 20) {
    try {
        const postsRef = collection(db, BLOG_COLLECTION);
        const q = query(
            postsRef,
            where('locale', '==', locale),
            where('tags', 'array-contains', tag),
            where('status', '==', 'published'),
            where('deleted', '==', false),
            orderBy('publishedAt', 'desc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);
        const posts = [];

        snapshot.forEach((doc) => {
            posts.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || null,
                updatedAt: doc.data().updatedAt?.toDate?.() || null,
                publishedAt: doc.data().publishedAt?.toDate?.() || null,
            });
        });

        return posts;
    } catch (error) {
        console.error('[Firestore] Error fetching blog posts by tag:', error);
        throw new Error('Failed to fetch blog posts by tag');
    }
}

/**
 * Get all unique categories for a locale
 * @param {string} locale - The locale
 * @returns {Promise<Array>} - Array of category strings
 */
export async function getBlogCategories(locale = 'en') {
    try {
        const postsRef = collection(db, BLOG_COLLECTION);
        const q = query(
            postsRef,
            where('locale', '==', locale),
            where('status', '==', 'published'),
            where('deleted', '==', false)
        );

        const snapshot = await getDocs(q);
        const categories = new Set();

        snapshot.forEach((doc) => {
            const category = doc.data().category;
            if (category) {
                categories.add(category);
            }
        });

        return Array.from(categories).sort();
    } catch (error) {
        console.error('[Firestore] Error fetching blog categories:', error);
        return [];
    }
}

/**
 * Get all unique tags for a locale
 * @param {string} locale - The locale
 * @returns {Promise<Array>} - Array of tag strings
 */
export async function getBlogTags(locale = 'en') {
    try {
        const postsRef = collection(db, BLOG_COLLECTION);
        const q = query(
            postsRef,
            where('locale', '==', locale),
            where('status', '==', 'published'),
            where('deleted', '==', false)
        );

        const snapshot = await getDocs(q);
        const tags = new Set();

        snapshot.forEach((doc) => {
            const postTags = doc.data().tags || [];
            postTags.forEach(tag => tags.add(tag));
        });

        return Array.from(tags).sort();
    } catch (error) {
        console.error('[Firestore] Error fetching blog tags:', error);
        return [];
    }
}


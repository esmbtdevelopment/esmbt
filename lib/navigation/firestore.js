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
    Timestamp,
} from 'firebase/firestore';

const NAVIGATION_COLLECTION = 'navigation';

/**
 * Get navigation structure for a specific locale and section
 * @param {string} locale - The locale (e.g., 'en', 'tr')
 * @param {string} section - The section (e.g., 'main', 'footer', 'mobile')
 * @returns {Promise<Array>} - Array of navigation items
 */
export async function getNavigationStructure(locale = 'en', section = 'main') {
    try {
        const navRef = collection(db, NAVIGATION_COLLECTION);
        const q = query(
            navRef,
            where('locale', '==', locale),
            where('section', '==', section),
            where('deleted', '==', false),
            orderBy('order', 'asc')
        );

        const snapshot = await getDocs(q);
        const navItems = [];

        snapshot.forEach((doc) => {
            navItems.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || null,
                updatedAt: doc.data().updatedAt?.toDate?.() || null,
            });
        });

        return navItems;
    } catch (error) {
        console.error('[Firestore] Error fetching navigation:', error);
        throw new Error('Failed to fetch navigation');
    }
}

/**
 * Get all navigation items (for admin)
 * @param {string} locale - The locale
 * @returns {Promise<Array>} - Array of navigation items
 */
export async function getAllNavigation(locale = 'en') {
    try {
        const navRef = collection(db, NAVIGATION_COLLECTION);
        const q = query(
            navRef,
            where('locale', '==', locale),
            where('deleted', '==', false),
            orderBy('order', 'asc')
        );

        const snapshot = await getDocs(q);
        const navItems = [];

        snapshot.forEach((doc) => {
            navItems.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || null,
                updatedAt: doc.data().updatedAt?.toDate?.() || null,
            });
        });

        return navItems;
    } catch (error) {
        console.error('[Firestore] Error fetching all navigation:', error);
        throw new Error('Failed to fetch navigation');
    }
}

/**
 * Get a single navigation item by ID
 * @param {string} id - The navigation item ID
 * @returns {Promise<Object|null>} - Navigation item or null
 */
export async function getNavItemById(id) {
    try {
        const docRef = doc(db, NAVIGATION_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        return {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate?.() || null,
            updatedAt: docSnap.data().updatedAt?.toDate?.() || null,
        };
    } catch (error) {
        console.error('[Firestore] Error fetching nav item by ID:', error);
        throw new Error('Failed to fetch navigation item');
    }
}

/**
 * Save a navigation item (create or update)
 * @param {Object} navData - The navigation data
 * @param {string} userId - The user making the change
 * @returns {Promise<Object>} - { success: boolean, id: string }
 */
export async function saveNavItem(navData, userId = 'admin') {
    try {
        const now = Timestamp.now();
        const isNew = !navData.id;

        // Generate ID if new
        const navId = navData.id || `nav-${now.seconds}`;

        const docRef = doc(db, NAVIGATION_COLLECTION, navId);

        // Prepare data
        const data = {
            ...navData,
            updatedAt: now,
            modifiedBy: userId,
            deleted: false,
        };

        if (isNew) {
            data.createdAt = now;
            data.order = navData.order || 999; // Default to end of list
        } else {
            // Remove fields that shouldn't be updated
            delete data.id;
            delete data.createdAt;
        }

        // Save to Firestore
        if (isNew) {
            await setDoc(docRef, data);
        } else {
            await updateDoc(docRef, data);
        }

        console.log(`[Firestore] Navigation item ${isNew ? 'created' : 'updated'}: ${navId}`);

        return {
            success: true,
            id: navId,
        };
    } catch (error) {
        console.error('[Firestore] Error saving navigation item:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Delete a navigation item (soft delete)
 * If it has children, delete them too
 * @param {string} id - The navigation item ID
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function deleteNavItem(id) {
    try {
        const docRef = doc(db, NAVIGATION_COLLECTION, id);

        // Get the item to check if it has children
        const navItem = await getNavItemById(id);

        if (!navItem) {
            return { success: false, error: 'Navigation item not found' };
        }

        // Soft delete the item
        await updateDoc(docRef, {
            deleted: true,
            updatedAt: Timestamp.now(),
        });

        // If it has children, soft delete them too
        if (navItem.children && Array.isArray(navItem.children)) {
            // Since children are embedded, they're automatically deleted
            // But if children were separate documents, we'd need to delete them
        }

        console.log(`[Firestore] Navigation item deleted: ${id}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error deleting navigation item:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Reorder navigation items
 * @param {Array<string>} navIds - Array of navigation IDs in new order
 * @param {string} parentId - Parent ID (null for top-level)
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function reorderNavItems(navIds, parentId = null) {
    try {
        if (!parentId) {
            // Reorder top-level items
            const promises = navIds.map((id, index) => {
                const docRef = doc(db, NAVIGATION_COLLECTION, id);
                return updateDoc(docRef, {
                    order: index + 1,
                    updatedAt: Timestamp.now(),
                });
            });

            await Promise.all(promises);
        } else {
            // Reorder children within a parent
            const parentRef = doc(db, NAVIGATION_COLLECTION, parentId);
            const parentSnap = await getDoc(parentRef);

            if (!parentSnap.exists()) {
                return { success: false, error: 'Parent item not found' };
            }

            const parentData = parentSnap.data();
            const children = parentData.children || [];

            // Reorder children array
            const reorderedChildren = navIds.map(childId => {
                return children.find(c => c.id === childId);
            }).filter(Boolean).map((child, index) => ({
                ...child,
                order: index + 1
            }));

            await updateDoc(parentRef, {
                children: reorderedChildren,
                updatedAt: Timestamp.now(),
            });
        }

        console.log('[Firestore] Navigation items reordered');

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error reordering navigation items:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Toggle navigation item status (published/hidden)
 * @param {string} id - The navigation item ID
 * @param {string} status - New status ('published' or 'hidden')
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function toggleNavItemStatus(id, status) {
    try {
        const docRef = doc(db, NAVIGATION_COLLECTION, id);

        await updateDoc(docRef, {
            status,
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Navigation item status updated: ${id} -> ${status}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error toggling navigation item status:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Add a child to a navigation item
 * @param {string} parentId - The parent navigation item ID
 * @param {Object} childData - The child navigation data
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function addNavChild(parentId, childData) {
    try {
        const parentRef = doc(db, NAVIGATION_COLLECTION, parentId);
        const parentSnap = await getDoc(parentRef);

        if (!parentSnap.exists()) {
            return { success: false, error: 'Parent item not found' };
        }

        const parentData = parentSnap.data();
        const children = parentData.children || [];

        // Generate child ID
        const childId = childData.id || `child-${Date.now()}`;

        const newChild = {
            id: childId,
            ...childData,
            order: children.length + 1,
        };

        // Add child to children array
        await updateDoc(parentRef, {
            children: [...children, newChild],
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Child added to navigation item: ${parentId}`);

        return { success: true, id: childId };
    } catch (error) {
        console.error('[Firestore] Error adding child to navigation item:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Update a child in a navigation item
 * @param {string} parentId - The parent navigation item ID
 * @param {string} childId - The child ID to update
 * @param {Object} childData - The updated child data
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function updateNavChild(parentId, childId, childData) {
    try {
        const parentRef = doc(db, NAVIGATION_COLLECTION, parentId);
        const parentSnap = await getDoc(parentRef);

        if (!parentSnap.exists()) {
            return { success: false, error: 'Parent item not found' };
        }

        const parentData = parentSnap.data();
        const children = parentData.children || [];

        // Update the specific child
        const updatedChildren = children.map(child => {
            if (child.id === childId) {
                return { ...child, ...childData };
            }
            return child;
        });

        await updateDoc(parentRef, {
            children: updatedChildren,
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Child updated in navigation item: ${parentId}/${childId}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error updating child in navigation item:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Remove a child from a navigation item
 * @param {string} parentId - The parent navigation item ID
 * @param {string} childId - The child ID to remove
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function removeNavChild(parentId, childId) {
    try {
        const parentRef = doc(db, NAVIGATION_COLLECTION, parentId);
        const parentSnap = await getDoc(parentRef);

        if (!parentSnap.exists()) {
            return { success: false, error: 'Parent item not found' };
        }

        const parentData = parentSnap.data();
        const children = parentData.children || [];

        // Filter out the child
        const updatedChildren = children.filter(child => child.id !== childId);

        await updateDoc(parentRef, {
            children: updatedChildren,
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Child removed from navigation item: ${parentId}/${childId}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error removing child from navigation item:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}


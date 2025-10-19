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

const SERVICES_COLLECTION = 'services';

/**
 * Get all services for a specific locale
 * @param {string} locale - The locale (e.g., 'en', 'tr')
 * @param {string} status - Filter by status ('all', 'published', 'draft')
 * @returns {Promise<Array>} - Array of service objects
 */
export async function getAllServices(locale = 'en', status = 'all') {
    try {
        const servicesRef = collection(db, SERVICES_COLLECTION);

        let q;
        if (status === 'all') {
            q = query(
                servicesRef,
                where('locale', '==', locale),
                where('deleted', '==', false),
                orderBy('order', 'asc')
            );
        } else {
            q = query(
                servicesRef,
                where('locale', '==', locale),
                where('status', '==', status),
                where('deleted', '==', false),
                orderBy('order', 'asc')
            );
        }

        const snapshot = await getDocs(q);
        const services = [];

        snapshot.forEach((doc) => {
            services.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.() || null,
                updatedAt: doc.data().updatedAt?.toDate?.() || null,
            });
        });

        return services;
    } catch (error) {
        console.error('[Firestore] Error fetching services:', error);
        throw new Error('Failed to fetch services');
    }
}

/**
 * Get a single service by slug
 * @param {string} slug - The service slug
 * @param {string} locale - The locale
 * @returns {Promise<Object|null>} - Service object or null
 */
export async function getServiceBySlug(slug, locale = 'en') {
    try {
        const servicesRef = collection(db, SERVICES_COLLECTION);
        const q = query(
            servicesRef,
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
        };
    } catch (error) {
        console.error('[Firestore] Error fetching service by slug:', error);
        throw new Error('Failed to fetch service');
    }
}

/**
 * Get a single service by ID
 * @param {string} id - The service ID
 * @returns {Promise<Object|null>} - Service object or null
 */
export async function getServiceById(id) {
    try {
        const docRef = doc(db, SERVICES_COLLECTION, id);
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
        console.error('[Firestore] Error fetching service by ID:', error);
        throw new Error('Failed to fetch service');
    }
}

/**
 * Save a service (create or update)
 * @param {Object} serviceData - The service data
 * @param {string} userId - The user making the change
 * @returns {Promise<Object>} - { success: boolean, id: string }
 */
export async function saveService(serviceData, userId = 'admin') {
    try {
        const now = Timestamp.now();
        const isNew = !serviceData.id;

        // Generate ID from slug if new
        const serviceId = serviceData.id || serviceData.slug;

        if (!serviceId) {
            throw new Error('Service must have an ID or slug');
        }

        const docRef = doc(db, SERVICES_COLLECTION, serviceId);

        // Prepare data
        const data = {
            ...serviceData,
            updatedAt: now,
            modifiedBy: userId,
            deleted: false,
        };

        if (isNew) {
            data.createdAt = now;
            data.order = serviceData.order || 999; // Default to end of list
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

        console.log(`[Firestore] Service ${isNew ? 'created' : 'updated'}: ${serviceId}`);

        return {
            success: true,
            id: serviceId,
        };
    } catch (error) {
        console.error('[Firestore] Error saving service:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Delete a service (soft delete)
 * @param {string} id - The service ID
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function deleteService(id) {
    try {
        const docRef = doc(db, SERVICES_COLLECTION, id);

        await updateDoc(docRef, {
            deleted: true,
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Service deleted: ${id}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error deleting service:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Reorder services
 * @param {Array<string>} serviceIds - Array of service IDs in new order
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function reorderServices(serviceIds) {
    try {
        const promises = serviceIds.map((id, index) => {
            const docRef = doc(db, SERVICES_COLLECTION, id);
            return updateDoc(docRef, {
                order: index + 1,
                updatedAt: Timestamp.now(),
            });
        });

        await Promise.all(promises);

        console.log('[Firestore] Services reordered');

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error reordering services:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Toggle service status (publish/unpublish)
 * @param {string} id - The service ID
 * @param {string} status - New status ('published' or 'draft')
 * @returns {Promise<Object>} - { success: boolean }
 */
export async function toggleServiceStatus(id, status) {
    try {
        const docRef = doc(db, SERVICES_COLLECTION, id);

        await updateDoc(docRef, {
            status,
            updatedAt: Timestamp.now(),
        });

        console.log(`[Firestore] Service status updated: ${id} -> ${status}`);

        return { success: true };
    } catch (error) {
        console.error('[Firestore] Error toggling service status:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}


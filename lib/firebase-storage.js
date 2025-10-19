import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import app from './firebase';

const storage = getStorage(app);

/**
 * Upload an image to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The storage path (e.g., 'services/image.jpg')
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export async function uploadImage(file, path) {
    try {
        // Create a storage reference
        const storageRef = ref(storage, path);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
}

/**
 * Delete an image from Firebase Storage
 * @param {string} path - The storage path
 * @returns {Promise<void>}
 */
export async function deleteImage(path) {
    try {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw new Error('Failed to delete image');
    }
}

/**
 * Generate a unique filename for an upload
 * @param {string} originalName - The original filename
 * @param {string} prefix - Optional prefix (e.g., 'services', 'navigation')
 * @returns {string} - A unique filename
 */
export function generateUniqueFilename(originalName, prefix = '') {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    const name = originalName.split('.').slice(0, -1).join('.');
    const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase();

    return prefix
        ? `${prefix}/${sanitizedName}-${timestamp}-${randomString}.${extension}`
        : `${sanitizedName}-${timestamp}-${randomString}.${extension}`;
}

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB (default 5MB)
 * @returns {Object} - { valid: boolean, error: string }
 */
export function validateImage(file, maxSizeMB = 5) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload a JPG, PNG, or WebP image.'
        };
    }

    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File size exceeds ${maxSizeMB}MB. Please choose a smaller image.`
        };
    }

    return { valid: true, error: null };
}

/**
 * Extract the storage path from a Firebase Storage URL
 * @param {string} url - The Firebase Storage download URL
 * @returns {string|null} - The storage path or null if invalid
 */
export function getStoragePathFromURL(url) {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;

        // Firebase Storage URLs have format: /v0/b/{bucket}/o/{encodedPath}
        const match = pathname.match(/\/o\/(.+?)(\?|$)/);
        if (match) {
            return decodeURIComponent(match[1]);
        }

        return null;
    } catch (error) {
        console.error('Error parsing storage URL:', error);
        return null;
    }
}


// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase (singleton pattern to avoid re-initialization)
let app;
let db;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);

    // Initialize Firestore with persistent local cache
    // This caches data locally and reduces Firebase reads for returning users
    try {
        db = initializeFirestore(app, {
            localCache: persistentLocalCache({
                tabManager: persistentMultipleTabManager()
            })
        });
        console.log('[Firebase] Initialized with persistent local cache');
    } catch (error) {
        // Fall back to default initialization if persistent cache fails
        console.warn('[Firebase] Persistent cache initialization failed, using default:', error);
        db = initializeFirestore(app, {});
    }
} else {
    app = getApps()[0];
    // Get existing Firestore instance (no await needed - import at top)
    db = getFirestore(app);
}

// Initialize Firebase services
export const auth = getAuth(app);
export { db };
export const storage = getStorage(app);

export default app;
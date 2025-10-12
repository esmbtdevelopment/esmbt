/**
 * Migration Script: Import existing JSON translations to Firestore
 * 
 * This script reads your existing en.json and tr.json files and imports
 * them into Firestore with proper structure.
 * 
 * Run this once to migrate your translations:
 * node scripts/migrate-to-firestore.js
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (getApps().length === 0) {
    try {
        // Try to load service account key file
        const serviceAccountPath = path.join(__dirname, '..', 'service-account-key.json');

        // Check if file exists
        if (existsSync(serviceAccountPath)) {
            console.log('📄 Loading service account from file...');
            const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));
            initializeApp({
                credential: cert(serviceAccount)
            });
            console.log('✅ Firebase Admin initialized with service account file\n');
        } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
            // Fallback to environment variables
            console.log('📄 Loading service account from environment variables...');
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                })
            });
            console.log('✅ Firebase Admin initialized with environment variables\n');
        } else {
            throw new Error(
                'No Firebase credentials found!\n' +
                'Please either:\n' +
                '1. Place service-account-key.json in the project root, OR\n' +
                '2. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables'
            );
        }
    } catch (error) {
        console.error('❌ Failed to initialize Firebase Admin:', error.message);
        process.exit(1);
    }
}

const db = getFirestore();

/**
 * Flatten a nested object into dot notation keys
 */
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], fullKey));
        } else {
            acc[fullKey] = obj[key];
        }

        return acc;
    }, {});
}

/**
 * Get category from translation key
 */
function getCategoryFromKey(key) {
    return key.split('.')[0];
}

/**
 * Get subcategory from translation key
 */
function getSubcategoryFromKey(key) {
    const parts = key.split('.');
    return parts.length > 2 ? parts[1] : null;
}

/**
 * Main migration function
 */
async function migrate() {
    try {
        console.log('🚀 Starting migration to Firestore...\n');

        // Read JSON files
        const messagesDir = path.join(__dirname, '..', 'messages');
        const enPath = path.join(messagesDir, 'en.json');
        const trPath = path.join(messagesDir, 'tr.json');

        console.log('📖 Reading JSON files...');
        const enContent = JSON.parse(await fs.readFile(enPath, 'utf-8'));
        const trContent = JSON.parse(await fs.readFile(trPath, 'utf-8'));

        // Flatten translations
        console.log('🔄 Flattening translations...');
        const flatEn = flattenObject(enContent);
        const flatTr = flattenObject(trContent);

        // Get all unique keys
        const allKeys = new Set([...Object.keys(flatEn), ...Object.keys(flatTr)]);
        console.log(`📊 Found ${allKeys.size} unique translation keys\n`);

        // Batch write to Firestore
        let batch = db.batch();
        let count = 0;
        let batchCount = 0;
        const batchSize = 500; // Firestore batch limit

        for (const key of allKeys) {
            const docRef = db.collection('translations').doc(key);

            const translationData = {
                key: key,
                en: flatEn[key] || '',
                tr: flatTr[key] || '',
                category: getCategoryFromKey(key),
                subcategory: getSubcategoryFromKey(key),
                status: 'published',
                version: 1,
                createdAt: Timestamp.now(),
                createdBy: 'migration-script',
                lastModified: Timestamp.now(),
                modifiedBy: 'migration-script',
                metadata: {
                    migratedFrom: 'json-files',
                    migratedAt: new Date().toISOString()
                }
            };

            batch.set(docRef, translationData);
            count++;
            batchCount++;

            // Commit batch every 500 documents
            if (batchCount === batchSize) {
                console.log(`   Committing batch (${count} documents)...`);
                await batch.commit();
                // Create a new batch for the next set of documents
                batch = db.batch();
                batchCount = 0;
            }
        }

        // Commit remaining documents
        if (batchCount > 0) {
            console.log(`   Committing final batch (${count} documents)...`);
            await batch.commit();
        }

        console.log(`\n✅ Migration completed successfully!`);
        console.log(`📊 Migrated ${count} translations to Firestore`);
        console.log(`\n🔍 You can now view your translations in Firebase Console:`);
        console.log(`   https://console.firebase.google.com/project/${process.env.FIREBASE_PROJECT_ID}/firestore`);
        console.log(`\n⚠️  Note: Your JSON files are still intact and serve as backup`);

        // Save migration metadata
        await db.collection('system').doc('migration-metadata').set({
            migratedAt: Timestamp.now(),
            totalKeys: count,
            status: 'completed',
            sourceFiles: ['messages/en.json', 'messages/tr.json']
        });

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        console.error('\nError details:', error.message);
        process.exit(1);
    }
}

// Run migration
migrate().then(() => {
    console.log('\n✨ Migration script finished!');
    process.exit(0);
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});


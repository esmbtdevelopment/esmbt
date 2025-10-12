import { NextResponse } from 'next/server';
import { exportTranslationsToObject } from '@/lib/translations/firestore';
import fs from 'fs/promises';
import path from 'path';

/**
 * Export translations from Firestore to JSON files
 * POST /api/translations/export
 */
export async function POST(request) {
    try {
        console.log('[Export] Starting translation export...');

        // TODO: Add authentication check
        // const user = await verifyAdmin(request);
        // if (!user || user.role !== 'admin') {
        //     return NextResponse.json(
        //         { success: false, error: 'Unauthorized' },
        //         { status: 401 }
        //     );
        // }

        // Export translations from Firestore
        const result = await exportTranslationsToObject();

        if (!result.success) {
            console.error('[Export] Failed to export translations:', result.error);
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        const { en, tr } = result.translations;
        const totalKeys = result.totalKeys;

        // Write to JSON files
        const messagesDir = path.join(process.cwd(), 'messages');

        // Ensure directory exists
        await fs.mkdir(messagesDir, { recursive: true });

        // Write English translations
        const enPath = path.join(messagesDir, 'en.json');
        await fs.writeFile(
            enPath,
            JSON.stringify(en, null, 2),
            'utf-8'
        );
        console.log(`[Export] Wrote ${enPath}`);

        // Write Turkish translations
        const trPath = path.join(messagesDir, 'tr.json');
        await fs.writeFile(
            trPath,
            JSON.stringify(tr, null, 2),
            'utf-8'
        );
        console.log(`[Export] Wrote ${trPath}`);

        // Create backup with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(process.cwd(), 'messages', 'backups');
        await fs.mkdir(backupDir, { recursive: true });

        await fs.writeFile(
            path.join(backupDir, `en-${timestamp}.json`),
            JSON.stringify(en, null, 2),
            'utf-8'
        );
        await fs.writeFile(
            path.join(backupDir, `tr-${timestamp}.json`),
            JSON.stringify(tr, null, 2),
            'utf-8'
        );
        console.log(`[Export] Created backups in messages/backups/`);

        console.log(`[Export] Successfully exported ${totalKeys} translation keys`);

        return NextResponse.json({
            success: true,
            message: 'Translations exported successfully',
            totalKeys,
            files: {
                en: 'messages/en.json',
                tr: 'messages/tr.json'
            },
            backups: {
                en: `messages/backups/en-${timestamp}.json`,
                tr: `messages/backups/tr-${timestamp}.json`
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[Export] Error exporting translations:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to export translations', details: error.message },
            { status: 500 }
        );
    }
}

/**
 * Get export status and metadata
 * GET /api/translations/export
 */
export async function GET() {
    try {
        const messagesDir = path.join(process.cwd(), 'messages');
        const enPath = path.join(messagesDir, 'en.json');
        const trPath = path.join(messagesDir, 'tr.json');

        // Check if files exist and get last modified time
        let enStats, trStats;

        try {
            enStats = await fs.stat(enPath);
            trStats = await fs.stat(trPath);
        } catch (error) {
            return NextResponse.json({
                success: true,
                exists: false,
                message: 'JSON files not found. Please export translations.'
            });
        }

        return NextResponse.json({
            success: true,
            exists: true,
            files: {
                en: {
                    path: 'messages/en.json',
                    lastModified: enStats.mtime.toISOString(),
                    size: enStats.size
                },
                tr: {
                    path: 'messages/tr.json',
                    lastModified: trStats.mtime.toISOString(),
                    size: trStats.size
                }
            }
        });
    } catch (error) {
        console.error('[Export] Error getting export status:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get export status' },
            { status: 500 }
        );
    }
}


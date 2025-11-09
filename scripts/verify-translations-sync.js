#!/usr/bin/env node

/**
 * Verify that Firestore translations match local JSON files (messages/en.json, messages/tr.json).
 * Optional: --fix to sync local files to Firestore values, --include-unpublished to include non-published docs,
 *           --remove-extra to remove extra keys from local that don't exist in Firestore (only with --fix).
 *
 * Usage:
 *   node scripts/verify-translations-sync.js
 *   node scripts/verify-translations-sync.js --fix
 *   node scripts/verify-translations-sync.js --fix --remove-extra
 *   node scripts/verify-translations-sync.js --include-unpublished
 */

import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';

// ---------- CLI FLAGS ----------
const args = new Set(process.argv.slice(2));
const FIX_MODE = args.has('--fix');
const INCLUDE_UNPUBLISHED = args.has('--include-unpublished');
const REMOVE_EXTRA = args.has('--remove-extra'); // only meaningful with --fix

// ---------- HELPERS ----------
function flattenObject(obj, prefix = '') {
  return Object.keys(obj || {}).reduce((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, fullKey));
    } else {
      acc[fullKey] = value;
    }
    return acc;
  }, {});
}

function setNestedValue(obj, pathStr, value) {
  const keys = pathStr.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
  target[lastKey] = value;
}

function deleteNestedKey(obj, pathStr) {
  const keys = pathStr.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
  if (target && Object.prototype.hasOwnProperty.call(target, lastKey)) {
    delete target[lastKey];
    return true;
  }
  return false;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJson(filePath, dataObj) {
  fs.writeFileSync(filePath, JSON.stringify(dataObj, null, 2), 'utf-8');
}

// ---------- FIREBASE ADMIN ----------
function initAdmin() {
  const serviceKeyPath = path.join(process.cwd(), 'service-account-key.json');
  if (!fs.existsSync(serviceKeyPath)) {
    throw new Error(`service-account-key.json not found at project root: ${serviceKeyPath}`);
  }
  const serviceAccount = JSON.parse(fs.readFileSync(serviceKeyPath, 'utf-8'));

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  }
  return admin.firestore();
}

async function fetchFirestoreTranslations(db) {
  let queryRef = db.collection('translations');
  if (!INCLUDE_UNPUBLISHED) {
    queryRef = queryRef.where('status', '==', 'published');
  }
  const snap = await queryRef.get();

  const map = {
    en: new Map(),
    tr: new Map(),
  };

  snap.forEach((doc) => {
    const data = doc.data() || {};
    const key = data.key || doc.id;
    if (typeof data.en === 'string') map.en.set(key, data.en);
    if (typeof data.tr === 'string') map.tr.set(key, data.tr);
  });

  return map;
}

// ---------- MAIN ----------
async function main() {
  console.log('[Verify] Starting translation sync verification...');
  const db = initAdmin();

  // Firestore
  const fsMaps = await fetchFirestoreTranslations(db);
  console.log(`[Verify] Firestore keys — EN: ${fsMaps.en.size}, TR: ${fsMaps.tr.size}${INCLUDE_UNPUBLISHED ? ' (including unpublished)' : ''}`);

  // Local
  const messagesDir = path.join(process.cwd(), 'messages');
  const enPath = path.join(messagesDir, 'en.json');
  const trPath = path.join(messagesDir, 'tr.json');

  if (!fs.existsSync(enPath) || !fs.existsSync(trPath)) {
    throw new Error('Local translation files not found. Expected messages/en.json and messages/tr.json');
  }

  const enLocal = readJson(enPath);
  const trLocal = readJson(trPath);
  const enLocalFlat = flattenObject(enLocal);
  const trLocalFlat = flattenObject(trLocal);

  // Compare EN
  const enMissingInLocal = [];
  const enDifferent = [];
  const enExtraLocal = [];

  for (const [key, value] of fsMaps.en.entries()) {
    const localVal = enLocalFlat[key];
    if (localVal === undefined) {
      enMissingInLocal.push(key);
    } else if (String(localVal) !== String(value)) {
      enDifferent.push(key);
    }
  }
  for (const key of Object.keys(enLocalFlat)) {
    if (!fsMaps.en.has(key)) {
      enExtraLocal.push(key);
    }
  }

  // Compare TR
  const trMissingInLocal = [];
  const trDifferent = [];
  const trExtraLocal = [];

  for (const [key, value] of fsMaps.tr.entries()) {
    const localVal = trLocalFlat[key];
    if (localVal === undefined) {
      trMissingInLocal.push(key);
    } else if (String(localVal) !== String(value)) {
      trDifferent.push(key);
    }
  }
  for (const key of Object.keys(trLocalFlat)) {
    if (!fsMaps.tr.has(key)) {
      trExtraLocal.push(key);
    }
  }

  // Report
  const summary = {
    en: {
      missingInLocal: enMissingInLocal.length,
      different: enDifferent.length,
      extraLocal: enExtraLocal.length,
    },
    tr: {
      missingInLocal: trMissingInLocal.length,
      different: trDifferent.length,
      extraLocal: trExtraLocal.length,
    },
  };

  console.log('\n[Verify] Summary');
  console.table(summary);

  if (!FIX_MODE) {
    if (enMissingInLocal.length || enDifferent.length || enExtraLocal.length || trMissingInLocal.length || trDifferent.length || trExtraLocal.length) {
      console.log('\n[Verify] Differences found.');
      console.log('- Run with --fix to sync local files to Firestore values.');
      console.log('- Use --remove-extra with --fix to remove keys that exist only locally.\n');
      // Exit non-zero to signal mismatch in CI
      process.exitCode = 1;
    } else {
      console.log('\n[Verify] Local files are in sync with Firestore.');
    }
    return;
  }

  // FIX: Sync local to Firestore values
  console.log('\n[Fix] Updating local files to match Firestore...');
  const newEn = JSON.parse(JSON.stringify(enLocal));
  const newTr = JSON.parse(JSON.stringify(trLocal));

  // Apply Firestore -> Local updates
  for (const [key, value] of fsMaps.en.entries()) {
    setNestedValue(newEn, key, value);
  }
  for (const [key, value] of fsMaps.tr.entries()) {
    setNestedValue(newTr, key, value);
  }

  // Optionally remove extra local keys
  if (REMOVE_EXTRA) {
    for (const key of enExtraLocal) deleteNestedKey(newEn, key);
    for (const key of trExtraLocal) deleteNestedKey(newTr, key);
  }

  writeJson(enPath, newEn);
  writeJson(trPath, newTr);
  console.log('[Fix] Wrote messages/en.json and messages/tr.json');

  console.log('\n[Verify] Done.');
}

main().catch((err) => {
  console.error('[Verify] Error:', err.message);
  process.exit(1);
});



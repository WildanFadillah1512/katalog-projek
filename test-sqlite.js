import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'server/database.db');

try {
    console.log('Attempting to initialize sqlite3...');
    const verboseSqlite = sqlite3.verbose();
    console.log('verbose() called successfully.');
    const db = new verboseSqlite.Database(dbPath, (err) => {
        if (err) console.error('DB Error:', err);
        else console.log('DB Connected successfully');
    });
} catch (e) {
    console.error('Crash:', e);
}

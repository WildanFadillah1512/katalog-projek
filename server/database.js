import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.db');

console.log('Initializing database module...');
const verboseSqlite = sqlite3.verbose();
const db = new verboseSqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'free'
        )`);

        // Projects Table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE,
            title TEXT,
            category TEXT,
            shortDescription TEXT,
            fullDescription TEXT,
            thumbnail TEXT,
            techStack TEXT,
            accessLevel TEXT,
            price REAL,
            downloadUrl TEXT,
            demoUrl TEXT,
            featured INTEGER DEFAULT 0,
            rating REAL DEFAULT 5.0,
            totalReviews INTEGER DEFAULT 0
        )`);

        // Licenses (Purchases)
        db.run(`CREATE TABLE IF NOT EXISTS licenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            projectId INTEGER,
            licenseType TEXT,
            purchaseDate TEXT,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(projectId) REFERENCES projects(id)
        )`);

        console.log('Database tables initialized.');
    });
}

export default db;

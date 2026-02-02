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

        // Coupons Table
        db.run(`CREATE TABLE IF NOT EXISTS coupons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE,
            description TEXT,
            discountType TEXT, -- 'percentage' or 'fixed'
            discountValue REAL,
            minPurchaseAmount REAL DEFAULT 0,
            maxUses INTEGER DEFAULT NULL,
            currentUses INTEGER DEFAULT 0,
            validFrom TEXT,
            validUntil TEXT,
            isActive INTEGER DEFAULT 1,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
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
            originalPrice REAL,
            finalPrice REAL,
            couponId INTEGER DEFAULT NULL,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(projectId) REFERENCES projects(id),
            FOREIGN KEY(couponId) REFERENCES coupons(id)
        )`);

        // Coupon Usage Tracking
        db.run(`CREATE TABLE IF NOT EXISTS coupon_usages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            couponId INTEGER,
            userId INTEGER,
            licenseId INTEGER,
            usedAt TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(couponId) REFERENCES coupons(id),
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(licenseId) REFERENCES licenses(id)
        )`);

        console.log('Database tables initialized.');
    });
}

export default db;

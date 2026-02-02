import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- Auth Routes ---

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    // In production, hash password here
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, email, password, 'free'], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'User registered',
            user: { id: this.lastID, name, email, role: 'free' },
            token: 'mock-jwt-token-' + this.lastID // Mock token
        });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({
                message: 'Login successful',
                user: { id: row.id, name: row.name, email: row.email, role: row.role },
                token: 'mock-jwt-token-' + row.id
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

app.get('/api/auth/me', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token' });

    // Mock token verification (extract ID from mock-jwt-token-ID)
    const userId = token.replace('Bearer ', '').split('-').pop();

    const sql = 'SELECT id, name, email, role FROM users WHERE id = ?';
    db.get(sql, [userId], (err, row) => {
        if (err || !row) return res.status(401).json({ message: 'Invalid token' });
        res.json({ user: row });
    });
});

// --- Project Routes ---

app.get('/api/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Parse JSON fields
        const projects = rows.map(p => ({
            ...p,
            techStack: JSON.parse(p.techStack || '[]'),
            featured: !!p.featured
        }));
        res.json(projects);
    });
});

app.get('/api/projects/:slug', (req, res) => {
    const sql = 'SELECT * FROM projects WHERE slug = ?';
    db.get(sql, [req.params.slug], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            const project = {
                ...row,
                techStack: JSON.parse(row.techStack || '[]'),
                featured: !!row.featured,
                // Mock complex data enrichment
                gallery: [row.thumbnail, 'https://placehold.co/600x400', 'https://placehold.co/600x400'],
                author: { name: 'SmartIndus Team', avatar: 'https://ui-avatars.com/api/?name=SI&background=059669&color=fff', reputation: 98, bio: 'Official Team', totalSales: 100 },
                reviews: [
                    { id: 1, userName: 'DemoUser', date: '2026-01-01', content: 'Great project!', rating: 5 }
                ],
                changelog: [
                    { version: 'v1.0', date: '2026-01-01', changes: ['Initial Release'] }
                ],
                licenses: [
                    { type: 'Personal', price: 0, features: ['Personal Use', 'Non-Commercial'] },
                    { type: 'Commercial', price: 49, features: ['Commercial Use', 'Priority Support'] }
                ]
            };
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    });
});

// --- Commerce Routes ---

app.post('/api/checkout', (req, res) => {
    const { userId, projectId, licenseType } = req.body;
    const sql = 'INSERT INTO licenses (userId, projectId, licenseType, purchaseDate) VALUES (?, ?, ?, ?)';
    const date = new Date().toISOString();

    db.run(sql, [userId, projectId, licenseType, date], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, licenseId: this.lastID });
    });
});

app.get('/api/licenses', (req, res) => {
    // Mock user ID from token
    const token = req.headers.authorization;
    if (!token) return res.json([]);
    const userId = token.replace('Bearer ', '').split('-').pop();

    const sql = `
        SELECT l.*, p.title, p.thumbnail, p.slug 
        FROM licenses l
        JOIN projects p ON l.projectId = p.id
        WHERE l.userId = ?
    `;
    db.all(sql, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

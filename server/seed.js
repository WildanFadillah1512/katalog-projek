import db from './database.js';

const projects = [
    {
        slug: 'edukasi-tata-surya',
        title: 'Edukasi Tata Surya',
        shortDescription: 'Interactive 3D solar system visualization for education.',
        fullDescription: `<h3>Tentang Proyek</h3><p>Platform pembelajaran interaktif 3D.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop',
        techStack: JSON.stringify(['Three.js', 'Vue 3', 'WebGL', 'TypeScript']),
        category: 'Education',
        accessLevel: 'premium',
        price: 49,
        demoUrl: 'https://education-tatasurya.netlify.app/',
        featured: 1,
        rating: 4.8,
        totalReviews: 124
    },
    {
        slug: 'suba-dashboard-admin',
        title: 'Suba Dashboard Admin',
        shortDescription: 'Comprehensive backend admin template with analytics.',
        fullDescription: `<h3>Enterprise Ready</h3><p>Dashboard admin backend komprehensif.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        techStack: JSON.stringify(['Vue 3', 'ApexCharts', 'Tailwind', 'TypeScript']),
        category: 'Dashboard',
        accessLevel: 'premium',
        price: 49,
        demoUrl: 'https://suba-dashboard.netlify.app/',
        featured: 1,
        rating: 4.9,
        totalReviews: 856
    },
    {
        slug: 'wildan-fadillah-portfolio',
        title: 'Wildan Fadillah Portfolio',
        shortDescription: 'Minimalist personal branding with GSAP animations.',
        fullDescription: `<h3>Personal Branding</h3><p>Landing page personal branding.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
        techStack: JSON.stringify(['HTML5', 'GSAP', 'CSS3']),
        category: 'Portfolio',
        accessLevel: 'public',
        price: 0,
        demoUrl: 'https://wildan-fadillah.netlify.app/',
        featured: 0,
        rating: 5.0,
        totalReviews: 42
    },
    {
        slug: 'referensi-suba-arch',
        title: 'Referensi Suba Arch',
        shortDescription: 'Architecture & Interior Design catalog with masonry grid.',
        fullDescription: `<h3>Visual Catalog</h3><p>Katalog visual arsitektur.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        techStack: JSON.stringify(['React', 'CSS Grid', 'Lightbox']),
        category: 'Architecture',
        accessLevel: 'premium',
        price: 49,
        demoUrl: 'https://referensi-subaarch.netlify.app/',
        featured: 1,
        rating: 4.6,
        totalReviews: 38
    }
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@smartindus.com',
        password: 'admin123', // In production, this should be hashed
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'user123',
        role: 'free'
    },
    {
        name: 'Jane Premium',
        email: 'jane@example.com',
        password: 'premium123',
        role: 'premium'
    }
];

const coupons = [
    {
        code: 'WELCOME10',
        description: 'Welcome discount for new users',
        discountType: 'percentage',
        discountValue: 10,
        minPurchaseAmount: 20,
        maxUses: 100,
        currentUses: 25,
        validFrom: new Date('2026-01-01').toISOString(),
        validUntil: new Date('2026-12-31').toISOString(),
        isActive: 1
    },
    {
        code: 'SUMMER25',
        description: 'Summer sale - 25% off on all premium projects',
        discountType: 'percentage',
        discountValue: 25,
        minPurchaseAmount: 30,
        maxUses: 50,
        currentUses: 12,
        validFrom: new Date('2026-02-01').toISOString(),
        validUntil: new Date('2026-03-31').toISOString(),
        isActive: 1
    },
    {
        code: 'FIXED15',
        description: 'Fixed $15 discount for orders above $50',
        discountType: 'fixed',
        discountValue: 15,
        minPurchaseAmount: 50,
        maxUses: null,
        currentUses: 8,
        validFrom: new Date('2026-02-01').toISOString(),
        validUntil: new Date('2026-06-30').toISOString(),
        isActive: 1
    },
    {
        code: 'EXPIRED10',
        description: 'Expired test coupon',
        discountType: 'percentage',
        discountValue: 10,
        minPurchaseAmount: 0,
        maxUses: 10,
        currentUses: 5,
        validFrom: new Date('2025-12-01').toISOString(),
        validUntil: new Date('2025-12-31').toISOString(),
        isActive: 0
    }
];

db.serialize(() => {
    console.log('Seeding database...');

    // Clear existing data
    db.run('DELETE FROM projects');
    db.run('DELETE FROM users');
    db.run('DELETE FROM coupons');
    db.run('DELETE FROM licenses');
    db.run('DELETE FROM coupon_usages');

    // Seed projects
    console.log('Seeding projects...');
    const projectStmt = db.prepare(`INSERT INTO projects (
        slug, title, shortDescription, fullDescription, thumbnail, techStack, category, accessLevel, price, demoUrl, featured, rating, totalReviews
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    projects.forEach(p => {
        projectStmt.run(
            p.slug, p.title, p.shortDescription, p.fullDescription, p.thumbnail,
            p.techStack, p.category, p.accessLevel, p.price, p.demoUrl,
            p.featured, p.rating, p.totalReviews
        );
    });
    projectStmt.finalize();

    // Seed users
    console.log('Seeding users...');
    const userStmt = db.prepare(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`);

    users.forEach(u => {
        userStmt.run(u.name, u.email, u.password, u.role);
    });
    userStmt.finalize();

    // Seed coupons
    console.log('Seeding coupons...');
    const couponStmt = db.prepare(`INSERT INTO coupons (
        code, description, discountType, discountValue, minPurchaseAmount, maxUses, currentUses, validFrom, validUntil, isActive
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    coupons.forEach(c => {
        couponStmt.run(
            c.code, c.description, c.discountType, c.discountValue,
            c.minPurchaseAmount, c.maxUses, c.currentUses, c.validFrom, c.validUntil, c.isActive
        );
    });
    couponStmt.finalize();

    console.log('Seeding complete!');
    console.log('\\nAdmin credentials:');
    console.log('Email: admin@smartindus.com');
    console.log('Password: admin123');
    console.log('\\nTest user credentials:');
    console.log('Email: john@example.com');
    console.log('Password: user123');
    console.log('\\nTest coupons:');
    coupons.forEach(c => {
        console.log(`- ${c.code}: ${c.description}`);
    });
});

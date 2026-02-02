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

db.serialize(() => {
    console.log('Seeding projects...');
    // Clear existing
    db.run('DELETE FROM projects');

    const stmt = db.prepare(`INSERT INTO projects (
        slug, title, shortDescription, fullDescription, thumbnail, techStack, category, accessLevel, price, demoUrl, featured, rating, totalReviews
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    projects.forEach(p => {
        stmt.run(
            p.slug, p.title, p.shortDescription, p.fullDescription, p.thumbnail,
            p.techStack, p.category, p.accessLevel, p.price, p.demoUrl,
            p.featured, p.rating, p.totalReviews
        );
    });

    stmt.finalize();
    console.log('Seeding complete.');
});

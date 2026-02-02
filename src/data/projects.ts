import type { IProject } from '../types';

export const projects: IProject[] = [
  {
    id: 1,
    slug: 'edukasi-tata-surya',
    title: 'Edukasi Tata Surya',
    shortDescription: 'Interactive 3D solar system visualization for education.',
    fullDescription: `<h3>Tentang Proyek</h3><p>Platform pembelajaran interaktif 3D.</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop',
    techStack: ['Three.js', 'Vue 3', 'WebGL', 'TypeScript'],
    category: 'Education',
    accessLevel: 'premium',
    demoUrl: 'https://education-tatasurya.netlify.app/',
    featured: true,
    rating: 4.8,
    totalReviews: 124,
    author: {
      id: '1',
      name: 'SmartIndus Team',
      avatar: 'https://ui-avatars.com/api/?name=SI&background=059669&color=fff',
      bio: 'Official Team',
      reputation: 98,
      totalSales: 100
    },
    reviews: [],
    changelog: [
      { version: 'v1.0', date: '2026-01-01', changes: ['Initial Release'] }
    ],
    licenses: [
      { type: 'Personal', price: 0, features: ['Personal Use', 'Non-Commercial'] },
      { type: 'Commercial', price: 49, features: ['Commercial Use', 'Priority Support'] }
    ],
    gallery: ['https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop'],
    downloads: 120,
    lastUpdated: '2026-01-15',
    relatedProjectIds: []
  },
  {
    id: 2,
    slug: 'suba-dashboard-admin',
    title: 'Suba Dashboard Admin',
    shortDescription: 'Comprehensive backend admin template with analytics.',
    fullDescription: `<h3>Enterprise Ready</h3><p>Dashboard admin backend komprehensif.</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    techStack: ['Vue 3', 'ApexCharts', 'Tailwind', 'TypeScript'],
    category: 'Dashboard',
    accessLevel: 'premium',
    demoUrl: 'https://suba-dashboard.netlify.app/',
    featured: true,
    rating: 4.9,
    totalReviews: 856,
    author: {
      id: '1',
      name: 'SmartIndus Team',
      avatar: 'https://ui-avatars.com/api/?name=SI&background=059669&color=fff',
      bio: 'Official Team',
      reputation: 98,
      totalSales: 800
    },
    reviews: [],
    changelog: [
      { version: 'v1.0', date: '2026-01-05', changes: ['Initial Release'] }
    ],
    licenses: [
      { type: 'Personal', price: 0, features: ['Personal Use'] },
      { type: 'Commercial', price: 59, features: ['Commercial Use', 'Source Code'] }
    ],
    gallery: [],
    downloads: 850,
    lastUpdated: '2026-01-20',
    relatedProjectIds: []
  },
  {
    id: 3,
    slug: 'wildan-fadillah-portfolio',
    title: 'Wildan Fadillah Portfolio',
    shortDescription: 'Minimalist personal branding with GSAP animations.',
    fullDescription: `<h3>Personal Branding</h3><p>Landing page personal branding.</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    techStack: ['HTML5', 'GSAP', 'CSS3'],
    category: 'Portfolio',
    accessLevel: 'public',
    demoUrl: 'https://wildan-fadillah.netlify.app/',
    featured: false,
    rating: 5.0,
    totalReviews: 42,
    author: {
      id: '2',
      name: 'Wildan F.',
      avatar: 'https://ui-avatars.com/api/?name=WF&background=10b981&color=fff',
      bio: 'Creative Developer',
      reputation: 95,
      totalSales: 40
    },
    reviews: [],
    changelog: [],
    licenses: [],
    gallery: [],
    downloads: 42,
    lastUpdated: '2025-12-10',
    relatedProjectIds: []
  },
  {
    id: 4,
    slug: 'referensi-suba-arch',
    title: 'Referensi Suba Arch',
    shortDescription: 'Architecture & Interior Design catalog with masonry grid.',
    fullDescription: `<h3>Visual Catalog</h3><p>Katalog visual arsitektur.</p>`,
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    techStack: ['React', 'CSS Grid', 'Lightbox'],
    category: 'Architecture',
    accessLevel: 'premium',
    demoUrl: 'https://referensi-subaarch.netlify.app/',
    featured: true,
    rating: 4.6,
    totalReviews: 38,
    author: {
      id: '1',
      name: 'SmartIndus Team',
      avatar: 'https://ui-avatars.com/api/?name=SI&background=059669&color=fff',
      bio: 'Official Team',
      reputation: 98,
      totalSales: 40
    },
    reviews: [],
    changelog: [],
    licenses: [
      { type: 'Commercial', price: 39, features: ['Commercial Use'] }
    ],
    gallery: [],
    downloads: 38,
    lastUpdated: '2026-01-12',
    relatedProjectIds: []
  }
];

// Type Definitions

export type AccessLevel = 'public' | 'premium';
export type UserRole = 'free' | 'premium';
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Author {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    reputation: number; // 0-100
    totalSales: number;
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number; // 1-5
    content: string;
    date: string;
    verifiedPurchase: boolean;
}

export interface VersionLog {
    version: string;
    date: string;
    changes: string[];
}

export interface License {
    type: 'Personal' | 'Commercial' | 'Extended';
    price: number; // 0 if free
    features: string[];
}

export interface IProject {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    thumbnail: string;
    gallery: string[];
    techStack: string[];
    category: string;
    accessLevel: AccessLevel;
    demoUrl: string;
    featured?: boolean;

    // New "Complete Catalog" Features
    author?: Author;
    reviews?: Review[];
    rating?: number; // Average rating
    totalReviews?: number;
    changelog?: VersionLog[];
    licenses?: License[];
    downloads?: number;
    lastUpdated?: string;
    relatedProjectIds?: number[];
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    purchasedProjectIds?: number[];
}

export interface AuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface ProjectFilters {
    category?: string;
    techStack?: string;
    accessLevel?: AccessLevel;
    searchQuery?: string;
}

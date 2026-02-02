import type { LoginCredentials, RegisterData, IUser } from '../types';

interface AuthResponse {
    user: IUser;
    token: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');

        return data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Registration failed');

        return result;
    },

    async logout(): Promise<void> {
        // No server-side session to destroy in JWT-less mock, just client-side
        return;
    },

    async checkAuth(token: string): Promise<IUser> {
        const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) throw new Error('Invalid token');

        return data.user;
    },
};

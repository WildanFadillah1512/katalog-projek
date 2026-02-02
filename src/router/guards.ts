import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

export function setupGuards() {
    return {
        beforeEach: (
            to: RouteLocationNormalized,
            _from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            const authStore = useAuthStore();

            // Check if route requires authentication
            if (to.meta.requiresAuth && !authStore.isAuthenticated) {
                // Redirect to login, save intended destination
                next({
                    name: 'login',
                    query: { redirect: to.fullPath },
                });
                return;
            }

            // If user is authenticated and tries to access login/register, redirect to home
            if (to.meta.guestOnly && authStore.isAuthenticated) {
                next({ name: 'home' });
                return;
            }

            // Check premium access if required
            if (to.meta.requiresPremium && !authStore.isPremium) {
                next({ name: 'pricing' });
                return;
            }

            next();
        },
    };
}

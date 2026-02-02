import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

export function setupGuards() {
 return {
  beforeEach: (
   to: RouteLocationNormalized,
   _from: RouteLocationNormalized,
   next: NavigationGuardNext,
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

   // Check if route requires admin access
   if (to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated) {
     next({
      name: 'login',
      query: { redirect: to.fullPath },
     });
     return;
    } else if (!authStore.isAdmin) {
     // Redirect non-admin users to home
     next({ name: 'home' });
     return;
    }
   }

   // If user is authenticated and tries to access login/register, redirect appropriately
   if (to.meta.guestOnly && authStore.isAuthenticated) {
    // Redirect admin users to admin dashboard, regular users to home
    next({ name: authStore.isAdmin ? 'admin-dashboard' : 'home' });
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

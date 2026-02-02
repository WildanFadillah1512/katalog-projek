import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';

export function useAuth() {
    const authStore = useAuthStore();
    const { user, isAuthenticated, isPremium, isFree } = storeToRefs(authStore);

    return {
        // Reactive state
        user,
        isAuthenticated,
        isPremium,
        isFree,
        // Actions
        login: authStore.login,
        register: authStore.register,
        logout: authStore.logout,
        checkAuth: authStore.checkAuth,
        hasAccess: authStore.hasAccess,
    };
}

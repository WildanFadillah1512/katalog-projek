import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IUser, LoginCredentials, RegisterData } from '../types';
import { authService } from '../services/authService';

export const useAuthStore = defineStore(
 'auth',
 () => {
  // State
  const user = ref<IUser | null>(null);
  const token = ref<string | null>(null);
  const purchasedProjects = ref<string[]>([]);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isPremium = computed(() => user.value?.role === 'premium');
  const isFree = computed(() => user.value?.role === 'free');
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Helper Action: Check Access
  function hasAccess(
   requiredLevel: 'public' | 'premium',
   projectId?: string,
  ): boolean {
   // Public projects are accessible to everyone
   if (requiredLevel === 'public') return true;

   // Premium users have access to everything
   if (isPremium.value) return true;

   // If user purchased this specific project
   if (projectId && purchasedProjects.value.includes(projectId)) return true;

   return false;
  }

  // Actions
  async function login(credentials: LoginCredentials) {
   try {
    const response = await authService.login(credentials);
    user.value = response.user;
    token.value = response.token;
    localStorage.setItem('auth-token', response.token);
    return response;
   } catch (error) {
    throw error;
   }
  }

  async function register(data: RegisterData) {
   try {
    const response = await authService.register(data);
    user.value = response.user;
    token.value = response.token;
    localStorage.setItem('auth-token', response.token);
    return response;
   } catch (error) {
    throw error;
   }
  }

  async function logout() {
   try {
    await authService.logout();
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth-token');
   } catch (error) {
    // Even if logout fails, clear local state
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth-token');
    throw error;
   }
  }

  async function checkAuth() {
   if (!token.value) {
    return false;
   }

   try {
    const userData = await authService.checkAuth(token.value);
    user.value = userData;
    return true;
   } catch (error) {
    // Token invalid, clear state
    user.value = null;
    token.value = null;
    return false;
   }
  }

  async function purchaseProject(projectId: string) {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 1500));
   if (!purchasedProjects.value.includes(projectId)) {
    purchasedProjects.value.push(projectId);
   }
   return true;
  }

  // Initialize token from localStorage
  function initAuth() {
   const storedToken = localStorage.getItem('auth-token');
   if (storedToken) {
    token.value = storedToken;
   }
  }

  // Initialize on store creation
  initAuth();

  return {
   // State
   user,
   token,
   purchasedProjects,
   // Getters
   isAuthenticated,
   isPremium,
   isFree,
   isAdmin,
   // Actions
   login,
   register,
   logout,
   checkAuth,
   hasAccess,
   purchaseProject,
  };
 },
 {
  persist: true,
 },
);

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Menu as MenuIcon, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-vue-next';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';

const { isAuthenticated, user, logout } = useAuth();
const router = useRouter();
const { success } = useToast();

const mobileMenuOpen = ref(false);

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
];

const getAvatar = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`;
};

const logoutAndRedirect = async () => {
  await logout();
  router.push('/auth/login');
  success('Logged out successfully');
};
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[#064e3b] text-white border-b border-primary-500/30 shadow-lg shadow-green-900/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
             <img src="/logo.jpeg" alt="Smart Indus" class="w-full h-full object-cover" />
          </div>
          <span class="text-xl font-bold font-display tracking-tight text-white group-hover:text-green-100 transition-colors">
            Smart Indus tree
          </span>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            class="text-sm font-medium text-green-100 hover:text-white transition-colors relative group"
            active-class="text-white font-bold"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
          </RouterLink>

          <!-- Auth Actions -->
          <template v-if="!isAuthenticated">
            <div class="flex items-center space-x-4 border-l border-white/10 pl-6">
              <RouterLink to="/auth/login" class="text-sm font-bold text-green-100 hover:text-white transition-colors">
                Login
              </RouterLink>
              <RouterLink to="/auth/register" class="px-5 py-2 bg-white text-primary-900 text-sm font-bold rounded-lg hover:bg-green-50 transition-colors shadow-lg">
                Get Started
              </RouterLink>
            </div>
          </template>

          <template v-else>
             <Menu as="div" class="relative pl-6 border-l border-white/10">
                <MenuButton class="flex items-center gap-3 hover:opacity-90 transition-opacity">
                  <div class="text-right hidden lg:block">
                    <p class="text-sm font-bold text-white leading-none">{{ user?.name }}</p>
                    <p class="text-[10px] text-green-200 mt-1 uppercase tracking-wide font-bold">{{ user?.role || 'Free' }}</p>
                  </div>
                  <img 
                    :src="getAvatar(user?.name || 'User')" 
                    class="w-9 h-9 rounded-full border-2 border-white/20" 
                  />
                  <ChevronDown class="text-green-200 w-4 h-4" />
                </MenuButton>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems class="absolute right-0 mt-4 w-56 origin-top-right bg-white rounded-xl shadow-xl ring-1 ring-black/5 focus:outline-none p-2 z-50">
                    <MenuItem v-slot="{ active }">
                      <RouterLink to="/dashboard" :class="[active ? 'bg-green-50 text-emerald-700' : 'text-slate-700', 'group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-bold transition-colors']">
                        <LayoutDashboard class="w-4 h-4 mr-2 text-slate-400 group-hover:text-emerald-600" /> Dashboard
                      </RouterLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                       <button @click="logoutAndRedirect" :class="[active ? 'bg-red-50 text-red-700' : 'text-slate-600', 'group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-bold transition-colors']">
                        <LogOut class="w-4 h-4 mr-2 opacity-70 group-hover:text-red-500" /> Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
             </Menu>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-green-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-white/10 bg-[#064e3b]">
        <div class="px-4 py-6 space-y-4">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="block text-lg font-medium text-white hover:text-green-200"
          >
            {{ item.name }}
          </RouterLink>
          
          <div class="pt-6 border-t border-white/10">
             <template v-if="!isAuthenticated">
                <RouterLink to="/auth/login" class="block w-full py-3 text-center text-white font-bold mb-3 border border-white/20 rounded-xl hover:bg-white/5">Login</RouterLink>
                <RouterLink to="/auth/register" class="block w-full py-3 text-center bg-white text-primary-900 font-bold rounded-xl shadow-lg">Get Started</RouterLink>
             </template>
             <template v-else>
               <RouterLink to="/dashboard" class="block w-full py-3 text-center text-white font-bold mb-3 bg-white/10 rounded-xl">Dashboard</RouterLink>
               <button @click="logoutAndRedirect" class="block w-full py-3 text-center text-red-200 font-bold hover:bg-white/5 rounded-xl">Sign Out</button>
             </template>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

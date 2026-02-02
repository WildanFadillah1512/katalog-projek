<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const { success, error } = useToast();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    await login({ email: email.value, password: password.value });
    success('Welcome back!');
    const redirectPath = route.query.redirect as string;
    router.push(redirectPath || '/');
  } catch (e: any) {
    error(e.message || 'Login failed');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleLogin">
    <div class="mb-4">
      <h3 class="text-2xl font-bold text-slate-900">Sign In</h3>
      <p class="text-slate-500">Welcome back, please enter your details.</p>
    </div>

    <div>
      <label for="email" class="block text-sm font-bold text-slate-700 mb-1">Email address</label>
      <input 
        id="email" 
        name="email" 
        type="email" 
        v-model="email"
        required 
        class="input-field"
        placeholder="name@company.com"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-bold text-slate-700 mb-1">Password</label>
      <input 
        id="password" 
        name="password" 
        type="password" 
        v-model="password"
        required 
        class="input-field"
        placeholder="••••••••"
      />
    </div>

    <div>
      <button 
        type="submit" 
        :disabled="isLoading"
        class="btn btn-primary w-full py-3.5"
      >
        <span v-if="isLoading">Authenticating...</span>
        <span v-else>Sign In</span>
      </button>
    </div>

    <div class="text-center text-sm">
       <span class="text-slate-500">Don't have an account?</span>
       <RouterLink to="/auth/register" class="font-bold text-primary-600 hover:text-primary-700 ml-1"> Create Account</RouterLink>
    </div>
  </form>
</template>

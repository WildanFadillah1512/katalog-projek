<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import { useToast } from '../../composables/useToast';

const router = useRouter();
const { register } = useAuth();
const { success, error } = useToast();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error('Passwords do not match');
    return;
  }

  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    await register({
        name: name.value,
        email: email.value,
        password: password.value
    });
  
    success('Account Created Successfully');
    router.push('/');
  } catch (e: any) {
    error(e.message || 'Registration failed');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleRegister">
    <div class="mb-4">
      <h3 class="text-2xl font-bold text-slate-900">Create Account</h3>
      <p class="text-slate-500">Start your industrial journey.</p>
    </div>

    <div>
      <label class="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
      <input 
        v-model="name"
        type="text" 
        required 
        class="input-field"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label class="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
      <input 
        v-model="email"
        type="email" 
        required 
        class="input-field"
        placeholder="name@company.com"
      />
    </div>

    <div>
      <label class="block text-sm font-bold text-slate-700 mb-1">Password</label>
      <input 
        v-model="password"
        type="password" 
        required 
        class="input-field"
        placeholder="••••••••"
      />
    </div>

    <div>
      <label class="block text-sm font-bold text-slate-700 mb-1">Confirm Password</label>
      <input 
        v-model="confirmPassword"
        type="password" 
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
        <span v-if="isLoading">Creating account...</span>
        <span v-else>Register</span>
      </button>
    </div>

    <div class="text-center text-sm">
       <span class="text-slate-500">Already registered?</span>
       <RouterLink to="/auth/login" class="font-bold text-primary-600 hover:text-primary-700 ml-1"> Login</RouterLink>
    </div>
  </form>
</template>

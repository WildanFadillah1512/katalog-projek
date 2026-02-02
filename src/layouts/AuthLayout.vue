<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Green Header Background -->
    <div class="absolute top-0 left-0 w-full h-1/2 bg-[#064e3b]"></div>
    
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]"></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-block bg-white p-3 rounded-2xl shadow-lg mb-6">
           <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg"></div>
        </RouterLink>
        <h2 class="text-3xl font-bold tracking-tight text-white font-display">
          Smart Indus tree
        </h2>
        <p class="text-primary-200 mt-2">Access your industrial ecosystem</p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white py-10 px-8 shadow-2xl rounded-3xl border border-slate-100">
        <slot />
      </div>
       <p class="text-center text-slate-500 text-xs mt-8">
        &copy; 2026 Smart Indus tree. Secure Access.
      </p>
    </div>
  </div>
</template>

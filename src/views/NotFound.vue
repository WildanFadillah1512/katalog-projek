<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Home } from 'lucide-vue-next';

const router = useRouter();
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <div class="text-6xl mb-8">🔍</div>
      </div>

      <!-- Message -->
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p class="text-xl text-gray-600 mb-8 max-w-md mx-auto">
        Oops! Halaman yang Anda cari tidak ditemukan. Mungkin halaman sudah dipindahkan atau dihapus.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="router.back()"
          class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
        <button
          @click="router.push('/')"
          class="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow inline-flex items-center gap-2 justify-center"
        >
          <Home :size="20" />
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github, Twitter, Linkedin } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl overflow-hidden">
               <img src="/logo.jpeg" alt="Smart Indus tree Logo" class="w-full h-full object-cover">
            </div>
            <span class="text-xl font-bold text-white font-display">Smart Indus tree</span>
          </div>
          <p class="text-sm text-gray-400">
            Platform katalog inovasi teknologi industri dan alam. Menghubungkan masa depan dengan keberlanjutan.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/" class="hover:text-primary-400 transition-colors">Home</a></li>
            <li><a href="/explore" class="hover:text-primary-400 transition-colors">Explore Projects</a></li>
            <li><a href="/pricing" class="hover:text-primary-400 transition-colors">Pricing</a></li>
            <li><a href="/about" class="hover:text-primary-400 transition-colors">About Us</a></li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-white font-semibold mb-4">Connect With Us</h3>
          <div class="flex gap-4">
            <a href="#" class="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors">
              <Github :size="20" />
            </a>
            <a href="#" class="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors">
              <Twitter :size="20" />
            </a>
            <a href="#" class="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors">
              <Linkedin :size="20" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} SaaS Katalog. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

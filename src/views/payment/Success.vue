<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Check, ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-[#022c22] flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full text-center">
       <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-bounce-slow">
         <Check class="text-white w-12 h-12 stroke-[4]" />
       </div>

       <h1 class="text-4xl font-bold text-white mb-4 font-display">Payment Successful!</h1>
       <p class="text-gray-400 text-lg mb-8">
         Thank you for your purchase. Your license has been activated and added to your secure dashboard.
       </p>

       <div class="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-md">
         <div class="flex justify-between text-sm mb-2">
           <span class="text-gray-400">Transaction ID</span>
           <span class="text-white font-mono">TX-{{ Math.floor(Math.random() * 1000000) }}</span>
         </div>
         <div class="flex justify-between text-sm">
           <span class="text-gray-400">Date</span>
           <span class="text-white">{{ new Date().toLocaleDateString() }}</span>
         </div>
       </div>

       <div class="space-y-4">
         <RouterLink 
           to="/dashboard" 
           class="block w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center gap-2"
          >
           Go to Dashboard <ArrowRight :size="20" />
         </RouterLink>
         
         <RouterLink 
           to="/" 
           class="block w-full py-4 bg-transparent text-gray-400 hover:text-white font-medium transition-colors"
          >
           Return Home
         </RouterLink>
       </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>

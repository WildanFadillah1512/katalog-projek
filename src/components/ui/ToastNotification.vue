<script setup lang="ts">

import { X } from 'lucide-vue-next';
import { useToast } from '../../composables/useToast';
import type { ToastType } from '../../types';

const { toasts, remove } = useToast();

const getToastClasses = (type: ToastType) => {
  const base = 'flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all';
  
  const variants = {
    success: 'bg-green-50/90 border-green-200 text-green-800',
    error: 'bg-red-50/90 border-red-200 text-red-800',
    warning: 'bg-yellow-50/90 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50/90 border-blue-200 text-blue-800',
  };

  return `${base} ${variants[type]}`;
};

const getIconClasses = (type: ToastType) => {
  const variants = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  return variants[type];
};
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-md">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="getToastClasses(toast.type)"
      >
        <div class="flex-1">
          <p class="font-medium">{{ toast.message }}</p>
        </div>
        <button
          @click="remove(toast.id)"
          class="p-1 hover:bg-black/5 rounded transition-colors"
          :class="getIconClasses(toast.type)"
        >
          <X :size="18" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>

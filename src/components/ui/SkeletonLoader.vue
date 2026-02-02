<script setup lang="ts">
interface Props {
  variant?: 'card' | 'text' | 'image' | 'avatar';
  count?: number;
  height?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'card',
  count: 1,
  height: '200px',
});
</script>

<template>
  <div v-if="variant === 'card'" class="space-y-3">
    <div v-for="i in count" :key="i" class="animate-pulse">
      <div class="bg-gray-200 dark:bg-gray-700 rounded-lg" :style="{ height }">
        <div class="p-6 space-y-3">
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="variant === 'text'" class="animate-pulse space-y-3">
    <div v-for="i in count" :key="i" class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
  </div>

  <div v-else-if="variant === 'image'" class="animate-pulse">
    <div v-for="i in count" :key="i" class="bg-gray-200 dark:bg-gray-700 rounded" :style="{ height }"></div>
  </div>

  <div v-else-if="variant === 'avatar'" class="animate-pulse">
    <div v-for="i in count" :key="i" class="bg-gray-200 dark:bg-gray-700 rounded-full" :style="{ width: height, height }"></div>
  </div>
</template>

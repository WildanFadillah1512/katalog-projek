<script setup lang="ts">
import { Star } from 'lucide-vue-next';

interface Props {
  rating: number;
  size?: number;
  interactive?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 16,
  interactive: false,
});
</script>

<template>
  <div class="flex items-center gap-0.5">
    <template v-for="i in 5" :key="i">
      <!-- Full Star -->
      <Star
        v-if="rating >= i"
        :size="size"
        class="fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
      />
      <!-- Half Star -->
      <div v-else-if="rating >= i - 0.5" class="relative">
        <Star :size="size" class="text-gray-600" />
        <div class="absolute inset-0 overflow-hidden w-1/2">
           <Star :size="size" class="fill-yellow-400 text-yellow-400" />
        </div>
      </div>
      <!-- Empty Star -->
      <Star
        v-else
        :size="size"
        class="text-gray-600"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Activity, Shield } from 'lucide-vue-next';
import type { IProject } from '../../types';
import RatingStars from '../ui/RatingStars.vue';

interface Props {
  project: IProject;
}

defineProps<Props>();
</script>

<template>
  <RouterLink 
    :to="{ name: 'project-detail', params: { slug: project.slug } }"
    class="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover flex flex-col h-full"
  >
    <!-- Thumbnail Area -->
    <div class="relative aspect-video overflow-hidden bg-slate-50">
      <img 
        :src="project.thumbnail" 
        :alt="project.title"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      <!-- Badges -->
      <div class="absolute top-3 right-3 z-20 flex flex-col gap-2">
         <span 
          v-if="project.accessLevel === 'premium'"
          class="px-3 py-1 bg-white/95 backdrop-blur text-amber-600 text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-sm border border-amber-100"
        >
          PREMIUM
        </span>
        <span 
          v-else
          class="px-3 py-1 bg-white/95 backdrop-blur text-emerald-600 text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-sm border border-emerald-100"
        >
          OPEN
        </span>
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Category & Rating -->
      <div class="flex justify-between items-center mb-3">
        <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">
          {{ project.category }}
        </span>
        <RatingStars v-if="project.rating" :rating="project.rating" :size="12" />
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-brand mb-2 font-display group-hover:text-primary-600 transition-colors">
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed group-hover:text-slate-800 transition-colors">
        {{ project.shortDescription }}
      </p>

      <!-- Meta Data (Spacer) -->
      <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
         <div class="flex items-center gap-1">
           <Shield :size="12" />
           {{ project.licenses?.length || 0 }} LICENSES
         </div>
         <div class="flex items-center gap-1">
           <Activity :size="12" />
           v{{ project.changelog?.[0]?.version || '1.0' }}
         </div>
      </div>
    </div>
  </RouterLink>
</template>

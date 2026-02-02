<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { ArrowRight, Code, Zap, Layers } from 'lucide-vue-next';
import ProjectCard from '../components/features/ProjectCard.vue';
import SkeletonLoader from '../components/ui/SkeletonLoader.vue';
import { useParallax } from '@vueuse/core';
import type { IProject } from '../types';
import { projectService } from '../services/projectService';

const loading = ref(true);
const featuredProjects = ref<IProject[]>([]);
const target = ref(null);
const { tilt, roll } = useParallax(target);

onMounted(async () => {
    try {
        featuredProjects.value = await projectService.getFeaturedProjects(3);
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
});

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Architecture that is easy to read, maintain, and scale.',
    bg: 'bg-green-50 text-green-600'
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed with best practices built-in.',
    bg: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: Layers,
    title: 'Modular Design',
    description: 'Components that fit together perfectly for any project.',
    bg: 'bg-teal-50 text-teal-600'
  },
];
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section (Green Background) -->
    <section class="relative bg-[#064e3b] overflow-hidden pt-32 pb-48 sm:pt-40 sm:pb-56">
      <!-- Background Shapes -->
      <div class="absolute inset-0">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-in-up">
           <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
           <span class="text-green-100 text-sm font-medium tracking-wide">Version 3.0 Available</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-display tracking-tight leading-tight max-w-4xl mx-auto">
          Build faster with <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
             Smart Indus tree
          </span>
        </h1>
        
        <p class="text-xl text-green-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Premium Vue.js templates engineered for growth. Simple, robust, and beautiful.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink
            to="/explore"
            class="px-8 py-4 bg-white text-primary-900 rounded-xl font-bold text-lg hover:bg-green-50 transition-all hover:-translate-y-1 shadow-xl shadow-green-900/20 flex items-center justify-center gap-2"
          >
            Explore Catalog
            <ArrowRight :size="20" />
          </RouterLink>
          <RouterLink
            to="/pricing"
            class="px-8 py-4 bg-primary-700/50 text-white border border-primary-500/30 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all backdrop-blur-sm"
          >
            View Pricing
          </RouterLink>
        </div>
        
        <!-- Dashboard Preview -->
        <div class="mt-20 relative max-w-5xl mx-auto hidden lg:block" ref="target">
           <div 
             class="relative rounded-2xl bg-slate-50 shadow-2xl overflow-hidden border-4 border-white/10"
             :style="{ transform: `rotateX(${roll * 5}deg) rotateY(${tilt * 5}deg)` }"
           >
              <!-- Mock Header -->
              <div class="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
                 <div class="flex items-center gap-4">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">S</div>
                    <div class="h-4 w-32 bg-slate-100 rounded-full"></div>
                 </div>
                 <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-slate-100"></div>
                 </div>
              </div>

              <!-- Mock Body -->
              <div class="p-8 flex gap-8">
                 <!-- Sidebar -->
                 <div class="w-64 space-y-4">
                     <div class="h-10 w-full bg-green-50 border border-green-100 rounded-lg"></div>
                     <div class="h-10 w-full bg-white border border-slate-100 rounded-lg"></div>
                     <div class="h-10 w-full bg-white border border-slate-100 rounded-lg"></div>
                 </div>
                 
                 <!-- Content -->
                 <div class="flex-1 space-y-6">
                    <div class="flex gap-6">
                       <div class="flex-1 h-32 bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden group">
                          <div class="absolute bottom-0 left-0 w-full h-1 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          <div class="h-4 w-20 bg-slate-100 rounded mb-2"></div>
                          <div class="h-8 w-32 bg-slate-200 rounded"></div>
                       </div>
                       <div class="flex-1 h-32 bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden group">
                           <div class="absolute bottom-0 left-0 w-full h-1 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          <div class="h-4 w-20 bg-slate-100 rounded mb-2"></div>
                          <div class="h-8 w-32 bg-slate-200 rounded"></div>
                       </div>
                    </div>
                    <div class="h-64 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                        <div class="flex items-end gap-2 h-full pb-4">
                           <div class="w-full bg-green-500/20 h-[40%] rounded-t"></div>
                           <div class="w-full bg-green-500/40 h-[70%] rounded-t"></div>
                           <div class="w-full bg-green-500/60 h-[50%] rounded-t"></div>
                           <div class="w-full bg-green-500/80 h-[90%] rounded-t"></div>
                           <div class="w-full bg-green-500 h-[60%] rounded-t"></div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Features Section (White) -->
    <section class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
           <h2 class="text-3xl font-bold text-slate-900 mb-4 font-display">Why Choose Us?</h2>
           <p class="text-slate-500 max-w-2xl mx-auto">We focus on the details so you don't have to.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
           <div v-for="feat in features" :key="feat.title" class="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 group">
              <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', feat.bg]">
                 <component :is="feat.icon" :size="28" />
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">{{ feat.title }}</h3>
              <p class="text-slate-500 leading-relaxed">{{ feat.description }}</p>
           </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects (White with Gray Contrast) -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
           <div>
             <h2 class="text-3xl font-bold text-slate-900 mb-2 font-display">Featured Projects</h2>
             <p class="text-slate-500">Hand-picked for you.</p>
           </div>
           <RouterLink to="/explore" class="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-2">
             View All <ArrowRight :size="20" />
           </RouterLink>
        </div>

        <div v-if="loading" class="grid md:grid-cols-3 gap-8">
           <SkeletonLoader variant="card" :count="3" height="380px" />
        </div>
        <div v-else class="grid md:grid-cols-3 gap-8">
           <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

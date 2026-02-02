<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import { Search, Filter } from 'lucide-vue-next';
import ProjectCard from '../components/features/ProjectCard.vue';
import SkeletonLoader from '../components/ui/SkeletonLoader.vue';
import { projectService } from '../services/projectService';
import type { IProject } from '../types';
import gsap from 'gsap';

const projects = ref<IProject[]>([]);
const loading = ref(true);

const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedTechStack = ref('all');
const selectedAccessLevel = ref('');
const showFilters = ref(false);

const breakpoints = useBreakpoints(breakpointsTailwind);
const md = breakpoints.greater('md');

const categories = ref<string[]>([]);
const techStacks = ref<string[]>([]);

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          project.techStack.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    const matchesCategory = selectedCategory.value === 'all' || project.category === selectedCategory.value;
    const matchesTech = selectedTechStack.value === 'all' || (project.techStack && project.techStack.includes(selectedTechStack.value));
    const matchesAccess = selectedAccessLevel.value === '' || project.accessLevel === selectedAccessLevel.value;
    
    return matchesSearch && matchesCategory && matchesTech && matchesAccess;
  });
});

onMounted(async () => {
  try {
      const [allProjects, allCats, allTech] = await Promise.all([
          projectService.getProjects(),
          projectService.getCategories(),
          projectService.getTechStacks()
      ]);
      projects.value = allProjects;
      categories.value = allCats;
      techStacks.value = allTech;
  } catch (e) {
      console.error(e);
  } finally {
      loading.value = false;
      setTimeout(() => {
        gsap.from('.project-item', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }, 100);
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-10 text-center max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold text-slate-900 mb-3 font-display">Explore Catalog</h1>
        <p class="text-slate-500">Discover premium industrial-grade templates.</p>
      </div>

      <!-- Search & Filters -->
      <div class="bg-white border border-slate-200 rounded-2xl p-6 mb-12 shadow-sm sticky top-24 z-30">
        <!-- Search Bar -->
        <div class="relative mb-6">
          <Search :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search ecosystem..."
            class="input-field pl-12"
          />
        </div>

        <!-- Mobile Filter Toggle -->
        <div class="md:hidden mb-4">
          <button 
            @click="showFilters = !showFilters"
            class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors"
          >
            <Filter :size="16" />
            {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
          </button>
        </div>

        <!-- Filters -->
        <div v-show="showFilters || md" class="grid grid-cols-1 md:grid-cols-3 gap-4" :class="{ 'hidden md:grid': !showFilters }">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Category</label>
            <select
              v-model="selectedCategory"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat === 'all' ? 'All Categories' : cat }}
              </option>
            </select>
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tech Stack</label>
            <select
              v-model="selectedTechStack"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option v-for="tech in techStacks" :key="tech" :value="tech">
                {{ tech === 'all' ? 'All Technologies' : tech }}
              </option>
            </select>
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Access</label>
            <select
              v-model="selectedAccessLevel"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="">All Access Levels</option>
              <option value="public">Open Access</option>
              <option value="premium">Premium Only</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6 flex justify-between items-center text-sm font-medium text-slate-500">
        <p>
          Showing <span class="text-slate-900 font-bold">{{ filteredProjects.length }}</span> results
        </p>
      </div>

      <!-- Projects Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkeletonLoader variant="card" :count="6" height="400px" />
      </div>

      <div v-else-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id" class="project-item h-full">
           <ProjectCard :project="project" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Filter class="text-slate-400" :size="32" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
        <p class="text-slate-500 mb-6">Try adjusting your filters.</p>
        <button
          @click="() => { searchQuery = ''; selectedCategory = 'all'; selectedTechStack = 'all'; selectedAccessLevel = ''; }"
          class="btn btn-primary px-6 py-3"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

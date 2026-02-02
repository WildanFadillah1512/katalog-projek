<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronRight, ExternalLink, Lock, Terminal, Activity, User } from 'lucide-vue-next';
import { projectService } from '../services/projectService';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';
import UpgradeModal from '../components/features/UpgradeModal.vue';
import LicenseSelector from '../components/features/LicenseSelector.vue';
import RatingStars from '../components/ui/RatingStars.vue';
import type { License, IProject } from '../types';

const route = useRoute();
const router = useRouter();
const { isAuthenticated, hasAccess } = useAuth();
const { info } = useToast();

const project = ref<IProject | undefined>(undefined);
const selectedLicense = ref<License | undefined>(undefined);
const showUpgradeModal = ref(false);
const activeTab = ref('overview');

onMounted(async () => {
  try {
      const slug = route.params.slug as string;
      const data = await projectService.getProjectBySlug(slug);
      if (data) {
          project.value = data;
          selectedLicense.value = data.licenses?.[0]; 
      } else {
          router.push('/404');
      }
  } catch (e) {
      console.error(e);
      router.push('/404');
  }
});

const handleAccess = () => {
  if (!project.value) return;
  if (!isAuthenticated.value) {
    info('Access restricted. Initializing login sequence...');
    router.push({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }
  if (hasAccess(project.value.accessLevel)) {
    window.open(project.value.demoUrl, '_blank');
  } else {
    showUpgradeModal.value = true;
  }
};
</script>

<template>
  <div v-if="project" class="min-h-screen bg-white text-slate-900 pb-20">
    
    <!-- Top Decoration -->
    <div class="h-1 w-full bg-gradient-to-r from-green-600 via-primary-500 to-emerald-400"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs font-bold text-slate-500 mb-8 uppercase tracking-wider">
        <RouterLink to="/" class="hover:text-primary-600 transition-colors">ROOT</RouterLink>
        <ChevronRight :size="12" />
        <RouterLink to="/explore" class="hover:text-primary-600 transition-colors">ECOSYSTEM</RouterLink>
        <ChevronRight :size="12" />
        <span class="text-primary-600">{{ project.slug }}</span>
      </nav>

      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12">
        
        <!-- LEFT COLUMN: Control Panel -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Thumbnail -->
          <div class="rounded-xl overflow-hidden border border-slate-200 shadow-xl relative group">
            <img :src="project.thumbnail" class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute bottom-4 left-4">
              <span class="px-2 py-1 bg-white/90 backdrop-blur text-xs font-mono border border-slate-200 rounded text-slate-700 shadow-sm">
                ID: {{ project.id.toString().padStart(4, '0') }}
              </span>
            </div>
          </div>

          <!-- License Selector -->
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select License</h3>
            <LicenseSelector 
              :licenses="project.licenses || []" 
              v-model="selectedLicense" 
            />
          </div>

          <!-- Action Button -->
          <button
            @click="handleAccess"
            class="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
          >
            <template v-if="!isAuthenticated">
              <Lock :size="18" />
              <span>LOGIN TO ACCESS</span>
            </template>
            <template v-else-if="hasAccess(project.accessLevel)">
              <ExternalLink :size="18" />
              <span>LAUNCH PROJECT</span>
            </template>
            <template v-else>
              <Lock :size="18" />
              <span>UPGRADE NOW</span>
            </template>
            <div class="w-1 h-1 bg-white rounded-full animate-ping ml-2"></div>
          </button>
        </div>

        <!-- CENTER COLUMN: Main Inteface -->
        <div class="lg:col-span-6 space-y-8">
          <!-- Header -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100 uppercase tracking-wider">
                {{ project.category }}
              </span>
              <div v-if="project.featured" class="flex items-center gap-1 text-amber-500 text-xs font-bold">
                 <Activity :size="14" /> HIGH TRAFFIC
              </div>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">{{ project.title }}</h1>
            <p class="text-lg text-slate-600 leading-relaxed border-l-4 border-primary-500 pl-6">
              {{ project.shortDescription }}
            </p>
          </div>

          <!-- Tabs -->
          <div class="border-b border-slate-200 flex gap-8 text-sm font-bold">
            <button 
              @click="activeTab = 'overview'" 
              :class="['pb-4 transition-colors uppercase tracking-wide', activeTab === 'overview' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600']"
            >Overview</button>
            <button 
              @click="activeTab = 'reviews'" 
              :class="['pb-4 transition-colors uppercase tracking-wide', activeTab === 'reviews' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600']"
            >Reviews ({{ project.totalReviews }})</button>
            <button 
              @click="activeTab = 'gallery'" 
              :class="['pb-4 transition-colors uppercase tracking-wide', activeTab === 'gallery' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600']"
            >Gallery</button>
          </div>

          <!-- Content Area -->
          <div class="min-h-[300px]">
            <div v-if="activeTab === 'overview'" class="prose prose-slate max-w-none">
              <div v-html="project.fullDescription"></div>
            </div>

            <div v-else-if="activeTab === 'reviews'" class="space-y-4">
              <div v-for="review in (project.reviews || [])" :key="review.id" class="p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                      {{ review.userName.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">{{ review.userName }}</p>
                      <p class="text-xs text-slate-500">{{ review.date }}</p>
                    </div>
                  </div>
                  <RatingStars :rating="review.rating" :size="14" />
                </div>
                <p class="text-slate-600 text-sm leading-relaxed">{{ review.content }}</p>
              </div>
              <div v-if="!project.reviews || project.reviews.length === 0" class="text-center py-12 text-slate-400 italic bg-slate-50 rounded-xl">
                No reviews yet.
              </div>
            </div>
            
            <div v-else-if="activeTab === 'gallery'" class="grid grid-cols-1 gap-6">
               <img v-for="img in (project.gallery || [])" :key="img" :src="img" class="rounded-xl border border-slate-200 shadow-md" />
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Metadata -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Author Profile -->
          <div v-if="project.author" class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <User :size="14" /> Architect
            </h3>
            <div class="flex items-center gap-4 mb-4">
              <img :src="project.author.avatar" class="w-12 h-12 rounded-lg border border-slate-200" />
              <div>
                <p class="font-bold text-slate-900 text-sm">{{ project.author.name }}</p>
                <div class="flex items-center gap-1 text-xs text-primary-600 font-bold">
                  <Activity :size="12" /> {{ project.author.reputation }}% REP
                </div>
              </div>
            </div>
            <p class="text-xs text-slate-500 mb-4">{{ project.author.bio }}</p>
            <div class="text-xs font-bold bg-slate-100 p-2 rounded text-slate-600 text-center uppercase tracking-wide">
              {{ project.author.totalSales }} SALES
            </div>
          </div>

          <!-- Tech Specs -->
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Terminal :size="14" /> Tech Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.techStack" :key="tech" class="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded shadow-sm">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Changelog -->
          <div v-if="project.changelog" class="border border-slate-200 rounded-xl p-6">
             <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Terminal :size="14" /> Changelog
            </h3>
            <div class="space-y-4">
              <div v-for="log in (project.changelog || [])" :key="log.version" class="relative pl-4 border-l-2 border-slate-100">
                <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary-500"></div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-bold text-slate-900">{{ log.version }}</span>
                  <span class="text-slate-400">{{ log.date }}</span>
                </div>
                <ul class="text-xs text-slate-500 space-y-1">
                   <li v-for="change in log.changes" :key="change">- {{ change }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- Modals -->
    <UpgradeModal :is-open="showUpgradeModal" @close="showUpgradeModal = false" />
  </div>
</template>

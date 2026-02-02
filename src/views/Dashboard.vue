<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { LayoutDashboard, Download, Settings, CreditCard, LogOut } from 'lucide-vue-next';


const authStore = useAuthStore();
const router = useRouter();
const activeTab = ref('overview');

const purchasedItems = ref<any[]>([]);

onMounted(async () => {
    if (!authStore.token) return;
    try {
        const res = await fetch('/api/licenses', {
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        });
        if (res.ok) {
            purchasedItems.value = await res.json();
        }
    } catch (e) {
        console.error(e);
    }
});

const handleLogout = async () => {
    await authStore.logout();
    router.push('/');
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-8 pb-12">
    <!-- Header -->
    <div class="bg-[#064e3b] text-white pb-24 pt-12 px-8 -mt-8 mb-8">
       <div class="max-w-7xl mx-auto flex items-center gap-6">
          <div class="w-16 h-16 rounded-full bg-white text-primary-900 flex items-center justify-center font-bold text-2xl border-4 border-white/20">
             {{ authStore.user?.name.charAt(0) }}
          </div>
          <div>
            <h1 class="text-3xl font-bold">{{ authStore.user?.name }}</h1>
            <p class="text-green-200 font-mono uppercase tracking-wide text-sm">{{ authStore.user?.role }} Clearance</p>
          </div>
       </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
      <div class="grid lg:grid-cols-12 gap-8">
        
        <!-- Sidebar -->
        <div class="lg:col-span-3">
          <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-lg sticky top-24">
            <nav class="space-y-1">
              <button 
                @click="activeTab = 'overview'" 
                :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activeTab === 'overview' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50']"
              >
                <LayoutDashboard :size="18" /> Overview
              </button>
              <button 
                @click="activeTab = 'downloads'" 
                :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activeTab === 'downloads' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50']"
              >
                <Download :size="18" /> My Licenses
              </button>
              <button 
                @click="activeTab = 'billing'" 
                :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activeTab === 'billing' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50']"
              >
                <CreditCard :size="18" /> Billing
              </button>
              <button 
                @click="activeTab = 'settings'" 
                :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activeTab === 'settings' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50']"
              >
                <Settings :size="18" /> Settings
              </button>
            </nav>

            <div class="mt-8 pt-6 border-t border-slate-100">
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
                <LogOut :size="18" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        <!-- content -->
        <div class="lg:col-span-9">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            
            <div class="grid md:grid-cols-3 gap-6">
               <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div class="text-slate-500 text-sm mb-2 font-bold uppercase tracking-wide">Total Licenses</div>
                 <div class="text-4xl font-bold text-slate-900">{{ purchasedItems.length }}</div>
               </div>
               <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div class="text-slate-500 text-sm mb-2 font-bold uppercase tracking-wide">Status</div>
                 <div class="text-4xl font-bold text-emerald-500">Active</div>
               </div>
               <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div class="text-slate-500 text-sm mb-2 font-bold uppercase tracking-wide">Member Since</div>
                 <div class="text-4xl font-bold text-slate-900">2026</div>
               </div>
            </div>

            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-6 text-lg">Recent Activity</h3>
              <div v-if="purchasedItems.length > 0" class="space-y-4">
                 <div v-for="item in purchasedItems" :key="item?.id" class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <div class="flex items-center gap-4">
                     <img :src="item?.thumbnail" class="w-12 h-12 rounded bg-slate-200 object-cover" />
                     <div>
                       <div class="font-bold text-slate-900">{{ item?.title }}</div>
                       <div class="text-xs text-slate-500">Standard Commercial License</div>
                     </div>
                   </div>
                   <button class="text-primary-600 hover:text-primary-700 text-sm font-bold bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">Download</button>
                 </div>
              </div>
              <div v-else class="text-center py-12 text-slate-400">
                No activity recorded yet.
              </div>
            </div>
          </div>

          <!-- Downloads Tab -->
          <div v-if="activeTab === 'downloads'" class="space-y-6">
             <div v-if="purchasedItems.length > 0" class="grid gap-4">
               <div v-for="item in purchasedItems" :key="item?.id" class="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div class="flex gap-6">
                    <img :src="item?.thumbnail" class="w-32 h-20 rounded-lg bg-slate-100 object-cover shadow-sm" />
                    <div class="py-1">
                      <h3 class="font-bold text-xl text-slate-900">{{ item?.title }}</h3>
                      <p class="text-sm text-slate-500 mb-3">Version {{ item?.changelog?.[0]?.version || '1.0' }} • Updated {{ item?.lastUpdated }}</p>
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Active License</span>
                    </div>
                  </div>
                  <button class="btn btn-primary px-6 py-3 flex items-center gap-2">
                    <Download :size="18" /> Download Assets
                  </button>
               </div>
             </div>
             <div v-else class="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
               <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Download :size="32" class="text-slate-400" />
               </div>
               <h3 class="text-xl font-bold text-slate-900 mb-2">No Licenses Found</h3>
               <p class="text-slate-500 mb-8 max-w-md mx-auto">You haven't purchased any licenses yet. Browse our catalog to find premium templates.</p>
               <button @click="router.push('/explore')" class="btn btn-primary px-8 py-3">
                 Explore Catalog
               </button>
             </div>
          </div>

          <!-- Other tabs placeholders -->
           <div v-if="activeTab === 'billing'" class="text-center py-20 bg-white rounded-3xl border border-slate-200 text-slate-400">
             Billing Module Loading... (Mock)
           </div>
           <div v-if="activeTab === 'settings'" class="text-center py-20 bg-white rounded-3xl border border-slate-200 text-slate-400">
             User Settings Module Loading... (Mock)
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

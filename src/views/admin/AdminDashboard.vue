<template>
 <div class="min-h-screen bg-gray-50">
  <!-- Admin Header -->
  <header class="bg-white shadow-sm border-b border-gray-200">
   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-6">
     <div class="flex items-center">
      <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <span
       class="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
       SmartIndus CMS
      </span>
     </div>
     <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2 text-sm text-gray-500">
       <span>Welcome,</span>
       <span class="font-medium text-gray-900">{{
        user?.name || 'Admin'
       }}</span>
      </div>
      <button
       @click="logout"
       class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
       Logout
      </button>
     </div>
    </div>
   </div>
  </header>

  <div class="flex">
   <!-- Sidebar -->
   <aside class="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
    <nav class="mt-5 px-2 space-y-1">
     <router-link
      to="/admin"
      class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50"
      :class="{
       'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
        $route.path === '/admin',
      }"
     >
      <svg
       class="mr-4 h-6 w-6"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
       />
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z"
       />
      </svg>
      Dashboard
     </router-link>

     <router-link
      to="/admin/coupons"
      class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50"
      :class="{
       'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
        $route.path === '/admin/coupons',
      }"
     >
      <svg
       class="mr-4 h-6 w-6"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M21 12c0 .796-.63 1.559-1.753 2.121l-8.112 4.056a1 1 0 01-.894 0L2.129 14.12C1.007 13.56.377 12.796.377 12s.63-1.559 1.752-2.121l8.112-4.056a1 1 0 01.894 0l8.112 4.056C20.37 10.44 21 11.204 21 12z"
       />
      </svg>
      Coupons
     </router-link>

     <router-link
      to="/admin/projects"
      class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50"
      :class="{
       'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
        $route.path === '/admin/projects',
      }"
     >
      <svg
       class="mr-4 h-6 w-6"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
       />
      </svg>
      Projects
     </router-link>

     <router-link
      to="/admin/users"
      class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50"
      :class="{
       'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
        $route.path === '/admin/users',
      }"
     >
      <svg
       class="mr-4 h-6 w-6"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
       />
      </svg>
      Users
     </router-link>

     <router-link
      to="/admin/orders"
      class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-50"
      :class="{
       'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
        $route.path === '/admin/orders',
      }"
     >
      <svg
       class="mr-4 h-6 w-6"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
       />
      </svg>
      Orders
     </router-link>
    </nav>
   </aside>

   <!-- Main Content -->
   <main class="flex-1 p-8">
    <!-- Dashboard Stats -->
    <div class="mb-8">
     <h2 class="text-lg font-medium text-gray-900 mb-4">Overview</h2>
     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
       <div class="p-5">
        <div class="flex items-center">
         <div class="flex-shrink-0">
          <div
           class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
          >
           <svg
            class="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
           >
            <path
             d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
            />
           </svg>
          </div>
         </div>
         <div class="ml-5 w-0 flex-1">
          <dl>
           <dt class="text-sm font-medium text-gray-500 truncate">
            Total Users
           </dt>
           <dd class="text-lg font-medium text-gray-900">
            {{ stats.totalUsers }}
           </dd>
          </dl>
         </div>
        </div>
       </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
       <div class="p-5">
        <div class="flex items-center">
         <div class="flex-shrink-0">
          <div
           class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
          >
           <svg
            class="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
           >
            <path
             d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm6 8H6v-2h4v2zm2-4H6V6h6v2z"
            />
           </svg>
          </div>
         </div>
         <div class="ml-5 w-0 flex-1">
          <dl>
           <dt class="text-sm font-medium text-gray-500 truncate">
            Active Coupons
           </dt>
           <dd class="text-lg font-medium text-gray-900">
            {{ stats.activeCoupons }}
           </dd>
          </dl>
         </div>
        </div>
       </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
       <div class="p-5">
        <div class="flex items-center">
         <div class="flex-shrink-0">
          <div
           class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
          >
           <svg
            class="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
           >
            <path
             d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            />
           </svg>
          </div>
         </div>
         <div class="ml-5 w-0 flex-1">
          <dl>
           <dt class="text-sm font-medium text-gray-500 truncate">
            Total Projects
           </dt>
           <dd class="text-lg font-medium text-gray-900">
            {{ stats.totalProjects }}
           </dd>
          </dl>
         </div>
        </div>
       </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
       <div class="p-5">
        <div class="flex items-center">
         <div class="flex-shrink-0">
          <div
           class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
          >
           <svg
            class="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
           >
            <path
             d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
            />
            <path
             fill-rule="evenodd"
             d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z"
             clip-rule="evenodd"
            />
           </svg>
          </div>
         </div>
         <div class="ml-5 w-0 flex-1">
          <dl>
           <dt class="text-sm font-medium text-gray-500 truncate">
            Total Revenue
           </dt>
           <dd class="text-lg font-medium text-gray-900">
            ${{ stats.totalRevenue.toFixed(2) }}
           </dd>
          </dl>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>

    <!-- Recent Activity -->
    <div class="mb-8">
     <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
     <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
       <li
        v-for="activity in recentActivity"
        :key="activity.id"
        class="px-6 py-4"
       >
        <div class="flex items-center justify-between">
         <div class="flex items-center">
          <div class="flex-shrink-0">
           <div
            :class="getActivityIcon(activity.type)"
            class="w-8 h-8 rounded-full flex items-center justify-center"
           >
            <svg
             class="w-4 h-4 text-white"
             fill="currentColor"
             viewBox="0 0 20 20"
             v-html="getActivitySVG(activity.type)"
            ></svg>
           </div>
          </div>
          <div class="ml-4">
           <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
           <p class="text-sm text-gray-500">{{ activity.description }}</p>
          </div>
         </div>
         <div class="text-sm text-gray-500">
          {{ formatDate(activity.timestamp) }}
         </div>
        </div>
       </li>
      </ul>

      <div v-if="recentActivity.length === 0" class="text-center py-12">
       <p class="text-gray-500">No recent activity</p>
      </div>
     </div>
    </div>

    <!-- Quick Actions -->
    <div>
     <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <router-link
       to="/admin/coupons"
       class="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
      >
       <div class="flex items-center">
        <div class="flex-shrink-0">
         <div
          class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center"
         >
          <svg
           class="w-6 h-6 text-white"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
          >
           <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01"
           />
          </svg>
         </div>
        </div>
        <div class="ml-4">
         <h3 class="text-lg font-medium text-gray-900">Create Coupon</h3>
         <p class="text-sm text-gray-500">Add new discount coupons</p>
        </div>
       </div>
      </router-link>

      <button
       @click="exportData"
       class="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-green-300 w-full text-left"
      >
       <div class="flex items-center">
        <div class="flex-shrink-0">
         <div
          class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center"
         >
          <svg
           class="w-6 h-6 text-white"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
          >
           <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
           />
          </svg>
         </div>
        </div>
        <div class="ml-4">
         <h3 class="text-lg font-medium text-gray-900">Export Data</h3>
         <p class="text-sm text-gray-500">Download sales reports</p>
        </div>
       </div>
      </button>

      <router-link
       to="/"
       class="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-purple-300"
      >
       <div class="flex items-center">
        <div class="flex-shrink-0">
         <div
          class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center"
         >
          <svg
           class="w-6 h-6 text-white"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
          >
           <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
           />
           <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
           />
          </svg>
         </div>
        </div>
        <div class="ml-4">
         <h3 class="text-lg font-medium text-gray-900">View Site</h3>
         <p class="text-sm text-gray-500">Visit public website</p>
        </div>
       </div>
      </router-link>
     </div>
    </div>
   </main>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/authStore';
import { useCouponStore } from '../../stores/couponStore';

const router = useRouter();
const authStore = useAuthStore();
const couponStore = useCouponStore();

const { user } = storeToRefs(authStore);
const { activeCoupons } = storeToRefs(couponStore);

const stats = ref({
 totalUsers: 0,
 activeCoupons: 0,
 totalProjects: 0,
 totalRevenue: 0,
});

const recentActivity = ref([
 {
  id: 1,
  type: 'coupon',
  title: 'New coupon created',
  description: 'SUMMER2024 coupon created with 20% discount',
  timestamp: new Date().toISOString(),
 },
 {
  id: 2,
  type: 'sale',
  title: 'New purchase',
  description: 'Premium license purchased by John Doe',
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
 },
 {
  id: 3,
  type: 'user',
  title: 'New user registration',
  description: 'Jane Smith registered as a new user',
  timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
 },
]);

onMounted(async () => {
 // Check if user is admin
 if (!user.value || user.value.role !== 'admin') {
  router.push('/auth/login');
  return;
 }

 // Load dashboard data
 await loadDashboardStats();
 await couponStore.fetchCoupons();
});

async function loadDashboardStats() {
 // In real app, fetch from API
 stats.value = {
  totalUsers: 156,
  activeCoupons: activeCoupons.value?.length || 0,
  totalProjects: 24,
  totalRevenue: 12450.5,
 };
}

function logout() {
 authStore.logout();
 router.push('/');
}

function getActivityIcon(type: string): string {
 switch (type) {
  case 'coupon':
   return 'bg-blue-500';
  case 'sale':
   return 'bg-green-500';
  case 'user':
   return 'bg-purple-500';
  default:
   return 'bg-gray-500';
 }
}

function getActivitySVG(type: string): string {
 switch (type) {
  case 'coupon':
   return '<path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01"/>';
  case 'sale':
   return '<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0V.8M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
  case 'user':
   return '<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>';
  default:
   return '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
 }
}

function formatDate(dateString: string): string {
 const date = new Date(dateString);
 const now = new Date();
 const diffInMinutes = Math.floor(
  (now.getTime() - date.getTime()) / (1000 * 60),
 );

 if (diffInMinutes < 60) {
  return `${diffInMinutes} minutes ago`;
 } else if (diffInMinutes < 1440) {
  return `${Math.floor(diffInMinutes / 60)} hours ago`;
 } else {
  return date.toLocaleDateString();
 }
}

function exportData() {
 // Mock data export
 const data = {
  stats: stats.value,
  timestamp: new Date().toISOString(),
 };

 const blob = new Blob([JSON.stringify(data, null, 2)], {
  type: 'application/json',
 });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.href = url;
 link.download = 'admin-dashboard-export.json';
 link.click();
 URL.revokeObjectURL(url);
}
</script>

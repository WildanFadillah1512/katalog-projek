<template>
 <div class="admin-coupons p-6">
  <div class="flex justify-between items-center mb-6">
   <div>
    <h1 class="text-2xl font-bold text-gray-900">Coupon Management</h1>
    <p class="text-gray-600">Create and manage discount coupons</p>
   </div>
   <button
    @click="showCreateModal = true"
    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
   >
    <svg
     class="w-5 h-5 inline-block mr-2"
     fill="none"
     stroke="currentColor"
     viewBox="0 0 24 24"
    >
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
     />
    </svg>
    Create Coupon
   </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
   <div class="bg-white p-6 rounded-lg shadow border">
    <div class="flex items-center">
     <div class="flex-shrink-0">
      <div
       class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
      >
       <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
         d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm6 8H6v-2h4v2zm2-4H6V6h6v2z"
        />
       </svg>
      </div>
     </div>
     <div class="ml-5 w-0 flex-1">
      <dl>
       <dt class="text-sm font-medium text-gray-500 truncate">Total Coupons</dt>
       <dd class="text-lg font-medium text-gray-900">{{ coupons.length }}</dd>
      </dl>
     </div>
    </div>
   </div>

   <div class="bg-white p-6 rounded-lg shadow border">
    <div class="flex items-center">
     <div class="flex-shrink-0">
      <div
       class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
      >
       <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
         fill-rule="evenodd"
         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
         clip-rule="evenodd"
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
        {{ activeCoupons.length }}
       </dd>
      </dl>
     </div>
    </div>
   </div>

   <div class="bg-white p-6 rounded-lg shadow border">
    <div class="flex items-center">
     <div class="flex-shrink-0">
      <div
       class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
      >
       <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
         fill-rule="evenodd"
         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
         clip-rule="evenodd"
        />
       </svg>
      </div>
     </div>
     <div class="ml-5 w-0 flex-1">
      <dl>
       <dt class="text-sm font-medium text-gray-500 truncate">
        Expired Coupons
       </dt>
       <dd class="text-lg font-medium text-gray-900">
        {{ expiredCoupons.length }}
       </dd>
      </dl>
     </div>
    </div>
   </div>

   <div class="bg-white p-6 rounded-lg shadow border">
    <div class="flex items-center">
     <div class="flex-shrink-0">
      <div
       class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
      >
       <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
         d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
        />
       </svg>
      </div>
     </div>
     <div class="ml-5 w-0 flex-1">
      <dl>
       <dt class="text-sm font-medium text-gray-500 truncate">Total Usage</dt>
       <dd class="text-lg font-medium text-gray-900">{{ totalUsage }}</dd>
      </dl>
     </div>
    </div>
   </div>
  </div>

  <!-- Loading State -->
  <div
   v-if="isLoading && coupons.length === 0"
   class="flex justify-center py-12"
  >
   <div
    class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
   ></div>
  </div>

  <!-- Coupons Table -->
  <div v-else class="bg-white shadow-sm rounded-lg border overflow-hidden">
   <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
    <h3 class="text-lg font-medium text-gray-900">All Coupons</h3>
   </div>

   <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
     <thead class="bg-gray-50">
      <tr>
       <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
       >
        Code & Description
       </th>
       <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
       >
        Discount
       </th>
       <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
       >
        Usage
       </th>
       <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
       >
        Valid Period
       </th>
       <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
       >
        Status
       </th>
       <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
       >
        Actions
       </th>
      </tr>
     </thead>
     <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="coupon in coupons" :key="coupon.id" class="hover:bg-gray-50">
       <td class="px-6 py-4 whitespace-nowrap">
        <div>
         <div class="text-sm font-medium text-gray-900">{{ coupon.code }}</div>
         <div class="text-sm text-gray-500 max-w-xs truncate">
          {{ coupon.description }}
         </div>
        </div>
       </td>
       <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">
         <span v-if="coupon.discountType === 'percentage'">
          {{ coupon.discountValue }}%
         </span>
         <span v-else> ${{ coupon.discountValue }} </span>
        </div>
        <div class="text-sm text-gray-500">
         Min: ${{ coupon.minPurchaseAmount }}
        </div>
       </td>
       <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">
         {{ coupon.currentUses }}
         <span v-if="coupon.maxUses">/ {{ coupon.maxUses }}</span>
         <span v-else>/ ∞</span>
        </div>
       </td>
       <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div>{{ formatDate(coupon.validFrom) }}</div>
        <div>{{ formatDate(coupon.validUntil) }}</div>
       </td>
       <td class="px-6 py-4 whitespace-nowrap">
        <span
         :class="getStatusBadgeClass(coupon)"
         class="px-2 py-1 text-xs font-medium rounded-full"
        >
         {{ getStatusText(coupon) }}
        </span>
       </td>
       <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        <button
         @click="editCoupon(coupon)"
         class="text-blue-600 hover:text-blue-900"
        >
         Edit
        </button>
        <button
         @click="toggleStatus(coupon)"
         :class="
          coupon.isActive
           ? 'text-red-600 hover:text-red-900'
           : 'text-green-600 hover:text-green-900'
         "
        >
         {{ coupon.isActive ? 'Disable' : 'Enable' }}
        </button>
        <button
         @click="deleteCouponConfirm(coupon)"
         class="text-red-600 hover:text-red-900"
        >
         Delete
        </button>
       </td>
      </tr>
     </tbody>
    </table>

    <div v-if="coupons.length === 0" class="text-center py-12">
     <svg
      class="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M9 14l6-6m-5.5.5h.01m4.99 5h.01"
      />
     </svg>
     <h3 class="mt-2 text-sm font-medium text-gray-900">No coupons</h3>
     <p class="mt-1 text-sm text-gray-500">
      Get started by creating your first coupon.
     </p>
    </div>
   </div>
  </div>

  <!-- Create/Edit Modal -->
  <CouponFormModal
   :show="showCreateModal || showEditModal"
   :coupon="editingCoupon"
   @close="closeModal"
   @submit="handleSubmit"
  />

  <!-- Delete Confirmation Modal -->
  <div
   v-if="showDeleteModal"
   class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
   @click="showDeleteModal = false"
  >
   <div
    class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    @click.stop
   >
    <div class="mt-3 text-center">
     <div
      class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
     >
      <svg
       class="h-6 w-6 text-red-600"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
       />
      </svg>
     </div>
     <h3 class="text-lg font-medium text-gray-900 mt-2">Delete Coupon</h3>
     <div class="mt-2 px-7 py-3">
      <p class="text-sm text-gray-500">
       Are you sure you want to delete the coupon "{{ deletingCoupon?.code }}"?
       This action cannot be undone.
      </p>
     </div>
     <div class="items-center px-4 py-3">
      <button
       @click="confirmDelete"
       class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
      >
       Delete
      </button>
      <button
       @click="showDeleteModal = false"
       class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
       Cancel
      </button>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCouponStore } from '../../stores/couponStore';
import { useToast } from '../../composables/useToast';
import CouponFormModal from '../../components/admin/CouponFormModal.vue';
import type { Coupon, CreateCouponData } from '../../services/couponService';

const couponStore = useCouponStore();
const { coupons, activeCoupons, expiredCoupons, isLoading } =
 storeToRefs(couponStore);
const { showToast } = useToast();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editingCoupon = ref<Coupon | null>(null);
const deletingCoupon = ref<Coupon | null>(null);

const totalUsage = computed(() => {
 return coupons.value.reduce((total, coupon) => total + coupon.currentUses, 0);
});

onMounted(() => {
 couponStore.fetchCoupons();
});

function editCoupon(coupon: Coupon) {
 editingCoupon.value = coupon;
 showEditModal.value = true;
}

function deleteCouponConfirm(coupon: Coupon) {
 deletingCoupon.value = coupon;
 showDeleteModal.value = true;
}

async function confirmDelete() {
 if (!deletingCoupon.value) return;

 const result = await couponStore.deleteCoupon(deletingCoupon.value.id);

 if (result.success) {
  showToast('Coupon deleted successfully', 'success');
 } else {
  showToast(result.message || 'Failed to delete coupon', 'error');
 }

 showDeleteModal.value = false;
 deletingCoupon.value = null;
}

async function toggleStatus(coupon: Coupon) {
 const result = await couponStore.toggleCouponStatus(coupon.id);

 if (result.success) {
  showToast(
   `Coupon ${result.coupon?.isActive ? 'enabled' : 'disabled'} successfully`,
   'success',
  );
 } else {
  showToast(result.message || 'Failed to update coupon status', 'error');
 }
}

async function handleSubmit(data: CreateCouponData) {
 let result;

 if (editingCoupon.value) {
  result = await couponStore.updateCoupon(editingCoupon.value.id, data);
 } else {
  result = await couponStore.createCoupon(data);
 }

 if (result.success) {
  showToast(
   `Coupon ${editingCoupon.value ? 'updated' : 'created'} successfully`,
   'success',
  );
  closeModal();
 } else {
  showToast(result.message || 'Operation failed', 'error');
 }
}

function closeModal() {
 showCreateModal.value = false;
 showEditModal.value = false;
 editingCoupon.value = null;
}

function formatDate(dateString: string): string {
 return new Date(dateString).toLocaleDateString();
}

function getStatusText(coupon: Coupon): string {
 const now = new Date();
 const validUntil = new Date(coupon.validUntil);

 if (!coupon.isActive) return 'Disabled';
 if (validUntil < now) return 'Expired';
 if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) return 'Used Up';
 return 'Active';
}

function getStatusBadgeClass(coupon: Coupon): string {
 const status = getStatusText(coupon);

 switch (status) {
  case 'Active':
   return 'bg-green-100 text-green-800';
  case 'Expired':
   return 'bg-red-100 text-red-800';
  case 'Disabled':
   return 'bg-gray-100 text-gray-800';
  case 'Used Up':
   return 'bg-yellow-100 text-yellow-800';
  default:
   return 'bg-gray-100 text-gray-800';
 }
}
</script>

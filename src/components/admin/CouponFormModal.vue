<template>
 <div
  v-if="show"
  class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
  @click="closeModal"
 >
  <div
   class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
   @click.stop
  >
   <div class="flex justify-between items-center mb-4">
    <h3 class="text-lg font-medium text-gray-900">
     {{ coupon ? 'Edit Coupon' : 'Create New Coupon' }}
    </h3>
    <button
     @click="closeModal"
     class="text-gray-400 hover:text-gray-600 focus:outline-none"
    >
     <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M6 18L18 6M6 6l12 12"
      />
     </svg>
    </button>
   </div>

   <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Coupon Code -->
    <div>
     <label for="code" class="block text-sm font-medium text-gray-700 mb-1">
      Coupon Code *
     </label>
     <input
      id="code"
      v-model="formData.code"
      type="text"
      required
      placeholder="e.g., SUMMER2024"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      :class="{ 'border-red-300': errors.code }"
     />
     <p v-if="errors.code" class="mt-1 text-sm text-red-600">
      {{ errors.code }}
     </p>
    </div>

    <!-- Description -->
    <div>
     <label
      for="description"
      class="block text-sm font-medium text-gray-700 mb-1"
     >
      Description *
     </label>
     <textarea
      id="description"
      v-model="formData.description"
      rows="3"
      required
      placeholder="Describe what this coupon is for..."
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      :class="{ 'border-red-300': errors.description }"
     />
     <p v-if="errors.description" class="mt-1 text-sm text-red-600">
      {{ errors.description }}
     </p>
    </div>

    <!-- Discount Type and Value -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
     <div>
      <label
       for="discountType"
       class="block text-sm font-medium text-gray-700 mb-1"
      >
       Discount Type *
      </label>
      <select
       id="discountType"
       v-model="formData.discountType"
       required
       class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
       <option value="percentage">Percentage (%)</option>
       <option value="fixed">Fixed Amount ($)</option>
      </select>
     </div>

     <div>
      <label
       for="discountValue"
       class="block text-sm font-medium text-gray-700 mb-1"
      >
       Discount Value *
      </label>
      <div class="relative">
       <input
        id="discountValue"
        v-model.number="formData.discountValue"
        type="number"
        :min="0"
        :max="formData.discountType === 'percentage' ? 100 : undefined"
        step="0.01"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        :class="{ 'border-red-300': errors.discountValue }"
       />
       <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
       >
        <span class="text-gray-500 sm:text-sm">
         {{ formData.discountType === 'percentage' ? '%' : '$' }}
        </span>
       </div>
      </div>
      <p v-if="errors.discountValue" class="mt-1 text-sm text-red-600">
       {{ errors.discountValue }}
      </p>
     </div>
    </div>

    <!-- Min Purchase Amount -->
    <div>
     <label
      for="minPurchaseAmount"
      class="block text-sm font-medium text-gray-700 mb-1"
     >
      Minimum Purchase Amount ($)
     </label>
     <input
      id="minPurchaseAmount"
      v-model.number="formData.minPurchaseAmount"
      type="number"
      min="0"
      step="0.01"
      placeholder="0.00"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>

    <!-- Max Uses -->
    <div>
     <label for="maxUses" class="block text-sm font-medium text-gray-700 mb-1">
      Maximum Uses
     </label>
     <input
      id="maxUses"
      v-model.number="formData.maxUses"
      type="number"
      min="1"
      placeholder="Leave empty for unlimited uses"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
     />
     <p class="mt-1 text-sm text-gray-500">Leave empty for unlimited uses</p>
    </div>

    <!-- Valid Period -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
     <div>
      <label
       for="validFrom"
       class="block text-sm font-medium text-gray-700 mb-1"
      >
       Valid From *
      </label>
      <input
       id="validFrom"
       v-model="formData.validFrom"
       type="datetime-local"
       required
       class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
       :class="{ 'border-red-300': errors.validFrom }"
      />
      <p v-if="errors.validFrom" class="mt-1 text-sm text-red-600">
       {{ errors.validFrom }}
      </p>
     </div>

     <div>
      <label
       for="validUntil"
       class="block text-sm font-medium text-gray-700 mb-1"
      >
       Valid Until *
      </label>
      <input
       id="validUntil"
       v-model="formData.validUntil"
       type="datetime-local"
       required
       class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
       :class="{ 'border-red-300': errors.validUntil }"
      />
      <p v-if="errors.validUntil" class="mt-1 text-sm text-red-600">
       {{ errors.validUntil }}
      </p>
     </div>
    </div>

    <!-- Error Message -->
    <div
     v-if="generalError"
     class="bg-red-50 border border-red-200 rounded-lg p-3"
    >
     <div class="flex">
      <div class="flex-shrink-0">
       <svg
        class="h-5 w-5 text-red-400"
        fill="currentColor"
        viewBox="0 0 20 20"
       >
        <path
         fill-rule="evenodd"
         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
         clip-rule="evenodd"
        />
       </svg>
      </div>
      <div class="ml-3">
       <p class="text-sm text-red-800">{{ generalError }}</p>
      </div>
     </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
     <button
      type="button"
      @click="closeModal"
      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
     >
      Cancel
     </button>
     <button
      type="submit"
      :disabled="isSubmitting"
      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
     >
      <span v-if="isSubmitting" class="flex items-center">
       <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
       >
        <circle
         class="opacity-25"
         cx="12"
         cy="12"
         r="10"
         stroke="currentColor"
         stroke-width="4"
        ></circle>
        <path
         class="opacity-75"
         fill="currentColor"
         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
       </svg>
       {{ coupon ? 'Updating...' : 'Creating...' }}
      </span>
      <span v-else>
       {{ coupon ? 'Update Coupon' : 'Create Coupon' }}
      </span>
     </button>
    </div>
   </form>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Coupon, CreateCouponData } from '../../services/couponService';

interface Props {
 show: boolean;
 coupon?: Coupon | null;
}

interface Emits {
 (e: 'close'): void;
 (e: 'submit', data: CreateCouponData): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isSubmitting = ref(false);
const generalError = ref('');

const formData = ref<CreateCouponData>({
 code: '',
 description: '',
 discountType: 'percentage',
 discountValue: 0,
 minPurchaseAmount: 0,
 validFrom: '',
 validUntil: '',
});

const errors = ref<Record<string, string>>({});

// Watch for coupon prop changes (for editing)
watch(
 () => props.coupon,
 (newCoupon) => {
  if (newCoupon) {
   formData.value = {
    code: newCoupon.code,
    description: newCoupon.description,
    discountType: newCoupon.discountType,
    discountValue: newCoupon.discountValue,
    minPurchaseAmount: newCoupon.minPurchaseAmount,
    maxUses: newCoupon.maxUses,
    validFrom: formatDateForInput(newCoupon.validFrom),
    validUntil: formatDateForInput(newCoupon.validUntil),
   };
  }
 },
 { immediate: true },
);

// Reset form when modal is shown/hidden
watch(
 () => props.show,
 (show) => {
  if (!show) {
   resetForm();
  } else if (show && !props.coupon) {
   // Set default dates for new coupon
   const now = new Date();
   const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
   const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

   formData.value.validFrom = formatDateForInput(now.toISOString());
   formData.value.validUntil = formatDateForInput(nextWeek.toISOString());
  }
 },
);

function formatDateForInput(dateString: string): string {
 const date = new Date(dateString);
 return date.toISOString().slice(0, 16);
}

function resetForm() {
 formData.value = {
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: 0,
  minPurchaseAmount: 0,
  validFrom: '',
  validUntil: '',
 };
 errors.value = {};
 generalError.value = '';
 isSubmitting.value = false;
}

function validateForm(): boolean {
 errors.value = {};

 if (!formData.value.code.trim()) {
  errors.value.code = 'Coupon code is required';
 } else if (!/^[A-Z0-9_-]+$/i.test(formData.value.code)) {
  errors.value.code =
   'Coupon code can only contain letters, numbers, hyphens, and underscores';
 }

 if (!formData.value.description.trim()) {
  errors.value.description = 'Description is required';
 }

 if (!formData.value.discountValue || formData.value.discountValue <= 0) {
  errors.value.discountValue = 'Discount value must be greater than 0';
 } else if (
  formData.value.discountType === 'percentage' &&
  formData.value.discountValue > 100
 ) {
  errors.value.discountValue = 'Percentage discount cannot be more than 100%';
 }

 if (!formData.value.validFrom) {
  errors.value.validFrom = 'Start date is required';
 }

 if (!formData.value.validUntil) {
  errors.value.validUntil = 'End date is required';
 } else if (
  new Date(formData.value.validUntil) <= new Date(formData.value.validFrom)
 ) {
  errors.value.validUntil = 'End date must be after start date';
 }

 return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
 if (!validateForm()) return;

 isSubmitting.value = true;
 generalError.value = '';

 try {
  // Convert dates to ISO string format
  const submitData: CreateCouponData = {
   ...formData.value,
   validFrom: new Date(formData.value.validFrom).toISOString(),
   validUntil: new Date(formData.value.validUntil).toISOString(),
  };

  emit('submit', submitData);
 } catch (error) {
  generalError.value =
   error instanceof Error ? error.message : 'An error occurred';
 } finally {
  isSubmitting.value = false;
 }
}

function closeModal() {
 emit('close');
}
</script>

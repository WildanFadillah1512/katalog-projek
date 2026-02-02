<template>
 <div class="coupon-input-section bg-gray-50 p-4 rounded-lg border">
  <div class="flex items-center justify-between mb-3">
   <h3 class="text-lg font-medium text-gray-900">Promo Code</h3>
   <button
    v-if="isDiscountApplied"
    @click="removeCoupon"
    class="text-red-600 hover:text-red-800 text-sm font-medium"
   >
    Remove
   </button>
  </div>

  <!-- Applied Coupon Display -->
  <div
   v-if="isDiscountApplied"
   class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4"
  >
   <div class="flex items-center">
    <div class="flex-shrink-0">
     <svg
      class="h-5 w-5 text-green-400"
      fill="currentColor"
      viewBox="0 0 20 20"
     >
      <path
       fill-rule="evenodd"
       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
       clip-rule="evenodd"
      />
     </svg>
    </div>
    <div class="ml-3">
     <p class="text-sm font-medium text-green-800">
      Coupon "{{ appliedCoupon?.code }}" applied!
     </p>
     <p class="text-sm text-green-700">
      {{ appliedCoupon?.description }}
     </p>
     <p class="text-sm font-semibold text-green-800">
      Discount: {{ formatDiscount(appliedCoupon!, discountAmount) }}
     </p>
    </div>
   </div>
  </div>

  <!-- Coupon Input Form -->
  <div v-if="!isDiscountApplied" class="space-y-3">
   <div class="flex space-x-2">
    <div class="flex-1">
     <input
      v-model="couponCode"
      type="text"
      placeholder="Enter promo code"
      :disabled="isLoading"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      @keyup.enter="applyCoupon"
     />
    </div>
    <button
     @click="applyCoupon"
     :disabled="!couponCode.trim() || isLoading"
     class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
    >
     <span v-if="isLoading" class="flex items-center">
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
      Applying...
     </span>
     <span v-else>Apply</span>
    </button>
   </div>

   <!-- Error Message -->
   <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
    <div class="flex">
     <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
       <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clip-rule="evenodd"
       />
      </svg>
     </div>
     <div class="ml-3">
      <p class="text-sm text-red-800">{{ error }}</p>
     </div>
    </div>
   </div>
  </div>

  <!-- Price Summary -->
  <div v-if="totalAmount > 0" class="mt-4 pt-4 border-t border-gray-200">
   <div class="space-y-2">
    <div class="flex justify-between text-sm">
     <span class="text-gray-600">Subtotal:</span>
     <span class="font-medium">${{ totalAmount.toFixed(2) }}</span>
    </div>
    <div
     v-if="isDiscountApplied"
     class="flex justify-between text-sm text-green-600"
    >
     <span>Discount:</span>
     <span class="font-medium">-${{ discountAmount.toFixed(2) }}</span>
    </div>
    <div
     class="flex justify-between text-lg font-bold border-t border-gray-200 pt-2"
    >
     <span>Total:</span>
     <span class="text-blue-600">${{ finalPrice.toFixed(2) }}</span>
    </div>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCouponStore } from '../../stores/couponStore';
import type { Coupon } from '../../services/couponService';

interface Props {
 totalAmount: number;
}

const props = defineProps<Props>();

const couponStore = useCouponStore();
const { appliedCoupon, discountAmount, isLoading, error, isDiscountApplied } =
 storeToRefs(couponStore);

const couponCode = ref('');

const finalPrice = computed(() => {
 return couponStore.calculateFinalPrice(props.totalAmount);
});

async function applyCoupon() {
 if (!couponCode.value.trim()) return;

 const result = await couponStore.validateAndApplyCoupon(
  couponCode.value.trim(),
  props.totalAmount,
 );

 if (result.success) {
  couponCode.value = '';
 }
}

function removeCoupon() {
 couponStore.removeCoupon();
}

function formatDiscount(coupon: Coupon, discount: number): string {
 if (coupon.discountType === 'percentage') {
  return `${coupon.discountValue}% off (-$${discount.toFixed(2)})`;
 } else {
  return `$${discount.toFixed(2)} off`;
 }
}
</script>

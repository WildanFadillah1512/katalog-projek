import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
 couponService,
 type Coupon,
 type CreateCouponData,
} from '../services/couponService';

export const useCouponStore = defineStore('coupon', () => {
 // State
 const coupons = ref<Coupon[]>([]);
 const appliedCoupon = ref<Coupon | null>(null);
 const discountAmount = ref(0);
 const isLoading = ref(false);
 const error = ref<string | null>(null);

 // Computed
 const activeCoupons = computed(() =>
  coupons.value.filter((coupon: Coupon) => coupon.isActive),
 );

 const expiredCoupons = computed(() =>
  coupons.value.filter(
   (coupon: Coupon) => new Date(coupon.validUntil) < new Date(),
  ),
 );

 const isDiscountApplied = computed(
  () => appliedCoupon.value !== null && discountAmount.value > 0,
 );

 // Actions
 async function fetchCoupons() {
  isLoading.value = true;
  error.value = null;

  try {
   coupons.value = await couponService.getAllCoupons();
  } catch (err) {
   error.value = err instanceof Error ? err.message : 'Failed to fetch coupons';
   console.error('Error fetching coupons:', err);
  } finally {
   isLoading.value = false;
  }
 }

 async function validateAndApplyCoupon(code: string, totalAmount: number) {
  isLoading.value = true;
  error.value = null;

  try {
   const validation = await couponService.validateCoupon(code, totalAmount);

   if (
    validation.isValid &&
    validation.coupon &&
    validation.discount !== undefined
   ) {
    appliedCoupon.value = validation.coupon;
    discountAmount.value = validation.discount;
    return { success: true, message: validation.message };
   } else {
    error.value = validation.message;
    return { success: false, message: validation.message };
   }
  } catch (err) {
   const message =
    err instanceof Error ? err.message : 'Failed to apply coupon';
   error.value = message;
   return { success: false, message };
  } finally {
   isLoading.value = false;
  }
 }

 function removeCoupon() {
  appliedCoupon.value = null;
  discountAmount.value = 0;
  error.value = null;
 }

 async function createCoupon(couponData: CreateCouponData) {
  isLoading.value = true;
  error.value = null;

  try {
   const newCoupon = await couponService.createCoupon(couponData);
   coupons.value.push(newCoupon);
   return { success: true, coupon: newCoupon };
  } catch (err) {
   const message =
    err instanceof Error ? err.message : 'Failed to create coupon';
   error.value = message;
   return { success: false, message };
  } finally {
   isLoading.value = false;
  }
 }

 async function updateCoupon(
  id: number,
  couponData: Partial<CreateCouponData>,
 ) {
  isLoading.value = true;
  error.value = null;

  try {
   const updatedCoupon = await couponService.updateCoupon(id, couponData);
   const index = coupons.value.findIndex((c: Coupon) => c.id === id);

   if (index !== -1) {
    coupons.value[index] = updatedCoupon;
   }

   return { success: true, coupon: updatedCoupon };
  } catch (err) {
   const message =
    err instanceof Error ? err.message : 'Failed to update coupon';
   error.value = message;
   return { success: false, message };
  } finally {
   isLoading.value = false;
  }
 }

 async function deleteCoupon(id: number) {
  isLoading.value = true;
  error.value = null;

  try {
   await couponService.deleteCoupon(id);
   coupons.value = coupons.value.filter((c: Coupon) => c.id !== id);

   // Remove applied coupon if it was deleted
   if (appliedCoupon.value?.id === id) {
    removeCoupon();
   }

   return { success: true };
  } catch (err) {
   const message =
    err instanceof Error ? err.message : 'Failed to delete coupon';
   error.value = message;
   return { success: false, message };
  } finally {
   isLoading.value = false;
  }
 }

 async function toggleCouponStatus(id: number) {
  isLoading.value = true;
  error.value = null;

  try {
   const updatedCoupon = await couponService.toggleCouponStatus(id);
   const index = coupons.value.findIndex((c: Coupon) => c.id === id);

   if (index !== -1) {
    coupons.value[index] = updatedCoupon;
   }

   return { success: true, coupon: updatedCoupon };
  } catch (err) {
   const message =
    err instanceof Error ? err.message : 'Failed to toggle coupon status';
   error.value = message;
   return { success: false, message };
  } finally {
   isLoading.value = false;
  }
 }

 function calculateFinalPrice(originalPrice: number): number {
  if (!appliedCoupon.value) return originalPrice;

  return Math.max(0, originalPrice - discountAmount.value);
 }

 function clearError() {
  error.value = null;
 }

 function resetCouponState() {
  appliedCoupon.value = null;
  discountAmount.value = 0;
  error.value = null;
 }

 return {
  // State
  coupons,
  appliedCoupon,
  discountAmount,
  isLoading,
  error,

  // Computed
  activeCoupons,
  expiredCoupons,
  isDiscountApplied,

  // Actions
  fetchCoupons,
  validateAndApplyCoupon,
  removeCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
  calculateFinalPrice,
  clearError,
  resetCouponState,
 };
});

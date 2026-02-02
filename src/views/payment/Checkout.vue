<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { CreditCard, Lock, ShieldCheck } from 'lucide-vue-next';
import { useCouponStore } from '../../stores/couponStore';
import { useAuthStore } from '../../stores/authStore';
import CouponInput from '../../components/ui/CouponInput.vue';

const router = useRouter();
const couponStore = useCouponStore();
const authStore = useAuthStore();

const { appliedCoupon, discountAmount, isDiscountApplied } =
 storeToRefs(couponStore);
const { user } = storeToRefs(authStore);

const loading = ref(false);
const cardNumber = ref('');
const expiry = ref('');
const cvc = ref('');

// Mock order data - in real app this would come from route params or store
const orderData = ref({
 productName: 'Smart Indus Premium',
 productDescription: 'Monthly Subscription',
 originalPrice: 29.0,
 projectId: 1,
 licenseType: 'premium',
});

const finalPrice = computed(() => {
 return couponStore.calculateFinalPrice(orderData.value.originalPrice);
});

const formatCard = () => {
 let v = cardNumber.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
 let matches = v.match(/\d{4,16}/g);
 let match = (matches && matches[0]) || '';
 let parts = [];
 for (let i = 0, len = match.length; i < len; i += 4) {
  parts.push(match.substring(i, i + 4));
 }
 if (parts.length) {
  cardNumber.value = parts.join(' ');
 } else {
  cardNumber.value = v;
 }
};

const handlePayment = async () => {
 if (!user.value) {
  // Redirect to login if not authenticated
  router.push('/auth/login');
  return;
 }

 loading.value = true;

 try {
  // Simulate API call to process payment
  const paymentData = {
   userId: user.value.id,
   projectId: orderData.value.projectId,
   licenseType: orderData.value.licenseType,
   originalPrice: orderData.value.originalPrice,
   finalPrice: finalPrice.value,
   couponId: appliedCoupon.value?.id || null,
  };

  // Mock payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In real app, make actual API call here
  // const response = await fetch('/api/checkout', { ... });

  // Clear coupon after successful payment
  couponStore.resetCouponState();

  router.push('/checkout/success');
 } catch (error) {
  console.error('Payment failed:', error);
  // Handle payment error
 } finally {
  loading.value = false;
 }
};

onMounted(() => {
 // Reset coupon state when entering checkout
 couponStore.clearError();
});
</script>

<template>
 <div class="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
  <div class="max-w-4xl w-full mx-auto px-4 grid md:grid-cols-2 gap-8">
   <!-- Order Summary -->
   <div class="space-y-6">
    <div>
     <h2 class="text-3xl font-bold text-slate-900 font-display mb-2">
      Checkout
     </h2>
     <p class="text-slate-500">Complete your secure transaction.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
     <h3 class="font-bold text-lg text-slate-900 mb-4">Order Summary</h3>
     <div
      class="flex justify-between items-center py-4 border-b border-slate-100"
     >
      <div>
       <div class="font-bold text-slate-800">{{ orderData.productName }}</div>
       <div class="text-sm text-slate-500">
        {{ orderData.productDescription }}
       </div>
      </div>
      <div class="font-mono text-xl text-slate-900 font-bold">
       ${{ orderData.originalPrice.toFixed(2) }}
      </div>
     </div>

     <!-- Discount Display -->
     <div
      v-if="isDiscountApplied"
      class="flex justify-between items-center py-3 text-green-600 border-b border-slate-100"
     >
      <div class="text-sm">
       <div class="font-medium">Discount ({{ appliedCoupon?.code }})</div>
       <div class="text-xs">{{ appliedCoupon?.description }}</div>
      </div>
      <div class="font-mono text-lg font-bold">
       -${{ discountAmount.toFixed(2) }}
      </div>
     </div>

     <div class="flex justify-between items-center py-4">
      <div class="text-slate-500">Total Due</div>
      <div class="font-bold text-2xl text-primary-600">
       ${{ finalPrice.toFixed(2) }}
      </div>
     </div>
    </div>

    <!-- Coupon Input -->
    <CouponInput :totalAmount="orderData.originalPrice" />

    <div
     class="flex items-center gap-4 text-sm text-slate-500 bg-white p-4 rounded-xl border border-slate-200"
    >
     <ShieldCheck class="text-green-500" />
     <span>256-bit SSL Encrypted Payment</span>
    </div>
   </div>

   <!-- Payment Form -->
   <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
    <h3 class="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2">
     <CreditCard class="text-primary-600" /> Payment Details
    </h3>

    <form @submit.prevent="handlePayment" class="space-y-5">
     <div>
      <label class="block text-sm font-bold text-slate-700 mb-1"
       >Cardholder Name</label
      >
      <input type="text" class="input-field" placeholder="John Doe" required />
     </div>

     <div>
      <label class="block text-sm font-bold text-slate-700 mb-1"
       >Card Number</label
      >
      <div class="relative">
       <input
        v-model="cardNumber"
        @input="formatCard"
        type="text"
        class="input-field pl-12 font-mono"
        placeholder="0000 0000 0000 0000"
        required
        maxlength="19"
       />
       <CreditCard
        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        :size="20"
       />
      </div>
     </div>

     <div class="grid grid-cols-2 gap-4">
      <div>
       <label class="block text-sm font-bold text-slate-700 mb-1">Expiry</label>
       <input
        v-model="expiry"
        type="text"
        class="input-field text-center"
        placeholder="MM/YY"
        maxlength="5"
        required
       />
      </div>
      <div>
       <label class="block text-sm font-bold text-slate-700 mb-1">CVC</label>
       <div class="relative">
        <input
         v-model="cvc"
         type="text"
         class="input-field pl-10"
         placeholder="123"
         maxlength="3"
         required
        />
        <Lock
         class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
         :size="16"
        />
       </div>
      </div>
     </div>

     <button
      type="submit"
      class="btn btn-primary w-full py-4 text-lg shadow-lg"
      :disabled="loading"
     >
      <span
       v-if="loading"
       class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
      ></span>
      <span v-else>Pay ${{ finalPrice.toFixed(2) }} Now</span>
     </button>
    </form>

    <p class="text-center text-xs text-slate-400 mt-6">
     Powered by MockStripe. Secure Processing.
    </p>
   </div>
  </div>
 </div>
</template>

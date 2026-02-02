<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { CreditCard, Lock, ShieldCheck } from 'lucide-vue-next';

const router = useRouter();



const loading = ref(false);

const cardNumber = ref('');
const expiry = ref('');
const cvc = ref('');

const formatCard = () => {
  let v = cardNumber.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let matches = v.match(/\d{4,16}/g);
  let match = matches && matches[0] || '';
  let parts = [];
  for (let i=0, len=match.length; i<len; i+=4) {
    parts.push(match.substring(i, i+4));
  }
  if (parts.length) {
    cardNumber.value = parts.join(' ');
  } else {
    cardNumber.value = v;
  }
}

const handlePayment = async () => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    loading.value = false;
    router.push('/checkout/success');
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
    <div class="max-w-4xl w-full mx-auto px-4 grid md:grid-cols-2 gap-8">
      
      <!-- Order Summary -->
      <div class="space-y-6">
        <div>
          <h2 class="text-3xl font-bold text-slate-900 font-display mb-2">Checkout</h2>
          <p class="text-slate-500">Complete your secure transaction.</p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <h3 class="font-bold text-lg text-slate-900 mb-4">Order Summary</h3>
           <div class="flex justify-between items-center py-4 border-b border-slate-100">
             <div>
               <div class="font-bold text-slate-800">Smart Indus Premium</div>
               <div class="text-sm text-slate-500">Monthly Subscription</div>
             </div>
             <div class="font-mono text-xl text-slate-900 font-bold">$29.00</div>
           </div>
           <div class="flex justify-between items-center py-4">
             <div class="text-slate-500">Total Due</div>
             <div class="font-bold text-2xl text-primary-600">$29.00</div>
           </div>
        </div>

        <div class="flex items-center gap-4 text-sm text-slate-500 bg-white p-4 rounded-xl border border-slate-200">
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
             <label class="block text-sm font-bold text-slate-700 mb-1">Cardholder Name</label>
             <input type="text" class="input-field" placeholder="John Doe" required />
           </div>

           <div>
             <label class="block text-sm font-bold text-slate-700 mb-1">Card Number</label>
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
                <CreditCard class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
             </div>
           </div>

           <div class="grid grid-cols-2 gap-4">
              <div>
                 <label class="block text-sm font-bold text-slate-700 mb-1">Expiry</label>
                 <input v-model="expiry" type="text" class="input-field text-center" placeholder="MM/YY" maxlength="5" required />
              </div>
              <div>
                 <label class="block text-sm font-bold text-slate-700 mb-1">CVC</label>
                 <div class="relative">
                    <input v-model="cvc" type="text" class="input-field pl-10" placeholder="123" maxlength="3" required />
                    <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
                 </div>
              </div>
           </div>

           <button 
             type="submit" 
             class="btn btn-primary w-full py-4 text-lg shadow-lg"
             :disabled="loading"
            >
             <span v-if="loading" class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
             <span v-else>Pay $29.00 Now</span>
           </button>
        </form>
        
        <p class="text-center text-xs text-slate-400 mt-6">
            Powered by MockStripe. Secure Processing.
        </p>
      </div>

    </div>
  </div>
</template>

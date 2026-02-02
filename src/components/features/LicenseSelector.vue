<script setup lang="ts">
import { ref } from 'vue';
import { Check, ShieldCheck } from 'lucide-vue-next';
import type { License } from '../../types';

interface Props {
  licenses: License[];
  modelValue?: License;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const selected = ref<License>(props.licenses?.[0] || {} as License);

const selectLicense = (license: License) => {
  selected.value = license;
  emit('update:modelValue', license);
};
</script>

<template>
  <div class="grid gap-4">
    <div
      v-for="license in licenses"
      :key="license.type"
      @click="selectLicense(license)"
      :class="[
        'relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group shadow-sm',
        selected.type === license.type
          ? 'bg-[#059669] border-[#059669] shadow-lg shadow-green-900/20 scale-[1.02]'
          : 'bg-white border-slate-100 hover:border-green-200 hover:shadow-md'
      ]"
    >
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-3">
          <ShieldCheck 
            :size="20" 
            :class="selected.type === license.type ? 'text-white' : 'text-[#059669]'" 
          />
          <div>
            <h3 :class="['font-bold text-lg', selected.type === license.type ? 'text-white' : 'text-slate-900']">
              {{ license.type }} License
            </h3>
            <p :class="['text-xs font-medium uppercase tracking-wider', selected.type === license.type ? 'text-green-100' : 'text-slate-400']">
              {{ license.price === 0 ? 'Personal Use' : 'Commercial Use' }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <span :class="['text-2xl font-bold block', selected.type === license.type ? 'text-white' : 'text-slate-900']">
            {{ license.price === 0 ? 'Free' : `$${license.price}` }}
          </span>
        </div>
      </div>
      
      <ul class="space-y-2">
        <li 
          v-for="feature in license.features" 
          :key="feature"
          :class="['text-sm flex items-center gap-2.5', selected.type === license.type ? 'text-green-50' : 'text-slate-600']"
        >
          <Check :size="14" :class="selected.type === license.type ? 'text-white' : 'text-green-500'" />
          {{ feature }}
        </li>
      </ul>

      <!-- Active Indicator -->
      <div 
        v-if="selected.type === license.type"
        class="absolute -right-2 -top-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce"
      >
        <Check :size="12" class="text-[#059669] stroke-[4]" />
      </div>
    </div>
  </div>
</template>

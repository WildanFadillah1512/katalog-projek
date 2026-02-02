<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { Zap, Check } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();

const handleUpgrade = () => {
  emit('close');
  router.push('/checkout?plan=premium');
};
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="emit('close')" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all border border-slate-100">
              <div class="text-center">
                <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 mb-6 border border-amber-100 shadow-inner">
                  <Zap class="h-10 w-10 text-amber-500" aria-hidden="true" />
                </div>
                
                <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-slate-900 mb-2 font-display">
                  Unlock Premium
                </DialogTitle>
                
                <p class="text-slate-500 mb-8 leading-relaxed">
                  Get immediate access to this source code and the entire premium catalog.
                </p>

                <div class="space-y-3 bg-slate-50 rounded-2xl p-4 mb-8 text-left">
                   <div class="flex items-center gap-3">
                     <Check class="text-green-500" :size="18"/>
                     <span class="text-sm font-bold text-slate-700">Commercial License</span>
                   </div>
                   <div class="flex items-center gap-3">
                     <Check class="text-green-500" :size="18"/>
                     <span class="text-sm font-bold text-slate-700">Priority Support</span>
                   </div>
                </div>

                <div class="flex flex-col gap-3">
                  <button
                    type="button"
                    class="w-full justify-center rounded-xl border border-transparent bg-primary-600 py-4 text-lg font-bold text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all"
                    @click="handleUpgrade"
                  >
                    Upgrade Now - $29
                  </button>
                  <button
                    type="button"
                    class="w-full justify-center rounded-xl py-3 text-sm font-bold text-slate-500 hover:text-slate-700"
                    @click="emit('close')"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

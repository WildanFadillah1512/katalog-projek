<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import ToastNotification from './components/ui/ToastNotification.vue';

const route = useRoute();

const currentLayout = computed(() => {
  const layout = route.meta.layout as string || 'main';
  return layout === 'auth' ? AuthLayout : MainLayout;
});
</script>

<template>
  <div id="app">
    <component :is="currentLayout">
      <RouterView />
    </component>

    <!-- Global Toast Notifications -->
    <ToastNotification />
  </div>
</template>

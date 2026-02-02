import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Toast, ToastType } from '../types';

export const useUIStore = defineStore('ui', () => {
    // State
    const toasts = ref<Toast[]>([]);
    const isLoading = ref(false);

    // Actions
    function showToast(message: string, type: ToastType = 'info', duration: number = 3000) {
        const id = Date.now().toString();
        const toast: Toast = {
            id,
            message,
            type,
            duration,
        };

        toasts.value.push(toast);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }

    function removeToast(id: string) {
        const index = toasts.value.findIndex(t => t.id === id);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    }

    function setLoading(loading: boolean) {
        isLoading.value = loading;
    }

    // Convenience methods
    function success(message: string, duration?: number) {
        return showToast(message, 'success', duration);
    }

    function error(message: string, duration?: number) {
        return showToast(message, 'error', duration);
    }

    function info(message: string, duration?: number) {
        return showToast(message, 'info', duration);
    }

    function warning(message: string, duration?: number) {
        return showToast(message, 'warning', duration);
    }

    return {
        // State
        toasts,
        isLoading,
        // Actions
        showToast,
        removeToast,
        setLoading,
        success,
        error,
        info,
        warning,
    };
});

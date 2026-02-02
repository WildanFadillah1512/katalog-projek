import { useUIStore } from '../stores/uiStore';
import { storeToRefs } from 'pinia';

export function useToast() {
    const uiStore = useUIStore();
    const { toasts } = storeToRefs(uiStore);

    return {
        toasts,
        success: uiStore.success,
        error: uiStore.error,
        info: uiStore.info,
        warning: uiStore.warning,
        remove: uiStore.removeToast,
    };
}

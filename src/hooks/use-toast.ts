
import { useToastContext } from '@/components/ToastProvider';

/**
 * Toast notification type definition
 */
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  type?: string;
  message?: string;
}

interface ToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

/**
 * Custom hook for managing toast notifications
 */
export function useToast() {
  const context = useToastContext();
  
  return {
    toasts: context.toasts,
    toast: context.addToast, // Expose the toast function directly
    addToast: context.addToast,
    removeToast: context.removeToast,
  };
}

// Standalone toast function for easier access outside of components
export const toast = (options: ToastOptions) => {
  // This creates a custom event to trigger the toast
  const event = new CustomEvent('toast', { detail: options });
  window.dispatchEvent(event);
};

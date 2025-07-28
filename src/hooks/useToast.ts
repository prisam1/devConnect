import { toast } from 'sonner';

interface ToastOptions {
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void; 
}
 
type SonnerToastReturn = string | number | { unwrap: () => Promise<unknown> };

interface UseToast {
  /** Displays a default toast message. */
  default: (message: string, options?: ToastOptions) => SonnerToastReturn;
  /** Displays a success toast message. */
  success: (message: string, options?: ToastOptions) => SonnerToastReturn;
  /** Displays an error toast message. */
  error: (message: string, options?: ToastOptions) => SonnerToastReturn;
  /** Displays an info toast message. */
  info: (message: string, options?: ToastOptions) => SonnerToastReturn;
  /** Displays a warning toast message. */
  warning: (message: string, options?: ToastOptions) => SonnerToastReturn;
  /** Displays a toast for a promise, showing loading, success, and error states. */
  promise: <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    options?: ToastOptions
  ) => SonnerToastReturn; 
  dismiss: () => void;
}

export const useToast = (): UseToast => {
  const defaultToastOptions: ToastOptions = {
    duration: 3000,
  };

  const showToast = (type: 'default' | 'success' | 'error' | 'info' | 'warning', message: string, options?: ToastOptions): SonnerToastReturn => {
    const mergedOptions = { ...defaultToastOptions, ...options };

    switch (type) {
      case 'success':
        return toast.success(message, mergedOptions);
      case 'error':
        return toast.error(message, mergedOptions);
      case 'info':
        return toast.info(message, mergedOptions);
      case 'warning':
        return toast.warning(message, mergedOptions);
      default:
        return toast(message, mergedOptions);
    }
  };

  const showPromiseToast = <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    options?: ToastOptions
  ): SonnerToastReturn => {  
    const mergedOptions = { ...defaultToastOptions, ...options };
    return toast.promise(promise, {
      loading: msgs.loading,
      success: msgs.success,
      error: msgs.error,
      ...mergedOptions,
    });
  };

  const dismissAllToasts = () => {
    toast.dismiss();
  };

  return {
    default: (message, options) => showToast('default', message, options),
    success: (message, options) => showToast('success', message, options),
    error: (message, options) => showToast('error', message, options),
    info: (message, options) => showToast('info', message, options),
    warning: (message, options) => showToast('warning', message, options),
    promise: showPromiseToast,
    dismiss: dismissAllToasts,
  };
};
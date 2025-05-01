
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toast } from '@/hooks/use-toast';

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, ...toast };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto dismiss after timeout
    setTimeout(() => {
      removeToast(id);
    }, 5000);
    
    return id;
  };

  // Listen for custom toast events
  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<Omit<Toast, 'id'>>) => {
      addToast(event.detail);
    };

    window.addEventListener('toast' as any, handleToastEvent as EventListener);
    
    return () => {
      window.removeEventListener('toast' as any, handleToastEvent as EventListener);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className="toast-container"
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              background: toast.type === 'error' ? '#f56565' : '#48bb78',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

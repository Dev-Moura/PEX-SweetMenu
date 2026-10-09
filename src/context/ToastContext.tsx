import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ToastContext,
  type ToastContextValue,
} from "./toast-context";

interface Toast {
  id: number;
  message: string;
  emoji: string;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback<ToastContextValue["showToast"]>(
    (message, emoji = "✅") => {
      const id = (nextId.current += 1);
      setToasts((current) => [...current, { id, message, emoji }]);
      window.setTimeout(() => dismiss(id), 2600);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex animate-pop items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-white shadow-card"
          >
            <span aria-hidden>{toast.emoji}</span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

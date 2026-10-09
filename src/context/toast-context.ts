import { createContext } from "react";

export interface ToastContextValue {
  showToast: (message: string, emoji?: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

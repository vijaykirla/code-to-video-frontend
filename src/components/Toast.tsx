import React, { useEffect } from "react";
import type { Toast as ToastType } from "../types";

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: "✅",
    error: "❌",
    info: "📘",
  };

  const bgColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`${bgColors[toast.type]} rounded-xl shadow-2xl p-4 max-w-sm animate-slide-up`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icons[toast.type]}</div>
        <div className="flex-1">
          <p className="font-semibold text-white">{toast.title}</p>
          <p className="text-sm text-white/90 mt-1">{toast.message}</p>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

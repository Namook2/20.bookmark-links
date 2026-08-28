"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div className="rounded-full bg-[var(--error)] px-5 py-3 text-sm font-medium text-white shadow-xl">
        {message}
      </div>
    </div>
  );
}

// src/hooks/useToast.js

import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description }) => {
    const id = Date.now();
    const newToast = { id, title, description };
    setToasts((prev) => [...prev, newToast]);

    // Automatically remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return {
    toast,
    toasts,
  };
}

"use client";

import { useState } from "react";

export function useNotification() {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const hideNotification = () => setNotification(null);

  return { notification, showNotification, hideNotification };
}

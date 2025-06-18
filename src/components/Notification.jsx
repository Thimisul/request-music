"use client";

import { CheckCircle, AlertCircle, X } from "lucide-react";

export function Notification({ notification, onClose }) {
  if (!notification) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
        notification.type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {notification.type === "success" ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span className="font-medium">{notification.message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-black/20 rounded-full p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

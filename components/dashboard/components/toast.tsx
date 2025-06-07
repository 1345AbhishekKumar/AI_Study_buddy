// app/dash/components/toast.tsx
'use client';

import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';

// --- Toast Component --- //
interface ToastProps {
  message: string;
  show: boolean;
  type?: 'success' | 'info' | 'error' | 'warning';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, type = 'info', onClose }) => {
  if (!show) return null;

  let bgColor = 'bg-sky-500'; // info
  let iconColor = 'text-sky-100';
  let Icon = Lightbulb;

  if (type === 'success') {
    bgColor = 'bg-teal-500';
    iconColor = 'text-teal-100';
    Icon = CheckCircle2;
  }
  if (type === 'error') {
    bgColor = 'bg-red-500';
    iconColor = 'text-red-100';
    Icon = AlertTriangle;
  }
  if (type === 'warning') {
    bgColor = 'bg-amber-500';
    iconColor = 'text-amber-100';
    Icon = AlertTriangle;
  }

  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColor} text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 ease-out animate-slideInUp z-[100]`}
    >
      <Icon size={22} className={iconColor} />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close notification"
      >
        <Plus size={18} className="rotate-45" />
      </button>
    </div>
  );
};

export default Toast;

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#121217] text-white text-xs font-bold rounded-2xl shadow-[0_0_25px_rgba(255,45,120,0.35)] border border-pink-500/50 animate-slideUp">
      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors ml-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

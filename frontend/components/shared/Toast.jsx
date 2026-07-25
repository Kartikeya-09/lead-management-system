'use client';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colorMap = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconColorMap = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

const Toast = ({ toasts = [], onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-right ${colorMap[toast.type] || colorMap.info}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColorMap[toast.type] || iconColorMap.info}`} />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => onDismiss(toast.id)} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;

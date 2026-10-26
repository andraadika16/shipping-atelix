'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface TrackingErrorProps {
  message: string;
  onRetry: () => void;
}

export const TrackingError: React.FC<TrackingErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full rounded-2xl border border-[#B87516]/40 bg-[#171719] p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-[#B87516]/15 border border-[#B87516]/30 flex items-center justify-center text-[#B87516] shadow-[0_0_24px_rgba(184,117,22,0.3)] mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F7]">
        Kendala Komunikasi Jaringan
      </h3>

      <p className="mt-2 text-sm text-[#A4A5AA] max-w-md leading-relaxed">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#547BFF] hover:bg-[#547BFF]/90 text-white text-sm font-semibold transition-all duration-200 shadow-[0_4px_16px_rgba(84,123,255,0.3)] active:scale-95 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Coba Lagi</span>
      </button>
    </div>
  );
};

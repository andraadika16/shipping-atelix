'use client';

import React from 'react';
import { PackageX, Sparkles, Search } from 'lucide-react';
import { APP_CONFIG } from '@/constants/tracking.constants';

interface TrackingNotFoundProps {
  searchedCode: string;
  onUseDemoCode: (demoCode: string) => void;
}

export const TrackingNotFound: React.FC<TrackingNotFoundProps> = ({
  searchedCode,
  onUseDemoCode,
}) => {
  return (
    <div className="w-full rounded-2xl border border-[#B84545]/40 bg-[#171719] p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center">
      {/* Icon Container with subtle red glow */}
      <div className="w-16 h-16 rounded-2xl bg-[#B84545]/15 border border-[#B84545]/30 flex items-center justify-center text-[#B84545] shadow-[0_0_24px_rgba(184,69,69,0.3)] mb-6">
        <PackageX className="w-8 h-8" />
      </div>

      {/* Headings */}
      <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F7]">
        Nomor Resi Tidak Ditemukan
      </h3>

      <p className="mt-2 text-sm text-[#A4A5AA] max-w-md leading-relaxed">
        Resi <span className="font-mono font-bold text-[#F5F5F7] px-1.5 py-0.5 rounded bg-[#232326]">{searchedCode}</span> tidak terdaftar dalam logistik ATELIX. Pastikan format nomor resi sudah tepat atau hubungi pengirim Anda.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onUseDemoCode(APP_CONFIG.DEMO_TRACKING_CODE)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#547BFF] hover:bg-[#547BFF]/90 text-white text-sm font-semibold transition-all duration-200 shadow-[0_4px_16px_rgba(84,123,255,0.3)] active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Gunakan Resi Demo ({APP_CONFIG.DEMO_TRACKING_CODE})</span>
        </button>

        <a
          href={APP_CONFIG.STOREFRONT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#232326] hover:bg-[#303034] border border-[#303034] text-[#F5F5F7] text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          <span>Pusat Bantuan Storefront</span>
        </a>
      </div>
    </div>
  );
};

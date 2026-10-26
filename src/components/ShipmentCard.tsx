'use client';

import React, { useState } from 'react';
import { Copy, Check, Truck, Calendar, ShieldCheck } from 'lucide-react';
import { TrackingResponseDTO } from '@/types/tracking.types';
import { resolveStatusStyle } from '@/utils/status';
import { formatEstimatedDate } from '@/utils/date';

interface ShipmentCardProps {
  data: TrackingResponseDTO;
}

export const ShipmentCard: React.FC<ShipmentCardProps> = ({ data }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const statusStyle = resolveStatusStyle(data.status);
  const formattedEstimatedDate = formatEstimatedDate(data.estimatedDelivery);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.trackingCode);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = data.trackingCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8 shadow-2xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#303034]">
        {/* Left Side: Tracking Code & Carrier */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#A4A5AA] font-medium">
              Nomor Resi Pengiriman
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#232326] text-[#A4A5AA]">
              <ShieldCheck className="w-3 h-3 text-[#547BFF]" />
              Terverifikasi
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-[#F5F5F7]">
              {data.trackingCode}
            </h2>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#232326] hover:bg-[#303034] border border-[#303034] text-xs font-medium text-[#F5F5F7] transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Salin nomor resi"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2C8B66]" />
                  <span className="text-[#2C8B66] font-semibold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#A4A5AA]" />
                  <span>Salin Resi</span>
                </>
              )}
            </button>
          </div>

          {/* Carrier Info */}
          <div className="flex items-center gap-2 text-sm text-[#A4A5AA] mt-1">
            <Truck className="w-4 h-4 text-[#547BFF]" />
            <span>Ekspedisi:</span>
            <span className="font-semibold text-[#F5F5F7]">{data.carrier}</span>
          </div>
        </div>

        {/* Right Side: Status Badge & Estimated Delivery */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
          {/* Semantic Status Badge */}
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${statusStyle.bgColor} ${statusStyle.borderColor} ${statusStyle.glowColor} transition-all`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                data.status === 'DELIVERED'
                  ? 'bg-[#2C8B66]'
                  : data.status === 'FAILED_ATTEMPT'
                  ? 'bg-[#B87516]'
                  : 'bg-[#547BFF] animate-pulse'
              }`}
            />
            <span className={`text-sm font-bold tracking-tight ${statusStyle.textColor}`}>
              {statusStyle.label}
            </span>
          </div>

          {/* Estimated Delivery Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#232326] border border-[#303034]">
            <Calendar className="w-4 h-4 text-[#A4A5AA]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#A4A5AA] font-medium leading-none">
                Estimasi Tiba
              </span>
              <span className="text-sm font-semibold text-[#F5F5F7] mt-0.5">
                {formattedEstimatedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

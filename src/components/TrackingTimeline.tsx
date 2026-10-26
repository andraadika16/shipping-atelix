'use client';

import React from 'react';
import { MapPin, Clock, History, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { TrackingEventDTO } from '@/types/tracking.types';
import { formatEventDateTimeWIB } from '@/utils/date';
import { resolveStatusStyle } from '@/utils/status';

interface TrackingTimelineProps {
  events: TrackingEventDTO[];
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-8 text-center text-[#A4A5AA]">
        <History className="w-8 h-8 mx-auto mb-2 text-[#547BFF] opacity-60" />
        <p className="text-sm font-medium">Belum ada riwayat pergerakan paket tercatat.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#303034]">
        <div className="flex items-center gap-2.5">
          <History className="w-5 h-5 text-[#547BFF]" />
          <h3 className="text-base sm:text-lg font-bold text-[#F5F5F7]">
            Riwayat Pergerakan Logistik
          </h3>
        </div>
        <span className="text-xs text-[#A4A5AA]">
          {events.length} Riwayat Tercatat
        </span>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-8">
        {/* Continuous Connecting Line */}
        <div className="absolute top-3 bottom-4 left-[11px] sm:left-[15px] w-[2px] bg-[#303034]" />

        <div className="flex flex-col gap-8">
          {events.map((event, index) => {
            const isLatest = index === 0;
            const statusStyle = resolveStatusStyle(event.status);
            const formattedTime = formatEventDateTimeWIB(event.eventAt);

            return (
              <div key={`${event.eventAt}-${index}`} className="relative group">
                {/* Timeline Node Circle */}
                <div
                  className={`absolute -left-[23px] sm:-left-[27px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 z-10 ${
                    isLatest
                      ? 'bg-[#171719] border-[#547BFF] ring-4 ring-[#547BFF]/20 shadow-[0_0_12px_rgba(84,123,255,0.4)]'
                      : 'bg-[#171719] border-[#303034] group-hover:border-[#A4A5AA]'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isLatest ? 'bg-[#547BFF] animate-pulse' : 'bg-[#A4A5AA]'
                    }`}
                  />
                </div>

                {/* Event Content Card */}
                <div className="flex flex-col gap-2 p-4 sm:p-5 rounded-xl bg-[#232326]/60 border border-[#303034] hover:border-[#547BFF]/30 transition-all duration-200">
                  {/* Timestamp & Status Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#A4A5AA]">
                      <Clock className="w-3.5 h-3.5 text-[#547BFF]" />
                      <time className="font-medium text-[#F5F5F7]">
                        {formattedTime}
                      </time>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle.bgColor} ${statusStyle.borderColor} ${statusStyle.textColor}`}
                    >
                      {statusStyle.label}
                    </span>
                  </div>

                  {/* Hub / Location Label */}
                  {event.locationLabel && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#547BFF]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.locationLabel}</span>
                    </div>
                  )}

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-[#A4A5AA] leading-relaxed pt-1">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';

export const TrackingSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse" aria-busy="true" aria-label="Memuat data pengiriman">
      {/* ShipmentCard Skeleton */}
      <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#303034]">
          <div className="flex flex-col gap-3">
            <div className="h-4 w-32 bg-[#232326] rounded-md" />
            <div className="h-8 w-64 bg-[#232326] rounded-lg" />
            <div className="h-4 w-40 bg-[#232326] rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-36 bg-[#232326] rounded-xl" />
            <div className="h-10 w-44 bg-[#232326] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Stepper Skeleton */}
      <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8">
        <div className="h-5 w-48 bg-[#232326] rounded-md mb-8" />
        <div className="hidden md:flex justify-between items-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#232326]" />
              <div className="h-3 w-20 bg-[#232326] rounded" />
              <div className="h-2 w-16 bg-[#232326] rounded" />
            </div>
          ))}
        </div>
        <div className="flex md:hidden flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#232326]" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-32 bg-[#232326] rounded" />
                <div className="h-2.5 w-48 bg-[#232326] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8">
        <div className="h-5 w-56 bg-[#232326] rounded-md mb-6" />
        <div className="flex flex-col gap-6 pl-6 sm:pl-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-[#232326]/50 border border-[#303034]">
              <div className="flex justify-between items-center">
                <div className="h-4 w-40 bg-[#232326] rounded" />
                <div className="h-4 w-24 bg-[#232326] rounded-full" />
              </div>
              <div className="h-3 w-48 bg-[#232326] rounded" />
              <div className="h-3 w-full bg-[#232326] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

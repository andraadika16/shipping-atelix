'use client';

import React from 'react';
import {
  PackageCheck,
  Truck,
  ArrowRightLeft,
  Bike,
  CheckCircle2,
  Check,
  LucideIcon,
} from 'lucide-react';
import { TrackingStatus } from '@/types/tracking.types';
import { STEPPER_STEPS } from '@/constants/tracking.constants';
import { resolveActiveStepIndex } from '@/utils/status';

interface TrackingStepperProps {
  status: TrackingStatus;
}

// Icon dictionary matching StepperStepConfig
const ICON_MAP: Record<string, LucideIcon> = {
  PackageCheck,
  Truck,
  ArrowRightLeft,
  Bike,
  CheckCircle2,
};

export const TrackingStepper: React.FC<TrackingStepperProps> = ({ status }) => {
  const activeStep = resolveActiveStepIndex(status);
  const isDelivered = status.toUpperCase().trim() === 'DELIVERED';

  return (
    <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#F5F5F7]">
            Tahapan Pengiriman
          </h3>
          <p className="text-xs text-[#A4A5AA] mt-0.5">
            Langkah {activeStep} dari 5 dalam alur pemenuhan pesanan
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isDelivered
              ? 'bg-[#2C8B66]/20 text-[#2C8B66] border border-[#2C8B66]/40'
              : 'bg-[#547BFF]/20 text-[#547BFF] border border-[#547BFF]/40'
          }`}
        >
          {isDelivered ? 'Pengiriman Selesai' : 'Sedang Berlangsung'}
        </span>
      </div>

      {/* Stepper Container */}
      <div className="relative">
        {/* Desktop / Tablet Stepper (Horizontal) */}
        <div className="hidden md:flex items-start justify-between relative">
          {STEPPER_STEPS.map((step, index) => {
            const Icon = ICON_MAP[step.iconName] || PackageCheck;
            const isCompleted = step.stepIndex < activeStep;
            const isCurrent = step.stepIndex === activeStep;
            const isUpcoming = step.stepIndex > activeStep;

            return (
              <div
                key={step.stepIndex}
                className="flex-1 flex flex-col items-center relative group"
              >
                {/* Connecting Line to next step */}
                {index < STEPPER_STEPS.length - 1 && (
                  <div
                    className={`absolute top-6 -translate-y-1/2 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] z-0 transition-colors duration-300 ${
                      isCompleted
                        ? isDelivered
                          ? 'bg-[#2C8B66]'
                          : 'bg-[#547BFF]'
                        : 'bg-[#303034]'
                    }`}
                  />
                )}

                {/* Step Circle Node */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? isDelivered
                        ? 'bg-[#2C8B66] text-white ring-4 ring-[#2C8B66]/20 shadow-[0_0_20px_rgba(44,139,102,0.4)]'
                        : 'bg-[#547BFF] text-white ring-4 ring-[#547BFF]/25 shadow-[0_0_20px_rgba(84,123,255,0.4)] animate-pulse'
                      : isCompleted
                      ? isDelivered
                        ? 'bg-[#142920] text-[#2C8B66] border border-[#2C8B66]/50 shadow-sm'
                        : 'bg-[#18233C] text-[#547BFF] border border-[#547BFF]/50 shadow-sm'
                      : 'bg-[#232326] text-[#A4A5AA] border border-[#303034]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Step Labels */}
                <div className="mt-3.5 text-center px-1">
                  <span
                    className={`block text-xs sm:text-sm font-semibold transition-colors ${
                      isCurrent || isCompleted ? 'text-[#F5F5F7]' : 'text-[#A4A5AA]'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="block text-[11px] text-[#A4A5AA] mt-0.5 leading-snug max-w-[120px]">
                    {step.subLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper (Vertical Stack) */}
        <div className="flex md:hidden flex-col gap-4 relative pl-3">
          {/* Vertical Connecting Line */}
          <div className="absolute top-6 bottom-6 left-[30px] -translate-x-1/2 w-[2px] bg-[#303034] z-0" />

          {STEPPER_STEPS.map((step) => {
            const Icon = ICON_MAP[step.iconName] || PackageCheck;
            const isCompleted = step.stepIndex < activeStep;
            const isCurrent = step.stepIndex === activeStep;

            return (
              <div
                key={step.stepIndex}
                className="flex items-center gap-4 relative z-10"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isCurrent
                      ? isDelivered
                        ? 'bg-[#2C8B66] text-white ring-4 ring-[#2C8B66]/20'
                        : 'bg-[#547BFF] text-white ring-4 ring-[#547BFF]/25 animate-pulse'
                      : isCompleted
                      ? isDelivered
                        ? 'bg-[#142920] text-[#2C8B66] border border-[#2C8B66]/50 shadow-sm'
                        : 'bg-[#18233C] text-[#547BFF] border border-[#547BFF]/50 shadow-sm'
                      : 'bg-[#232326] text-[#A4A5AA] border border-[#303034]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      isCurrent || isCompleted ? 'text-[#F5F5F7]' : 'text-[#A4A5AA]'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-xs text-[#A4A5AA]">{step.subLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

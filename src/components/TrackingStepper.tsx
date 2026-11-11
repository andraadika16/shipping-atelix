'use client';

import React from 'react';
import {
  PackageCheck,
  Truck,
  ArrowRightLeft,
  Bike,
  CheckCircle2,
  Check,
  ChevronDown,
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
  const [showAllMobile, setShowAllMobile] = React.useState(false);
  const activeStep = resolveActiveStepIndex(status);
  const isDelivered = status.toUpperCase().trim() === 'DELIVERED';
  const solidColor = isDelivered ? '#2C8B66' : '#547BFF';

  // For mobile view: show previous, active, and next stage by default
  const visibleMobileSteps = React.useMemo(() => {
    if (showAllMobile || isDelivered) {
      return STEPPER_STEPS;
    }
    let startIdx = Math.max(0, activeStep - 2);
    let endIdx = Math.min(STEPPER_STEPS.length, activeStep + 1);

    // Keep at least 3 items in window when possible
    if (endIdx - startIdx < 3) {
      if (startIdx === 0) {
        endIdx = Math.min(STEPPER_STEPS.length, 3);
      } else if (endIdx === STEPPER_STEPS.length) {
        startIdx = Math.max(0, STEPPER_STEPS.length - 3);
      }
    }

    return STEPPER_STEPS.slice(startIdx, endIdx);
  }, [showAllMobile, isDelivered, activeStep]);

  return (
    <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-4 sm:p-6 md:p-8 shadow-2xl">
      {/* Stepper Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-6 md:mb-8">
        <div className="w-full md:w-auto">
          <h3 className="text-base sm:text-lg font-bold text-[#F5F5F7]">
            Tahapan Pengiriman
          </h3>
          <p className="text-xs text-[#A4A5AA] mt-0.5 w-full">
            Langkah {activeStep} dari 5 dalam alur pemenuhan pesanan
          </p>
        </div>
        <span
          className={`self-start md:self-auto whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold ${
            isDelivered
              ? 'bg-[#2C8B66]/20 text-[#2C8B66] border border-[#2C8B66]/40'
              : 'bg-[#547BFF]/20 text-[#547BFF] border border-[#547BFF]/40'
          }`}
        >
          {isDelivered ? 'Pengiriman Selesai' : 'Sedang Berlangsung'}
        </span>

        {/* Mobile-only Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1 md:hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isDelivered ? 'bg-[#2C8B66]' : 'bg-[#547BFF]'
            }`}
            style={{ width: `${(activeStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Stepper Container */}
      <div className="relative">
        {/* Desktop / Tablet Stepper (Horizontal: md screens >= 768px) */}
        <div className="hidden md:flex items-start justify-between relative">
          {STEPPER_STEPS.map((step, index) => {
            const Icon = ICON_MAP[step.iconName] || PackageCheck;
            const isCompleted = step.stepIndex < activeStep;
            const isCurrent = step.stepIndex === activeStep;
            const isLineSolid = isDelivered || step.stepIndex < activeStep;

            return (
              <div
                key={step.stepIndex}
                className="flex-1 flex flex-col items-center relative group"
              >
                {/* Connecting Line to next step */}
                {index < STEPPER_STEPS.length - 1 && (
                  <div
                    className="absolute top-6 -translate-y-1/2 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] z-0 transition-all duration-300"
                    style={{
                      background: isLineSolid
                        ? solidColor
                        : 'repeating-linear-gradient(to right, rgba(255, 255, 255, 0.15) 0 6px, transparent 6px 12px)',
                    }}
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

        {/* Mobile Stepper (Vertical Stack: screens < 768px) */}
        <div className="flex md:hidden flex-col relative pl-1">
          {visibleMobileSteps.map((step, idx) => {
            const Icon = ICON_MAP[step.iconName] || PackageCheck;
            const isCompleted = step.stepIndex < activeStep;
            const isCurrent = step.stepIndex === activeStep;
            const isUpcoming = step.stepIndex > activeStep;
            const isLineSolid = isDelivered || step.stepIndex < activeStep;

            return (
              <div
                key={step.stepIndex}
                className={`relative flex items-start gap-3.5 pb-4 last:pb-0 transition-opacity duration-300 ${
                  isUpcoming ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {/* Vertical Connecting Line to next step (seamless from bottom of this icon to top of next icon) */}
                {idx < visibleMobileSteps.length - 1 && (
                  <div
                    className="absolute left-[18px] -translate-x-1/2 top-9 bottom-0 w-[2px] z-0 transition-all duration-300"
                    style={{
                      background: isLineSolid
                        ? solidColor
                        : 'repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0 6px, transparent 6px 12px)',
                    }}
                  />
                )}

                {/* Node Icon */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isCurrent
                      ? isDelivered
                        ? 'bg-[#2C8B66] text-white ring-4 ring-[#2C8B66]/25 animate-pulse-glow-success'
                        : 'bg-[#547BFF] text-white ring-4 ring-[#547BFF]/25 animate-pulse-glow'
                      : isCompleted
                      ? isDelivered
                        ? 'bg-[#142920] text-[#2C8B66] border border-[#2C8B66]/50 shadow-sm'
                        : 'bg-[#547BFF]/20 text-[#547BFF] border border-[#547BFF]/50 shadow-sm'
                      : 'bg-[#232326] text-[#A4A5AA] border border-[#303034]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Labels */}
                <div className="flex flex-col pt-1 pb-0.5">
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isCurrent
                        ? 'font-bold text-[#F5F5F7]'
                        : isCompleted
                        ? 'font-semibold text-[#F5F5F7]'
                        : 'font-medium text-[#F5F5F7]/70'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`text-xs mt-0.5 leading-snug transition-colors duration-300 ${
                      isCurrent
                        ? 'text-white/80'
                        : isCompleted
                        ? 'text-white/60'
                        : 'text-white/40'
                    }`}
                  >
                    {step.subLabel}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Mobile View All / Compact Toggle */}
          {!isDelivered && (
            <div className="pt-2 pl-[38px]">
              <button
                type="button"
                onClick={() => setShowAllMobile((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#547BFF] hover:text-[#547BFF]/80 transition-colors cursor-pointer py-1"
              >
                <span>
                  {showAllMobile
                    ? 'Sembunyikan tahap lainnya'
                    : `Lihat semua ${STEPPER_STEPS.length} tahap`}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showAllMobile ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

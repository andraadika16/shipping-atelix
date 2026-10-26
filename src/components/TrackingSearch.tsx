'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { APP_CONFIG, HERO_CONFIG } from '@/constants/tracking.constants';

interface TrackingSearchProps {
  initialCode?: string;
  isLoading: boolean;
  onSearch: (trackingCode: string) => void;
}

export const TrackingSearch: React.FC<TrackingSearchProps> = ({
  initialCode = '',
  isLoading,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState<string>(initialCode);

  useEffect(() => {
    if (initialCode) {
      setInputValue(initialCode.toUpperCase());
    }
  }, [initialCode]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim().toUpperCase();
    if (trimmed && !isLoading) {
      onSearch(trimmed);
    }
  };

  const handleQuickSampleClick = (sampleCode: string) => {
    setInputValue(sampleCode);
    if (!isLoading) {
      onSearch(sampleCode);
    }
  };

  return (
    <section className="w-full py-10 sm:py-16 flex flex-col items-center text-center">
      {/* Top Engine Badge */}
      <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#171719] border border-[#303034] text-xs text-[#A4A5AA] mb-4">
        <span className="font-medium text-[#F5F5F7]">{HERO_CONFIG.BADGE}</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F5F7] max-w-3xl leading-[1.15]">
        {HERO_CONFIG.TITLE}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-sm sm:text-base text-[#A4A5AA] max-w-xl mx-auto leading-relaxed">
        {HERO_CONFIG.SUBTITLE}
      </p>

      {/* Search Bar Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mt-8 sm:mt-10"
      >
        <div className="relative flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-[#171719] border border-[#303034] focus-within:border-[#547BFF] focus-within:ring-2 focus-within:ring-[#547BFF]/25 shadow-2xl transition-all duration-200">
          {/* Input with Search Icon */}
          <div className="relative flex-1 w-full flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#A4A5AA] pointer-events-none" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              placeholder={HERO_CONFIG.SEARCH_PLACEHOLDER}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#F5F5F7] placeholder-[#A4A5AA] font-mono font-medium text-sm sm:text-base rounded-xl focus:outline-none tracking-wide"
              autoComplete="off"
              spellCheck="false"
              disabled={isLoading}
            />
          </div>

          {/* CTA Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#547BFF] hover:bg-[#547BFF]/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_16px_rgba(84,123,255,0.35)] shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Mencari...</span>
              </>
            ) : (
              <>
                <span>{HERO_CONFIG.BUTTON_TEXT}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Sample Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-[#A4A5AA]">{HERO_CONFIG.SAMPLE_LABEL}</span>
        <button
          type="button"
          onClick={() => handleQuickSampleClick(APP_CONFIG.DEMO_TRACKING_CODE)}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#232326] hover:bg-[#303034] border border-[#303034] hover:border-[#547BFF]/40 text-[#547BFF] font-mono font-medium transition-colors cursor-pointer disabled:opacity-50"
        >
          <span>{APP_CONFIG.DEMO_TRACKING_CODE}</span>
        </button>
        <button
          type="button"
          onClick={() => handleQuickSampleClick(APP_CONFIG.DEMO_TRACKING_ALIAS)}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#232326] hover:bg-[#303034] border border-[#303034] hover:border-[#547BFF]/40 text-[#A4A5AA] hover:text-[#F5F5F7] font-mono font-medium transition-colors cursor-pointer disabled:opacity-50"
        >
          <span>{APP_CONFIG.DEMO_TRACKING_ALIAS}</span>
        </button>
      </div>
    </section>
  );
};

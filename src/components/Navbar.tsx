'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Box, Activity } from 'lucide-react';
import { APP_CONFIG } from '@/constants/tracking.constants';

export const Navbar: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Monitor online network status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#303034]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#547BFF] rounded-lg p-1 transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#171719] to-[#232326] border border-[#303034] flex items-center justify-center text-[#547BFF] group-hover:border-[#547BFF]/50 group-hover:shadow-[0_0_15px_rgba(84,123,255,0.3)] transition-all">
            <Box className="w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">
                {APP_CONFIG.BRAND_NAME}
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#547BFF]/15 text-[#547BFF] border border-[#547BFF]/30">
                Tracking
              </span>
            </div>
            <span className="text-[11px] text-[#A4A5AA] leading-none -mt-0.5 hidden sm:block">
              {APP_CONFIG.BRAND_SUBTITLE}
            </span>
          </div>
        </Link>

        {/* Right Actions: API Status & Storefront Link */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live API Server Status Indicator */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#171719] border border-[#303034] text-xs text-[#A4A5AA]"
            title={isOnline ? 'Terhubung dengan Core API ATELIX' : 'Koneksi jaringan terputus'}
          >
            <span className="relative flex h-2 w-2">
              {isOnline && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2C8B66] opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isOnline ? 'bg-[#2C8B66]' : 'bg-[#B84545]'
                }`}
              ></span>
            </span>
            <span className="hidden md:inline font-medium text-[11px] text-[#F5F5F7]">
              {isOnline ? 'API Server: Connected' : 'Offline'}
            </span>
          </div>

          {/* External Link to Storefront */}
          <a
            href={APP_CONFIG.STOREFRONT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-[#F5F5F7] bg-[#171719] hover:bg-[#232326] border border-[#303034] hover:border-[#547BFF]/50 px-3 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#547BFF]"
          >
            <span>Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#A4A5AA]" />
          </a>
        </div>
      </div>
    </header>
  );
};

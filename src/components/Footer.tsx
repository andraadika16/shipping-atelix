'use client';

import React from 'react';
import { ExternalLink, Box, Heart } from 'lucide-react';
import { APP_CONFIG } from '@/constants/tracking.constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#303034] bg-[#0B0B0C] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A4A5AA]">
        {/* Left: Brand info */}
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-[#547BFF]" />
          <span className="font-semibold text-[#F5F5F7]">{APP_CONFIG.BRAND_NAME}</span>
          <span>&copy; {APP_CONFIG.YEAR}</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>

        {/* Center / Right Links */}
        <div className="flex items-center gap-4">
          <a
            href={APP_CONFIG.STOREFRONT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#A4A5AA] hover:text-[#F5F5F7] transition-colors"
          >
            <span>Kunjungi Storefront ATELIX</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

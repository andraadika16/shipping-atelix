'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package, ChevronDown } from 'lucide-react';
import { PackageItemDTO } from '@/types/tracking.types';
import {
  DEFAULT_MOCK_PACKAGE_ITEMS,
  DEFAULT_MOCK_ORDER_NUMBER,
} from '@/data/mockPackageItems';

interface PackageContentsCardProps {
  items?: PackageItemDTO[];
  orderNumber?: string;
}

interface ItemThumbnailProps {
  src?: string;
  alt: string;
}

const ItemThumbnail: React.FC<ItemThumbnailProps> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-lg border border-[#303034] bg-white/5 flex items-center justify-center shrink-0"
        aria-label={alt}
      >
        <Package className="w-6 h-6 text-[#A4A5AA]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg border border-[#303034] bg-white/5 relative shrink-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        loading="lazy"
        unoptimized
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const PackageContentsCard: React.FC<PackageContentsCardProps> = ({
  items,
  orderNumber,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // TODO: Replace fallback mock data once live backend API provides `items` and `orderNumber`
  const activeItems = items && items.length > 0 ? items : DEFAULT_MOCK_PACKAGE_ITEMS;
  const activeOrderNumber = orderNumber || DEFAULT_MOCK_ORDER_NUMBER;

  const totalQuantity = activeItems.reduce(
    (sum, item) => sum + (item.quantity > 0 ? item.quantity : 1),
    0
  );

  const isCollapsible = activeItems.length > 3;
  const visibleItems = isCollapsible && !isExpanded ? activeItems.slice(0, 3) : activeItems;
  const remainingCount = activeItems.length - 3;

  return (
    <div className="w-full rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8 shadow-2xl transition-all duration-200 hover:border-[#547BFF]/40 motion-reduce:transition-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#303034]">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base sm:text-lg font-bold text-[#F5F5F7]">
            Isi Paket
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#232326] text-[#A4A5AA] border border-[#303034]">
            {totalQuantity} barang
          </span>
        </div>

        {activeOrderNumber && (
          <div className="flex items-center gap-1.5 text-xs text-[#A4A5AA] font-mono">
            <span className="text-white/40">No. Pesanan:</span>
            <span className="text-[#F5F5F7] font-semibold tracking-wide">
              {activeOrderNumber}
            </span>
          </div>
        )}
      </div>

      {/* Package Items List */}
      <ul className="divide-y divide-[#303034]/60" role="list">
        {visibleItems.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className="flex items-center justify-between gap-4 py-4 first:pt-4 last:pb-0"
          >
            {/* Left: Thumbnail + Item Details */}
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <ItemThumbnail src={item.imageUrl} alt={item.name} />

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-[#F5F5F7] line-clamp-2 leading-snug">
                  {item.name}
                </span>
                {item.variant && (
                  <span className="text-xs text-white/60 mt-0.5 line-clamp-1">
                    {item.variant}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Quantity */}
            <div className="shrink-0 pl-2">
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#A4A5AA]">
                x{item.quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Expand / Collapse Button if more than 3 items */}
      {isCollapsible && (
        <div className="pt-4 border-t border-[#303034]/40 mt-4">
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#547BFF] hover:text-[#547BFF]/80 transition-colors cursor-pointer py-1 motion-reduce:transition-none"
          >
            <span>
              {isExpanded
                ? 'Tampilkan lebih sedikit'
                : `Lihat ${remainingCount} barang lainnya`}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};


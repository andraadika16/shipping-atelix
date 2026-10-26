'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { TrackingSearch } from '@/components/TrackingSearch';
import { ShipmentCard } from '@/components/ShipmentCard';
import { TrackingStepper } from '@/components/TrackingStepper';
import { TrackingTimeline } from '@/components/TrackingTimeline';
import { TrackingSkeleton } from '@/components/TrackingSkeleton';
import { TrackingNotFound } from '@/components/TrackingNotFound';
import { TrackingError } from '@/components/TrackingError';
import { Footer } from '@/components/Footer';
import { useTracking } from '@/hooks/useTracking';

function TrackingPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, data, errorMessage, activeCode, fetchTracking } = useTracking();

  // Handle deep-linking: ?code=XYZ on initial load
  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam && codeParam.trim()) {
      fetchTracking(codeParam.trim());
    }
  }, [searchParams, fetchTracking]);

  const handleSearch = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    // Update query param seamlessly for easy link sharing
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('code', trimmed);
    router.replace(`?${newParams.toString()}`, { scroll: false });

    fetchTracking(trimmed);
  };

  const handleDemoSearch = (demoCode: string) => {
    handleSearch(demoCode);
  };

  const handleRetry = () => {
    if (activeCode) {
      fetchTracking(activeCode);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl px-4 sm:px-6 pb-20">
        {/* Hero Search Section */}
        <TrackingSearch
          initialCode={activeCode || searchParams.get('code') || ''}
          isLoading={state === 'loading'}
          onSearch={handleSearch}
        />

        {/* Dynamic State Rendering */}
        <div className="w-full mt-4 flex flex-col gap-8 transition-all">
          {/* Loading State */}
          {state === 'loading' && <TrackingSkeleton />}

          {/* 404 Not Found State */}
          {state === 'not_found' && (
            <TrackingNotFound
              searchedCode={activeCode}
              onUseDemoCode={handleDemoSearch}
            />
          )}

          {/* Network / Unknown Error State */}
          {state === 'error' && (
            <TrackingError
              message={
                errorMessage ||
                'Terjadi kesalahan saat memproses permintaan pelacakan paket Anda.'
              }
              onRetry={handleRetry}
            />
          )}

          {/* Success Result View */}
          {state === 'success' && data && (
            <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
              {/* 1. Overview Card */}
              <ShipmentCard data={data} />

              {/* 2. Visual 5-Step Stepper */}
              <TrackingStepper status={data.status} />

              {/* 3. Chronological Hub Events Timeline */}
              <TrackingTimeline events={data.events} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrackingPortalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0C] text-[#F5F5F7]">
      <Navbar />
      <Suspense fallback={<div className="flex-1 p-8"><TrackingSkeleton /></div>}>
        <TrackingPortalContent />
      </Suspense>
      <Footer />
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { API_CONFIG } from '@/constants/tracking.constants';
import { FetchState, TrackingErrorDTO, TrackingResponseDTO } from '@/types/tracking.types';

export interface UseTrackingReturn {
  state: FetchState;
  data: TrackingResponseDTO | null;
  errorMessage: string | null;
  activeCode: string;
  fetchTracking: (code: string) => Promise<void>;
  reset: () => void;
}

export function useTracking(): UseTrackingReturn {
  const [state, setState] = useState<FetchState>('idle');
  const [data, setData] = useState<TrackingResponseDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeCode, setActiveCode] = useState<string>('');

  const reset = useCallback(() => {
    setState('idle');
    setData(null);
    setErrorMessage(null);
    setActiveCode('');
  }, []);

  const fetchTracking = useCallback(async (code: string) => {
    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode) return;

    setActiveCode(trimmedCode);
    setState('loading');
    setErrorMessage(null);

    try {
      const endpoint = API_CONFIG.getTrackingUrl(trimmedCode);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.status === 404) {
        const errorJson = (await response.json().catch(() => null)) as TrackingErrorDTO | null;
        setData(null);
        setState('not_found');
        setErrorMessage(
          errorJson?.error?.message ||
            `Nomor resi "${trimmedCode}" tidak ditemukan dalam sistem pengiriman ATELIX.`
        );
        return;
      }

      if (!response.ok) {
        const errorJson = (await response.json().catch(() => null)) as TrackingErrorDTO | null;
        setData(null);
        setState('error');
        setErrorMessage(
          errorJson?.error?.message ||
            `Terjadi kesalahan sistem saat menghubungi server logistik (HTTP ${response.status}).`
        );
        return;
      }

      const result = (await response.json()) as TrackingResponseDTO;
      setData(result);
      setState('success');
      setErrorMessage(null);
    } catch (err: unknown) {
      setData(null);
      setState('error');
      const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
      setErrorMessage(
        isOffline
          ? 'Koneksi internet Anda terputus. Silakan periksa jaringan dan coba lagi.'
          : err instanceof Error
          ? err.message
          : 'Gagal terhubung ke API server ATELIX. Periksa koneksi internet Anda.'
      );
    }
  }, []);

  return {
    state,
    data,
    errorMessage,
    activeCode,
    fetchTracking,
    reset,
  };
}

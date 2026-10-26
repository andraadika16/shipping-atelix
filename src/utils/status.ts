import { COLOR_TOKENS } from '@/constants/tracking.constants';
import { SemanticStatusStyle, TrackingStatus } from '@/types/tracking.types';

/**
 * Returns user-friendly Indonesian title for any raw tracking status
 */
export function resolveStatusLabel(status?: TrackingStatus): string {
  if (!status) return 'Status Tidak Diketahui';

  const normalized = status.toUpperCase().trim();

  switch (normalized) {
    case 'DELIVERED':
      return 'Paket Telah Diterima';
    case 'OUT_FOR_DELIVERY':
      return 'Sedang Diantar Kurir';
    case 'IN_TRANSIT':
      return 'Dalam Perjalanan Transit';
    case 'DEPARTED_FACILITY':
      return 'Meninggalkan Fasilitas Hub';
    case 'PICKED_UP':
      return 'Telah Diambil Kurir';
    case 'MANIFESTED':
    case 'PENDING':
      return 'Pesanan Dikonfirmasi';
    case 'FAILED_ATTEMPT':
      return 'Kendala Pengantaran Kurir';
    case 'RETURNED':
      return 'Paket Dikembalikan (Retur)';
    default:
      return normalized.replace(/_/g, ' ');
  }
}

/**
 * Returns semantic color styles adhering to ATELIX Design System
 */
export function resolveStatusStyle(status?: TrackingStatus): SemanticStatusStyle {
  const normalized = (status || '').toUpperCase().trim();

  if (normalized === 'DELIVERED') {
    return {
      label: resolveStatusLabel(status),
      textColor: 'text-[#2C8B66]',
      bgColor: 'bg-[#2C8B66]/15',
      borderColor: 'border-[#2C8B66]/40',
      glowColor: 'shadow-[0_0_16px_rgba(44,139,102,0.35)]',
    };
  }

  if (
    normalized === 'IN_TRANSIT' ||
    normalized === 'DEPARTED_FACILITY' ||
    normalized === 'OUT_FOR_DELIVERY' ||
    normalized === 'PICKED_UP'
  ) {
    return {
      label: resolveStatusLabel(status),
      textColor: 'text-[#547BFF]',
      bgColor: 'bg-[#547BFF]/15',
      borderColor: 'border-[#547BFF]/40',
      glowColor: 'shadow-[0_0_16px_rgba(84,123,255,0.35)]',
    };
  }

  if (normalized === 'FAILED_ATTEMPT') {
    return {
      label: resolveStatusLabel(status),
      textColor: 'text-[#B87516]',
      bgColor: 'bg-[#B87516]/15',
      borderColor: 'border-[#B87516]/40',
      glowColor: 'shadow-[0_0_16px_rgba(184,117,22,0.35)]',
    };
  }

  if (normalized === 'RETURNED' || normalized === 'NOT_FOUND') {
    return {
      label: resolveStatusLabel(status),
      textColor: 'text-[#B84545]',
      bgColor: 'bg-[#B84545]/15',
      borderColor: 'border-[#B84545]/40',
      glowColor: 'shadow-[0_0_16px_rgba(184,69,69,0.35)]',
    };
  }

  // Default neutral / pending
  return {
    label: resolveStatusLabel(status),
    textColor: 'text-[#A4A5AA]',
    bgColor: 'bg-[#232326]',
    borderColor: 'border-[#303034]',
    glowColor: 'shadow-none',
  };
}

/**
 * Maps shipment status to 1-based index (1 to 5) for the Visual Stepper
 */
export function resolveActiveStepIndex(status?: TrackingStatus): number {
  if (!status) return 1;

  const normalized = status.toUpperCase().trim();

  switch (normalized) {
    case 'DELIVERED':
      return 5;
    case 'OUT_FOR_DELIVERY':
    case 'FAILED_ATTEMPT':
      return 4;
    case 'IN_TRANSIT':
    case 'DEPARTED_FACILITY':
      return 3;
    case 'PICKED_UP':
      return 2;
    case 'MANIFESTED':
    case 'PENDING':
    default:
      return 1;
  }
}

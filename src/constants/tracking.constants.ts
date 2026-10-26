import { StepperStepConfig } from '@/types/tracking.types';

/**
 * Centralized Application Constants
 * Eliminates all hard-coded values across components
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_ATELIX_API_URL || 'https://atelix.henss.my.id',
  getTrackingUrl: (trackingCode: string) =>
    `${process.env.NEXT_PUBLIC_ATELIX_API_URL || 'https://atelix.henss.my.id'}/api/public/tracking/${encodeURIComponent(trackingCode.trim().toUpperCase())}`,
} as const;

export const APP_CONFIG = {
  BRAND_NAME: 'ATELIX Logistics',
  BRAND_SUBTITLE: 'Everyday Tech Carry',
  STOREFRONT_URL: 'https://atelix.henss.my.id',
  DEMO_TRACKING_CODE: 'ATX-TRK-982410',
  DEMO_TRACKING_ALIAS: 'TEST',
  DEFAULT_TIMEZONE: 'Asia/Jakarta',
  TIMEZONE_LABEL: 'WIB',
  YEAR: new Date().getFullYear(),
} as const;

export const HERO_CONFIG = {
  BADGE: 'Real-Time Logistics Engine',
  TITLE: 'Lacak Pengiriman Perangkat ATELIX',
  SUBTITLE:
    'Pantau pergerakan pesanan teknologi Anda secara real-time dari pusat logistik hingga ke tangan Anda.',
  SEARCH_PLACEHOLDER: 'Masukkan nomor resi (cth: ATX-TRK-982410)',
  BUTTON_TEXT: 'Lacak Paket',
  SAMPLE_LABEL: 'Contoh Resi:',
} as const;

export const STEPPER_STEPS: readonly StepperStepConfig[] = [
  {
    stepIndex: 1,
    label: 'Pesanan Dikonfirmasi',
    subLabel: 'Pesanan diproses & disiapkan',
    iconName: 'PackageCheck',
  },
  {
    stepIndex: 2,
    label: 'Diambil Kurir',
    subLabel: 'Paket diserahkan ke kurir logistik',
    iconName: 'Truck',
  },
  {
    stepIndex: 3,
    label: 'Dalam Perjalanan',
    subLabel: 'Transit & sortir di fasilitas hub',
    iconName: 'ArrowRightLeft',
  },
  {
    stepIndex: 4,
    label: 'Diantar Kurir',
    subLabel: 'Kurir menuju alamat pengiriman',
    iconName: 'Bike',
  },
  {
    stepIndex: 5,
    label: 'Paket Diterima',
    subLabel: 'Paket berhasil diterima pelanggan',
    iconName: 'CheckCircle2',
  },
] as const;

export const COLOR_TOKENS = {
  BG_DARK: '#0B0B0C',
  SURFACE_1: '#171719',
  SURFACE_2: '#232326',
  BORDER: '#303034',
  TEXT_PRIMARY: '#F5F5F7',
  TEXT_SECONDARY: '#A4A5AA',
  PRIMARY_ACCENT: '#547BFF',
  STATUS_DELIVERED: '#2C8B66',
  STATUS_IN_TRANSIT: '#547BFF',
  STATUS_WARNING: '#B87516',
  STATUS_ERROR: '#B84545',
} as const;

/**
 * ATELIX Logistics - TypeScript Type Definitions
 * Strict types representing backend contracts and frontend state models
 */

export type TrackingStatus =
  | 'PENDING'
  | 'MANIFESTED'
  | 'PICKED_UP'
  | 'DEPARTED_FACILITY'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'FAILED_ATTEMPT'
  | 'RETURNED'
  | string;

export interface TrackingEventDTO {
  status: TrackingStatus;
  description: string;
  locationLabel: string;
  eventAt: string; // ISO 8601 UTC string (e.g., "2026-10-20T10:30:00.000Z")
  source: 'ADMIN_MANUAL' | 'SYSTEM_WEBHOOK' | string;
}

export interface TrackingResponseDTO {
  trackingCode: string;
  carrier: string;
  status: TrackingStatus;
  estimatedDelivery: string | null; // ISO Date "YYYY-MM-DD" or null
  events: TrackingEventDTO[];
}

export interface TrackingErrorDTO {
  error: {
    code: 'INVALID_TRACKING_CODE' | 'TRACKING_NOT_FOUND' | string;
    message: string;
  };
}

export type FetchState = 'idle' | 'loading' | 'success' | 'not_found' | 'error';

export interface StepperStepConfig {
  stepIndex: number;
  label: string;
  subLabel: string;
  iconName: 'PackageCheck' | 'Truck' | 'ArrowRightLeft' | 'Bike' | 'CheckCircle2';
}

export interface SemanticStatusStyle {
  label: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

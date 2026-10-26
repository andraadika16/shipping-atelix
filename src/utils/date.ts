import { APP_CONFIG } from '@/constants/tracking.constants';

/**
 * Formats an ISO 8601 UTC date string into Indonesian formatted date & time in WIB
 * Example output: "Senin, 20 Oktober 2026 • 17:30 WIB"
 */
export function formatEventDateTimeWIB(isoDateString?: string | null): string {
  if (!isoDateString) return '-';

  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    // Day of week, Day, Month, Year in id-ID
    const datePart = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: APP_CONFIG.DEFAULT_TIMEZONE,
    }).format(date);

    // Time in HH:mm
    const timePart = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: APP_CONFIG.DEFAULT_TIMEZONE,
    }).format(date);

    return `${datePart} • ${timePart.replace('.', ':')} ${APP_CONFIG.TIMEZONE_LABEL}`;
  } catch {
    return isoDateString;
  }
}

/**
 * Formats estimated delivery date string (e.g. "2026-10-22" or ISO) into readable Indonesian date
 * Example output: "22 Oktober 2026"
 */
export function formatEstimatedDate(dateString?: string | null): string {
  if (!dateString) return 'Belum Tersedia';

  try {
    // If format is YYYY-MM-DD, parse year, month, day directly to avoid UTC day shift
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: APP_CONFIG.DEFAULT_TIMEZONE,
    }).format(date);
  } catch {
    return dateString;
  }
}

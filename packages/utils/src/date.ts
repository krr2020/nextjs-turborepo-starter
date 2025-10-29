/**
 * Date utility functions
 */

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_SECOND = 1000;

/**
 * Format date to ISO string without time
 */
export function toDateString(date: Date): string {
  return date.toISOString().split("T")[0] ?? "";
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date): boolean {
  return date.getTime() > Date.now();
}

/**
 * Get number of days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(timeDiff / MILLISECONDS_IN_DAY);
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Format duration in human-readable format
 */
export function formatDuration(milliseconds: number): string {
  const days = Math.floor(milliseconds / MILLISECONDS_IN_DAY);
  const hours = Math.floor((milliseconds % MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR);
  const minutes = Math.floor((milliseconds % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
  const seconds = Math.floor((milliseconds % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);

  const parts: string[] = [];
  if (days > 0) {
    parts.push(`${String(days)}d`);
  }
  if (hours > 0) {
    parts.push(`${String(hours)}h`);
  }
  if (minutes > 0) {
    parts.push(`${String(minutes)}m`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${String(seconds)}s`);
  }

  return parts.join(" ");
}

/**
 * Get start of day (00:00:00)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  const HOURS_IN_DAY = 23;
  const MINUTES_IN_HOUR = 59;
  const SECONDS_IN_MINUTE = 59;
  const MILLISECONDS_IN_SECOND_MAX = 999;
  result.setHours(HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND_MAX);
  return result;
}


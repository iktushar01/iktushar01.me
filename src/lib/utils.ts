import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True when a nullable optional URL field has a non-empty value. */
export function hasOptionalUrl(value?: string | null): boolean {
  return typeof value === "string" && value.trim().length > 0
}

/**
 * Normalize a date value into a `YYYY-MM-DD` string suitable for an
 * `<input type="date">` control. Returns an empty string for empty/invalid
 * input. Already-formatted `YYYY-MM-DD` values are returned as-is to avoid
 * timezone day-shifts; other parseable strings are converted using local
 * (non-UTC) getters for the same reason.
 */
export function toISODate(value?: string | null): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

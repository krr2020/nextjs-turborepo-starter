/**
 * String utility functions
 */

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Convert string to slug (URL-friendly format)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate string to specified length
 */
export function truncate(str: string, length: number, suffix = "..."): string {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Remove extra whitespace from string
 */
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

/**
 * Check if string is empty or only contains whitespace
 */
export function isBlank(str: string | null | undefined): boolean {
  return !str || /^\s*$/.test(str);
}

/**
 * Generate a random string of specified length
 */
export function randomString(
  length: number,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Mask sensitive information (e.g., email, phone)
 */
export function maskString(
  str: string,
  visibleStart = 3,
  visibleEnd = 2,
  maskChar = "*"
): string {
  if (str.length <= visibleStart + visibleEnd) {
    return str;
  }
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const maskLength = str.length - visibleStart - visibleEnd;
  return start + maskChar.repeat(maskLength) + end;
}


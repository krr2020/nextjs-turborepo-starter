/**
 * Crypto utility functions
 */

import crypto from "crypto";

/**
 * Generate a random token
 */
export function generateToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Hash a string using SHA-256
 */
export function hash(str: string): string {
  return crypto.createHash("sha256").update(str).digest("hex");
}

/**
 * Generate a random UUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}


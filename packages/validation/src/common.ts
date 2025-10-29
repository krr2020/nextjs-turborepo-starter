/**
 * Common validation schemas
 * Reusable Zod schemas for common data types
 */

import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z.string().email("Invalid email address").toLowerCase().trim();

/**
 * Password validation schema
 * Minimum 8 characters, at least one uppercase, one lowercase, one number
 */
const MIN_PASSWORD_LENGTH = 8;
export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * URL validation schema
 */
export const urlSchema = z.string().url("Invalid URL").trim();

/**
 * Date range validation schema
 */
export const dateRangeSchema = z
  .object({
    from: z.date(),
    to: z.date(),
  })
  .refine((data) => data.to >= data.from, {
    message: "End date must be after start date",
    path: ["to"],
  });

/**
 * Pagination schema
 */
const MAX_PAGE_LIMIT = 100;
const DEFAULT_PAGE_LIMIT = 20;
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(MAX_PAGE_LIMIT).default(DEFAULT_PAGE_LIMIT),
});

/**
 * Search query schema
 */
export const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query cannot be empty").trim(),
  filters: z.record(z.string()).optional(),
  sort: z.string().optional(),
  ...paginationSchema.shape,
});


/**
 * Common shared types
 */

/**
 * User roles in the system
 */
export type UserRole = "USER" | "ADMIN" | "MODERATOR";

/**
 * Entity status
 */
export type EntityStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "ARCHIVED";

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Sort order
 */
export type SortOrder = "asc" | "desc";

/**
 * Date range
 */
export interface DateRange {
  from: Date;
  to: Date;
}

/**
 * Audit fields
 */
export interface AuditFields {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

/**
 * Success response
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Error response
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * API response type
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;


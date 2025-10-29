/**
 * API-related types
 */

import type { PaginationMeta } from "./common";

/**
 * API request with pagination
 */
export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * API list response
 */
export interface ListResponse<T> {
  items: T[];
  meta: PaginationMeta;
}


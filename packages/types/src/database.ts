/**
 * Database-related types
 */

/**
 * Database query options
 */
export interface QueryOptions {
  skip?: number;
  take?: number;
  orderBy?: Record<string, "asc" | "desc">;
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}


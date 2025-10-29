/**
 * Database configuration
 */

import type { EnvVariables } from "./env";

/**
 * Database configuration interface
 */
export interface DatabaseConfig {
  url: string;
  pool: {
    min: number;
    max: number;
  };
  connectionTimeout: number;
}

/**
 * Get database configuration from environment
 */
export function getDatabaseConfig(env: EnvVariables): DatabaseConfig {
  return {
    url: env.DATABASE_URL,
    pool: {
      min: env.DB_POOL_MIN,
      max: env.DB_POOL_MAX,
    },
    connectionTimeout: env.DB_CONNECTION_TIMEOUT,
  };
}


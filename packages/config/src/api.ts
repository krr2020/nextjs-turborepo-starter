/**
 * API configuration
 */

import type { EnvVariables } from "./env";

/**
 * Server configuration interface
 */
export interface ServerConfig {
  port: number;
  host: string;
  env: string;
  apiUrl?: string;
}

/**
 * Get server configuration from environment
 */
export function getServerConfig(env: EnvVariables): ServerConfig {
  return {
    port: env.PORT,
    host: env.HOST,
    env: env.NODE_ENV,
    apiUrl: env.API_URL,
  };
}

/**
 * CORS configuration interface
 */
export interface CorsConfig {
  origin: string | string[];
  credentials: boolean;
}

/**
 * Get CORS configuration from environment
 */
export function getCorsConfig(env: EnvVariables): CorsConfig {
  const origins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());

  return {
    origin: origins.length === 1 ? (origins[0] ?? "") : origins,
    credentials: env.CORS_CREDENTIALS,
  };
}

/**
 * Rate limit configuration interface
 */
export interface RateLimitConfig {
  max: number;
  windowMs: number;
}

/**
 * Get rate limit configuration from environment
 */
export function getRateLimitConfig(env: EnvVariables): RateLimitConfig {
  return {
    max: env.RATE_LIMIT_MAX,
    windowMs: env.RATE_LIMIT_WINDOW,
  };
}

/**
 * Authentication configuration interface
 */
export interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  sessionSecret: string;
  sessionMaxAge: number;
}

/**
 * Get authentication configuration from environment
 */
export function getAuthConfig(env: EnvVariables): AuthConfig {
  return {
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    sessionSecret: env.SESSION_SECRET,
    sessionMaxAge: env.SESSION_MAX_AGE,
  };
}


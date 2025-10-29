/**
 * Environment variable configuration and validation
 */

import { z } from "zod";

/**
 * Environment types
 */
export const envSchema = z.enum(["development", "test", "staging", "production"]);

/**
 * Server environment variables schema
 */
const DEFAULT_API_PORT = 3001;

export const serverEnvSchema = z.object({
  NODE_ENV: envSchema.default("development"),
  PORT: z.coerce.number().positive().default(DEFAULT_API_PORT),
  HOST: z.string().default("0.0.0.0"),
  API_URL: z.string().url().optional(),
});

/**
 * Database environment variables schema
 */
const MIN_POOL_SIZE = 2;
const MAX_POOL_SIZE = 10;
const DEFAULT_CONNECTION_TIMEOUT = 10000;

export const databaseEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .optional()
    .default("postgresql://user:password@localhost:5432/myapp"),
  DB_POOL_MIN: z.coerce.number().int().positive().default(MIN_POOL_SIZE),
  DB_POOL_MAX: z.coerce.number().int().positive().default(MAX_POOL_SIZE),
  DB_CONNECTION_TIMEOUT: z.coerce.number().int().positive().default(DEFAULT_CONNECTION_TIMEOUT),
});

/**
 * Authentication environment variables schema
 */
const MIN_SECRET_LENGTH = 32;
const DEFAULT_SESSION_MAX_AGE = 86400; // 24 hours
const DEFAULT_DEV_SECRET = "dev-secret-key-change-in-production-min-32-characters-long";

export const authEnvSchema = z.object({
  JWT_SECRET: z
    .string()
    .min(MIN_SECRET_LENGTH, "JWT_SECRET must be at least 32 characters in production")
    .default(DEFAULT_DEV_SECRET),
  JWT_EXPIRES_IN: z.string().default("7d"),
  SESSION_SECRET: z
    .string()
    .min(MIN_SECRET_LENGTH, "SESSION_SECRET must be at least 32 characters in production")
    .default(DEFAULT_DEV_SECRET),
  SESSION_MAX_AGE: z.coerce.number().int().positive().default(DEFAULT_SESSION_MAX_AGE),
});

/**
 * CORS environment variables schema
 */
export const corsEnvSchema = z.object({
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  CORS_CREDENTIALS: z
    .string()
    .transform((val) => val === "true")
    .default("true"),
});

/**
 * Rate limiting environment variables schema
 */
const DEFAULT_RATE_LIMIT_MAX = 100;
const DEFAULT_RATE_LIMIT_WINDOW = 60000; // 1 minute

export const rateLimitEnvSchema = z.object({
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(DEFAULT_RATE_LIMIT_MAX),
  RATE_LIMIT_WINDOW: z.coerce.number().int().positive().default(DEFAULT_RATE_LIMIT_WINDOW),
});

/**
 * Combined environment variables schema
 */
export const envVariablesSchema = z.object({
  ...serverEnvSchema.shape,
  ...databaseEnvSchema.shape,
  ...authEnvSchema.shape,
  ...corsEnvSchema.shape,
  ...rateLimitEnvSchema.shape,
});

export type EnvVariables = z.infer<typeof envVariablesSchema>;

/**
 * Validate environment variables
 */
export function validateEnv(env: NodeJS.ProcessEnv = process.env): EnvVariables {
  const result = envVariablesSchema.safeParse(env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(result.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return result.data;
}

/**
 * Get environment variables (throws if validation fails)
 */
export function getEnv(): EnvVariables {
  return validateEnv();
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Check if running in test
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === "test";
}


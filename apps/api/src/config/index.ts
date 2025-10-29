const DEFAULT_PORT = 3001;
const DEFAULT_RATE_LIMIT_MAX = 100;

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ?? DEFAULT_PORT,
  HOST: process.env.HOST ?? "0.0.0.0",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",

  // CORS configuration
  CORS_ORIGINS: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["http://localhost:3000", "http://localhost:3001"],

  // Rate limiting
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX ?? DEFAULT_RATE_LIMIT_MAX.toString()),
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW ?? "1 minute",

  // Database
  DATABASE_URL: process.env.DATABASE_URL ?? "",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
} as const;


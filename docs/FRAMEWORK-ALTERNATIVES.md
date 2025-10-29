# Framework Alternatives Guide

This boilerplate uses Fastify for the API, but you can easily switch to other Node.js frameworks. This guide shows you how.

## Table of Contents

- [Express.js](#expressjs)
- [NestJS](#nestjs)
- [Hono](#hono)
- [Koa](#koa)

---

## Express.js

Express is the most popular Node.js web framework, known for its simplicity and large ecosystem.

### 1. Update Dependencies

```bash
cd apps/api
pnpm remove fastify @fastify/cors @fastify/helmet @fastify/rate-limit @fastify/swagger @fastify/swagger-ui @fastify/env
pnpm add express cors helmet express-rate-limit swagger-ui-express
pnpm add -D @types/express @types/cors
```

### 2. Update `src/server.ts`

```typescript
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { config } from "./config";

export function createServer(): Express {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: config.CORS_ORIGINS,
      credentials: true,
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: config.RATE_LIMIT_MAX,
    message: "Too many requests, please try again later.",
  });
  app.use(limiter);

  // Health check
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: "1.0.0",
    });
  });

  // API info
  app.get("/api/v1", (_req: Request, res: Response) => {
    res.json({
      name: "API",
      version: "1.0.0",
      description: "API Backend Server",
      endpoints: {
        health: "/health",
        docs: "/docs",
      },
    });
  });

  // Error handling
  app.use((err: Error, _req: Request, res: Response, _next: any) => {
    console.error(err);
    res.status(500).json({
      error: true,
      message: err.message || "Internal Server Error",
      statusCode: 500,
      timestamp: new Date().toISOString(),
    });
  });

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      error: true,
      message: "Route not found",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
```

### 3. Update `src/index.ts`

```typescript
import { getEnv } from "@repo/config";
import { createServer } from "./server";

async function start() {
  try {
    console.info("🔍 Validating environment variables...");
    const env = getEnv();
    console.info("✅ Environment variables validated successfully\n");

    const PORT = env.PORT;
    const HOST = env.HOST;

    const app = createServer();

    const server = app.listen(PORT, HOST, () => {
      console.info(`🚀 API Server`);
      console.info(`📡 Server running at http://${HOST}:${PORT}`);
      console.info(`🔍 Health Check: http://${HOST}:${PORT}/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.info(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      server.close(() => {
        console.info("✅ Server closed successfully");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

void start();
```

---

## NestJS

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

### 1. Create New NestJS App

```bash
# Remove old API
rm -rf apps/api

# Create new NestJS app
npx @nestjs/cli new api
mv api apps/

# Update package name in apps/api/package.json
# Change "name": "api" to "name": "@repo/api"
```

### 2. Install Additional Dependencies

```bash
cd apps/api
pnpm add @nestjs/swagger @nestjs/throttler helmet
```

### 3. Update `src/main.ts`

```typescript
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"],
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.info(`🚀 API Server`);
  console.info(`📡 Server running at http://localhost:${port}`);
  console.info(`📚 API Documentation: http://localhost:${port}/docs`);
}

bootstrap();
```

### 4. Update `src/app.module.ts`

```typescript
import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 5. Update package.json scripts

```json
{
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\"",
    "check-types": "tsc --noEmit"
  }
}
```

---

## Hono

Hono is an ultrafast web framework for the Edge (Cloudflare Workers, Deno, Bun, etc.).

### 1. Update Dependencies

```bash
cd apps/api
pnpm remove fastify @fastify/*
pnpm add hono @hono/node-server
```

### 2. Update `src/server.ts`

```typescript
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { config } from "./config";

export function createServer() {
  const app = new Hono();

  // Middleware
  app.use("*", logger());
  app.use("*", secureHeaders());
  app.use(
    "*",
    cors({
      origin: config.CORS_ORIGINS,
      credentials: true,
    })
  );

  // Health check
  app.get("/health", (c) => {
    return c.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: "1.0.0",
    });
  });

  // API info
  app.get("/api/v1", (c) => {
    return c.json({
      name: "API",
      version: "1.0.0",
      description: "API Backend Server",
      endpoints: {
        health: "/health",
      },
    });
  });

  // 404 handler
  app.notFound((c) => {
    return c.json(
      {
        error: true,
        message: "Route not found",
        statusCode: 404,
        timestamp: new Date().toISOString(),
      },
      404
    );
  });

  // Error handling
  app.onError((err, c) => {
    console.error(err);
    return c.json(
      {
        error: true,
        message: err.message || "Internal Server Error",
        statusCode: 500,
        timestamp: new Date().toISOString(),
      },
      500
    );
  });

  return app;
}
```

### 3. Update `src/index.ts`

```typescript
import { serve } from "@hono/node-server";
import { getEnv } from "@repo/config";
import { createServer } from "./server";

async function start() {
  try {
    console.info("🔍 Validating environment variables...");
    const env = getEnv();
    console.info("✅ Environment variables validated successfully\n");

    const PORT = env.PORT;
    const HOST = env.HOST;

    const app = createServer();

    const server = serve(
      {
        fetch: app.fetch,
        port: PORT,
        hostname: HOST,
      },
      (info) => {
        console.info(`🚀 API Server`);
        console.info(`📡 Server running at http://${info.address}:${info.port}`);
        console.info(`🔍 Health Check: http://${info.address}:${info.port}/health`);
      }
    );

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.info(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      server.close();
      console.info("✅ Server closed successfully");
      process.exit(0);
    };

    process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

void start();
```

---

## Koa

Koa is a lightweight and expressive middleware framework by the team behind Express.

### 1. Update Dependencies

```bash
cd apps/api
pnpm remove fastify @fastify/*
pnpm add koa @koa/cors @koa/router koa-helmet koa-ratelimit
pnpm add -D @types/koa @types/koa__cors @types/koa__router
```

### 2. Update `src/server.ts`

```typescript
import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import rateLimit from "koa-ratelimit";

import { config } from "./config";

export function createServer(): Koa {
  const app = new Koa();
  const router = new Router();

  // Security
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: (ctx) => {
        const origin = ctx.get("Origin");
        if (config.CORS_ORIGINS.includes(origin)) {
          return origin;
        }
        return config.CORS_ORIGINS[0];
      },
      credentials: true,
    })
  );

  // Rate limiting
  const db = new Map();
  app.use(
    rateLimit({
      driver: "memory",
      db: db,
      duration: 60000,
      max: config.RATE_LIMIT_MAX,
      errorMessage: "Too many requests, please try again later.",
    })
  );

  // Routes
  router.get("/health", (ctx) => {
    ctx.body = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: "1.0.0",
    };
  });

  router.get("/api/v1", (ctx) => {
    ctx.body = {
      name: "API",
      version: "1.0.0",
      description: "API Backend Server",
      endpoints: {
        health: "/health",
      },
    };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  // Error handling
  app.on("error", (err) => {
    console.error(err);
  });

  return app;
}
```

### 3. Update `src/index.ts`

```typescript
import { getEnv } from "@repo/config";
import { createServer } from "./server";

async function start() {
  try {
    console.info("🔍 Validating environment variables...");
    const env = getEnv();
    console.info("✅ Environment variables validated successfully\n");

    const PORT = env.PORT;
    const HOST = env.HOST;

    const app = createServer();

    const server = app.listen(PORT, () => {
      console.info(`🚀 API Server`);
      console.info(`📡 Server running at http://${HOST}:${PORT}`);
      console.info(`🔍 Health Check: http://${HOST}:${PORT}/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.info(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      server.close(() => {
        console.info("✅ Server closed successfully");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

void start();
```

---

## Common Steps After Switching

After switching to any framework:

1. **Update TypeScript paths** - Ensure `apps/api/tsconfig.json` has correct paths
2. **Test the server** - Run `pnpm --filter @repo/api dev`
3. **Update documentation** - Update README with new framework info
4. **Test API endpoints** - Verify health check and other routes work
5. **Update deployment** - Adjust Dockerfile/deployment config if needed

## Comparison Table

| Framework | Speed | Learning Curve | Ecosystem | Best For |
|-----------|-------|---------------|-----------|----------|
| **Fastify** | ⚡⚡⚡⚡⚡ | Medium | Growing | High performance APIs |
| **Express** | ⚡⚡⚡ | Easy | Huge | General purpose, legacy projects |
| **NestJS** | ⚡⚡⚡⚡ | Steep | Large | Enterprise, Angular devs |
| **Hono** | ⚡⚡⚡⚡⚡ | Easy | Small | Edge, Cloudflare Workers |
| **Koa** | ⚡⚡⚡⚡ | Medium | Moderate | Modern async/await patterns |

## Need Help?

- Open an issue on GitHub
- Check the official documentation of your chosen framework
- Join the framework's community Discord/Slack


import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { type FastifyInstance } from "fastify";

import { config } from "./config";

const DEFAULT_STATUS_CODE = 500;
const NOT_FOUND_STATUS_CODE = 404;

export async function createServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      transport: config.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
    },
    trustProxy: true,
  });

  // Register security plugins
  await server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  });

  // Register CORS
  await server.register(cors, {
    origin: config.CORS_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  // Register rate limiting
  await server.register(rateLimit, {
    max: config.RATE_LIMIT_MAX,
    timeWindow: config.RATE_LIMIT_WINDOW,
    errorResponseBuilder: () => ({
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please try again later.",
      statusCode: 429,
    }),
  });

  // Register Swagger for API documentation
  await server.register(swagger, {
    openapi: {
      info: {
        title: "API",
        description: "API Documentation",
        version: "1.0.0",
        contact: {
          name: "API Team",
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
      },
      servers: [
        {
          url: `http://localhost:${String(config.PORT)}`,
          description: "Development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest(_request, _reply, next) {
        next();
      },
      preHandler(_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Health check endpoint
  server.get(
    "/health",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["Health"],
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              timestamp: { type: "string" },
              uptime: { type: "number" },
              environment: { type: "string" },
              version: { type: "string" },
            },
          },
        },
      },
    },
    async (_request, _reply) => {
      return {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.NODE_ENV,
        version: "1.0.0",
      };
    }
  );

  // API routes placeholder
  server.get(
    "/api/v1",
    {
      schema: {
        description: "API version info",
        tags: ["API"],
        response: {
          200: {
            type: "object",
            properties: {
              name: { type: "string" },
              version: { type: "string" },
              description: { type: "string" },
              endpoints: {
                type: "object",
                properties: {
                  health: { type: "string" },
                  docs: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    async (_request, _reply) => {
      return {
        name: "API",
        version: "1.0.0",
        description: "API Backend Server",
        endpoints: {
          health: "/health",
          docs: "/docs",
        },
      };
    }
  );

  // Error handling
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);

    const statusCode = error.statusCode ?? DEFAULT_STATUS_CODE;
    const message = error.message || "Internal Server Error";

    reply.status(statusCode).send({
      error: true,
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  });

  // 404 handler
  server.setNotFoundHandler((_request, reply) => {
    reply.status(NOT_FOUND_STATUS_CODE).send({
      error: true,
      message: "Route not found",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  });

  return server;
}


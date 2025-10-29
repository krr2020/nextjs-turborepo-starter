import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client Singleton
 *
 * Ensures only one instance of PrismaClient exists across the application.
 * This is important for connection pooling and to avoid exhausting database connections.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;


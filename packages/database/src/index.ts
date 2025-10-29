/**
 * @repo/database
 *
 * Shared database package
 * Exports Prisma client and database utilities
 */

export { prisma, default as db } from "./client";
export * from "@prisma/client";


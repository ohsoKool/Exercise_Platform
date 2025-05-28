import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Prevent creating multiple PrismaClient instances in development hot-reloading environments like Nodemon
const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  // Cache the Prisma client instance globally in development to avoid over populate DB connections
  globalForPrisma.prisma = db;
}

export { db };

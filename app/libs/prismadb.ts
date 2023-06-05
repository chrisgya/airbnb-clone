import { PrismaClient } from "@prisma/client";

declare global {
  interface Global {
    prisma?: PrismaClient;
  }
}

const prisma: PrismaClient = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}

export default prisma;

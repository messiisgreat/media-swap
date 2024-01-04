import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

// 公式記載の設定のため無効化
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution
// eslint-disable-next-line functional/immutable-data
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

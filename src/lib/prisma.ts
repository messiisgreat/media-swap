import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaBase = globalForPrisma.prisma ?? new PrismaClient();

// updatedAtを更新するためにprismaを拡張
export const prisma = prismaBase.$extends({
  query: {
    product: {
      // eslint-disable-next-line jsdoc/require-jsdoc
      async update({ args, query }) {
        args.data = { ...args.data, updatedAt: new Date() };
        return query(args);
      },
    },
    address: {},
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaBase;

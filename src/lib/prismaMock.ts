import { type PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";

import prisma from "@/lib/prisma";

jest.mock("./prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

// eslint-disable-next-line no-restricted-syntax
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

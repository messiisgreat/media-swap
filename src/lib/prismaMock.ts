import { type PrismaClient } from "@prisma/client";
import { type DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";

import prisma from "@/lib/prisma";

jest.mock("./prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

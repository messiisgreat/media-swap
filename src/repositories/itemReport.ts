import prisma from "@/lib/prisma";
import "server-only";

/**
 * 商品を通報
 * @param itemId 商品ID
 * @param userId 通報ユーザーID
 * @param comment 通報理由
 * @returns
 */
export const createItemReport = async (
  itemId: string,
  userId: string,
  comment: string,
) => {
  // 既に同じユーザーによる通報があるか確認
  const existingReport = await prisma.itemReport.findFirst({
    where: {
      itemId,
      userId,
    },
  });

  if (existingReport) {
    throw new Error("This comment has already been reported by the user.");
  }

  return await prisma.itemReport.create({
    data: {
      itemId,
      userId,
      comment,
    },
  });
};

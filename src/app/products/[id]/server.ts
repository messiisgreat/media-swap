import "server-only";

import { prisma } from "@/lib/prisma";

/**
 * 商品のステータスを更新する
 *
 * @param productId - 更新対象の商品ID
 */
export const updateProductStatus = async (productId: string) => {
  await prisma.product.update({
    where: { id: productId },
    data: { status: "sold" },
  });
};

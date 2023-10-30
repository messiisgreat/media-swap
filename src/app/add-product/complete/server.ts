import { prisma } from "@/lib/prisma";
import { cache } from "react";
import "server-only";

/**
 * 商品を取得する
 * @param id 商品ID
 * @throws 商品が見つからなかった場合
 */
export const findProduct = cache((id: string) => {
  return prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
});

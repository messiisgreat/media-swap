"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * 製品のステータスを更新し、関連するパスをrevalidate
 *
 * @param {string} productId - 更新対象の製品のID
 * @returns
 */
export async function updateProduct(productId: string) {
  await prisma.product.update({
    where: { id: productId },
    data: { status: "sold" },
  });

  revalidatePath("/products/[id]");
}

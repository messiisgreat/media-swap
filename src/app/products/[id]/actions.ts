"use server";

import { updateProductStatus } from "@/services/product";
import { revalidatePath } from "next/cache";

/**
 * 製品のステータスを更新し、関連するパスをrevalidate
 *
 * @param {string} productId - 更新対象の製品のID
 */
export async function updateProduct(productId: string) {
  await updateProductStatus(productId);

  revalidatePath("/products/[id]");
}

"use server";

import { updateListingStatus } from "@/services/listing";
import { revalidatePath } from "next/cache";

/**
 * 製品のステータスを更新し、関連するパスをrevalidate
 *
 * @param {string} productId - 更新対象の製品のID
 */
export async function updateListing(productId: string) {
  await updateListingStatus(productId);

  revalidatePath("/products/[id]");
}

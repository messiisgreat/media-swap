"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateProduct(productId: string) {
  await prisma.product.update({
    where: { id: productId },
    data: { status: "sold" },
  });

  revalidatePath("/products/[id]");
}

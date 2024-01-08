"use server";

import { revalidatePath } from "next/cache";

/**
 * 取引ページを再読み込みする
 * @param transactionId 取引ID
 */
export const reload = (transactionId: string) => {
  revalidatePath(`/transactions/${transactionId}`);
};

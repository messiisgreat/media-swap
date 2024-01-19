import "server-only";

import prisma from "@/lib/prisma";
import {
  findTransactionComments,
  updateTransactionComments,
} from "@/repositories/transactionComment";
import { cache } from "react";

/** 取引コメント取得結果 */
export type TransactionCommentReadResult = Awaited<
  ReturnType<typeof findAndMarkAsReadTransactionComments>
>;

/**
 * コメントを取得して既読にする
 * @param transactionId 取引ID
 * @param userId メッセージを見た側のユーザーID
 */
export const findAndMarkAsReadTransactionComments = cache(
  async (transactionId: string, userId: string) => {
    const [comments] = await prisma.$transaction([
      findTransactionComments(transactionId),
      updateTransactionComments(transactionId, userId),
    ]);
    return comments;
  },
);

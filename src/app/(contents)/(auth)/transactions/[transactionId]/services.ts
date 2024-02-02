import "server-only";

import { isStatusCode } from "@/app/(contents)/(auth)/transactions/[transactionId]/utils";
import { findTransaction } from "@/repositories/transaction";
import { getSessionUser } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

const transactionIdRegex = /^[0-9a-fA-F]{24}$/;

const recordNotFoundCode = "P2025";

const isNotSellerOrBuyer = (
  userId: string,
  sellerId: string,
  buyerId: string,
) => userId !== sellerId && userId !== buyerId;

const isSeller = (userId: string, sellerId: string) => userId === sellerId;

/**
 * 取引ページの表示に必要な情報を取得し、加工する
 * 存在し得ない取引IDが指定されたときや、指定された取引が存在しないときは404ページを返す
 * @param transactionId 取引ID
 * @throws Error 想定外のエラーが発生したときサーバーエラーをThrowする
 */
export const findTransactionWithHandling = async (transactionId: string) => {
  if (!transactionIdRegex.test(transactionId)) {
    notFound();
  }

  try {
    const [transaction, sessionUser] = await Promise.all([
      findTransaction(transactionId),
      getSessionUser(),
    ]);

    if (!transaction || !sessionUser) {
      notFound();
    }

    const { buyerId, statusCode } = transaction;
    const seller = transaction.item.seller;
    const sellerId = seller.id;

    if (isNotSellerOrBuyer(sessionUser.id, sellerId, buyerId)) {
      notFound();
    }

    const userType = isSeller(sessionUser.id, sellerId) ? "seller" : "buyer";

    if (!isStatusCode(statusCode)) {
      throw new Error("statusCode is not found");
    }

    return {
      /** 取引情報 */
      transaction,
      /** セッションユーザー */
      sessionUser,
      /** 出品者 */
      seller,
      /** 購入者か出品者のどちらか */
      userType,
      /** 取引進行ステータス */
      statusCode,
    } as const;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === recordNotFoundCode
    ) {
      notFound();
    }
    throw error;
  }
};

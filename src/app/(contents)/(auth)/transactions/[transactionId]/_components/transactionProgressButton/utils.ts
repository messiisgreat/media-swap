import { TRANSACTION_STATUS } from "@/constants/item";
import { type SessionUser } from "@/utils";
import { type Transaction } from "@prisma/client";

/**
 * 取引ステータス変更ボタンのステータスを取得する
 * @param transaction トランザクションID
 * @param sessionUser セッションユーザ
 * @returns ステータス { currentStatus: number | null, nextStatus: number | null, isVisibleButton: boolean }
 */
export const getThisTransactionProgressStatus = (
  transaction: Transaction,
  sessionUser?: SessionUser,
): {
  currentStatus: number | null;
  nextStatus: number | null;
  isVisibleButton: boolean;
} => {
  const isBuyer = sessionUser?.id === transaction.buyerId;
  switch (transaction.transactionStatus) {
    case TRANSACTION_STATUS.BEFORE_PAYMENT:
      return {
        currentStatus: TRANSACTION_STATUS.BEFORE_PAYMENT,
        nextStatus: TRANSACTION_STATUS.COMPLETE_PAYMENT,
        isVisibleButton: isBuyer,
      };
    case TRANSACTION_STATUS.COMPLETE_PAYMENT:
      return {
        currentStatus: TRANSACTION_STATUS.COMPLETE_PAYMENT,
        nextStatus: TRANSACTION_STATUS.SENT,
        isVisibleButton: !isBuyer,
      };
    case TRANSACTION_STATUS.SENT:
      return {
        currentStatus: TRANSACTION_STATUS.SENT,
        nextStatus: TRANSACTION_STATUS.RECEIVED,
        isVisibleButton: isBuyer,
      };
    case TRANSACTION_STATUS.RECEIVED:
      return {
        currentStatus: TRANSACTION_STATUS.RECEIVED,
        nextStatus: TRANSACTION_STATUS.COMPLETED,
        isVisibleButton: isBuyer,
      };
    case TRANSACTION_STATUS.COMPLETED:
      return {
        currentStatus: TRANSACTION_STATUS.COMPLETED,
        nextStatus: TRANSACTION_STATUS.COMPLETED,
        isVisibleButton: true,
      };
    default:
      return {
        currentStatus: null,
        nextStatus: null,
        isVisibleButton: false,
      };
  }
};

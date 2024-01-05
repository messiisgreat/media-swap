import { isStatusCode } from "@/app/(contents)/(auth)/transactions/[transactionId]/utils";
import { TRANSACTION_STATUS } from "@/constants/item";

/**
 * 取引ステータス変更ボタンのステータスを取得する
 * @param statusCode 取引ステータス
 * @param userType ユーザーの種類
 * @returns ステータス { currentStatus: number | null, nextStatus: number | null, isVisibleButton: boolean }
 */
export const getThisTransactionProgressStatus = (
  statusCode: number,
  userType: "buyer" | "seller",
): {
  currentStatus: number;
  nextStatus: number;
  isVisibleButton: boolean;
} => {
  const isBuyer = userType === "buyer";
  if (!isStatusCode(statusCode)) {
    throw new Error("Invalid status code");
  }
  switch (statusCode) {
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
    case TRANSACTION_STATUS.CANCELLED:
      return {
        currentStatus: TRANSACTION_STATUS.CANCELLED,
        nextStatus: TRANSACTION_STATUS.CANCELLED,
        isVisibleButton: true,
      };
  }
};

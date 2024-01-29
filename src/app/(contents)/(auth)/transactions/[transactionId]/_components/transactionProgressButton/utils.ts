import {
  TRANSACTION_STATUS,
  type TransactionStatusValue,
} from "@/constants/item";

/**
 * 取引ステータス変更ボタンのステータスを取得する
 * @param statusCode 取引ステータス
 * @param userType ユーザーの種類
 * @returns 現在のステータス、次のステータス、ボタンの表示状態のオブジェクト
 */
export const getThisTransactionProgressStatus = (
  statusCode: TransactionStatusValue,
  userType: "buyer" | "seller",
): {
  currentStatus: TransactionStatusValue;
  nextStatus: TransactionStatusValue;
  isVisibleButton: boolean;
} => {
  const isBuyer = userType === "buyer";
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

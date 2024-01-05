import {
  TRANSACTION_STATUS,
  type TransactionStatusValue,
} from "@/constants/item";

/**
 * 取引ステータスの値かどうかを判定する
 * @param value 取引ステータスの値
 */
export const isStatusCode = (value: number): value is TransactionStatusValue =>
  Object.values<number>(TRANSACTION_STATUS).includes(value);

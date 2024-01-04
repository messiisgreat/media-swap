import { SalesBalancePresenter } from "@/features/salesBalance/SalesBalancePresenter";
import { formatPrice } from "@/utils";

// 仮の売上残高
const balance = formatPrice(50000);

/**
 * 売上残高を取得する
 * TODO: 非同期関数にして売上残高をfetchする
 * @returns
 */
export const SalesBalanceContainer = () => (
  <SalesBalancePresenter balance={balance} />
);

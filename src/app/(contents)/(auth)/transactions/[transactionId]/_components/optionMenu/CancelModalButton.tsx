"use client";
import { useCancelModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/optionMenu/hooks";

type CancelModalButtonProps = {
  /** ユーザー種別 */
  userType: "buyer" | "seller";
};

/**
 * 取引キャンセル用のモーダルを開くボタン
 * @param userType ユーザー種別
 */
export const CancelModalButton = ({ userType }: CancelModalButtonProps) => {
  const handleOpen = useCancelModal(userType);
  return <button onClick={handleOpen}>運営への問合わせ</button>;
};

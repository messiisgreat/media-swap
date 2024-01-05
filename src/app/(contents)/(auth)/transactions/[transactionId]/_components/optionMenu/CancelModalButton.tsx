"use client";
import { useCancelModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/optionMenu/hooks";
import { type SessionUser } from "@/utils";

type Props = {
  /** ユーザー情報 */
  sessionUser: SessionUser;
  /** ユーザー種別 */
  userType: "buyer" | "seller";
};

/**
 * 取引キャンセル用のモーダルを開くボタン
 * @param props キャンセルモーダルのプロパティ
 */
export const CancelModalButton = (props: Props) => {
  const handleOpen = useCancelModal({ ...props });
  return <button onClick={handleOpen}>運営への問合わせ</button>;
};

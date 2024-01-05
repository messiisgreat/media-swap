import { useCancelModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/hooks";
import { type SessionUser } from "@/utils";

type Props = {
  /** ユーザー情報 */
  sessionUser: SessionUser;
  /** 購入者判定 */
  isBuyer: boolean;
};

/**
 * 取引キャンセル用のモーダルを開くボタン
 * @param props キャンセルモーダルのプロパティ
 */
export const CancelModalButton = (props: Props) => {
  const handleOpen = useCancelModal({ ...props });
  return <button onClick={handleOpen}>運営への問合わせ</button>;
};

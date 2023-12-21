"use client";

import { useCancelModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/hooks";
import { type Session } from "next-auth";

type Props = {
  /** className */
  sessionUser?: Session["user"] ;
  className?: string;
};

/**
 *
 * 取引画面のキャンセルフォームボタン
 * @param props - キャンセルフォームボタンのプロパティ
 */
export const CancelFormButton = (props: Props) => {
  const [handleOpen, CancelModal] = useCancelModal(props);
  return (
    <div>
      <button onClick={handleOpen} className={props.className}>
        運営への問合わせ
      </button>
      <CancelModal />
    </div>
  );
};

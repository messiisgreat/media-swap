"use client";

import { useCancelModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/hooks";

type Props = {
  /** className */
  className?: string;
};

/**
 *
 * 取引画面のキャンセルフォームボタン
 */
export const CancelFormButton = ({ className = "" }: Props) => {
  const [handleOpen, CancelModal] = useCancelModal();
  return (
    <div>
      <button onClick={handleOpen} className={className}>
        運営への問合わせ
      </button>
      <CancelModal />
    </div>
  );
};

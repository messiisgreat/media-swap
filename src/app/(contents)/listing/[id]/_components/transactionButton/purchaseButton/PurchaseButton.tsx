"use client";

import { usePurchaseModal } from "@/app/(contents)/listing/[id]/_components/transactionButton/purchaseButton/hooks";
import { Button } from "@/ui";
import { type Listing } from "@prisma/client";

type Props = {
  /** 出品情報 */
  listing: Listing;
  /** ログインユーザー */
  sessionUserId: string | undefined;
  /** className */
  className?: string;
};

/**
 * 購入ボタン
 * 購入確認画面用のモーダルを開く
 */
export const PurchaseButton = ({
  listing,
  sessionUserId,
  className = "",
}: Props) => {
  const [handleOpen, PurchaseModal] = usePurchaseModal(listing, sessionUserId);

  return (
    <>
      <Button onClick={handleOpen} className={className}>
        購入する
      </Button>
      <PurchaseModal />
    </>
  );
};

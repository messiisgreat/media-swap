"use client";

import { usePurchaseModal } from "@/app/(contents)/item/[itemId]/_components/transactionButton/purchaseButton/hooks";
import { Button } from "@/ui";
import { type Item } from "@prisma/client";

type Props = {
  /** 出品情報 */
  item: Item;
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
  item,
  sessionUserId,
  className = "",
}: Props) => {
  const handleOpen = usePurchaseModal(item, sessionUserId);

  return (
    <Button onClick={handleOpen} className={className}>
      購入する
    </Button>
  );
};

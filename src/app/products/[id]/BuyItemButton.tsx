"use client";

import { useState, useTransition } from "react";
import { updateListing } from "./actions";

type BuyItemButtonProps = {
  productId: string;
};

/**
 * 商品購入ボタン
 * @param param0.productId 商品ID
 * @returns 商品購入ボタン(現在は購入処理も含まれてます)
 */
export default function BuyItemButton({ productId }: BuyItemButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* TODO: 購入処理が完了すると画像に購入済みのタグを表示し、購入ボタンを非表示にする。あと取引ページへの遷移処理も必要 */}
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await updateListing(productId);
            setSuccess(true);
          });
        }}
      >
        購入手続きへ
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">購入しました</span>
      )}
    </div>
  );
}

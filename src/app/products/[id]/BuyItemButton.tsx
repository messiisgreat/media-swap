"use client";

import { useState, useTransition } from "react";
import { updateProduct } from "./actions";

type BuyItemButtonProps = {
  productId: string;
};

/**
 * 商品購入ボタン
 * @returns 
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
            await updateProduct(productId);
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

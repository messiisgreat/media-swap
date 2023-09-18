"use client";

import { useState, useTransition } from "react";
import { updateProduct } from "./actions";

interface BuyItemButtonProps {
  productId: string;
}

export default function BuyItemButton({ productId }: BuyItemButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* TODO: 購入処理が完了すると画像に購入済みのタグを表示し、購入ボタンを非表示にする */}
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

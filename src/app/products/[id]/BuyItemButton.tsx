"use client";

interface BuyItemButtonProps {
  productId: string;
}

export default function BuyItemButton({ productId }: BuyItemButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-primary" onClick={() => {}}>
        購入手続きへ
      </button>
    </div>
  );
}

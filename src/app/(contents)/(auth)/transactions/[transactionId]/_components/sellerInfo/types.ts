
/** キャンセル理由(出品者) */
export const cancellationSellerReasons = {
  1: "その他",
} as const;

/** キャンセル理由(購入者) */
export const cancellationBuyerReasons = {
  1: "商品が発送されない。",
  2: "届いた商品が購入した商品とは異なる。",
  3: "その他",
} as const;
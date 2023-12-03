/** マイページのコンテンツ */
export const PAGE_CONTENT = {
  PRIVACY: "privacy",
  LISTINGS: "listings",
  PURCHASES: "purchases",
  DRAFT: "draft",
} as const;

/** マイページのリンク先 */
export const PAGE_LINK = {
  [PAGE_CONTENT.PRIVACY]: "/mypage/personal-info",
  [PAGE_CONTENT.LISTINGS]: "/mypage/listings",
  [PAGE_CONTENT.PURCHASES]: "/mypage/purchases",
  [PAGE_CONTENT.DRAFT]: "/mypage/draft",
} as const;

/** マイページのタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  [PAGE_CONTENT.PRIVACY]: "個人情報設定",
  [PAGE_CONTENT.LISTINGS]: "出品商品一覧",
  [PAGE_CONTENT.PURCHASES]: "購入商品一覧",
  [PAGE_CONTENT.DRAFT]: "下書き商品一覧",
} as const;

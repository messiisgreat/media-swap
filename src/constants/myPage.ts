/** マイページのコンテンツ */
export const PAGE_CONTENT = {
  PRIVACY: "privacy",
  LISTINGS: "items",
  PURCHASES: "purchases",
  DRAFT: "draft",
  BROWSING_HISTORY: "browsing-history",
} as const;

type PageContentKey = keyof typeof PAGE_CONTENT;

type PageContentValue = (typeof PAGE_CONTENT)[PageContentKey];

/** マイページのリンク先 */
export const PAGE_LINK = {
  [PAGE_CONTENT.PRIVACY]: "/mypage/personal-info",
  [PAGE_CONTENT.LISTINGS]: "/mypage/items",
  [PAGE_CONTENT.PURCHASES]: "/mypage/purchases",
  [PAGE_CONTENT.DRAFT]: "/mypage/draft",
  [PAGE_CONTENT.BROWSING_HISTORY]: "/mypage/browsing-history",
} as const satisfies Record<PageContentValue, string>;

/** マイページのタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  [PAGE_CONTENT.PRIVACY]: "個人情報設定",
  [PAGE_CONTENT.LISTINGS]: "出品商品一覧",
  [PAGE_CONTENT.PURCHASES]: "購入商品一覧",
  [PAGE_CONTENT.DRAFT]: "下書き商品一覧",
  [PAGE_CONTENT.BROWSING_HISTORY]: "閲覧履歴一覧",
} as const satisfies Record<PageContentValue, string>;

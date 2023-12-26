/** マイページのコンテンツ */
export const PAGE_CONTENT = {
  PERSONAL_INFO: "personal-info",
  LISTINGS: "listings",
  PURCHASES: "purchases",
  NOTIFICATION_SETTINGS: "notification-settings",
  DRAFTS: "drafts",
  BROWSING_HISTORY: "browsing-history",
  SALES_HISTORY: "sales-history",
  WITHDRAWAL: "withdrawal",
  LIKES: "likes",
} as const;

type PageContentKey = keyof typeof PAGE_CONTENT;

export type PageContentValue = (typeof PAGE_CONTENT)[PageContentKey];

/** マイページのリンク先 */
export const PAGE_LINK = {
  [PAGE_CONTENT.PERSONAL_INFO]: "/mypage/personal-info",
  [PAGE_CONTENT.LISTINGS]: "/mypage/listings",
  [PAGE_CONTENT.PURCHASES]: "/mypage/purchases",
  [PAGE_CONTENT.NOTIFICATION_SETTINGS]: "/mypage/notification-settings",
  [PAGE_CONTENT.DRAFTS]: "/mypage/drafts",
  [PAGE_CONTENT.BROWSING_HISTORY]: "/mypage/browsing-history",
  [PAGE_CONTENT.SALES_HISTORY]: "/mypage/sales-history",
  [PAGE_CONTENT.WITHDRAWAL]: "/mypage/withdrawal",
  [PAGE_CONTENT.LIKES]: "/mypage/likes",
} as const satisfies Record<PageContentValue, `/mypage/${PageContentValue}`>;

/** マイページのタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  [PAGE_CONTENT.PERSONAL_INFO]: "個人情報設定",
  [PAGE_CONTENT.LISTINGS]: "出品商品一覧",
  [PAGE_CONTENT.PURCHASES]: "購入商品一覧",
  [PAGE_CONTENT.NOTIFICATION_SETTINGS]: "通知設定",
  [PAGE_CONTENT.DRAFTS]: "下書き商品一覧",
  [PAGE_CONTENT.BROWSING_HISTORY]: "閲覧履歴一覧",
  [PAGE_CONTENT.SALES_HISTORY]: "売上履歴",
  [PAGE_CONTENT.WITHDRAWAL]: "出金",
  [PAGE_CONTENT.LIKES]: "いいねした商品一覧",
} as const satisfies Record<PageContentValue, string>;

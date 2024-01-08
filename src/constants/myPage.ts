/** マイページのコンテンツ */
export const PAGE_CONTENT = {
  PERSONAL_INFO: "personal-info",
  LISTINGS: "listings",
  PURCHASES: "purchases",
  NOTIFICATION_SETTINGS: "notification-settings",
  DRAFTS: "drafts",
  BROWSING_HISTORY: "browsing-history",
  LIKES: "likes",
  SALES_HISTORY: "sales-history",
  WITHDRAWAL: "withdrawal",
} as const;

type PageContentKey = keyof typeof PAGE_CONTENT;

export type PageContentValue = (typeof PAGE_CONTENT)[PageContentKey];

/** マイページのリンク先 */
export const PAGE_LINK = {
  [PAGE_CONTENT.PERSONAL_INFO]: "/mypage/setting/personal-info",
  [PAGE_CONTENT.LISTINGS]: "/mypage/item/listings",
  [PAGE_CONTENT.PURCHASES]: "/mypage/item/purchases",
  [PAGE_CONTENT.NOTIFICATION_SETTINGS]: "/mypage/setting/notification-settings",
  [PAGE_CONTENT.DRAFTS]: "/mypage/item/drafts",
  [PAGE_CONTENT.BROWSING_HISTORY]: "/mypage/item/browsing-history",
  [PAGE_CONTENT.LIKES]: "/mypage/item/likes",
  [PAGE_CONTENT.SALES_HISTORY]: "/mypage/earning/sales-history",
  [PAGE_CONTENT.WITHDRAWAL]: "/mypage/earning/withdrawal",
} as const satisfies Record<PageContentValue, `/mypage/${string}/${PageContentValue}`>;

/** マイページのタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  [PAGE_CONTENT.PERSONAL_INFO]: "個人情報設定",
  [PAGE_CONTENT.LISTINGS]: "出品商品一覧",
  [PAGE_CONTENT.PURCHASES]: "購入商品一覧",
  [PAGE_CONTENT.NOTIFICATION_SETTINGS]: "通知設定",
  [PAGE_CONTENT.DRAFTS]: "下書き商品一覧",
  [PAGE_CONTENT.BROWSING_HISTORY]: "閲覧履歴一覧",
  [PAGE_CONTENT.LIKES]: "いいねした商品一覧",
  [PAGE_CONTENT.SALES_HISTORY]: "売上履歴一覧",
  [PAGE_CONTENT.WITHDRAWAL]: "出金",
} as const satisfies Record<PageContentValue, string>;

export const PAGE_TAB_CONTENT = [
  {
    title: "商品関連",
    url: "/mypage/item",
  },
  {
    title: "売上関連",
    url: "/mypage/earning",
  },
  {
    title: "設定",
    url: "/mypage/setting",
  },
] as const;

/** 商品関連のコンテンツ */
export const LISTING_CONTENT = {
  LISTINGS: "listings",
  PURCHASES: "purchases",
  DRAFTS: "drafts",
  BROWSING_HISTORY: "browsing-history",
  LIKES: "likes",
} as const;

type ListingContentKey = keyof typeof LISTING_CONTENT;

export type ListingContentValue = (typeof LISTING_CONTENT)[ListingContentKey];

/** 商品関連のリンク先 */
export const LISTING_LINK = {
  [LISTING_CONTENT.LISTINGS]: "/mypage/item/listings",
  [LISTING_CONTENT.PURCHASES]: "/mypage/item/purchases",
  [LISTING_CONTENT.DRAFTS]: "/mypage/item/drafts",
  [LISTING_CONTENT.BROWSING_HISTORY]: "/mypage/item/browsing-history",
  [PAGE_CONTENT.LIKES]: "/mypage/item/likes",
} as const satisfies Record<ListingContentValue, `/mypage/item/${ListingContentValue}`>;

/** 商品関連のタイトル */
export const LISTING_CONTENT_ENUM_JA = {
  [LISTING_CONTENT.LISTINGS]: "出品商品一覧",
  [LISTING_CONTENT.PURCHASES]: "購入商品一覧",
  [LISTING_CONTENT.DRAFTS]: "下書き商品一覧",
  [LISTING_CONTENT.BROWSING_HISTORY]: "閲覧履歴一覧",
  [PAGE_CONTENT.LIKES]: "いいねした商品一覧",
} as const satisfies Record<ListingContentValue, string>;

/** 売上関連のコンテンツ */
export const EARNING_CONTENT = {
  SALES_HISTORY: "sales-history",
  WITHDRAWAL: "withdrawal",
} as const;

type EarningContentKey = keyof typeof EARNING_CONTENT;

export type EarningContentValue = (typeof EARNING_CONTENT)[EarningContentKey];

/** 売上関連のリンク先 */
export const EARNING_LINK = {
  [EARNING_CONTENT.SALES_HISTORY]: "/mypage/earning/sales-history",
  [EARNING_CONTENT.WITHDRAWAL]: "/mypage/earning/withdrawal",
} as const satisfies Record<EarningContentValue, `/mypage/earning/${EarningContentValue}`>;

/** 売上関連のタイトル */
export const EARNING_CONTENT_ENUM_JA = {
  [EARNING_CONTENT.SALES_HISTORY]: "売上履歴一覧",
  [EARNING_CONTENT.WITHDRAWAL]: "出金",
} as const satisfies Record<EarningContentValue, string>;

/** 設定関連のコンテンツ */
export const SETTING_CONTENT = {
  PERSONAL_INFO: "personal-info",
  NOTIFICATION_SETTINGS: "notification-settings",
} as const;

type SettingContentKey = keyof typeof SETTING_CONTENT;

export type SettingContentValue = (typeof SETTING_CONTENT)[SettingContentKey];

/** 設定関連のリンク先 */
export const SETTING_LINK = {
  [SETTING_CONTENT.PERSONAL_INFO]: "/mypage/setting/personal-info",
  [PAGE_CONTENT.NOTIFICATION_SETTINGS]: "/mypage/setting/notification-settings",
} as const satisfies Record<SettingContentValue, `/mypage/setting/${SettingContentValue}`>;

/** 設定関連のタイトル */
export const SETTING_CONTENT_ENUM_JA = {
  [SETTING_CONTENT.PERSONAL_INFO]: "個人情報設定",
  [PAGE_CONTENT.NOTIFICATION_SETTINGS]: "通知設定",
} as const satisfies Record<SettingContentValue, string>;
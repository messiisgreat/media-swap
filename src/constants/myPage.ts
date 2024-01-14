import { type Route } from "next";

/** マイページのコンテンツ */
export const MYPAGE_CONTENT = {
  ITEMS: "items",
  EARNING: "earning",
  SETTINGS: "settings",
} as const;

type MyPageContentKey = keyof typeof MYPAGE_CONTENT;

type MyPageContentValue = (typeof MYPAGE_CONTENT)[MyPageContentKey];

/** マイページのリンク先 */
export const MYPAGE_LINK = {
  [MYPAGE_CONTENT.ITEMS]: "/mypage/items",
  [MYPAGE_CONTENT.EARNING]: "/mypage/earning",
  [MYPAGE_CONTENT.SETTINGS]: "/mypage/settings",
} as const satisfies Record<
  MyPageContentValue,
  Route<`/mypage/${MyPageContentValue}`>
>;

/** マイページのタイトル */
export const MYPAGE_CONTENT_ENUM_JA = {
  [MYPAGE_CONTENT.ITEMS]: "商品関連",
  [MYPAGE_CONTENT.EARNING]: "売上関連",
  [MYPAGE_CONTENT.SETTINGS]: "設定",
} as const satisfies Record<MyPageContentValue, string>;

/** 商品関連のコンテンツ */
export const LISTING_CONTENT = {
  LISTINGS: "listings",
  PURCHASES: "purchases",
  DRAFTS: "drafts",
  BROWSING_HISTORY: "browsing-history",
  LIKES: "likes",
} as const;

type ListingContentKey = keyof typeof LISTING_CONTENT;

type ListingContentValue = (typeof LISTING_CONTENT)[ListingContentKey];

/** 商品関連のリンク先 */
export const LISTING_LINK = {
  [LISTING_CONTENT.LISTINGS]: "/mypage/items/listings",
  [LISTING_CONTENT.PURCHASES]: "/mypage/items/purchases",
  [LISTING_CONTENT.DRAFTS]: "/mypage/items/drafts",
  [LISTING_CONTENT.BROWSING_HISTORY]: "/mypage/items/browsing-history",
  [LISTING_CONTENT.LIKES]: "/mypage/items/likes",
} as const satisfies Record<
  ListingContentValue,
  Route<`/mypage/items/${ListingContentValue}`>
>;

/** 商品関連のタイトル */
export const LISTING_CONTENT_ENUM_JA = {
  [LISTING_CONTENT.LISTINGS]: "出品商品一覧",
  [LISTING_CONTENT.PURCHASES]: "購入商品一覧",
  [LISTING_CONTENT.DRAFTS]: "下書き商品一覧",
  [LISTING_CONTENT.BROWSING_HISTORY]: "閲覧履歴一覧",
  [LISTING_CONTENT.LIKES]: "いいねした商品一覧",
} as const satisfies Record<ListingContentValue, string>;

/** 売上関連のコンテンツ */
export const EARNING_CONTENT = {
  WITHDRAWAL: "withdrawal",
  HISTORY: "history",
} as const;

type EarningContentKey = keyof typeof EARNING_CONTENT;

type EarningContentValue = (typeof EARNING_CONTENT)[EarningContentKey];

/** 売上関連のリンク先 */
export const EARNING_LINK = {
  [EARNING_CONTENT.WITHDRAWAL]: "/mypage/earning/withdrawal",
  [EARNING_CONTENT.HISTORY]: "/mypage/earning/history",
} as const satisfies Record<
  EarningContentValue,
  Route<`/mypage/earning/${EarningContentValue}`>
>;

/** 売上関連のタイトル */
export const EARNING_CONTENT_ENUM_JA = {
  [EARNING_CONTENT.WITHDRAWAL]: "出金",
  [EARNING_CONTENT.HISTORY]: "出金履歴一覧",
} as const satisfies Record<EarningContentValue, string>;

/** 設定関連のコンテンツ */
export const SETTING_CONTENT = {
  PROFILE: "profile",
  ADDRESS: "address",
  NOTIFICATIONS: "notifications",
  LEAVE: "leave",
} as const;

type SettingContentKey = keyof typeof SETTING_CONTENT;

type SettingContentValue = (typeof SETTING_CONTENT)[SettingContentKey];

/** 設定関連のリンク先 */
export const SETTING_LINK = {
  [SETTING_CONTENT.PROFILE]: "/mypage/settings/profile",
  [SETTING_CONTENT.ADDRESS]: "/mypage/settings/address",
  [SETTING_CONTENT.NOTIFICATIONS]: "/mypage/settings/notifications",
  [SETTING_CONTENT.LEAVE]: "/mypage/settings/leave",
} as const satisfies Record<
  SettingContentValue,
  Route<`/mypage/settings/${SettingContentValue}`>
>;

/** 設定関連のタイトル */
export const SETTING_CONTENT_ENUM_JA = {
  [SETTING_CONTENT.PROFILE]: "公開プロフィール設定",
  [SETTING_CONTENT.ADDRESS]: "配送先住所設定",
  [SETTING_CONTENT.NOTIFICATIONS]: "通知設定",
  [SETTING_CONTENT.LEAVE]: "退会",
} as const satisfies Record<SettingContentValue, string>;

/** マイページのコンテンツ */
export const PAGE_CONTENT = {
  ...MYPAGE_CONTENT,
  ...LISTING_CONTENT,
  ...EARNING_CONTENT,
  ...SETTING_CONTENT,
} as const;

type PageContentKey = keyof typeof PAGE_CONTENT;

export type PageContentValue = (typeof PAGE_CONTENT)[PageContentKey];

/** マイページのリンク先 */
export const PAGE_LINK = {
  ...MYPAGE_LINK,
  ...LISTING_LINK,
  ...EARNING_LINK,
  ...SETTING_LINK,
} as const;

/** マイページのタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  ...MYPAGE_CONTENT_ENUM_JA,
  ...LISTING_CONTENT_ENUM_JA,
  ...EARNING_CONTENT_ENUM_JA,
  ...SETTING_CONTENT_ENUM_JA,
} as const;

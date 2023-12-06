/** 個人情報設定ページのコンテンツ */
export const PAGE_CONTENT = {
  ADDRESS: "address",
  PROFILE: "profile",
} as const;

type PageContentKey = keyof typeof PAGE_CONTENT;

type PageContentValue = (typeof PAGE_CONTENT)[PageContentKey];

/** 個人情報設定ページのリンク先 */
export const PAGE_LINK = {
  [PAGE_CONTENT.ADDRESS]: "/mypage/personal-info/address",
  [PAGE_CONTENT.PROFILE]: "/mypage/personal-info/profile",
} as const satisfies Record<PageContentValue, string>;

/** 個人情報設定ページのタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  [PAGE_CONTENT.ADDRESS]: "住所編集",
  [PAGE_CONTENT.PROFILE]: "プロフィール編集",
} as const satisfies Record<PageContentValue, string>;

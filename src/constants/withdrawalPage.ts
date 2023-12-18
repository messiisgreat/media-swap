/** 出金ページのコンテンツ */
export const PAGE_CONTENT = {
  REQUEST: "request",
  HISTORY: "history",
} as const;

type PageContentKey = keyof typeof PAGE_CONTENT;

type PageContentValue = (typeof PAGE_CONTENT)[PageContentKey];

/** 出金ページのコンテンツリンク先 */
export const PAGE_LINK = {
  [PAGE_CONTENT.REQUEST]: "/mypage/withdrawal/request",
  [PAGE_CONTENT.HISTORY]: "/mypage/withdrawal/history",
} as const satisfies Record<PageContentValue, string>;

/** 出金ページのコンテンツタイトル */
export const PAGE_CONTENT_ENUM_JA = {
  [PAGE_CONTENT.REQUEST]: "出金申請",
  [PAGE_CONTENT.HISTORY]: "出金履歴",
} as const satisfies Record<PageContentValue, string>;

import {
  LISTING_CONTENT,
  LISTING_CONTENT_ENUM_JA,
  LISTING_LINK,
} from "@/constants/myPage";
import { type PageInfo } from "@/ui/tabmenu";

// 出品商品用のタブリンク
export const LISTING_TAB_CONTENT = [
  {
    title: LISTING_CONTENT_ENUM_JA[LISTING_CONTENT.LISTINGS],
    href: LISTING_LINK[LISTING_CONTENT.LISTINGS],
  },
  {
    title: LISTING_CONTENT_ENUM_JA[LISTING_CONTENT.SELL_IN_PROGRESS],
    href: LISTING_LINK[LISTING_CONTENT.SELL_IN_PROGRESS],
  },
  {
    title: LISTING_CONTENT_ENUM_JA[LISTING_CONTENT.SOLD],
    href: LISTING_LINK[LISTING_CONTENT.SOLD],
  },
] as const satisfies PageInfo[];

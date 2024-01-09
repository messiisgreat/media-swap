import { type PageInfo } from "@/ui/tabmenu/TabMenu";

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
] as const satisfies PageInfo[];

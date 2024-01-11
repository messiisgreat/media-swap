import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
  PAGE_LINK,
} from "@/constants/myPage";
import { type PageInfo } from "@/ui/tabmenu/TabMenu";

export const PAGE_TAB_CONTENT = [
  {
    title: PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.ITEMS],
    url: PAGE_LINK[PAGE_CONTENT.ITEMS],
  },
  {
    title: PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.EARNING],
    url: PAGE_LINK[PAGE_CONTENT.EARNING],
  },
  {
    title: PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.SETTINGS],
    url: PAGE_LINK[PAGE_CONTENT.SETTINGS],
  },
] as const satisfies PageInfo[];

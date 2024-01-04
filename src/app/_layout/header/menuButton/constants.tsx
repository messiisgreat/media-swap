/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PAGE_CONTENT, type PageContentValue } from "@/constants/myPage";
import { type IconType } from "react-icons";
import { FaRegMoneyBillAlt, FaTags } from "react-icons/fa";
import { FaBagShopping, FaHeartCircleCheck } from "react-icons/fa6";
import { LuScrollText } from "react-icons/lu";
import { TbGitPullRequestDraft } from "react-icons/tb";

type MenuButtonProp = {
  PAGE_CONTENT: PageContentValue;
  Icon: IconType;
};

export const menuButtonConstants = [
  { PAGE_CONTENT: PAGE_CONTENT.PERSONAL_INFO, Icon: FaBagShopping },
  { PAGE_CONTENT: PAGE_CONTENT.PURCHASES, Icon: FaTags },
  { PAGE_CONTENT: PAGE_CONTENT.DRAFTS, Icon: TbGitPullRequestDraft },
  { PAGE_CONTENT: PAGE_CONTENT.LIKES, Icon: FaHeartCircleCheck },
  { PAGE_CONTENT: PAGE_CONTENT.SALES_HISTORY, Icon: LuScrollText },
  { PAGE_CONTENT: PAGE_CONTENT.WITHDRAWAL, Icon: FaRegMoneyBillAlt },
] as const satisfies MenuButtonProp[];

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PAGE_CONTENT, type PageContentValue } from "@/constants/myPage";
import { type IconType } from "react-icons";
import { FaMoneyCheckAlt, FaTags } from "react-icons/fa";
import { FaBriefcase, FaGear, FaHeartCircleCheck } from "react-icons/fa6";
import { TbGitPullRequestDraft } from "react-icons/tb";

type MenuButtonProp = {
  PAGE_CONTENT: PageContentValue;
  Icon: IconType;
};

export const menuButtonConstants: ReadonlyArray<MenuButtonProp> = [
  { PAGE_CONTENT: PAGE_CONTENT.LISTINGS, Icon: FaBriefcase },
  { PAGE_CONTENT: PAGE_CONTENT.PURCHASES, Icon: FaTags },
  { PAGE_CONTENT: PAGE_CONTENT.DRAFTS, Icon: TbGitPullRequestDraft },
  { PAGE_CONTENT: PAGE_CONTENT.LIKES, Icon: FaHeartCircleCheck },
  { PAGE_CONTENT: PAGE_CONTENT.ITEMS, Icon: FaTags },
  { PAGE_CONTENT: PAGE_CONTENT.EARNING, Icon: FaMoneyCheckAlt },
  { PAGE_CONTENT: PAGE_CONTENT.SETTINGS, Icon: FaGear },
];

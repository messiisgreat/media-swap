/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PAGE_CONTENT, type PageContentValue } from "@/constants/myPage";
import { type IconType } from "react-icons";
import { FaTags } from "react-icons/fa";
import { FaBagShopping, FaHeartCircleCheck } from "react-icons/fa6";
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
] as const satisfies MenuButtonProp[];

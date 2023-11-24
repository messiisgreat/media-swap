import { SITE_NAME } from "@/constants/site";

export type LinkObject = {
  text: string;
  url: string;
};

export type LinkSection = {
  title: string;
  items: LinkObject[];
};

export const links: LinkSection[] = [
  {
    title: `${SITE_NAME}について`,
    items: [
      { text: "会社概要(運営会社)", url: "/about" },
      { text: "採用情報", url: "/recruit" },
    ],
  },
  {
    title: "ヘルプ",
    items: [{ text: "お問い合わせ", url: "/inquiry" }],
  },
  {
    title: "プライバシーと利用規約",
    items: [
      { text: "プライバシーポリシー", url: "/privacy-policy/" },
      { text: "外部送信ポリシー", url: "/cookie-policy/" },
      { text: `${SITE_NAME}利用規約`, url: "/tos/" },
      { text: "電磁交付規約", url: "/digital/" },
      { text: "コンプライアンスポリシー", url: "/compliance/" },
      {
        text: "個人データの安全管理に係る基本方針",
        url: "/data-security/",
      },
      { text: "特定商取引に関する表記", url: "/tokutei/" },
      { text: "資金決済法に基づく表示", url: "/shikin-kessai/" },
      { text: "法務確認について", url: "/legal-check/" },
    ],
  },
];

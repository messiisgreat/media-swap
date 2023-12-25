import { TextLink } from "@/ui";

export type LinkObject = {
  text: string;
  url: string;
};

export const links: LinkObject[] = [
  { text: "利用規約", url: "/tos" },
  { text: "プライバシーポリシー", url: "/privacy-policy" },
  { text: "クッキーポリシー", url: "/cookie-policy" },
  { text: "電子交付規約", url: "/digital" },
  { text: "コンプライアンスポリシー", url: "/compliance" },
];

/**
 * 利用規約に関するリンク一覧
 */
export const LegalLinksList = () => (
  <ul>
    {links.map((item) => (
      <li key={item.url}>
        <TextLink href={item.url} className="text-sm">
          {item.text}
        </TextLink>
      </li>
    ))}
  </ul>
);

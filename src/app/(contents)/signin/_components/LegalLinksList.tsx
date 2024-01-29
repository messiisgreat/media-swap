import { TextLink } from "@/ui";
import { type Route } from "next";

export type LinkObject = {
  text: string;
  href: Route;
};

export const links: LinkObject[] = [
  { text: "利用規約", href: "/tos" },
  { text: "プライバシーポリシー", href: "/privacy-policy" },
  { text: "クッキーポリシー", href: "/cookie-policy" },
  { text: "電子交付規約", href: "/digital" },
  { text: "コンプライアンスポリシー", href: "/compliance" },
];

/**
 * 利用規約に関するリンク一覧
 */
export const LegalLinksList = () => (
  <ul>
    {links.map((item) => (
      <li key={item.href}>
        <TextLink href={item.href} className="text-sm">
          {item.text}
        </TextLink>
      </li>
    ))}
  </ul>
);

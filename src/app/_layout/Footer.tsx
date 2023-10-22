import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

type LinkObject = {
  text: string;
  url: string;
};

type LinkSection = {
  title: string;
  items: LinkObject[];
};

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const links: LinkSection[] = [
    {
      title: "Swappyについて",
      items: [
        { text: "会社概要(運営会社)", url: "#" },
        { text: "採用情報", url: "#" },
      ],
    },
    {
      title: "ヘルプ",
      items: [{ text: "お問い合わせ", url: "#" }],
    },
    {
      title: "プライバシーと利用規約",
      items: [
        { text: "プライバシーポリシー", url: "/static/privacy-policy/" },
        { text: "外部送信ポリシー", url: "/static/cookie-policy/" },
        { text: "Swappy利用規約", url: "/static/tos/" },
        { text: "電磁交付規約", url: "/static/digital/" },
        { text: "コンプライアンスポリシー", url: "/static/compliance/" },
        {
          text: "個人データの安全管理に係る基本方針",
          url: "/static/data-security/",
        },
        { text: "特定商取引に関する表記", url: "/static/tokutei/" },
        { text: "資金決済法に基づく表示", url: "/static/shikin-kessai/" },
        { text: "法務確認について", url: "/static/legal-check/" },
      ],
    },
  ];

  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        {links.map((section, index) => (
          <div key={index}>
            <span className="footer-title">{section.title}</span>
            {section.items.map((item, i) => (
              <Link
                href={item.url}
                key={i}
                className="font-medium hover:underline"
              >
                {item.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="m-auto max-w-7xl md:flex md:flex-grow md:justify-between">
        <div className="my-2 flex gap-2">
          {/* todo: twitterのリンクを追加する */}
          <Link href="https://twitter.com/home" target="_blank">
            <FaSquareXTwitter size={30} />
          </Link>
          {/* todo: facebookのリンクを追加する */}
          <Link href="https://www.facebook.com/" target="_blank">
            <FaFacebookSquare size={30} />
          </Link>
        </div>
        <span className="text-sm">©︎Swappy</span>
      </div>
    </footer>
  );
}

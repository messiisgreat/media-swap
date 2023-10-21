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
    <footer className="bg-[#444] p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        {/* // TODO: 利用規約ページを作成する */}
        <div>
          <span className="text-white font-semibold">Swappyについて</span>
          <a className="link-hover link">会社概要(運営会社)</a>
          <a className="link-hover link">採用情報</a>
        </div>
        <div>
          <span className="text-white font-semibold">ヘルプ</span>
          <a className="link-hover link">お問い合わせ</a>
        </div>
        <div>
          <span className="text-white font-semibold">プライバシーと利用規約</span>
          <Link
            href={"/static/privacy-policy/"}
            className="font-medium hover:underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href={"/static/cookie-policy/"}
            className="font-medium hover:underline"
          >
            外部送信ポリシー
          </Link>
          {/* todo: facebookのリンクを追加する */}
          <Link href="https://www.facebook.com/" target="_blank">
            <FaFacebookSquare size={30} />
          </Link>
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto justify-center">
        <div className="md:flex md:flex-grow md:justify-between">
          <div className="my-2 flex">
            <a
              href="https://twitter.com/home"
              className="pr-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter size={30} />
            </a>
            <a
              href="https://twitter.com/home"
              className="px-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare size={30} />
            </a>
          </div>
          <div className="flex">
            <div>
              <p className="text-sm">©︎Swappy</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

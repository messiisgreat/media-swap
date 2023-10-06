import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        {/* // TODO: 利用規約ページを作成する */}
        <div>
          <span className="footer-title">Swappyについて</span>
          <a className="link-hover link">会社概要(運営会社)</a>
          <a className="link-hover link">採用情報</a>
        </div>
        <div>
          <span className="footer-title">ヘルプ</span>
          <a className="link-hover link">お問い合わせ</a>
        </div>
        <div>
          <span className="footer-title">プライバシーと利用規約</span>
          <Link
            href={"/privacy-policy/"}
            className="font-medium hover:underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href={"/cookie-policy/"}
            className="font-medium hover:underline"
          >
            外部送信ポリシー
          </Link>
          <Link href={"/tos/"} className="font-medium hover:underline">
            Swappy利用規約
          </Link>
          <Link href={"/digital/"} className="font-medium hover:underline">
            電磁交付規約
          </Link>
          <a className="link-hover link">個人データの安全管理に係る基本方針</a>
          <a className="link-hover link">特定商取引に関する表記</a>
          <a className="link-hover link">資金決済法に基づく表示</a>
          <a className="link-hover link">法務確認について</a>
        </div>
      </div>
    </footer>
  );
}

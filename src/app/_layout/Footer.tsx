"use client";
import { useEffect, useState } from "react";
import { FooterIcons } from "@/app/_layout/FooterIcons";
import { FooterContent, FooterMobileContent } from "@/app/_layout/FooterContents";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, [isMobile]);

  return (
    <footer className="bg-neutral p-10 text-neutral-content">
<<<<<<< HEAD
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
      <div className="m-auto flex max-w-7xl">
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
=======
      {isMobile ? (
        <FooterMobileContent />
      ) : (
        <FooterContent />
      )}
      <FooterIcons />
>>>>>>> 2beeabc (footerのメニュー開閉追加)
    </footer>
  );
}

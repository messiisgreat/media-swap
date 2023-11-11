import { SITE_NAME } from "@/constants/site";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

/**
 * フッター下部のソーシャルアイコン及びコピーライト
 * @returns footer
 */
export const FooterIcons = () => {
  return (
    <div className="m-auto max-w-7xl md:flex md:grow md:justify-between">
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
      <span className="text-sm">{`©${SITE_NAME}`}</span>
    </div>
  );
};

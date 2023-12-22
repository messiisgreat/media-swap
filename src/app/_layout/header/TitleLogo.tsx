import { SITE_NAME } from "@/constants/site";
import logo from "@/images/logo.png";
import { H } from "@/ui/structure/H";
import Image from "next/image";
import Link from "next/link";

/**
 * ヘッダーに表示するタイトルロゴ
 * @returns
 */
export const TitleLogo = () => {
  return (
    <Link href="/" className="btn btn-ghost">
      <Image src={logo} height={36} width={36} alt={SITE_NAME} />
      <H className="hidden text-xl normal-case md:inline">{SITE_NAME}</H>
    </Link>
  );
};

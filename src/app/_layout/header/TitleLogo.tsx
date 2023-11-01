import logo from "@/assets/logo.png";
import { H } from "@/components/structure/H";
import { SITE_NAME } from "config";
import Image from "next/image";
import Link from "next/link";

type TitleLogoProps = {
  className?: string;
};

/**
 * ヘッダーに表示するタイトルロゴ
 * @returns
 */
export const TitleLogo = ({ className }: TitleLogoProps) => {
  return (
    <Link href="/" className={`btn btn-ghost ${className}`}>
      <Image src={logo} height={40} width={40} alt={SITE_NAME} />
      <H className="hidden text-xl normal-case lg:inline">{SITE_NAME}</H>
    </Link>
  );
};

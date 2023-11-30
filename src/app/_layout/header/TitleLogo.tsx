import { H } from "@/components/structure/H";
import { SITE_NAME } from "@/constants/site";
import logo from "@/images/logo.png";
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
      <Image src={logo} height={36} width={36} alt={SITE_NAME} />
      <H className="hidden text-xl normal-case md:inline">{SITE_NAME}</H>
    </Link>
  );
};

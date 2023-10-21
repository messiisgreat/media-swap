import logo from "@/assets/logo.png";
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
      <Image src={logo} height={40} width={40} alt="Swappy" />
      <span className="text-xl normal-case">Swappy</span>
    </Link>
  );
};

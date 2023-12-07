import Image from "next/image";

import closeIcon from "@/app/(support)/no-available-service/close.webp";
import { H } from "@/ui/structure/H";

/**
 * 年齢確認で「いいえ」を押したときのページ
 * @see /src/app/age-check/page.tsx
 */
export default function NoAvailableServicePage() {
  return (
    <div className="my-12 flex flex-col items-center">
      <Image src={closeIcon} alt="" width={120} height={120} />
      <H className="my-10 text-4xl font-bold text-red-500">年齢確認</H>
      <p className="font-bold text-orange-600">
        このサイトはアダルトコンテンツを含む為
      </p>
      <p className="font-bold text-orange-600">
        18歳未満の方はご利用いただけません
      </p>
    </div>
  );
}

import Image from "next/image";
import closeIcon from "/src/assets/close.webp";

export default function NoAvailableServicePage() {
  return (
    <div className="my-12 flex flex-col items-center">
      <Image src={closeIcon} alt="" width={120} height={120} />
      <h1 className="my-10 text-4xl font-bold text-red-500">年齢認証</h1>
      <p className="font-bold text-orange-600">
        このサイトはアダルトコンテンツを含むため、18歳未満の方はご利用いただけません
      </p>
    </div>
  );
}

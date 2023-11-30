import { AgeChechContainer } from "@/app/age-check/AgeCheckContainer";
import { H } from "@/components/structure/H";

/**
 * 年齢確認ページ
 */
export default function AgeCheckPage() {
  return (
    <div className="my-16 flex flex-col items-center">
      <H className="text-2xl">年齢確認</H>
      <H className="my-4 text-lg font-bold">あなたは18歳以上ですか？</H>
      <p className="text-xs text-gray-400">
        ここから先は、アダルトコンテンツが含まれる可能性がありますので、
      </p>
      <p className="mb-10 text-xs text-gray-400">
        18歳以上の方のみがご利用いただけます。
      </p>
      <AgeChechContainer />
    </div>
  );
}

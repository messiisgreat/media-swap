import { AgeChechContainer } from "@/app/age-check/AgeCheckContainer";

export default function AgeCheckPage() {
  return (
    <div className="my-16 flex flex-col items-center">
      <h1 className="text-2xl">年齢認証</h1>
      <h2 className="my-4 text-lg font-bold">あなたは18歳以上ですか？</h2>
      <p className="text-xs text-gray-400">
        ここから先は、アダルト商品を扱うアダルトサイトとなります。
      </p>
      <p className="mb-10 text-xs text-gray-400">
        18歳未満の方のアクセスは固くお断りします。
      </p>
      <AgeChechContainer />
    </div>
  );
}

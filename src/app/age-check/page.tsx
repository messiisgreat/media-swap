import AgeCheckAnswerButton from "../components/AgeCheckAnswerButton";

export default function AgeCheckPage() {
    return (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-2xl">
                年齢認証
            </h1>

            <h2 className="my-4 font-bold text-lg">
                あなたは18歳以上ですか？
            </h2>

            <p className="text-gray-400 text-xs">
                ここから先は、アダルト商品を扱うアダルトサイトとなります。
            </p>

            <p className="text-gray-400 text-xs mb-10">
                18歳未満の方のアクセスは固くお断りします。
            </p>

            <div className="flex">
                <AgeCheckAnswerButton isYes={false} />
                <AgeCheckAnswerButton isYes={true} />
            </div>
        </div>
    );
}
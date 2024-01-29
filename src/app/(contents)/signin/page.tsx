import { LegalLinksList } from "@/app/(contents)/signin/_components/LegalLinksList";
import { SignInButton } from "@/app/(contents)/signin/_components/SignInButton";

/**
 * ログインページ
 * /signin
 */
const Page = ({ searchParams }: { searchParams: { callbackUrl?: string } }) => {
  const callbackURL = searchParams.callbackUrl ?? "/";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <p className="mb-6 text-gray-600">
          以下のボタンからログインしてください。
        </p>
        <SignInButton {...{ callbackURL }} />
        <div className="text-gray-600">
          <p className="mb-4">
            登録ボタンをクリックすると、以下に同意したものとみなされます：
          </p>
        </div>
        <LegalLinksList />
      </div>
    </div>
  );
};

export default Page;

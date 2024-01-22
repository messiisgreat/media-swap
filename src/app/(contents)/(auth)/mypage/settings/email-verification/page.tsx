import { SendAuthEmailButton } from "@/app/(contents)/(auth)/mypage/settings/email-verification/_components/SendAuthEmailButton";
import { verifyEmail } from "@/app/(contents)/(auth)/mypage/settings/email-verification/_components/services";
import { GoToHomeButton } from "@/features/GoToHomeButton";
import { Section, TitleUnderbar } from "@/ui/structure";

/**
 * メアド検証ページ
 * /mypage/personal-info/profile/email-verification
 */
const Page = async ({
  searchParams,
}: {
  searchParams: { code: string | undefined };
}) => {
  const code = searchParams.code;
  const result = await verifyEmail(code);

  return (
    <>
      <TitleUnderbar title="メールアドレス認証" />
      <Section>
        <div className="mt-8 text-base font-bold leading-4 text-[#222] sm:text-lg md:mt-12 md:text-2xl xl:mt-28 xl:text-3xl">
          <div className="flex flex-col items-center">
            <div className="mb-7">
              {result.isSuccess ? result.value : result.error}
            </div>
            <div className="flex w-full flex-row justify-evenly">
              <GoToHomeButton />
              {result?.isFailure && <SendAuthEmailButton />}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Page;

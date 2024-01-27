import { GoToHomeButton } from "@/features/GoToHomeButton";
import { Section, TitleUnderbar } from "@/ui/structure";
import React from "react";

/**
 * 認証メール送信完了ページ
 * /mypage/settings/profile/email-success
 */
const Page = () => (
    <>
      <TitleUnderbar title="メールアドレス認証" />
      <Section>
        <div className="mt-8 text-base font-bold leading-4 text-[#222] sm:text-lg md:mt-12 md:text-2xl xl:mt-28 xl:text-3xl">
          <div className="flex flex-col items-center">
            <div className="mb-7">
              認証メールが送信されました。Emailをご確認ください。
            </div>
            <div className="flex w-full flex-row justify-evenly">
              <GoToHomeButton />
            </div>
          </div>
        </div>
      </Section>
    </>
)

export default Page;

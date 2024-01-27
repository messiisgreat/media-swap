import { ProfileForm } from "@/app/(contents)/(auth)/mypage/settings/profile/ProfileForm";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { findUserById } from "@/repositories/user";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

const redirectURL = `/api/auth/login?callbackUrl=${
  PAGE_LINK[PAGE_CONTENT.PROFILE]
}` as const;

/**
 * プロフィール編集ページ
 * /mypage/settings/profile
 */
const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect(redirectURL);
  }
  const user = await findUserById(sessionUser.id);
  if (!user) {
    redirect(redirectURL);
  }

  return (
    <Section>
      <VerifyProvider>
        <ProfileForm user={user} />
      </VerifyProvider>
    </Section>
  );
};

export default Page;

import { ProfileForm } from "@/app/(contents)/(auth)/mypage/personal-info/profile/ProfileForm";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { findUserById } from "@/repositories/user";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

const redirectURL = "/api/auth/login?callbackUrl=/mypage/personal-info/profile";

/**
 * プロフィール編集ページ
 * /mypage/personal-info/profile
 */
export default async function Page() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect(redirectURL);
  }
  const user = await findUserById(sessionUser.id);
  if (!user) {
    redirect(redirectURL);
  }

  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.PROFILE]} />
      <Section>
        <VerifyProvider>
          <ProfileForm user={user} />
        </VerifyProvider>
      </Section>
    </>
  );
}

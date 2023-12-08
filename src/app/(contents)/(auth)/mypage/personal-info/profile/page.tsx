import { ProfileForm } from "@/app/(contents)/(auth)/mypage/personal-info/profile/ProfileForm";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

/**
 * プロフィール編集ページ
 */
export default async function Page() {
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.PROFILE]} />
      <Section>
        <VerifyProvider>
          <ProfileForm />
        </VerifyProvider>
      </Section>
    </>
  );
}

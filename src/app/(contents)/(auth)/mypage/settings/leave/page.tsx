import { LeaveButton } from "@/app/(contents)/(auth)/mypage/settings/leave/LeaveForm";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { findUserById } from "@/repositories/user";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";

/**
 * アカウント退会ページ
 * /mypage/settings/leave
 */
const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return null;
  }
  const user = await findUserById(sessionUser.id);
  if (!user) {
    return null;
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.LEAVE]} />
      <Section>
        <VerifyProvider>
          <LeaveButton userId={user.id} />
        </VerifyProvider>
      </Section>
    </>
  );
};

export default Page;

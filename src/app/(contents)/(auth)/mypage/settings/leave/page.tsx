import { LeaveButton } from "@/app/(contents)/(auth)/mypage/settings/leave/_components/leaveButton";
import { findUserById } from "@/repositories/user";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section } from "@/ui/structure";
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
    <Section>
      <VerifyProvider>
        <LeaveButton userId={user.id} />
      </VerifyProvider>
    </Section>
  );
};

export default Page;

import { NoticeForm } from "@/app/(contents)/(auth)/mypage/settings/notifications/_components/noticeForm";
import { findUserById } from "@/repositories/user";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";

/**
 * 通知設定
 * /mypage/notifications
 */
const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return;
  const user = await findUserById(sessionUser.id);
  return (
    <Section>
      <VerifyProvider>
        <NoticeForm noticePermissionCode={user.noticePermissionCode} />
      </VerifyProvider>
    </Section>
  );
};

export default Page;

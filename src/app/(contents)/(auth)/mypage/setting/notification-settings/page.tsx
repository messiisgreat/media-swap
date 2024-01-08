import { NoticeForm } from "@/app/(contents)/(auth)/mypage/setting/notification-settings/NoticeForm";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { findUserById } from "@/repositories/user";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";

/**
 * 通知設定
 * /mypage/notification-settings
 */
const Page = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return;
  const user = await findUserById(sessionUser.id);
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.LISTINGS]} />
      <Section>
        <VerifyProvider>
          <NoticeForm noticePermissionCode={user.noticePermissionCode} />
        </VerifyProvider>
      </Section>
    </>
  );
};

export default Page;

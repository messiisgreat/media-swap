import { AddressForm } from "@/app/(contents)/(auth)/mypage/settings/address/AddressForm";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { findAddress } from "@/repositories/address";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";

/**
 * 住所編集ページ
 * /mypage/personal-info/address
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    return null;
  }
  const address = await findAddress(user.id);

  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.ADDRESS]} />
      <Section>
        <VerifyProvider>
          <AddressForm address={address} />
        </VerifyProvider>
      </Section>
    </>
  );
};

export default Page;

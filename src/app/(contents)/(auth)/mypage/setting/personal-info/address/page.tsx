import { AddressForm } from "@/app/(contents)/(auth)/mypage/setting/personal-info/address/AddressForm";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { getAddress } from "@/repositories/address";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

const redirectURL = "/api/auth/login?callbackUrl=/mypage/setting/personal-info/address";

/**
 * 住所編集ページ
 * /mypage/personal-info/address
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect(redirectURL);
  }
  const address = await getAddress(user.id);

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
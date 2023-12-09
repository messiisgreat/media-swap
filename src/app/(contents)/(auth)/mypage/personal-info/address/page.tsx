import { AddressForm } from "@/app/(contents)/(auth)/mypage/personal-info/address/AddressForm";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { getAddress } from "@/repositories/address";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

const redirectURL = "/api/auth/login?callbackUrl=/mypage/personal-info/address";

/**
 * 住所編集ページ
 * /mypage/personal-info/address
 */
export default async function Page() {
  const user = await getSessionUser();
  if (!user) {
    redirect(redirectURL);
  }
  const address = await getAddress(user.id);
  if (!address) {
    redirect(redirectURL);
  }

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
}

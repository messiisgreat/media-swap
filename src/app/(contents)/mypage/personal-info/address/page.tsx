import { AddressForm } from "@/app/(contents)/mypage/personal-info/address/AddressForm";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

/**
 *住所編集ページ
 */
export default async function Page() {
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.ADDRESS]} />
      <Section>
        <VerifyProvider>
          <AddressForm />
        </VerifyProvider>
      </Section>
    </>
  );
}

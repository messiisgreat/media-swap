import { AddressForm } from "@/app/mypage/personal-info/AddressForm";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

/**
 *住所変更ページ
 */
export default async function Page() {
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.PRIVACY]} />
      <Section>
        <VerifyProvider>
          <AddressForm />
        </VerifyProvider>
      </Section>
    </>
  );
}

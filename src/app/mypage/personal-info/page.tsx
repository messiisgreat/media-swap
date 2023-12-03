import { AddressForm } from "@/app/mypage/personal-info/AddressForm";
import { VerifyProvider } from "@/components/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/components/structure";

/**
 *住所変更ページ
 */
export default async function Page() {
  return (
    <>
      <PageTitle title="登録情報変更" />
      <Section>
        <VerifyProvider>
          <AddressForm />
        </VerifyProvider>
      </Section>
    </>
  );
}

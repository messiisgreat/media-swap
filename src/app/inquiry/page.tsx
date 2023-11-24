import { MailForm } from "@/app/inquiry/MailForm";
import { VerifyProvider } from "@/components/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/components/structure";

/**
 * お問い合わせページ
 * /inquiry
 */
export const Page = () => {
  return (
    <>
      <PageTitle title="お問い合わせ" />
      <Section>
        <VerifyProvider>
          <MailForm />
        </VerifyProvider>
      </Section>
    </>
  );
};

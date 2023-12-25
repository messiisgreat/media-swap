import { MailForm } from "@/app/(support)/inquiry/MailForm";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

/**
 * お問い合わせページ
 * /inquiry
 */
const Page = () => (
    <>
      <PageTitle title="お問い合わせ" />
      <div className="text-left">
        <p>
          このページでは当サイトに関するご意見、ご感想などを受け付けております。
        </p>
        <p>どんな些細なことでも結構ですのでお気軽にお問い合わせください。</p>
        <p>
          なお、返信には最大5営業日ほど頂く場合がございますので予めご了承ください。
        </p>
      </div>
      <Section>
        <VerifyProvider>
          <MailForm />
        </VerifyProvider>
      </Section>
    </>
  );

export default Page;

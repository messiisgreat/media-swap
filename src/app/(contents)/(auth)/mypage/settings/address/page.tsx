import { AddressForm } from "@/app/(contents)/(auth)/mypage/settings/address/AddressForm";
import { findAddress } from "@/repositories/address";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";

/**
 * 住所編集ページ
 * /mypage/personal-info/address
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user?.id || !user.name) {
    return null;
  }
  const address = await findAddress(user.id);

  return (
    <Section>
      <VerifyProvider>
        <AddressForm address={address} userName={user.name} />
      </VerifyProvider>
    </Section>
  );
};

export default Page;

import { VerifyProvider } from "@/components/form/securityVerifier/VerifyProvider";
import AddressForm from "./AddressForm";

/**
 *住所変更ページ
 */
export default async function Page() {
  return (
    <>
      <VerifyProvider>
        <AddressForm />;
      </VerifyProvider>
    </>
  );
}

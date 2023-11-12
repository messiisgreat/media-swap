import AddressForm from "./AddressForm";

// import { getSessionUser } from "@/utils/getSession";

/**
 *住所変更ページ
 */
export default async function Page() {
  // const user = (await getSessionUser()) || null;

  return <AddressForm user={null} />;
}

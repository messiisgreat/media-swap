import { type Metadata } from "next";

import { ListingForm } from "@/app/(contents)/(auth)/listing/_listingForm/ListingForm";
import { findTags } from "@/repositories/tag";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

import { findAddress } from "@/repositories/address";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

const title = "商品を出品する";

const redirectURL = "/api/auth/login?callbackUrl=/mypage/personal-info/address";

export const metadata: Metadata = {
  title,
  description: "商品を出品する",
};

/**
 * 商品追加ページ
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user?.id || !user.name) {
    redirect(redirectURL);
  }

  const [tags, address] = await Promise.all([findTags(), findAddress(user.id)]);

  return (
    <>
      <PageTitle title={title} />
      <Section>
        <VerifyProvider>
          <ListingForm userName={user.name} tags={tags} address={address} />
        </VerifyProvider>
      </Section>
    </>
  );
};

export default Page;

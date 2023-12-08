import { type Metadata } from "next";

import { ListingForm } from "@/app/(contents)/(auth)/add-listing/ListingForm";
import { findTags } from "@/repositories/tag";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

const title = "商品を出品する";

export const metadata: Metadata = {
  title,
  description: "商品を出品する",
};

/**
 * 商品追加ページ
 */
export default async function Page() {
  const tags = await findTags();

  return (
    <>
      <PageTitle title={title} />
      <Section>
        <VerifyProvider>
          <ListingForm tags={tags} />
        </VerifyProvider>
      </Section>
    </>
  );
}

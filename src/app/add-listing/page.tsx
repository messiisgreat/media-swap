import { ListingForm } from "@/app/add-listing/ListingForm";
import { findTags } from "@/repositories/tag";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSession } from "@/utils/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "商品を出品する";

export const metadata: Metadata = {
  title,
  description: "商品を出品する",
};

/**
 * 商品追加ページ
 */
export default async function Page() {
  // 仮対応
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-listing");
  }

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

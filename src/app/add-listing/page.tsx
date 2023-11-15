import { ListingForm } from "@/app/add-listing/ListingForm";
import { PageTitle, Section } from "@/components/structure";
import { findTags } from "@/services/tag";
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
        <ListingForm tags={tags} />
      </Section>
    </>
  );
}

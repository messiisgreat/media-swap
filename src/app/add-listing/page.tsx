import { ListingForm } from "@/app/add-listing/ListingForm";

import { Section } from "@/components/structure";
import { PageTitle } from "@/components/structure/PageTitle";
import { findTags } from "@/services/tag";
import { Metadata } from "next";

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
        <ListingForm tags={tags} />
      </Section>
    </>
  );
}

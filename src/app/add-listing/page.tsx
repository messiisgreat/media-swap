import { ListingForm } from "@/app/add-listing/ListingForm";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Section } from "@/components/structure";
import { PageTitle } from "@/components/structure/PageTitle";
import { findTags } from "@/services/tag";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession(authOptions);
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

import { ListingForm } from "@/app/add-listing/ListingForm";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { H } from "@/components/structure/H";
import { findTags } from "@/services/tag";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "商品を出品する",
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
      <H className="mb-3 text-lg font-bold">商品を出品する</H>
      <ListingForm tags={tags} />
    </>
  );
}

import { ProductForm } from "@/app/add-product/ProductForm";
import { fetchTags } from "@/app/add-product/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { H } from "@/components/structure/H";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Swappy",
};

/**
 * 商品追加ページ
 */
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  
  const tags = await fetchTags();

  return (
      <>
      <H className="mb-3 text-lg font-bold">Add Product</H>
      <ProductForm tags={tags} />
      </>
  );
}

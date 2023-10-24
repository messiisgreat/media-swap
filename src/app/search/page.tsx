import ProductCard from "@/components/ProductCard.1";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
// TODO: 日本語クエリにも対応する

interface SearchPageProps {
  searchParams: { query: string; tagid: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Swappy`,
  };
}

export default async function SearchPage({
  searchParams: { query, tagid },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { tagIds: { has: tagid } },
      ],
    },
    orderBy: { id: "desc" },
  });
  if (products.length === 0) {
    return <div className="text-center">商品が見つかりません</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

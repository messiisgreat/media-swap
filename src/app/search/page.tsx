import { ListingCard } from "@/components";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
// TODO: 日本語クエリにも対応する

type SearchPageProps = {
  searchParams: { query: string; tagid: string };
};

/**
 * OGP生成
 */
export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `検索結果: ${query}`,
  };
}

/**
 * 検索ページ
 * @param param0.searchParams.query 検索クエリ
 * @param param0.searchParams.tagid タグID
 */
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
    <div className="my-4 px-4 lg:px-0">
      <p className="mb-4 text-lg font-medium">検索結果</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ListingCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

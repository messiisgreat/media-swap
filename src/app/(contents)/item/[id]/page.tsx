import { ItemSessionContainer } from "@/app/(contents)/item/[id]/_components/ItemSessionContainer";
import { findItemWithHandling } from "@/app/(contents)/item/[id]/_components/actions";
import { type Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};

/**
 * OGP生成
 */
export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const item = await findItemWithHandling(id);
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      images: {
        url: item.images[0].imageURL,
        width: 1200,
        height: 630,
      },
    },
  };
}

/**
 * 商品ページ
 * /item/[id]
 * @returns loading > 出品のプレースホルダ > 出品情報 > [いいね状況,コメント一覧] > 読込完了
 */
const Page = ({ params: { id } }: Props) => {
  return (
    <Suspense fallback={null}>
      <ItemSessionContainer id={id} />
    </Suspense>
  );
};

export default Page;

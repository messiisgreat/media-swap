import { FirstLoadContainer } from "@/app/(contents)/item/[itemId]/FirstLoadContainer";
import { findItemWithHandling } from "@/app/(contents)/item/[itemId]/services";
import { type Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: {
    itemId: string;
  };
};

/**
 * OGP生成
 */
export const generateMetadata = async ({
  params: { itemId },
}: Props): Promise<Metadata> => {
  const item = await findItemWithHandling(itemId);
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      images: {
        url: item.images[0]?.imageURL || "",
        width: 1200,
        height: 630,
      },
    },
  };
};

/**
 * 商品ページ
 * /item/[itemId]
 * @returns loading > 出品のプレースホルダ > 出品情報 > [いいね状況,コメント一覧] > 読込完了
 * @todo FirstLoadContainerのFallbackコンポーネントを作成する
 */
const Page = ({ params: { itemId } }: Props) => (
  <Suspense fallback={null}>
    <FirstLoadContainer itemId={itemId} />
  </Suspense>
);

export default Page;

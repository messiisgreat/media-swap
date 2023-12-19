import { ItemSessionContainer } from "@/app/(contents)/item/[id]/_components/ItemSessionContainer";
import { findItemWithHandling } from "@/app/(contents)/item/[id]/actions";
import { type Metadata } from "next";

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
 */
const Page = ({ params: { id } }: Props) => {
  return <ItemSessionContainer id={id} />;
};

export default Page;

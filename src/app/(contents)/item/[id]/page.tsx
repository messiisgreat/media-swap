import { type Metadata } from "next";

import Carousel from "@/app/(contents)/item/[id]/Carousel";
import { ItemDescription } from "@/app/(contents)/item/[id]/ItemDescription";
import { ItemInformation } from "@/app/(contents)/item/[id]/ItemInformation";
import { CommentSection } from "@/app/(contents)/item/[id]/_components/commentSection/CommentSection";
import { LikeButton } from "@/app/(contents)/item/[id]/_components/likeButton";
import { Toolbar } from "@/app/(contents)/item/[id]/_components/toolbar/Toolbar";
import TransactionButton from "@/app/(contents)/item/[id]/_components/transactionButton";
import { browsing } from "@/app/(contents)/item/[id]/actions";
import { findItemById } from "@/repositories/item";
import { Badge } from "@/ui/Badge";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { H } from "@/ui/structure/H";
import { getSessionUser } from "@/utils/session";

type ItemPageProps = {
  params: {
    id: string;
  };
};

/**
 * OGP生成
 */
export async function generateMetadata({
  params: { id },
}: ItemPageProps): Promise<Metadata> {
  const item = await findItemById(id);
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
 * @param param0.params.id 商品ID
 */
export default async function Page({ params: { id } }: ItemPageProps) {
  const [item, user] = await Promise.all([findItemById(id), getSessionUser()]);
  const images = item.images;
  const userId = user?.id;
  const isOwner = userId === item.sellerId;
  await browsing(item.id, userId as string);

  return (
    <VerifyProvider>
      <Carousel isSoldOut={Boolean(item.transaction?.id)} images={images} />
      <H className="w-full text-xl font-bold lg:text-2xl">{item.name}</H>
      <Section className="grid w-full items-start gap-4">
        <div className="grid grid-cols-6 grid-rows-2 items-center justify-between">
          <Badge className="badge-lg col-span-5 w-full p-6">
            ¥{item.price}
          </Badge>
          <Toolbar
            className="col-span-1"
            itemId={item.id}
            sessionUser={user!}
            isItemOwner={isOwner}
          />
          <LikeButton
            className="col-span-3"
            itemId={item.id}
            sessionUser={user!}
          />
          <TransactionButton itemId={id} className="col-span-3" />
        </div>
        <TitleUnderbar title="説明" />
        <ItemDescription description={item.description} />
        <TitleUnderbar title="商品情報" />
        <ItemInformation item={item} />
        <TransactionButton itemId={id} />
        <TitleUnderbar title="コメント" />
        <CommentSection
          itemId={item.id}
          sessionUser={user!}
          isItemOwner={isOwner}
        />
      </Section>
    </VerifyProvider>
  );
}

import {
  BrowsingHistory,
  Carousel,
  CommentContainer,
  CommentForm,
  CommentLoading,
  FloatingNavigation,
  ItemDescription,
  ItemInformation,
  LikeButton,
  LikeButtonLoading,
  Toolbar,
  TransactionButton,
} from "@/app/(contents)/item/[itemId]/_components";
import { findItemWithHandling } from "@/app/(contents)/item/[itemId]/services";
import { Badge } from "@/ui/Badge";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { H } from "@/ui/structure/H";
import { getSessionUser } from "@/utils";
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
        url: item.images[0]?.imageURL ?? "",
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
 */
const Page = async ({ params: { itemId } }: Props) => {
  const [item, sessionUser] = await Promise.all([
    findItemWithHandling(itemId),
    getSessionUser(),
  ]);
  const { images, sellerId, transaction } = item;
  const userId = sessionUser?.id;
  const isItemOwner = userId === sellerId;
  const isSoldOut = Boolean(transaction?.id);
  return (
    <VerifyProvider>
      <Carousel {...{ isSoldOut, images }} />
      <H className="w-full text-xl font-bold lg:text-2xl">{item.name}</H>
      <Section className="grid w-full items-start gap-4">
        <div className="grid grid-cols-12 grid-rows-2 items-center justify-between">
          <Badge className="badge-lg col-span-10 w-full p-6">
            ¥{item.price}
          </Badge>
          <Toolbar
            className="col-span-2"
            {...{ itemId, sessionUser, isItemOwner }}
          />
          <Suspense fallback={<LikeButtonLoading className="col-span-3" />}>
            <LikeButton className="col-span-3" {...{ itemId, sessionUser }} />
          </Suspense>
          <Suspense fallback={null}>
            <BrowsingHistory className="col-span-3" itemId={itemId} />
          </Suspense>
          <TransactionButton itemId={itemId} className="col-span-6" />
        </div>
        <TitleUnderbar title="説明" />
        <ItemDescription description={item.description} />
        <TitleUnderbar title="商品情報" />
        <ItemInformation item={item} />
        <TransactionButton itemId={itemId} className="max-md:hidden" />
        <TitleUnderbar title="コメント" />
        <CommentForm {...{ itemId, sessionUser }} />
        <Suspense fallback={<CommentLoading />}>
          <CommentContainer {...{ itemId, sessionUser, isItemOwner }} />
        </Suspense>
      </Section>
      <FloatingNavigation>
        <TransactionButton itemId={itemId} className="w-full" />
      </FloatingNavigation>
    </VerifyProvider>
  );
};

export default Page;

import {
  Carousel,
  CommentContainer,
  CommentForm,
  FloatingNavigation,
  ItemDescription,
  ItemInformation,
  LikeButton,
  LikeButtonLoading,
  Toolbar,
  TransactionButton,
} from "@/app/(contents)/item/[id]/_components";
import { BrowsingHistory } from "@/app/(contents)/item/[id]/_components/BrowsingHistory";
import { findItemWithHandling } from "@/app/(contents)/item/[id]/_components/actions";
import { CommentLoading } from "@/app/(contents)/item/[id]/_components/commentContainer/CommentLoading";
import { Badge } from "@/ui/Badge";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { H } from "@/ui/structure/H";
import { getSessionUser } from "@/utils";
import { Suspense } from "react";

/**
 * 商品ページのデータ取得が責務のコンテナ
 */
export const ItemSessionContainer = async ({ id }: { id: string }) => {
  const [item, sessionUser] = await Promise.all([
    findItemWithHandling(id),
    getSessionUser(),
  ]);
  const itemId = item.id;

  const images = item.images;
  const userId = sessionUser?.id;
  const isItemOwner = userId === item.sellerId;
  const isSoldOut = Boolean(item.transaction?.id);
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

import {
  Carousel,
  CommentSection,
  ItemDescription,
  ItemInformation,
  LikeButton,
  Toolbar,
  TransactionButton,
} from "@/app/(contents)/item/[id]/_components";
import { FloatingNavigation } from "@/app/(contents)/item/[id]/_components/floatingNavigation";
import {
  browsing,
  findItemWithHandling,
} from "@/app/(contents)/item/[id]/actions";
import { Badge } from "@/ui/Badge";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { H } from "@/ui/structure/H";
import { getSessionUser } from "@/utils";

/**
 * 商品ページのデータ取得が責務のコンテナ
 */
export const ItemSessionContainer = async ({ id }: { id: string }) => {
  const [item, user] = await Promise.all([
    findItemWithHandling(id),
    getSessionUser(),
  ]);
  const itemId = item.id;

  const images = item.images;
  const userId = user?.id;
  const isOwner = userId === item.sellerId;
  await browsing(itemId, userId as string);
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
            itemId={itemId}
            sessionUser={user}
            isItemOwner={isOwner}
          />
          <LikeButton
            className="col-span-3"
            itemId={itemId}
            sessionUser={user!}
          />
          <TransactionButton itemId={id} className="col-span-3" />
        </div>
        <TitleUnderbar title="説明" />
        <ItemDescription description={item.description} />
        <TitleUnderbar title="商品情報" />
        <ItemInformation item={item} />
        <TransactionButton itemId={id} className="max-md:hidden" />
        <TitleUnderbar title="コメント" />
        <CommentSection
          itemId={itemId}
          sessionUser={user}
          isItemOwner={isOwner}
        />
      </Section>
      <FloatingNavigation>
        <TransactionButton itemId={itemId} className="w-full" />
      </FloatingNavigation>
    </VerifyProvider>
  );
};

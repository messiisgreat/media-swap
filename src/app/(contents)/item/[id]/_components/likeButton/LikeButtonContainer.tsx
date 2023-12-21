import { LikeButtonPresenter } from "@/app/(contents)/item/[id]/_components/likeButton/LikeButtonPresenter";
import { countLike, findLike } from "@/repositories/like";
import { type SessionUser } from "@/utils";

type Props = {
  /** 商品ID */
  itemId: string;
  /** ログインユーザー */
  sessionUser: SessionUser | undefined;
  /** className */
  className?: string;
};

/**
 * 商品ページでのいいねボタン
 */
export async function LikeButtonContainer({
  itemId,
  sessionUser,
  className = "",
}: Props) {
  const isLoggedin = Boolean(sessionUser);
  const isLikedPromise = isLoggedin && findLike(itemId, sessionUser!.id);
  const [count, isLiked] = await Promise.all([
    countLike(itemId),
    isLikedPromise && Boolean(await isLikedPromise),
  ]);
  return (
    <LikeButtonPresenter
      count={count}
      isLiked={isLiked}
      itemId={itemId}
      isLoggedin={isLoggedin}
      className={className}
    />
  );
}

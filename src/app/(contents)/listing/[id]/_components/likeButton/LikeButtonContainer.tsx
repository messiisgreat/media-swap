import { LikeButtonPresenter } from "@/app/(contents)/listing/[id]/_components/likeButton/LikeButtonPresenter";
import { countLike, findLike } from "@/repositories/like";
import { type User } from "next-auth";

type Props = {
  /** 商品ID */
  listingId: string;
  /** ログインユーザー */
  sessionUser: User | null;
};

/**
 * 商品ページでのいいねボタン
 */
export async function LikeButtonContainer({ listingId, sessionUser }: Props) {
  const count = await countLike(listingId);
  const isLoggedin = Boolean(sessionUser);
  // 左辺がfalseなら右辺を評価しない
  const isLiked =
    isLoggedin && Boolean(await findLike(listingId, sessionUser!.id));
  return (
    <LikeButtonPresenter
      count={count}
      isLiked={isLiked}
      listingId={listingId}
      isLoggedin={isLoggedin}
    />
  );
}

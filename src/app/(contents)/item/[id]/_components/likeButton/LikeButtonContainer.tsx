import { LikeButtonPresenter } from "@/app/(contents)/item/[id]/_components/likeButton/LikeButtonPresenter";
import { countLike, findLike } from "@/repositories/like";
import { type User } from "next-auth";

type Props = {
  /** 商品ID */
  itemId: string;
  /** ログインユーザー */
  sessionUser: User | null;
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
  const count = await countLike(itemId);
  const isLoggedin = Boolean(sessionUser);
  // 左辺がfalseなら右辺を評価しない
  const isLiked =
    isLoggedin && Boolean(await findLike(itemId, sessionUser!.id));
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

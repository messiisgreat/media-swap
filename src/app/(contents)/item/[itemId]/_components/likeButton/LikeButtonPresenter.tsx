"use client";

import { LikeButtonRenderer } from "@/app/(contents)/item/[itemId]/_components/likeButton/LikeButtonRenderer";
import { useOptimisticLike } from "@/app/(contents)/item/[itemId]/_components/likeButton/hooks";
import { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  /** いいね数の初期値 */
  count: number;
  /** いいね済みかどうかの初期値 */
  isLiked: boolean;
  /** 商品ID */
  itemId: string;
  /** ログイン済みかどうか */
  isLoggedin: boolean;
  /** className */
  className?: string;
};

/**
 * いいねボタンの状態管理
 * @returns
 */
export const LikeButtonPresenter = ({
  count,
  isLiked,
  itemId,
  isLoggedin,
  className = "",
}: Props) => {
  const [state, updateLike] = useOptimisticLike({
    count,
    isLiked,
    isPressed: false,
  });

  const handleLike = useCallback(async () => {
    if (!isLoggedin) {
      toast("ログインするといいねできます");
      return;
    }
    await updateLike(itemId);
  }, [isLoggedin, updateLike, itemId]);

  return (
    <LikeButtonRenderer
      count={state.count}
      isLiked={state.isLiked}
      loading={state.isPressed}
      onClick={handleLike}
      className={className}
    />
  );
};

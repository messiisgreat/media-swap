"use client";

import { LikeButtonRenderer } from "@/app/(contents)/item/[id]/_components/likeButton/LikeButtonRenderer";
import { useOptimisticLike } from "@/app/(contents)/item/[id]/_components/likeButton/hooks";
import { useCallback, useState } from "react";
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
export function LikeButtonPresenter({
  count,
  isLiked,
  itemId,
  isLoggedin,
  className = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [state, updateLike] = useOptimisticLike({ count, isLiked });

  const handleLike = useCallback(async () => {
    if (loading) return;
    if (!isLoggedin) {
      toast("ログインするといいねできます");
      return;
    }
    setLoading(true);
    await updateLike(itemId);
    setLoading(false);
  }, [isLoggedin, loading, updateLike, itemId]);

  return (
    <LikeButtonRenderer
      count={state.count}
      isLiked={state.isLiked}
      loading={loading}
      onClick={handleLike}
      className={className}
    />
  );
}

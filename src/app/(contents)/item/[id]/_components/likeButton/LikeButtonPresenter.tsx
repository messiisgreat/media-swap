"use client";

import { LikeButtonRenderer } from "@/app/(contents)/item/[id]/_components/likeButton/LikeButtonRenderer";
import {
  like,
  unlike,
} from "@/app/(contents)/item/[id]/_components/likeButton/actions";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  /** いいね数 */
  count: number;
  /** いいね済みかどうか */
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
  count: _count,
  isLiked: _isLiked,
  itemId,
  isLoggedin,
  className = "",
}: Props) {
  const [isLiked, setIsLiked] = useState(_isLiked);
  const [count, setCount] = useState(_count);
  const [loading, setLoading] = useState(false);

  const handleLike = useCallback(async () => {
    if (loading) return;
    if (!isLoggedin) {
      toast.error("ログインするといいねできます");
      return;
    }
    setLoading(true);

    const result = isLiked ? await unlike(itemId) : await like(itemId);

    if (result.isFailure) {
      toast.error(result.error);
    } else {
      setCount((c) => (isLiked ? c - 1 : c + 1));
      setIsLiked((l) => !l);
    }

    setLoading(false);
  }, [isLiked, itemId, loading, isLoggedin]);

  return (
    <LikeButtonRenderer
      count={count}
      isLiked={isLiked}
      loading={loading}
      onClick={handleLike}
      className={className}
    />
  );
}

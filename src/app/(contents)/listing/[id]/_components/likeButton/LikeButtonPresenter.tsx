"use client";

import { LikeButtonRenderer } from "@/app/(contents)/listing/[id]/_components/likeButton/LikeButtonRenderer";
import {
  like,
  unlike,
} from "@/app/(contents)/listing/[id]/_components/likeButton/actions";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  /** いいね数 */
  count: number;
  /** いいね済みかどうか */
  isLiked: boolean;
  /** 商品ID */
  listingId: string;
  /** ログイン済みかどうか */
  isLoggedin: boolean;
};

/**
 * いいねボタンの状態管理
 * @returns
 */
export function LikeButtonPresenter({
  count: _count,
  isLiked: _isLiked,
  listingId,
  isLoggedin,
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

    const result = isLiked ? await unlike(listingId) : await like(listingId);

    if (result.isFailure) {
      toast.error(result.error);
    } else {
      setCount((c) => (isLiked ? c - 1 : c + 1));
      setIsLiked((l) => !l);
    }

    setLoading(false);
  }, [isLiked, listingId, loading, isLoggedin]);

  return (
    <LikeButtonRenderer
      count={count}
      isLiked={isLiked}
      loading={loading}
      onClick={handleLike}
    />
  );
}

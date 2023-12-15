import {
  like,
  unlike,
} from "@/app/(contents)/item/[id]/_components/likeButton/actions";
import { useOptimistic } from "react";
import toast from "react-hot-toast";

type LikeState = {
  /** いいね数の初期値 */
  count: number;
  /** いいね済みかどうかの初期値 */
  isLiked: boolean;
};

type UseOptimisticResult = [
  /** いいねの状態 */
  LikeState,
  /** いいね数を更新する関数 */
  (itemId: string) => Promise<void>,
];

/**
 * 処理の終了を待たずにいいねの状態を更新するためのカスタムフック
 * @param currentState いいねの初期状態
 * @returns いいねの状態といいね数を更新する関数
 */
export const useOptimisticLike = (
  currentState: LikeState,
): UseOptimisticResult => {
  const [optimisticState, setOptimisticState] = useOptimistic(currentState);

  const updateLike = async (itemId: string) => {
    setOptimisticState((s) => ({
      count: s.count + (s.isLiked ? -1 : 1),
      isLiked: !s.isLiked,
    }));

    const action = optimisticState.isLiked ? unlike : like;

    try {
      const result = await action(itemId);
      if (result.isFailure) {
        toast(result.error);
        setOptimisticState(currentState);
      }
    } catch (error) {
      console.error(error);
      toast("エラーが発生しました");
      setOptimisticState(currentState);
    }
  };

  return [optimisticState, updateLike] as const;
};

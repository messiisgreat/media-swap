import { LikeButtonRenderer } from "@/app/(contents)/item/[itemId]/_components/likeButton/LikeButtonRenderer";

/**
 * いいねボタンのローディング状態
 */
export const LikeButtonLoading = ({
  className = "",
}: {
  className?: string;
}) => (
  <LikeButtonRenderer loading count={0} isLiked={false} className={className} />
);

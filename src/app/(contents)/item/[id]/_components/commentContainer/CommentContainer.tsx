import { fetchComments } from "@/app/(contents)/item/[id]/_components/actions";
import { CommentList } from "@/app/(contents)/item/[id]/_components/commentContainer/commentList";
import { type SessionUser } from "@/utils";

type Props = {
  /** 出品ID */
  itemId: string;
  /** ログインユーザー */
  sessionUser: SessionUser | undefined;
  /** 出品者かどうか */
  isItemOwner: boolean;
};

/**
 * コメント一覧のデータ取得が責務のコンテナ
 */
export const CommentContainer = async ({
  itemId,
  sessionUser,
  isItemOwner,
}: Props) => {
  const comments = await fetchComments(itemId);
  return (
    <CommentList
      {...{
        comments,
        sessionUser,
        isItemOwner,
      }}
    />
  );
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ItemCommentsReadResult } from "@/repositories/itemComment";
import { DropdownMenu, type Menu } from "@/ui/dropdownMenu/DropdownMenu";
import { type SessionUser } from "@/utils";
import { parseRelativeTime } from "@/utils/parseRelativeTime";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaFlag, FaTrash } from "react-icons/fa";

type Props = {
  /** 取得したコメントのうちの1つ */
  comment: ItemCommentsReadResult[number];
  /** ログインユーザー */
  sessionUser: SessionUser | undefined;
  /** 出品者かどうか */
  isItemOwner: boolean;
  /** 通報ボタンを押したときの処理 */
  onReport: () => void;
  /** 削除ボタンを押したときの処理 */
  onDelete: () => void;
};

/**
 * コメントの吹き出し
 * 親コンポーネントが頻繁に再レンダリングされるため、memo化している
 */
export const CommentCard = memo(function CommentBallon({
  comment,
  sessionUser,
  isItemOwner,
  onReport: handleReport,
  onDelete: handleDelete,
}: Props) {
  const reportMenu: Menu = {
    icon: FaFlag,
    text: "通報する",
    onAction: handleReport,
    className: "text-red-500",
  };

  const deleteMenu: Menu = {
    icon: FaTrash,
    text: "削除する",
    onAction: handleDelete,
    className: "text-red-500",
  };
  const isOwnComment = sessionUser?.id === comment.user.id;
  // 自分のコメントかつ出品者でない場合は削除ボタンのみ表示
  // 自分の出品かつ自分以外の通報ボタンと削除ボタンを表示
  // それ以外は通報ボタンのみ表示
  const menu = isOwnComment
    ? [deleteMenu]
    : isItemOwner
      ? [reportMenu, deleteMenu]
      : [reportMenu];
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] grid-rows-[1fr-auto] items-start gap-1 [&>:not(a)]:my-auto">
      <Link href={`/user/${comment.user.id}`} className="row-span-2">
        <Image
          src={comment.user.image || ""}
          alt={comment.user.name || "名無し"}
          className="mr-2 mt-1 h-12 w-12 rounded-full bg-gray-400"
          width={64}
          height={64}
        />
      </Link>
      <p className="text-ellipsis whitespace-nowrap text-lg font-semibold">
        {comment.user.name}
      </p>
      <p className="text-sm text-gray-400">
        {parseRelativeTime(comment.createdAt)}
      </p>
      {sessionUser && <DropdownMenu menuList={menu} />}
      <p className="col-start-2 col-end-5 whitespace-pre-wrap text-sm">
        {comment.comment}
      </p>
    </div>
  );
});

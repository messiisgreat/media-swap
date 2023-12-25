import { memo } from "react";
import { IoClose, IoPricetagOutline } from "react-icons/io5";

type Props = {
  tagText: string;
  onDelete: () => void;
};

/**
 * タグが入力された時に表示するカード
 */
export const TagCard = memo(({ tagText, onDelete: handleDelete }: Props) => (
  <span
    className="grid w-full grid-cols-[auto_1fr_auto] items-center justify-between gap-2
     rounded-md border border-primary bg-white px-3 py-2 shadow-md"
  >
    <IoPricetagOutline />
    <p className="truncate text-sm">{tagText}</p>
    <button
      data-testid="delete"
      onClick={handleDelete}
      className="cursor-pointer"
      aria-label="タグを削除する"
    >
      <IoClose />
    </button>
  </span>
));

TagCard.displayName = "TagCard";

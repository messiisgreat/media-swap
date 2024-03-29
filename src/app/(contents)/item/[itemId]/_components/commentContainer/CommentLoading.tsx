import { FaEllipsis } from "react-icons/fa6";

/**
 * 読み込み中のスケルトンコンポーネント
 * @returns
 */
export const CommentLoading = () => (
  <div className="grid grid-cols-[auto_1fr_auto_auto] grid-rows-[1fr-auto] items-start gap-1 [&>:not(a)]:my-auto">
    <span className="skeleton row-span-2 mr-2 mt-1 size-12 rounded-full" />
    <p className="skeleton my-2 h-6 max-w-32 rounded-full" />
    <p className="skeleton my-2 h-4 w-12 rounded-full" />
    <label className="btn btn-ghost h-[initial] min-h-0 p-2 text-gray-400">
      <FaEllipsis />
    </label>
    <p className="col-start-2 col-end-5 grid w-full gap-2">
      <span className="skeleton h-3 rounded-full " />
      <span className="skeleton h-3 rounded-full " />
      <span className="sr-only">Loading...</span>
    </p>
  </div>
);

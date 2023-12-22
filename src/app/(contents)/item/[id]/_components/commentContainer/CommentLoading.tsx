/* eslint-disable tailwindcss/no-custom-classname */
import { FaEllipsis } from "react-icons/fa6";

/**
 * 読み込み中のスケルトンコンポーネント
 * @returns
 */
export function CommentLoading() {
  return (
    <div
      role="status"
      className="grid grid-cols-[auto_1fr_auto_auto] grid-rows-[1fr-auto] items-start gap-1 [&>:not(a)]:my-auto"
    >
      <a className="row-span-2 mr-2 mt-1 h-12 w-12 rounded-full bg-gray-400" />
      <p className="my-2 h-6 max-w-32 rounded-full bg-gray-400" />
      <p className="my-2 h-4 w-12 rounded-full bg-gray-400" />
      <label
        tabIndex={0}
        className="btn btn-ghost h-[initial] min-h-0 p-2 text-gray-400"
      >
        <FaEllipsis />
      </label>
      <p className="col-start-2 col-end-5 grid w-full gap-2">
        <span className="h-3 rounded-full bg-gray-400" />
        <span className="h-3 rounded-full bg-gray-400" />
        <span className="sr-only">Loading...</span>
      </p>
    </div>
  );
}

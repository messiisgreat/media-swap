/**
 * 読み込み中のスケルトンコンポーネント
 * @returns
 */
export function Skeleton() {
  return (
    <div role="status" className="flex w-full animate-pulse items-center gap-2">
      <div className="h-16 w-16 flex-none items-center justify-center rounded-full bg-gray-400" />
      <div className="w-full">
        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-400" />
        <div className="mb-2.5 h-2 rounded-full bg-gray-400" />
        <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-400" />
        <div className="h-2 max-w-[360px] rounded-full bg-gray-400" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

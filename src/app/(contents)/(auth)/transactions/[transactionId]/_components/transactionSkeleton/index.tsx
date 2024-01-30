/**
 * 取引詳細ページのスケルトンコンポーネント
 */
export const TransactionSkeleton = () => (
  <div className="w-full">
    <div className="grid animate-pulse gap-8">
      <div className="alert h-20 bg-slate-700" />
      <div className="h-6 bg-slate-700" />
      <div className="h-12 rounded-lg  bg-slate-700" />
      <div className="flex flex-col">
        <div className="h-6 bg-slate-700" />
        <div className="flex h-20 items-center justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full bg-slate-700" />
            </div>
            <div className="h-10 w-full bg-slate-700" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-12 w-16 bg-slate-700" />
      </div>
      <div className="h-7 w-full bg-slate-700" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="h-12 rounded-lg bg-slate-700" />
        <div className="h-12 rounded-lg bg-slate-700" />
      </div>
      <div className="h-12 bg-slate-700" />
    </div>
  </div>
);

const numberOfSkeleton = 5;
/**
 * マイページの商品一覧スケルトンコンポーネント
 */
export const MypageItemsSkeleton = () => (
  <div className="w-full">
    {Array.from({ length: numberOfSkeleton }).map((_, index) => (
      <div key={index} className="animate-pulse py-2">
        <div className="flex items-center">
          <div className="relative h-[calc((100vw-32px+4px*2)/5)] w-[calc((100vw-32px-4px*2)/5)] sm:size-24">
            <div className="flex size-24 rounded bg-slate-700" />
          </div>
          <div className="min-w-0 flex-1 px-5">
            <p className="h-6 bg-slate-700" />
            <p className="mt-1 h-4 w-40 bg-slate-700" />
          </div>
          <div className="ml-auto size-9 bg-slate-700" />
        </div>
      </div>
    ))}
  </div>
);

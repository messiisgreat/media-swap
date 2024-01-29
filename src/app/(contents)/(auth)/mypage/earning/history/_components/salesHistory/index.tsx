import { SalesHistoryPresenter } from "@/app/(contents)/(auth)/mypage/earning/history/_components/salesHistory/SalesHistoryPresenter";
import logo from "@/images/logo.png";
import { formatPrice } from "@/utils";

// 仮の売上履歴
const historyData = [
  {
    id: 1,
    title: "販売利益",
    date: "2023/3/11 08:23",
    price: 4800,
    imageUrl: logo.src,
  },
  {
    id: 2,
    title: "商品購入",
    date: "2023/8/01 10:06",
    price: -2800,
    imageUrl: logo.src,
  },
  {
    id: 3,
    title: "出金",
    date: "2023/12/20 13:56",
    price: -2000,
    imageUrl: logo.src,
  },
];

/**
 * 売上履歴を取得する
 * TODO: 非同期関数にして売上履歴をfetchする
 */
export const SalesHistoryContainer = () => (
  // 追加する予定のページネーション用変数
  // const total = historyData.length;

  <div className="grid gap-1">
    {historyData.length ? (
      historyData.map((record) => (
        <SalesHistoryPresenter
          key={record.id}
          title={record.title}
          date={record.date}
          price={formatPrice(record.price)}
          imageUrl={record.imageUrl}
        />
      ))
    ) : (
      <NoHistory />
    )}
  </div>
);

const NoHistory = () => (
  <div className="text-center text-gray-400">売上履歴がありません</div>
);

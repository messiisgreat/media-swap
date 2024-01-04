type Props = {
  balance: string;
};

/**
 * 売上残高を表示する
 * @param balance 売上残高
 */
export const SalesBalancePresenter = ({ balance }: Props) => (
  <div>
    <p className="text-gray-500">売上金合計</p>
    {balance ? (
      <div className="grid gap-3">
        <p className="text-xl font-bold">{balance}</p>
      </div>
    ) : (
      <NoBalance />
    )}
  </div>
);

const NoBalance = () => (
  <div className="text-center text-gray-400">売上がありません</div>
);

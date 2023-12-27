import { browsing } from "@/app/(contents)/item/[id]/_components/actions";

type Props = {
  itemId: string;
};

/**
 * 閲覧履歴の記録を行う
 * 遅延読み込みで処理のみを行うため、敢えて何も返さないコンポーネントとして定義
 */
export const BrowsingHistory = async ({ itemId }: Props) => {
  await browsing(itemId);
  return null;
};

import { redirect } from "next/navigation";

import { merchant } from "@/app/(contents)/item/[id]/actions";
import { Button } from "@/ui";

type Props = {
  /** 商品ID */
  itemId: string;
  /** セッションユーザーID */
  sessionUserId: string;
};

/**
 * 検証用取引作成ボタン
 */
export const TestTransactionButton = ({ itemId, sessionUserId }: Props) => {
  const handleClick = async () => {
    const transactionId = await merchant(itemId, sessionUserId);
    redirect(`/transactions/${transactionId}`);
  };
  return <Button onClick={handleClick}>検証用取引を作成</Button>;
};

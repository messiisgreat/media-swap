import {
  TransactionProgressButton,
  TransactionStatus,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/TransactionChangeButton";
import { TRANSACTION_STATUS } from "@/constants/item";
import { type TransactionReadResult } from "@/repositories/transaction";
import { type SessionUser } from "@/utils";
import { type ReactNode } from "react";

type TransactionSectionProps = {
  /** 取引情報 */
  transaction: TransactionReadResult;
  /** セッションユーザー情報 */
  sessionUser: SessionUser;
  /** 子要素 */
  children?: ReactNode;
};

/**
 * 取引画面のトランザクション
 */
export const TransactionSection = ({
  transaction,
  sessionUser,
  children,
}: TransactionSectionProps) => (
  <>
    <TransactionStatus transaction={transaction} sessionUser={sessionUser} />
    {children}
    {/* 通常の取引更新用ボタン */}
    {transaction && (
      <TransactionProgressButton
        transaction={transaction}
        sessionUser={sessionUser}
      />
    )}
    {/* 取引のキャンセルボタン */}
    {transaction && (
      <TransactionChangeButton
        transactionId={transaction.id}
        changeStatus={TRANSACTION_STATUS.CANCELLED}
      />
    )}
  </>
);

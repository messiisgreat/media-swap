/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type Session } from "next-auth";
import { type IconType } from "react-icons";
import {
  FaBriefcase,
  FaClock,
  FaMoneyCheckAlt,
  FaTimes,
  FaTruck,
} from "react-icons/fa";

import { TRANSACTION_STATUS } from "@/constants/item";
import { type TransactionReadResult } from "@/repositories/transaction";
import { notFound } from "next/navigation";

const StatusAlert = ({
  icon,
  alertClass,
  boldText,
  text,
}: {
  icon: IconType;
  alertClass: string;
  boldText: string;
  text: string;
}) => {
  const IconComponent = icon;
  return (
    <div className={`alert ${alertClass} flex w-full`}>
      <IconComponent size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">{boldText}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const BeforePaymentSellerStatus = () => <StatusAlert
      icon={FaMoneyCheckAlt}
      alertClass="alert-success"
      boldText="支払いをお待ち下さい"
      text="購入者からの支払い完了通知をお待ち下さい"
    />;

const BeforePaymentBuyerStatus = () => <StatusAlert
      icon={FaMoneyCheckAlt}
      alertClass="alert-warning"
      boldText="支払いを完了してください"
      text="注文処理を進めるために、支払いを完了してください"
    />;

const CompletePaymentSellerStatus = () => <StatusAlert
      icon={FaTruck}
      alertClass="alert-warning"
      boldText="支払いが確認されました"
      text="発送を行ってください"
    />;

const CompletePaymentBuyerStatus = () => <StatusAlert
      icon={FaClock}
      alertClass="alert-success"
      boldText="発送をお待ち下さい"
      text="出品者からの発送通知をお待ち下さい"
    />;

const SentSellerStatus = () => <StatusAlert
      icon={FaTruck}
      alertClass="alert-success"
      boldText="商品が発送されました"
      text="購入者への到着をお待ち下さい"
    />;

const SentBuyerStatus = () => <StatusAlert
      icon={FaTruck}
      alertClass="alert-warning"
      boldText="商品が発送されました"
      text="到着したら受け取り評価をしてください"
    />;

const ReceivedSellerStatus = () => <StatusAlert
      icon={FaBriefcase}
      alertClass="alert-success"
      boldText="商品が購入者に到着しました"
      text="購入者が評価をし次第取引完了となります"
    />;

const ReceivedBuyerStatus = () => <StatusAlert
      icon={FaBriefcase}
      alertClass="alert-warning"
      boldText="商品が到着しました"
      text="取引評価をしてください"
    />;

const CancelSellerStatus = () => <StatusAlert
      icon={FaTimes}
      alertClass="alert-error"
      boldText="取引がキャンセルされました"
      text=""
    />;

const CancelBuyerStatus = () => <StatusAlert
      icon={FaTimes}
      alertClass="alert-error"
      boldText="取引がキャンセルされました"
      text=""
    />;

type Props = {
  transaction: TransactionReadResult;
  sessionUser: Session["user"];
};

/**
 * 取引のステータスを表示する
 * @param param0.transaction 取引
 * @param param0.sessionUser セッションユーザー
 * @returns
 */
export const TransactionStatus = ({ transaction, sessionUser }: Props) => {
  if (!transaction || !sessionUser) {
    notFound();
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isSeller = transaction.item.seller.id === sessionUser.id;
  const isBuyer = transaction.buyerId === sessionUser.id;

  switch (transaction.transactionStatus) {
    case TRANSACTION_STATUS.BEFORE_PAYMENT: {
      if (isSeller) {
        return <BeforePaymentSellerStatus />;
      } else if (isBuyer) {
        return <BeforePaymentBuyerStatus />;
      }

      break;
    }
    case TRANSACTION_STATUS.COMPLETE_PAYMENT: {
      if (isSeller) {
        return <CompletePaymentSellerStatus />;
      } else if (isBuyer) {
        return <CompletePaymentBuyerStatus />;
      }

      break;
    }
    case TRANSACTION_STATUS.SENT: {
      if (isSeller) {
        return <SentSellerStatus />;
      } else if (isBuyer) {
        return <SentBuyerStatus />;
      }

      break;
    }
    case TRANSACTION_STATUS.RECEIVED: {
      if (isSeller) {
        return <ReceivedSellerStatus />;
      } else if (isBuyer) {
        return <ReceivedBuyerStatus />;
      }

      break;
    }
    case TRANSACTION_STATUS.CANCELLED: {
      if (isSeller) {
        return <CancelSellerStatus />;
      } else if (isBuyer) {
        return <CancelBuyerStatus />;
      }

      break;
    }
    default: {
      return null;
    }
  }
};

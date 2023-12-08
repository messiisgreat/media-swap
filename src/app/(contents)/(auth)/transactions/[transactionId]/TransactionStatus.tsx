/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type Transaction } from "@prisma/client";
import { type Session } from "next-auth";
import { type IconType } from "react-icons";
import {
  FaBriefcase,
  FaClock,
  FaMoneyCheckAlt,
  FaTimes,
  FaTruck,
} from "react-icons/fa";

import { TRANSACTION_STATUS } from "@/constants/listing";

function StatusAlert({
  icon,
  alertClass,
  boldText,
  text,
}: {
  icon: IconType;
  alertClass: string;
  boldText: string;
  text: string;
}) {
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
}

function BeforePaymentSellerStatus() {
  return (
    <StatusAlert
      icon={FaMoneyCheckAlt}
      alertClass="alert-success"
      boldText="支払いをお待ち下さい"
      text="購入者からの支払い完了通知をお待ち下さい"
    />
  );
}

function BeforePaymentBuyerStatus() {
  return (
    <StatusAlert
      icon={FaMoneyCheckAlt}
      alertClass="alert-warning"
      boldText="支払いを完了してください"
      text="注文処理を進めるために、支払いを完了してください"
    />
  );
}

function CompletePaymentSellerStatus() {
  return (
    <StatusAlert
      icon={FaTruck}
      alertClass="alert-warning"
      boldText="支払いが確認されました"
      text="発送を行ってください"
    />
  );
}

function CompletePaymentBuyerStatus() {
  return (
    <StatusAlert
      icon={FaClock}
      alertClass="alert-success"
      boldText="発送をお待ち下さい"
      text="出品者からの発送通知をお待ち下さい"
    />
  );
}

function SentSellerStatus() {
  return (
    <StatusAlert
      icon={FaTruck}
      alertClass="alert-success"
      boldText="商品が発送されました"
      text="購入者への到着をお待ち下さい"
    />
  );
}

function SentBuyerStatus() {
  return (
    <StatusAlert
      icon={FaTruck}
      alertClass="alert-warning"
      boldText="商品が発送されました"
      text="到着したら受け取り評価をしてください"
    />
  );
}

function ReceivedSellerStatus() {
  return (
    <StatusAlert
      icon={FaBriefcase}
      alertClass="alert-success"
      boldText="商品が購入者に到着しました"
      text="購入者が評価をし次第取引完了となります"
    />
  );
}

function ReceivedBuyerStatus() {
  return (
    <StatusAlert
      icon={FaBriefcase}
      alertClass="alert-warning"
      boldText="商品が到着しました"
      text="取引評価をしてください"
    />
  );
}

function CancelSellerStatus() {
  return (
    <StatusAlert
      icon={FaTimes}
      alertClass="alert-error"
      boldText="取引がキャンセルされました"
      text=""
    />
  );
}

function CancelBuyerStatus() {
  return (
    <StatusAlert
      icon={FaTimes}
      alertClass="alert-error"
      boldText="取引がキャンセルされました"
      text=""
    />
  );
}

/**
 * 取引のステータスを表示する
 * @param param0.transaction 取引
 * @param param0.sessionUser セッションユーザー
 * @returns
 */
export function TransactionStatus({
  transaction,
  sessionUser,
}: {
  transaction: Transaction & { listing: { sellerId: string } };
  sessionUser: Session["user"];
}) {
  const isSeller = transaction.listing.sellerId === sessionUser.id;
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
}

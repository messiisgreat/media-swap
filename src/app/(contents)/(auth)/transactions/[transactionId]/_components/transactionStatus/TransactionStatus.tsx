/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type IconType } from "react-icons";
import {
  FaBriefcase,
  FaClock,
  FaMoneyCheckAlt,
  FaTimes,
  FaTruck,
} from "react-icons/fa";

import {
  TRANSACTION_STATUS,
  type TransactionStatusValue,
} from "@/constants/item";

const Component = ({
  icon,
  alertClass,
  boldText,
  text,
}: {
  icon: IconType;
  alertClass: string;
  boldText: string;
  text?: string;
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

const BeforePaymentSellerStatus = () => (
  <Component
    icon={FaMoneyCheckAlt}
    alertClass="alert-success"
    boldText="支払いをお待ち下さい"
    text="購入者からの支払い完了通知をお待ち下さい"
  />
);

const BeforePaymentBuyerStatus = () => (
  <Component
    icon={FaMoneyCheckAlt}
    alertClass="alert-warning"
    boldText="支払いを完了してください"
    text="注文処理を進めるために、支払いを完了してください"
  />
);

const CompletePaymentSellerStatus = () => (
  <Component
    icon={FaTruck}
    alertClass="alert-warning"
    boldText="支払いが確認されました"
    text="発送を行ってください"
  />
);

const CompletePaymentBuyerStatus = () => (
  <Component
    icon={FaClock}
    alertClass="alert-success"
    boldText="発送をお待ち下さい"
    text="出品者からの発送通知をお待ち下さい"
  />
);

const SentSellerStatus = () => (
  <Component
    icon={FaTruck}
    alertClass="alert-success"
    boldText="商品が発送されました"
    text="購入者への到着をお待ち下さい"
  />
);

const SentBuyerStatus = () => (
  <Component
    icon={FaTruck}
    alertClass="alert-warning"
    boldText="商品が発送されました"
    text="到着したら受取完了をしてください"
  />
);

const ReceivedSellerStatus = () => (
  <Component
    icon={FaBriefcase}
    alertClass="alert-success"
    boldText="商品が購入者に到着しました"
    text="購入者が取引完了ボタンを押して取引完了となります"
  />
);

const ReceivedBuyerStatus = () => (
  <Component
    icon={FaBriefcase}
    alertClass="alert-warning"
    boldText="商品が到着しました"
    text="取引完了をしてください"
  />
);

const CompletedSellerStatus = () => (
  <Component
    icon={FaBriefcase}
    alertClass="alert-success"
    boldText="取引が完了しました。"
  />
);

const CompletedBuyerStatus = () => (
  <Component
    icon={FaBriefcase}
    alertClass="alert-warning"
    boldText="取引が完了しました"
  />
);
const CancelSellerStatus = () => (
  <Component
    icon={FaTimes}
    alertClass="alert-error"
    boldText="取引がキャンセルされました"
    text=""
  />
);

const CancelBuyerStatus = () => (
  <Component
    icon={FaTimes}
    alertClass="alert-error"
    boldText="取引がキャンセルされました"
    text=""
  />
);

const STATUS_COMPONENTS = {
  [TRANSACTION_STATUS.BEFORE_PAYMENT]: {
    seller: BeforePaymentSellerStatus,
    buyer: BeforePaymentBuyerStatus,
  },
  [TRANSACTION_STATUS.COMPLETE_PAYMENT]: {
    seller: CompletePaymentSellerStatus,
    buyer: CompletePaymentBuyerStatus,
  },
  [TRANSACTION_STATUS.SENT]: {
    seller: SentSellerStatus,
    buyer: SentBuyerStatus,
  },
  [TRANSACTION_STATUS.RECEIVED]: {
    seller: ReceivedSellerStatus,
    buyer: ReceivedBuyerStatus,
  },
  [TRANSACTION_STATUS.COMPLETED]: {
    seller: CompletedSellerStatus,
    buyer: CompletedBuyerStatus,
  },
  [TRANSACTION_STATUS.CANCELLED]: {
    seller: CancelSellerStatus,
    buyer: CancelBuyerStatus,
  },
} as const satisfies Record<
  TransactionStatusValue,
  Record<"seller" | "buyer", () => JSX.Element>
>;

type Props = {
  /** 取引のステータス */
  statusCode: TransactionStatusValue;
  /** 出品者かどうか */
  userType: "seller" | "buyer";
};

/**
 * 取引の状況とユーザーの役割に応じたアラートを表示する
 * @returns div
 */
export const TransactionStatus = ({ statusCode, userType }: Props) => {
  const StatusComponent = STATUS_COMPONENTS[statusCode][userType];
  return <StatusComponent />;
};

import Link from "next/link";
import { IoCheckbox } from "react-icons/io5";

type Props = {
  filter: "ALL" | "UNREAD_ONLY";
  isUnReadOnly: boolean;
};

/**
 * データ取得コンテナ
 * @param props - props
 */
export const Checkbox = async (props: Props) => {
  const { filter, isUnReadOnly } = props;
  const getNewFilterParam = () => {
    const newParam: { filter: "ALL" | "UNREAD_ONLY" } = { filter: "ALL" };
    if (filter === "ALL") newParam.filter = "UNREAD_ONLY";
    if (filter === "UNREAD_ONLY") newParam.filter = "ALL";
    return new URLSearchParams(newParam);
  };

  return (
    <Link href={`?${getNewFilterParam()}`} className="flex self-start">
      <div className="flex items-center justify-start gap-x-1 rounded-sm">
        <IoCheckbox color={`${isUnReadOnly ? "#3ea8ff" : "#ccc"}`} />
        <p>未読のみ表示する</p>
      </div>
    </Link>
  );
};

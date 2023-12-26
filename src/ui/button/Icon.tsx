import { type ComponentProps } from "react";
import { FaEllipsis, FaEllipsisVertical } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

/**
 * 3つの点が横に並んだアイコンのボタン
 * アイコンだけなので、必ずaria-labelを指定する
 */
export const MeetballsButton = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={twMerge("btn btn-ghost", className)} role="button" {...props}>
    <FaEllipsis size={20} />
  </div>
);

/**
 * 3つの点が縦に並んだアイコンのボタン
 * アイコンだけなので、必ずaria-labelを指定する
 */
export const KebabButton = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("btn btn-ghost", className)} role="button" {...props}>
    <FaEllipsisVertical size={20} />
  </div>
);
